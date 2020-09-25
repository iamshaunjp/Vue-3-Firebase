<template>
  <h1>Jobs</h1>
  <div v-for="job in jobs" :key="job.id">
    <h2>{{ job.title }}</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jobs: [
        { title: 'Ninja UX Designer', id: 1, details: 'lorem' },
        { title: 'Ninja Web Developer', id: 2, details: 'lorem' },
        { title: 'Ninja Vue Developer', id: 3, details: 'lorem' },
      ],
    }
  }
}
</script>

<style>

</style>