// 动态切换背景图脚本
(function() {
  // 定义背景图列表 (注意：所有链接都要用引号包起来，并用逗号隔开)
  const bgList = [
    "https://picsum.photos/1920/1080?random=1",
    "https://picsum.photos/1920/1080?random=2",
    "https://picsum.photos/1920/1080?random=3",
    "https://picsum.photos/1920/1080?grayscale&random=1",
    "https://bing.biturl.top/?resolution=1920&format=image&index=0&mkt=zh-CN",
    "https://api.paugram.com/wallpaper/?source=sm",
    "https://api.isoyu.com/bing_images.php",
    "https://www.dmoe.cc/random.php",
    "/img/1.jpg"
  ];

  // 1. 随机选一张
  const randomImg = bgList[Math.floor(Math.random() * bgList.length)];
  
  // 2. 获取网页的大背景元素
  const webBg = document.getElementById('web_bg');
  
  // 3. 只有当背景元素存在时才修改
  if (webBg) {
    webBg.style.backgroundImage = `url(${randomImg})`;
    // console.log("当前背景图已切换为: " + randomImg);
  }
})();
