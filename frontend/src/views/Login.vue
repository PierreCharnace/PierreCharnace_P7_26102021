<template>
  <div class="container-fluid text-center login">
     <form class="container-fluid align-self-item pt-5">
      <h1 class="">Connexion</h1>
      <p>Vous n'avez pas encore de compte? <router-link class="createaccount" to="/register" >Créer un compte</router-link></p>
     <div class="row mt-1">
        <input v-model="email" id="email" required type="email" class="col-5" placeholder="Adresse mail">
      </div>
      <div class="row mt-1">
        <input v-model="password" required id="password" type="password" class="col-5" placeholder="mot de passe">
      </div>
      <span  class=" mt-1" v-if="status == 'error_login'"> Adresse mail et/ou mot de passe invalide</span>
      <div>
      <button @click="login()" class=" buttonform mt-2 mb-2 " type="button">
        Connexion
      </button>
      </div>
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
      console.log("----------->");
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password,      
      }).then( function (response) {
        console.log(response);
        window.alert("CONNEXION RÉUSSI");
        self.$router.push('/wall');
      }), (function (error) {
        console.log(error,"youhou");
      })
    },
  },
}
</script>

<style scoped>

input {
  min-width: 300px;
  max-width: 500px;
  border-radius: 8px;
}

form div {
  display: flex;
  justify-content: center;
}


</style>

