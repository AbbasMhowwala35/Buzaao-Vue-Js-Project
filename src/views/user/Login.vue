<template>
  <b-row class="h-100">
    <b-colxx xxs="12" md=10  class="mx-auto my-auto">
      <b-card class="auth-card" no-body>
          <div class="position-relative image-side ">
            <p class=" text-white h2">{{ $t('dashboards.magic-is-in-the-details') }}</p>
              <p class="white mb-0">Please use your credentials to login to buzaao.<br>If you are not a member, please
                <router-link tag="a" to="/user/register" class="white" style="text-decoration:underline;">Register Here</router-link>.
              </p>
          </div>
          <div class="form-side">
            <router-link tag="a" to="/"><span class="logo-single"/></router-link>
            <h6 class="mb-4">{{ $t('user.login-title')}}</h6>
            <b-form @submit.prevent="formSubmit">
              <label class="form-group has-float-label mb-4">
              <input @input="$v.useremail.$touch" placeholder="Your Email Address" v-model="useremail" name="email" class="form-control" :class="{ 'input--error': $v.useremail.$error }" />
                <div v-if="!$v.useremail.required && $v.useremail.$dirty" class="error alert alert-danger">
                  <strong>Error! </strong>Field is Required
                </div>
               <div v-else-if="!$v.useremail.useremail && $v.useremail.$dirty" class="error alert alert-danger">
                  <strong>Error! </strong> This is not a valid email
              </div> 
              </label>
              <label class="form-group has-float-label mb-4">
                <input @input="$v.userpassword.$touch" placeholder="Please Enter Password" v-model="userpassword" name="password" class="form-control" :class="{ 'input--error': $v.useremail.$error }" />
                <!-- <div class="error" v-if="!$v.userpassword.required && $v.userpassword.$dirty">Field is required</div> -->
                <div v-if="!$v.userpassword.required && $v.userpassword.$dirty" class="error alert alert-danger">
                  <strong>Error! </strong>Password Field is Required
              </div>
              </label>
              <div class="d-flex justify-content-between align-items-center">
                  <router-link tag="a" to="/user/forgot-password">{{ $t('user.forgot-password-question')}}</router-link>
                  <b-button type="submit" variant="primary" size="lg" class="btn-shadow" :disabled="processing">{{ $t('user.login-button')}}</b-button>
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
import Vuelidate from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
Vue.use(Vuelidate)

import { helpers } from 'vuelidate/lib/validators'  
const useremail = helpers.regex('useremail', /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/)


export default {
  data () {
    return {
      useremail: '',
      userpassword: ''
    }
  },
  validations: {
    useremail: {
      required,
      useremail
    },
    userpassword:{
      required,
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'processing', 'loginError'])
  },
  methods: {
    ...mapActions(['login']),
    formSubmit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        console.log("in error form incomplete")
      } else {
          this.login({ email: this.useremail, password: this.userpassword }).then(result => {
            this.$router.push('/')
        })
      }
    }
  },
  watch: {
    currentUser (val) {
      if (val && val.uid && val.uid.length > 0) {
        setTimeout(() => {
          this.$router.push('/')
        }, 500)
      }
    },
    loginError (val) {
      if (val != null) {
        this.$notify('error', 'Login Error', val, { duration: 3000, permanent: false })
      }
    }
  }
}
</script>
