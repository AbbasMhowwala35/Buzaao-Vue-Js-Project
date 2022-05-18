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
    // Order Management //
    CreateOrder ({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token')
      axios.post('https://devapi.buzaao.com/index.php/api/organization/order_create', payload,{
      headers: {
        'Authorization': 'Bearer '+token
      }})      
        .then(response => {
          alert("Order Created Successfully!!")
        }).catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
    },
    async OrdersList ({ commit }) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token');
      var item = null;
      await axios.get('https://devapi.buzaao.com/index.php/api/organization/order',{
      headers: {
        'Authorization': 'Bearer '+token
      }})
      .then(response => {
        item = JSON.stringify(response.data.success)
        })
        .catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
        return  item        
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
          alert("Order Updated Successfully!!")
        }).catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
    },
    async DeleteOrder ({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token');
      console.log(payload)
      for(var i=0;i< payload.data.length;i++){
        await axios.delete('https://devapi.buzaao.com/index.php/api/organization/order_delete?id='+payload.data[i], { headers: {
            'Authorization': 'Bearer '+token
          }})
            .then(response => {
              alert("Order Deleted Successfully!!")
            }).catch(error => {
              this.errorMessage = error.message
              commit('setError', error.message)
            })   
      }
    },
    async OrdersDetails ({ commit },orderid) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token');
      var orderdetail = null;
      await axios.get('https://devapi.buzaao.com/index.php/api/organization/order/'+orderid,{
      headers: {
        'Authorization': 'Bearer '+token
      }})
      .then(response => {
        //localStorage.setItem('OrderDetails', ' ')
        //localStorage.setItem('OrderDetails', JSON.stringify(response.data))
        orderdetail = JSON.stringify(response.data)
        })
        .catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
        return orderdetail
    },
    // End Order Management //    
    // Service //
    async ServiceList ({ commit }) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token');
      var service = null;
      await axios.get('https://devapi.buzaao.com/index.php/api/organization/service',{
        headers: {
          'Authorization': 'Bearer '+token
        }})
        .then(response => {
          var servicearray = []
          for(var i=0;i< response.data.success.service.length;i++){    
            servicearray.push({label: response.data.success.service[i].name, value: response.data.success.service[i].id});
          }
          //localStorage.setItem('service', JSON.stringify(servicearray))
          service = JSON.stringify(servicearray)
        })
        .catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
        return service
    },
    async SupervisorList ({ commit }) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token');
      var supervisor = null;
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
          suypervisor = JSON.stringify(supervisor)
        })
        .catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
        return supervisor 
    },
    // End Service //
    // Order Stages //
    async OrderStage ({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token')
      await axios.post('https://devapi.buzaao.com/index.php/api/organization/order_stages_create', payload,{
      headers: {
        'Authorization': 'Bearer '+token
      }})      
        .then(response => {
          alert("Order Stages Created Successfully!!")
        }).catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
    },
    async OrderStageList ({ commit }) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token');
      var OrderStages = null;
      await axios.get('https://devapi.buzaao.com/index.php/api/organization/order_stages',{
      headers: {
        'Authorization': 'Bearer '+token
      }})
      .then(response => {
        //localStorage.removeItem('item')
        //localStorage.setItem('OrderStages', JSON.stringify(response.data))
        OrderStages = JSON.stringify(response.data)
        })
        .catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })      
        return OrderStages 
    },
    async UpdateOrderStage ({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token')
      await axios.post('https://devapi.buzaao.com/index.php/api/organization/order_stages_update', payload,{
      headers: {
        'Authorization': 'Bearer '+token
      }})      
        .then(response => {
          alert("Order Stages Updated Successfully!!")
        }).catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
    },
    async DeleteOrderStage ({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token');
      console.log(payload)
      for(var i=0;i< payload.data.length;i++){
        await axios.delete('https://devapi.buzaao.com/index.php/api/organization/order_stages_delete?id='+payload.data[i], { headers: {
            'Authorization': 'Bearer '+token
          }})
            .then(response => {
              alert("Order Stages Deleted Successfully!!")
            }).catch(error => {
              this.errorMessage = error.message
              commit('setError', error.message)
            })   
      }
    },
    // End Stages //
    // Order Stages Task //
    async OrderStageTask ({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token')
      await axios.post('https://devapi.buzaao.com/index.php/api/organization/order_tasks_create', payload,{
      headers: {
        'Authorization': 'Bearer '+token
      }})      
        .then(response => {
          alert("Task Created Successfully!!")
        }).catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
    },
    async OrderTaskList ({ commit }) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token');
      var OrderTask = null;
      await axios.get('https://devapi.buzaao.com/index.php/api/organization/order_task',{
      headers: {
        'Authorization': 'Bearer '+token
      }})
      .then(response => {
        //localStorage.removeItem('item')
        //localStorage.setItem('OrderTask', JSON.stringify(response.data))
        OrderTask = JSON.stringify(response.data)
        })
        .catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })      
        return OrderTask
    },
    async UpdateOrderTask ({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token')
      await axios.post('https://devapi.buzaao.com/index.php/api/organization/order_tasks_update', payload,{
      headers: {
        'Authorization': 'Bearer '+token
      }})      
        .then(response => {
          alert("Task Updated Successfully!!")
        }).catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
    },
    async DeleteOrderTask ({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token');
      console.log(payload)
      for(var i=0;i< payload.data.length;i++){
        await axios.delete('https://devapi.buzaao.com/index.php/api/organization/order_task_delete?id='+payload.data[i], { headers: {
            'Authorization': 'Bearer '+token
          }})
            .then(response => {
              alert("Task Deleted Successfully!!")
            }).catch(error => {
              this.errorMessage = error.message
              commit('setError', error.message)
          })   
      }
    },
    async OrderStagesList ({ commit }) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token');
      var OrderStages = null;
      await axios.get('https://devapi.buzaao.com/index.php/api/organization/order_stages',{
        headers: {
          'Authorization': 'Bearer '+token
        }})
        .then(response => {
          var stagesarray = []
          for(var i=0;i< response.data.data.length;i++){    
            stagesarray.push({label: response.data.data[i].name, value: response.data.data[i].id});
          }
          //localStorage.setItem('OrderStages', JSON.stringify(stagesarray))
          OrderStages = JSON.stringify(stagesarray)
        })
        .catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
        return OrderStages 
    },
    async OrderAllTaskList ({ commit }) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token');
      var OrderAllTask = null;
      await axios.get('https://devapi.buzaao.com/index.php/api/organization/order_task',{
        headers: {
          'Authorization': 'Bearer '+token
        }})
        .then(response => {
          var taskarray = []
          for(var i=0;i< response.data.data.length;i++){    
            taskarray.push({label: response.data.data[i].title, value: response.data.data[i].id});
          }
          //localStorage.setItem('OrderAllTask', JSON.stringify(taskarray))
          OrderAllTask = JSON.stringify(taskarray)
        })
        .catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
        return OrderAllTask
    },
    // End Order Stages Task //
    // Order Milestones //
    async CreateOrderMilestone ({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token')
      await axios.post('https://devapi.buzaao.com/index.php/api/organization/order_milestone_create', payload,{
      headers: {
        'Authorization': 'Bearer '+token
      }})      
        .then(response => {
          alert("Milestone Created Successfully!!")
        }).catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
    },
    async MilestoneList ({ commit }) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token');
      var OrderMilestone= null;
      await axios.get('https://devapi.buzaao.com/index.php/api/organization/order_milestone',{
      headers: {
        'Authorization': 'Bearer '+token
      }})
      .then(response => {
        //localStorage.removeItem('item')
        //localStorage.setItem('OrderMilestone', JSON.stringify(response.data))
        OrderMilestone = JSON.stringify(response.data)
        })
        .catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })      
        return OrderMilestone
    },
    async UpdateOrderMilestone ({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token')
      await axios.post('https://devapi.buzaao.com/index.php/api/organization/order_milestone_update', payload,{
      headers: {
        'Authorization': 'Bearer '+token
      }})      
        .then(response => {
          alert("Milestone Updated Successfully!!")
        }).catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
    },
    async DeleteOrderMilestone ({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token');
      console.log(payload)
      for(var i=0;i< payload.data.length;i++){
       await axios.delete('https://devapi.buzaao.com/index.php/api/organization/order_milestone_delete?id='+payload.data[i], { headers: {
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
    async AllOrders ({ commit }) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token');
      var Allorder = null;
      await axios.get('https://devapi.buzaao.com/index.php/api/organization/order',{
        headers: {
          'Authorization': 'Bearer '+token
        }})
        .then(response => {
          var allorderarray = []
          for(var i=0;i< response.data.success.order.length;i++){    
            allorderarray.push({label: response.data.success.order[i].name, value: response.data.success.order[i].id});
          }
          //localStorage.setItem('Allorder', JSON.stringify(allorderarray))
          Allorder = JSON.stringify(allorderarray)
        })
        .catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
        return Allorder      
    },
    // End Milestones //
    // Order Articles // 
    async CreateOrderArticle ({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token')
      await axios.post('https://devapi.buzaao.com/index.php/api/organization/order_articles_create', payload,{
      headers: {
        'Authorization': 'Bearer '+token
      }})      
        .then(response => {
          alert("Order Article Created Successfully!!")
        }).catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
    },
    async GetAllOrderArticle ({ commit }) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token');
      var GetArticle = null
      await axios.get('https://devapi.buzaao.com/index.php/api/organization/order_articles',{
      headers: {
        'Authorization': 'Bearer '+token
      }})
      .then(response => {
        //localStorage.removeItem('GetArticle')
        //localStorage.setItem('GetArticle', JSON.stringify(response.data))
        GetArticle = JSON.stringify(response.data)
        })
        .catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })      
        return GetArticle 
    },
    async UpdateOrderArticle ({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token')
      await axios.post('https://devapi.buzaao.com/index.php/api/organization/order_articles_update', payload,{
      headers: {
        'Authorization': 'Bearer '+token
      }})      
        .then(response => {
          alert("Order Article Updated Successfully!!")
        }).catch(error => {
          this.errorMessage = error.message
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
    },
    async DeleteOrderArticle ({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      const token = localStorage.getItem('token');
      console.log(payload)
      for(var i=0;i< payload.data.length;i++){
        await axios.delete('https://devapi.buzaao.com/index.php/api/organization/order_articles_delete?id='+payload.data[i], { headers: {
            'Authorization': 'Bearer '+token
          }})
            .then(response => {
              alert("Order Article Deleted Successfully!!")
            }).catch(error => {
              this.errorMessage = error.message
              commit('setError', error.message)
          })   
      }
    },
    // End Articles //    
    // Signout //
    signOut ({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          localStorage.removeItem('user')
          commit('setLogout')
        }, _error => {})
    }
    // End //
  }  
}