<template>
<div>
  <b-row>
    <b-colxx xxs="12">
      <h1>Client ID :- {{ this.clientinfo.client[0].id }}</h1>
      <piaf-breadcrumb/>
      <div class="top-right-button-container">
          <b-button
            v-b-modal.modalright
            variant="primary"
            size="lg"
            class="top-right-button"
          >{{ $t('pages.add-new-location') }}</b-button>
          <b-modal
            id="modalright"
            ref="modalright"
            :title="$t('client.add-new-location')"
            class="modal-right"
          >
            <b-form>
              <b-form-group :label="$t('client.location-name')">
                 <b-form-input v-model="clientlocation.name"/>
                 <!-- // Validations -->
                <div v-if="!$v.clientlocation.name.required" class="alert alert-danger">
                  <strong>Error! </strong>Fullname Field is Required
                </div>
                <div v-else-if="!$v.clientlocation.name.minLength" class="alert alert-danger">
                  <strong>Error! </strong>Name Must contain Minimum 5 alphabet
                </div>
                <div v-else-if="!$v.clientlocation.name.maxLength" class="alert alert-danger">
                  <strong>Error! </strong>Name Must contain Maximum 15 alphabet
                </div>
                <!-- // End -->
              </b-form-group>              
              <b-form-group :label="$t('client.location-email')">
                <b-form-input v-model="clientlocation.email"/>
                <!-- // Custom Validations -->
                <div v-if="!$v.clientlocation.email.required" class="alert alert-danger">
                  <strong>Error! </strong>Email Field is Required
                </div>
                <div v-if="!$v.clientlocation.email.EmailVerify" class="alert alert-danger">
                  <strong>Error! </strong>You have entered an invalid Email Address!, Email must conatin '@' , 'com'
                </div>
                <!-- // End -->
              </b-form-group>
              <b-form-group :label="$t('client.location-phone')">
                <b-form-input type="number" v-model="clientlocation.phone"/>
                <!-- Phone Validations -->
                <div v-if="!$v.clientlocation.phone.required" class="alert alert-danger">
                  <strong>Error! </strong>Phone Field is Required
                </div>  
                <div v-if="!$v.clientlocation.phone.minLength" class="alert alert-danger">
                  <strong>Error! </strong>Phone Must Contain Atleast 10 Numeric Alphabets
                </div>  
                <div v-if="!$v.clientlocation.phone.maxLength" class="alert alert-danger">
                  <strong>Error! </strong>Phone Should be 10 Numeric Alphabets
                </div>
                <!-- End -->
              </b-form-group>
              <b-form-group :label="$t('client.location-geo')">
                <b-form-input type="number" v-model="clientlocation.geolocation"/>
                <!-- Phone Validations -->
                <div v-if="!$v.clientlocation.geolocation.required" class="alert alert-danger">
                  <strong>Error! </strong>GeoLocation Field is Required
                </div>  
                <div v-if="!$v.clientlocation.geolocation.minLength" class="alert alert-danger">
                  <strong>Error! </strong>GeoLocation Must Contain Atleast 10 Numeric Alphabets
                </div>  
                <div v-if="!$v.clientlocation.geolocation.maxLength" class="alert alert-danger">
                  <strong>Error! </strong>GeoLocation Should be 10 Numeric Alphabets
                </div>
                <!-- End -->
              </b-form-group>
              <b-form-group :label="$t('client.location-address')">
                <b-form-input v-model="clientlocation.address"/>
                <!-- // Validations -->
                <div v-if="!$v.clientlocation.address.required" class="alert alert-danger">
                  <strong>Error! </strong>Address Field is Required
                </div>
                <div v-else-if="!$v.clientlocation.address.minLength" class="alert alert-danger">
                  <strong>Error! </strong>Address Must contain Minimum 5 alphabet
                </div>
                <div v-else-if="!$v.clientlocation.address.maxLength" class="alert alert-danger">
                  <strong>Error! </strong>Address Must contain Maximum 15 alphabet
                </div>
                <!-- // End -->
              </b-form-group>
              <b-form-group :label="$t('client.location-floor')">
                <b-form-input type="number" v-model="clientlocation.floors_count"/>
                <!-- // Validations -->
                <div v-if="!$v.clientlocation.floors_count.required" class="alert alert-danger">
                  <strong>Error! </strong>Floor Count Field is Required
                </div>
                <div v-else-if="!$v.clientlocation.name.maxLength" class="alert alert-danger">
                  <strong>Error! </strong>Name Must contain Maximum 0-10 
                </div>
                <!-- // End -->
              </b-form-group>
            </b-form>
            <template slot="modal-footer">
              <b-button
                variant="outline-secondary"
                @click="hideModal('modalright')"
              >{{ $t('pages.cancel') }}</b-button>
              <b-button
                variant="primary"
                @click.stop="AddLocation()"
                class="mr-1"
              >{{ $t('pages.submit') }}</b-button>
            </template>
          </b-modal>
          <b-modal
            id="editOrder"
            ref="editOrder"
            :title="$t('client.edit-location')"
            class="modal-right"
          >
            <b-form>
              <b-form-group :label="$t('client.location-name')">
                 <b-form-input v-model="clientlocation.name"/>
                 <!-- // Validations -->
                <div v-if="!$v.clientlocation.name.required" class="alert alert-danger">
                  <strong>Error! </strong>Fullname Field is Required
                </div>
                <div v-else-if="!$v.clientlocation.name.minLength" class="alert alert-danger">
                  <strong>Error! </strong>Name Must contain Minimum 5 alphabet
                </div>
                <div v-else-if="!$v.clientlocation.name.maxLength" class="alert alert-danger">
                  <strong>Error! </strong>Name Must contain Maximum 15 alphabet
                </div>
                <!-- // End -->
              </b-form-group>              
              <b-form-group :label="$t('client.location-email')">
                <b-form-input v-model="clientlocation.email"/>
                <!-- // Custom Validations -->
                <div v-if="!$v.clientlocation.email.required" class="alert alert-danger">
                  <strong>Error! </strong>Email Field is Required
                </div>
                <div v-if="!$v.clientlocation.email.EmailVerify" class="alert alert-danger">
                  <strong>Error! </strong>You have entered an invalid Email Address!, Email must conatin '@' , 'com'
                </div>
                <!-- // End -->
              </b-form-group>
              <b-form-group :label="$t('client.location-phone')">
                <b-form-input type="number" v-model="clientlocation.phone"/>
                <!-- Phone Validations -->
                <div v-if="!$v.clientlocation.phone.required" class="alert alert-danger">
                  <strong>Error! </strong>Phone Field is Required
                </div>  
                <div v-if="!$v.clientlocation.phone.minLength" class="alert alert-danger">
                  <strong>Error! </strong>Phone Must Contain Atleast 10 Numeric Alphabets
                </div>  
                <div v-if="!$v.clientlocation.phone.maxLength" class="alert alert-danger">
                  <strong>Error! </strong>Phone Should be 10 Numeric Alphabets
                </div>
                <!-- End -->
              </b-form-group>
              <b-form-group :label="$t('client.location-geo')">
                <b-form-input type="number" v-model="clientlocation.geolocation"/>
                <!-- Phone Validations -->
                <div v-if="!$v.clientlocation.geolocation.required" class="alert alert-danger">
                  <strong>Error! </strong>GeoLocation Field is Required
                </div>  
                <div v-if="!$v.clientlocation.geolocation.minLength" class="alert alert-danger">
                  <strong>Error! </strong>GeoLocation Must Contain Atleast 10 Numeric Alphabets
                </div>  
                <div v-if="!$v.clientlocation.geolocation.maxLength" class="alert alert-danger">
                  <strong>Error! </strong>GeoLocation Should be 10 Numeric Alphabets
                </div>
                <!-- End -->
              </b-form-group>
              <b-form-group :label="$t('client.location-address')">
                <b-form-input v-model="clientlocation.address"/>
                <!-- // Validations -->
                <div v-if="!$v.clientlocation.address.required" class="alert alert-danger">
                  <strong>Error! </strong>Address Field is Required
                </div>
                <div v-else-if="!$v.clientlocation.address.minLength" class="alert alert-danger">
                  <strong>Error! </strong>Address Must contain Minimum 5 alphabet
                </div>
                <div v-else-if="!$v.clientlocation.address.maxLength" class="alert alert-danger">
                  <strong>Error! </strong>Address Must contain Maximum 15 alphabet
                </div>
                <!-- // End -->
              </b-form-group>
              <b-form-group :label="$t('client.location-floor')">
                <b-form-input type="number" v-model="clientlocation.floors_count"/>
                <!-- // Validations -->
                <div v-if="!$v.clientlocation.floors_count.required" class="alert alert-danger">
                  <strong>Error! </strong>Floor Count Field is Required
                </div>
                <div v-else-if="!$v.clientlocation.name.maxLength" class="alert alert-danger">
                  <strong>Error! </strong>Name Must contain Maximum 0-10 
                </div>
                <!-- // End -->
              </b-form-group>
            </b-form>
            <template slot="modal-footer">
              <b-button
                variant="outline-secondary"
                @click="hideModal('modalright')"
              >{{ $t('pages.cancel') }}</b-button>
              <b-button
                variant="primary"
                @click="updateorders()"
                class="mr-1"
              >{{ $t('pages.submit') }}</b-button>
            </template>
          </b-modal>
        </div>
      <b-tabs nav-class="separator-tabs ml-0 mb-5" content-class="tab-content" :no-fade="true">
        <b-tab :title="$t('pages.details')" >
          <b-row>
            <b-colxx xxs="12" lg="4" class="mb-4">
              <b-card class="mb-4" no-body>
                  <b-card-body>
                    <h2><b>{{ $t('client.client-details') }}</b></h2>
                    <br />
                    <div class="separator mb-5"/>
                    <p class="mb-3">Client Name :- {{ this.clientinfo.client[0].name }}</p>
                    <p class="mb-3">Client Email :-{{ this.clientinfo.client[0].email }}</p>
                    <p class="mb-3">Client Phone:- {{ this.clientinfo.client[0].phone }}</p>
                    <p class="mb-3">Client Address :- {{ this.clientinfo.client[0].address }}</p>
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
                    <h2><b>{{ $t('order.recent-order') }}</b></h2>
                    <br />
                    <div class="separator mb-5"/>
                  </b-card-body> 
              </b-card>
            </b-colxx>
          </b-row>
        </b-tab>
        <b-tab :title="$t('client.client-location')">
          <b-row>
            <b-colxx> 
              <client-information-item v-for="(clients,index) in this.clientinfo.client_location" :key="index" :data="clients" />
            </b-colxx>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-colxx>
  </b-row>
  </div>
</template>
<script>

import Vue from 'vue';
// Validations
import { helpers } from 'vuelidate/lib/validators'
import Vuelidate from 'vuelidate'
import { required, minLength,email,password,minValue,maxValue,maxLength,numeric,alpha } from 'vuelidate/lib/validators'
Vue.use(Vuelidate)
import {validationMixin} from "vuelidate";

const EmailVerify = helpers.regex('EmailVerify', /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/)

import Stars from '@/components/Common/Stars'
import RadialProgressCard from '@/components/Cards/RadialProgressCard'
import SmallLineChartCard from '@/components/Cards/SmallLineChartCard'
import AreaShadowChart from '@/components/Charts/AreaShadow'
import CommentItem from '@/components/Listing/CommentItem'

import { mapGetters, mapMutations, mapActions } from 'vuex'
import OrderStageItem from '@/components/Listing/OrderStageItem'
import ClientInformationItem from '@/components/Listing/ClientInformationItem'

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
    ClientInformationItem
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
      clientinfo:[],
      clientlocation: {
        name: '',
        email: '',
        phone: '',
        geolocation:'',
        address:'',
      },
    }
  },
  validations: {
    clientlocation: {
      required,
      name: {
        required,
        maxLength: maxLength(15),
        minLength: minLength(5),
      },
      email: {
        required,
        EmailVerify
      },
      phone: {
        required,
        maxLength: maxLength(10),
        minLength: minLength(2),
      },
      geolocation:{
        required,
        maxLength: maxLength(15),
        minLength: minLength(5),
      },
      address:{
        required,
        maxLength: maxLength(15),
        minLength: minLength(5),
      },
      floors_count:{
        required,
        maxLength: maxLength(10)
      }
    }
  },
  methods: {
    ...mapActions(['ClientDetails','CreateClientLocation']),
    loadItems (){
      this.isLoad = false
      //console.log(this.$route.params.client_id)
      this.ClientDetails(this.$route.params.client_id).then(result => {
       this.clientinfo = JSON.parse(result).data
       console.log(this.clientinfo)
       this.isLoad = true
      })
    },
    AddLocation () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        console.log()
      } else {
          console.log('Create Location : ', this.clientlocation)
          this.CreateClientLocation({client_id:this.clientinfo.client[0].id,name: this.clientlocation.name, email: this.clientlocation.email, phone:this.clientlocation.phone,geolocation:this.clientlocation.geolocation,address:this.clientlocation.address,floors_count:this.clientlocation.floors_count })
      }
    },
  },
  mounted () {
    this.loadItems()
  }
}
</script>
