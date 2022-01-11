<template>
<div class="container-fluid text-center register">
  
    <form class="container-fluid pt-5">
      <h1 class="">Page d'enregistrement</h1>
      <p>Vous avez déjà un compte? <router-link class="createaccount" to="/login" >Connectez-vous</router-link></p>
      <div class="row mt-1">
        <input v-model="lastName" type="text" id="lastname" required class="col-5 " placeholder="Nom">
      </div>
      <div class="row mt-1">
        <input v-model="firstName" id="firstname" required type="text" class="col-5" placeholder="Prénom">
      </div>
      <div class="row mt-1">
        <input  v-model="email" id="email" required type="email" class="col-5" placeholder="Adresse mail">
        <span v-if="status == 'error_create'">Adresse mail déjà utilisée</span>
      </div>
      <div class="row mt-1">
        <input required v-model="password" id="password" type="password" class="col-5" placeholder="mot de passe">
        <p class="mdp">(Le mot de passe doit être compris entre 4 et 8 caractères et contenir au moins 1 chiffre)</p>
      </div>
      <button v-if="validateFields== false" class="buttonform mt-2 mb-2 button--disabled" disabled>Veuillez remplir les champs</button>
      <button v-else @click="createAccount()" class="buttonform mt-2 mb-2" type="button" >Créer mon compte</button>
    </form>
</div>
</template>


<script>
import { mapState } from 'vuex'

export default {
  name: 'Register',
  data: function () {
    return {
    lastName: '',
    firstName: '',
    email: '',
    password: ''
    }
  },
  computed : {
    validateFields: function () {
      if (this.lastName !="" && this.firstName !="" && this.email != "" && this.password != "") {
        return true;
      } else {
        return false;
      }
    },
    ...mapState(["status"])
  },

  methods: {
    createAccount: function () {
      const self = this;
      this.$store.dispatch('createAccount', {
        email:      this.email,
        lastName:   this.lastName,
        firstName:  this.firstName,
        password:   this.password,
      }).then(function () {
          window.alert("ENREGISTREMENT RÉUSSI,Vous allez être redirigé vers la page de connexion")
          self.$router.push('/login');
      }).catch(function (error) {
          console.log(error);
      })
    },
  }
}
</script>

<style >
 

</style>
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
.button--disabled:hover {
    cursor:not-allowed;
  }
.mdp {
  font-size: 0.8rem; 
}

</style>
  