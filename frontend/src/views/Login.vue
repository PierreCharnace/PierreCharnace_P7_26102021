<template>
  <div >
     <form class="container align-self-item">
      <h1 class="">Page de connexion</h1>
      <div class="row mt-1">
        <label class="col-3" for="email">Email</label>
        <input id="email" type="email" class="col-5">
      </div>
      <div class="row mt-1">
        <label class="col-3" for="password">Mot de passe</label>
        <input id="password" type="password" class="col-5">
      </div>
      <b-button class="row buttonform mt-2 mb-2" > Créer mon compte</b-button>
    </form>
  </div>
</template>

<script>

export default {
  name: 'Login',
  components: {

  }
}
</script>