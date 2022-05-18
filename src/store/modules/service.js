import firebase from 'firebase/app'
import axios from 'axios'
import 'firebase/auth'
import { currentUser,token } from '@/constants/config'

export default {
  state: {
    currentUser: localStorage.getItem('user') != null ? JSON.parse(localStorage.getItem('user')) : null,
    loginError: null,
    processing: false,
    token :  localStorage.getItem('token') != null ? localStorage.getItem('token') : null
  },
  getters: {
    currentUser: state => state.currentUser,
    processing: state => state.processing,
    loginError: state => state.loginError,
    token: state=> state.token
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
    // Service Management //
    addService ({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token');
      axios.post('https://devapi.buzaao.com/index.php/api/organization/service_create', payload,{
      headers: {
        'Authorization': 'Bearer '+token
      }})
        .then(response => {
          alert("Service Added Successfully!!")
        }).catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
    },
    async servicelist ({ commit }) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token');
      var service = null;
      await axios.get('https://devapi.buzaao.com/index.php/api/organization/service',{
      headers: {
        'Authorization': 'Bearer '+token
      }})
      .then(response => {
        //localStorage.setItem('item', JSON.stringify(response.data.success))
        service = JSON.stringify(response.data.success)
        })
        .catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
        //console.log(service)
        return service
    },
    async UpdateService ({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token')
      await axios.post('https://devapi.buzaao.com/index.php/api/organization/service_update', payload,{
      headers: {
        'Authorization': 'Bearer '+token
      }})      
        .then(response => {
          alert("Service Updated Successfully!!")
        }).catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
        this.renderComponent = true;
    },
    async deleteservice ({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token');
      console.log(payload)
      for(var i=0;i< payload.data.length;i++){
        await axios.delete('https://devapi.buzaao.com/index.php/api/organization/service_delete?id='+payload.data[i], { headers: {
            'Authorization': 'Bearer '+token
          }})
            .then(response => {
              alert("Service Deleted Successfully")
            }).catch(error => {
              this.errorMessage = error.message
              commit('setError', error.message)
            })    
      }
    },
    async ServiceDetails ({ commit },serviceid) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token');
      var servicedetail = null;
      await axios.get('https://devapi.buzaao.com/index.php/api/organization/service/'+serviceid,{
      headers: {
        'Authorization': 'Bearer '+token
      }})
      .then(response => {
        //localStorage.setItem('ServiceDetails', ' ')
        //localStorage.setItem('ServiceDetails', JSON.stringify(response.data))
        servicedetail = JSON.stringify(response.data)
        })
        .catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
        return servicedetail        
    },
    // End Service Management //
    // Service Stage //
    AddServiceStage ({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token')
      axios.post('https://devapi.buzaao.com/index.php/api/organization/service_stages_create', payload,{
      headers: {
        'Authorization': 'Bearer '+token
      }})      
        .then(response => {
          alert("Service Stage Task Created Successfully!!")
        }).catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
    },
    async ServiceStageList ({ commit }) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token');
      var servicestage = null;
      await axios.get('https://devapi.buzaao.com/index.php/api/organization/service_stages',{
      headers: {
        'Authorization': 'Bearer '+token
      }})
      .then(response => {
        //localStorage.removeItem('ServiceStageTask')
        //localStorage.setItem('ServiceStageTask', JSON.stringify(response.data))
        servicestage = JSON.stringify(response.data)
        })
        .catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
        return servicestage
    },
    async UpdateServiceStage ({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token')
      await axios.post('https://devapi.buzaao.com/index.php/api/organization/service_stages_update', payload,{
      headers: {
        'Authorization': 'Bearer '+token
      }})      
        .then(response => {
          alert("Service Stages Task Updated Successfully!!")
        }).catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
    },
    async DeleteServiceStage ({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token');
      console.log(payload)
      for(var i=0;i< payload.data.length;i++){
        await axios.delete('https://devapi.buzaao.com/index.php/api/organization/service_task_delete?id='+payload.data[i], { headers: {
            'Authorization': 'Bearer '+token
          }})
            .then(response => {
              alert("Service Stages Task Deleted Successfully!!")
            }).catch(error => {
              this.errorMessage = error.message
              commit('setError', error.message)
            })   
      }
    },
    // End Service Stage
    // Service Stage Task //
    AddServiceTask ({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token')
      axios.post('https://devapi.buzaao.com/index.php/api/organization/service_task_create', payload,{
      headers: {
        'Authorization': 'Bearer '+token
      }})      
        .then(response => {
          alert("Service Stage Created Successfully!!")
        }).catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
    },
    async StagesTaskList ({ commit }) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token');
      var stagetasklist = null;
      await axios.get('https://devapi.buzaao.com/index.php/api/organization/service_task',{
      headers: {
        'Authorization': 'Bearer '+token
      }})
      .then(response => {
        //localStorage.removeItem('ServiceStage')
        //localStorage.setItem('ServiceStage', JSON.stringify(response.data))
        stagetasklist = JSON.stringify(response.data)
        })
        .catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
        return stagetasklist
    },
    async UpdateServiceTask ({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token')
      await axios.post('https://devapi.buzaao.com/index.php/api/organization/service_task_update', payload,{
      headers: {
        'Authorization': 'Bearer '+token
      }})      
        .then(response => {
          alert("Service Stages Updated Successfully!!")
        }).catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
    },
    async DeleteServiceTask({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token');
      console.log(payload)
      for(var i=0;i< payload.data.length;i++){
        await axios.delete('https://devapi.buzaao.com/index.php/api/organization/service_task_delete?id='+payload.data[i], { headers: {
            'Authorization': 'Bearer '+token
          }})
            .then(response => {
              alert("Service Stages Deleted Successfully!!")
            }).catch(error => {
              this.errorMessage = error.message
              commit('setError', error.message)
            })   
      }
    },
    async GetAllStages ({ commit }) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token');
      var getstages = null;
      await axios.get('https://devapi.buzaao.com/index.php/api/organization/service_stages',{
        headers: {
          'Authorization': 'Bearer '+token
        }})
        .then(response => {
          localStorage.setItem('getStages', '')
          var getStagesarray = []
          for(var i=0;i< response.data.data.length;i++){
            getStagesarray.push({label: response.data.data[i].name, value: response.data.data[i].id});
          }
          //localStorage.setItem('getStages', JSON.stringify(getStagesarray))
          getstages = JSON.stringify(getStagesarray)
        })
        .catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
        return getstages          
    },
    // End Service Stage Task //
    // Service Milestone //
    CreateServiceMilestone ({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token')
      axios.post('https://devapi.buzaao.com/index.php/api/organization/service_milestone_create', payload,{
      headers: {
        'Authorization': 'Bearer '+token
      }})      
        .then(response => {
          alert("Service Milestone Created Successfully!!")
        }).catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
    },
    async ServiceMilestoneList ({ commit }) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token');
      var servicemilestone = null;
      await axios.get('https://devapi.buzaao.com/index.php/api/organization/service_milestone',{
      headers: {
        'Authorization': 'Bearer '+token
      }})
      .then(response => {
        //localStorage.removeItem('ServiceStage')
        //localStorage.setItem('ServiceStage', JSON.stringify(response.data))
        servicemilestone = JSON.stringify(response.data)
        })
        .catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
        return servicemilestone       
    },
    async UpdateServiceMilestone ({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token')
      await axios.post('https://devapi.buzaao.com/index.php/api/organization/service_milestone_update', payload,{
      headers: {
        'Authorization': 'Bearer '+token
      }})      
        .then(response => {
          alert("Service Milestone Updated Successfully!!")
        }).catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
    },
    async DeleteServiceMilestone({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token');
      console.log(payload)
      for(var i=0;i< payload.data.length;i++){
        await axios.delete('https://devapi.buzaao.com/index.php/api/organization/service_milestone_delete?id='+payload.data[i], { headers: {
            'Authorization': 'Bearer '+token
          }})
            .then(response => {
              alert("Service Milestone Deleted Successfully!!")
            }).catch(error => {
              this.errorMessage = error.message
              commit('setError', error.message)
            })   
      }
    },
    async SupervisorList ({ commit }) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token');
      var allsupervisor = null;
      await axios.get('https://devapi.buzaao.com/index.php/api/supervisor',{
        headers: {
          'Authorization': 'Bearer '+token
        }})
        .then(response => {
          var supervisor = []
          for(var i=0;i< response.data.success.length;i++){    
            supervisor.push({label: response.data.success[i].name, value: response.data.success[i].id});
          }
          //localStorage.setItem('supervisor', JSON.stringify(supervisor))
          allsupervisor = JSON.stringify(supervisor)
        })
        .catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
        return allsupervisor
        
    },
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
