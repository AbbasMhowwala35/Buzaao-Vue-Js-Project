<template>
<b-row>
  <b-colxx class="disable-text-selection">
    <b-row>
      <b-colxx xxs="12">
        <h1>{{ $t('order.organization-management') }}</h1>
        <div class="top-right-button-container">
          <b-button
            v-b-modal.modalright
            variant="primary"
            size="lg"
            class="top-right-button"
          >{{ $t('order.add-new-organization') }}</b-button>
          <b-button-group>
            <b-dropdown split right @click="selectAll(true)" class="check-button" variant="primary">
              <label
                class="custom-control custom-checkbox pl-4 mb-0 d-inline-block"
                slot="button-content"
              >
                <input
                  class="custom-control-input"
                  type="checkbox"
                  :checked="isSelectedAll"
                  v-shortkey="{select: ['ctrl','a'], undo: ['ctrl','d']}"
                  @shortkey="keymap"
                >
                <span
                  :class="{
                'custom-control-label' :true,
                'indeterminate' : isAnyItemSelected
              }"
                />
              </label>
              <b-dropdown-item>{{$t('pages.delete')}}</b-dropdown-item>
              <b-dropdown-item>{{$t('pages.another-action')}}</b-dropdown-item>
            </b-dropdown>
          </b-button-group>
          <b-modal
            id="modalright"
            ref="modalright"
            :title="$t('order.add-new-organization')"
            class="modal-right"
          >
            <b-form>
              <b-form-group :label="$t('order.organization-name')">
                 <input @input="$v.OrganizationArray.name.$touch" v-model="OrganizationArray.name" name="email" class="form-control" :class="{ 'input--error': $v.OrganizationArray.name.$error }" />
                <!-- // Validations -->
                <div v-if="!$v.OrganizationArray.name.required && $v.OrganizationArray.name.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Name Field is Required
                </div>
                <div v-else-if="!$v.OrganizationArray.name.minLength && $v.OrganizationArray.name.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Name Must contain Minimum 5 alphabet
                </div>
                <div v-else-if="!$v.OrganizationArray.name.maxLength && $v.OrganizationArray.name.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Name Must contain Maximum 15 alphabet
                </div>
                <!-- // End -->
              </b-form-group>
              <b-form-group :label="$t('order.organization-phone')">
                <input @input="$v.OrganizationArray.phone.$touch" type="number" v-model="OrganizationArray.phone" class="form-control" :class="{ 'input--error': $v.OrganizationArray.phone.$error }" />
                <!-- Phone Validations -->
                <div v-if="!$v.OrganizationArray.phone.required && $v.OrganizationArray.phone.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Phone Field is Required
                </div>  
                <div v-if="!$v.OrganizationArray.phone.minLength && $v.OrganizationArray.phone.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Phone Must Contain Atleast 10 Numeric Alphabets
                </div>  
                <div v-if="!$v.OrganizationArray.phone.maxLength && $v.OrganizationArray.phone.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Phone Should be 10 Numeric Alphabets
                </div>
                <!-- End -->
              </b-form-group>                                    
              <b-form-group :label="$t('order.organization-email')">
                <input @input="$v.OrganizationArray.email.$touch" type="email" v-model="OrganizationArray.email" class="form-control" :class="{ 'input--error': $v.OrganizationArray.email.$error }" />
                <!-- // Custom Validations -->
                <div v-if="!$v.OrganizationArray.email.required && $v.OrganizationArray.email.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Email Field is Required
                </div>
                <div v-if="!$v.OrganizationArray.email.Emaillverify && $v.OrganizationArray.email.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>You have entered an invalid Email Address!, Email must conatin '@' , 'com'
                </div>
                <!-- // End -->
              </b-form-group>
              <b-form-group :label="$t('order.organization-password')">
                <input @input="$v.OrganizationArray.password.$touch" type="password" v-model="OrganizationArray.password" class="form-control" :class="{ 'input--error': $v.OrganizationArray.password.$error }" />
                <!-- // Password Validation -->
                <div v-if="!$v.OrganizationArray.password.required && $v.OrganizationArray.password.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Password Field is Required
                </div>
                <div v-else-if="!$v.OrganizationArray.password.Strpass && $v.OrganizationArray.password.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Min. 8 characters with at least one capital letter, a number and a special character.
                </div>
                <!-- // End Validation  -->
              </b-form-group>
              <b-form-group :label="$t('order.organization-c_password')">
                <input @input="$v.OrganizationArray.c_password.$touch" type="password" v-model="OrganizationArray.c_password" class="form-control" :class="{ 'input--error': $v.OrganizationArray.c_password.$error }" />
                <div v-if="!$v.OrganizationArray.c_password.sameAsPassword && $v.OrganizationArray.c_password.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Password Must be same
                </div>
              </b-form-group>
              <b-form-group :label="$t('order.organization-address')">
                <b-textarea v-model="OrganizationArray.address" :rows="2" :max-rows="2"/>
                <div v-if="!$v.OrganizationArray.address.required && $v.OrganizationArray.address.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Address Field Is Required.
                </div>
              </b-form-group>
              <b-form-group>
                <input type="checkbox" value="1" v-model="OrganizationArray.service_management"> Service Managemenent<br />
                <input type="checkbox" value="1" v-model="OrganizationArray.service_stage"> Service Stages<br />
                <input type="checkbox" value="1" v-model="OrganizationArray.service_task"> Service Stages Task<br />
                <input type="checkbox" value="1" v-model="OrganizationArray.service_milestone"> Service Milestone<br />
                <input type="checkbox" value="1" v-model="OrganizationArray.order_management"> Order Managemenent<br />
                <input type="checkbox" value="1" v-model="OrganizationArray.order_stage"> Order Stages<br />
                <input type="checkbox" value="1" v-model="OrganizationArray.order_task"> Order Stages Task<br />
                <input type="checkbox" value="1" v-model="OrganizationArray.order_milestone"> Order Managemenent<br />
                <input type="checkbox" value="1" v-model="OrganizationArray.order_article"> Order Article<br />
                <input type="checkbox" value="1" v-model="OrganizationArray.client_management"> Client Management<br />
                <input type="checkbox" value="1" v-model="OrganizationArray.staff_management"> Staff Management<br />
              </b-form-group>                     
            </b-form>
            <template slot="modal-footer">
              <b-button
                variant="outline-secondary"
                @click="hideModal('modalright')"
              >{{ $t('pages.cancel') }}</b-button>
              <b-button
                variant="primary"
                @click.stop="AddOrganization()"
                class="mr-1"
              >{{ $t('pages.submit') }}</b-button>
            </template>
          </b-modal>
          <b-modal
            id="editOrder"
            ref="editOrder"
            :title="$t('order.edit-stage')"
            class="modal-right">
            <b-form>
              <b-form-group :label="$t('order.organization-name')">
                 <input @input="$v.OrganizationArray.name.$touch" v-model="OrganizationArray.name" name="email" class="form-control" :class="{ 'input--error': $v.OrganizationArray.name.$error }" />
                <!-- // Validations -->
                <div v-if="!$v.OrganizationArray.name.required && $v.OrganizationArray.name.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Name Field is Required
                </div>
                <div v-else-if="!$v.OrganizationArray.name.minLength && $v.OrganizationArray.name.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Name Must contain Minimum 5 alphabet
                </div>
                <div v-else-if="!$v.OrganizationArray.name.maxLength && $v.OrganizationArray.name.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Name Must contain Maximum 15 alphabet
                </div>
                <!-- // End -->
              </b-form-group>
              <b-form-group :label="$t('order.organization-phone')">
                <input @input="$v.OrganizationArray.phone.$touch" type="number" v-model="OrganizationArray.phone" class="form-control" :class="{ 'input--error': $v.OrganizationArray.phone.$error }" />
                <!-- Phone Validations -->
                <div v-if="!$v.OrganizationArray.phone.required && $v.OrganizationArray.phone.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Phone Field is Required
                </div>  
                <div v-if="!$v.OrganizationArray.phone.minLength && $v.OrganizationArray.phone.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Phone Must Contain Atleast 10 Numeric Alphabets
                </div>  
                <div v-if="!$v.OrganizationArray.phone.maxLength && $v.OrganizationArray.phone.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Phone Should be 10 Numeric Alphabets
                </div>
                <!-- End -->
              </b-form-group>                                    
              <b-form-group :label="$t('order.organization-email')">
                <input @input="$v.OrganizationArray.email.$touch" type="email" v-model="OrganizationArray.email" class="form-control" :class="{ 'input--error': $v.OrganizationArray.email.$error }" />
                <!-- // Custom Validations -->
                <div v-if="!$v.OrganizationArray.email.required && $v.OrganizationArray.email.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Email Field is Required
                </div>
                <div v-if="!$v.OrganizationArray.email.Emaillverify && $v.OrganizationArray.email.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>You have entered an invalid Email Address!, Email must conatin '@' , 'com'
                </div>
                <!-- // End -->
              </b-form-group>
              <b-form-group :label="$t('order.organization-password')">
                <input @input="$v.OrganizationArray.password.$touch" type="password" v-model="OrganizationArray.password" class="form-control" :class="{ 'input--error': $v.OrganizationArray.password.$error }" />
                <!-- // Password Validation -->
                <div v-if="!$v.OrganizationArray.password.required && $v.OrganizationArray.password.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Password Field is Required
                </div>
                <div v-else-if="!$v.OrganizationArray.password.Strpass && $v.OrganizationArray.password.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Min. 8 characters with at least one capital letter, a number and a special character.
                </div>
                <!-- // End Validation  -->
              </b-form-group>
              <b-form-group :label="$t('order.organization-c_password')">
                <input @input="$v.OrganizationArray.c_password.$touch" type="password" v-model="OrganizationArray.c_password" class="form-control" :class="{ 'input--error': $v.OrganizationArray.c_password.$error }" />
                <div v-if="!$v.OrganizationArray.c_password.sameAsPassword && $v.OrganizationArray.c_password.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Password Must be same
                </div>
              </b-form-group>
              <b-form-group :label="$t('order.organization-address')">
                <b-textarea v-model="OrganizationArray.address" :rows="2" :max-rows="2"/>
                <div v-if="!$v.OrganizationArray.address.required && $v.OrganizationArray.address.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Address Field Is Required.
                </div>
              </b-form-group>
              <b-form-group>
                <input type="checkbox" value="1" v-model="OrganizationArray.service_management"> Service Managemenent<br />
                <input type="checkbox" value="1" v-model="OrganizationArray.service_stage"> Service Stages<br />
                <input type="checkbox" value="1" v-model="OrganizationArray.service_task"> Service Stages Task<br />
                <input type="checkbox" value="1" v-model="OrganizationArray.service_milestone"> Service Milestone<br />
                <input type="checkbox" value="1" v-model="OrganizationArray.order_management"> Order Managemenent<br />
                <input type="checkbox" value="1" v-model="OrganizationArray.order_stage"> Order Stages<br />
                <input type="checkbox" value="1" v-model="OrganizationArray.order_task"> Order Stages Task<br />
                <input type="checkbox" value="1" v-model="OrganizationArray.order_milestone"> Order Managemenent<br />
                <input type="checkbox" value="1" v-model="OrganizationArray.order_article"> Order Article<br />
                <input type="checkbox" value="1" v-model="OrganizationArray.client_management"> Client Management<br />
                <input type="checkbox" value="1" v-model="OrganizationArray.staff_management"> Staff Management<br />
              </b-form-group>                     
            </b-form>
            <template slot="modal-footer">
              <b-button
                variant="outline-secondary"
                @click="hideModal('modalright')"
              >{{ $t('pages.cancel') }}</b-button>
              <b-button
                variant="primary"
                @click="EditOrganization()"
                class="mr-1"
              >{{ $t('pages.submit') }}</b-button>
            </template>
          </b-modal>
        </div>
        <piaf-breadcrumb/>
        <div class="separator mb-5"/>
      </b-colxx>
    </b-row>
    <template v-if="isLoad">
      <b-row v-if="displayMode==='image'" key="image">
        <b-colxx
          sm="6"
          lg="4"
          xl="3"
          class="mb-3"
          v-for="(item,index) in items"
          :key="index"
          :id="item.id"
        >
          <image-list-item
            :key="item.id"
            :data="item"
            :selected-items="selectedItems"
            @toggle-item="toggleItem"
            v-contextmenu:contextmenu
          />
        </b-colxx>
      </b-row>
      <b-row v-else-if="displayMode==='thumb'" key="thumb">
        <b-colxx xxs="12" class="mb-3" v-for="(item,index) in items" :key="index" :id="item.id">
          <thumb-list-item
            :key="item.id"
            :data="item"
            :selected-items="selectedItems"
            @toggle-item="toggleItem"
            v-contextmenu:contextmenu
          />
        </b-colxx>
      </b-row>
      <b-row v-else-if="displayMode==='list'" key="list">
        <b-colxx xxs="12" class="mb-3" v-for="(item,index) in items" :key="index" :id="item.id">
          <organization-list-item 
            :key="item.id"
            :data="item"
            :selected-items="selectedItems"
            @toggle-item="toggleItem"
            v-contextmenu:contextmenu
            v-if="renderComponent"
          />
        </b-colxx>
      </b-row>
      <b-row v-if="lastPage>1">
        <b-colxx xxs="12">
          <b-pagination-nav
            :number-of-pages="lastPage"
            :link-gen="linkGen"
            v-model="page"
            :per-page="perPage"
            align="center"
          >
            <template v-slot:next-text>
              <i class="simple-icon-arrow-right"/>
            </template>
            <template v-slot:prev-text>
              <i class="simple-icon-arrow-left"/>
            </template>
            <template v-slot:first-text>
              <i class="simple-icon-control-start"/>
            </template>
            <template v-slot:last-text>
              <i class="simple-icon-control-end"/>
            </template>
          </b-pagination-nav>
        </b-colxx>
      </b-row>
    </template>
    <template v-else>
      <div class="loading"></div>
    </template>
    <v-contextmenu ref="contextmenu" @contextmenu="handleContextmenu">
      <v-contextmenu-item @click="onContextEdit()" v-b-modal.editOrder>
        <i class="simple-icon-docs"/>
        <span>Edit</span>
      </v-contextmenu-item>
      <v-contextmenu-item @click="onContextDelete()">
        <i class="simple-icon-trash"/>
        <span>Delete</span>
      </v-contextmenu-item>
      <v-contextmenu-item @click="onContextView()">
        <i class="simple-icon-drawer"/>
        <span>View</span>
      </v-contextmenu-item>
    </v-contextmenu>
  </b-colxx>
  </b-row>
</template>
<script>
import Vue from 'vue';
import { DataListIcon, ThumbListIcon, ImageListIcon } from '@/components/Svg'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import axios from 'axios'

import ImageListItem from '@/components/Listing/ImageListItem'
import ThumbListItem from '@/components/Listing/ThumbListItem'
import OrganizationListItem from '@/components/Listing/OrganizationListItem'
import { apiUrl } from '@/constants/config'
import { mapGetters, mapMutations, mapActions } from 'vuex'

// Validations
import { helpers } from 'vuelidate/lib/validators'
import Vuelidate from 'vuelidate'
import { required, minLength,email,password,minValue,maxValue,maxLength,numeric,alpha,sameAs } from 'vuelidate/lib/validators'
Vue.use(Vuelidate)
import {validationMixin} from "vuelidate";

const Strpass = helpers.regex('Strpass', /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
const Emaillverify = helpers.regex('Emaillverify', /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/)


export default {
  components: {
    DataListIcon,
    ThumbListIcon,
    ImageListIcon,
    vSelect,
    ImageListItem,
    ThumbListItem,
    OrganizationListItem    
  },
  data () {
    return {
      isLoad: true,
      renderComponent: true,
      apiBase: 'https://devapi.buzaao.com/index.php/api/organization/details',
      displayMode: 'list',
      sort: { column: 'title', label: ' name' },
      sortOptions: [
        { column: 'title', label: ' Name' },
        { column: 'Description', label: 'Description' },
      ],
      page: 1,
      perPage: 4,
      search: '',
      from: 0,
      to: 0,
      total: 0,
      lastPage: 0,
      items: [],
      pageSizes: [4, 8, 12],
      selectedItems: [],
      myOrder: [],
      statuses: [
        { text: 'ON HOLD', value: 'ON HOLD' },
        { text: 'PROCESSED', value: 'PROCESSED' }
      ],
      // Select Arrays //
      OrganizationArray: {
        name: '',
        email: '',
        phone:'',
        address:'',
        password:'',
        c_password:'',
        order_stage:'',    
        order_task:''    
      },
      allorderarray: [
        { label: "orderid",value:"1" },
        { label: "ordername",value:"2" },
      ],
      supervisor: [
        { label: "supervisorid",value:"1" },
        { label: "supervisorname",value:"2" },
      ], 
    }
  },
  validations: {
    OrganizationArray: {
      required,
        name:{
          required,
          maxLength: maxLength(15),
          minLength: minLength(5),
        },
        email:{
          required,
          Emaillverify
        },
        phone:{
          required,
          minLength: minLength(2),
          maxLength: maxLength(10)
        },
        address:{
          required,
        },
        password:{
          required,
          Strpass
        },
        c_password:{
          required,
          sameAsPassword: sameAs('password')
        },        
    }
  },
  methods: {
  ...mapActions(['CreateOrganization','GetAllOrganization','UpdateOrganization','DeleteOrganization']),
    loadItems (){
      this.isLoad = false
      this.GetAllOrganization().then(result => {
        this.total = 121
        this.from = 0
        this.to = 0
        this.items = JSON.parse(result)        
        this.perPage = 10
        this.selectedItems = []
        this.lastPage = 0
        this.isLoad = true
      })
    },
    hideModal (refname) {
      this.$refs[refname].hide()
    },
    changeDisplayMode (displayType) {
      this.displayMode = displayType
    },
    changePageSize (perPage) {
      this.perPage = perPage
    },
    changeOrderBy (sort) {
      this.sort = sort
    },
    AddOrganization () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        console.log()
      }
      else {
        console.log('Create Organization : ', this.OrganizationArray)
        this.CreateOrganization({name: this.OrganizationArray.name,email: this.OrganizationArray.email,password: this.OrganizationArray.password,c_password:this.OrganizationArray.c_password,phone: this.OrganizationArray.phone,address: this.OrganizationArray.address,order_stage: this.OrganizationArray.order_stage, order_task: this.OrganizationArray.order_task})
      }
    },
    EditOrganization () {
      console.log('Update Staff : ', this.Staffarray)
      this.UpdateOrganization({id:this.selectedItems[0],name: this.OrganizationArray.name,email: this.OrganizationArray.email,password: this.OrganizationArray.password,c_password:this.OrganizationArray.c_password,phone: this.OrganizationArray.phone,address: this.OrganizationArray.address,order_stage: this.OrganizationArray.order_stage, order_task: this.OrganizationArray.order_task})
    },
    selectAll (isToggle) {
      if (this.selectedItems.length >= this.items.length) {
        if (isToggle) this.selectedItems = []
      } else {
        this.selectedItems = this.items.map(x => x.id)
      }
    },
    keymap (event) {
      switch (event.srcKey) {
        case 'select':
          this.selectAll(false)
          break
        case 'undo':
          this.selectedItems = []
          break
      }
    },
    getIndex (value, arr, prop) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i][prop] === value) {
          return i
        }
      }
      return -1
    },
    toggleItem (event, itemId) {
      if (event.shiftKey && this.selectedItems.length > 0) {
        let itemsForToggle = this.items
        var start = this.getIndex(itemId, itemsForToggle, 'id')
        var end = this.getIndex(
          this.selectedItems[this.selectedItems.length - 1],
          itemsForToggle,
          'id'
        )
        itemsForToggle = itemsForToggle.slice(
          Math.min(start, end),
          Math.max(start, end) + 1
        )
        this.selectedItems.push(
          ...itemsForToggle.map(item => {
            return item.id
          })
        )
      } else {
        if (this.selectedItems.includes(itemId)) {
          this.selectedItems = this.selectedItems.filter(x => x !== itemId)
        } else this.selectedItems.push(itemId)
      }
    },
    handleContextmenu (vnode) {
      if (!this.selectedItems.includes(vnode.key)) {
        this.selectedItems = [vnode.key]
      }
    },
    onContextEdit () {
      let itemsForToggle = this.items
      var start = this.getIndex(this.selectedItems[0], itemsForToggle, 'id')
      this.OrganizationArray.name = itemsForToggle[start].name
      this.OrganizationArray.email = itemsForToggle[start].email
      this.OrganizationArray.phone = itemsForToggle[start].phone
      this.OrganizationArray.address = itemsForToggle[start].address
      this.OrganizationArray.order_stage = itemsForToggle[start].order_stage
      this.OrganizationArray.order_task = itemsForToggle[start].order_task
      this.OrganizationArray.assigned_to = itemsForToggle[start].assigned_to
      this.OrganizationArray.assigned_to = itemsForToggle[start].assigned_to
      console.log('Edit Items:', this.selectedItems)
    }, 
    onContextDelete () {
        console.log('Organization Delete : ', this.selectedItems)
        this.DeleteOrganization({ data:this.selectedItems })
    },
    onContextView() {
      console.log(
        'context menu item clicked - View Items: ',
        this.selectedItems
      )
    },
    linkGen (pageNum) {
      return '#page-' + pageNum
    }
  },
  computed: {
    ...mapGetters({
      token: 'token'
    }),
    isSelectedAll () {
      return this.selectedItems.length >= this.items.length
    },
    isAnyItemSelected () {
      return (
        this.selectedItems.length > 0 &&
        this.selectedItems.length < this.items.length
      )
    },
    apiUrl () {
      return `${this.apiBase}?sort=${this.sort.column}&page=${
        this.page
      }&per_page=${this.perPage}&search=${this.search}`
    }
  },
  watch: {
    search () {
      this.page = 1
    },
    apiUrl () {
      this.loadItems()
    }
  },
  mounted () {
    this.loadItems()
  },
  onValitadeFormSubmit () {
    console.log(JSON.stringify(this.validateForm))
  }
}
</script>
