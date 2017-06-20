<template>
  <div id="app" class="app">
    <v-Header :seller="seller"></v-Header>   
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link :to="{path:'/goods'}">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path:'/ratings'}">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path:'/seller'}">商家</router-link>
      </div>
    </div>    
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import Header from '@/components/header/header.vue'

const ERR_OK = 0

export default {
  name: 'app',
  data () {
    return {
      seller: {}
    }
  },
  created () {
    this.$http.get('/api/seller').then((response) => {
      if (response.body.errno === ERR_OK) {
        this.seller = response.body.data              
      }
    })
  },
  components: {
    'v-Header': Header    
  }
}
</script>

<style lang="less" rel="stylesheet/less">  
   @import './common/less/mixin';
  .app .tab{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;  
    box-sizing: border-box;  
    position: relative;
    z-index: 10;     
    .border-1px (#e6e7e8);     
    .tab-item{
      flex: 1;
      text-align: center;
      & > a{
        display: block;
        font-size: 14px; 
        color: rgb(77,85,93); 
      }  
      & > .active{
         color: rgb(240,20,20);
      }   
    }     
  }   
</style>
