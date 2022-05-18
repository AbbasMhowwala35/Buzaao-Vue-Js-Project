<template>
<div>
  <b-row>
    <b-colxx xxs="12">
      <h1>Staff Name :- {{ this.staffinfo.name }}</h1>
      <piaf-breadcrumb/>
      <b-tabs nav-class="separator-tabs ml-0 mb-5" content-class="tab-content" :no-fade="true">
        <b-tab :title="$t('pages.details')" >
          <b-row>
            <b-colxx xxs="12" lg="4" class="mb-4">
              <b-card class="mb-4" no-body>
                  <img :src="staffinfo.image" style="border-radius:50%;height:100px;width:100px;">
                  <b-card-body>
                    <h2><b>{{ $t('client.client-details') }}</b></h2>
                    <br />
                    <div class="separator mb-5"/>
                    <p class="mb-3">Staff Name :- {{ this.staffinfo.name }}</p>
                    <p class="mb-3">Staff Email :-{{ this.staffinfo.email }}</p>
                    <p class="mb-3">Staff Phone:- {{ this.staffinfo.phone }}</p>
                    <p class="mb-3">Staff Role :- {{ this.staffinfo.role }}</p>
                    <p class="mb-3" v-if="staffinfo.status == '1'">Staff:- Active</p>
                    <p class="mb-3" v-else>Staff:- Deactive</p>
                    <p class="mb-3">Staff Created Date :- {{ this.staffinfo.created_at }}</p>
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
                    <h2><b>{{ $t('user.user-permission') }}</b></h2>
                    <br />
                    <div class="separator mb-5"/>
                    <p class="mb-3"><b>{{ $t('menu.orders') }}</b></p>
                      <b-form-checkbox value="1" v-model="permissions">Add Order</b-form-checkbox>
                    <br />
                    <div class="separator mb-5"/>
                    <p class="mb-3"><b>{{ $t('menu.order-stages') }}</b></p>
                      <b-form-checkbox value="1" v-model="permissions">Add Order Stages</b-form-checkbox>
                    <br />
                    <div class="separator mb-5"/>
                    <p class="mb-3"><b>{{ $t('menu.order-stages-task') }}</b></p>
                    <b-form-checkbox-group>
                        <b-form-checkbox value="yes">Add Order Task</b-form-checkbox>
                        <b-form-checkbox value="no">View Order Task</b-form-checkbox>
                        <b-form-checkbox value="yes">Edit Order Task</b-form-checkbox>
                        <b-form-checkbox value="no">Delete Order Task</b-form-checkbox>
                    </b-form-checkbox-group>
                    <br />
                    <div class="separator mb-5"/>
                    <p class="mb-3"><b>{{ $t('menu.orders') }}</b></p>
                    <b-form-checkbox-group>
                        <b-form-checkbox value="yes">Add Order</b-form-checkbox>
                        <b-form-checkbox value="no">View Order</b-form-checkbox>
                        <b-form-checkbox value="yes">Edit Order</b-form-checkbox>
                        <b-form-checkbox value="no">Delete Order</b-form-checkbox>
                    </b-form-checkbox-group>
                    <br />
                    <div class="separator mb-5"/>
                    <p class="mb-3"><b>{{ $t('menu.orders') }}</b></p>
                    <b-form-checkbox-group>
                        <b-form-checkbox value="yes">Add Order</b-form-checkbox>
                        <b-form-checkbox value="no">View Order</b-form-checkbox>
                        <b-form-checkbox value="yes">Edit Order</b-form-checkbox>
                        <b-form-checkbox value="no">Delete Order</b-form-checkbox>
                    </b-form-checkbox-group>
                    <br />
                    <div class="separator mb-5"/>
                  </b-card-body> 
              </b-card>
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
    OrderStageItem
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
      staffinfo:[],
    }
  },
  methods: {
    ...mapActions(['StaffDetails']),
    loadItems (){
      this.isLoad = false
      this.StaffDetails(this.$route.params.staff_id).then(result => {
       this.staffinfo = JSON.parse(result).data.data
       this.isLoad = true
      })
    },
  },
  mounted () {
    this.loadItems()
  }
}
</script>
