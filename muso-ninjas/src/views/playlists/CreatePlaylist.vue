<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <h4>Create a New Playlist</h4>
      <input type="text" required placeholder="Playlist title" v-model="title">
      <textarea required placeholder="Playlist description..." v-model="description"></textarea>
      <!-- upload playlist image -->
      <label>Upload Playlist Cover Image</label>
      <input type="file" @change="handleChange">
      <div class="error">{{ fileError }}</div>

      <button>Create</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const title = ref('')
    const description = ref('')
    const file = ref(null)
    const fileError = ref(null)

    const handleSubmit = () => {
      if (file.value) {
        console.log(title.value, description.value, file.value)
      }
    }

    // allowed file types
    const types = ['image/png', 'image/jpeg']

    const handleChange = (e) => {
      let selected = e.target.files[0]
      console.log(selected)

      if (selected && types.includes(selected.type)) {
        file.value = selected
        fileError.value = null
      } else {
        file.value = null
        fileError.value = 'Please select an image file (png or jpg)'
      }
    }
    
    return { title, description, handleSubmit, fileError, handleChange }
  }
}
</script>

<style>
  form {
    background: white;
  }
  input[type="file"] {
    border: 0;
    padding: 0;
  }
  label {
    font-size: 12px;
    display: block;
    margin-top: 30px;
  }
  button {
    margin-top: 20px;
  }
</style>