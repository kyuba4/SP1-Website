<template>
   <div>
      <span class="first-line">404 Error</span>
      <span class="second-line">Strona nie znaleziona</span>
      <router-link :to="{ name: 'Home' }"><i class="fas fa-home"></i> Przejdź do strony głównej <i class="fas fa-home"></i></router-link>
   </div>
</template>
<script>
export default {
   name: "ErrorPage",
};
</script>

<style lang="scss" scoped>
div {
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   font-size: 50px;
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);

   span {
      text-align: center;

      &.first-line {
         font-size: 2em;
         color: rgb(224, 0, 0);
         white-space: nowrap;
      }

      &.second-line {
         font-size: 0.7em;
         letter-spacing: -2px;
      }
   }

   a {
      font-size: 16px;
      margin-top: 50px;
      background: #323232;
      color: white;
      padding: 15px 25px;
      border-radius: 5px;
      transition: 300ms;
      white-space: nowrap;

      &:hover {
         background: #747474;
      }
   }

   @media (max-width: 600px) {
      font-size: 35px;

      .first-line {
         line-height: 1;
         margin-bottom: 20px;
      }

      a {
         font-size: 12px;
      }
   }
}
</style>