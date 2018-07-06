using System;
using System.Collections.Generic;
using System.Security.Policy;
using System.Xml;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class RssController: ControllerBase
    {
        [HttpGet]
       public ActionResult<List<string>> Get(string url = "http://audio.javascriptair.com/feed/")
        {
           var items = new RssReader().Parse(url);
            return Ok(items);
        }
    }
}