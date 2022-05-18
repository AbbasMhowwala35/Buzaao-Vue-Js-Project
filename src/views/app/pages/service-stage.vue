<template>
<b-row>
  <b-colxx class="disable-text-selection">
    <b-row>
      <b-colxx xxs="12">
        <h1>{{ $t('service.service-stage') }}</h1>
        <div class="top-right-button-container">
          <b-button
            v-b-modal.modalright
            variant="primary"
            size="lg"
            class="top-right-button"
          >{{ $t('service.add-new-service-stage') }}</b-button>
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
            :title="$t('service.add-new-service-stage')"
            class="modal-right"
          >
            <b-form>
              <b-form-group :label="$t('service.stage-name')">
                <input @input="$v.serviceStage.name.$touch" v-model="serviceStage.name" name="email" class="form-control" :class="{ 'input--error': $v.serviceStage.name.$error }" />
                <!-- // Validations -->
                <div v-if="!$v.serviceStage.name.required && $v.serviceStage.name.$dirty" class="error alert alert-danger">
                  <strong>Error! </strong>Name Field is Required
                </div>
                <!-- // End  -->
              </b-form-group>
              <b-form-group :label="$t('service.service-name')">
                <select class="form-control" @change="changeJobTitle($event)" v-model="selected">
                  <option value="" selected>Choose Service</option>
                  <option v-for="service in servicearray" :value="service.id" :key="service.id">{{ service.label }}</option>
                </select>
                <!-- // Validations -->
                <div v-if="!$v.serviceStage.service_id.required && $v.serviceStage.service_id.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Service Name Field is Required
                </div>
                <!-- // End  -->
              </b-form-group>
              <b-form-group :label="$t('service.supervisor-name')">
                <v-select v-model="serviceStage.supervisor_id" :options="supervisor" />
                <!-- // Validations -->
                <div v-if="!$v.serviceStage.supervisor_id.required && $v.serviceStage.supervisor_id.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Supervisor Field is Required
                </div>
                <!-- // End  -->
              </b-form-group>
              <b-form-group :label="$t('service.order')">
                <b-form-input type="number" v-model="serviceStage.order"/>
                <!-- // Validations -->
                <div v-if="!$v.serviceStage.order.required && $v.serviceStage.order.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Is Periodical Field is Required
                </div>
                <!-- // End  -->
                </b-form-group>
            </b-form>
            <template slot="modal-footer">
              <b-button
                variant="outline-secondary"
                @click="hideModal('modalright')"
              >{{ $t('pages.cancel') }}</b-button>
              <b-button
                variant="primary"
                @click.stop="addServicestage()"
                class="mr-1"
              >{{ $t('pages.submit') }}</b-button>
            </template>
          </b-modal>
          <b-modal
            id="editService"
            ref="editService"
            :title="$t('service.edit-service-stage')"
            class="modal-right"
          >
            <b-form>
              <b-form-group :label="$t('service.stage-name')">
                <input @input="$v.serviceStage.name.$touch" v-model="serviceStage.name" name="email" class="form-control" :class="{ 'input--error': $v.serviceStage.name.$error }" />
                <!-- // Validations -->
                <div v-if="!$v.serviceStage.name.required && $v.serviceStage.name.$dirty" class="error alert alert-danger">
                  <strong>Error! </strong>Name Field is Required
                </div>
                <!-- // End  -->
              </b-form-group>
              <b-form-group :label="$t('service.service-name')">
                <select class="form-control" @change="changeJobTitle($event)" v-model="selected">
                  <option value="" selected>Choose Service</option>
                  <option v-for="service in servicearray" :value="service.id" :key="service.id">{{ service.label }}</option>
                </select>
                <!-- // Validations -->
                <div v-if="!$v.serviceStage.service_id.required && $v.serviceStage.service_id.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Service Name Field is Required
                </div>
                <!-- // End  -->
              </b-form-group>
              <b-form-group :label="$t('service.supervisor-name')">
                <v-select v-model="serviceStage.supervisor_id" :options="supervisor" />
                <!-- // Validations -->
                <div v-if="!$v.serviceStage.supervisor_id.required && $v.serviceStage.supervisor_id.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Supervisor Field is Required
                </div>
                <!-- // End  -->
              </b-form-group>
              <b-form-group :label="$t('service.order')">
                <b-form-input type="number" v-model="serviceStage.order"/>
                <!-- // Validations -->
                <div v-if="!$v.serviceStage.order.required && $v.serviceStage.order.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Is Periodical Field is Required
                </div>
                <!-- // End  -->
                </b-form-group>
            </b-form>
            <template slot="modal-footer">
              <b-button
                variant="outline-secondary"
                @click="hideModal('modalright')"
              >{{ $t('pages.cancel') }}</b-button>
              <b-button
                variant="primary"
                @click="EditServiceStage()"
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
          <service-stage-list-item
            :key="item.id"
            :data="item"
            :selected-items="selectedItems"
            @toggle-item="toggleItem"
            v-contextmenu:contextmenu
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
      <v-contextmenu-item @click="onContextEdit()" v-b-modal.editService>
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
import ServiceStageListItem from '@/components/Listing/ServiceStageListItem'
import { apiUrl } from '@/constants/config'
import { mapGetters, mapMutations, mapActions } from 'vuex'

// Validations
import { helpers } from 'vuelidate/lib/validators'
import Vuelidate from 'vuelidate'
import { required, minLength,email,password,minValue,maxValue,maxLength,numeric,alpha } from 'vuelidate/lib/validators'
Vue.use(Vuelidate)
import {validationMixin} from "vuelidate";

export default {
  components: {
    DataListIcon,
    ThumbListIcon,
    ImageListIcon,
    vSelect,
    ImageListItem,
    ThumbListItem,
    ServiceStageListItem,    
  },
  data () {
    return {      
      isLoad: false,
      apiBase: 'https://devapi.buzaao.com/index.php/api/organization/service_stages',
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
      serviceStage: {
        name:'',
        service_id: '',
        supervisor_id: '',
        order: ''
      },
      isperiodicalarray: [
        { label: "None",value:"0" },
        { label: "Quarterly",value:"1" },
        { label: "Monthly ",value:"2" },
        { label: "Half Yearly ",value:"3" },
        { label: "Yearly ",value:"4" },        
      ],
      supervisor: [
        { label: "supervisorid",value:"1" },
        { label: "supervisorname ",value:"2" },
      ],
      servicearray: [
        { label: "serviceid",value:"1" },
        { label: "servicename ",value:"2" },
      ],
    }
  },
  validations: {
    serviceStage: {
      required,
      name:{
        required
      },
      service_id: {
        required,
      },
      supervisor_id: {
        required,
      },
      order: {
        required,
      }
    }
  },
  methods: {
    changeJobTitle (event) {
      this.myselect = event.target.options[event.target.options.selectedIndex].text
      console.log(event.target.options[event.target.options.selectedIndex].text)
    },
  ...mapActions(['AddServiceStage','ServiceStageList','UpdateServiceStage','DeleteServiceStage','SupervisorList','ServiceList']),
    loadItems (){
      this.isLoad = false
      this.ServiceStageList().then(result => {
        this.total = 121
        this.from = 0
        this.to = 0
        this.items = JSON.parse(result).data
        this.perPage = 10
        this.selectedItems = []
        this.lastPage = 0
        this.isLoad = true        
      })
      this.SupervisorList().then(result => {
        this.supervisor = JSON.parse(result[1])
      })
      this.ServiceList().then(result => {
        this.servicearray = JSON.parse(result)
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
    addServicestage () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        console.log()
      } else {
        console.log('Create Items : ', this.serviceStage)
        this.AddServiceStage({name: this.serviceStage.name,service_id: this.serviceStage.service_id.value, supervisor_id: this.serviceStage.supervisor_id.value, order: this.serviceStage.order})
      }
    },
    EditServiceStage () {
      console.log('Update Stage : ', this.serviceStage)
      this.UpdateServiceStage({id:this.selectedItems[0],name: this.serviceStage.name,service_id: this.serviceStage.service_id.value, supervisor_id: this.serviceStage.supervisor_id.value, order: this.serviceStage.order})
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
      this.serviceStage.name = itemsForToggle[start].name
      this.serviceStage.service_id = itemsForToggle[start].service_id
      this.serviceStage.supervisor_id = itemsForToggle[start].supervisor_id
      this.serviceStage.order = itemsForToggle[start].order
      console.log('Edit Stage:', this.selectedItems)
    },
     onContextDelete () {
        console.log('Delete Service Stage : ', this.selectedItems)
        this.DeleteServiceStage({ data:this.selectedItems })
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
  }
}
</script>
