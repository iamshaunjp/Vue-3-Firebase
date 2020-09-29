<template>
  <div class="home">
    <h1>Home</h1>
    <input type="text" v-model="search">
    <p>search term - {{ search }}</p>
    <div v-for="name in matchingNames" :key="name">{{ name }}</div>
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue'

export default {
  name: 'Home',
  setup() {    
    const search = ref('')
    const names = ref(['mario', 'yoshi', 'luigi', 'toad', 'bowser', 'koopa', 'peach'])

    const matchingNames = computed(() => {
      // return ['a', 'b', 'c']
      return names.value.filter(name => name.includes(search.value))
    })

    return { names, search, matchingNames }
  },
}
</script>
