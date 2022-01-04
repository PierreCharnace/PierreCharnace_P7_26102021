<template>
    <nav  id="nav" class="container-fluid navbar">    
        <router-link to="/" class="col-12 col-md-5 col-sm-8"><img src="@/assets/img-header-grey.png" alt="logo groupomania" class="col-10">  </router-link>
        <div class="col-12 col-sm-4 align-self-center"> 
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

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: rgb(209, 81, 90);
    }
  }
}


</style>
