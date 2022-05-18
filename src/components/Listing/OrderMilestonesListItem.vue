<template>
    <b-card @click.prevent="toggleItem($event,data.id)" :class="{'d-flex flex-row':true,'active' : selectedItems.includes(data.id)}" no-body>
        <div class="pl-2 d-flex flex-grow-1 min-width-zero">
            <div class="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                <p class="list-item-heading mb-1 truncate">{{data.name }}</p>       
                <p class="list-item-heading mb-1 truncate">{{data.order_name}}</p>
                <!-- //SerVice Id -->
                <p class="list-item-heading mb-1 truncate">{{ data.services_name }}</p>
                <!-- //Payment Method -->
                <p class="list-item-heading mb-1 truncate" v-if="data.is_payment == '1'">Yes</p>
                <p class="list-item-heading mb-1 truncate" v-else>No</p>
                <!-- // Approved -->
                <p class="list-item-heading mb-1 truncate" v-if="data.is_approvable == '1'">Yes</p>
                <p class="list-item-heading mb-1 truncate" v-else>No</p>
                <!-- //Approved-By-Client -->
                <p class="list-item-heading mb-1 truncate" v-if="data.approved_by_client == '1'">Yes</p>
                <p class="list-item-heading mb-1 truncate">No</p>
                <p class="list-item-heading mb-1 truncate">{{data.created_at }}</p>                
                <div class="w-15 w-sm-100">
                  <b-badge pill>{{ data.supervisor_name }}</b-badge>
                </div>
            </div>
            <div class="custom-control custom-checkbox pl-1 align-self-center pr-4">
                <b-form-checkbox :checked="selectedItems.includes(data.id)" class="itemCheck mb-0"/>
            </div>
        </div>
    </b-card>
</template>
<script>
export default {
  props: ['data', 'selectedItems'],
  methods: {
    toggleItem (event, itemId) {
      this.$emit('toggle-item', event, itemId)
    }
  }
}
</script>
