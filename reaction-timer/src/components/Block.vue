<template>
  <div class="block" v-show="showBlock">
    click me
  </div>
</template>

<script>
export default {
  props: ['delay'],
  data() {
    return {
      showBlock: false,
    }
  },
  mounted() {
    console.log('component mounted')
    setTimeout(() => {
      this.showBlock = true
      console.log(this.delay)
    }, this.delay)
  },
  updated() {
    console.log('component updated')
  },
  unmounted() {
    console.log('component unmounted')
  }
}
</script>

<style>
  .block {
    width: 400px;
    border-radius: 20px;
    background:  #0faf87;;
    color: white;
    text-align: center;
    padding: 100px 0;
    margin: 40px auto;
  }
</style>