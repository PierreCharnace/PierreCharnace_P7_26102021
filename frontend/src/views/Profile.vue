<template>
<div class="container-fluid text-center register">
 <p>Page de profile</p> 
 <img :src="user.profilePictures" alt="image de profile" class="picture">
 <p>{{ user.lastName }}</p>
 <p> {{ user.firstName }} </p>
 <p> {{ user.email }} </p>


</div>
</template>


<script>
import { mapState } from 'vuex'

export default {
    name: 'Profile',
    mounted:function () {
        if (this.$store.state.user.token == '') {
            this.$router.push('/login');
            return ;
        } 
            this.$store.dispatch('getUserInfos');
    },

     computed:{
    ...mapState({
        user: 'userInfos'
    })
  },
}
</script>

<style scoped>
.picture {
    width: 100px;
    height: 100px;
}
</style>