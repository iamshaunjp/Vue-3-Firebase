<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="email" placeholder="Email" v-model="email">
    <input type="password" placeholder="Password" v-model="password">
    <div v-if="error" class="error">{{ error }}</div>
    <button>Log in</button>
  </form>
</template>

<script>
// using @ means start at the project src root
import useLogin from '@/composables/useLogin'
import { ref } from 'vue'

export default {
  setup() {
    const { error, login } = useLogin()

    const email = ref('')
    const password = ref('')

    const handleSubmit = async () => {
      const res = await login(email.value, password.value)
      if (!error.value) {
        console.log('user logged in')
      }
    }

    return { email, password, handleSubmit, error }
  }
}
</script>