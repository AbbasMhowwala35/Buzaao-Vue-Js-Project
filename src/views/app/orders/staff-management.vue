<template>
<b-row>
  <b-colxx class="disable-text-selection">
    <b-row>
      <b-colxx xxs="12">
        <h1>{{ $t('user.staff-management') }}</h1>
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
            :title="$t('user.add-new-staff')"
            class="modal-right"
          >
            <b-form>              
              <b-form-group :label="$t('user.staff-image')">
                <input type="file" accept="image/jpeg" @change="ImageChanged">
              </b-form-group> 
              <b-form-group :label="$t('user.staff-name')">
                 <input @input="$v.Staffarray.name.$touch" v-model="Staffarray.name" class="form-control" :class="{ 'input--error': $v.Staffarray.name.$error }" />
                <!-- // Validations -->
                <div v-if="!$v.Staffarray.name.required && $v.Staffarray.name.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Name Field is Required
                </div>
                <div v-else-if="!$v.Staffarray.name.minLength && $v.Staffarray.name.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Name Must contain Minimum 5 alphabet
                </div>
                <div v-else-if="!$v.Staffarray.name.maxLength && $v.Staffarray.name.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Name Must contain Maximum 15 alphabet
                </div>
                <!-- // End -->
              </b-form-group>                            
              <b-form-group :label="$t('user.staff-email')">
                <input type="email" @input="$v.Staffarray.email.$touch" v-model="Staffarray.email" class="form-control" :class="{ 'input--error': $v.Staffarray.email.$error }" />
                <!-- // Custom Validations -->
                <div v-if="!$v.Staffarray.email.required && $v.Staffarray.email.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Email Field is Required
                </div>
                <div v-if="!$v.Staffarray.email.verificationEmail && $v.Staffarray.email.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>You have entered an invalid Email Address!, Email must conatin '@' , 'com'
                </div>
                <!-- // End -->
              </b-form-group>
              <b-form-group :label="$t('user.staff-password')">
                <input type="password" @input="$v.Staffarray.password.$touch" v-model="Staffarray.password" class="form-control" :class="{ 'input--error': $v.Staffarray.password.$error }" />
                <!-- // Password Validation -->
                <div v-if="!$v.Staffarray.password.required && $v.Staffarray.password.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Password Field is Required
                </div>
                <div v-else-if="!$v.Staffarray.password.Strpass && $v.Staffarray.password.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Min. 8 characters with at least one capital letter, a number and a special character.
                </div>
                <!-- // End Validation  -->
              </b-form-group>
              <b-form-group :label="$t('user.staff-c_password')">
                <input type="password" @input="$v.Staffarray.c_password.$touch" v-model="Staffarray.c_password" class="form-control" :class="{ 'input--error': $v.Staffarray.c_password.$error }" />
                <div v-if="!$v.Staffarray.c_password.sameAsPassword && $v.Staffarray.c_password.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Password Must be same
                </div>
              </b-form-group>
               <b-form-group 
               :label="$t('user.organization_id')">
                <input type="text" @input="$v.Staffarray.organization_id.$touch" v-model="Staffarray.organization_id" class="form-control" :class="{ 'input--error': $v.Staffarray.organization_id.$error }" />
                <!-- Validations  -->
                <div v-if="!$v.Staffarray.organization_id.required && $v.Staffarray.organization_id.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Organization Name Field is Required
                </div>
                <!-- End  -->
              </b-form-group>
              <b-form-group :label="$t('user.staff-role')">
                 <v-select v-model="Staffarray.role" :options="GetRoles" />
                 <!-- Validations  -->
                 <div v-if="!$v.Staffarray.role.required && $v.Staffarray.role.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Role Field is Required
                </div>
                <!-- End  -->
              </b-form-group>
              <b-form-group :label="$t('user.staff-phone')">
                <b-form-input type="number" v-model="Staffarray.phone"/>
                <input type="number" @input="$v.Staffarray.phone.$touch" v-model="Staffarray.phone" class="form-control" :class="{ 'input--error': $v.Staffarray.phone.$error }" />
                <!-- Phone Validations -->
                <div v-if="!$v.Staffarray.phone.required && $v.Staffarray.phone.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Phone Field is Required
                </div>  
                <div v-if="!$v.Staffarray.phone.minLength && $v.Staffarray.phone.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Phone Must Contain Atleast 10 Numeric Alphabets
                </div>  
                <div v-if="!$v.Staffarray.phone.maxLength && $v.Staffarray.phone.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Phone Should be 10 Numeric Alphabets
                </div>
                <!-- End -->
              </b-form-group>
              <b-form-group :label="$t('user.staff-status')">
                <v-select v-model="Staffarray.status" :options="statusArray" />
                <div v-if="!$v.Staffarray.status.required && $v.Staffarray.status.$dirty" class="alert alert-danger">
                  <strong>Error! </strong>Status is Required
                </div>
              </b-form-group>
              <b-form-group :label="$t('user.user-permission')">
                <input type="checkbox" value="1" v-model="Staffarray.order_stage"> Order Stages<br />
                <input type="checkbox" value="1" v-model="Staffarray.order_task"> Order Task <br />
              </b-form-group>
            </b-form>
            <template slot="modal-footer">
              <b-button
                variant="outline-secondary"
                @click="hideModal('modalright')"
              >{{ $t('pages.cancel') }}</b-button>
              <b-button
                variant="primary"
                @click.stop="CreateStaff()"
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
              <b-form-group :label="$t('user.staff-image')">
                <input type="file" accept="image/jpeg" @change="ImageChanged">
              </b-form-group> 
              <b-form-group :label="$t('user.staff-name')">               
                 <b-form-input v-model="Staffarray.name"/>
                <!-- // Validations -->
                <div v-if="!$v.Staffarray.name.required" class="alert alert-danger">
                  <strong>Error! </strong>Name Field is Required
                </div>
                <div v-else-if="!$v.Staffarray.name.minLength" class="alert alert-danger">
                  <strong>Error! </strong>Name Must contain Minimum 5 alphabet
                </div>
                <div v-else-if="!$v.Staffarray.name.maxLength" class="alert alert-danger">
                  <strong>Error! </strong>Name Must contain Maximum 15 alphabet
                </div>
                <!-- // End -->
              </b-form-group>              
              <b-form-group :label="$t('user.staff-email')">
                <b-form-input v-model="Staffarray.email"/>
                <!-- // Custom Validations -->
                <div v-if="!$v.Staffarray.email.required" class="alert alert-danger">
                  <strong>Error! </strong>Email Field is Required
                </div>
                <div v-if="!$v.Staffarray.email.verificationEmail" class="alert alert-danger">
                  <strong>Error! </strong>You have entered an invalid Email Address!, Email must conatin '@' , 'com'
                </div>
                <!-- // End -->
              </b-form-group>
              <b-form-group :label="$t('user.staff-role')">
                 <v-select v-model="Staffarray.role" :options="GetRoles" />
                 <!-- Validations  -->
                 <div v-if="!$v.Staffarray.role.required" class="alert alert-danger">
                  <strong>Error! </strong>Role Field is Required
                </div>
                <!-- End  -->
              </b-form-group>
              <b-form-group :label="$t('user.staff-phone')">
                <b-form-input type="number" v-model="Staffarray.phone"/>
                <!-- Phone Validations -->
                <div v-if="!$v.Staffarray.phone.required" class="alert alert-danger">
                  <strong>Error! </strong>Phone Field is Required
                </div>  
                <div v-if="!$v.Staffarray.phone.minLength" class="alert alert-danger">
                  <strong>Error! </strong>Phone Must Contain Atleast 10 Numeric Alphabets
                </div>  
                <div v-if="!$v.Staffarray.phone.maxLength" class="alert alert-danger">
                  <strong>Error! </strong>Phone Should be 10 Numeric Alphabets
                </div>
                <!-- End -->
              </b-form-group>
              <b-form-group :label="$t('user.staff-status')">
                <v-select v-model="Staffarray.status" :options="statusArray" />
                <div v-if="!$v.Staffarray.status.required" class="alert alert-danger">
                  <strong>Error! </strong>Status is Required
                </div>
              </b-form-group>
              <b-form-group :label="$t('user.user-permission')">
                <input type="checkbox" value="1" v-model="Staffarray.order_stage"> Order Stages<br />
                <input type="checkbox" value="1" v-model="Staffarray.order_task"> Order Task <br />
              </b-form-group>
            </b-form>
            <template slot="modal-footer">
              <b-button
                variant="outline-secondary"
                @click="hideModal('modalright')"
              >{{ $t('pages.cancel') }}</b-button>
              <b-button
                variant="primary"
                @click="UpdateStaffList()"
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
          <staff-list-item 
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
import StaffListItem from '@/components/Listing/StaffListItem'
import { apiUrl } from '@/constants/config'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Vuelidate from 'vuelidate'
import { required, sameAs, minLength, maxLength } from 'vuelidate/lib/validators'
Vue.use(Vuelidate)
import { helpers } from 'vuelidate/lib/validators'  

//const EmailVerify = helpers.regex('EmailVerify', /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/)
const Strpass = helpers.regex('Strpass', /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
const verificationEmail = helpers.regex('verificationEmail', /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/)

export default {
  components: {
    DataListIcon,
    ThumbListIcon,
    ImageListIcon,
    vSelect,
    ImageListItem,
    ThumbListItem,
    StaffListItem    
  },
  data () {
    return {
      isLoad: true,
      token: '',
      renderComponent: true,
      apiBase: 'https://devapi.buzaao.com/index.php/api/organization/staff',
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
      Staffarray: {
        image: '',
        name: '',
        email: '',
        phone:'',
        role:'',
        status:'',
        password:'',
        organization_id:'',
        c_password:'',
        order_stage:'',
        order_task:''        
      },
      statusArray: [
        { label: "Active",value:"1" },
        { label: "Deactive",value:"0" },               
      ],
      GetRoles:[
        { label: "roleid",value:"1" },
        { label: "rolename",value:"2" },
      ]
      // End Array //
    }
  },
  validations: {
    Staffarray: {
      required,
        name:{
          required,
          maxLength: maxLength(15),
          minLength: minLength(5),
        },
        email:{
          required,
          verificationEmail
        },
        phone:{
          required,
          minLength: minLength(2),
          maxLength: maxLength(10)
        },
        role:{
          required,
        },
        status:{
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
        organization_id:{
          required,
        },        
    }
  },
  methods: {
    ImageChanged(e){
      console.log(e.target)
      var fileReader = new FileReader()
      fileReader.readAsDataURL(e.target.files[0])
      fileReader.onload = (e) => {
        this.Staffarray.image = e.target.result
      }
      console.log(this.Staffarray)
    },
  ...mapActions(['AddNewStafff','GetStafflist','Gettoken','UpdateStaff','DeleteStaff','GetAllRoles']),
    loadItems (){
      this.isLoad = false  
      this.GetStafflist().then(result => {
        this.total = 121
        this.from = 0
        this.to = 0
        this.items = JSON.parse(result)
        this.perPage = 10
        this.selectedItems = []
        this.lastPage = 0
        this.isLoad = true
      })
      this.Gettoken().then(result => {
        this.token = result
      })
      //console.log(this.token)
      this.GetAllRoles().then(result => {
        this.GetRoles = JSON.parse(result)
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
    CreateStaff () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        console.log()
      } else {
        console.log('Create Staff : ', this.Staffarray)
        this.AddNewStafff({name: this.Staffarray.name,email: this.Staffarray.email,password: this.Staffarray.password,c_password:this.Staffarray.c_password,phone: this.Staffarray.phone,status: this.Staffarray.status.value,organization_id:this.Staffarray.organization_id,role:this.Staffarray.role.value, image: this.Staffarray.image,order_stage: this.Staffarray.order_stage,order_task: this.Staffarray.order_task,})
      }
    },
    UpdateStaffList () {
      console.log('Update Staff : ', this.Staffarray)
      this.UpdateStaff({id:this.selectedItems[0],name: this.Staffarray.name,email: this.Staffarray.email,password: this.Staffarray.password,c_password:this.Staffarray.c_password,phone: this.Staffarray.phone,status: this.Staffarray.status.value,organization_id:this.Staffarray.organization_id,role:this.Staffarray.role.value, image: this.Staffarray.image})
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
      this.Staffarray.image = itemsForToggle[start].image
      this.Staffarray.name = itemsForToggle[start].name
      this.Staffarray.email = itemsForToggle[start].email
      this.Staffarray.phone = itemsForToggle[start].phone
      this.Staffarray.role = itemsForToggle[start].role
      this.Staffarray.status = itemsForToggle[start].status
      console.log('Edit Items:', this.selectedItems)
    },
    onContextDelete () {
        console.log('Delete Staff : ', this.selectedItems)
        this.DeleteStaff({ data:this.selectedItems })
    },
    onContextView() {
      console.log('View Staff: ',this.selectedItems)
      this.$router.push({path: 'staff-details/'+ this.selectedItems[0] })
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