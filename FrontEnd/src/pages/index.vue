<template>
  <div class="index-page">
    <router-link class="btn btn-white btn-exlg" to="lost">找回我的卡</router-link>
    <router-link class="btn btn-white btn-exlg" to="found">捡到一张卡</router-link>
    <router-link class="btn btn-white btn-exlg"to="advice">我有一个建议...</router-link>
  </div>
</template>
<style lang="scss">
#app .index-page {
  text-align: center;
  .btn.btn-white {
    border-radius: 20px;
    line-height: 100px;
    display: block;
    margin: 30px auto;
    padding: 0;
    display: block;
    font-size: 20px;
    @media screen and (max-width:600px) {
      line-height: 80px;
      border-radius: 16px;
      margin: 25px auto;
    }
    @media screen and (max-width:360px) {
      line-height: 70px;
      border-radius: 12px;
      margin: 20px auto;
    }
  }
}
</style>
