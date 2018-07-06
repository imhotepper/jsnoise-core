<template>

    <div>
      <div class="pa4-l">
      <form  @submit.prevent="submit" class="bg-light-red mw7 center pa4 br2-ns ba b--black-10" >
        <fieldset class="cf bn ma0 pa0">
          <div class="cf">
            <input class="f6 f5-l input-reset bn fl black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns" 
            placeholder="What are you looking for today ?"  type="text" v-model="search">
          </div>
        </fieldset>
      </form>
    </div>

    <PodcastListItem v-for="p in podcasts" :key="p.id" :p="p" ></PodcastListItem>

    <div class="m8 tc v-mid top-40" v-show="podcasts.length == 0 ">
      <h2>Nothing found yet!</h2>
    </div>

    <div class="mw8 center" >
      <nav class="cf pa3 pa4-ns" data-name="pagination-next-prev">
        <a class="fl dib link dim black f6 f5-ns b pa2" v-show="!first" @click="prev" title="Previous">&larr; Previous</a>
        <a class="fr dib link dim black f6 f5-ns b pa2" v-show="!last" @click="next" title="Next">Next &rarr;</a>
      </nav>
    </div>

    </div>
</template>
<script>
import PodcastListItem from "@/components/PodcastListItem";
import { mapGetters, mapActions } from 'vuex'


export default {
  name: "Podcasts",
  props: ["producer_id"],
  components: { PodcastListItem },
  computed: {
    ...mapGetters(['podcasts','totalPages','first','last']),
    pid: function() {
      return (this.producer_id || "").split("-")[0];
    }
  },
  data: function() {
    return {
      currentPage: 1,
      search: ""
    };
  },

  methods: {
    ...mapActions(['loadPodcasts']),
    submit: function() {
      this.currentPage = 1;
      this.doSearch();
    },
    next: function() {
      if (this.last) return;
      this.currentPage++;
      this.doSearch();
    },
    prev: function() {
      if (this.first) return;
      this.currentPage--;
      this.doSearch();
    },
    doSearch: function() {
      var prms = { p: this.currentPage };
      if (this.search) {
        prms["q"] = this.search;
      }
      if (this.producer_id) {
        this.$router.push({
          name: "producerShows",
          params: { producer_id: this.produceId },
          query: prms
        });
      } else {
        this.$router.push({ path: "/", query: prms });
      }
    },
    load: function() {
      this.loadPodcasts({page:this.currentPage,q:this.search});
    }
  },
  
  beforeRouteUpdate: function(to, from, next) {
    this.search = to.query.q || "";
    this.currentPage = to.query.p || 1;
    this.load();
    next();
  },
  created: function() {
    this.search = this.$route.query.q || "";
    this.currentPage = this.$route.query.p || 1;
    this.load();
  }
};
</script>