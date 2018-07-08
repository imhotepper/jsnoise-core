using System;
using System.Collections.Generic;
using System.Security.Policy;
using System.Xml;
using CoreJsNoise.Services;
using Microsoft.AspNetCore.Mvc;

namespace CoreJsNoise.Controllers
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