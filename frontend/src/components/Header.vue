<template>
    <nav id="header" class="container navbar navbar-light">
      <div id="nav" class="row justify-content-between">
        <router-link to="/" class="col-12 col-md-5 col-sm-8 "><img src="@/assets/img-header.png" alt="logo groupomania" class="col-12">  </router-link>
        <div class="col-12 col col-sm-4 py-4 py-lg-5 py-md-4 py-5"> 
            <router-link to="/register">S'enregistrer</router-link> |
            <router-link to="/login">S'identifier</router-link>
        </div>
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
