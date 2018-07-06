

<template>
<article class="pv4 bt bb b--black-10 ph3 ph0-l"  >
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
            <span class="f6  gray"> on {{p.pubDate | date }}</span>
    </p>
  </article>  
</template>

<script>
export default {
  name: "PodcastsListItem",
  props: ["p"],
  methods: {
    slug: function(p) {
      return `${p.id}-${this.$options.filters.slugify(p.title)}`;
    },
    slugp: function(p) {
      return `${p.producerId}-${this.$options.filters.slugify(p.producerName)}`;
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
</style>

