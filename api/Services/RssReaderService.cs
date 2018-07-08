using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using CodeHollow.FeedReader;
using CodeHollow.FeedReader.Feeds;
using CoreJsNoise.Dto;

namespace CoreJsNoise.Services
{
    public class RssReader
    {
        public List<ShowParsedDto> Parse(string rssFeed)
        {
            var itemList = FeedReader.ReadAsync(rssFeed).Result.Items;
            var resp = new List<ShowParsedDto>();
            foreach (var item in itemList)
            {
                if (item.SpecificItem is MediaRssFeedItem &&
                    (bool) (item.SpecificItem as MediaRssFeedItem).Enclosure.Url?.Contains(".mp3"))
                {
                    var url = (item.SpecificItem as MediaRssFeedItem).Enclosure.Url;
                    var mp3 = url.Substring(0, 3 + url.IndexOf("mp3"));
                    Trace.WriteLine(
                        $"{item.Id}:{item.Title} ({item.PublishingDate}) - {mp3} {item.Description} ||| {item.Author}");
                    resp.Add(new ShowParsedDto
                    {
                        ShowId = item.Id,
                        Title = item.Title,
                        Mp3 = mp3,
                        PublishedDate = item.PublishingDate,
                        Description = item.Description
                    });
                }
            }

            return resp.GroupBy(x=> new {id = x.ShowId, title = x.Title}).Select(x=>x.First()).ToList();
    }
    }
}