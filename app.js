const app = Vue.createApp({
  // data, functions etc
  // template: '<h2>I am the template</h2>',
  data() {
    return {
      title: 'The Way of Kings',
      author: 'Brandon Sanderson',
      age: 45
    }
  }
})

app.mount('#app')