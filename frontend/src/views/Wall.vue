<template>
<div class="register">
    <div class="container register">
        <p>Page du mur et ajout de post</p>
        <a href="#id01" ><button class="btn-access">Écrivez votre message</button></a>

        <div id="id01" class="modal">
        <div class="modal-dialog">
            <div class="modal-content">
            <header class="container"> 
                <a href="#" class="closebtn">×</a>
                <h5>Créer une publication</h5>
            </header>
            <div class="container">
                <textarea placeholder="Écrivez votre message"></textarea>  
            </div>
            <div class="container end">
                <button name="end_btn" class="end_btn">Insérer une image</button>
                <!--<label for="end_btn"> {{ post.attachment }} </label>-->
                <button class="end_btn">Publier</button>
            </div>
            </div>
        </div>
        </div> 
    </div>
</div>
</template>


<script>
import { mapState } from 'vuex'

export default {
    name: 'Wall',
    mounted:function () {
        console.log(this.$store.state.user);
        if (this.$store.state.user.userId == -1) {
            this.$router.push('/login');
            return ;
        }
        this.$store.dispatch('getUserInfos');
    },

     computed:{
    ...mapState(["userInfos"])
  },
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
