<template>
<div class="container-fluid text-center register">
    <form v-if="modify == 1" class="card" style="width: 18rem;">
        <h1>Page de profil</h1>
        <img :src="newProfilePictures" alt="image de profile" class="card-img-top">
        <div class="card-body">
            <input id="newLastName" v-model="newLastName" class="text-center m-1" placeholder="nom"/> 
            <input id="newFirstName" v-model="newFirstName" class="text-center m-1" placeholder="prénom"/>
            <input class="text-center m-1 cursor" v-model="emailLocal" disabled/>
            <button class="mt-1" @click="modify --, updateProfile()" type="button">Enregistrer mes informations</button>
            <b-button class="mt-3"><i class="fas fa-trash-alt"></i></b-button>
        </div>
    </form>
    <div v-else class="card" style="width: 18rem;">
        <h1>Page de profil</h1>
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

            newProfilePictures:'',
            newLastName:'',
            newFirstName:'',
            emailLocal: '',
            modify:[ ],
        }
    },
    mounted:function () {
        console.log(this.$store.state.user.token );
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
        updateProfile: 
            function () {
                let userToken = localStorage.getItem('user');
                const self = this;
                userToken = JSON.parse(userToken)
                 
                {  axios.put("http://localhost:3000/api/users/userProfile", {
                        
                        lastName : this.newLastName,
                        firstName: this.newFirstName,
                        profilePictures: this.newProfilePictures
                        
                    },
                    {
                        headers: {
                            Authorization: "Bearer " + userToken.token
                        }
                    }).then (response => {
                        self.$router.push('/wall');
                        console.log(lastName)
                        console.log('--->', response);


                    }).catch(function (error) {
                        if (error == "Error: Request failed with status code 400") {
                            window.alert('Il y a un soucis avec les informations saisies!')
                        }
                        
                    })
                }
        
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