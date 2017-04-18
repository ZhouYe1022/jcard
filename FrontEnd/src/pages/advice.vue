<template>
  <div class="advice-page">
    <form class="transparent-wrapper" @submit.prevent="submitForm">
      <h1>提交建议</h1>
      <input type="email" class="form-control" placeholder="填写你的邮箱" v-model="email" required>
      <textarea class="form-control" rows="7" placeholder="填写你的建议" v-model="message" required></textarea>
      <div class="btn-container">
        <button type="submit" class="btn btn-white">提交</button>
        <button type="button" class="btn btn-white" @click="backToIndex">取消</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: '',
      message: ''
    };
  },
  methods: {
    submitForm() {
      this.$http.post('/api/advice', {
        Email: this.email,
        Message: this.message
      }).then((res) => {
        window.sweetAlert('成功', '建议已提交');
        this.backToIndex();
      }, (e) => {
        window.sweetAlert('请求出错了', e.data || e, 'error');
      });
    },
    backToIndex() {
      this.$router.push({
        name: 'index'
      });
    }
  }
}
</script>
<style lang="scss">
</style>
