/*
 * 创建一个包含所有卡片的数组
 */
var cardArray = [
    'fa-anchor',
    'fa-anchor',
    'fa-bicycle',
    'fa-bicycle',
    'fa-bolt',
    'fa-bolt',
    'fa-bomb',
    'fa-bomb',
    'fa-cube',
    'fa-cube',
    'fa-diamond',
    'fa-diamond',
    'fa-leaf',
    'fa-leaf',
    'fa-paper-plane-o',
    'fa-paper-plane-o'
];

/* 
 * 获取 DOM
 */
const deck = document.querySelector('.deck');
const moves = document.querySelectorAll('.moves');
const seconds = document.querySelectorAll('.seconds');
const restart = document.querySelector('.restart');
const result = document.querySelector('.result');
const playAgain = document.querySelector('.play-again');

let stars = document.querySelectorAll('.stars');

let sivId; //计时器的ID
let currentClick = 0; //点击次数
let openCard = []; //临时打开的两个卡片
let cardMatch = 0; //成功配对次数

/*
 * 显示页面上的卡片
 *   - 使用下面提供的 "shuffle" 方法对数组中的卡片进行洗牌
 *   - 循环遍历每张卡片，创建其 HTML
 *   - 将每张卡的 HTML 添加到页面
 */

// 洗牌函数来自于 http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

// 随机创建卡片元素
function displayCard(card) {
    const cardList = shuffle(card);
    for (let x = 0; x < cardList.length; x++) {
        let li = document.createElement('li');
        li.className = 'card';
        li.innerHTML = `<i class="fa ${cardList[x]}"></i>`;
        deck.appendChild(li);
    }
};

/*
 * 设置一张卡片的事件监听器。 如果该卡片被点击：
 *  - 显示卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 将卡片添加到状态为 “open” 的 *数组* 中（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 如果数组中已有另一张卡，请检查两张卡片是否匹配
 *    + 如果卡片匹配，将卡片锁定为 "open" 状态（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果卡片不匹配，请将卡片从数组中移除并隐藏卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 增加移动计数器并将其显示在页面上（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果所有卡都匹配，则显示带有最终分数的消息（将这个功能放在你从这个函数中调用的另一个函数中）
 */


/* 
 * 主要游戏逻辑
 */

//创建卡片被点击后的事件
function clickCard() {
    //创建变量，对比卡片翻开后是否匹配
    let card1, card2;
    //创建变量，对比卡片类名
    let cardName1, cardName2;
    const cardLi = deck.querySelectorAll('.card');
    for (let x = 0; x < cardLi.length; x++) {
        cardLi[x].onclick = function () {
            if (this.className === 'card') {
                currentClick++;
                //开始游戏：计时器开始计时
                if (currentClick === 1) {
                    sivId = setInterval(function () {
                        seconds[0].innerText++;
                    }, 1000)
                }
                //游戏规则：点击超过14则2星
                if (moves[0].innerText === '14') {
                    removeStars(stars[0]);
                    removeStars(stars[1]);
                    // 游戏规则：超过20下则只得1星（14下以内则3星）
                } else if (moves[0].innerText === '20') {
                    removeStars(stars[0]);
                    removeStars(stars[1])
                }
                //临时存放两个对比卡片，将目标加入到正确的类中
                this.className = 'card show open';
                //当卡片数量超过两个的时候清空，
                if (openCard.length === 2) {
                    openCard = [];

                }
                //步数的算法：点击2下为1步
                if (currentClick % 2 === 0) {
                    moves[0].innerText = currentClick / 2;
                    moves[1].innerText = currentClick / 2;
                }
                openCard[(currentClick + 1) % 2] = this.childNodes[0];
                //将临时存放的两个卡片进行对比
                if (openCard.length === 2) {
                    card2 = this;
                    cardName2 = this.childNodes[0].className.substr(3);
                    // 当卡片匹配时
                    if (cardName1 === cardName2) {
                        card1.className = 'card show match';
                        card2.className = 'card show match';
                        cardMatch++;
                        //当匹配次数=卡片数/2时，游戏结束，停止计时
                        if (cardMatch === cardArray.length / 2) {
                            if (sivId) {
                                clearInterval(sivId);
                                seconds[1].innerText = seconds[0].innerText;
                            }
                            setTimeout(function () {
                                result.style.top = "30%";
                            }, 500)
                        }
                        // 当卡片不匹配时
                    } else {
                        card1.className = 'card show dismatch';
                        card2.className = 'card show dismatch';
                        if (this.className.includes('dismatch')) {
                            let out1 = card1;
                            let out2 = card2;
                            setTimeout(function () {
                                out1.className = 'card';
                                out2.className = 'card';
                            }, 1000)
                        }
                    }
                    //创建 变量 Card1
                } else if (openCard.length === 1) {
                    card1 = this;
                    cardName1 = this.childNodes[0].className.substr(3);
                }
            }
        }
    }
};

//重置游戏
function restartGame(button) {
    button.onclick = function () {
        location.reload();
    }
}
//移除星星
function removeStars(star) {
    star.removeChild(star.childNodes[0]);
}

//调用函数
displayCard(cardArray);
clickCard();
restartGame(restart);

// 游戏结束后弹窗
playAgain.onclick = function () {
    location.reload();
    setTimeout(function () {
        result.style.top = "-2000px";
    }, 1000)
};