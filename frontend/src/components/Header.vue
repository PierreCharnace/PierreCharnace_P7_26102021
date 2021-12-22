<template>
    <nav id="header">
      <div id="nav">
        <router-link to="/"><img src="" alt="logo groupomania">  </router-link> |
        <router-link to="/register">S'enregistrer</router-link> |
        <router-link to="/login">S'identifier</router-link>
      </div>
    </nav>
</template>

<script>
export default {
  name: 'Header',
  props: {
    
  }
}
</script>

<style lang='scss'>
nav {
  position: fixed;
  top: 0;
}
</style>
