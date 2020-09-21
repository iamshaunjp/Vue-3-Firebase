const app = Vue.createApp({
  data() {
    return {
      showBooks: true,
      title: 'The Way of Kings',
      author: 'Brandon Sanderson',
      age: 45,
      x: 0,
      y: 0,
    }
  },
  methods: {
    toggleShowBooks() {
      this.showBooks =  !this.showBooks
    },
    handleEvent(e, data) {
      console.log(e)
      console.log(data)
    },
    handleMousemove(e) {
      this.x = e.offsetX
      this.y = e.offsetY
    }
  }
})

app.mount('#app')