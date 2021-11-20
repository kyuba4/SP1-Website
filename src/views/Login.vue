<template>
   <div class="container">
      <Loader v-show="loading" />
      <div class="login-wrap">
         <h1>Zaloguj się</h1>
         <div class="form-container">
            <form @submit.prevent="login">
               <input type="email" placeholder="Email" v-model="email" />
               <input type="password" placeholder="Hasło" v-model="password" />
               <span v-show="errorMsg" class="error">{{ errorMsg }}</span>
               <button class="btn-save" :disabled="!btnEnabled">Zaloguj się</button>
            </form>
         </div>
      </div>
   </div>
</template>

<script>
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../components/firebaseInit";
import Loader from "../components/Loader";

export default {
   name: "Login",
   components: {
      Loader,
   },
   data() {
      return {
         email: "",
         password: "",
         errorMsg: "",
         loading: false,
      };
   },
   methods: {
      async login() {
         this.loading = true;

         try {
            await signInWithEmailAndPassword(auth, this.email, this.password);
         } catch (err) {
            this.errorMsg = "Błędny Email lub Hasło";
         }

         this.loading = false;
      },
   },
   created() {
      auth.onAuthStateChanged((user) => {
         if (user) {
            this.$router.push({ name: "Panel" });
         }
      });
   },
   computed: {
      btnEnabled() {
         return this.email > "" && this.password > "";
      },
   },
};
</script>

<style lang="scss" scoped>
.container {
   display: flex;
   justify-content: center;
   align-items: center;
   margin: 120px 15px 0 15px;
   flex-direction: column;

   h1 {
      font-weight: normal;
      font-size: 3rem;
      text-align: center;
   }

   .login-wrap {
      border: 1px solid #ccc;
      max-width: 400px;
      width: 100%;
      padding: 30px;

      .form-container {
         margin-top: 50px;

         form {
            display: flex;
            flex-direction: column;

            input {
               padding: 10px 20px;
               margin: 10px;
               font-size: 15px;
               border-radius: 0px;
               border: 1px solid #ccc;
               outline: 0;
               transition: 300ms;

               &:focus {
                  border: 1px solid #212121;
               }
            }

            span {
               margin-top: 5px;
               font-size: 0.8rem;
               cursor: pointer;
               text-align: center;

               &:hover {
                  text-decoration: underline;
               }

               &.error {
                  color: red;
                  text-decoration: none;
                  cursor: text;
                  border: 1px solid red;
                  padding: 10px;
                  margin: 20px 10px 0 10px;
               }
            }
         }
      }
   }

   @media (max-width: 500px) {
      h1 {
         font-size: 2rem;
      }

      .login-wrap {
         width: fit-content;
         max-width: 100%;
      }
   }
}
</style>