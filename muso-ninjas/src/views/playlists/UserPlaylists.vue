<template>
  <div class="user-playlists">
    <h2>My Playlists</h2>
  </div>
</template>

<script>
import getUser from '@/composables/getUser'
import getCollection from '@/composables/getCollection'

export default {
  setup() {
    const { user } = getUser()
    const { documents: playlists } = getCollection(
      'playlists', 
      ['userId', '==', user.value.uid]
    )

    return { playlists }
  }
}
</script>

<style scoped>
  h2 {
    padding-bottom: 10px;
    margin-bottom: 30px;
    border-bottom: 1px solid var(--secondary)
  }
  .btn {
    margin-top: 20px;
  }
</style>