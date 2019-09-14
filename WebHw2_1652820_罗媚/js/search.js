function search(str) {
    // let str = document.getElementById("inp-query").value;
    console.log(str);
    str = replaceIllegalStr(str);
    console.log(str);
    let keywords = str.split(' ');
    let keyword;
    let ind = 0;
    for (let j = 0; j < keywords.length; j++) {
        keyword = keywords[j];
        for (let i = 0; i < window.data.length; i++) {
            let pra = JSON.stringify(window.data[i]);
            if (pra.indexOf(keyword) >= 0) {
                let temp = window.data[i];
                window.data[i] = window.data[ind];
                window.data[ind] = temp;
                ind++;
            }
        }
    }
    document.querySelector(".page-current").className = "";
    window.now_page = 2;
    window.lpage = 1;
    window.rpage = 5;
    turnToPage(1);
    let res = document.getElementById("films").innerHTML;
    for (let j = 0; j < keywords.length; j++) {
        keyword = keywords[j];
        res = res.replace(new RegExp(keyword, 'g'), "<span class=\"search-res\">" + keyword + "</span>")
    }
    document.getElementById("films").innerHTML = res;
}

function checkInfo() {
    if (event.keyCode === 13) {
        console.log("search something");
        let str = document.getElementById("inp-query").value;
        search(str);
    }
}

function replaceIllegalStr(str) {
    let reg;
    let illegal_list = ["/", "\\",
        "[", "]",
        "{", "}",
        "<", ">",
        "＜", "＞",
        "「", "」",
        "：", "；",
        "、", "•",
        "^", "'", "\"",
        "\r", "\r\n", "\\n", "\n"];
    for (let i = 0; i < illegal_list.length; i++) {
        if (str.indexOf(illegal_list[i]) >= 0) {
            if (illegal_list[i] === '\\' || illegal_list[i] === '[') {
                reg = new RegExp('\\' + illegal_list[i], "g");
            } else {
                reg = new RegExp(illegal_list[i], "g");
            }
            str = str.replace(reg, '');
        }
    }
    return str.trim();
}
