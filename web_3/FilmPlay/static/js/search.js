window.onload = function () {
    let str = getUrlPara("search_text");
    console.log('search_text: ', str);
    search(str);
};

function search(str) {
    // let str = document.getElementById("inp-query").value;
    console.log(str);
    str = replaceIllegalStr(str);
    console.log(str);
    let keywords = str.split(' ');
    let keyword;
    let res = document.getElementById("films").innerHTML;
    for (let j = 0; j < keywords.length; j++) {
        keyword = keywords[j];
        res = res.replace(new RegExp(keyword, 'ig'), "<span class=\"search-res\">" + arguments[0] + "</span>")
    }
    document.getElementById("films").innerHTML = res;
}

function searchInClassify(str) {
    // let str = document.getElementById("inp-query").value;
    console.log(str);
    str = replaceIllegalStr(str);
    console.log(str);
    let keywords = str.split(' ');
    let keyword;
    let res = document.getElementById("poster-list").innerHTML;
    for (let j = 0; j < keywords.length; j++) {
        keyword = keywords[j];
        res = res.replace(new RegExp(keyword, 'ig'), "<span class=\"search-res\">" + arguments[0] + "</span>")
    }
    document.getElementById("poster-list").innerHTML = res;
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

function getUrlPara(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) {
        return decodeURI(r[2]);
    } else {
        return null; //返回参数值
    }
}


/*
* url 目标url
* arg 需要替换的参数名称
* arg_val 替换后的参数的值
* return url 参数替换后的url
*/
function changeURLArg(url,arg,arg_val){
    let pattern=arg+'=([^&]*)';
    let replaceText=arg+'='+arg_val;
    if(url.match(pattern)){
        let tmp='/('+ arg+'=)([^&]*)/gi';
        tmp=url.replace(eval(tmp),replaceText);
        return tmp;
    }else{
        if(url.match('[\?]')){
            return url+'&'+replaceText;
        }else{
            return url+'?'+replaceText;
        }
    }
    // return url+'\n'+arg+'\n'+arg_val;
}

function addClassifyArg(href, tag_name) {
     let name = document.querySelector("#" + tag_name + " .tag-selected").textContent;
            if (name.startsWith("全部") === false) {
                // href.push("date=" + date);
                href = changeURLArg(href, tag_name, name);
            }else{
                href = removeURLArg(href, tag_name);
            }
            return href;
}

function removeURLArg(href, arg_name) {
    let url_list = href.split('?');
    let args_list = url_list.slice(1).join('?');
    args_list = args_list.split('&');
    for (let i = 0; i < args_list.length; i++){
        let args = args_list[i].split('=');
        if (args[0] === arg_name){
            args_list.splice(i,1);
            break;
        }
    }
    return url_list[0] + '?' + args_list.join('&');
}