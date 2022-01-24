<template >

        <div class="container post-container" v-if="posts != null" >
            <div class="card mt-2" v-for="(post,idx) in posts" :key="idx" >
                <button v-if="user.userId == post.userId || userInfos.isAdmin == 1 || userInfos.isModo == 1" class="erase" @click.prevent="erasePost(post.id)"><i class="fas fa-times-circle"></i></button>
                <div class="hour"> À {{ post.createdAt.slice(11, 16)}} le {{ post.createdAt.substr(0, 10).split("-").reverse().join("-") }} </div>
                <div ><i class="fas fa-trash-alt" type="button" v-if="userInfos.isAdmin == 1" @click="deleteProfile(post.userId)"> {{post.userId}} {{ post.userToken }} </i> {{ post.User && post.User.lastName ? post.User.lastName : 'Inconnu' }} {{ post.User && post.User.firstName ? post.User.firstName: 'Inconnu'}} a dit </div>
                <p class="post-content"> {{post.content}} </p>
                <img class="card-img-top" :src="post.attachment"  alt="image de publication">
                <form class="card-body">
                    <textarea id="text" v-model="newComment" class="card-text" placeholder="Écrivez un commentaire..."/>
                    <button class="btn_comment mt-1"  id="createComment" type="button" @click.prevent="createComment(post.id)">Commenter</button><br><br>
                </form>
     
                <div  class="comments mt-1 row" v-for="comment in comments.filter(comment => {return comment.postId == post.id})" :key="comment.id">
                    <i v-if="user.userId == comment.userId || userInfos.isAdmin == 1 || userInfos.isModo == 1" @click.prevent="eraseComment(comment.id)" class="fas fa-times-circle erase" type="button"></i>
                    <span class="CreatedAt">À {{ post.createdAt.slice(11, 16)}} le  {{comment.createdAt.substr(0, 10).split("-").reverse().join("-")}} </span>
                    <div class="comments_user ">{{comment.User && comment.User.firstName ? comment.User.firstName: 'Inconnu'}} {{comment.User && comment.User.lastName ? comment.User.lastName: 'Inconnu'}} : {{ comment.content }}</div>
                </div>

            </div>
        </div>

</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {
    name: 'PostWall',
    data: () => {
        return {
            user : JSON.parse(localStorage.getItem('user')),
            newComment: '',
            posts :[] ,
            comments: [],
            id:'',
            post:[],
            comment:[],
        }
    },      
    
    async created() {
    // GET LISTS POSTS 
        let userToken = localStorage.getItem('user');
        userToken = JSON.parse(userToken)// get user token into the localStorage

    await axios
            .get('http://localhost:3000/api/posts/'
          
            )
            .then((response) => {
                this.posts = response.data;
               
            })
            .catch(err => {
              console.log(err);
              this.$store.commit('logout');
              this.$router.push('/login');
              localStorage.removeItem("emailLocal");
              localStorage.removeItem("user");
              localStorage.removeItem("postInfos");
              window.alert('Veuillez vous connecter pour accéder au site')
            })
    // GET ALL COMMENTS
    await axios
            .get('http://localhost:3000/api/comments', {
                headers: {
                "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + userToken.token
            }
            })
            .then((response) => {
              this.comments = response.data;
              
            })
            .catch(err => {
              console.log(err + "User inconnu ou comments indisponibles");
            })
  },

    mounted: function () {

        if (this.$store.state.user.token == '') {
            this.$router.push('/login').catch(()=>{});
            return ;
        }
  
    },
    computed:{
        ...mapState({
            userInfos:"userInfos"
        }),
    },
    methods : {
        
    createComment(id) {
        let userToken = localStorage.getItem('user');
        userToken = JSON.parse(userToken)// get user token into the localStorage
        if (this.newComment == '') {
            window.alert("Écrivez votre commentaire avant de l'envoyer")
            return
        }
       
        const data = JSON.stringify({content: this.newComment})
        axios.post('http://localhost:3000/api/comments/new/'+ id ,

            data, 
            
            {headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + userToken.token
            },
            })
            .then(res => {
                console.log(res);
                window.alert('Votre commentaire est pris en compte.')
                this.$router.go()
            })
            .catch((err) => {
                console.log(err);
                window.alert('Impossible de commenter')
            })
    },
    eraseComment(id) {
        if (confirm("Vouez-vous supprimer le post?")) {
      axios 
        .delete('http://localhost:3000/api/comments/delete/'+ id, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": 'Bearer ' + this.user.token
            }
            })
            .then((res) => {
                console.log(res);
                window.alert('Commentaire effacé')
                this.$router.go()
            })
            .catch((err) => {
                console.error("Impossible d'effacer le commentaire");
                window.alert("Impossible d'effacer le commentaire")
            })
        }
        },

    erasePost(id) {
         if (confirm("Voulez-vous supprimer le post?")) {
      axios
        .delete('http://localhost:3000/api/posts/delete/' + id, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": 'Bearer ' + this.user.token
          }
        })
        .then((res) => {
            console.log(res);
            window.alert("Post effacé")
            this.$router.go()
        })
        .catch((err) => {
            console.log(err);
            window.alert("impossible d'effacer le post")
        })
         }
    },
      deleteProfile: function (id) {
          if (confirm("Voulez-vous supprimer le compte?")) {
                let userToken = localStorage.getItem('user');
                userToken = JSON.parse(userToken)

                axios
                    .delete(`http://localhost:3000/api/users/userProfile/${id}`, {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                            "Authorization": 'Bearer ' + userToken.token
                        }
                    })
                .then(res => {
                    console.log(res);
                    alert("Le compte à bien été supprimé !");
                    this.$router.go()
                })
                .catch(error => (console.log('cannot delete user ' + error )))
        }
      },
        

    },
        
    
}

</script>

<style scoped lang="scss">
$groupBorder :rgb(186, 77, 85);

.container{
    display: flex;

}
.post-container {
    flex-direction: column;
    align-items: center;
}

.card {
    display: flex;
    align-items: center;
    flex-direction: column;
    color: black;
    max-width: 600px;
    width: 100%;
    background-color: grey;
    border-radius: 12px;
    border: 1px solid $groupBorder;
    box-shadow: 1px 1px 5px grey;
}
.card-img-top {
    max-height: 400px ;
}
.fa-times-circle {
   border-radius: 10%;
    color: red;
}
.erase {
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    border-radius: 100%;
    width:10px;
    height: 10px;
    margin: 3% 0 -5% 93%;
    border: none;
    z-index: 1;
}
.hour {
    font-size: 0.8rem;

}
.post-content {
    padding-left: 10px ;
    background-color: white;
    width: 90%;
    border-radius: 12px;
    border: ridge $groupBorder;
}
.card-text {
    max-width: 500px;
    width: 100%;
    height: 50px;
    border-radius: 12px;
    font-size: 0.9rem;
    border: 2px solid $groupBorder;
}

.btn_comment {
    background-color: $groupBorder;
    border-radius: 12px;
}

.comments {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(255, 215, 215);
    border-radius: 12px;
    width: 80%;
    min-height: 40px;
}
.comment-erase {
    width: px;
}
.comments_user {
    font-size: 0.9rem;
    margin-right: 8px;
    
}
.CreatedAt {
    font-size: 0.6rem;
}

.comments_written {
    background-color: rgb(255, 215, 215);
    border-radius: 1rem;
    border: none;
    height: 100%;
    width: 100%;
}

</style>

