<template>
<div class="container-fluid text-center register">
    <div v-if="modify == 1" class="card" style="width: 18rem;">
        <h1>Page de profile</h1>
        <img :src="user.profilePictures" alt="image de profile" class="card-img-top">
        <div class="card-body">
            <input v-model="user.lastName" class="text-center m-1"/>
            <input v-model="user.firstName" class="text-center m-1"/>
            <input class="text-center m-1 cursor" v-model="emailLocal" disabled/>
            <b-button class="mt-1" @click="modify --, updateProfile()" >Enregistrer mes informations</b-button>
            <b-button class="mt-3"><i class="fas fa-trash-alt"></i></b-button>
        </div>
    </div>
    <div v-else class="card" style="width: 18rem;">
        <h1>Page de profile</h1>
        <img :src="user.profilePictures" alt="image de profile" class="card-img-top">
        <div class="card-body">
            <input v-model="user.lastName" class="text-center m-1 cursor" disabled/>
            <input v-model="user.firstName" class="text-center m-1 cursor" disabled/>
            <input class="text-center m-1 cursor" v-model="emailLocal" disabled/>
            <b-button class="mt-1" @click="modify ++">Modifier mes informations</b-button>
            <b-button class="mt-3"><i class="fas fa-trash-alt"></i></b-button>
        </div> 
    </div>
    
</div>
</template>


<script>
import { mapState } from 'vuex'
import axios from 'axios'

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

    methods: {
        updateProfile: function () {
           axios.put('http://localhost:3000/api/users/userProfile/{id}', 
           {
               lastName : this.lastName,
               firstName: this.firstName,
               profilePictures: this.profilePictures
           } )
                .then(function( response ) {

                }.bind(this));
    
    },
    }
    
}
</script>

<style scoped lang='scss'>
$colorgroup: rgb(186, 77, 85);
$colorgrouplight: rgba(186, 77, 85, 0.5);
$bgmain :rgb(44, 62, 93) ;

.register {
    display: flex;
    justify-content: center;
}

button {
    background-color: $colorgroup;
    
    width: 215px;
    font-size: 0.92rem;
}
.btn-secondary:hover {
    background-color:$colorgrouplight;
    border-color: $colorgroup;
    box-shadow: none;
}
.btn-secondary:hover:focus {
    background: $colorgrouplight;
}

.btn-secondary:focus {
    border-color: $colorgroup;
    background-color:$colorgroup;
    box-shadow: none;
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

.fa-trash-alt {
    margin-left: 10px ;
}

</style>