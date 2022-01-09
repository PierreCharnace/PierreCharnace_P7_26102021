<template>
<div class="container-fluid text-center register">
 <p>Page de profile</p> 
 <div>youhou</div>
</div>
</template>


<script>
export default {
    name: 'Profile',
    mounted:function () {
        console.log(this.$store.state.User);
        if (this.$store.state.User.userId == -1) {
            this.$router.push('/');
            return ;
        }
        this.$store.dispatch('getUserInfos');
    }
}
</script>
