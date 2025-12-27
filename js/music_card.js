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
    #aplayer-fixed {
        position: fixed;
        bottom: 20px;
        left: 20px;
        width: 340px;
        z-index: 9999;
        background: #fff;
        border-radius: 6px;
        box-shadow: 0 2px 15px rgba(0,0,0,0.3);
    }
    
    /* 封面可拖拽 */
    .aplayer-pic {
        cursor: move !important;
    }
    
    /* 歌词不遮挡进度条 */
    .aplayer-lrc {
        pointer-events: none !important;
    }
    
    /* 进度条可点击 */
    .aplayer-bar-wrap {
        pointer-events: auto !important;
        z-index: 100 !important;
    }
`;
document.head.appendChild(style);

script.onload = function() {
    var apDiv = document.createElement('div');
    apDiv.id = 'aplayer-fixed';
    document.body.appendChild(apDiv);

    const ap = new APlayer({
        container: document.getElementById('aplayer-fixed'),
        fixed: false,      // 改为非吸底模式
        autoplay: false,
        theme: '#FADFA3',
        loop: 'all',
        order: 'list',
        preload: 'auto',
        listFolded: false,
        listMaxHeight: 90,
        lrcType: 1,        // 开启歌词
        audio: [
            {
                name: 'luv u 2',
                artist: 'Seto',
                url: '/music/luvu2.mp3',
                cover: '/music/cover.jpg',
                lrc: '[00:00.00]luv u 2\n[00:05.00]Seto' // 在这里添加您的歌词
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
