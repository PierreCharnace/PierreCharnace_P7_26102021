<template>
<div class="container-fluid text-center register">
 <p>Page de profile</p> 
 <div>youhou</div>
</div>
</template>


<script>
import { mapState } from 'vuex'



export default {
    name: 'Profile',
    mounted:function () {
        console.log(this.$store.state.user);
        if (this.$store.state.user.userId == -1) {
            this.$router.push('/');
            return ;
        }
        this.$store.dispatch('getUserInfos');
    },

     computed:{
    ...mapState(["userInfos"])
  },
}
</script>
