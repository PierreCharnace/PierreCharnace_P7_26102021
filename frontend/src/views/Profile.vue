<template>
<div class="container-fluid text-center register">
    <form v-if="modify == 1" class="card" style="width: 18rem;">
        <h1>Page de profil</h1>
        <img :src="profilePictures" alt="image de profile" class="card-img-top">
        <div class="card-body">
            <label for="newLastName">Nom</label>
            <input id="newLastName" v-model="user.lastName" class="text-center m-1" placeholder="nom"/> 
            <label for="newFirstName">Nom</label>
            <input id="newFirstName" v-model="user.firstName" class="text-center m-1" placeholder="prénom"/>
            <label for="emailSecond">Nom</label>
            <input id="emailSecond" class="text-center m-1 cursor" v-model="emailLocal" disabled/>
            <b-button class="mt-1" @click="modify --, updateProfile()" type="button">Enregistrer mes informations</b-button>
            <b-button class="mt-3" @click="deleteProfile()"><i class="fas fa-trash-alt"></i></b-button>
        </div>
    </form>
    <div v-else class="card" style="width: 18rem;">
        <h1>Page de profil</h1>
        <img :src="user.profilePictures" alt="image de profile" class="card-img-top">
        <div class="card-body">
            <label for="lastName">Nom</label>
            <input id="lastName" v-model="user.lastName" class="text-center m-1 cursor" disabled/>
            <label for="firstName">Prénom</label>
            <input id="firstName" v-model="user.firstName" class="text-center m-1 cursor" disabled/>
            <label for="email">Email</label>
            <input id="email" class="text-center m-1 cursor" v-model="emailLocal" disabled/>
            <b-button class="mt-1" @click="modify ++">Modifier mes informations</b-button>
            <b-button class="mt-3" @click="deleteProfile()" title="Boutton effacement de compte"><i class="fas fa-trash-alt"></i></b-button>
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
            profilePictures: null
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
        changeImage(event) {
            this.profilePictures = event.target.files[0]
        },
        updateProfile: function () {
                let userToken = localStorage.getItem('user');
                userToken = JSON.parse(userToken)

                {  axios.put("http://localhost:3000/api/users/userProfile", {
                        
                        lastName : this.user.lastName,
                        firstName: this.user.firstName,

                    },
                    {
                        headers: {
                            Authorization: "Bearer " + userToken.token
                        }
                    }).then (response => {
                        window.alert("Modifications effectuées")
                        this.$router.go()

                    }).catch(function (error) {
                        if (error == "Error: Request failed with status code 400") {
                            window.alert('Il y a un soucis avec les informations saisies!')
                        }
                        
                    })
                }
        
            },
     
                
           
            deleteProfile: function () {
                 if (confirm("Voulez-vous vraiment supprimer votre compte?"))       {
                let userToken = localStorage.getItem('user');
                userToken = JSON.parse(userToken)
                axios
                    .delete(`http://localhost:3000/api/users/userProfile/${userToken.userId}`, {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                            "Authorization": 'Bearer ' + userToken.token
                        }
                    })
                .then(res => {
                    alert("Votre compte à bien été supprimé !");
                    localStorage.removeItem("emailLocal");
                    localStorage.removeItem("user");
                    localStorage.removeItem("postInfos");
                    this.$store.commit('logout');
                    this.$router.push('/register');
                })
                .catch(error => (console.log('cannot delete user ' + error )))
        
            }
         }
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
#imageFile {
    width: 300px;
}
#file-upload-button {
width: 10px!important;
}

</style>