<template>
<b-card class="d-flex flex-row mb-3" no-body>
    <div class="d-flex flex-grow-1 min-width-zero">
        <b-card-body class="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
            <router-link tag="a" :to="detailPath" class="list-item-heading mb-1 truncate w-40 w-xs-100">{{data.name}}</router-link>
            <p class="mb-1 text-muted text-small w-15 w-xs-100">{{data.id}}</p>
            <p class="mb-1 text-muted text-small w-15 w-xs-100">{{data.assigned_to}}</p>
            <!-- Service Id -->
            <p class="mb-1 text-muted text-small w-15 w-xs-100" v-if="data.is_approvable == '1'">Yes</p>
            <p class="mb-1 text-muted text-small w-15 w-xs-100" v-else>No</p>
            <!-- Approved by Client -->
            <p class="mb-1 text-muted text-small w-15 w-xs-100" v-if="data.approved_by_client == '1'">Yes</p>
            <p class="mb-1 text-muted text-small w-15 w-xs-100" v-else>No</p>
            <p class="mb-1 text-muted text-small w-15 w-xs-100">{{data.created_at}}</p>
            <div class="w-15 w-xs-100 text-right">
                <b-badge pill :variant="data.statusColor" v-if="data.is_payment_bound == '1'">Yes</b-badge>
                <b-badge pill :variant="data.statusColor" v-else>No</b-badge>
            </div>
        </b-card-body>
    </div>
</b-card>
</template>
<script>
export default {
  props: ['data', 'detailPath']
}
</script>
