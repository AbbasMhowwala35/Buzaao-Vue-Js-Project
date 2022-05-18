<template>
<b-row>
  <b-colxx class="disable-text-selection">
    <b-row>
      <b-colxx xxs="12">
        <h1>{{ $t('order.orderlist') }}</h1>
        <div class="top-right-button-container">
          <b-button
            v-b-modal.modalright
            variant="primary"
            size="lg"
            class="top-right-button"
          >{{ $t('pages.add-new') }}</b-button>
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
            :title="$t('order.add-new-order')"
            class="modal-right"
          >
            <b-form>
              <b-form-group :label="$t('order.client-name')">
                 <v-select v-model="newItem.client_id" :options="resultArray" />
                <div v-if="!$v.newItem.client_id.required && $v.newItem.client_id.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Client Name is Required
                </div>
              </b-form-group>              
              <b-form-group :label="$t('order.client-location')">
                <b-form-input v-model="newItem.client_location_id"/>
                <div v-if="!$v.newItem.client_location_id.required && $v.newItem.client_location_id.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Client Location is Required
                </div>
              </b-form-group>
              <b-form-group :label="$t('order.service')">
                <v-select v-model="newItem.service_id" :options="servicearray" />
                <div v-if="!$v.newItem.service_id.required && $v.newItem.service_id.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Service Name is Required
                </div>
              </b-form-group>
              <b-form-group :label="$t('order.is-periodical')">
                <v-select v-model="newItem.is_periodical" :options="isperiodicalarray" />
              </b-form-group>
              <b-form-group :label="$t('order.supervisor-id')">
                <v-select v-model="newItem.supervisor_id" :options="supervisor" />
                <div v-if="!$v.newItem.supervisor_id.required && $v.newItem.is_periodical.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Supervisor is Required
                </div>
              </b-form-group>
            </b-form>
            <template slot="modal-footer">
              <b-button
                variant="outline-secondary"
                @click="hideModal('modalright')"
              >{{ $t('pages.cancel') }}</b-button>
              <b-button
                variant="primary"
                @click.stop="addorders()"
                class="mr-1"
              >{{ $t('pages.submit') }}</b-button>
            </template>
          </b-modal>
          <b-modal
            id="editOrder"
            ref="editOrder"
            :title="$t('order.edit-order')"
            class="modal-right"
          >
             <b-form>
              <b-form-group :label="$t('order.client-name')">
                 <v-select v-model="newItem.client_id" :options="resultArray" />
                <div v-if="!$v.newItem.client_id.required && $v.newItem.client_id.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Client Name is Required
                </div>
              </b-form-group>              
              <b-form-group :label="$t('order.client-location')">
                <b-form-input v-model="newItem.client_location_id"/>
                <div v-if="!$v.newItem.client_location_id.required && $v.newItem.client_location_id.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Client Location is Required
                </div>
              </b-form-group>
              <b-form-group :label="$t('order.service')">
                <v-select v-model="newItem.service_id" :options="servicearray" />
                <div v-if="!$v.newItem.service_id.required && $v.newItem.service_id.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Service Name is Required
                </div>
              </b-form-group>
              <b-form-group :label="$t('order.is-periodical')">
                <v-select v-model="newItem.is_periodical" :options="isperiodicalarray" />
              </b-form-group>
              <b-form-group :label="$t('order.supervisor-id')">
                <v-select v-model="newItem.supervisor_id" :options="supervisor" />
                <div v-if="!$v.newItem.supervisor_id.required && $v.newItem.is_periodical.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Supervisor is Required
                </div>
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
          <order-list-item 
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
import OrderListItem from '@/components/Listing/OrderListItem'
import { apiUrl } from '@/constants/config'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Vuelidate from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
Vue.use(Vuelidate)


export default {
  components: {
    DataListIcon,
    ThumbListIcon,
    ImageListIcon,
    vSelect,
    ImageListItem,
    ThumbListItem,
    OrderListItem    
  },
  data () {
    return {
      isLoad: true,
      renderComponent: true,
      apiBase: 'https://devapi.buzaao.com/index.php/api/organization/order',
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
      newItem: {
        client_id: '',
        client_location_id: '',
        service_id: '',
        is_periodical:'',
        supervisor_id:'',
      },
      resultArray: [
        { label: "clientid",value:"1" },
        { label: "clientname",value:"2" },
      ], 
      servicearray: [
        { label: "serviceid",value:"1" },
        { label: "servicename ",value:"2" },
      ],
      supervisor: [
        { label: "supervisorid",value:"1" },
        { label: "supervisorname ",value:"2" },
      ],
      isperiodicalarray: [
        { label: "None",value:"0" },
        { label: "Quarterly",value:"1" },
        { label: "Monthly ",value:"2" },
        { label: "Half Yearly ",value:"3" },
        { label: "Yearly ",value:"4" },        
      ],
      locationArray: [
        { label: "locationid",value:"1" },
        { label: "locationname ",value:"2" },
      ]
      // End Array //
    }
  },
  validations: {
    newItem: {
      required,
      client_id: {
        required,
      },
      client_location_id: {
        required
      },
      service_id: {
        required,
      },
      is_periodical:{
        required
      },
      supervisor_id:{
        required
      }
    }
  },
  methods: {
  ...mapActions(['CreateOrder','OrdersList','DeleteOrder','ClientList','UpdateOrder','ServiceList','SupervisorList','ClientLocation']),
    loadItems (){
      this.isLoad = false      
      this.OrdersList().then(result => {
        //console.log(result)
        this.total = 121
        this.from = 0
        this.to = 0
        this.items = JSON.parse(result).order
        this.perPage = 10
        this.selectedItems = []
        this.lastPage = 0
        this.isLoad = true
      })
      this.ClientList().then(result => {
          this.resultArray = JSON.parse(result)
      })
      this.ServiceList().then(result => {
          this.servicearray = JSON.parse(result)
      })
      this.SupervisorList().then(result => {
          this.supervisor = JSON.parse(result[1])
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
    addorders () {
      this.$v.$touch()
      if (this.$v.$invalid) {
      } else {
        console.log('Create Items : ', this.newItem)
        this.CreateOrder({client_id: this.newItem.client_id.value, client_location_id: this.newItem.client_location_id, service_id:this.newItem.service_id.value,is_periodical:this.newItem.is_periodical.value,supervisor_id: this.newItem.supervisor_id.value })
      }
    },
    updateorders () {
      console.log('Update Order : ', this.newItem)
      this.UpdateOrder({id:this.selectedItems[0], client_id: this.newItem.client_id.value, client_location_id: this.newItem.client_location_id, service_id:this.newItem.service_id.value,is_periodical:this.newItem.is_periodical.value,supervisor_id: this.newItem.supervisor_id.value })
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
      this.newItem.client_id = itemsForToggle[start].client_id
      this.newItem.client_location_id = itemsForToggle[start].client_location_id
      this.newItem.service_id = itemsForToggle[start].service_id
      this.newItem.is_periodical = itemsForToggle[start].is_periodical
      this.newItem.supervisor_id = itemsForToggle[start].supervisor_id
      console.log('Edit Items:', this.selectedItems)
    },
    onContextDelete () {
        console.log('Order Delete : ', this.selectedItems)
        this.DeleteOrder({ data:this.selectedItems })
    },
    onContextView() {
      console.log('View Order: ',this.selectedItems)
      this.$router.push({path: 'order-details/'+this.selectedItems[0] })
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
