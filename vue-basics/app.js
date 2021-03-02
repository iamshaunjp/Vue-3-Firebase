const app = Vue.createApp({
  // data, functions
  data() {
    return {
      title: "タイトル",
      author: "著者名",
      age: 32,
      showBooks: true,
    };
  },
  methods: {
    // 単純なクリックイベントの関数
    changeTitle(title) {
      this.title = title
    },
    // トグルしたい場合、リバースするために!をつける
    toggleShowBooks() {
      this.showBooks = !this.showBooks
    }
  }
});

// mountで指定した範囲内でしかvueは動かない
app.mount("#app");
