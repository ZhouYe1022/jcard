<template>
  <div class="page-lost">
    <form class="transparent-wrapper" v-if="currentStage === 'card-info-form'" @submit.prevent="queryExistRecord">
      <h1>找回我的卡</h1>
      <p>在下方输入校园卡信息</p>
      <input type="text" class="form-control" required placeholder="输入姓名" v-model="userInput.cardName">
      <input type="text" class="form-control" required placeholder="输入学号" v-model="userInput.cardNumber">
      <div class="btn-container">
        <button class="btn btn-white" type="submit">提交</button>
        <button type="button" class="btn btn-white" @click="backToIndex">取消</button>
      </div>
    </form>
    <form class="transparent-wrapper" v-if="currentStage === 'contact-info-form'" @submit.prevent="createNewRecord">
      <h1>找回我的卡</h1>
      <p>当前还没有人捡到这张卡<br>姓名 <b>{{userInput.cardName}}</b>&nbsp;&nbsp;&nbsp;学号 <b>{{userInput.cardNumber}}</b></p>
      <textarea v-model="userInput.message" rows="9" class="form-control" placeholder="请在此输入你的联系方式，以便找到卡的小伙伴及时联系你" required></textarea>
      <div class="btn-container">
        <button class="btn btn-white" type="submit">提交</button>
        <button type="button" class="btn btn-white" @click="backToIndex">取消</button>
      </div>
    </form>
    <div class="transparent-wrapper" v-if="currentStage === 'record-found-result'">
      <h1>找回我的卡</h1>
      <p>恭喜！有小伙伴捡到了你的校园卡
        <br>你可以根据小伙伴留下的信息联系 TA</p>
      <p>登记时间: {{result.CreateTime | datetime}}</p>
      <textarea :value="result.Message" rows="9" class="form-control" readonly></textarea>
      <p>若你已找回校园卡，记得标记为已找到噢</p>
      <div class="btn-container">
        <button class="btn btn-white" @click="resolveRecord">标记为已找到</button>
        <button class="btn btn-white" @click="backToIndex">取消</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
      return {
        currentStage: 'card-info-form',
        userInput: {
          cardNumber: '',
          cardName: '',
          message: ''
        },
        result: {},
        requesting: false
      }
    },
    methods: {
      backToIndex() {
        this.$router.push({
          name: 'index'
        });
      },
      queryExistRecord() {
        this.$http.get('/api/found', {
          params: {
            OwnerName: this.userInput.cardName,
            CardNumber: this.userInput.cardNumber,
            Status: 0
          }
        }).then((res) => {
          if (res.data.result.length > 0) {
            this.result = res.data.result[0];
            this.currentStage = 'record-found-result';
          } else {
            this.currentStage = 'contact-info-form';
          }
        }, (e) => {
          window.sweetAlert('请求出错了', e.data || e, 'error');
        });
      },
      createNewRecord() {
        this.$http.post('/api/lost', {
          OwnerName: this.userInput.cardName,
          CardNumber: this.userInput.cardNumber,
          Message: this.userInput.message
        }).then((res) => {
          window.sweetAlert('成功', '已经添加记录，等待捡到卡的小伙伴联系你吧');
          this.backToIndex();
        }, (e) => {
          window.sweetAlert('请求出错了', e.data || e, 'error');
        });
      },
      resolveRecord() {
        this.$http.put('/api/found/' + this.result.id, {
          Status: 1,
          CardNumber: this.userInput.cardNumber
        }).then((res) => {
          window.sweetAlert('成功', '已经标记为已找到');
          this.backToIndex();
        }, (e) => {
          window.sweetAlert('请求出错了', e.data || e, 'error');
        });
      }
    }

}
</script>
<style lang="scss">
.page-lost {}
</style>
