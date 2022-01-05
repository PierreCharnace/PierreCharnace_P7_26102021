<template>
<div class="container-fluid text-center register">
  
    <form class="container-fluid">
      <h1 class="">Page d'enregistrement</h1>
      <p>Vous avez déjà un compte? <router-link class="createaccount" to="/login" >Connectez-vous</router-link></p>
      <div class="row mt-1">
        <input v-model="lastName" type="text" id="lastname" class="col-5 " placeholder="Nom">
      </div>
      <div class="row mt-1">
        <input v-model="firstName" id="firstname" type="text" class="col-5" placeholder="Prénom">
      </div>
      <div class="row mt-1">
        <input v-model="email" id="email" type="email" class="col-5" placeholder="Adresse mail">
      </div>
      <div class="row mt-1">
        <input v-model="password" id="password" type="password" class="col-5" placeholder="mot de passe">
      </div>
      <b-button @click="createAccount()" class="row buttonform mt-2 mb-2" >Créer mon compte</b-button>
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
  methods: {
    createAccount: function () {
      this.$store.dispatch('createAccount', {
        email:      this.email,
        lastName:   this.lastName,
        firstName:  this.firstName,
        password:   this.password
      })
    },
  }
}
</script>

<style >
  .buttonform {
    border: solid 1px black!important;
  }
</style>
<style scoped>

form div {
  display: flex;
  justify-content: center;
}
</style>
  