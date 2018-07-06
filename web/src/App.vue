<template>
<!-- Begin page content -->
  
  <section class="mw7 center" id="app">
    <h1 class="athelas ph3 ph0-l ">
      <router-link class="banner" :to="{path:'/', params:{},query:{}}">JsNoise </router-link>
      </h1>
    <router-view/>
    
  </section>

</template>

<script>
export default {
  name: "App",
  data: function() {
    return {
      isAuthenticated: false
    };
  },
  methods: {
    logedin: function() {
      this.isAuthenticated = true;
      localStorage.setItem("isAuthenticated", this.isAuthenticated);
      this.$router.push({ name: "producers" });
    },
    logout: function() {
      console.log("logging out ....");
      this.isAuthenticated = false;
      this.$router.push({ name: "podcasts" });
    },
    update: function() {
      this.axios
        .get("/producers/update")
        .then(resp => console.log("done: " + resp.data))
        .catch(err => console.log(err));
      this.$router.push({ name: "podcasts" });
    }
  },
  created: function() {
    this.isAuthenticated = localStorage.getItem("isAuthenticated");
    this.$eventHub.$on("logged-in", this.logedin);
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}

.banner{
  color: #42b983;
}
a.banner:hover {
  color: #36976c;
  text-decoration: none;
}

h2 {
  margin-top: 10px;
  margin-bottom: 20px;
  color: black;
}
a {
  text-decoration: none !important;
}
</style>
