// 动态加载 APlayer 的 CSS
var link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.css';
document.head.appendChild(link);

// 动态加载 APlayer 的 JS
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.js';
document.head.appendChild(script);

// 注入样式
var style = document.createElement('style');
style.innerHTML = `
    /* 主容器样式 */
    #aplayer-fixed {
        position: fixed;
        bottom: 20px;
        left: 20px;
        width: 340px;
        z-index: 9999;
        background: #fff;
        border-radius: 6px;
        box-shadow: 0 2px 15px rgba(0,0,0,0.2);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    }
  
    /* 封面可拖拽 */
    .aplayer-pic {
        cursor: move !important;
        z-index: 1002 !important; /* 确保封面也在高层级 */
    }
  
    /* 歌词点击穿透 */
    .aplayer-lrc {
        pointer-events: none !important;
    }

    /* === 终极修复核心代码 === */
    
    /* 1. 控制栏(Info)：强制置顶，锁定高度，纯白背景 */
    .aplayer .aplayer-info {
        position: relative !important;
        z-index: 1001 !important;
        background-color: #fff !important;
        padding-bottom: 10px !important; /* 增加底部内边距，给进度条留空间 */
        border-bottom: 1px solid #eee !important; /* 视觉分隔 */
        overflow: visible !important; /* 防止进度条圆点被切掉 */
        transform: translateZ(10px); /* 强制 GPU 分层 */
    }

    /* 2. 进度条区域：强制最高层级，扩大点击热区 */
    .aplayer-bar-wrap {
        position: relative !important;
        z-index: 1005 !important; /* 比 Info 还要高 */
        pointer-events: auto !important;
        cursor: pointer !important;
        height: 10px !important; /* 增加高度，更容易点中 */
    }
    
    /* 进度条本体 */
    .aplayer-bar {
        height: 4px !important; /* 视觉高度保持原样 */
        margin-top: 3px !important; /* 垂直居中 */
    }

    /* 3. 播放列表：强制下移，降低层级 */
    .aplayer .aplayer-list {
        position: relative !important;
        z-index: 999 !important;
        margin-top: 0px !important; /* 重置可能存在的负边距 */
        padding-top: 2px !important;
        border-top: none !important;
    }
    
    /* 列表项：防止点击事件冒泡干扰 */
    .aplayer .aplayer-list ol li {
        position: relative;
        z-index: 998;
        border-top: 1px solid #eee;
    }
`;
document.head.appendChild(style);

script.onload = function() {
    var apDiv = document.createElement('div');
    apDiv.id = 'aplayer-fixed';
    document.body.appendChild(apDiv);

    const ap = new APlayer({
        container: document.getElementById('aplayer-fixed'),
        fixed: false,      
        autoplay: false,
        theme: '#FADFA3',
        loop: 'all',
        order: 'list',
        preload: 'auto',
        listFolded: false, 
        listMaxHeight: 90, 
        lrcType: 1,        
        audio: [
            {
                name: 'luv u 2',
                artist: 'Seto',
                url: '/music/luvu2.mp3',
                cover: '/music/cover.jpg',
                lrc: '[00:00.00]luv u 2\n[00:05.00]Seto'
            },
            {
                name: '浆果',
                artist: 'TINY7',
                url: '/music/berry.mp3',
                cover: '/music/cover.jpg',
                lrc: '[00:00.00]浆果\n[00:05.00]TINY7'
            },
            {
                name: 'Re0 ED',
                artist: 'MYTH & ROID',
                url: '/music/Re0.mp3',
                cover: '/music/cover.jpg',
                lrc: '[00:00.00]Re0 ED\n[00:05.00]MYTH & ROID'
            },
            {
                name: 'Mr. Broken Heart',
                artist: '松下優也',
                url: '/music/Mr. Broken Heart.mp3',
                cover: '/music/cover.jpg',
                lrc: '[00:00.00]Mr. Broken Heart\n[00:05.00]松下優也'
            },
            {
                name: '茫',
                artist: '李润祺',
                url: '/music/茫.mp3',
                cover: '/music/cover.jpg',
                lrc: '[00:00.00]茫\n[00:05.00]李润祺'
            },
            {
                name: '暗叫',
                artist: 'きくお',
                url: '/music/暗叫.mp3',
                cover: '/music/cover.jpg',
                lrc: '[00:00.00]暗叫\n[00:05.00]きくお'
            },
            {
                name: 'Merry Christmas Mr. Lawrence',
                artist: '坂本龍一',
                url: '/music/Merry Christmas Mr. Lawrence.mp3',
                cover: '/music/cover.jpg',
                lrc: '[00:00.00]Merry Christmas Mr. Lawrence\n[00:05.00]坂本龍一'
            },
            {
                name: 'The Last String',
                artist: 'Jacoo; Oneira',
                url: '/music/The Last String.mp3',
                cover: '/music/cover.jpg',
                lrc: '[00:00.00]The Last String\n[00:05.00]Jacoo; Oneira'
            },
            {
                name: 'this is what winter feels like',
                artist: 'JVKE',
                url: '/music/this is what winter feels like.mp3',
                cover: '/music/cover.jpg',
                lrc: '[00:00.00]this is what winter feels like\n[00:05.00]JVKE'
            },         
            {
                name: 'Ethereal',
                artist: 'txmy',
                url: '/music/Ethereal.mp3',
                cover: '/music/cover.jpg',
                lrc: '[00:00.00]Ethereal\n[00:05.00]txmy'
            },
            {
                name: 'Red Moon',
                artist: 'Chill5',
                url: '/music/Red Moon.mp3',
                cover: '/music/cover.jpg',
                lrc: '[00:00.00]Red Moon\n[00:05.00]Chill5'
            },
            {
                name: 'Sweetly',
                artist: 'Lord Kael',
                url: '/music/Sweetly.mp3',
                cover: '/music/cover.jpg',
                lrc: '[00:00.00]Sweetly\n[00:05.00]Lord Kael'
            },
            {
                name: 'Phone Kisses',
                artist: 'suhmeduh',
                url: '/music/Phone Kisses.mp3',
                cover: '/music/cover.jpg',
                lrc: '[00:00.00]Phone Kisses\n[00:05.00]suhmeduh'
            }
        ]
    });

    // 拖拽功能
    const player = document.getElementById('aplayer-fixed');
    const handle = player.querySelector('.aplayer-pic');
  
    let isDragging = false;
    let hasMoved = false;
    let startX, startY, initLeft, initTop;

    handle.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return;
        isDragging = true;
        hasMoved = false;
      
        startX = e.clientX;
        startY = e.clientY;
      
        const rect = player.getBoundingClientRect();
        initLeft = rect.left;
        initTop = rect.top;
      
        player.style.left = initLeft + 'px';
        player.style.top = initTop + 'px';
        player.style.bottom = 'auto';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
      
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
      
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
            hasMoved = true;
            player.style.left = (initLeft + dx) + 'px';
            player.style.top = (initTop + dy) + 'px';
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // 防止拖动后触发暂停
    handle.addEventListener('click', (e) => {
        if (hasMoved) {
            e.stopImmediatePropagation();
            e.preventDefault();
            hasMoved = false;
        }
    }, true);
};
