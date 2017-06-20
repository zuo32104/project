<template>
  <div class="goods">      
    <div class="menu-wrapper" ref="menu-wrapper">
      <ul>
        <li 
          v-for="item,index in goods" 
          class="menu-item" 
          :class="{'current':currentIndex === index}" 
          @click="selectMenu(index,$event)"
          >
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foods-wrapper" >
      <ul >
        <li v-for="item in goods" class="food-list food-list-hook" >
          <h1 class="title">{{item.name}}</h1>
          <ul class="food-list-ul">
            <li v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">
                  {{food.name}}
                </h2>
                <p class="desc">
                  {{food.description}}
                </p>
                <div class="extra">
                  <span class="count">月销售{{food.sellCount}}份</span><span class="applause-rate">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">¥{{food.price}}</span><span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <v-shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></v-shopcart> 
  </div>
</template>

<script type="text/javascript">
  import BScroll from 'better-scroll'
  import shopcart from '@/components/shopcart/shopcart.vue'

  const ERR_OK = 0
  export default {
    props: {
      seller: {
        typr: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0
      }
    },
    computed:{
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++){
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i+1]
          if (!height2 || (this.scrollY>=height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      }
    },
    created() {
      this.$http.get('/api/goods').then((response) => {
        response = response.body        
        if(response.errno === ERR_OK){
          this.goods = response.data
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })        
        }
      }),
      this.classMap = ['decrease','discount','special','invoice','guarantee']    
    },
    methods: {     
      selectMenu(index,event) {
        if (!event._constructed){
          return 
        }
        let foodList = this.$refs['foods-wrapper'].getElementsByClassName('food-list-hook')
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el, 300)
      },
      _initScroll() {
        this.meunScroll = new BScroll(this.$refs['menu-wrapper'],{
          click: true
        })
        this.foodsScroll = new BScroll(this.$refs['foods-wrapper'],{
          probeType: 3
        })

        this.foodsScroll.on('scroll',(pos) => {
           this.scrollY = Math.abs(Math.round(pos.y))          
         })       
      },
      _calculateHeight() {
        let foodList = this.$refs['foods-wrapper'].getElementsByClassName('food-list-hook')
        let height = 0
        this.listHeight.push(height)
        for(let i=0; i<foodList.length; i++){
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }       
      }

    },
    components: {    
      'v-shopcart':shopcart
    }
  }
</script>

<style lang="less">
@import '../../common/less/mixin.less';
.goods{
  display: flex;
  position: absolute;  
  top: 174px;
  bottom: 46px;
  width: 100%;
  overflow: hidden; 
  .menu-wrapper{
    flex: 0 0 80px;
    width: 80px;
    background-color: #f3f5f7;
    .menu-item{
      display: table;
      height: 54px;
      width: 56px;
      line-height: 14px;
      padding: 0 12px;
      &.current{
        background-color: #fff;
        font-weight: 700;
        position: relative;
        marign-top: -1px;
        z-index: 10;
        .text{
          .border-none;
        }
      }
      .icon{
        display: inline-block;
        vertical-align: top;
        width:12px;
        height:12px;
        margin-right: 2px;       
        background-size: 100%;
        &.decrease{
          .bg-image ('../../components/goods/decrease_3');
        }
        &.discount{
          .bg-image ('../../components/goods/discount_3');
        }
        &.guarantee{
          .bg-image ('../../components/goods/guarantee_3');
        }
        &.invoice{
          .bg-image ('../../components/goods/invoice_3');
        }
        &.special{
          .bg-image ('../../components/goods/special_3');
        }
      }
      .text{
        display: table-cell;
        vertical-align: middle;
        width: 56px;
        font-size: 12px;
        .border-1px(rgba(7,17,27,0.1));        
      }
      &:last-child .text{
        .border-none;
      }
    }
  }
  .foods-wrapper{
    flex: 1;  
    .title{
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147,153,159);
      background-color: #f3f5f7;
    }
    .food-list-ul{
      overflow: hidden;
    }
    .food-item{
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      .border-1px(rgba(7,17,27,0.1));
      &:last-child{
        .border-none;
        padding-bottom: 0;
      }
      .icon{
        flex: 0 0 57px;
        margin-right: 10px;
      }
      .content{
        flex: 1;
        .name{
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7,17,27);          
        }
        .desc,.extra{          
          line-height: 10px;
          font-size: 10px;
          color: rgb(147,153,159);
        }
        .desc{
          margin-bottom: 8px;
          line-height: 12px;
        }
        .extra{
          line-height: 10px;
          font-size: 0;
          .count{
            margin-right: 12px;
            font-size: 10px;
          }
          .applause-rate{
            font-size: 10px;
          }
        }
        .price{
          font-weight: 700;
          line-height: 24px;
          .now{
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240,20,20);
          }
          .old{
            font-size: 10px;
            color: rgb(147,153,159);
            text-decoration: line-through;
          }
        }
      }
    }
  }
}
</style>
