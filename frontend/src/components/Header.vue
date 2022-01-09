<template>
    <nav  id="nav" class="container-fluid navbar">    
        <router-link to="/" class="col-12 col-md-5 col-sm-8"><img src="@/assets/img-header-grey.png" alt="logo groupomania" class="col-10">  </router-link>
        <div class="col-12 col-sm-4 align-self-center">
          <div class="container" v-if="status == 'logUser'">
            <router-link to="/wall" class="row justify-content-center">Mur de publication</router-link>
            <router-link to="/profile" class="row justify-content-center"  v->Mon profile</router-link>
            <div class="deconnexion row justify-content-center">Déconnexion</div>
          </div>           
          <div class="container " v-else> 
            <router-link  to="/register" >S'enregistrer</router-link> |
            <router-link  to="/login" >S'identifier</router-link>
          </div>
 
        </div>
    </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Header',
  props: {
    
  },
  
  computed:{
    ...mapState(["status"])
  },
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
.deconnexion {
  font-weight: bold;
  text-decoration: underline;
}


</style>
