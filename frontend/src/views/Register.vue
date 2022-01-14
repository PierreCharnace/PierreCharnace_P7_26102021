<template>
<div class="container-fluid text-center register">
  
    <form class="container-fluid pt-5">
      <h1 class="">Page d'enregistrement</h1>
      <p>Vous avez déjà un compte? <router-link class="createaccount" to="/login" >Connectez-vous</router-link></p>
      <div class="row mt-1">
        <label for="lastName"></label>
        <input name="lastName" v-model="lastName" type="text" id="lastname" required class="col-5 " placeholder="Nom">
        <small><p id="lastnamep"></p></small>
      </div>
      <div class="row mt-1">
        <label for="firstName"></label>
        <input name="firstName" v-model="firstName" id="firstname" required type="text" class="col-5" placeholder="Prénom">      </div>
        <small><p id="firstnamep"></p></small>
      <div class="row mt-1">
        <label for="email"></label>
        <input name="email" v-model="email" id="email" required type="email" class="col-5" placeholder="Adresse mail">
        <small><p id="emailp"></p></small>
      </div>
      <div class="row mt-1">
        <label for="password"></label>
        <input name="password" required v-model="password" id="password" type="password" class="col-5" placeholder="mot de passe">
        <small><p id="mdp"></p></small>
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
    regLast : '',
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
 
        

      },
      
    
    createAccount: function () {
      const self = this;
        let regexEmail = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(this.email);
        let regexPassword = RegExp(/^(?=.*\d).{4,8}$/).test(this.password);
        let regexLastName = RegExp(/(.*[a-zA-Z-]){2,30}/).test(this.lastName);
        let regexFirstName = RegExp(/(.*[a-zA-Z-]){2,30}/).test(this.firstName);
       
        if (regexLastName == true) {
          return true;
        } else {
          lastnamep.innerHTML ='Nom non comformes il doit être compris entre 2 et 30 caractères';
        }
         if (regexFirstName == true) {
          return true;
        } else {
          firstnamep.innerHTML ='Prénom non comformes il doit être compris entre 2 et 30 caractères';
        }
         if (regexEmail == true) {
          return true;
        } else {
          emailp.innerHTML='email non valide';
        }
         if (regexPassword == true) {
          return true;
        } else {
          mdp.innerHTML='mot de passe non valide il doit être compris entre 4 et 8 caractères et contenir au moins 1 chiffre';
        }
      this.$store.dispatch('createAccount', {
        email:      this.email,
        lastName:   this.lastName,
        firstName:  this.firstName,
        password:   this.password,

      }).then(function () {
          self.$router.push('/login');
          window.alert("ENREGISTREMENT RÉUSSI,Vous allez être redirigé vers la page de connexion")
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
  