<template>
    <div class="container mt-5">
        <div class="card">
            <div class="hour">Heure de la publication</div>
            <p> Nom , prénom du publicateur</p>
            <p> Texte du post</p>
            <img class="card-img-top" src="@/assets/img-header-grey.png" alt="Card image cap">
            <div class="card-body">
                <input class="card-text" placeholder="Écrivez un commentaire..."/>
                <button class="btn mt-1" >Commenter</button><br><br>
                <div class="comments mt-2 row">
                    <div class="comments_user ">Nom prénom :</div>
                    <div class="comments_written ">sdfsdfddddddddddddddddddddddddddddddddddddddddtttttttttttttttttttttttttttfdsdfdfdssfdf</div>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
import { mapState } from 'vuex'

export default {
 name: 'PostWall',
 props: {

 },
 computed:{
    ...mapState([ "userInfos"]),
  },
methods : {
    
},
}

</script>

<style scoped lang="scss">
$groupBorder :rgb(186, 77, 85);

.container{
    display: flex;
    justify-content: center;

}

.card {
    color: black;
    max-width: 600px;
    background-color: grey;
    border-radius: 12px;
    
}
.hour {
    font-size: 0.8rem;
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
.comments_user {
    font-size: 0.9rem;
    margin-right: 8px;
    min-width: 100px;
}
.comments_written {
    background-color: rgb(255, 215, 215);
    border-radius: 1rem;
    border: none;
}

</style>

