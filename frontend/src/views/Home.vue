<template>
  <div class="home">
  <h1 class=" hhome display-1 py-5">Bienvenue sur le réseau social d'entreprise de Groupomania</h1>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',
   mounted:function () {

        if (this.$store.state.user.token == '') {
            this.$router.push('/login').catch(()=>{});
            return ;
        } 
            this.$store.dispatch('getUserInfos');

        if (localStorage.emailLocal) {
            this.emailLocal = JSON.parse(localStorage.getItem('emailLocal'));
        }
            
    },

    computed:{
    ...mapState({
        user: 'userInfos'
    })
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