<template>
    <div>
        <h1>/pages/nested-routes/users/_id.vue</h1>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  validate ({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  }
}
</script>