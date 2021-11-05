<template>
   <div class="loader-box">
      <div class="loader">
         <svg class="circular" viewBox="25 25 50 50">
            <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" />
         </svg>
      </div>
   </div>
</template>
<script>
export default {
   name: "Loader",
};
</script>
<style lang="scss">
$dark: #323232;
$width: 150px;

.loader-box {
   position: fixed;
   width: 100%;
   height: 100%;
   top: 0;
   left: 0;
   backdrop-filter: blur(4px);
   z-index: 99999;
}

.loader {
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   width: $width;
   &:before {
      content: "";
      display: block;
      padding-top: 100%;
   }
}

.circular {
   animation: rotate 2s linear infinite;
   height: 100%;
   transform-origin: center center;
   width: 100%;
   position: absolute;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   margin: auto;
}

.path {
   stroke-dasharray: 1, 200;
   stroke-dashoffset: 0;
   animation: dash 1.2s ease-in-out infinite;
   stroke: $dark;
   stroke-linecap: round;
}

@keyframes rotate {
   100% {
      transform: rotate(360deg);
   }
}

@keyframes dash {
   0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
   }
   50% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -35px;
   }
   100% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -124px;
   }
}
</style>