import Vue from 'vue'
import Vuex from 'vuex'
import { stat } from 'fs';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        podcast: {},
        podcasts: [],
        totalPages: null,
        first: true,
        last: true,
        q: '',
        producers: [],
        isLoggedIn: !!localStorage.getItem("auth"),
        isLoading:false,
        
        player : null,
        isPlaying:false,
        mp3:null,
        isMp3Loading:false
        
    },
    getters: {
        podcasts: (state) => state.podcasts,
        first: (state) => state.first,
        last: (state) => state.last,
        totalPages: (state) => state.totalPages,
        q: (state) => state.q,
        podcast: (state) => state.podcast,
        producers:(state) => state.producers,
        isLoading:(state) => state.isLoading,
        isPlaying:(state) => state.isPlaying,
        mp3:(state) => state.mp3,
        isMp3Loading:(state) => state.isMp3Loading
    },
    mutations: {
        setPodcasts(state, details) {
            state.podcasts = details.podcasts;
            state.first = details.first;
            state.last = details.last;
            state.totalPages = details.totalPages;
        },
        setPodcast: (state, podcast) => state.podcast = podcast,
        setProducers: (state, producers) => state.producers = producers,
        isLoading:(state,isLoading) =>{ 
            state.isLoading = isLoading;
            if (isLoading == true){
                state.first = true;
                state.last = true;    
            }
        },
        playMp3:(state,mp3) => {
            //https://www.binarytides.com/using-html5-audio-element-javascript/
          //  if (state.isPlaying == true){ state.isPlaying = false; return;} 
            if ((state.player == null)) state.player = new Audio();

            if (state.mp3 == mp3) {
                state.isPlaying = false;
                state.player.pause();
                state.player.currentTime = 0;
                state.mp3 = null;
                state.isMp3Loading = false;
                
            }else{
              
                console.log('play: '+ mp3)
                state.player.src = mp3;
                state.mp3 = mp3;
                state.isPlaying = false;

                state.isMp3Loading = true;
              
                console.log("should change image: ",state.isMp3Loading == true && state.mp3 == mp3 )
                state.player.play().then(
                    function () {
                        state.isPlaying = true;
                        state.isMp3Loading = false;
                    },
                    ()=> state.isMp3Loading = false
                );
            }
            
        }
    },
    actions: {
        play(context, mp3){
            context.commit('playMp3',mp3);
        },
        loadPodcast(context, id) {
            context.commit('isLoading', true);
            console.log('isLoading:', true);
            Vue.axios
                .get(`/api/shows/${id}`)
                .then(resp =>{
                    context.commit('isLoading', false);
                    context.commit('setPodcast', resp.data);})
                .catch(err => {
                    context.commit('isLoading', false);console.log(err);});

        },
        loadPodcasts(context, details) {
            var url = `/api/showslist?page=${details.page}`;
            if (details.pid) {
                url = `/api/producers/${details.pid}/shows?page=${details.page}`;
            }

            if (details.q) url += "&q=" + details.q;
            context.commit('isLoading', true);
            Vue.axios
                .get(url)
                .then(resp => {
                    context.commit("setPodcasts", {
                        podcasts: resp.data.shows,
                        last: resp.data.last,
                        first: resp.data.first,
                        totalPages: resp.data.totalPages
                    });
                    context.commit('isLoading', false);
                })
                .catch(err =>{
                    context.commit('isLoading', false);
                     console.log(err);});
        },
        loadProducers(context) {
            Vue.axios.get('/api/admin/producers')
                .then((resp) => context.commit("setProducers", resp.data))
                .catch((err) => console.log(err));
        },
        saveProducer(context, producer) {
            Vue.axios.post('/api/admin/producers', producer)
                .then((resp) => {
                    context.dispatch('loadProducers');
                })
                .catch((err) => console.log(err));

        },
        login(context,userData){
            var auth =  btoa(`${userData.username}:${userData.password}`);
            localStorage.setItem("auth", auth);        
        }
    }
})
