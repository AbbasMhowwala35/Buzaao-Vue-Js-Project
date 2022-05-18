<template>
  <b-row class="h-100">
    <b-colxx xxs="12" md=10  class="mx-auto my-auto">
      <b-card class="auth-card" no-body>
          <div class="position-relative image-side ">
            <p class=" text-white h2">{{ $t('dashboards.magic-is-in-the-details') }}</p>
              <p class="white mb-0">  Please use this form to register. <br />If you are a member,
                <router-link tag="a" to="/user/login" class="white" style="text-decoration:underline;">Login</router-link>.
              </p>
          </div>
          <div class="form-side">
            <router-link tag="a" to="/"><span class="logo-single"/></router-link>
            <h6 class="mb-4">{{ $t('user.register')}}</h6>
            <b-form @submit.prevent="formSubmit">
               <label class="form-group has-float-label mb-4">
                <input type="text" class="form-control" v-model="name">
                <span>{{ $t('user.fullname') }}</span>
                <!-- // Validations -->
                <div v-if="!$v.name.required" class="alert alert-danger">
                  <strong>Error! </strong>Fullname Field is Required
                </div>
                <div v-else-if="!$v.name.minLength" class="alert alert-danger">
                  <strong>Error! </strong>Name Must contain Minimum 5 alphabet
                </div>
                <div v-else-if="!$v.name.maxLength" class="alert alert-danger">
                  <strong>Error! </strong>Name Must contain Maximum 15 alphabet
                </div>
                <!-- // End -->
              </label>
              <label class="form-group has-float-label mb-4">
                <input type="email" class="form-control" v-model="email">
                <span>{{ $t('user.email') }}</span>
                <!-- // Custom Validations -->
                <div v-if="!$v.email.required" class="alert alert-danger">
                  <strong>Error! </strong>Email Field is Required
                </div>
                <div v-if="!$v.email.EmailVerify" class="alert alert-danger">
                  <strong>Error! </strong>You have entered an invalid Email Address!, Email must conatin '@' , 'com'
                </div>
                <!-- // End -->
              </label>
              <label class="form-group has-float-label mb-4">
                <input type="password" class="form-control" v-model="c_password">
                <span>{{ $t('user.c_password') }}</span>
                <!-- // Password Validation -->
                <div v-if="!$v.c_password.required" class="alert alert-danger">
                  <strong>Error! </strong>Password Field is Required
                </div>
                <div v-else-if="!$v.c_password.Strpass  " class="alert alert-danger">
                  <strong>Error! </strong>Min. 8 characters with at least one capital letter, a number and a special character.
                </div>
                <!-- // End Validation  -->
              </label>
              <label class="form-group has-float-label mb-4">
                <input type="text" class="form-control" v-model="role">
                <span>{{ $t('user.role') }}</span>
                <div v-if="!$v.role.required" class="alert alert-danger">
                  <strong>Error! </strong>User Role Field is Required
                </div>
              </label>
              <label class="form-group has-float-label mb-4">
                <input type="text" class="form-control" v-model="organization">
                <span>{{ $t('user.organization') }}</span>
                <div v-if="!$v.organization.required" class="alert alert-danger">
                  <strong>Error! </strong>Organization Name Field is Required
                </div>
              </label>
              <label class="form-group has-float-label mb-4">
                <input type="number" class="form-control" v-model="phone">
                <span>{{ $t('user.phone') }}</span>
                <!-- Phone Validations -->
                <div v-if="!$v.phone.required" class="alert alert-danger">
                  <strong>Error! </strong>Phone Field is Required
                </div>  
                <div v-if="!$v.phone.minLength" class="alert alert-danger">
                  <strong>Error! </strong>Phone Must Contain Atleast 10 Numeric Alphabets
                </div>  
                <div v-if="!$v.phone.maxLength" class="alert alert-danger">
                  <strong>Error! </strong>Phone Should be 10 Numeric Alphabets
                </div>
                <!-- End -->
              </label>
             
              <div class="d-flex justify-content-end align-items-center">
                  <b-button type="submit" variant="primary" size="lg" class="btn-shadow">{{ $t('user.register-button')}}</b-button>
              </div>
          </b-form>
        </div>
      </b-card>
    </b-colxx>
  </b-row>
</template>
<script>
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex'

// Validations
import { helpers } from 'vuelidate/lib/validators'
import Vuelidate from 'vuelidate'
import { required, minLength,email,password,minValue,maxValue,maxLength,numeric,alpha } from 'vuelidate/lib/validators'
Vue.use(Vuelidate)
import {validationMixin} from "vuelidate";

//const
const EmailVerify = helpers.regex('EmailVerify', /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/)
const Strpass = helpers.regex('Strpass', /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)

export default {
  data () {
    return {
      name: '',
      email: '',
      c_password: '',
      role:'',
      organization:'',
      phone:'',
    }
  },
  validations: {
    name: {
      required,
      maxLength: maxLength(15),
      minLength: minLength(5),
    },
    email: {
      required,
      EmailVerify
    },
    c_password:{
      required,
      maxLength: maxLength(10),
      Strpass
    },
    role:{
      required,
    },
    organization:{
      required,
    },
    phone:{
      required,
      minLength: minLength(2),
      maxLength: maxLength(10)
    },
  },
  methods: { 
   ...mapActions(['register']),
    formSubmit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        console.log()
      } else {
        this.register({name: this.name, email: this.email, c_password:this.c_password,password:this.c_password,role: this.role ,organization_id:this.organization,phone:this.phone })
      }
    }
  }
}
</script>
