<template>
  <div class="post-list">
    <div v-for="post in posts" :key="post.id">
      <!-- <h3>{{ post.title }}</h3> -->
      <SinglePost :post="post" />
    </div>
  </div>
</template>

<script>
// component imports
import SinglePost from './SinglePost.vue'

export default {
  props: ['posts'],
  components: { SinglePost },
  setup(props) {
    // console.log(props.posts)
    // no need to return the props value on the posts
  }
}
</script>

<style>

</style>