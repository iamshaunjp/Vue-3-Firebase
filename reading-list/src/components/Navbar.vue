<template>
  <div>
    <nav>
      <h1>My Book List</h1>

      <!-- for logged in users -->
      <div>
        <router-link to="/">Home</router-link>
        <button>Logout</button>
      </div>
      
      <!-- for logged out users -->
      <div>
        <router-link to="/login">Login</router-link>
        <router-link to="/signup">Signup</router-link>
      </div>
    </nav>
  </div>
</template>

<script>
export default {

}
</script>

<style>
nav {
  display: flex;
  align-items: center;
}
nav h1 {
  margin-right: auto;
  margin-bottom: 0;
}
nav a {
  margin-left: 16px;
  color: #2c3e50;
}
nav button {
  margin-left: 16px;
}
nav a.router-link-exact-active {
  color: #0ec58e;
}
nav + p {
  margin-top: 0;
  margin-bottom: 30px;
}
</style>