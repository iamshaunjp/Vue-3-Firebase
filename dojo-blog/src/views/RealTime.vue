<template>
  <h1>Real-time Listeners</h1>
  <div v-for="post in posts" :key="post.id">
    <div>{{ post.title }}</div>
  </div>
</template>

<script>
import { projectFirestore } from '../firebase/config'
import { ref } from 'vue'

export default {
  setup() {
    const posts = ref([])

    projectFirestore.collection('posts')
      .orderBy('createdAt', 'desc')  
      .onSnapshot(snap => {
        console.log('snapshot: ', snap)
        let docs = snap.docs.map(doc => {
          return { ...doc.data(), id: doc.id }
        })
        console.log('documents: ', docs)
        posts.value = docs
      })

    return { posts }
  }
}
</script>

<style>

</style>