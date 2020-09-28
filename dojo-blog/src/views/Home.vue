<template>
  <div class="home">
    <h1>Home</h1>
    <p>My name is {{ name }} and my age is {{ age }}</p>
    <button @click="handleClick">click me</button>
  </div>
</template>

<script>

export default {
  name: 'Home',
  setup() {
    console.log('setup')

    let name = 'mario'
    let age = 30

    const handleClick = (e) => {
      console.log('you clicked me')
    }

    return { name, age, handleClick }
  },
  mounted() {
    console.log('mounted')
  }
}
</script>
