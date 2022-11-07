console.log("for github pages");
var rootPath = "https://tatsuyamaeta.github.io/cloth-color-change-by-canvas/";

// 対象の GitHub Pages から呼び出されていなければ、何も処理せず終了する
// if (location.href.indexOf(rootPath) < 0) {
//     return;
// }

var replaceAttribute = function (elementName, attributeName) {
    // console.log(elementName, attributeName, '置換処理開始');
    Array.prototype.forEach.call(
        document.querySelectorAll(elementName),
        function (element, index) {
            var attribute = element.getAttribute(attributeName);
            // 属性値がない場合、スラッシュ2つで始まるプロトコル省略の絶対パスの場合、ルート相対パスでない場合は処理しない
            if (
                !attribute ||
                attribute.substr(0, 2) === "//" ||
                attribute.substr(0, 1) !== "/"
            ) {
                return;
            }

            if (elementName === "script" && attribute === thisFileName) {
                // 本ファイル自体は読み込まれているため element は操作しないでおく
                // 代わりに、当該リポジトリ配下にあるはずの同名ファイルを読み込ませるため別要素を作って追加する
                var theScript = document.createElement("script");
                theScript.src = rootPath + attribute;
                element.parentNode.appendChild(theScript);
            } else {
                // a 要素・img 要素は属性値変更のみで正しく読み込まれる
                element.setAttribute(attributeName, rootPath + attribute);

                // link 要素・script 要素は Node の再挿入を行わないと読込が開始されない
                if (elementName === "link" || elementName === "script") {
                    var clone = element.cloneNode(true);
                    element.parentNode.replaceChild(clone, element);
                }
            }
        }
    );
};

/** 初期処理定義 */
var init = function () {
    // replaceAttribute("link", "href"); // 上の即処理で漏れた CSS ファイルのみ改めて処理する
    // replaceAttribute("script", "src");
    // replaceAttribute("a", "href");
    replaceAttribute("img", "src");
};

init();
