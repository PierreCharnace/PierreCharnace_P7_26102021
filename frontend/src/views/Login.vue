<template>
  <div class="container-fluid text-center login">
     <form class="container-fluid align-self-item">
      <h1 class="">Connexion</h1>
      <p>Vous n'avez pas encore de compte? <router-link class="createaccount" to="/register" >Créer un compte</router-link></p>
      <div class="row mt-1">
        <input v-model="email" id="email" type="email" class="col-5" placeholder="email">
      </div>
      <div class="row mt-1">
        <input v-model="password" id="password" type="password" class="col-5" placeholder="mode de passe">
      </div>
      <b-button class="row buttonform mt-2 mb-2" > Connexion</b-button>
    </form>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data: function () {
    return {
    email: '',
    password: ''
    }
  },
 
  methods: { 
 
  }
}
</script>

<style scoped>

form div {
  display: flex;
  justify-content: center;
}
</style>

