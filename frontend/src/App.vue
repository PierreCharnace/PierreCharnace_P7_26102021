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
$colorgroup: rgb(186, 77, 85);

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
html {
  background-color: $bgmain;
}
.home, .register, .login {
  background: $bgmain;
  color: white;
  height: 100%;
}

footer {
  border-top: $groupBorder;
}

 .buttonform {
    background: grey;
    border: solid 1px black!important;
    border-radius: 8px;
  }
  .buttonform:focus {
    background: rgb(255, 215, 215);
    border-radius: 8px;
  }
  .disabled-button {
    cursor: not-allowed;
  }

</style>
