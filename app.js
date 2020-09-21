const app = Vue.createApp({
  // data, functions etc
  // template: '<h2>I am the template</h2>',
  data() {
    return {
      title: 'Name of the Wind',
      author: 'Brandon Sanderson',
      age: [1,2,3]
    }
  }
})

app.mount('#app')