<template>
    <div class="background">
        <div class="section container">
            <section class="box has-text-centered">
                <div v-if="item">
                    <h1 class="title">Install {{item.name}}</h1>
                    <h2 class="subtitle">Published by {{item.author}}</h2>
                    <br>
                    <p> {{item.desc}}</p>
                    <br>
                    <b-button class="is-success" @click="install" :disabled="didClick">Install</b-button>
                    
                </div>
                <div v-else-if="error">
                  <p>{{error}}</p>
                </div>
                <div v-else>
                    <div class="sk-folding-cube">
                        <div class="sk-cube1 sk-cube"></div>
                        <div class="sk-cube2 sk-cube"></div>
                        <div class="sk-cube4 sk-cube"></div>
                        <div class="sk-cube3 sk-cube"></div>
                    </div>
                </div>
            </section>
            <nuxt-link to="/dashboard"><a>Home</a></nuxt-link>
        </div>
    </div>
</template>
 
<script>
import axios from "axios"
import state from "../../../state"
export default {
    computed: {
        type() { return this.$route.params.type },
        id() { return this.$route.params.id }
    },
    data(){
        return{
            item: false,
            error:false,
            didClick:false
        }
    },
    methods: {
      async install(){
        this.didClick = true
        //resolve theme
        if(this.type == "theme"){
          let theme = await axios.get(this.item.theme)
          this.item.theme = theme.data
          let install = await state.installTheme(this.item)
          if(install){
            this.$buefy.toast.open("Installed!")
          }else{
            this.$buefy.toast.open("Could not install theme, please try again later")
          }
        }else if(this.type =="blockpack"){
          let install = await state.installBlockPack(this.item)
          if(install){
            this.$buefy.toast.open("Installed!")
          }else{
            this.$buefy.toast.open("Could not install theme, please try again later")
          }
        }

      }
    },
    async mounted() {
      const itemRes = await axios.post(`${window.location.protocol}//${window.location.host}/.netlify/functions/get-${this.type}`,{
        id: this.$route.params.id
      })
      
      if(itemRes.data.success){
        this.item = itemRes.data.data
      }else{
        this.error = itemRes.data.error
      }
    }
}
</script>
 
<style scoped>
.background {
    background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
    height: 100vh;
}
.box{
  height: auto;
}
.sk-folding-cube {
  margin: 20px auto;
  width: 40px;
  height: 40px;
  position: relative;
  -webkit-transform: rotateZ(45deg);
          transform: rotateZ(45deg);
}
 
.sk-folding-cube .sk-cube {
  float: left;
  width: 50%;
  height: 50%;
  position: relative;
  -webkit-transform: scale(1.1);
      -ms-transform: scale(1.1);
          transform: scale(1.1); 
}
.sk-folding-cube .sk-cube:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #333;
  -webkit-animation: sk-foldCubeAngle 2.4s infinite linear both;
          animation: sk-foldCubeAngle 2.4s infinite linear both;
  -webkit-transform-origin: 100% 100%;
      -ms-transform-origin: 100% 100%;
          transform-origin: 100% 100%;
}
.sk-folding-cube .sk-cube2 {
  -webkit-transform: scale(1.1) rotateZ(90deg);
          transform: scale(1.1) rotateZ(90deg);
}
.sk-folding-cube .sk-cube3 {
  -webkit-transform: scale(1.1) rotateZ(180deg);
          transform: scale(1.1) rotateZ(180deg);
}
.sk-folding-cube .sk-cube4 {
  -webkit-transform: scale(1.1) rotateZ(270deg);
          transform: scale(1.1) rotateZ(270deg);
}
.sk-folding-cube .sk-cube2:before {
  -webkit-animation-delay: 0.3s;
          animation-delay: 0.3s;
}
.sk-folding-cube .sk-cube3:before {
  -webkit-animation-delay: 0.6s;
          animation-delay: 0.6s; 
}
.sk-folding-cube .sk-cube4:before {
  -webkit-animation-delay: 0.9s;
          animation-delay: 0.9s;
}
@-webkit-keyframes sk-foldCubeAngle {
  0%, 10% {
    -webkit-transform: perspective(140px) rotateX(-180deg);
            transform: perspective(140px) rotateX(-180deg);
    opacity: 0; 
  } 25%, 75% {
    -webkit-transform: perspective(140px) rotateX(0deg);
            transform: perspective(140px) rotateX(0deg);
    opacity: 1; 
  } 90%, 100% {
    -webkit-transform: perspective(140px) rotateY(180deg);
            transform: perspective(140px) rotateY(180deg);
    opacity: 0; 
  } 
}
 
@keyframes sk-foldCubeAngle {
  0%, 10% {
    -webkit-transform: perspective(140px) rotateX(-180deg);
            transform: perspective(140px) rotateX(-180deg);
    opacity: 0; 
  } 25%, 75% {
    -webkit-transform: perspective(140px) rotateX(0deg);
            transform: perspective(140px) rotateX(0deg);
    opacity: 1; 
  } 90%, 100% {
    -webkit-transform: perspective(140px) rotateY(180deg);
            transform: perspective(140px) rotateY(180deg);
    opacity: 0; 
  }
}
</style>
