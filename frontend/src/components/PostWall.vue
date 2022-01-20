<template >

        <div class="container post-container" v-if="posts != null" >
            <div class="card mt-2" v-for="(post,idx) in posts" :key="idx" >
                <button class="erase" @click="erase()"><i class="fas fa-times-circle"></i></button>
                <div class="hour"> {{ post.createdAt }} </div>
                <div > {{ post.User && post.User.lastName ? post.User.lastName : 'nan' }}: </div>
                <p class="post-content"> {{post.content}} </p>
                <img class="card-img-top" :src="post.attachment"  alt="image de publication">
                <form class="card-body" @:click="createComment()">
                    <input  class="card-text" placeholder="Écrivez un commentaire..."/>
                    <button class="btn mt-1" type="button" >Commenter</button><br><br>
                </form>
                <div class="comments mt-2 row" v-for="(comment) in comments.filter((comment) => {return comment.postId == post.PostId})" :key="comment.PostId">
                    <button class="erase-comments" ><i class="fas fa-times-circle"></i></button>
                    <div class="comments_user "> {{ comment.User }} {{ comment.User.firstName}} :</div>
                    <div class="comments_written "> {{ comment.content }} </div>
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
        }
    }, 
      props: {
     /* post: {
      type: Object,
      required: true
    }*/
    },      
    
    async created() {
    // GET LISTS POSTS 
        let userToken = localStorage.getItem('user');
        userToken = JSON.parse(userToken)// get user token into the localStorage


  

    await axios
            .get('http://localhost:3000/api/posts/', {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + userToken.token
            }
            })
            .then((response) => {
                this.posts = response.data;
                console.log(response.data);
            })
            .catch(err => {
              console.log(err);
             // this.$store.commit('logout');
            //  this.$router.push('/login');
            //  localStorage.removeItem("emailLocal");
             // localStorage.removeItem("user");
            //  localStorage.removeItem("postInfos");
              window.alert('Veuillez vous connecter pour accéder au site')
            })
    // GET ALL COMMENTS
    await axios
            .get('http://localhost:3000/api/comments', {
     
            })
            .then((response) => {
              this.comments = response.data;

            })
            .catch(err => {
              console.log(err + "User inconnu ou comments indisponibles");
            })
  },
    props: {

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
        
       
    createComment: function () {
        let id=this.post.id
      const data = JSON.stringify({content: this.newComment})
      axios
        .post('http://localhost:3000/api/' + id + '/comments/new', data, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + this.user.token
          },
        })
        .then((res) => {
            console.log(res);
            window.location.reload();
        })
        .catch(() => {
            window.alert('Impossible de commenter')
        })
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
    background-color: grey;
    border-radius: 12px;
    border: 1px solid $groupBorder;
    box-shadow: 1px 1px 5px grey;
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
    margin: 3% 0 0 93%;
    border: none;
}
.hour {
    font-size: 0.8rem;
    margin-top: -5%;
}
.post-content {
    display: flex;
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
}

.btn {
    background-color: $groupBorder;
    border-radius: 12px;
}

.comments {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(255, 215, 215);
    border-radius: 12px;
    border: ridge $groupBorder;

}
.erase-comments {
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    border-radius: 100%;
    width:10px;
    height: 10px;
    margin: 3% 0 0 90%;
    border: none;
}
.comments_user {
    font-size: 0.9rem;
    margin-right: 8px;
}
.comments_written {
    background-color: rgb(255, 215, 215);
    border-radius: 1rem;
    border: none;
}

</style>

