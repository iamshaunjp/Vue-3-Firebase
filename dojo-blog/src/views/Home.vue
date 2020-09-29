<template>
  <div class="home">
    <h1>Home</h1>
    <p>My name is {{ name }} and my age is {{ age }}</p>
    <button @click="handleClick">click me</button>
    <button @click="age++">add 1 to age</button>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Home',
  setup() {
    const name = ref('mario')
    const age = ref(30)

    // const p = ref(null)

    const handleClick = (e) => {
      name.value = 'luigi'
      age.value = 35
    }

    return { name, age, handleClick }
  },
}
</script>
