<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="modal">
      <slot>default content (if no slot passed in)</slot>
      <div class="actions">
        <slot name="links">default content</slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeModal() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
  .modal {
    width: 400px;
    padding: 20px;
    margin: 200px auto;
    background: white;
    border-radius: 10px;
  }
  .backdrop {
    top: 0;
    position: fixed;
    background: rgba(0,0,0,0.5);
    width: 100%;
    height: 100%;
  }
  h1 {
    color: #03cfb4;
    border: none;
    padding: 0;
  }
  p {
    font-style: normal;
  }
  .actions {
    display: flex;
    justify-content: space-around;
    text-align: center;
    margin-top: 30px;
  }
</style>