using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Domain;
using  System.Linq;
using AutoMapper;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public partial class ProducersController:ControllerBase
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
            
            return CreatedAtAction(nameof(Get), new { id = producer.Id }, producer);

        }

        [HttpGet]
        [Route("update")]
        public ActionResult Update()
        {
            _feedUpdater.Update();
            return Ok();
        }
    }
}