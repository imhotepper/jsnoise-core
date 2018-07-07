using System;
using System.Linq;
using AutoMapper;
using WebApplication1.Domain;
using WebApplication1.Dto;
using System.Collections.Generic;
using System.Diagnostics;
using Microsoft.EntityFrameworkCore;

namespace WebApplication1.Services
{
    public class FeedUpdaterService
    {        
        private PodcastsCtx _db;
        private RssReader _rssReader;

        public FeedUpdaterService(PodcastsCtx db, RssReader rssReader)
        {
            _db = db;
            _rssReader = rssReader;
         }


        public void Update()
        {
            _db.Producers.Where(x=>!string.IsNullOrWhiteSpace( x.FeedUrl)).AsNoTracking().ToList()
                .ForEach(p => UpdateShows(p));
        }

        private void UpdateShows(Producer producer)
        {
            try
            {
                var items = _rssReader.Parse(producer.FeedUrl);
                Mapper.Map<List<ShowParsedDto>,List< Show>>(items)
                    .ForEach(s =>
                    {
                        s.ProducerId = producer.Id;
                        if (!_db.Shows.Any(x => x.Title == s.Title)) _db.Shows.Add(s);
                    });
                _db.SaveChanges();
            }
            catch (Exception e)
            {
                Trace.WriteLine($"Error while updating feed: {producer.Name}: \n\r" + e.Message);
                Console.WriteLine(e);                
            }
           
        }
    }
}