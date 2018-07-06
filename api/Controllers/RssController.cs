using System;
using System.Collections.Generic;
using System.Security.Policy;
using System.Xml;
using CodeHollow.FeedReader;
using CodeHollow.FeedReader.Feeds;
using Microsoft.AspNetCore.Mvc;

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

    public class RssReader
    {
        public List<string> Parse(string rssFeed)
        {
            var itemList = FeedReader.ReadAsync(rssFeed).Result.Items;
            var resp = new List<string>();
            foreach (var i in itemList)
            {
                Console.WriteLine(string.Format("{0}",i.Title));

                if (i.SpecificItem is MediaRssFeedItem && 
                    (bool) (i.SpecificItem as MediaRssFeedItem).Enclosure.Url?.Contains(".mp3"))
                {
                    var url = (i.SpecificItem as MediaRssFeedItem).Enclosure.Url;
                    var mp3 = url.Substring(0, 3 + url.IndexOf("mp3"));
                    resp.Add($"{i.Id}:{i.Title} ({i.PublishingDate}) - {mp3} {i.Description} ||| {i.Author}");     
                }                               
            }

            return resp;
        }
    }
}