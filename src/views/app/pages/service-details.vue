<template>
<div>
  <b-row>
    <b-colxx xxs="12">
      <h1>Service Name :- {{ this.servicedetails.name }}</h1>
      <piaf-breadcrumb/>
      <b-tabs nav-class="separator-tabs ml-0 mb-5" content-class="tab-content" :no-fade="true">
        <b-tab :title="$t('pages.details')" >
          <b-row>
            <b-colxx xxs="12" lg="4" class="mb-4">
              <b-card class="mb-4" no-body>
                  <!-- <img src="/assets/img/profile-pic-l-3.jpg" alt="Detail" style="border-radius:50%;"  class="client-new-img-top"/> -->
                  <b-card-body>
                    <h2><b>{{ $t('service.order-name') }}</b></h2>
                    <br />
                    <div class="separator mb-5"/>
                    <p class="mb-3">Order ID :- {{ this.servicedetails.name }}</p>
                    <p class="mb-3">Order Payment :-{{ this.servicedetails.description }}</p>
                    <p class="mb-3">Transaction ID:- {{ this.servicedetails.period }}</p>
                    <p class="mb-3">Price :- {{ this.servicedetails.price }}</p>
                    <div class="separator mb-5"/>
                  </b-card-body>
              </b-card>
            </b-colxx>
            <b-colxx xxs="12" lg="8" class="mb-4">
              <b-card class="mb-4" no-body>
                  <div class="position-absolute card-top-buttons">
                    <b-button variant="outline-white" class="icon-button"><i class="simple-icon-pencil" /></b-button>
                  </div>                   
                  <b-card-body>
                    <h2><b>{{ $t('client.service-details') }}</b></h2>
                    <br />
                    <p class="mb-3">Service Name :- {{ this.servicedetails.name }}</p>
                    <p class="mb-3">Service Description :-{{ this.servicedetails.description }}</p>
                    <p class="mb-3">Service Period:- {{ this.servicedetails.period }}</p>
                    <p class="mb-3">Price :- {{ this.servicedetails.price }}</p>
                    <div class="separator mb-5"/>
                    <h2><b>{{ $t('pages.price') }}</b></h2>
                    <p class="mb-3">Service Price in INR :- {{this.servicedetails.price}} ₹</p> 
                  </b-card-body> 
              </b-card>
            </b-colxx>
          </b-row>
        </b-tab>
        <b-tab :title="$t('client.orders-stages')">
          <b-row>
            <b-colxx>
              <service-stage-item v-for="(service,index) in this.servicedetails.order_stages" :key="index" :data="order" :sort="index+1" />
            </b-colxx>
          </b-row>
        </b-tab>
        <b-tab :title="$t('client.orders-milestone')">
          <b-row>
            <b-colxx>
              <order-milestone-item v-for="(order,index) in this.servicedetails.order_milestone" :key="index" :data="order" />
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
import ServiceStageItem from '@/components/Listing/ServiceStageItem'

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
    ServiceStageItem,
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
      servicedetails:[],
    }
  },
  methods: {
    ...mapActions(['ServiceDetails']),
    loadItems (){
      this.isLoad = false
      //console.log(this.$route.params.service_id)
      this.ServiceDetails(this.$route.params.service_id).then(result => {
       this.servicedetails = JSON.parse(result).data[0]     
       console.log(this.servicedetails)
       this.isLoad = true
      })
    },
  },
  mounted () {
    this.loadItems()
  }
}
</script>
