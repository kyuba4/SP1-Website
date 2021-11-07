<template>
   <div>
      <header>
         <div class="logo">
            <img src="../assets/logo.png" />
            <router-link to="/"><span>SP1 Chodzież</span></router-link>
         </div>
         <nav class="desktop-nav" v-show="!mobile">
            <div class="nav-links">
               <Navlinks />
            </div>
         </nav>
         <button id="hamburger" @click="showMenu = !showMenu" v-show="mobile">
            <i class="fas fa-bars" v-show="!showMenu"></i>
            <i class="fas fa-times" v-show="showMenu"></i>
         </button>
      </header>
      <nav class="mobile-nav" :class="showMenu ? 'open' : null" v-show="mobile">
         <div class="nav-links">
            <Navlinks />
         </div>
         <div class="closing-div" :class="showMenu ? 'open' : null"></div>
      </nav>
   </div>
</template>
<script>
import Navlinks from "./NavLinks.vue";

export default {
   name: "Header",
   data() {
      return {
         mobile: false,
         showMenu: false,
      };
   },
   components: {
      Navlinks,
   },
   watch: {
      $route() {
         this.showMenu = false;
      },
   },
   created() {
      window.addEventListener("resize", () => {
         if (window.innerWidth <= 750) {
            this.mobile = true;
         } else {
            this.showMenu = false;
            this.mobile = false;
         }
      });

      if (window.innerWidth < 750) {
         this.mobile = true;
      } else {
         this.mobile = false;
      }

      document.body.addEventListener("click", (e) => {
         this.closeMenu(e);
      });
   },
   methods: {
      closeMenu(e) {
         if (e.target.className === "closing-div open") {
            this.showMenu = false;
         }
      },
   },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&display=swap");

header {
   position: relative;
   height: fit-content;
   overflow: hidden;
   padding: 20px;
   display: flex;
   justify-content: space-around;
   box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -6px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
   z-index: 5;

   @media (max-width: 1050px) {
      flex-direction: column;
      justify-content: center;
   }

   @media (max-width: 750px) {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
   }

   .logo {
      display: flex;
      align-items: center;

      @media (max-width: 1050px) {
         justify-content: center;
      }

      img {
         box-shadow: 0 0 7px 0px #32323280;
         border-radius: 50%;
         max-width: 70px;
         height: auto;
         margin-right: 15px;
      }

      a {
         text-align: center;

         span {
            font-size: 2rem;
            font-weight: 700;
            text-align: center;
            border-bottom: 3px solid transparent;
            transition: border-bottom-color 300ms;
            font-family: "Amatic SC", cursive;

            &:hover {
               border-bottom-color: #646464;
            }
         }
      }

      @media (max-width: 820px) {
         img {
            max-width: 60px;
         }

         span {
            font-size: 1.3rem;
         }
      }
   }

   // Desktop Nav
   .desktop-nav {
      display: grid;
      place-content: center;

      @media (max-width: 1050px) {
         margin-top: 20px;
      }

      .nav-links {
         ul {
            display: flex;
            list-style: none;
            align-items: center;
            justify-content: center;

            li {
               padding: 10px 15px;
               cursor: pointer;
               text-align: center;
               transition: border-bottom 300ms;
               border-bottom: 3px solid transparent;
               white-space: nowrap;

               @media (max-width: 820px) {
                  font-size: 14px;
               }

               &:hover {
                  border-bottom: 3px solid #646464;
               }
            }
         }
      }
   }

   // Hamburger
   #hamburger {
      border: 0;
      outline: 0;
      background: transparent;
      width: 35px;
      height: 35px;
      cursor: pointer;

      i {
         transform: scale(2);
      }
   }
}

// Mobile Nav
.mobile-nav {
   background-color: #404040;
   color: white;
   font-size: 18px;
   position: fixed;
   height: 100%;
   width: 78%;
   top: 0;
   left: -100%;
   z-index: 1000;
   transition: all 650ms ease;
   box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.432) 7px 0 7px -3px;

   .closing-div {
      position: fixed;
      height: 100%;
      width: 100% - 78%;
      top: 0;
      right: 0;
      display: none;

      &.open {
         display: initial;
      }
   }

   .nav-links {
      width: 100%;
      height: 100%;

      ul {
         list-style: none;
         width: 100%;
         height: 100%;
         display: flex;
         flex-direction: column;
         text-align: center;

         li {
            display: flex;
            flex: 1;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            width: 100%;
         }
      }
   }

   &.open {
      left: 0;
   }
}

// Open class for mobile nav
</style>