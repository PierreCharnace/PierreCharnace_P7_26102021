<template>
     <footer class="container-fluid pt-4 ">
        <div class="row">
          <div class="">  
              <p class="">Tous droits réservés - <img src="@/assets/icon-grey.png" alt="logo groupomania noir" class=""> Groupomania</p>
          </div>
        </div>

    </footer>
</template>



<script>
export default {
  name: 'Footer',
  props: {
    
  }
}
</script>

<style lang='scss'>

footer {
  position: fixed;
  bottom: 0;
  z-index: 2;
}

</style>