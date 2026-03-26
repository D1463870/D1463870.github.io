const fortunes = [
    { type: '大吉', desc: '星辰庇佑，萬事順遂。今天將會有意想不到的好消息降臨。' },
    { type: '吉', desc: '迷霧漸散，前路清晰。穩步前進，你的努力即將獲得回報。' },
    { type: '平', desc: '風平浪靜，隨遇而安。保持平常心，這是一個積蓄能量的好時機。' },
    { type: '小凶', desc: '暗潮湧動，需提高警覺。今日不宜作重大決定，請謹慎行事。' },
    { type: '凶', desc: '烏雲蔽日，阻礙重重。避免與人起衝突，靜待霉運過去。' }
];

const crystalContainer = document.querySelector('.crystal-container');
const crystalBall = document.getElementById('crystal-ball');
const resultArea = document.getElementById('result-area');
const fortuneTitle = document.getElementById('fortune-title');
const fortuneDesc = document.getElementById('fortune-desc');
const historyList = document.getElementById('history-list');

let isDivining = false;

crystalContainer.addEventListener('click', () => {
    if (isDivining) return;
    
    // 開始占卜動畫
    isDivining = true;
    crystalBall.classList.add('shaking');
    crystalContainer.classList.add('active');
    
    // 隱藏先前的結果
    resultArea.style.display = 'block';
    resultArea.classList.add('hidden');
    resultArea.style.opacity = '0';
    
    // 移除現有的結果顏色class
    fortuneTitle.className = '';
    
    // 模擬占卜時間 (2秒)
    setTimeout(() => {
        revealFortune();
        crystalBall.classList.remove('shaking');
        crystalContainer.classList.remove('active');
        isDivining = false;
    }, 2000);
});

function revealFortune() {
    // 隨機抽取運勢
    const randomIndex = Math.floor(Math.random() * fortunes.length);
    const result = fortunes[randomIndex];
    
    // 顯示結果
    fortuneTitle.textContent = result.type;
    fortuneTitle.classList.add(`fortune-${result.type}`);
    fortuneDesc.textContent = result.desc;
    
    // 讓淡入動畫生效
    setTimeout(() => {
        resultArea.style.opacity = '1';
        resultArea.classList.remove('hidden');
    }, 50);
    
    // 記錄到歷史
    addHistory(result.type);
}

function addHistory(type) {
    const emptyMsg = document.querySelector('.empty-msg');
    if (emptyMsg) {
        emptyMsg.remove();
    }
    
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    
    const li = document.createElement('li');
    li.innerHTML = `
        <span class="history-result fortune-${type}">${type}</span>
        <span class="history-time">${timeStr}</span>
    `;
    
    // 將新紀錄加到最前面
    historyList.insertBefore(li, historyList.firstChild);
}
