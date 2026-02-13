<template>
  <div class="test-tip">
    🎉 全局组件加载成功！
  </div>
</template>
<script>
// 首页是否开启时间消息提示，默认 false。因为首页大图模块已经内置时间消息提示，所以这里不需要开启，如果您不使用首页大图模块，可以将此值设置为 true。
const indexTip = false;
export default {
  name: 'GlobalTip',
  mounted() {
    console.log('✅ GlobalTip 组件已挂载')
    alert('组件加载成功！') // 测试用，能弹窗就说明成功了

    // 首页不弹出消息提示，因为首页大图模块已经内置首页的消息提示
    if (indexTip || this.$route.path != "/") {
      this.bgTimeColor();
    }
  },
  watch: {
    $route(to, from) {
      let gloablTip = document.getElementsByClassName("gloablTip");
      // 如果已经存在一个消息提示，则不会重新弹出，除非消息提示已经消失
      if(gloablTip.length <= 0){
        if (indexTip || (this.$route.path != "/" && this.$route.hash == "")) {
          this.bgTimeColor();
        }
      }
    },
  },
  methods: {
    bgTimeColor() {
      var hours = new Date().getHours();
      var minutes = new Date().getMinutes();
      var seconds = new Date().getSeconds();
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      let div = document.createElement("div");
      div.className = "banner-color";
      if (hours >= 6 && hours < 11) {
        addTip(
          `早上好呀~~，现在是 ${hours}:${minutes}:${seconds}，吃早餐了吗？😊🤭`,
          "info",
          50,
          4000
        );
      } else if (hours >= 12 && hours <= 16) {
        addTip(
          `下午好呀~~，现在是 ${hours}:${minutes}:${seconds}，繁忙的下午也要适当休息哦🥤🏀~~`,
          "info",
          50,
          4000
        );
      } else if (hours >= 16 && hours <= 19) {
        addTip(
          `到黄昏了~~，现在是 ${hours}:${minutes}:${seconds}，该准备吃饭啦🥗🍖~~`,
          "info",
          50,
          4000
        );
      } else if (hours >= 19 && hours < 24) {
        addTip(
          `晚上好呀~~，现在是 ${hours}:${minutes}:${seconds}，该准备洗漱睡觉啦🥱😪~~`,
          "info",
          50,
          4000
        );
      } else if (hours >= 0 && hours < 6) {
        addTip(
          `别再熬夜了~~，现在是 ${hours}:${minutes}:${seconds}，早点睡吧，让我们一起欣赏早上的太阳~~😇🛏`,
          "info",
          50,
          4000
        );
      }
      document.body.append(div);
    },
  },
};

/**
 * 添加消息提示
 * content：内容
 * type：弹窗类型（tip、success、warning、danger）
 * startHeight：第一个弹窗的高度，默认 50
 * dieTime：弹窗消失时间（毫秒），默认 3000 毫秒
 * 
 * 在 head 里添加图标 link 地址：https://at.alicdn.com/t/font_3114978_qe0b39no76.css
 */
function addTip(content, type, startHeight = 50, dieTime = 3000) {
  var tip = document.querySelectorAll(".global-tip");
  var time = new Date().getTime();
  // 获取最后消息提示元素的高度
  var top = tip.length == 0 ? 0 : tip[tip.length - 1].getAttribute("data-top");
  // 如果产生两个以上的消息提示，则出现在上一个提示的下面，即高度添加，否则默认 50
  var lastTop =
    parseInt(top) +
    (tip.length != 0 ? tip[tip.length - 1].offsetHeight + 17 : startHeight);

  let div = document.createElement("div");
  div.className = `global-tip tip-${type} ${time} gloablTip`;
  div.style.top = parseInt(top) + "px";
  div.setAttribute("data-top", lastTop);
  if (type == "info" || type == 1) {
    div.innerHTML = `<i class="iconfont icon-info icon"></i><p class="tip-info-content">${content}</p>`;
  } else if (type == "success" || type == 2) {
    div.innerHTML = `<i class="iconfont icon-dagouyouquan icon"></i><p class="tip-success-content">${content}</p>`;
  } else if (type == "danger" || type == 3) {
    div.innerHTML = `<i class="iconfont icon-cuowu icon"></i><p class="tip-danger-content">${content}</p>`;
  } else if (type == "warning" || type == 4) {
    div.innerHTML = `<i class="iconfont icon-gantanhao icon"></i><p class="tip-warning-content">${content}</p>`;
  }
  document.body.appendChild(div);

  let timeTip = document.getElementsByClassName(time)[0];
  setTimeout(() => {
    timeTip.style.top = parseInt(lastTop) + "px";
    timeTip.style.opacity = "1";
  }, 10);

  // 消息提示 dieTime 秒后隐藏并被删除
  setTimeout(() => {
    timeTip.style.top = "0px";
    timeTip.style.opacity = "0";

    // 下面的所有元素回到各自曾经的出发点
    var allTipElement = nextAllTipElement(timeTip);
    for (let i = 0; i < allTipElement.length; i++) {
      var next = allTipElement[i];
      var top =
        parseInt(next.getAttribute("data-top")) - next.offsetHeight - 17;
      next.setAttribute("data-top", top);
      next.style.top = top + "px";
    }
    setTimeout(() => {
      timeTip.remove();
    }, 500);
  }, dieTime);
}
/**
 * 获取后面的兄弟元素
 */
function nextAllTipElement(elem) {
  var r = [];
  var n = elem;
  for (; n; n = n.nextSibling) {
    if (n.nodeType === 1 && n !== elem) {
      r.push(n);
    }
  }
  return r;
}


</script>

<style>
.test-tip {
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  background: #42b983;
  color: white;
  padding: 20px;
  border-radius: 8px;
  z-index: 999999;
  font-size: 20px;
}

/* 提示框元素 */
.global-tip {
  position: fixed;
  display: flex;
  top: -10px;
  left: 50%;
  opacity: 0;
  min-width: 320px;
  transform: translateX(-50%);
  transition: opacity 0.3s linear, top 0.4s, transform 0.4s;
  z-index: 99999;
  padding: 15px 15px 15px 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  grid-row: 1;
  line-height: 17px;
}

.global-tip p {
  line-height: 17px;
  margin: 0;
  font-size: 14px;
}

.icon {
  margin-right: 10px;
  line-height: 17px;
}

.tip-success {
  color: #67c23a;
  background-color: #f0f9eb;
  border-color: #e1f3d8;
}

.tip-success .tip-success-content {
  color: #67c23a;
}

.tip-danger {
  color: #f56c6c;
  background-color: #fef0f0;
  border-color: #fde2e2;
}

.tip-danger .tip-danger-content {
  color: #f56c6c;
}

.tip-info {
  background-color: #edf2fc;
  border-color: #ebeef5;
}

.tip-info .tip-info-content {
  color: #909399;
}

.tip-warning {
  color: #e6a23c;
  background-color: #fdf6ec;
  border-color: #faecd8;
}

.tip-warning .tip-warning-content {
  margin: 0;
  color: #e6a23c;
  line-height: 21px;
  font-size: 14px;
}
</style>
