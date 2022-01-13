<template>
<div class="container-fluid text-center register">
  
    <form class="container-fluid pt-5">
      <h1 class="">Page d'enregistrement</h1>
      <p>Vous avez déjà un compte? <router-link class="createaccount" to="/login" >Connectez-vous</router-link></p>
      <div class="row mt-1">
        <input v-model="lastName" type="text" id="lastname" required class="col-5 " placeholder="Nom">
        <span v-if="regLastName== false">Le nom doit être compris entre 2 et 30 caractères</span>
      </div>
      <div class="row mt-1">
        <input v-model="firstName" id="firstname" required type="text" class="col-5" placeholder="Prénom">
        <span v-if="`${firstName.length}`<=1 || `${firstName.length}`>=30">Le prénom doit être compris entre 2 et 30 caractères</span>
      </div>
      <div class="row mt-1">
        <input v-model="email" id="email" required type="email" class="col-5" placeholder="Adresse mail">
        <span v-if="status == ''">Adresse mail déjà utilisée</span>
      </div>
      <div class="row mt-1">
        <input title="Le mot de passe doit être compris entre 4 et 8 caractères minuscules et contenir au moins 1 chiffre" required v-model="password" id="password" type="password" class="col-5" placeholder="mot de passe">
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
    password: '',
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
    ...mapState(["status","regLastName"]),
     /*   regLastName: function () {
      let regexNames = RegExp(/(.*[a-zA-Z-]){2,30}/);
      if (regexNames.test(this.lastName)) {
        return true;
      } else {
        return false;
      }
    },*/
  },

  methods: {
    regexRegister: function () {
        let regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let regexPassword = /^(?=.*\d).{4,8}$/;
        let regexNames = /(.*[a-zA-Z-]){2,30}/;

        if (regexEmail.test(this.email) && regexPassword.test(this.password) && regexNames.test(this.lastNames) && regexNames.test(this.firstName == true)) {
          return true;
        }
    },
      
    
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
  