using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using CoreJsNoise.Domain;
using CoreJsNoise.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CoreJsNoise.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class ShowsController : ControllerBase
    {
        private PodcastsCtx _db;

        public ShowsController(PodcastsCtx db) => _db = db;

//        [HttpGet]
//        public ActionResult<List<ShowDto>> Get()
//        {
//            return _db.Shows.Select(x => new ShowDto(){Id = x.Id, Title = x.Title, Mp3 = x.Mp3, PublishedDate = x.PublishedDate}).ToList();
//        }

        [HttpGet]
        [Route("/api/showslist")]
        public ActionResult<ShowsResponse> GetAll(string q, int? page = 1)
        {
            var pageSize = 20;
            q = q?.ToLowerInvariant();
            IQueryable<Show> shows = _db.Shows.Include(x=>x.Producer);
            if (!string.IsNullOrWhiteSpace(q))
                shows = shows.Where(x =>
                    x.Title.ToLowerInvariant().Contains(q) || x.Description.ToLowerInvariant().Contains(q));
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
                })
                .ToList();

            return new ShowsResponse
            {
                Shows = resp,
                First = page == 1,
                Last = Math.Ceiling((double) counts / pageSize) == page
            };
        }

        [HttpGet]
        [Route("/api/shows/{id}")]
        public ActionResult Get(int id)
        {
            var show = _db.Shows.Include(x => x.Producer).FirstOrDefault(x => x.Id == id);
            if (show == null) return NotFound();

            /*
            podcast.title">?s</h1>   
    
      {{podcast.producerId}}
            
          {producer_id:slugp(podcast)}}"> {{podcast.producerName}}
          {{podcast.PublishedDate | date }}</span>
    </p>
    <div class="pl3-ns order-2 order-2-ns mb4 mb0-ns w-100 w-40-ns pa4 ma0 mh0">          
                <audio controls
                v-bind:src="podcast.mp3">
                Your browser does not support the <code>audio</code> element.
                </audio>           
      </div>
             */


            return Ok(new
            {
                Title = show.Title,
                ProducerId = show.ProducerId,
                ProducerName = show.Producer.Name,
                PublishedDate = show.PublishedDate,
                Mp3 = show.Mp3
            });
        }
    }
}