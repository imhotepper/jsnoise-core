using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using AutoMapper;
using CoreJsNoise.Domain;
using CoreJsNoise.Dto;
using CoreJsNoise.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore.Query.Expressions;
using Remotion.Linq.Clauses;

namespace CoreJsNoise.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public partial class ProducersController : ControllerBase
    {
        private PodcastsCtx _db;
        private FeedUpdaterService _feedUpdater;

        public ProducersController(PodcastsCtx db, FeedUpdaterService feedUpdater)
        {
            _db = db;
            _feedUpdater = feedUpdater;
        }

        [HttpGet]
        public ActionResult<List<Dto.ProducersController.ProducerDto>> Get()
        {
            var producers = _db.Producers.ToList();

            return Ok(Mapper.Map<List<Producer>, List<Dto.ProducersController.ProducerDto>>(producers));
        }


        [HttpPost]
        [Route("/api/admin/producers")]
        [Authorize]
        public ActionResult<Producer> Post([FromBody] Producer producer)
        {
            if (producer == null || !ModelState.IsValid) return BadRequest(ModelState);

            _db.Producers.Add(producer);
            _db.SaveChanges();

            _feedUpdater.UpdateShows(producer);
            return CreatedAtAction(nameof(Get), new {id = producer.Id}, producer);
        }

        [HttpGet]
        [Route("update")]     
        public ActionResult Update()
        {
            var count = _db.Shows.Count();
            _feedUpdater.Update();
            return Ok(_db.Shows.Count() - count);
        }

        [HttpGet]
        [Route("/api/producers/{id}/shows")]
        public ActionResult<ShowsResponse> GetAll(int id, string q, int? page = 1)
        {
            var pageSize = 20;
            q = q?.ToLowerInvariant();
            IQueryable<Show> shows = _db.Shows.Where(x => x.ProducerId == id);
            if (!string.IsNullOrWhiteSpace(q))
                shows = shows.Where(x =>
                    x.Title.ToLower().Contains(q) || x.Description.ToLower().Contains(q));
            var counts = shows.Count();
            var resp = shows.OrderByDescending(x=>x.PublishedDate)
                .Skip(pageSize * ((page ?? 1) - 1))
                .Take(pageSize)
                .Select(x => new ShowDto()
                {
                    Id = x.Id,
                    Title = x.Title,
                    Mp3 = x.Mp3,
                    PublishedDate = x.PublishedDate,
                    ProducerId = x.ProducerId,
                    ProducerName = x.Producer.Name
                }).ToList();

            var totalPages = Math.Ceiling((double) counts / pageSize);
            return new ShowsResponse
            {
                Shows = resp,
                First = page == 1, 
                Last = totalPages == 0 ||  totalPages == page   
            };
        }
        
        
        [HttpGet]
        [Route("/api/admin/producers")]
        [Authorize]
        public ActionResult<List<ProducerAggregateDto>> GetProducers()
        {

            var resp =_db.Producers.GroupBy(x => x.Name)
                .Select(x => new ProducerAggregateDto {Name = x.Key, Count = x.Count()}).ToList();

           resp = (from p in _db.Producers
                from s in _db.Shows
                    where p.Id == s.ProducerId
                 group p by p.Name into grp
                     select new ProducerAggregateDto{Name = grp.Key, Count = grp.Count()}).ToList();
            
            return resp;
        }
    }
}