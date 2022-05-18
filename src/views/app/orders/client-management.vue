<template>
<b-row>
  <b-colxx class="disable-text-selection">
    <b-row>
      <b-colxx xxs="12">
        <h1>{{ $t('order.client-management') }}</h1>
        <div class="top-right-button-container">
          <b-button
            v-b-modal.modalright
            variant="primary"
            size="lg"
            class="top-right-button"
          >{{ $t('pages.add-new') }}</b-button>
          <b-button
            v-b-modal.importmodal
            variant="primary"
            size="lg"
            class="top-right-button"
          >{{ $t('client.import-client') }}</b-button>
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
            :title="$t('order.add-new-client')"
            class="modal-right"
          >
            <b-form>
              <b-form-group :label="$t('order.add-client-name')">
                <input @input="$v.AllClients.name.$touch" v-model="AllClients.name" name="email" class="form-control" :class="{ 'input--error': $v.AllClients.name.$error }" />
                <!-- // Validations -->
                <div v-if="!$v.AllClients.name.required && $v.AllClients.name.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Client Name Field is Required
                </div>
                <div v-else-if="!$v.AllClients.name.minLength && $v.AllClients.name.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Client Name Must contain Minimum 5 alphabet
                </div>
                <div v-else-if="!$v.AllClients.name.maxLength && $v.AllClients.name.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Client Name Must contain Maximum 15 alphabet
                </div>
                <!-- // End -->
              </b-form-group>
               <b-form-group :label="$t('order.add-client-email')">
                <input @input="$v.AllClients.email.$touch" v-model="AllClients.email" name="email" class="form-control" :class="{ 'input--error': $v.AllClients.email.$error }" />
                 <!-- // Custom Validations -->
                <div v-if="!$v.AllClients.email.required && $v.AllClients.email.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Email Field is Required
                </div>
                <div v-if="!$v.AllClients.email.EmailVerify && $v.AllClients.email.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>You have entered an invalid Email Address!, Email must conatin '@' , 'com'
                </div>
                <!-- // End -->
              </b-form-group> 
              <b-form-group :label="$t('order.add-client-phone')">
                <input @input="$v.AllClients.phone.$touch" v-model="AllClients.phone" type="phone" name="phone" class="form-control" :class="{ 'input--error': $v.AllClients.phone.$error }" />
                <!-- // Validations -->
                <div v-if="!$v.AllClients.phone.required && $v.AllClients.phone.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Phone Field is Required
                </div>  
                <div v-if="!$v.AllClients.phone.minLength && $v.AllClients.phone.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Phone Must Contain Atleast 10 Numeric Alphabets
                </div>  
                <div v-if="!$v.AllClients.phone.maxLength && $v.AllClients.phone.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Phone Should be 10 Numeric Alphabets
                </div>
                <!-- // End -->
              </b-form-group>              
              <b-form-group :label="$t('order.add-client-address')">
                <input @input="$v.AllClients.address.$touch" v-model="AllClients.address" name="text" class="form-control" :class="{ 'input--error': $v.AllClients.address.$error }" />
                <!-- // Address Validation -->
                <div v-if="!$v.AllClients.address.required && $v.AllClients.address.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Address Field is Required
                </div>
                <div v-else-if="!$v.AllClients.address.minLength && $v.AllClients.address.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Address Must contain Minimum 5 alphabet
                </div>
                <div v-else-if="!$v.AllClients.address.maxLength && $v.AllClients.address.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Address Must contain Maximum 15 alphabet
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
                @click.stop="AddClients()"
                class="mr-1"
              >{{ $t('pages.submit') }}</b-button>
            </template>
          </b-modal>
          <b-modal
            id="importmodal"
            ref="importmodal"
            :title="$t('client.import-client')"
            class="modal-right"
          >
            <b-form>
              <b-form-group :label="$t('client.choose-file')">
                <input type="file" id="files" ref="files" multiple v-on:change="handleFilesUpload()"/>
              </b-form-group>
            </b-form>
            <template slot="modal-footer">
              <b-button
                variant="outline-secondary"
                @click="hideModal('importmodal')"
              >{{ $t('pages.cancel') }}</b-button>
              <b-button
                variant="primary"
                @click="submitFiles()"
                class="mr-1"
              >{{ $t('pages.submit') }}</b-button>
            </template>
          </b-modal>
          <b-modal
            id="editOrder"
            ref="editOrder"
            :title="$t('order.edit-client')"
            class="modal-right">
            <b-form>
              <b-form-group :label="$t('order.add-client-name')">
                <input @input="$v.AllClients.name.$touch" v-model="AllClients.name" name="email" class="form-control" :class="{ 'input--error': $v.AllClients.name.$error }" />
                <!-- // Validations -->
                <div v-if="!$v.AllClients.name.required && $v.AllClients.name.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Client Name Field is Required
                </div>
                <div v-else-if="!$v.AllClients.name.minLength && $v.AllClients.name.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Client Name Must contain Minimum 5 alphabet
                </div>
                <div v-else-if="!$v.AllClients.name.maxLength && $v.AllClients.name.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Client Name Must contain Maximum 15 alphabet
                </div>
                <!-- // End -->
              </b-form-group>
               <b-form-group :label="$t('order.add-client-email')">
                <input @input="$v.AllClients.email.$touch" v-model="AllClients.email" name="email" class="form-control" :class="{ 'input--error': $v.AllClients.email.$error }" />
                 <!-- // Custom Validations -->
                <div v-if="!$v.AllClients.email.required && $v.AllClients.email.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Email Field is Required
                </div>
                <div v-if="!$v.AllClients.email.EmailVerify && $v.AllClients.email.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>You have entered an invalid Email Address!, Email must conatin '@' , 'com'
                </div>
                <!-- // End -->
              </b-form-group> 
              <b-form-group :label="$t('order.add-client-phone')">
                <input @input="$v.AllClients.phone.$touch" v-model="AllClients.phone" type="phone" name="phone" class="form-control" :class="{ 'input--error': $v.AllClients.phone.$error }" />
                <!-- // Validations -->
                <div v-if="!$v.AllClients.phone.required && $v.AllClients.phone.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Phone Field is Required
                </div>  
                <div v-if="!$v.AllClients.phone.minLength && $v.AllClients.phone.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Phone Must Contain Atleast 10 Numeric Alphabets
                </div>  
                <div v-if="!$v.AllClients.phone.maxLength && $v.AllClients.phone.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Phone Should be 10 Numeric Alphabets
                </div>
                <!-- // End -->
              </b-form-group>              
              <b-form-group :label="$t('order.add-client-address')">
                <input @input="$v.AllClients.address.$touch" v-model="AllClients.address" name="text" class="form-control" :class="{ 'input--error': $v.AllClients.address.$error }" />
                <!-- // Address Validation -->
                <div v-if="!$v.AllClients.address.required && $v.AllClients.address.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Address Field is Required
                </div>
                <div v-else-if="!$v.AllClients.address.minLength && $v.AllClients.address.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Address Must contain Minimum 5 alphabet
                </div>
                <div v-else-if="!$v.AllClients.address.maxLength && $v.AllClients.address.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Address Must contain Maximum 15 alphabet
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
                @click="UpdateClients()"
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
          <client-list-item 
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
import ClientListItem from '@/components/Listing/ClientListItem'
import { apiUrl } from '@/constants/config'
import { mapGetters, mapMutations, mapActions } from 'vuex'

// Validations
import { helpers } from 'vuelidate/lib/validators'
import Vuelidate from 'vuelidate'
import { required, minLength,email,password,minValue,maxValue,maxLength,numeric,alpha } from 'vuelidate/lib/validators'
Vue.use(Vuelidate)
import {validationMixin} from "vuelidate";

const EmailVerify = helpers.regex('EmailVerify', /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/)

export default {
  components: {
    DataListIcon,
    ThumbListIcon,
    ImageListIcon,
    vSelect,
    ImageListItem,
    ThumbListItem,
    ClientListItem  
  },
  data () {
    return {
      isLoad: true,
      token: 'token',
      renderComponent: true,
      apiBase: 'https://devapi.buzaao.com/index.php/api/organization/client',
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
      AllClients: {
        name: '',
        email: '',
        phone: '',
        address: '',
      },
      csvfile:'',    
    }
  },
  validations: {
    AllClients: {
      required,
      email: {
        required,
        EmailVerify
      },
      name: {
        required,
        maxLength: maxLength(15),
        minLength: minLength(5),
      },
      phone:{
      required,
      minLength: minLength(2),
      maxLength: maxLength(10)
    },
      address:{
        required,
        maxLength: maxLength(15),
        minLength: minLength(5),
      },
    }
  },
  methods: {
      submitFiles(){
        let formData = new FormData();
        for( var i = 0; i < this.files.length; i++ ){
          let csvfile = this.files[i];
          formData.append('csvfile', csvfile);
        }
        axios.post( 'https://devapi.buzaao.com/index.php/api/organization/client_import',
          formData,
          {
            headers: {
             'Content-Type': 'multipart/form-data',
              'Authorization': 'Bearer '+this.token
            }
          }
        ).then(function(){
           alert("Client Imported Successfully!!")
        })
        .catch(function (){ error =>
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        });
      },
      handleFilesUpload(){
        this.files = this.$refs.files.files;
    },
  ...mapActions(['CreateClient','GetAllClient','UpdateClient','DeleteClient','Gettoken']),
    loadItems (){
      this.isLoad = false
      this.GetAllClient().then(result => {
        this.total = 121
        this.from = 0
        this.to = 0
        this.items = JSON.parse(result).data
        this.perPage = 10
        this.selectedItems = []
        this.lastPage = 0
        this.isLoad = true
      })
      this.Gettoken().then(result => {
        this.token = result
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
    AddClients () {
      this.$v.$touch()
      if (this.$v.$invalid){}
      else {
        console.log('Create Clients : ', this.AllClients)
        this.CreateClient({name: this.AllClients.name, email: this.AllClients.email, phone: this.AllClients.phone, address: this.AllClients.address})
      }
    },
    SubmitImport () {
        console.log('Import Clients : ', this.ImportClientCSV)
        this.ImportAllClient({csvfile: this.ImportClientCSV.csvfile})    
    },
    UpdateClients () {
      console.log('Update Clients : ', this.AllClients)
      this.UpdateClient({id:this.selectedItems[0],name: this.AllClients.name, email: this.AllClients.email, phone: this.AllClients.phone, address: this.AllClients.address})
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
      this.AllClients.name = itemsForToggle[start].name
      this.AllClients.email = itemsForToggle[start].email
      this.AllClients.phone = itemsForToggle[start].phone
      this.AllClients.address = itemsForToggle[start].address
      console.log('Edit Items:', this.selectedItems)
    },
    onContextDelete () {
      console.log('Delete Client: ', this.selectedItems)
      this.DeleteClient({ data:this.selectedItems })
    },
    onContextView() {
        console.log('View Order: ',this.selectedItems)
        this.$router.push({path: 'client-detail/'+this.selectedItems[0] })
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
