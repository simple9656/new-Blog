// 樱花特效 - 纯代码绘制版 (避免图片加载失败)
(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    window.requestAnimationFrame = requestAnimationFrame;
})();

// 花瓣类
var Petal = function() {
    this.x = Math.random() * canvas.width;
    this.y = (Math.random() * canvas.height * 2) - canvas.height;
    this.w = 25 + Math.random() * 15; // 花瓣宽度
    this.h = 20 + Math.random() * 10; // 花瓣高度
    this.opacity = this.w / 45;
    this.flip = Math.random();
    
    this.xSpeed = 1.5 + Math.random() * 2;
    this.ySpeed = 1 + Math.random() * 1;
    this.flipSpeed = Math.random() * 0.03;
};

Petal.prototype.draw = function() {
    if (this.y > canvas.height || this.x > canvas.width) {
        this.x = -this.w;
        this.y = (Math.random() * canvas.height * 2) - canvas.height;
        this.xSpeed = 1.5 + Math.random() * 2;
        this.ySpeed = 1 + Math.random() * 1;
        this.flip = Math.random();
    }
    ctx.globalAlpha = this.opacity;
    // 绘制花瓣形状
    ctx.drawImage(
        petalImg, 
        this.x, 
        this.y, 
        this.w * (0.6 + (Math.abs(Math.cos(this.flip)) / 3)), 
        this.h * (0.8 + (Math.abs(Math.sin(this.flip)) / 5))
    );
};

Petal.prototype.animate = function() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.draw();
    this.flip += this.flipSpeed;
};

var canvas = document.createElement('canvas');
canvas.id = 'canvas_sakura';
canvas.style.cssText = 'position:fixed;top:0;left:0;z-index:999999;pointer-events:none'; // 层级设为最高，防止被背景遮挡
document.body.appendChild(canvas);

var ctx = canvas.getContext('2d');
var petalImg = new Image();

// 使用 Canvas 预先绘制一个花瓣图片，避免加载外部资源
var tempCanvas = document.createElement('canvas');
tempCanvas.width = 50;
tempCanvas.height = 50;
var tCtx = tempCanvas.getContext('2d');
// 绘制粉色花瓣形状
tCtx.beginPath();
tCtx.moveTo(0, 0);
tCtx.quadraticCurveTo(25, -25, 50, 0);
tCtx.quadraticCurveTo(25, 50, 0, 0);
tCtx.fillStyle = '#FFC0CB'; // 粉色
tCtx.fill();
tCtx.closePath();
petalImg.src = tempCanvas.toDataURL(); // 转为图片

var petals = [];
var numPetals = 50; // 花瓣数量

// 初始化
function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    for (var i = 0; i < numPetals; i++) {
        petals.push(new Petal());
    }
    render();
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals.forEach(function(petal) {
        petal.animate();
    });
    requestAnimationFrame(render);
}

// 监听窗口大小变化
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// 启动
petalImg.onload = function() {
    init();
}
// 兼容 Pjax
document.addEventListener('pjax:complete', function () {
    // 这里的逻辑稍微简单点，只要保证 canvas 还在就行，不需要重新创建，因为它是 fixed 定位的
});

console.log("樱花脚本已加载！"); 
