<template>
  <div class="home">
  <h1 class=" hhome display-1 py-5">Bienvenue sur le réseau social d'entreprise de Groupomania</h1>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Home',
  

  mounted: function () {
    if (this.$store.user.userId == -1) {
        this.$store.commit('logout');
        this.$router.push('/')
        return ;
      }
  },

   computed:{
    ...mapState(["user"]),
  },


}

</script>

<style lang='scss'>

.hhome {
  margin-bottom: 0;
}

@media ( min-width: 1440px) {
  .home {
    height: 1500px;
  }  
}


</style>