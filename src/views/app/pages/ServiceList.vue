<template>
<b-row>
  <b-colxx class="disable-text-selection">
    <b-row>
      <b-colxx xxs="12">
        <h1>{{ $t('service.service') }}</h1>
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
            :title="$t('service.add-new-service-title')"
            class="modal-right"
          >
            <b-form>
              <b-form-group :label="$t('service.name')">
                <input @input="$v.newItem.name.$touch" v-model="newItem.name" name="name" class="form-control" :class="{ 'input--error': $v.newItem.name.$error }" />
                <!-- // Validations -->
                <div v-if="!$v.newItem.name.required && $v.newItem.name.$dirty" class="error alert alert-danger">
                  <strong>Error! </strong>Service Name Field is Required
                </div>
                <div v-else-if="!$v.newItem.name.minLength && $v.newItem.name.$dirty" class="error alert alert-danger">
                  <strong>Error! </strong> Name Must contain Minimum 5 alphabet
                </div> 
                <div v-else-if="!$v.newItem.name.maxLength && $v.newItem.name.$dirty" class="error alert alert-danger">
                  <strong>Error! </strong> Name Must contain Maximum 15 alphabet
                </div> 
                <!-- // End -->
              </b-form-group>
              <b-form-group :label="$t('service.supervisor_id')">
                <v-select v-model="newItem.supervisor_id" :options="supervisor" />
                <!-- // Validations -->
                <div v-if="!$v.newItem.supervisor_id.required && $v.newItem.supervisor_id.$dirty" class="error alert alert-danger">
                  <strong>Error! </strong>Supervisor Field is Required
                </div>
                <!-- // End  -->
              </b-form-group>
              <b-form-group :label="$t('service.description')">
                <b-textarea v-model="newItem.description" :rows="2" :max-rows="2"/>                
                <!-- // Validations -->
                <div v-if="!$v.newItem.description.required && $v.newItem.description.$dirty" class="error alert alert-danger">
                  <strong>Error! </strong>Description Field is Required
                </div>
                <div v-else-if="!$v.newItem.description.minLength && $v.newItem.description.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Description Must contain Minimum 5 alphabet
                </div>
                <div v-else-if="!$v.newItem.description.maxLength && $v.newItem.description.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Description Must contain Maximum 150 alphabet
                </div>
                <!-- // End  -->
              </b-form-group>
              <b-form-group :label="$t('service.is_periodical')">
                <v-select v-model="newItem.is_periodical" :options="isperiodicalarray" />
                <!-- // Validations -->
                <div v-if="!$v.newItem.is_periodical.required && $v.newItem.is_periodical.$dirty" class="error alert alert-danger">
                  <strong>Error! </strong>Is Periodical Field is Required
                </div>
                <!-- // End  -->
              </b-form-group>
              <b-form-group :label="$t('service.price')">
                <b-form-input type="number" v-model="newItem.price"/>
                <!-- // Validations -->
                <div v-if="!$v.newItem.price.required && $v.newItem.price.$dirty" class="error alert alert-danger">
                  <strong>Error! </strong>Price Field is Required
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
                @click.stop="addNewItem()"
                class="mr-1"
              >{{ $t('pages.submit') }}</b-button>
            </template>
          </b-modal>
          <b-modal
            id="editService"
            ref="editService"
            :title="$t('edit.edit-service-modal-title')"
            class="modal-right"
          >
            <b-form>
              <b-form-group :label="$t('service.name')">
                <input @input="$v.newItem.name.$touch" v-model="newItem.name" name="name" class="form-control" :class="{ 'input--error': $v.newItem.name.$error }" />
                <!-- // Validations -->
                <div v-if="!$v.newItem.name.required && $v.newItem.name.$dirty" class="error alert alert-danger">
                  <strong>Error! </strong>Service Name Field is Required
                </div>
                <div v-else-if="!$v.newItem.name.minLength && $v.newItem.name.$dirty" class="error alert alert-danger">
                  <strong>Error! </strong> Name Must contain Minimum 5 alphabet
                </div> 
                <div v-else-if="!$v.newItem.name.maxLength && $v.newItem.name.$dirty" class="error alert alert-danger">
                  <strong>Error! </strong> Name Must contain Maximum 15 alphabet
                </div> 
                <!-- // End -->
              </b-form-group>
              <b-form-group :label="$t('service.supervisor_id')">
                <v-select v-model="newItem.supervisor_id" :options="supervisor" />
                <!-- // Validations -->
                <div v-if="!$v.newItem.supervisor_id.required && $v.newItem.supervisor_id.$dirty" class="error alert alert-danger">
                  <strong>Error! </strong>Supervisor Field is Required
                </div>
                <!-- // End  -->
              </b-form-group>
              <b-form-group :label="$t('service.description')">
                <b-textarea v-model="newItem.description" :rows="2" :max-rows="2"/>                
                <!-- // Validations -->
                <div v-if="!$v.newItem.description.required && $v.newItem.description.$dirty" class="error alert alert-danger">
                  <strong>Error! </strong>Description Field is Required
                </div>
                <div v-else-if="!$v.newItem.description.minLength && $v.newItem.description.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Description Must contain Minimum 5 alphabet
                </div>
                <div v-else-if="!$v.newItem.description.maxLength && $v.newItem.description.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Description Must contain Maximum 150 alphabet
                </div>
                <!-- // End  -->
              </b-form-group>
              <b-form-group :label="$t('service.is_periodical')">
                <v-select v-model="newItem.is_periodical" :options="isperiodicalarray" />
                <!-- // Validations -->
                <div v-if="!$v.newItem.is_periodical.required && $v.newItem.is_periodical.$dirty" class="error alert alert-danger">
                  <strong>Error! </strong>Is Periodical Field is Required
                </div>
                <!-- // End  -->
              </b-form-group>
              <b-form-group :label="$t('service.price')">
                <b-form-input type="number" v-model="newItem.price"/>
                <!-- // Validations -->
                <div v-if="!$v.newItem.price.required && $v.newItem.price.$dirty" class="error alert alert-danger">
                  <strong>Error! </strong>Price Field is Required
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
                @click="updateService()"
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
        <b-colxx xxs="12" class="mb-3">
        <b-card :class="{'d-flex flex-row':true }" no-body>
            <div class="pl-2 d-flex flex-grow-1 min-width-zero">
                <div class="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                    <p class="list-item-heading mb-1 truncate">Service Name</p>
                    <p class="mb-1 text-muted text-small w-15 w-sm-100">Service Description</p>
                    <p class="mb-1 text-muted text-small w-15 w-sm-100">Price</p>                
                    <div class="w-15 w-sm-100">
                      <b-badge pill >Supervisor Name</b-badge>
                    </div>
                </div>
                <div class="custom-control custom-checkbox pl-1 align-self-center pr-4">
                    <!-- <b-form-checkbox :checked="selectedItems.includes(data.id)" class="itemCheck mb-0"/> -->
                </div>
            </div>
          </b-card>
        </b-colxx>
        <b-colxx xxs="12" class="mb-3" v-for="(item,index) in items" :key="index" :id="item.id">
          <data-list-item
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
import DataListItem from '@/components/Listing/DataListItem'
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
    DataListItem,    
  },
  data () {
    return {
      isLoad: false,
      apiBase: 'https://devapi.buzaao.com/index.php/api/organization/service',
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

      statuses: [
        { text: 'ON HOLD', value: 'ON HOLD' },
        { text: 'PROCESSED', value: 'PROCESSED' }
      ],
      newItem: {
        name: '',
        supervisor_id: '',
        description: '',
        is_periodical:'',
        price:'',
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
    }
  },
  validations: {
    newItem: {
      required,
      name: {
        required,
        maxLength: maxLength(15),
        minLength: minLength(3),
      },
      price: {
        required,
      },
      supervisor_id: {
        required,
      },
      is_periodical: {
        required,
      },
      description:{
        required,
        maxLength: maxLength(150),
        minLength: minLength(5),
      },
    }
  },
  methods: {
  ...mapActions(['addService','servicelist','deleteservice','UpdateService','SupervisorList']),
    loadItems (){
      this.isLoad = false
      this.servicelist().then(result => {
        this.total = 121
        this.from = 0
        this.to = 0
        this.items = JSON.parse(result).service
        this.perPage = 10
        this.selectedItems = []
        this.lastPage = 0
        this.isLoad = true        
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
    addNewItem () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        console.log()
      } else {
        console.log('Create Items : ', this.newItem)
        this.addService({name: this.newItem.name, supervisor_id: this.newItem.supervisor_id.value, description:this.newItem.description,is_periodical:this.newItem.is_periodical.value,price: this.newItem.price })
      }
    },
    updateService () {
      console.log('Update Order : ', this.newItem)
      this.UpdateService({id:this.selectedItems[0], name: this.newItem.name, supervisor_id: this.newItem.supervisor_id.value, description:this.newItem.description,is_periodical:this.newItem.is_periodical.value,price: this.newItem.price })
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
      this.newItem.name = itemsForToggle[start].name
      this.newItem.supervisor_id = itemsForToggle[start].supervisor_id
      this.newItem.description = itemsForToggle[start].description
      this.newItem.is_periodical = itemsForToggle[start].is_periodical
      this.newItem.price = itemsForToggle[start].price
      console.log('Edit Items:', this.selectedItems)
    },
     onContextDelete () {
       console.log('Delete Service : ', this.selectedItems)
        this.deleteservice({ data:this.selectedItems })
    },
    onContextView() {
      console.log('View Service:',this.selectedItems)
      this.$router.push({path: 'service-details/'+this.selectedItems[0] })
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
