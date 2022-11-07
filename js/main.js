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

// キャンバスの情報取得
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// キャンバスの情報取得
const canvas1 = document.getElementById("canvas1");
const ctx1 = canvas1.getContext("2d");

// スカートに対して色を乗算してカラーリング
ctx.fillStyle = "rgba(0, 0, 0, 0)";
ctx.fillRect(
    fillStartPostion.x,
    fillStartPostion.y,
    canvasInfo.size.width,
    canvasInfo.size.height
);
const imageDataPath = "./img/cloth1.png";
// "./img/cloth1.png";って書くとgithub Pagesだとエラーになるから注意
var imageObjA = new Image();
imageObjA.onload = function () {
    ctx.drawImage(imageObjA, image.position.width, image.position.height);
};
imageObjA.src = imageDataPath;
ctx.globalCompositeOperation = "multiply";

// スカート以外に対しての余白部分に対しての色の上書きによる視覚上の削除
ctx1.fillStyle = "white"; //外側を白色に埋めてる
ctx1.fillRect(
    fillStartPostion.x,
    fillStartPostion.y,
    canvasInfo.size.width,
    canvasInfo.size.height
);
var imageObjB = new Image();
imageObjB.onload = function () {
    ctx1.drawImage(imageObjB, image.position.width, image.position.height);
};
imageObjB.src = imageDataPath;
ctx1.globalCompositeOperation = "xor";

// ボタンクリックした際に指定色を重ねる
const colorButton = document.getElementById("btn");
colorButton.addEventListener("click", function () {
    const color = document.getElementById("addColor");

    const rgbRed = parseInt(color.value.substring(1, 3), 16);
    const rgbGreen = parseInt(color.value.substring(3, 5), 16);
    const rgbBlue = parseInt(color.value.substring(5, 7), 16);
    console.log(`RGB: ${rgbRed},${rgbGreen},${rgbBlue}`);

    // clearRectしないと描画内容が新規更新されない。色がなぜか上塗りされる
    ctx.clearRect(
        fillStartPostion.x,
        fillStartPostion.y,
        canvasInfo.size.width,
        canvasInfo.size.height
    );

    ctx.fillStyle = `rgba(${rgbRed},${rgbGreen},${rgbBlue}, 0.7)`;
    ctx.fillRect(
        fillStartPostion.x,
        fillStartPostion.y,
        canvasInfo.size.width,
        canvasInfo.size.height
    );

    var imageObjA = new Image();
    imageObjA.onload = function () {
        ctx.drawImage(imageObjA, image.position.width, image.position.height);
    };
    imageObjA.src = imageDataPath;
});

console.log(location.href);

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
