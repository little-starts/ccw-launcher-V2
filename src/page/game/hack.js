let fill = 0;
let resolution = 0;
let w = 0, h = 0;
let wv = 0, hv = 0;
let div, divs, divv, divvs, news, background, Operatinginstructions, bug, discord;
let start = 0;
let cvs;
let hrefs;

let interval, tickTime = 1000;
function tick() {
    console.log("tick");
    let s = document.getElementById("WitCatBBcode启动器数据交互");
    if (s !== null && s !== undefined && s.innerText.split("ↀ").length == 3) {
        console.log(s.innerText);
        let v = s.innerText.split("ↀ");
        if (v[2] == 'return') {
            eval(`aardio.${v[0]}(${v[1]})`).then((e) => {
                s.firstChild.innerText = e;
            })
        }
        else if (v[2] == 'do') {
            eval(`aardio.${v[0]}(${v[1]})`)
            s.remove();
        }
        else {
            tickTime = v[2] > 1500 ? 1500 : (v[2] < 10 ? 10 : v[2]);
            clearInterval(interval);
            interval = setInterval(tick(), tickTime);
        }
    }
}

function fillin() {
    fill = 1;
    var mo = function (e) { e.preventDefault(); };
    document.body.style.overflow = 'hidden';
    document.addEventListener("touchmove", mo, false);//禁止页面滑动
    if (window.location.href.split("/")[2] !== "cocrea.world") {
        div = document.getElementById("root").getElementsByTagName('div')[0];
        divs = document.getElementById("root");
        hrefs = window.location.href.split("/")[3].split("?")[0];
        if (hrefs !== "scratch-player") {
            divs.removeChild(div);
        }
    }

    news = document.body.getElementsByClassName("convention-1wIbd")[0];
    if (typeof (news) !== "undefined") {
        news.style = "display:none;";
    }
    divv = document.body.getElementsByClassName("actions-2lk9z")[0];
    if (typeof (divv) !== "undefined") {
        divv.style = "display:none;";
    }
    Operatinginstructions = document.body.getElementsByClassName("showWorksDesc-1iD-M")[0];
    if (typeof (Operatinginstructions) !== "undefined") {
        Operatinginstructions.style = "display:none;";
    }
    bug = document.body.getElementsByClassName("bug-report-1CfBK")[0];
    if (typeof (bug) !== "undefined") {
        bug.style = "display:none;";
    }
    discord = document.body.getElementsByClassName("style_bugReport__gJk19 MuiBox-root css-0")[0];
    if (typeof (discord) !== "undefined") {
        discord.style = "display:none";
    }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    scrollTo(0, 0);

    setTimeout(fills(), 50);
}
function fills() {
    if (w !== 0 && h !== 0) {
        cvs.width = w;
        cvs.height = h;
    }
    let ws = 0, hs = 0;
    if ((cvs.width / cvs.height) >= (document.documentElement.clientWidth / document.documentElement.clientHeight)) {
        hs = (document.documentElement.clientWidth / cvs.width) * cvs.height;
        ws = document.documentElement.clientWidth;
        wv = 0;
        hv = (document.documentElement.clientHeight - hs) / 2;
    }
    else {
        hs = document.documentElement.clientHeight;
        ws = (document.documentElement.clientHeight / cvs.height) * cvs.width;
        wv = (document.documentElement.clientWidth - ws) / 2;
        hv = 0;
    }
    divvs = document.body.getElementsByClassName("arrowTop-2Fru_")[0];
    if (typeof (divvs) !== "undefined") {
        divvs.style = "display:none;";
    }
    cvs.parentNode.parentNode.parentNode.parentNode.style = "position:fixed; left:" + wv + "px; top:" + hv + "px; width:" + ws + "px; height:" + hs + "px;border-radius:0px";
    cvs.parentNode.parentNode.parentNode.style = "width:" + ws + "px; height:" + hs + "px;border-radius:0px";
    cvs.parentNode.parentNode.style = "width:100%; height:100%;border-radius:0px";
    cvs.parentNode.style = "width:100%; height:100%;border-radius:0px";
    if (isInPage(cvs.parentNode.parentNode.nextElementSibling.firstChild.firstChild)) {
        cvs.parentNode.parentNode.nextElementSibling.style = "width: 100%; height: 100%;";
        cvs.parentNode.parentNode.nextElementSibling.firstChild.style = "width: 100%; height: 100%;";
        cvs.parentNode.parentNode.nextElementSibling.firstChild.firstChild.firstChild.style = "width: 100%; height: 100%;";
        cvs.parentNode.parentNode.nextElementSibling.firstChild.firstChild.style = "width: 100%;";
    }
    cvs.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("div")[0].style = "width:100%; height:100%;"
    cvs.style = "width:100%; height:100%;";
    let b = document.documentElement.clientHeight / cvs.parentNode.parentNode.parentNode.parentNode.parentNode.clientHeight;
    let a = document.documentElement.clientWidth / cvs.parentNode.parentNode.parentNode.parentNode.parentNode.clientWidth;
    if (a > b) {
        a = b;
    }
    cvs.parentNode.parentNode.getElementsByTagName("div")[1].style = "transform:scale(" + a + ");transform-origin:0% 0% 0";
    background = document.getElementsByClassName("witcatbackground")[0];
    if (!background) {
        background = document.createElement("div");
        background.style = "width:" + document.documentElement.clientWidth + "px;height:" + document.documentElement.clientHeight + "px;color:black;";
        background.className = "witcatbackground";
        document.body.insertBefore(background, document.body.children[0]);
    }
    else {
        background.style = "width:" + document.documentElement.clientWidth + "px;height:" + document.documentElement.clientHeight + "px;color:black;";
    }
}
//检测div存在
function isInPage(node) {
    return (node === document.body) ? false : document.body.contains(node);
}
let a = setInterval(() => {
    let s = document.getElementsByClassName("main-module_fullscreen-button_9f565")
    if (s.length !== 0) {
        s[0].click();
        clearInterval(a);
        interval = setInterval(tick(), tickTime);
    }
}, 100);
let b = setInterval(() => {
    let s = document.getElementsByClassName("main-module_menu_e828e")
    if (s.length !== 0) {
        cvs = document.getElementsByTagName("canvas")[0];
        fillin();
        const config = { attributes: true, childList: true, subtree: true, attributeFilter: ['style'] };
        const callback = function (mutationsList, observer) {
            if (fill == 1) {
                observer.disconnect();
                fills();
                observer.observe(cvs, config);
            }
        };
        const observer = new MutationObserver(callback);
        observer.observe(cvs, config);

        clearInterval(b);
    }
}, 100)
window.addEventListener('resize', () => {
    if (fill == 1) {
        fills();
    }
})