<template>
  <form @submit.prevent="handleSubmit">
    <label>Title</label>
    <input type="text" v-model="title" required>
    <label>Details</label>
    <textarea v-model="details" required></textarea>
    <button>Update Project</button>
  </form>
</template>

<script>
// update the project and save the new data to db.json
//   - create a submit handler and prevent default action
//   - use the fetch api to send a PATCH request to update
//   - redirect to the homepage route once done 

export default {
  props: ['id'],
  data() {
    return {
      uri: 'http://localhost:3000/projects/' + this.id,
      title: '',
      details: '',
    }
  },
  mounted() {
    fetch(this.uri)
      .then(res => res.json())
      .then(data => {
        this.title = data.title
        this.details = data.details
      }).catch(err => console.log(err))
  },
  methods: {
    handleSubmit() {
      fetch(this.uri, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: this.title, details: this.details })
      }).then(() => {
        this.$router.push('/')
      }).catch(err => console.log(err))
    }
  }
}
</script>

<style>

</style>