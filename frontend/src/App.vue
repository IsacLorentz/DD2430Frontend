<template>
  <div>
    <prime-toast position="top-right" />
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style></style>
