<template>
<div>
     <div>Login here</div>
     <form @submit.prevent="logMeIn">
         <input type="text" v-model="username"  placeholder="user" required>
         <input type="password" v-model="password" required>
         <button >login</button>
     </form>
</div>
 
</template>
<script>
import {mapActions} from 'vuex'

export default {
  name:'login',
  data:function(){return{username:'', password:''}},
  methods:{
      ...mapActions(['login']),
      logMeIn: function(){        
          this.login({username:this.username,password:this.password});
          this.$router.push('/admin/producers');
      }
  }
}
</script>

