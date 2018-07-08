using System;
using System.Linq;
using AutoMapper;
using System.Collections.Generic;
using System.Diagnostics;
using CoreJsNoise.Domain;
using CoreJsNoise.Dto;
using Microsoft.EntityFrameworkCore;

namespace CoreJsNoise.Services
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
            //TODO: make just one call to check what exists
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
                Console.WriteLine("---------------------------");
                Console.WriteLine(producer.Name);
                Console.WriteLine("---------------------------");
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error while updating feed: {producer.Name}: \n\r" + e.Message);
                Console.WriteLine(e);                
            }
           
        }
    }
}