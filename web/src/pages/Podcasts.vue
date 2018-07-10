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
    
    <div class="container">
        <div id="flow">
            <span class="flow-1"></span>
            <span class="flow-2"></span>
            <span class="flow-3"></span>
        </div>
        <div class="section">
            <form  @submit.prevent="submit"  >

            <div class="box">
                <div class="field has-addons">
                    <div class="control is-expanded">
                        <input class="input has-text-centered"
                              v-model="search"
                               type="search" placeholder="» » » » » » find podcasts ?? « « « « « «">
                    </div>
                    <div class="control">
                        <a class="button is-info">Search</a>
                    </div>
                </div>
            </div>
            </form>
            <!-- Developers -->

            <div>

                <div class="column " v-show="isLoading">
                    <div class="card ">
                        <div class="card-content">
                            <div class="content">
                                <div class="media-content">
                                    <p class="title is-4 no-padding">Loading ... </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="column" v-show="podcasts.length == 0 && !isLoading">
                    <div class="card ">
                        <div class="card-content">
                            <div class="content">
                                <div class="media-content">
                                    <p class="title is-4 no-padding">Nothing found yet! ;( </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <PodcastListItem v-show="!isLoading" v-for="p in podcasts" :key="p.id" :p="p" ></PodcastListItem>


                <div class="column ">
                    <div class="card-content">
                        <div class="is-pulled-left">
                            <p class="title is-4 no-padding" >
                                <a  v-show="!first" @click="prev" title="Previous"><<<<<<</a>
                            </p>

                        </div>
                        <div class="is-pulled-right">
                            <p class="title is-4 no-padding" >
                                <a  v-show="!last" @click="next" title="Next">>>>>></a>
                            </p>
                        </div>

                    </div>
                </div>




            </div>
            <!-- End Developers -->
            <!-- End Staff -->
        </div>
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
     ...mapGetters(['podcasts','totalPages','first','last', 'isLoading']),
    pid: function() {
      return (this.producer_id || "").split("-")[0];
    }
  },
  data: function() {
    return {
      currentPage: 1,
      search: "", 
      player: null,
        isPaying: false
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
    }, 
     play(mp3){
        if (this.isPlaying){ 
            player.pause();
            this.isPlaying = false;
        }
        else {
            player.src = mp3;
            player.play();
            this.isPlaying= true;
        }
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
    this.player = new Audio();
  }
};
</script>