<template>
<div class="container-fluid text-center register">
  
    <form class="container align-self-item">
      <h1 class="">Page d'enregistrement</h1>
      <div class="row mt-1">
        <label class="col-3" for="lastname">Nom</label>
        <input type="text" id="lastname" class="col-5 ">
      </div>
      <div class="row mt-1">
        <label class="col-3" for="firstname">Prénom</label>
        <input id="firstname" type="text" class="col-5">
      </div>
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
  name: 'Register',
  components: {

  }
}
</script>

<style scoped>
  .buttonform {

    border: solid 1px black!important;
  }
</style>
  
</style>