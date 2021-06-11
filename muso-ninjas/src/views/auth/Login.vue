<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="email" placeholder="Email" v-model="email">
    <input type="password" placeholder="Password" v-model="password">
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPending">Log in</button>
    <button v-if="isPending" disabled>Loading</button>
  </form>
</template>

<script>
// using @ means start at the project src root
import useLogin from '@/composables/useLogin'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const { error, login, isPending } = useLogin()
    const router = useRouter()

    const email = ref('')
    const password = ref('')

    const handleSubmit = async () => {
      const res = await login(email.value, password.value)
      if (!error.value) {
        router.push({ name: 'UserPlaylists' })
      }
    }

    return { email, password, handleSubmit, error, isPending }
  }
}
</script>