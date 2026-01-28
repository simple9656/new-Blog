// 调试信息
console.log("Runtime JS 正在加载...");

function createtime() {
    // --------------------------------------------------
    // 1. 建站时间
    var grt = new Date("12/26/2025 00:00:00"); 
    // --------------------------------------------------

    var now = new Date();
    
    var days = (now - grt) / 1000 / 60 / 60 / 24;
    var dnum = Math.floor(days);
    
    var hours = (now - grt) / 1000 / 60 / 60 - (24 * dnum);
    var hnum = Math.floor(hours);
    if (String(hnum).length == 1) { hnum = "0" + hnum; }
    
    var minutes = (now - grt) / 1000 / 60 - (24 * 60 * dnum) - (60 * hnum);
    var mnum = Math.floor(minutes);
    if (String(mnum).length == 1) { mnum = "0" + mnum; }
    
    var seconds = (now - grt) / 1000 - (24 * 60 * 60 * dnum) - (60 * 60 * hnum) - (60 * mnum);
    var snum = Math.round(seconds);
    if (String(snum).length == 1) { snum = "0" + snum; }

    let footer = document.getElementById('footer-wrap');
    if (!footer) { footer = document.querySelector('footer'); }

    if (footer) {
        let runTimeBox = document.getElementById('runtime-box');
        if (!runTimeBox) {
            runTimeBox = document.createElement('div');
            runTimeBox.id = 'runtime-box';
            
            // ------------- 样式修改区 -------------
            runTimeBox.style.textAlign = 'center'; 
            runTimeBox.style.width = '100%';       
            
            // 1. 间距改小：之前是 15px，现在改成 5px，紧贴上一行
            runTimeBox.style.marginTop = '5px';    
            
            // 2. 颜色改成白色，和上面保持一致
            runTimeBox.style.color = '#ffffff'; 
            
            // 3. 加上文字阴影（描边效果），防止背景太亮看不清，风格也统一
            runTimeBox.style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.8)';
            
            runTimeBox.style.fontWeight = 'bold';   
            runTimeBox.style.zIndex = '9999';       
            runTimeBox.style.position = 'relative';
            // ------------------------------------
            
            footer.appendChild(runTimeBox);
        }
        
        runTimeBox.innerHTML = "joke的小世界已运行 " + dnum + " 天 " + hnum + " 小时 " + mnum + " 分 " + snum + " 秒";
    }
}

setInterval(createtime, 1000);
