<template>
  <div v-for="playlist in playlists" :key="playlist.id">
    <router-link :to="{ name: 'PlaylistDetails', params: { id: playlist.id }}">
      <div class="single">
        <div class="thumbnail">
          <img :src="playlist.coverUrl">
        </div>
        <div class="info">
          <h3>{{ playlist.title }}</h3>
          <p>created by {{ playlist.userName }}</p>
        </div>
        <div class="song-number">
          <p>{{ playlist.songs.length }} songs</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ['playlists'],
}
</script>

<style scoped>
  .single {
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
    background: white;
    margin: 16px 0;
    transition: all ease 0.2s;
  }
  .single:hover {
    box-shadow: 1px 2px 3px rgba(50,50,50,0.05);
    transform: scale(1.02);
    transition: all ease 0.2s;
  }
  .thumbnail {
    max-width: 100px;
    max-height: 100px;
    overflow: hidden;
    border-radius: 10px;
  }
  img {
    max-width: 150%;
    max-height: 150%;
    display: block;
  }
  .info {
    margin: 0 30px;
  }
  .song-number {
    margin-left: auto;
  }
  
</style>