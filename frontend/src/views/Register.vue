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
      </div>
      <div class="row mt-1">
        <input required v-model="password" id="password" type="password" class="col-5" placeholder="mot de passe">
      </div>
      <button v-if="validateFields== false" class="buttonform mt-2 mb-2 button--disabled" disabled>Veuillez remplir les champs</button>
      <button v-else @click="createAccount()" class="buttonform mt-2 mb-2" type="button" >Créer mon compte</button>
    </form>
</div>
</template>


<script>

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
  .buttonform {
    background: grey;
    border: solid 1px black!important;
    border-radius: 8px;
  }
  .buttonform:focus {
    background: rgb(255, 215, 215);
    border-radius: 8px;
  }
  .disabled-button {
    cursor: not-allowed;
    
  }

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
</style>
  