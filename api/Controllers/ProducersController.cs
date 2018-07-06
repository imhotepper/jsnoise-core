using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Domain;
using  System.Linq;
using AutoMapper;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public partial class ProducersController:ControllerBase
    {
        private PodcastsCtx _db;

        public ProducersController(PodcastsCtx db)  
        {
            _db = db;
        }

        [HttpGet]
        public ActionResult<List<Dto.ProducersController.ProducerDto>> Get()
        {
            var producers = _db.Producers.ToList();
            Mapper.Initialize(cfg => cfg.CreateMap<Producer, Dto.ProducersController.ProducerDto>());

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
    }
}