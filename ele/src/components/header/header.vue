<template>
	<div class="header">
		<div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>  
      <div class="content">
        <div class="title">
          <span class="brand bg-image"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>  
      </div> 
      <div 
        v-if="seller.supports" 
        class="support-count" 
        @click="showDetail"
        >
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>         
    </div>
    <div class="bulletin-wrapper"  @click="showDetail">
      <span class="bulltin-title"></span><span class="bulltin-text">
        {{seller.bulletin}}
      </span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>         
            <div class="strar-wrapper">
               <v-star :size="48" :score="seller.score"></v-star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item,index) in seller.supports">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close">
          <i class="icon-close" @click="closeDetail"></i>
        </div>
      </div>
    </transition>
    
	</div>
</template>

<script type="text/javascript">
  import star from '@/components/star/star.vue'

  export default {
    props: {
      seller: {
        typr: Object        
      }
    },
    components: {
      'v-star':star
    },
    created(){
      this.classMap = ['decrease','discount','special','invoice','guarantee']     
    },
    data () {
      return {
        detailShow: false
      }
    },
    methods: {
      showDetail(){
        this.detailShow = true
      },
      closeDetail(){
        this.detailShow = false
      },
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../common/less/mixin.less';
  .header{
    color: #fff;
    background-color: rgba(7,17,27,0.5);
    position: relative; 
    overflow: hidden;    
    .content-wrapper{
      position: relative;
      padding: 24px 12px 18px 24px;
      font-size: 0;
      .avatar{
        display: inline-block;        
      }
      .content{
        display: inline-block;
        vertical-align: top;
        margin-left: 16px;
        font-size: 14px;
        .title{
          margin: 2px 0 8px 0;           
          .brand{     
            vertical-align: top;       
            display: inline-block;
            width: 30px;
            height: 18px;
            background-size: 30px 18px;
            background-repeat: no-repeat;
            .bg-image ('../../components/header/brand');
          }
          .name{           
            margin-left: 6px;
            font-size: 16px;
            line-height: 18px;
            font-weight:  bold;
          }
        }
        .description{
          font-size: 12px;
          line-height: 12px;
          margin-bottom: 10px;
        }
        .support{         
          line-height: 12px;
          font-size: 10px;
          margin-bottom: 2px;
          .icon{
            display: inline-block;
            vertical-align: top;
            width:12px;
            height:12px;
            background-size: 100%;
            &.decrease{
              .bg-image ('../../components/header/decrease_1');
            }
            &.discount{
              .bg-image ('../../components/header/discount_1');
            }
            &.guarantee{
              .bg-image ('../../components/header/guarantee_1');
            }
            &.invoice{
              .bg-image ('../../components/header/invoice_1');
            }
            &.special{
              .bg-image ('../../components/header/special_1');
            }
          }
          .text{
            line-height: 12px;
            font-size: 12px;
          }
        }
      }
      .support-count{
        vertical-align: top;
        position: absolute;
        right: 12px;
        bottom: 18px;
        padding: 0 8px;
        height: 24px;
        line-height: 24px;
        border-radius: 14px;
        background-color: rgba(0,0,0,0.2);
        text-align: center;
        .count{
          font-size: 10px;
        }
        .icon-keyboard_arrow_right{
          font-size: 10px;
          line-height: 24px;
          margin-left: 2px;
        }
      }
    }
    .bulletin-wrapper{  
      position: relative;   
      height: 28px;
      line-height: 28px;
      padding: 0 28px 0 12px;
      // font-size: 0; 
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;  
      background-color: rgba(7,17,27,0.2);
      .bulltin-title{
        vertical-align: top;
        display: inline-block;
        width: 22px;
        height: 12px;
        background-size: 22px 12px;
        .bg-image('../../components/header/bulletin');
        background-repeat: no-repeat;
        margin-top: 8px;
      }
      .bulltin-text{   
        vertical-align: top;                   
        margin: 0 4px;
        font-size: 10px;
        width: 100%;
      }
      .icon-keyboard_arrow_right{
        position: absolute;
        right:12px;
        top: 8px;
        font-size: 12px;
      }
    }
    .background{
      position: absolute;
      top:0;
      left:0;
      right:0;
      bottom: 0;
      z-index: -1;
      filter: blur(10px);
    }
    .fade-enter-active, .fade-leave-active {
      transition: all .5s
    }
    .fade-enter, .fade-leave-to {
      opacity: 0
    }
    .detail{
      position: fixed;
      z-index: 100;
      width: 100%;
      height: 100%;
      overflow: auto;
      top: 0;
      left: 0;
      background: rgba(7,17,27,0.8);      
      .detail-wrapper{
        min-height: 100%;
        overflow: auto;
        .detail-main{
          margin-top: 64px;
          padding-bottom: 64px;
          .name{
            line-height: 16px;
            text-align: center;
            font-size: 16px;
            font-weight: 700;
          }
          .strar-wrapper{
            margin-top: 18px;
            padding: 2px 0;
            text-align: center;
          }
          .title{
            width: 80%;
            display: flex;
            margin: 30px auto 24px auto;
            .line{
              flex: 1;
              position: relative;
              top: -6px;
              border-bottom: 1px solid rgba(255,255,255,0.2);
            }
            .text{
              padding: 0 12px;
              font-size: 14px;
            }
          }
          .supports{
            width: 80%;
            margin: 0 auto;
            .support-item{
              padding: 0 12px;
              margin-bottom: 12px;
              font-size: 0;
              &:last-child{
                margin-bottom: 0;
              }
              .icon{
                display: inline-block;
                width: 16px;
                height: 16px;
                vertical-align: top;
                margin-right: 6px;
                background-size: 16px 16px;
                background-repeat: no-repeat;
                &.decrease{
                  .bg-image ('../../components/header/decrease_2');
                }
                &.discount{
                  .bg-image ('../../components/header/discount_2');
                }
                &.guarantee{
                  .bg-image ('../../components/header/guarantee_2');
                }
                &.invoice{
                  .bg-image ('../../components/header/invoice_2');
                }
                &.special{
                  .bg-image ('../../components/header/special_2');
                }
              }
              .text{
                display: inline-block;   
                line-height: 16px;            
                font-size: 12px;
                height: 16px;
              }
            }
          }
          .bulletin{
            width: 80%;
            margin: 0 auto;
            .content{
              padding: 0 12px;
              line-height: 24px;
              font-size: 12px;
            }
          }
        }
      }
      .detail-close{
        margin: -64px auto 0 auto;
        width: 100%;
        position: relative; 
        text-align: center;
        clear: both;
        font-size: 32px;
        line-height: 32px; 
      }
    }
  }
</style> 
