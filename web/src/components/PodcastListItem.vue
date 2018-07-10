

<template>

    <div>      
        
        <div class="card mb-5" v-show="!isLoading">
            <div class="columns is-centered is-gapless">
                <div class="column is-narrow">
                    <div class="container ">
                        <div class="is-centered">
                            <figure class="image is-64x64" @click="playMp3" >
                                <img  style="" :src="isPlaying && mp3 == p.mp3 ? '/static/img/play-stop.png': isMp3Loading && mp3 == p.mp3  ? '/static/img/play-wip.gif':'/static/img/play-pause.png'" alt="Image">
                            </figure>    
                        </div>
                            
                    </div>
                    
                </div>
                <div class="column m-2">
                      <b>  <a class="title is-4" @click="playMp3">{{p.title}}</a> </b>
                    <p class="control ">
                           <span class="">
                            by  <router-link class="is-text"  :to="{name:'producerShows',params: {producer_id : slugp(p)}}">{{p.producerName}}</router-link>
                            </span>
                        on {{p.publishedDate | date }}
                    </p>
                </div>
            </div>
        </div>
        
    </div>

   
    
    
    
    
    
    <!--
        <article class="pv4 bt bb b--black-10 ph3 ph0-l" v-show="!isLoading"  style="display: none;" >
            <div class="flex flex-column flex-row-ns">
                <div class="w-100 w-60-ns pr3-ns order-2 order-1-ns">
                    <h1 class="f3 athelas mt0 lh-title">
                        <router-link  class="no-underline" :to="`/shows/${slug(p)}`">{{p.title}}</router-link></h1>
                    <p class="f5 f4-l lh-copy athelas">
                    </p>
                </div>
                <div class="pl3-ns order-1 order-2-ns mb4 mb0-ns w-100 w-40-ns">

                </div>
            </div>
            <p class="f6 lh-copy gray mv0">
                By <span class="ttu">     
            <router-link :to="{name:'producerShows',params: {producer_id : slugp(p)}}">{{p.producerName}}</router-link>
           </span>
                <span class="f6  gray"> on {{p.publishedDate | date }}</span>
            </p>
        </article>
        
        -->

</template>

<script>
import {mapGetters, mapActions} from 'vuex';
    
export default {
  name: "PodcastsListItem",
  props: ["p"],
    computed:{...mapGetters(['isLoading', 'isPlaying', 'mp3', 'isMp3Loading'])},
  methods: {
      ...mapActions(['play']),
    slug: function(p) {
      return `${p.id}-${this.$options.filters.slugify(p.title)}`;
    },
    slugp: function(p) {
      return `${p.producerId}-${this.$options.filters.slugify(p.producerName)}`;
    },
      playMp3(){
          this.play(this.p.mp3);
      }
  }
};
</script>

<style scoped>
/* a{color:red;} */

a,
a:hover {
  color: black;
  text-decoration: none;
}
.p20{
    padding-top:20px;
}
.p10{
    padding-top:10px;
}
.image img{
    padding-top:10px;
    width: 80%;
}
    .mt10{padding-top:10px;}
</style>

