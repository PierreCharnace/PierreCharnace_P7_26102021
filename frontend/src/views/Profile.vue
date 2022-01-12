<template>
<div class="container-fluid text-center register">
    <div v-if="modify == 1" class="card" style="width: 18rem;">
        <h1>Page de profile</h1>
        <img :src="user.profilePictures" alt="image de profile" class="card-img-top">
        <div class="card-body">
            <input v-model="user.lastName" class="text-center m-1"/>
            <input v-model="user.firstName" class="text-center m-1"/>
            <input class="text-center m-1 cursor" v-model="emailLocal" disabled/>
            <b-button @click="modify --" class="m-1">Enregistrer mes informations</b-button>
        </div>
    </div>
    <div v-else class="card" style="width: 18rem;">
        <h1>Page de profile</h1>
        <img :src="user.profilePictures" alt="image de profile" class="card-img-top">
        <div class="card-body">
            <p> {{ user.lastName }} </p>
            <p> {{ user.firstName }} </p>
            <p> {{ emailLocal }} </p>
            <b-button @click="modify ++">Modifier mes informations</b-button> 
        </div>
    </div>
</div>
</template>


<script>
import { mapState } from 'vuex'

export default {
    name: 'Profile',
    data: () => {
        return {
        profilePictures:'',
        lastName:'',
        firstName:'',
        emailLocal: '',
        modify:[ ],
        }
    },
    mounted:function () {
        if (this.$store.state.user.token == '') {
            this.$router.push('/login');
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

<style scoped lang='scss'>
$colorgroup: rgb(186, 77, 85);
$bgmain :rgb(44, 62, 93) ;

.register {
    display: flex;
    justify-content: center;
}

button {
    background-color: $colorgroup;
    color: black;
    width: 215px;
    font-size: 0.92rem;
}

.card {
    justify-content: center;
    align-content: center;
    
    background-color: $bgmain;
    border: none;
}
.card-img-top {
    width: 100px;
    height: 100px;
    margin-left: 90px;
}

.cursor {
    cursor: not-allowed;
    background: lightgrey;
    color: black;
}

</style>