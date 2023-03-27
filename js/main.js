// キャンバスのサイズ管理
const canvasInfo = {
    size: {
        width: 600,
        height: 500,
    },
};
const sizeUnit = "px";
const image = {
    position: {
        height: 50,
        width: 150,
    },
};
const fillStartPostion = {
    x: 0,
    y: 0,
};

let currentImgPath;
const imagePathArray = [
    "img/clothes1.png",
    "img/clothes2.png",
    "img/clothes3.png",
];

const imageDataPath = imagePathArray[0];
currentImgPath = imageDataPath;

// キャンバスの情報取得
const canvasMain = document.getElementById("canvasMain");
const ctxMain = canvasMain.getContext("2d");

// キャンバスの情報取得
const canvasXor = document.getElementById("canvasXor");
const ctxXor = canvasXor.getContext("2d");

// スカートに対して色を乗算してカラーリング
ctxMain.fillStyle = "rgba(0, 0, 0, 0)";
ctxMain.fillRect(
    fillStartPostion.x,
    fillStartPostion.y,
    canvasInfo.size.width,
    canvasInfo.size.height
);
// "./img/clothes1.png";って書くとgithub Pagesだとエラーになるから注意
var imageObjA = new Image();
imageObjA.onload = function () {
    ctxMain.drawImage(imageObjA, image.position.width, image.position.height);
};
imageObjA.src = currentImgPath;
ctxMain.globalCompositeOperation = "multiply";

// スカート以外に対しての余白部分に対しての色の上書きによる視覚上の削除
ctxXor.fillStyle = "white"; //外側を白色に埋めてる
ctxXor.fillRect(
    fillStartPostion.x,
    fillStartPostion.y,
    canvasInfo.size.width,
    canvasInfo.size.height
);
var imageObjB = new Image();
imageObjB.onload = function () {
    ctxXor.drawImage(imageObjB, image.position.width, image.position.height);
};
imageObjB.src = currentImgPath;
ctxXor.globalCompositeOperation = "xor";

const callbackFunction = function (imagePath) {
    return function () {
        // 引数から渡されたimageの相対パスをこの関数内で使用しやすくするために変数に格納
        currentImgPath = imagePath;

        // clearRectしないと描画内容が新規更新されない。色がなぜか上塗りされる
        ctxMain.clearRect(
            fillStartPostion.x,
            fillStartPostion.y,
            canvasInfo.size.width,
            canvasInfo.size.height
        );
        // スカートに対して色を乗算してカラーリング
        ctxMain.fillStyle = "rgba(0, 0, 0, 0)";
        ctxMain.fillRect(
            fillStartPostion.x,
            fillStartPostion.y,
            canvasInfo.size.width,
            canvasInfo.size.height
        );
        // "./img/clothes1.png";って書くとgithub Pagesだとエラーになるから注意
        var imageObjA = new Image();
        imageObjA.onload = function () {
            ctxMain.drawImage(
                imageObjA,
                image.position.width,
                image.position.height
            );
        };
        imageObjA.src = currentImgPath;
        ctxMain.globalCompositeOperation = "multiply";

        // 白い側のcanvas
        ctxXor.clearRect(
            fillStartPostion.x,
            fillStartPostion.y,
            canvasInfo.size.width,
            canvasInfo.size.height
        );
        var imageObjB = new Image();
        imageObjB.onload = function () {
            ctxXor.drawImage(
                imageObjB,
                image.position.width,
                image.position.height
            );
        };
        imageObjB.src = currentImgPath;
    };
};

// ボタンクリックした際に指定色を重ねる
const colorButton = document.getElementById("btn");
colorButton.addEventListener("click", function () {
    const color = document.getElementById("addColor");

    const rgbRed = parseInt(color.value.substring(1, 3), 16);
    const rgbGreen = parseInt(color.value.substring(3, 5), 16);
    const rgbBlue = parseInt(color.value.substring(5, 7), 16);
    console.log(`RGB: ${rgbRed},${rgbGreen},${rgbBlue}`);

    // clearRectしないと描画内容が新規更新されない。色がなぜか上塗りされる
    ctxMain.clearRect(
        fillStartPostion.x,
        fillStartPostion.y,
        canvasInfo.size.width,
        canvasInfo.size.height
    );

    ctxMain.fillStyle = `rgba(${rgbRed},${rgbGreen},${rgbBlue}, 0.7)`;
    ctxMain.fillRect(
        fillStartPostion.x,
        fillStartPostion.y,
        canvasInfo.size.width,
        canvasInfo.size.height
    );

    var imageObjA = new Image();
    imageObjA.onload = function () {
        ctxMain.drawImage(
            imageObjA,
            image.position.width,
            image.position.height
        );
    };
    imageObjA.src = currentImgPath;

    // スカート以外に対しての余白部分に対しての色の上書きによる視覚上の削除
    ctxXor.clearRect(
        fillStartPostion.x,
        fillStartPostion.y,
        canvasInfo.size.width,
        canvasInfo.size.height
    );
    ctxXor.fillStyle = "white"; //外側を白色に埋めてる

    ctxXor.fillRect(
        fillStartPostion.x,
        fillStartPostion.y,
        canvasInfo.size.width,
        canvasInfo.size.height
    );
    var imageObjB = new Image();
    imageObjB.onload = function () {
        ctxXor.drawImage(
            imageObjB,
            image.position.width,
            image.position.height
        );
    };
    imageObjB.src = currentImgPath;
    ctxXor.globalCompositeOperation = "xor";
});

// clothes1のボタン
const clothesButtonA = document.getElementById("a");
clothesButtonA.addEventListener("click", callbackFunction(imagePathArray[0]));

// cloth2のボタン
const clothesButtonB = document.getElementById("b");
clothesButtonB.addEventListener("click", callbackFunction(imagePathArray[1]));

// cloth3のボタン
const clothesButtonC = document.getElementById("c");
clothesButtonC.addEventListener("click", callbackFunction(imagePathArray[2]));

// addEventListenerのコールバック関数を切り出すためには下記のような記述をする必要がある
// https://blog.enjoitech.com/article/222
// var callback = function (path) {
//     return function () {
//         console.log(`path is ${path}`);
//     };
// };
// clothesButtonC.addEventListener("click", callback(imagePathArray[2]));

// 参照サイト
// https://www.google.com/search?q=globalcompositeoperation+canvas+double&rlz=1C5CHFA_enJP844JP845&sxsrf=ALiCzsY5_9GZB_wjgSpFOzDtone36AKQ1Q:1667776686847&ei=rkBoY4auM8LCoASywYLYDg&start=10&sa=N&ved=2ahUKEwiGve-n2Jr7AhVCIYgKHbKgAOsQ8NMDegQIKBAW&biw=834&bih=639&dpr=2
// https://stackoverflow.com/questions/53622774/globalcompositeoperation-on-2-canvases
// https://note.affi-sapo-sv.com/js-globalcompositeoperation.php#i1
// https://codepen.io/rgraph/full/MWGRgEQ
// https://www.rgraph.net/canvas/reference/globalcompositeoperation.html
// https://www.tohoho-web.com/html/memo/canvas-2d.htm
// https://stackoverflow.com/questions/18598838/canvas-fillstyle-none-in-html5

// https://ics.media/entry/7258/
// https://pengi-n.co.jp/blog/mix-blend-mode/

// canvas Library一覧
// https://www.webopixel.net/javascript/844.html
