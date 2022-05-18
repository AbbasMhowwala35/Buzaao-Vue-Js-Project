<template>
<b-row>
  <b-colxx class="disable-text-selection">
    <b-row>
      <b-colxx xxs="12">
        <h1>{{ $t('service.service-stage-task') }}</h1>
        <div class="top-right-button-container">
          <b-button
            v-b-modal.modalright
            variant="primary"
            size="lg"
            class="top-right-button"
          >{{ $t('service.add-new-service-stage-task') }}</b-button>
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
            :title="$t('service.add-new-service-stage-task')"
            class="modal-right"
          >
            <b-form>
              <b-form-group :label="$t('service.task-name')">
                <input @input="$v.serviceTask.title.$touch" v-model="serviceTask.title" name="email" class="form-control" :class="{ 'input--error': $v.serviceTask.title.$error }" />
                <!-- // Validations -->
                <div v-if="!$v.serviceTask.title.required && $v.serviceTask.title.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Fullname Field is Required
                </div>
                <div v-else-if="!$v.serviceTask.title.minLength && $v.serviceTask.title.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Name Must contain Minimum 5 alphabet
                </div>
                <div v-else-if="!$v.serviceTask.title.maxLength && $v.serviceTask.title.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Name Must contain Maximum 15 alphabet
                </div>
                <!-- // End -->
              </b-form-group>
              <b-form-group :label="$t('service.service-name')">
                <v-select v-model="serviceTask.service_id" :options="servicearray" />
                <!-- // Validations -->
                <div v-if="!$v.serviceTask.service_id.required && $v.serviceTask.service_id.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Service Field is Required
                </div>
                <!-- //End -->
              </b-form-group>
              <b-form-group :label="$t('service.supervisor-name')">
                <v-select v-model="serviceTask.supervisor_id" :options="supervisor" />
                <!-- // Validations -->
                <div v-if="!$v.serviceTask.supervisor_id.required && $v.serviceTask.supervisor_id.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Supervisor Field is Required
                </div>
                <!-- //End -->
              </b-form-group>
              <b-form-group :label="$t('service.stages-name')">
                <v-select v-model="serviceTask.service_stage_id" :options="getStagesarray" />
                <!-- // Validations -->
                <div v-if="!$v.serviceTask.service_stage_id.required && $v.serviceTask.service_stage_id.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Service Stage Field is Required
                </div>
                <!-- //End -->
              </b-form-group>
              <b-form-group :label="$t('service.order')">
                <b-form-input type="number" v-model="serviceTask.order"/>
                <!-- // Validations -->
                <div v-if="!$v.serviceTask.order.required && $v.serviceTask.order.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Order Field is Required
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
                @click.stop="addtask()"
                class="mr-1"
              >{{ $t('pages.submit') }}</b-button>
            </template>
          </b-modal>
          <b-modal
            id="editService"
            ref="editService"
            :title="$t('service.edit-service-stage-task')"
            class="modal-right"
          >
            <b-form>
              <b-form-group :label="$t('service.task-name')">
                <input @input="$v.serviceTask.title.$touch" v-model="serviceTask.title" name="email" class="form-control" :class="{ 'input--error': $v.serviceTask.title.$error }" />
                <!-- // Validations -->
                <div v-if="!$v.serviceTask.title.required && $v.serviceTask.title.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Fullname Field is Required
                </div>
                <div v-else-if="!$v.serviceTask.title.minLength && $v.serviceTask.title.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Name Must contain Minimum 5 alphabet
                </div>
                <div v-else-if="!$v.serviceTask.title.maxLength && $v.serviceTask.title.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Name Must contain Maximum 15 alphabet
                </div>
                <!-- // End -->
              </b-form-group>
              <b-form-group :label="$t('service.service-name')">
                <v-select v-model="serviceTask.service_id" :options="servicearray" />
                <!-- // Validations -->
                <div v-if="!$v.serviceTask.service_id.required && $v.serviceTask.service_id.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Service Field is Required
                </div>
                <!-- //End -->
              </b-form-group>
              <b-form-group :label="$t('service.supervisor-name')">
                <v-select v-model="serviceTask.supervisor_id" :options="supervisor" />
                <!-- // Validations -->
                <div v-if="!$v.serviceTask.supervisor_id.required && $v.serviceTask.supervisor_id.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Supervisor Field is Required
                </div>
                <!-- //End -->
              </b-form-group>
              <b-form-group :label="$t('service.stages-name')">
                <v-select v-model="serviceTask.service_stage_id" :options="getStagesarray" />
                <!-- // Validations -->
                <div v-if="!$v.serviceTask.service_stage_id.required && $v.serviceTask.service_stage_id.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Service Stage Field is Required
                </div>
                <!-- //End -->
              </b-form-group>
              <b-form-group :label="$t('service.order')">
                <b-form-input type="number" v-model="serviceTask.order"/>
                <!-- // Validations -->
                <div v-if="!$v.serviceTask.order.required && $v.serviceTask.order.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Order Field is Required
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
                @click="edittask()"
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
          <service-stage-task-list-item
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
import ServiceStageTaskListItem from '@/components/Listing/ServiceStageTaskListItem'
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
    ServiceStageTaskListItem,    
  },
  data () {
    return {
      isLoad: false,
      apiBase: 'https://devapi.buzaao.com/index.php/api/organization/service_task',
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
      serviceTask: {
        title:'',
        service_id: '',
        supervisor_id: '',
        service_stage_id:'',
        order:''
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
      getStagesarray:[
        { label: "servicestageid",value:"1" },
        { label: "servicestagename ",value:"2" },
      ]
    }
  },
  validations: {
    serviceTask: {
      required,
      title: {
        required,
        maxLength: maxLength(15),
        minLength: minLength(5),
      },
      service_id: {
        required,
      },
      supervisor_id: {
        required,
      },
      service_stage_id: {
        required,
      },
      order: {
        required,
      },
    }
  },
  methods: {
  ...mapActions(['AddServiceTask','StagesTaskList','UpdateServiceTask','DeleteServiceTask','SupervisorList','ServiceList','GetAllStages']),
    loadItems (){
      this.isLoad = false
      this.StagesTaskList().then(result => {
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
      this.GetAllStages().then(result => {
        this.getStagesarray = JSON.parse(result)
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
    addtask () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        console.log()
      } else {
        console.log('Create Task : ', this.serviceTask)
        this.AddServiceTask({title: this.serviceTask.title,service_id: this.serviceTask.service_id.value, supervisor_id: this.serviceTask.supervisor_id.value, service_stage_id: this.serviceTask.service_stage_id.value,order: this.serviceTask.order})
      }
    },
    edittask () {
      console.log('Update Stage Task: ', this.serviceTask)
      this.UpdateServiceTask({id:this.selectedItems[0],title: this.serviceTask.title,service_id: this.serviceTask.service_id.value, supervisor_id: this.serviceTask.supervisor_id.value, service_stage_id: this.serviceTask.service_stage_id.value,order: this.serviceTask.order})
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
      this.serviceTask.title = itemsForToggle[start].title
      this.serviceTask.service_id = itemsForToggle[start].service_id
      this.serviceTask.service_stage_id = itemsForToggle[start].service_stage_id
      this.serviceTask.supervisor_id = itemsForToggle[start].supervisor_id
      this.serviceTask.order = itemsForToggle[start].order
      console.log('Edit Stage Task:', this.selectedItems)
    },
     onContextDelete () {
        console.log('Delete Service Stage Task : ', this.selectedItems)
        this.DeleteServiceTask({ data:this.selectedItems })
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
