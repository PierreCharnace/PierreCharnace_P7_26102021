<template>
    <nav  id="nav" class="container-fluid navbar">    
        <router-link to="/" class="col-12 col-md-5 col-sm-8"><img src="@/assets/img-header-grey.png" alt="logo groupomania" class="col-10">  </router-link>
        <div class="col-12 col-sm-4 align-self-center">
          <div class="container " v-if="user.token==''">
            <router-link  to="/register" >S'enregistrer</router-link> |
            <router-link  to="/login" >S'identifier</router-link>
          </div>           
          <div class="row" v-else> 
            <div class="">
                <router-link to="/wall" class="col-12 justify-content-center">Mur de publication</router-link>
            </div>
            <div class="">
              <router-link to="/profile" class="col-12 justify-content-center">Mon profil</router-link>
            </div>
              
            <div class="mt-3 btn_container">
              <p>connecté en tant que {{ userInfos.firstName }} </p>
              <i class=" btn_disconnection fas fa-power-off" @click="logout"></i>
            </div>
           
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
    ...mapState(["user", "userInfos"]),
  },

  methods: {
    logout: function () {
      if (confirm("Vous allez être déconnecté")) {
        this.$store.commit('logout');
        this.$router.push("/login");
        return ;
      }
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

.btn_container {
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;

}

.btn_disconnection {
  display: flex;
  cursor: pointer;
  padding-left: 10px;

}


</style>
