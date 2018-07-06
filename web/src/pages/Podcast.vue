<template>

<article class="pv4 bt bb b--black-10 ph3 ph0-l" >
    <div class="flex flex-column flex-row-ns">
      <div class="w-100 w-60-ns pr3-ns order-1 order-1-ns">
        <h1 class="f3 athelas mt0 lh-title" :v-bind="podcast.title"></h1>   
      </div>     
    </div>
    <p class="f6 lh-copy gray mv0"> 
      {{podcast.producerId}}
            By <span class="ttu"><router-link :to="{name:'producerShows', params:{producer_id:slugp(podcast)}}"> {{podcast.producerName}}</router-link> </span>
            <span class="f6  gray"> on {{podcast.pubDate | date }}</span>
    </p>
    <div class="pl3-ns order-2 order-2-ns mb4 mb0-ns w-100 w-40-ns pa4 ma0 mh0">          
                <audio controls
                v-bind:src="podcast.mp3">
                Your browser does not support the <code>audio</code> element.
                </audio>           
      </div>
</article>

</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  props: ["id"],
  computed:{...mapGetters(['podcast'])},
  methods: {
    ...mapActions(['loadPodcast']),
    load: function() {
      if (this.id) {
        const theId = this.id.split("-")[0];
        this.loadPodcast(theId);        
      }
    },
    slugp:function(p){
      return `${p.producerId}-${ this.$options.filters.slugify(p.producerName)}`;
      }
  },
  created: function() {
    this.load();
  }
};
</script>