<template>
<div>
  <h3>Producers list</h3>
  <form @submit.prevent="add" class="pv4 bt bb b--black-10 ph3 ph0-l" >
    <input type="text" v-model="producer.name"     required placeholder="producer name">
    <input type="url"  v-model="producer.website"  required placeholder="producer url">
    <input type="url"  v-model="producer.feedUrl"  required placeholder="feeds url">
    <button>add</button>
  </form>
  <br/>
  <div>
    <div v-for="p in producers" :key="p.feedUrl"> {{p.name}} ({{p.count}} shows) </div>
  </div>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  computed:{...mapGetters(['producers'])},
  data: function(){
    return {
      producer:{ name:'',website:'',feedUrl:''}
    }
  },
  methods:{
    ...mapActions(['loadProducers','saveProducer']),
    add: function(){
      this.saveProducer(this.producer);
      this.producer ={ name:'',website:'',feedUrl:''};
    },
    getEmptyPriducer: function(){
      return { name:'',url:'',feedUrl:''};
    },
    saveProducers: function(){
      localStorage.setItem("producers", JSON.stringify(this.producers));
    },
    load:function(){
      this.loadProducers();
    }
  },
  created:function(){
    this.load();  
  }
}
</script>

