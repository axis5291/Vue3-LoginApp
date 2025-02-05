<template>
  <div class="app">
    <h1>{{ state.message }}</h1>
    <div v-if=state.login>
      <h1>Logged in</h1>

    </div>
  </div>

</template>


<script>
import { reactive } from 'vue'

export default {
  setup() {
    const state = reactive({
      message: 'Hello Vue 3!',
      login:false,
    })

    return { state }
    
  },
}
</script>