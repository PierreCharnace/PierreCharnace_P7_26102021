<template>
  <div id="app" class="container-fluid">
    <Header />

    <router-view/>
    
    <Footer />
    
  </div>
</template>

<script>
import Header from "../src/components/Header.vue";
import Footer from "../src/components/Footer.vue";

export default {
  components: {
    Header, Footer
  }
};
</script>

<style lang="scss">
$bgcolor : rgb(174, 174, 174);
$groupBorder : solid 5px rgb(186, 77, 85);
$bgmain :rgb(44, 62, 93) ;

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0;
}

nav, footer {
  background: $bgcolor;
}

nav {
  border-bottom: $groupBorder;
}

.home, .register {
  background: $bgmain;
  color: white;
}

footer {
  border-top: $groupBorder;
}


</style>
