<template>
  <div class="home">
    <h1>Home</h1>
    <!-- <PostList :posts="posts" /> -->
  </div>
</template>

<script>
import { ref } from 'vue'

// component imports
import PostList from '../components/PostList.vue'

export default {
  name: 'Home',
  components: { PostList },
  setup() { 
    const posts = ref([])
    const error = ref(null)

    const load = async () => {
      try {
        let data = await fetch('http://localhost:3000/posts')
        if(!data.ok) {
          throw Error('no available data')
        }
        posts.value = await data.json()
        console.log(posts.value)
      }
      catch(err) {
        error.value = err.message
        console.log(error.value)
      }
    }

    load()
    
    return { posts, error }
  },
}
</script>
