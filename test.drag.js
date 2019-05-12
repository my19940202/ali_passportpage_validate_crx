
let globalX = 0;
let globalY = 0;
let fakeMove1 = [
    [-1, 0],
    [-2, 1],
    [-2, 0],
    [-1, 0],
    [-2, 1],
    [-1, 0],
    [0, 0],
    [-1, 0],
    [0, 0],
    [-1, 0],
    [0, 0],
    [-1, 0],
    [0, 0],
    [-1, 0],
    [-4, 0],
    [-5, 0],
    [-6, 0],
    [-26, 3],
    [-13, 2],
    [-14, 2],
    [-15, 1],
    [-13, 3],
    [-14, 1],
    [-15, 2],
    [-5, 1],
    [-11, 1]
];
let fakeMove2 = [
    [0, -2],
    [-1, -1],
    [0, -1],
    [-1, -1],
    [0, -1],
    [0, 0],
    [0, -1],
    [0, 0],
    [0, -1],
    [0, 0],
    [0, -1],
    [0, 0],
    [0, -1],
    [0, 0],
    [-1, 0],
    [0, 0],
    [-3, 0],
    [-1, 0],
    [-2, 0],
    [-1, 0],
    [-2, 0],
    [-1, 0],
    [-2, 0],
    [-1, 0],
    [-2, 0],
    [-1, -1],
    [-2, -1],
    [-2, 0],
    [-1, -1],
    [-1, 0],
    [-2, -1],
    [0, 0],
    [-1, 0],
    [-1, -1],
    [0, 0],
    [-1, -1],
    [0, 0],
    [-1, 0],
    [0, -1],
    [0, 0],
    [-1, 0],
    [0, 0],
    [0, 1],
    [0, 0],
    [0, 1],
    [1, 0],
    [0, 1],
    [0, 0],
    [1, 1],
    [0, 0],
    [0, 1],
    [0, 0]
];
let fakeMove3 = [
    [-3, 0],
    [-1, 0],
    [-4, 2],
    [-2, 0],
    [-2, 1],
    [-2, 0],
    [-2, 1],
    [-1, 0],
    [-1, 1],
    [-1, 0],
    [0, 0],
    [-1, 0],
    [0, 0],
    [-2, 0],
    [-1, 0],
    [-3, 0],
    [0, 0],
    [-2, 0],
    [-1, 1],
    [-1, 2],
    [0, 1],
    [0, 2],
    [0, 1],
    [1, 2],
    [1, 0],
    [1, 1],
    [0, 1],
    [1, 0],
    [0, 0],
    [0, 1],
    [0, 0],
    [-10, 0],
    [-3, 0],
    [-2, 0],
    [-3, 0],
    [-1, 1],
    [-3, 1],
    [-3, 0],
    [-2, 2],
    [-6, 3],
    [-9, 7]
];

let fakeDragMove = [
    fakeMove1,
    fakeMove2,
    fakeMove3
];

async function trigMouseEvt(el, eventType, x, y, mx, my) {
    return new Promise((resolve, reject) => {
        try {
            resolve(1);
            if (el) {
                // 获取目标元素的坐标、大小
                let rect = el.getBoundingClientRect();
                // 初始化
                globalX = globalX === 0 ? rect.left : globalX;
                globalY = globalY === 0 ? rect.top : globalY;
                // 构建ClickEvent
                globalX = (x || 0) + globalX;
                globalY = (y || 0) + globalY;
                let clickEvt = new MouseEvent(eventType, {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    clientX: globalX,
                    clientY: globalY,
                    pageX: globalX,
                    pageY: globalY,
                    layerX: globalX,
                    layerY: globalY,
                    x: globalX,
                    y: globalY,
                    screenX: globalX + 10,
                    screenY: globalY + 200,
                    movementX: mx || 0,
                    movementY: my || 0
                });
                el.dispatchEvent(clickEvt);
            }
            else {
                console.log('invalid dom', el);
            }

        } catch (e) {
            reject(0);
        }
    });
}

let timeout = function (delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(1);
            } catch (e) {
                reject(0);
            }
        }, delay);
    });
};

// 页面onload 1s后进行模拟点击
window.onload = async () => {
    await timeout(1000);
    run();
};

async function moreClick(canvas) {
    let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29];
    let timegap = (Math.random() * 10 % 10).toFixed();
    for (const item of arr) {
        let offsetX = 10;
        await trigMouseEvt(canvas, 'mousedown', offsetX, 0);
        await timeout(timegap);
        await trigMouseEvt(canvas, 'mouseup');
    }
}

async function run() {
    // 方案1 简单点击 加上 一两次drga
    let canvas = document.getElementById('nc_1_canvas');
    let rect = canvas.getBoundingClientRect();
    globalX = rect.left;
    globalY = rect.top + 10;
    let arr = [1, 2, 3, 4, 5, 6, 7, 8];

    for (const step of arr) {
        await moreClick(canvas);
        await timeout(10);
        globalY += 10;
        globalX = 0;
    }
    await fakeDrag(canvas, rect);
}

// 此处需要模拟人的真实滑动
async function fakeDrag(canvas, pos) {
    console.log('start fakeDrag');
    // 使用真实的movement数组重现滑动数据 可以准备多个防止路径重复被发现
    globalX = pos.left + (+(Math.random() * 200).toFixed());
    globalY = pos.top + (+(Math.random() * 80).toFixed());
    await trigMouseEvt(canvas, 'mousemove');
    await trigMouseEvt(canvas, 'mousedown');
    let moveArr = fakeDragMove[(Math.random() * 10 % 2).toFixed()];
    for (const move of moveArr) {
        // fake人类模拟滑动
        let timegap = (Math.random() * 10 % 10).toFixed();
        let mx = move[0];
        let my = move[1];
        if (timegap % 3) {
            mx = move[0] - 1;
            my = move[1] + 1;
        }
        if (timegap % 4) {
            mx = move[0] + 1;
            my = move[1] - 1;
        }
        await trigMouseEvt(canvas, 'mousemove', mx, my, mx, my);
        await timeout(timegap);
    }
    await trigMouseEvt(canvas, 'mouseup');
    console.log('end fakeDrag');
}
