<template>
  <div class="container-fluid text-center login">
     <form class="container-fluid align-self-item">
      <h1 class="">Connexion</h1>
      <p>Vous n'avez pas encore de compte? <router-link class="createaccount" to="/register" >Créer un compte</router-link></p>
     <div class="row mt-1">
        <input v-model="email" id="email" required type="email" class="col-5" placeholder="Adresse mail">
      </div>
      <div class="row mt-1">
        <input v-model="password" required id="password" type="password" class="col-5" placeholder="mode de passe">
      </div>
      <div class="row mt-1" v-if="status == 'error_login'"> Adresse mail et/ou mot de passe invalide</div>
      <button @click="login()" class="buttonform mt-2 mb-2" >
        <span v-if="status == 'loading'">Connexion en cours...</span>
        <span v-else> Connexion</span>
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

form div {
  display: flex;
  justify-content: center;
}
</style>

