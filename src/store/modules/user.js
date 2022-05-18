import firebase from 'firebase/app'
import axios from 'axios'
import 'firebase/auth'
import { currentUser,token,permission } from '@/constants/config'

export default {
  state: {
    currentUser: localStorage.getItem('user') != null ? JSON.parse(localStorage.getItem('user')) : null,
    loginError: null,
    processing: false,
    token :  localStorage.getItem('token') != null ? localStorage.getItem('token') : null,
  },
  getters: {
    currentUser: state => state.currentUser,
    processing: state => state.processing,
    loginError: state => state.loginError,
    token: state=> state.token,
  },
  mutations: {
    setUser (state, payload) {
      state.currentUser = payload
      state.processing = false
      state.loginError = null
    },
    setToken (state, payload) {
      state.token = payload.token
      state.processing = false
      state.loginError = null
    },
    setLogout (state) {
      state.currentUser = null
      state.processing = false
      state.loginError = null
    },
    setProcessing (state, payload) {
      state.processing = payload
      state.loginError = null
    },
    setError (state, payload) {
      state.loginError = payload
      state.currentUser = null
      state.processing = false
    },
    clearError (state) {
      state.loginError = null
    }
  },
  actions: {
    async login ({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      var user = null;
      await axios.post('https://devapi.buzaao.com/index.php/api/organization/login', payload)
        .then(response => {
          currentUser.id = response.data.success.id
          currentUser.title = response.data.success.name
          currentUser.token = response.data.success.token
          currentUser.userpermission = response.data.success.permission
          const item = { uid: response.data.success.id, ...currentUser }
          localStorage.setItem('user', JSON.stringify(item))
          localStorage.setItem('token', response.data.success.token)
          commit('setUser', { uid: response.data.success.id, ...currentUser })
          console.log(currentUser)
        })
        .catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
        return user
    },
    async register ({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      await axios.post('https://devapi.buzaao.com/index.php/api/register', payload)
        .then(response => {
          currentUser.id = response.data.success.id
          currentUser.title = response.data.success.name
          currentUser.token = response.data.success.token
          const item = { uid: response.data.success.id, ...currentUser }
          localStorage.setItem('user', JSON.stringify(item))
          commit('setUser', { uid: response.data.success.id, ...currentUser })          
        }).catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
        return user
    },
    // Staff Management //
    AddNewStafff ({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token')
      axios.post('https://devapi.buzaao.com/index.php/api/register', payload,{
      headers: { 
        'Authorization': 'Bearer '+token
      }})      
        .then(response => {
          alert("User Created Successfully!!")
        }).catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
    },    
    async GetStafflist ({ commit }) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token');
      var staff = null;
      await axios.get('https://devapi.buzaao.com/index.php/api/organization/staff',{
      headers: {
        'Authorization': 'Bearer '+token
      }})
      .then(response => {
        //localStorage.removeItem('getStafff')
        response.data.data.token = token
        //localStorage.setItem('getStafff', JSON.stringify(response.data.data))
        staff = JSON.stringify(response.data.success)
        })
        .catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
        return staff;
    },
    UpdateStaff ({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token')
      axios.post('https://devapi.buzaao.com/index.php/api/organization/staff_update', payload,{
      headers: {
        'Authorization': 'Bearer '+token
      }})      
        .then(response => {
          alert("Staff Updated Successfully!!")
        }).catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
    },
    DeleteStaff ({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token');
      console.log(payload)
      for(var i=0;i< payload.data.length;i++){
        axios.delete('https://devapi.buzaao.com/index.php/api/organization/staff_delete?id='+payload.data[i], { headers: {
            'Authorization': 'Bearer '+token
          }})
            .then(response => {
              alert("Staff Deleted Successfully!!")
            }).catch(error => {
              this.errorMessage = error.message
              commit('setError', error.message)
            })   
      }
    },
    async StaffDetails ({ commit },staffid) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token');
      var StaffDetails = null;
      await axios.get('https://devapi.buzaao.com/index.php/api/organization/staff/'+staffid,{
      headers: {
        'Authorization': 'Bearer '+token
      }})
      .then(response => {
        //localStorage.setItem('StaffDetails', ' ')
        ///localStorage.setItem('StaffDetails', JSON.stringify(response))
        StaffDetails = JSON.stringify(response)
        })
        .catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
        return StaffDetails
    },
    // End Staff //
    // Token //
    Gettoken ({ commit }){
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token');
      return token
    },
    // End Token //    
    // Create Role //
    async CreateUserRole ({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token')
      await axios.post('https://devapi.buzaao.com/index.php/api/organization/user_role_create', payload,{
      headers: {
        'Authorization': 'Bearer '+token
      }})      
        .then(response => {
          alert("User Created Successfully!!")
        }).catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
    },
    async GetAllUser ({ commit }) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token');
      var GetRoles = null;
      await axios.get('https://devapi.buzaao.com/index.php/api/organization/user_role',{
      headers: {
        'Authorization': 'Bearer '+token
      }})
      .then(response => {
        //localStorage.removeItem('GetRoles')
        //localStorage.setItem('GetRoles', JSON.stringify(response.data))
        GetRoles = JSON.stringify(response.data)
        })
        .catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
        return GetRoles   
    },
    async UpdateOrder ({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token')
      await axios.post('https://devapi.buzaao.com/index.php/api/organization/order_update', payload,{
      headers: {
        'Authorization': 'Bearer '+token
      }})      
        .then(response => {
          alert("Role Updated Successfully!!")
        }).catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
    },
    async DeleteUserRole ({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token');
      console.log(payload)
      for(var i=0;i< payload.data.length;i++){
        await axios.delete('https://devapi.buzaao.com/index.php/api/organization/user_role_delete?id='+payload.data[i], { headers: {
            'Authorization': 'Bearer '+token
          }})
            .then(response => {
              alert("Role Deleted Successfully!!")
            }).catch(error => {
              this.errorMessage = error.message
              commit('setError', error.message)
            })   
      }
    },
    async GetAllRoles({ commit }) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token');
      var Roles = null;
      await axios.get('https://devapi.buzaao.com/index.php/api/organization/user_role',{
        headers: {
          'Authorization': 'Bearer '+token
        }})
        .then(response => {
          var GetRoles = []
          for(var i=0;i< response.data.data.length;i++){    
            GetRoles.push({label: response.data.data[i].name, value: response.data.data[i].id});
          }
          //localStorage.setItem('Roles', JSON.stringify(GetRoles))
          Roles = JSON.stringify(GetRoles)
        })
        .catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
        return Roles
    },
    // End User Role //
    // Organization Management //
    async CreateOrganization ({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token')
      await axios.post('https://devapi.buzaao.com/index.php/api/organization/register', payload,{
      headers: {
        'Authorization': 'Bearer '+token
      }})      
        .then(response => {
          alert("Organization Created Successfully!!")
        }).catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
    },
    async GetAllOrganization ({ commit }) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token');
      var GetAllOrganization = null;
      await axios.get('https://devapi.buzaao.com/index.php/api/organization/details',{
      headers: {
        'Authorization': 'Bearer '+token
      }})
      .then(response => {
        //localStorage.removeItem('GetAllOrganization')
        //localStorage.setItem('GetAllOrganization', JSON.stringify(response.data.success))
        GetAllOrganization =  JSON.stringify(response.data.success)
        })
        .catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
        return GetAllOrganization
    },
    async UpdateOrganization ({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token')
      await axios.post('https://devapi.buzaao.com/index.php/api/organization/organization_update', payload,{
      headers: {
        'Authorization': 'Bearer '+token
      }})      
        .then(response => {
          alert("Organization Updated Successfully!!")
        }).catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
    },
    async DeleteOrganization ({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token');
      console.log(payload)
      for(var i=0;i< payload.data.length;i++){
        await axios.delete('https://devapi.buzaao.com/index.php/api/organization/delete?id='+payload.data[i], { headers: {
            'Authorization': 'Bearer '+token
          }})
            .then(response => {
              alert("Organization Deleted Successfully!!")
            }).catch(error => {
              this.errorMessage = error.message
              commit('setError', error.message)
          })   
      }
    },
    // End Organization //
    // Client List & Location //
    async ClientList ({ commit }) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token');
      var client = null;
      await axios.get('https://devapi.buzaao.com/index.php/api/organization/client',{
        headers: {
          'Authorization': 'Bearer '+token
        }})
        .then(response => {
          var resultArray = []
          for(var i=0;i< response.data.data.length;i++){    
            resultArray.push({label: response.data.data[i].name, value: response.data.data[i].id});
          }
          //localStorage.setItem('client', JSON.stringify(resultArray))
          client = JSON.stringify(resultArray)
        })
        .catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
        return client
    },
    // Client Management //
    async CreateClient ({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token')
      await axios.post('https://devapi.buzaao.com/index.php/api/organization/client_create', payload,{
      headers: {
        'Authorization': 'Bearer '+token
      }})      
        .then(response => {
          alert("Client Created Successfully!!")
        }).catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
    },
    async GetAllClient ({ commit }) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token');
      var AllClient = null;
      await axios.get('https://devapi.buzaao.com/index.php/api/organization/client',{
      headers: {
        'Authorization': 'Bearer '+token
      }})
      .then(response => {
        localStorage.removeItem('item')
        //localStorage.setItem('AllClient', JSON.stringify(response.data))
        AllClient = JSON.stringify(response.data)
        })
        .catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })      
        return AllClient
    },
    async UpdateClient ({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token')
      await axios.post('https://devapi.buzaao.com/index.php/api/organization/client_update', payload,{
      headers: {
        'Authorization': 'Bearer '+token
      }})      
        .then(response => {
          alert("Client Updated Successfully!!")
        }).catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
    },
    async DeleteClient ({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token');
      console.log(payload)
      for(var i=0;i< payload.data.length;i++){
        await axios.delete('https://devapi.buzaao.com/index.php/api/organization/client_delete?id='+payload.data[i], { headers: {
            'Authorization': 'Bearer '+token
          }})
            .then(response => {
              alert("Milestone Deleted Successfully!!")
            }).catch(error => {
              this.errorMessage = error.message
              commit('setError', error.message)
          })   
      }
    },
    async ClientDetails ({ commit },clientid) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token');
      var ClientDetail = nulll;
      await axios.get('https://devapi.buzaao.com/index.php/api/organization/client/'+clientid,{
      headers: {
        'Authorization': 'Bearer '+token
      }})
      .then(response => {
        //localStorage.setItem('ClientDetail', ' ')
        //localStorage.setItem('ClientDetail', JSON.stringify(response.data))
        ClientDetail = JSON.stringify(response.data)
        })
        .catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
        return ClientDetail
    },
    async CreateClientLocation ({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token')
      await axios.post('https://devapi.buzaao.com/index.php/api/organization/client_locations_create', payload,{
      headers: {
        'Authorization': 'Bearer '+token
      }})      
        .then(response => {
          alert("Client Location Created Successfully!!")
        }).catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
    },
    // End Client //
    signOut ({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          localStorage.removeItem('user')
          commit('setLogout')
        }, _error => {})
    }
  }
}