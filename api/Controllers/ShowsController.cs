using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Domain;
using WebApplication1.Dto;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class ShowsController: ControllerBase
    {
        private PodcastsCtx _db;

        public ShowsController(PodcastsCtx db) => _db = db;

        [HttpGet]
        public ActionResult<List<ShowDto>> Get()
        {
            return _db.Shows.Select(x => new ShowDto(){Id = x.Id, Title = x.Title, Mp3 = x.Mp3, PublishedDate = x.PublishedDate}).ToList();
        }

    }
}