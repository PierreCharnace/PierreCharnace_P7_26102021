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
  },

  methods: {
      regexRegister: function () {
 
        

      },
      
    
    createAccount: function () {
      const self = this;
        let regexEmail = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(this.email);
        let regexPassword = RegExp(/(.*[a-zA-Z0-9]).{4,8}$/).test(this.password);
        let mdpLength = this.password;
        let lastName = this.lastName;
        let firstName = this.firstName;

        function testLastName() {
          if ( `${lastName.length}`>=30 || `${lastName.length}`<=1 ) {
            lastnamep.innerHTML ='Nom non comformes il doit être compris entre 2 et 30 caractères';
          } else {
            lastnamep.innerHTML = '';
          };
        }testLastName()

        function testFirstName() {
          if ( `${firstName.length}`>=30 || `${firstName.length}`<=1) {
           firstnamep.innerHTML ='Prénom non comformes il doit être compris entre 2 et 30 caractères';
          } else {
             firstnamep.innerHTML = '';
          };
        }testFirstName()
        
        function testEmail() {
          if ( regexEmail == true) {
            emailp.innerHTML = '';
          } else {
            emailp.innerHTML ='email non valide';
          };
        }testEmail()

        function testMdp() {
          if ( (regexPassword == false )|| (`${mdpLength.length}`>8 || `${mdpLength.length}`<=3)) {
            mdp.innerHTML ='mot de passe non valide il doit être compris entre 4 et 8 caractères et contenir au moins 1 chiffre';
          } else {
            mdp.innerHTML = '';
          };
        }testMdp()
          
          this.$store.dispatch('createAccount', {
            email:      this.email,
            lastName:   this.lastName,
            firstName:  this.firstName,
            password:   this.password,

          }).then(function () {
            self.$router.push('/login');
            window.alert("ENREGISTREMENT RÉUSSI,Vous allez être redirigé vers la page de connexion")
          }).catch(function (error) {      
            if (error == `Error: Request failed with status code 409`) {
                      emailp.innerHTML = 'Adresse mail déjà utilisée';

             } else {
            emailp.innerHTML = ''
            }
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
  