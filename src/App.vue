<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script type="text/javascript" src ="https://cdn.polyfill.io/v2/polyfill.min.js?features=es6"></script>
<script src = "https://cdn.polyfill.io/v2/polyfill.min.js"></script>
<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-size: 12px;
}
body {
  margin: 0 auto;
}
a {
  text-decoration: none;
  color: #000;
}

a:hover {
  text-decoration: underline;
}
ul,li {
  list-style: none;
  margin-top: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.el-input__inner {
  line-height: 0 !important;
}

.cover-bg {
  background: url('/static/images/coverall.png') no-repeat;
}

.list-bg {
    background: url(/static/images/index.png);
}
</style>
