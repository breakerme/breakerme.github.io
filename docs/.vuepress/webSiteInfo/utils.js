// 日期格式化(只获取年月日) - 使用本地时间
export function dateFormat(date) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  // 改用本地时间，不用 UTC
  return `${date.getFullYear()}-${zero(date.getMonth() + 1)}-${zero(date.getDate())}`;
}

// 小于10补0
export function zero(d) {
  return d.toString().padStart(2, '0');
}

/**
 * 计算最后活动时间
 */
export function lastUpdatePosts(posts) {
  posts.sort((prev, next) => {
    return compareDate(prev, next);
  });
  return posts;
}

// 获取时间的时间戳
export function getTimeNum(post) {
  let dateStr = post.lastUpdated || post.frontmatter.date;
  let date = new Date(dateStr);
  if (date == "Invalid Date" && dateStr) {
    date = new Date(dateStr.replace(/-/g, '/'));
  }
  return date.getTime();
}

// 比对时间
export function compareDate(a, b) {
  return getTimeNum(b) - getTimeNum(a);
}

/**
 * 获取两个日期相差多少天
 */
export function dayDiff(startDate, endDate) {
  if (!endDate) {
    endDate = startDate;
    startDate = new Date();
  }
  startDate = dateFormat(startDate);
  endDate = dateFormat(endDate);
  let day = parseInt(Math.abs(new Date(startDate) - new Date(endDate)) / (1000 * 60 * 60 * 24));
  return day;
}

/**
 * 计算相差多少年/月/日/时/分/秒
 */
export function timeDiff(startDate, endDate) {
  if (!endDate) {
    endDate = startDate;
    startDate = new Date();
  }

  // ✅ 添加调试日志
  console.log('startDate原始:', startDate);
  console.log('endDate原始:', endDate);

  if (!(startDate instanceof Date)) {
    startDate = new Date(startDate);
  }
  if (!(endDate instanceof Date)) {
    endDate = new Date(endDate);
  }

  console.log('时间戳差:', startDate - endDate);
  
  // 计算时间戳的差（绝对值）
  const diffValue = parseInt(Math.abs(startDate - endDate) / 1000);
  
  if (diffValue < 60) {
    return diffValue === 0 ? '刚刚' : diffValue + ' 秒';
  } else if (diffValue < 3600) {
    return parseInt(diffValue / 60) + ' 分';
  } else if (diffValue < 86400) {
    return parseInt(diffValue / 3600) + ' 时';
  } else if (diffValue < 2592000) { // 30天
    return parseInt(diffValue / 86400) + ' 天';
  } else if (diffValue < 31536000) { // 365天
    let months = parseInt(diffValue / 2592000);
    return months + ' 月';
  } else {
    let years = parseInt(diffValue / 31536000);
    return years + ' 年';
  }
}

/**
 * 👇 这个函数可以删掉了，上面已经不用了
 */
// export function getDays(mouth, year) {
//   let days = 30;
//   if (mouth === 2) {
//     days = year % 4 === 0 ? 29 : 28;
//   } else if (mouth === 1 || mouth === 3 || mouth === 5 || mouth === 7 || mouth === 8 || mouth === 10 || mouth === 12) {
//     days = 31;
//   }
//   return days;
// }