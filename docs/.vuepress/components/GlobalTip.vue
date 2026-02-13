<template>
  <div class="global-tip-test">
    🌟 全局提示组件加载成功！
  </div>
</template>

<script>
export default {
  name: 'GlobalTip',
  mounted() {
    console.log('✅ GlobalTip mounted')
    // 先测试能不能显示
  }
}
</script>

<style scoped>
.global-tip-test {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #42b983;
  color: white;
  padding: 12px 24px;
  border-radius: 30px;
  z-index: 9999;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
</style>