/*
 * 创建一个包含所有卡片的数组
 */
var cardsClassNameArray = [
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
 * 获取指定 DOM
 */
const deck = document.querySelector('.deck');
const moves = document.querySelectorAll('.moves');
const seconds = document.querySelectorAll('.seconds');
const restart = document.querySelector('.restart');
const result = document.querySelector('result');
const playAgain = document.querySelector('play-again');

let cards = document.getElementsByClassName('card');
let stars = document.getElementsByClassName('stars');

let currentClick = 0; //点击次数
let bothCardsIn = []; //卡片比较
let cardMates = 0; //成功配对

let currentClick = 0; //计时器

/* 
 * 重置游戏
 */

// 点击 restart 重置游戏
resetAll();
restart[0].onclick = resetAll;

function resetAll() {
    // 洗牌 
    shuffle(cardsClassNameArray);

    // 步数重置为0
    moves.innerText = 0;

    //卡片重置
    for (var i = 0; i < cards.length; i++) {
        cards[i].innerHTML = `<i class="fa ${cardsClassNameArray[i]}"></i>`;
        cards[i].className = "card";
    }
    // 点击次数重置为0
    currentClick = 0;
    // 卡片比较重置为0
    bothCardsIn = [];
    // 成功配对重置为0
    cardMates = 0;

    // 星星重置为3
    stars.innerHTML = "<li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li>";
}


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
}


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
