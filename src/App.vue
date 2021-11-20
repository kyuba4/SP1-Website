<template>
   <div id="app">
      <div class="panel-link">
         <router-link :to="{ name: 'Panel' }">{{ user ? "Panel" : "Zaloguj Się" }}</router-link>
      </div>
      <Header />
      <router-view />
      <Footer v-show="!$route.meta.hideFooter" />
   </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { auth } from "./components/firebaseInit";

export default {
   data() {
      return {
         user: null,
      };
   },
   components: {
      Header,
      Footer,
   },
   created() {
      auth.onAuthStateChanged((user) => {
         this.user = user;
      });
   },
};
</script>


<style lang="scss">
// Font
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap");

body {
   overflow-y: scroll;
}

* {
   font-family: "Poppins", sans-serif;
   margin: 0;
   padding: 0;
   box-sizing: border-box;
}

a {
   color: inherit;
   text-decoration: none;
}

button:disabled {
   cursor: not-allowed !important;
}

img {
   max-width: 100%;
   height: auto;
   display: flex;
   margin: 0 auto;
}

.panel-link {
   position: fixed;
   background: #323232;
   color: white;
   padding: 10px 15px;
   top: 30px;
   right: 0;
   z-index: 9999;
   border-radius: 10px 0 0 10px;
}

// Quill styles
$padding: 1.5rem;

.ql-align-center {
   text-align: center;
}

.ql-align-right {
   text-align: right;
}

.ql-align-justify {
   text-align: justify;
}

.ql-indent-1 {
   padding-left: $padding * 3;
}

.ql-indent-2 {
   padding-left: $padding * 5;
}

.ql-indent-3 {
   padding-left: $padding * 7;
}

.ql-indent-4 {
   padding-left: $padding * 9;
}

.ql-indent-5 {
   padding-left: $padding * 11;
}

.ql-indent-6 {
   padding-left: $padding * 13;
}

.ql-indent-7 {
   padding-left: $padding * 15;
}

.ql-indent-8 {
   padding-left: $padding * 17;
}

.ql-header {
   display: none !important;
}

.ql-snow a {
   color: rgb(0, 132, 255) !important;
}
</style>
