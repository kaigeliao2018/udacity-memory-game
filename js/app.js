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
const result = document.querySelector('result');
const playAgain = document.querySelector('play-again');

let stars = document.querySelectorAll('.stars');

let sivId; //计时器
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
}

// 调用上面的函数将卡片添加到页面
displayCard(cardArray);

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






