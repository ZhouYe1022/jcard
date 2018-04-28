<template>
  <div id="app">
    <div class="container">
      <div class="app-header">
        <div class="logo">jCard</div>
        <p>Card Lost&amp;Found Service For SJTUers</p>
      </div>
      <div class="page-wrapper">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
      <div class="app-footer">
        <p class="main">jCard By ZhouYe, 2017</p>
        <p>累计帮助找回 4 张卡，当前 0 张待找回</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
      return {
        count: {}
      }
    },
    created() {
      this.$http.get('/api/usageCount').then((res) => {
        this.count = res.data.result;
      }, (e) => {
        console.log(e);
      })
    }
}
</script>
<style lang="scss">
.sweet-alert {
  background-color: rgba(255,255,255,0.9) !important;
}
#app {
  width: 100%;
  background-color: rgb(223,202,181);
  background-image: url("./assets/image02.jpg");
  background-size: cover;
  background-position: top center;
  color: #333;
  height: 100vh;
  overflow-y: scroll;
  .fade-enter-active,
  {
    transition: opacity .5s
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
  .transparent-wrapper h1 {
    font-weight: bold;
    font-size: 2em;
    margin: 0 0 0.75em 0;
    text-align: center;
  }
  .page-wrapper {
    margin: 10vh auto;
    max-width: 500px;
    min-height: 50vh;
    border-radius: 10px;
    width: 100%;
    @media screen and (max-width: 600px) {
      min-height: 40vh;
    }
  }
  .transparent-wrapper {
    font-size: 16px;
    color: #fff;
    text-shadow: 1px 1px 3px #333;
    padding: 50px 60px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.4);
    box-shadow: 0px 0px 3px #aaa;
    @media screen and (max-width: 600px) {
      font-size: 14px;
      padding: 30px 30px;
    }
    @media screen and (max-width: 360px) {
      padding: 25px 20px;
    }
    .btn-container {
      text-align: center;
    }
  }
  .form-control,
  .form-control[readonly] {
    box-shadow: none;
    transition: background ease 0.2s;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.5);
    border: none;
    outline: none;
    margin-bottom: 25px;
  }
  input.form-control {
    padding: 12px 16px;
  }
  textarea.form-control {
    resize: none;
    width: 100%;
    padding: 10px 15px;
  }
  .form-control:focus {
    background: rgba(255, 255, 255, 0.7);
  }
  .app-header {
    font-size: 20px;
    color: #fff;
    text-shadow: 1px 1px 5px #222;
    .logo {
      margin-top: 30px;
      margin-bottom: 10px;
      font-size: 2em;
    }
    @media screen and (max-width: 600px) {
      font-size: 16px;
    }
  }
  .app-footer {
    font-size: 14px;
    padding-bottom: 10vh;
    text-align: center;
    color: #fff;
    text-shadow: 1px 1px 5px #222;
    .main {
      font-size: 16px;
    }
  }
  .btn {
    margin: 8px 5px;
    text-align: center;
    padding: 0.6em 1.5em;
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none;
    min-width: 8em;
    @media screen and (max-width: 360px) {
      margin: 8px 4px;
      min-width: 6em;
    }
  }
  .btn.btn-white {
    color: #444;
    background: rgba(255, 255, 255, 0.5);
    box-shadow: 1px 1px 3px transparent;
    &:hover,
    &:active {
      box-shadow: 1px 1px 3px #666;
      background: rgba(255, 255, 255, 0.7);
    }
  }
}
</style>
