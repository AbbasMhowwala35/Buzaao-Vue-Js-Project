<template>
<b-card class="question d-flex mb-4 edit-quesiton" no-body>
    <div class="d-flex flex-grow-1 min-width-zero" >
        <div class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
            <div class="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
                <span class="heading-number d-inline-block">{{sort}}</span>{{data.name}}
            </div>
        </div>

        <div class="custom-control custom-checkbox pl-1 align-self-center pr-4">
            <b-button variant="outline-theme-3" class="icon-button rotate-icon-click rotate"
                @click="showDetail = !showDetail"
                :aria-controls="`stage${sort}`"
                :aria-expanded="showDetail ? 'true' : 'false'"
            >
                <i :class="{'with-rotate-icon':true,'simple-icon-arrow-down':!showDetail,'simple-icon-arrow-up':showDetail}"></i>
            </b-button>
        </div>
    </div>
    <b-collapse :id="`stage${sort}`" class="question-collapse" v-model="showDetail" >
        <div class="card-body pt-0">
             <div v-for="(order,index) in this.data.order_tasks" :key="index" >
                 <b-card class="d-flex flex-row mb-3" no-body>
                    <div class="d-flex flex-grow-1 min-width-zero">
                        <b-card-body class="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">                        
                            <p class="mb-1 text-muted text-small w-15 w-xs-100">{{order.order_id}}</p>
                            <p class="mb-1 text-muted text-small w-15 w-xs-100">{{order.title}}</p>
                            <p class="mb-1 text-muted text-small w-15 w-xs-100">{{order.assigned_to}}</p>
                            <p class="mb-1 text-muted text-small w-15 w-xs-100">{{order.due_date}}</p>
                        </b-card-body>
                    </div>
                </b-card>
             </div>
        </div>
    </b-collapse>
</b-card>

</template>
<script>
import draggable from 'vuedraggable'
import OrderStageItem from '@/components/Listing/OrderStageItem'

export default {
  props: ['data', 'sort'],
  components: {
    draggable,
    OrderStageItem,
  },
  data () {
    return {
      showDetail: false,
      title: '',
    }
  },
  watch: {
    showDetail (val) {
      if (!val) {
      }
    }
  }
}
</script>