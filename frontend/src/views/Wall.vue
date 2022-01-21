<template>
<div class="register">
    <div class="container register">
        <p>Page du mur et ajout de post</p>
        <a href="#id01" ><button class="btn-access">Écrivez votre message</button></a>

        <div id="id01" class="modal">
          <div class="modal-dialog">
              <form class="modal-content">
                <header class="container"> 
                    <a href="#" class="closebtn">×</a>
                    <h5>Créer une publication</h5>
                </header>
                <div class="container">
                    <textarea v-model="content" placeholder="Écrivez votre message"></textarea>
                    <img v-if="uploadUrl != null" :src="uploadUrl" alt="image de publication" max-width=100% class="img-fluid" height: auto>  
                </div>
                <div class="container end">
                    <div fluid><input  type="file" @change="onAttachmentSelected " name="attachment" class="end_btn"/></div>
                    <button type="button" class="end_btn" @click="createPost()">Publier</button>
                </div>
              </form>
          </div>
        </div> 
       <PostWall />
    </div>
</div>
</template>


<script>
import { mapState } from 'vuex'
import axios from 'axios'
import fs from 'fs'
import PostWall from "../components/PostWall.vue";


export default {
    name: 'Wall',
    components: {
     PostWall,
  },
    data: () => {
      return {

        uploadUrl:'',
        UserId: '',
        content:'',
        attachment:'',
        postId:'',
      }
    },
    mounted:function () {
        if (this.$store.state.user.userId == -1) {
            this.$router.push('/login').catch((err)=>{err});
            return ;
        }
        this.$store.dispatch('getUserInfos', 'setStatus', 'getPostInfos');
    },

     computed:{
    ...mapState(["userInfos"])
    },
    methods: {
      onAttachmentSelected(e) {
        this.attachment = e.target.files[0]
        this.uploadUrl = URL.createObjectURL(this.attachment) // create an url to preview it before uploading
      },

      createPost() {
        let userToken = localStorage.getItem('user');
        userToken = JSON.parse(userToken)// get user token into the localStorage
        if (this.attachment.name == null || this.attachment == null ) {
          window.alert('Il faut mettre une image')
        }
        const fd = new FormData();//create the data for axios
        fd.append('attachment',this.attachment, this.attachment.name)
        fd.append('content', this.content);
        

        axios.post("http://localhost:3000/api/posts/new",
        
        fd,
             
        {headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + userToken.token
        }})
        
        .then(res => {
          window.alert('Post publié')
          console.log(res);
          localStorage.setItem('postInfos', JSON.stringify(res))
          this.$router.go()
  
        }).catch((err) => {  
          window.alert("Il manque quelque chose")
          localStorage.removeItem('postInfos')
          })
        
      },
        
    }
}
</script>
<style scoped lang="scss">


@keyframes slideDownFadeIN {
    from {top:-100px;opacity: 0;}
    to {top:0px;opacity:1;}
}
$groupBorder :rgb(186, 77, 85);
$bgmain :rgb(44, 62, 93) ;

.btn-access {
    border-radius: 8px;
    background-color: $groupBorder;
}

/* Foncer l'arrière-plan de la fenêtre modale */
.modal {
  display: none; 
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

/* Afficher la fenêtre modale lorsqu'elle est ciblée par un lien supprimer */
.modal:target {
  display: table;
  position: absolute;
}

/* la fenêtre modale  */
.modal-dialog {
  display: table-cell;
  vertical-align: middle;
}

/* Le contenu de la modale */
.modal-dialog .modal-content {
  margin: auto;
  background-color: #f3f3f3;
  position: relative;
  padding: 0;
  outline: 0;
  border: 1px #777 solid;
  text-align: justify;
  width: 80%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  max-width: 600px;
  animation-name: slideDownFadeIN;
  animation-duration: 0.5s;
}

/* Bouton servant à fermer la fenêtre modale */
.closebtn {
  text-decoration: none;
  float: right;
  font-size: 35px;
  font-weight: bold;
  color: #fff;
}

.closebtn:hover,
.closebtn:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.container {
  padding: 2px 16px;
}

header {
  background-color: $bgmain;
  font-size: 25px;
  color: white;
}

textarea {
    width: 100%;
    height: 100px;
    border-style: none;
}

.end {
  display: flex;
  justify-content:space-between;
  background-color: $bgmain;
  font-size: 20px;
  color: white;
}

.end_btn {
    margin-right: 5px;
    border-radius: 8px;
    background-color: $groupBorder;
}

@media ( min-width: 320px) and ( max-width: 425px) {
  .end_btn {
    width: 80px;
    height: 50px;
    font-size: 0.8rem;
  }
  .modal-dialog .modal-content {
    width: 95%;
}
}

</style>
