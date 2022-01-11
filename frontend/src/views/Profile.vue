<template>
<div class="container-fluid text-center register">
 <p>Page de profile</p> 
 <img :src="user.profilePicture" alt="image de profile">
 <i class="fas fa-user-circle"></i>
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
        if (this.$store.state.user.userId == -1) {
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
