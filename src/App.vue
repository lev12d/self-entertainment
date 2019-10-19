<template>
  <div id="app">
     <transition name="van-fade" mode="out-in">
      <keep-alive>
        <router-view/>
      </keep-alive>
      </transition>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none
}

</style>
