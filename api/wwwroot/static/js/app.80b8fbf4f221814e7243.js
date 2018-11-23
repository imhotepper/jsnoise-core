webpackJsonp([1],{NHnr:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});e("qb6w");var a=e("7+uW"),i={name:"App",data:function(){return{isAuthenticated:!1}},methods:{logedin:function(){this.isAuthenticated=!0,localStorage.setItem("isAuthenticated",this.isAuthenticated),this.$router.push({name:"producers"})},logout:function(){this.isAuthenticated=!1,this.$router.push({name:"podcasts"})},update:function(){this.axios.get("/producers/update").then(t=>console.log("done: "+t.data)).catch(t=>console.log(t)),this.$router.push({name:"podcasts"})}},created:function(){this.isAuthenticated=localStorage.getItem("isAuthenticated"),this.$eventHub.$on("logged-in",this.logedin)}},r={render:function(){var t=this.$createElement,s=this._self._c||t;return s("div",[s("div",[s("nav",{staticClass:"navbar"},[s("div",{staticClass:"container"},[s("div",{staticClass:"navbar-brand"},[s("router-link",{staticClass:"banner",attrs:{to:{path:"/",params:{},query:{}}}},[this._v("jsNoise ")])],1)])]),this._v(" "),s("router-view"),this._v(" "),this._m(0)],1)])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("footer",{staticClass:"footer",attrs:{hidden:""}},[s("div",{staticClass:"container"},[s("div",{staticClass:"content has-text-centered"},[s("div",{staticClass:"soc",staticStyle:{display:"none"}},[s("a",{attrs:{href:"#"}},[s("i",{staticClass:"fa fa-github-alt fa-2x",attrs:{"aria-hidden":"true"}})]),this._v(" "),s("a",{attrs:{href:"#"}},[s("i",{staticClass:"fa fa-youtube fa-2x",attrs:{"aria-hidden":"true"}})]),this._v(" "),s("a",{attrs:{href:"#"}},[s("i",{staticClass:"fa fa-facebook fa-2x",attrs:{"aria-hidden":"true"}})]),this._v(" "),s("a",{attrs:{href:"#"}},[s("i",{staticClass:"fa fa-twitter fa-2x",attrs:{"aria-hidden":"true"}})])]),this._v(" "),s("p",[this._v("\n            Welcome to "),s("strong",[this._v("JsNoise")]),this._v(", javascript podcasts agregator!\n            \n          ")])])])])}]};var n=e("VU/8")(i,r,!1,function(t){e("xKtf")},null,null).exports,o=e("/ocq"),c=e("NYxO"),d=Object.assign||function(t){for(var s=1;s<arguments.length;s++){var e=arguments[s];for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a])}return t},l={name:"PodcastsListItem",props:["p"],computed:d({},Object(c.c)(["isLoading","isPlaying","mp3","isMp3Loading"])),methods:d({},Object(c.b)(["play"]),{slugp:function(t){return`${t.producerId}-${this.$options.filters.slugify(t.producerName)}`},playMp3(){this.play(this.p.mp3)}})},u={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("div",{directives:[{name:"show",rawName:"v-show",value:!t.isLoading,expression:"!isLoading"}],staticClass:"card mb-5"},[e("div",{staticClass:"columns is-centered is-gapless"},[e("div",{staticClass:"column is-narrow"},[e("div",{staticClass:"container "},[e("div",{staticClass:"is-centered"},[e("figure",{staticClass:"image is-64x64",on:{click:t.playMp3}},[e("img",{attrs:{src:t.isPlaying&&t.mp3==t.p.mp3?"/static/img/play-stop.png":t.isMp3Loading&&t.mp3==t.p.mp3?"/static/img/play-wip.gif":"/static/img/play-pause.png",alt:"Image"}})])])])]),t._v(" "),e("div",{staticClass:"column m-2"},[e("b",[e("a",{staticClass:"title is-4",on:{click:t.playMp3}},[t._v(t._s(t.p.title))])]),t._v(" "),e("p",{staticClass:"control "},[e("span",{},[t._v("\n                        by  "),e("router-link",{staticClass:"is-text",attrs:{to:{name:"producerShows",params:{producer_id:t.slugp(t.p)}}}},[t._v(t._s(t.p.producerName))])],1),t._v("\n                    on "+t._s(t._f("date")(t.p.publishedDate))+"\n                ")])])])])])},staticRenderFns:[]};var p=e("VU/8")(l,u,!1,function(t){e("UE2a")},"data-v-52a62ab6",null).exports,h=Object.assign||function(t){for(var s=1;s<arguments.length;s++){var e=arguments[s];for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a])}return t},v={name:"Podcasts",props:["producer_id"],components:{PodcastListItem:p},computed:h({},Object(c.d)(["podcasts","first","last","isLoading"]),{pid:function(){return(this.producer_id||"").split("-")[0]}}),data:function(){return{currentPage:1,search:""}},methods:h({},Object(c.b)(["loadPodcasts"]),{submit:function(){this.currentPage=1,this.doSearch()},next:function(){this.last||(this.currentPage++,this.doSearch())},prev:function(){this.first||(this.currentPage--,this.doSearch())},doSearch:function(){var t={p:this.currentPage};this.search&&(t.q=this.search),this.producer_id?this.$router.push({name:"producerShows",params:{producer_id:this.produceId},query:t}):this.$router.push({path:"/",query:t})},load:function(){this.loadPodcasts({page:this.currentPage,q:this.search})}}),beforeRouteUpdate:function(t,s,e){this.search=t.query.q||"",this.currentPage=t.query.p||1,this.load(),e()},created:function(){this.search=this.$route.query.q||"",this.currentPage=this.$route.query.p||1,this.load()}},m={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("div",{staticClass:"container"},[t._m(0),t._v(" "),e("div",{staticClass:"section"},[e("form",{on:{submit:function(s){return s.preventDefault(),t.submit(s)}}},[e("div",{staticClass:"box mb-5"},[e("div",{staticClass:"field has-addons"},[e("div",{staticClass:"control is-expanded"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],staticClass:"input has-text-centered px30",attrs:{type:"search",placeholder:"looking for ..."},domProps:{value:t.search},on:{input:function(s){s.target.composing||(t.search=s.target.value)}}})]),t._v(" "),t._m(1)])])]),t._v(" "),e("div",[e("div",{directives:[{name:"show",rawName:"v-show",value:t.isLoading,expression:"isLoading"}],staticClass:"column "},[t._m(2)]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:0==t.podcasts.length&&!t.isLoading,expression:"podcasts.length == 0 && !isLoading"}],staticClass:"column"},[t._m(3)]),t._v(" "),t._l(t.podcasts,function(s){return e("PodcastListItem",{directives:[{name:"show",rawName:"v-show",value:!t.isLoading,expression:"!isLoading"}],key:s.id,attrs:{p:s}})}),t._v(" "),e("div",{staticClass:"column "},[e("div",{staticClass:"card-content"},[e("div",{staticClass:"is-pulled-left"},[e("p",{staticClass:"title is-4 no-padding"},[e("a",{directives:[{name:"show",rawName:"v-show",value:!t.first,expression:"!first"}],attrs:{title:"Previous"},on:{click:t.prev}},[t._v("<<<<<<")])])]),t._v(" "),e("div",{staticClass:"is-pulled-right"},[e("p",{staticClass:"title is-4 no-padding"},[e("a",{directives:[{name:"show",rawName:"v-show",value:!t.last,expression:"!last"}],attrs:{title:"Next"},on:{click:t.next}},[t._v(">>>>>")])])])])])],2)])])])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{attrs:{id:"flow"}},[s("span",{staticClass:"flow-1"}),this._v(" "),s("span",{staticClass:"flow-2"}),this._v(" "),s("span",{staticClass:"flow-3"})])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"control"},[s("a",{staticClass:"button is-info px30"},[this._v("Search")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:" card"},[s("div",{staticClass:"card-content"},[s("div",{staticClass:"content"},[s("div",{staticClass:"media-content"},[s("p",{staticClass:"title is-4 no-padding"},[this._v("Loading ... ")])])])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"card "},[s("div",{staticClass:"card-content"},[s("div",{staticClass:"content"},[s("div",{staticClass:"media-content"},[s("p",{staticClass:"title is-4 no-padding"},[this._v("Nothing found yet! ;( ")])])])])])}]};var f=e("VU/8")(v,m,!1,function(t){e("O3AU")},null,null).exports,g=Object.assign||function(t){for(var s=1;s<arguments.length;s++){var e=arguments[s];for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a])}return t},_={name:"Podcasts",props:["producer_id"],components:{PodcastListItem:p},computed:g({},Object(c.d)(["podcasts","totalPages","first","last","isLoading"]),{pid:function(){return(this.producer_id||"").split("-")[0]}}),data:function(){return{currentPage:1,search:""}},methods:g({},Object(c.b)(["loadPodcasts"]),{submit:function(){this.currentPage=1,this.doSearch()},next:function(){this.last||(this.currentPage++,this.doSearch())},prev:function(){this.first||(this.currentPage--,this.doSearch())},doSearch:function(){var t={p:this.currentPage};this.search&&(t.q=this.search),this.$router.push({name:"producerShows",param:{producer_id:this.producerId},query:t})},load:function(){this.loadPodcasts({page:this.currentPage,q:this.search,pid:this.pid})}}),beforeRouteUpdate:function(t,s,e){this.search=t.query.q||"",this.currentPage=t.query.p||1,this.load(),e()},created:function(){this.search=this.$route.query.q||"",this.currentPage=this.$route.query.p||1,this.load()}},C={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("div",{staticClass:"container"},[t._m(0),t._v(" "),e("div",{staticClass:"section"},[e("form",{on:{submit:function(s){return s.preventDefault(),t.submit(s)}}},[e("div",{staticClass:"box mb-5"},[e("div",{staticClass:"field has-addons"},[e("div",{staticClass:"control is-expanded"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],staticClass:"input has-text-centered px30",attrs:{type:"search",placeholder:"looking for ..."},domProps:{value:t.search},on:{input:function(s){s.target.composing||(t.search=s.target.value)}}})]),t._v(" "),t._m(1)])])]),t._v(" "),e("div",[e("div",{directives:[{name:"show",rawName:"v-show",value:t.isLoading,expression:"isLoading"}],staticClass:"column "},[t._m(2)]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:0==t.podcasts.length&&!t.isLoading,expression:"podcasts.length == 0 && !isLoading"}],staticClass:"column"},[t._m(3)]),t._v(" "),t._l(t.podcasts,function(s){return e("PodcastListItem",{directives:[{name:"show",rawName:"v-show",value:!t.isLoading,expression:"!isLoading"}],key:s.id,attrs:{p:s}})}),t._v(" "),e("div",{staticClass:"column "},[e("div",{staticClass:"card-content"},[e("div",{staticClass:"is-pulled-left"},[e("p",{staticClass:"title is-4 no-padding"},[e("a",{directives:[{name:"show",rawName:"v-show",value:!t.first,expression:"!first"}],attrs:{title:"Previous"},on:{click:t.prev}},[t._v("<<<<<<")])])]),t._v(" "),e("div",{staticClass:"is-pulled-right"},[e("p",{staticClass:"title is-4 no-padding"},[e("a",{directives:[{name:"show",rawName:"v-show",value:!t.last,expression:"!last"}],attrs:{title:"Next"},on:{click:t.next}},[t._v(">>>>>")])])])])])],2)])])])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{attrs:{id:"flow"}},[s("span",{staticClass:"flow-1"}),this._v(" "),s("span",{staticClass:"flow-2"}),this._v(" "),s("span",{staticClass:"flow-3"})])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"control"},[s("a",{staticClass:"button is-info px30"},[this._v("Search")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"card "},[s("div",{staticClass:"card-content"},[s("div",{staticClass:"content"},[s("div",{staticClass:"media-content"},[s("p",{staticClass:"title is-4 no-padding"},[this._v("Loading ... ")])])])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"card "},[s("div",{staticClass:"card-content"},[s("div",{staticClass:"content"},[s("div",{staticClass:"media-content"},[s("p",{staticClass:"title is-4 no-padding"},[this._v("Nothing found yet! ;( ")])])])])])}]},w=e("VU/8")(_,C,!1,null,null,null).exports,b=Object.assign||function(t){for(var s=1;s<arguments.length;s++){var e=arguments[s];for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a])}return t},y={computed:b({},Object(c.c)(["producers","isLoading"])),data:function(){return{producer:{name:"",website:"",feedUrl:""}}},methods:b({},Object(c.b)(["loadProducers","saveProducer"]),{add:function(){this.saveProducer(this.producer),this.producer={name:"",website:"",feedUrl:""}},getEmptyPriducer:function(){return{name:"",url:"",feedUrl:""}},load:function(){this.loadProducers()},slugp:function(t){return`${t.id}-${this.$options.filters.slugify(t.name)}`}}),created:function(){this.load()}},P={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("div",{staticClass:"container"},[t._m(0),t._v(" "),e("div",{staticClass:"section"},[t._m(1),t._v(" "),e("div",{staticClass:"section card"},[e("h3",[t._v("Producers list")]),t._v(" "),e("div",[e("form",{staticClass:"pv4 bt bb b--black-10 ph3 ph0-l",on:{submit:function(s){return s.preventDefault(),t.add(s)}}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.producer.name,expression:"producer.name"}],attrs:{type:"text",required:"",placeholder:"producer name"},domProps:{value:t.producer.name},on:{input:function(s){s.target.composing||t.$set(t.producer,"name",s.target.value)}}}),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.producer.url,expression:"producer.url"}],attrs:{type:"url",required:"",placeholder:"producer url"},domProps:{value:t.producer.url},on:{input:function(s){s.target.composing||t.$set(t.producer,"url",s.target.value)}}}),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.producer.feedUrl,expression:"producer.feedUrl"}],attrs:{type:"url",required:"",placeholder:"feeds url"},domProps:{value:t.producer.feedUrl},on:{input:function(s){s.target.composing||t.$set(t.producer,"feedUrl",s.target.value)}}}),t._v(" "),e("button",[t._v("add")])])]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.isLoading,expression:"isLoading"}],staticClass:"card-content"},[t._m(2)]),t._v(" "),e("div",{staticClass:"card-content"},t._l(t.producers,function(s){return e("div",{key:s.feedUrl},[e("router-link",{staticClass:" is-text",attrs:{to:{name:"producerShows",params:{producer_id:t.slugp(s)}}}},[t._v(t._s(s.name))]),t._v("\n                        ("+t._s(s.count)+" shows)")],1)}))])])])])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{attrs:{id:"flow"}},[s("span",{staticClass:"flow-1"}),this._v(" "),s("span",{staticClass:"flow-2"}),this._v(" "),s("span",{staticClass:"flow-3"})])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",[s("span",{staticClass:"flow-1"}),this._v(" "),s("span",{staticClass:"flow-2"}),this._v(" "),s("span",{staticClass:"flow-3"})])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"column "},[s("div",{staticClass:" card1"},[s("div",{staticClass:"card-content"},[s("div",{staticClass:"content"},[s("div",{staticClass:"media-content"},[s("p",{staticClass:"title is-4 no-padding"},[this._v("Loading ... ")])])])])])])}]},x=e("VU/8")(y,P,!1,null,null,null).exports,L={methods:{test:function(t){t.target&&this.axios.get(`http://rssfeedvalidator.herokuapp.com/api/testrss?url=${t.target.value}`).then(t=>{console.log(t.data)})}}},$={render:function(){var t=this.$createElement,s=this._self._c||t;return s("div",[s("h2",[this._v("Tester")]),this._v(" "),s("div",[s("input",{attrs:{type:"text",placeholder:"feed url"}}),this._v(" "),s("button",{on:{click:this.test}},[this._v("Test")])]),this._v(" "),this._m(0)])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",[s("h3",[this._v("What do we get back?")])])}]},N=e("VU/8")(L,$,!1,null,null,null).exports,q={name:"login",data:function(){return{username:"",password:""}},methods:(Object.assign||function(t){for(var s=1;s<arguments.length;s++){var e=arguments[s];for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a])}return t})({},Object(c.b)(["login"]),{logMeIn:function(){this.login({username:this.username,password:this.password}),this.$router.push("/admin/producers")}})},O={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("div",{staticClass:"container"},[t._m(0),t._v(" "),e("div",{staticClass:"section"},[e("div",{staticClass:"column "},[e("div",{staticClass:"card is-centered"},[e("div",{staticClass:"card-content"},[e("div",{staticClass:"media"},[e("div",{staticClass:"media-content "},[e("p",{staticClass:"title is-4"},[t._v("\n                                    Login here\n                                ")]),e("form",{on:{submit:function(s){return s.preventDefault(),t.logMeIn(s)}}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],attrs:{type:"text",placeholder:"user",required:""},domProps:{value:t.username},on:{input:function(s){s.target.composing||(t.username=s.target.value)}}}),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{type:"password",required:""},domProps:{value:t.password},on:{input:function(s){s.target.composing||(t.password=s.target.value)}}}),t._v(" "),e("button",{staticClass:"button"},[t._v("login")])])])])])])])])])])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{attrs:{id:"flow"}},[s("span",{staticClass:"flow-1"}),this._v(" "),s("span",{staticClass:"flow-2"}),this._v(" "),s("span",{staticClass:"flow-3"})])}]},j=e("VU/8")(q,O,!1,null,null,null).exports,E=Object.assign||function(t){for(var s=1;s<arguments.length;s++){var e=arguments[s];for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a])}return t},S={props:["id"],computed:E({},Object(c.c)(["podcast","isLoading"])),methods:E({},Object(c.b)(["loadPodcast"]),{load:function(){if(this.id){const t=this.id.split("-")[0];this.loadPodcast(t)}},slugp:function(t){return`${t.producerId}-${this.$options.filters.slugify(t.producerName)}`}}),created:function(){this.load()}},U={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("div",{directives:[{name:"show",rawName:"v-show",value:t.isLoading,expression:"isLoading"}],staticClass:"column "},[t._m(0)]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:!t.isLoading,expression:"!isLoading"}],staticClass:"column "},[e("div",{staticClass:"card "},[e("div",{staticClass:"card-content"},[e("div",{staticClass:"media"},[e("div",{staticClass:"media-content"},[e("p",{staticClass:"title is-4 no-padding"},[t._v(t._s(t.podcast.title))]),t._v(" "),e("p",[e("span",{staticClass:"title is-6"},[t._v("\n                            by  "),e("router-link",{attrs:{to:{name:"producerShows",params:{producer_id:t.slugp(t.podcast)}}}},[t._v(t._s(t.podcast.producerName))])],1),t._v("\n                            on "+t._s(t._f("date")(t.podcast.publishedDate)))])])]),t._v(" "),e("div",{staticClass:"content"},[e("audio",{attrs:{controls:"",src:t.podcast.mp3}},[t._v("\n                        Your browser does not support the "),e("code",[t._v("audio")]),t._v(" element.\n                    ")])])])])])])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"card "},[s("div",{staticClass:"card-content"},[s("div",{staticClass:"content"},[s("div",{staticClass:"media-content"},[s("p",{staticClass:"title is-4 no-padding"},[this._v("Loading podcast... ")])])])])])}]},k=e("VU/8")(S,U,!1,null,null,null).exports,M=e("f2KA");a.default.use(o.a);var I=new o.a({mode:"history",scrollBehavior:(t,s,e)=>({x:0,y:0}),routes:[{path:"/",name:"root",component:f},{path:"/shows/:id",component:k,props:!0},{path:"/producers/:producer_id",component:w,props:!0,name:"producerShows"},{path:"/admin/producers",component:x,name:"producers",beforeEnter(t,s,e){(localStorage.getItem("auth")||"").length>0?e():e("/login")}},{path:"/admin/test",name:"feedTester",component:N},{path:"/login",name:"Login",component:j},{path:"/logout",name:"Logout",beforeEnter(t,s,e){localStorage.removeItem("auth"),e("/")}},{path:"/error",name:"error",component:M.default},{path:"*",component:f,beforeEnter(t,s,e){console.log("*"),e()}}]}),A=e("mtWM"),R=e.n(A),V=e("Rf8U"),F=e.n(V),D=e("ijY1"),W=e("LONX"),H=e.n(W);a.default.use(c.a);var T=new c.a.Store({state:{podcasts:[],producers:[],first:!0,last:!0,q:"",isLoggedIn:!!localStorage.getItem("auth"),isLoading:!1,player:new Audio,isPlaying:!1,mp3:null,isMp3Loading:!1},getters:{producers:t=>t.producers,isLoading:t=>t.isLoading,isPlaying:t=>t.isPlaying,mp3:t=>t.mp3,isMp3Loading:t=>t.isMp3Loading,player:t=>t.player},mutations:{setPodcasts(t,s){t.podcasts=s.podcasts,t.first=s.first,t.last=s.last,t.totalPages=s.totalPages},setProducers:(t,s)=>t.producers=s,isLoading:(t,s)=>{t.isLoading=s,1==s&&(t.first=!0,t.last=!0)},isPlaying:(t,s)=>t.isPlaying=s,isMp3Loading:(t,s)=>t.isMp3Loading=s,setMp3:(t,s)=>t.mp3=s},actions:{play({commit:t,getters:s},e){var a=s.player;a.src==e?(t("isPlaying",!1),a.pause(),a.currentTime=0,a.src=null,t("isMp3Loading",!1)):(a.src=e,t("setMp3",e),t("isPlaying",!1),t("isMp3Loading",!0),a.play().then(function(){t("isPlaying",!0),t("isMp3Loading",!1)},()=>t("isMp3Loading",!1)))},loadPodcasts(t,s){var e=`/api/showslist?page=${s.page}`;s.pid&&(e=`/api/producers/${s.pid}/shows?page=${s.page}`),s.q&&(e+="&q="+s.q),t.commit("isLoading",!0),a.default.axios.get(e).then(s=>{t.commit("setPodcasts",{podcasts:s.data.shows,last:s.data.last,first:s.data.first,totalPages:s.data.totalPages}),t.commit("isLoading",!1)}).catch(s=>{t.commit("isLoading",!1),console.log(s)})},loadProducers(t){t.commit("isLoading",!0),a.default.axios.get("/api/admin/producers").then(s=>{t.commit("setProducers",s.data),t.commit("isLoading",!1)}).catch(s=>{console.log(s),t.commit("isLoading",!0)})},saveProducer(t,s){a.default.axios.post("/api/admin/producers",s).then(s=>{t.dispatch("loadProducers")}).catch(t=>console.log(t))},login(t,s){var e=btoa(`${s.username}:${s.password}`);localStorage.setItem("auth",e)}}});a.default.use(F.a,R.a),a.default.use(D),a.default.config.productionTip=!1,a.default.use(H.a,{axios:R.a}),a.default.prototype.$eventHub=new a.default,a.default.filter("date",function(t){if(!t)return"";var s=new Date(t);return`${s.getFullYear()}-${s.getMonth()+1}-${s.getDate()}`}),a.default.filter("slugify",function(t){return(t||"").toString().toLowerCase().replace(/\s+/g,"-").replace(/[^\w\-]+/g,"").replace(/\-\-+/g,"-").replace(/^-+/,"").replace(/-+$/,"")}),R.a.interceptors.request.use(function(t){const s=localStorage.getItem("auth")||"";return s.length>0&&(t.headers={Authorization:`Basic ${s}`}),t},function(t){return Promise.reject(t)}),R.a.interceptors.response.use(function(t){return t},function(t){if((t.response.status+"").startsWith("50")&&(window.location="/error"),400==t.response.status)window.location="/";else{if(![401,403].includes(t.response.status))return Promise.reject(t);localStorage.clear(),window.location="/login"}}),new a.default({el:"#app",store:T,router:I,components:{App:n},template:"<App/>"})},Nrlj:function(t,s){},O3AU:function(t,s){},SQ71:function(t,s){},UE2a:function(t,s){},f2KA:function(t,s,e){"use strict";var a=e("Nrlj"),i=e.n(a),r=e("oV/q");var n=function(t){e("SQ71")},o=e("VU/8")(i.a,r.a,!1,n,null,null);s.default=o.exports},"oV/q":function(t,s,e){"use strict";var a={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",[s("h2",[this._v("Ups, something went wrong :( ")]),this._v(" "),s("div",[s("p",[s("a",{attrs:{href:"/"}},[this._v("Click here to go back!")])])]),this._v(" "),s("div",[s("img",{attrs:{src:"https://images.unsplash.com/photo-1507697364665-69eec30ea71e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dfc627dbcbcfca5026ad3f657a4a505f&auto=format&fit=crop&w=1651&q=80",alt:"not found image"}})])])}]};s.a=a},qb6w:function(t,s){},xKtf:function(t,s){}},["NHnr"]);
//# sourceMappingURL=app.80b8fbf4f221814e7243.js.map