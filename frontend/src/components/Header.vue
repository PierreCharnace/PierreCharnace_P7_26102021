<template>
    <nav  id="nav" class="container-fluid navbar">    
        <router-link to="/" class="col-12 col-md-5 col-sm-8"><img src="@/assets/img-header-grey.png" alt="logo groupomania" class="col-10">  </router-link>
        <div class="col-12 col-sm-4 align-self-center">
          <div class="container" v-if="user.token == ''">
            <router-link  to="/register" >S'enregistrer</router-link> |
            <router-link  to="/login" >S'identifier</router-link>
          </div>           
          <div class="row " v-else> 
            <router-link to="/wall" class="col-12 justify-content-center">Mur de publication</router-link>
            <router-link to="/profile" class="col-12 justify-content-center">Mon profile</router-link>
            <button @click="logout" class="btn_disconnection col-2"><i class="fas fa-power-off"></i>
            </button>
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
    ...mapState(["user"]),
  },

  methods: {
    logout: function () {
      window.alert("Vous allez être déconnecté")
      this.$store.commit('logout');
      this.$router.push('/login')
      return ;
    }
  }
}
</script>

<style lang='scss'>
$colorgroup: rgb(186, 77, 85);

nav {
  position: fixed;
  top: 0;
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: $colorgroup;
    }
  }
}
.btn_disconnection {
  font-weight: bold;
  text-decoration: underline;
  color: $colorgroup;
  border-radius: 100px;
}


</style>
