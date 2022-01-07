<template>
<div class="container-fluid text-center register">
  
    <form class="container-fluid pt-5">
      <h1 class="">Page d'enregistrement</h1>
      <p>Vous avez déjà un compte? <router-link class="createaccount" to="/login" >Connectez-vous</router-link></p>
      <div class="row mt-1">
        <input pattern="[a-zA-Z.]{2,30}" title="Le nom doit être compris entre 2 et 30 caractères" v-model="lastName" type="text" id="lastname" required class="col-5 " placeholder="Nom">
      </div>
      <div class="row mt-1">
        <input pattern="[a-zA-Z.]{2,20}" title="Le nom doit être compris entre 2 et 20 caractères" v-model="firstName" id="firstname" required type="text" class="col-5" placeholder="Prénom">
      </div>
      <div class="row mt-1">
        <input pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}" v-model="email" id="email" required type="email" class="col-5" placeholder="Adresse mail">
      </div>
      <div class="row mt-1">
        <input pattern="[a-z0-9]{4,8}" title="Le mot de passe doit être compris entre 4 et 8 caractères minuscules et contenir au moins 1 chiffre" v-model="password" required="veuillez" id="password" type="password" class="col-5" placeholder="mot de passe">
      </div>
      <button @click="createAccount()" class="buttonform mt-2 mb-2" >
       <span v-if="validateFields == false"> Veuillez remplir les champs</span>
       <span v-else >Créer mon compte</span> </button>
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
    }
  },

  methods: {
    createAccount: function () {
      const self = this;
      this.$store.dispatch('createAccount', {
        email:      this.email,
        lastName:   this.lastName,
        firstName:  this.firstName,
        password:   this.password
      }).then(function () {
        self.$router.push('/login');
      }).catch(function (error) {
        console.log(error, "you");
      })
    },
  }
}
</script>

<style >
  .buttonform {
    background: grey;

    border: solid 1px black!important;
  }
  .buttonform:focus {
    background: lightgrey;
  }

</style>
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
  