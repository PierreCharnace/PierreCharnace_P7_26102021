<template>
  <div class="container-fluid text-center login">
     <form class="container-fluid align-self-item pt-5">
      <h1 class="">Connexion</h1>
      <p>Vous n'avez pas encore de compte? <router-link class="createaccount" to="/register" >Créer un compte</router-link></p>
     <div class="row mt-1">
        <input pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}" v-model="email" id="email" required type="email" class="col-5" placeholder="Adresse mail">
      </div>
      <div class="row mt-1">
        <input pattern="[a-z0-9.]{4,8}" title="Le mot de passe doit être compris entre 4 et 8 caractères et contenir au moins 1 chiffre" v-model="password" required id="password" type="password" class="col-5" placeholder="mot de passe">
      </div>
      <div  class="row mt-1" v-if="status == 'error_login'"> Adresse mail et/ou mot de passe invalide</div>
      <button @click="login()" class="buttonform mt-2 mb-2" >
        <span > Connexion</span>
      </button>
      
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Login',
  data: function () {
    return {
    email: '',
    password: ''
    }
  },

  computed:{
    ...mapState(["status"])
  },
 
  methods: { 
    login: function () {
      const self = this;
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password      
      }).then( function () {
        self.$router.push('/wall')
      }), (function (error) {
        console.log(error);
      })
    }
  }
}
</script>

<style scoped>

input {
  min-width: 300px;
  max-width: 500px;
}

form div {
  display: flex;
  justify-content: center;
}
</style>

