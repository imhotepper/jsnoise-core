using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using AutoMapper;
using CoreJsNoise.Domain;
using CoreJsNoise.Dto;
using CoreJsNoise.Services;

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
        public ActionResult<Producer> Post([FromBody] Producer producer)
        {
            if (producer == null || !ModelState.IsValid) return BadRequest(ModelState);

            _db.Producers.Add(producer);
            _db.SaveChanges();

            return CreatedAtAction(nameof(Get), new {id = producer.Id}, producer);
        }

        [HttpGet]
        [Route("update")]
        public ActionResult Update()
        {
            _feedUpdater.Update();
            return Ok();
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
                    x.Title.ToLowerInvariant().Contains(q) || x.Description.ToLowerInvariant().Contains(q));
            var counts = shows.Count();
            var resp = shows
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

            return new ShowsResponse
            {
                Shows = resp,
                First = page == 1,
                Last = Math.Ceiling((double) counts / pageSize) == page
            };
        }
    }
}