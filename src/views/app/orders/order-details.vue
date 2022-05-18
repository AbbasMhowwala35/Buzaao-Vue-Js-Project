<template>
<div>
  <b-row>
    <b-colxx xxs="12">
      <h1>Order ID :- {{ this.orderdetails.id }}</h1>
      <piaf-breadcrumb/>
      <b-tabs nav-class="separator-tabs ml-0 mb-5" content-class="tab-content" :no-fade="true">
        <b-tab :title="$t('pages.details')" >
          <b-row>
            <b-colxx xxs="12" lg="4" class="mb-4">
              <b-card class="mb-4" no-body>
                   <img src="/assets/img/profile-pic-l-3.jpg" alt="Detail" style="border-radius:50%;"  class="client-new-img-top"/>
                  <b-card-body>
                    <h2><b>{{ $t('client.client-details') }}</b></h2>
                    <br />
                    <div class="separator mb-5"/>
                    <p class="mb-3">Client Name :- {{ this.orderdetails.client.name }}</p>
                    <p class="mb-3">Client Email :-{{ this.orderdetails.client.email }}</p>
                    <p class="mb-3">Client Phone:- {{ this.orderdetails.client.phone }}</p>
                    <p class="mb-3">Client Address :- {{ this.orderdetails.client.address }}</p>
                    <div class="separator mb-5"/>
                    <!-- //Client Location -->
                    <h2><b>{{ $t('client.client-location') }}</b></h2><br />
                    <p class="mb-3">Location Name :- {{ this.orderdetails.client.client_location.name }}</p>
                    <p class="mb-3">Location Address :- {{ this.orderdetails.client.client_location.geolocation }}</p>
                    <p class="mb-3">{{ this.orderdetails.client.client_location.phone }}</p>
                    <p class="mb-3">{{ this.orderdetails.client.client_location.email }}</p>
                    <div class="separator mb-5"/>
                  </b-card-body>
              </b-card>
              <!-- <radial-progress-card :title="$t('pages.order-status')" :percent="85" no-suffle class="mb-4"/>
              <radial-progress-card :title="$t('pages.bake-progress')" :percent="40" no-suffle class="mb-4"/> -->
            </b-colxx>
            <b-colxx xxs="12" lg="8" class="mb-4">
              <b-card class="mb-4" no-body>
                  <div class="position-absolute card-top-buttons">
                    <b-button variant="outline-white" class="icon-button"><i class="simple-icon-pencil" /></b-button>
                  </div>                   
                  <b-card-body>
                    <h2><b>{{ $t('client.service-details') }}</b></h2>
                    <br />
                    <div class="separator mb-5"/>
                    <p class="mb-3">Service Name :- {{ this.orderdetails.service[0].name }}</p>
                    <p class="mb-3">Service Description :-{{ this.orderdetails.service[0].description }}</p>
                    <p class="mb-3">Service Period:- {{ this.orderdetails.service[0].period }}</p>
                    <div class="separator mb-5"/>
                    <h2><b>{{ $t('pages.price') }}</b></h2>
                    <p class="mb-3">Service Price in INR :- {{this.orderdetails.service[0].price}} ₹</p>
                  </b-card-body> 
              </b-card>
            </b-colxx>
            <!-- <b-colxx xxs="12" lg="8">
              <b-row v-if="isLoad">
                 <b-colxx xxs="6" class="mb-4">
                    <small-line-chart-card class="dashboard-small-chart-analytics" label-prefix="$" :data="smallChartData1"/>
                </b-colxx>
                <b-colxx xxs="6" class="mb-4">
                    <small-line-chart-card class="dashboard-small-chart-analytics" label-prefix="$" :data="smallChartData2"/>
                </b-colxx>
                <b-colxx xxs="6" class="mb-4">
                    <small-line-chart-card class="dashboard-small-chart-analytics" label-prefix="$" :data="smallChartData3"/>
                </b-colxx>
                <b-colxx xxs="6" class="mb-4">
                    <small-line-chart-card class="dashboard-small-chart-analytics" label-prefix="$" :data="smallChartData4"/>
                </b-colxx>
              </b-row>
            </b-colxx> -->
          </b-row>
        </b-tab>
        <b-tab :title="$t('client.orders-stages')">
          <b-row>
            <b-colxx>
              <order-stage-item v-for="(order,index) in this.orderdetails.order_stages" :key="index" :data="order" :sort="index+1" />
            </b-colxx>
          </b-row>
        </b-tab>
        <b-tab :title="$t('client.orders-milestone')">
          <b-row>
            <b-colxx>
              <order-milestone-item v-for="(order,index) in this.orderdetails.order_milestone" :key="index" :data="order" />
            </b-colxx>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-colxx>
  </b-row>
  </div>
</template>
<script>
import Stars from '@/components/Common/Stars'
import RadialProgressCard from '@/components/Cards/RadialProgressCard'
import SmallLineChartCard from '@/components/Cards/SmallLineChartCard'
import AreaShadowChart from '@/components/Charts/AreaShadow'
import CommentItem from '@/components/Listing/CommentItem'

import { mapGetters, mapMutations, mapActions } from 'vuex'
import OrderStageItem from '@/components/Listing/OrderStageItem'
import OrderMilestoneItem from '@/components/Listing/OrderMilestoneItem'

import { smallChartData1, smallChartData2, smallChartData3, smallChartData4, areaChartData } from '@/data/charts'
import comments from '@/data/comments'
import orders from '@/data/orders'


export default {
  components: {
    Stars,
    RadialProgressCard,
    SmallLineChartCard,
    AreaShadowChart,
    CommentItem,
    OrderStageItem,
    OrderMilestoneItem
  },
  data () {
    return {
      isLoad: false,
      smallChartData1,
      smallChartData2,
      smallChartData3,
      smallChartData4,
      areaChartData,
      comments: comments.slice(0, 5),
      orders,
      orderdetails:[],
    }
  },
  methods: {
    ...mapActions(['OrdersDetails']),
    loadItems (){
      this.isLoad = false
      //console.log(this.$route.params.order_id)
      this.OrdersDetails(this.$route.params.order_id).then(result => {
       this.orderdetails = JSON.parse(result).data.order[0]
       console.log(this.orderdetails)
       this.isLoad = true
      })
    },
  },
  mounted () {
    this.loadItems()
  }
}
</script>
