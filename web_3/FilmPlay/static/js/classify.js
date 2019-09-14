window.offset = 0;
window.limit = 15;

$(function () {
    $("#load-more").click(function () {
        if (window.offset === 0){
            window.offset = 20;
        }else{
           window.offset += window.limit;
        }
        let href = window.location.href;
        href = changeURLArg(href, "offset", window.offset);
        let url = href.split('?')[1];
        $.ajax({
            'type': 'get',
            'url': '/classify/content/?' + url,
            'dateType': 'text',
        }).success(function (data) {
            console.log(window.offset, ' : success to load more');
            if (data.length === 0 || parseInt($("#page_num").text()) <= window.offset) {
                let load_more = document.getElementById("load-more");
                load_more.textContent = "我们的电影清单走到了尽头";
                load_more.style.backgroundColor = '"white';
                load_more.style.textDecoration = "none";
                $("#load-more").off('click');
            }
            let org_html = document.getElementById("poster-list").innerHTML;
            document.getElementById("poster-list").innerHTML = org_html + data;
        }).fail(function (data) {
            console.log(data)
        }).error(function (data) {
            console.log('fail to load the source')
        })
    })
});


window.onload = function () {
    initialTag("genre");
    initialTag("type");
    initialTag("country");
    initialTag("date");
    document.querySelectorAll(".tag").forEach(function (val) {
        val.addEventListener('click', function () {
            // search(val.textContent);
            this.parentNode.parentNode.querySelectorAll("li a").forEach(function (value) {
                value.className = value.className.replace("tag-selected", "");
            });
            this.className = this.className + " tag-selected";
            let href = window.location.href;
            href = addClassifyArg(href, "genre");
            href = addClassifyArg(href, "type");
            href = addClassifyArg(href, "country");
            href = addClassifyArg(href, "date");
            window.location.href = href;
        }, false)
    });
    document.querySelectorAll(".tag-head").forEach(function (val) {
        val.addEventListener('click', function () {
            // search(val.textContent);
            this.parentNode.parentNode.querySelectorAll("li a").forEach(function (value) {
                value.className = value.className.replace("tag-selected", "");
            });
            this.className = this.className + " tag-selected";
            let href = window.location.href;
            href = addClassifyArg(href, "genre");
            href = addClassifyArg(href, "type");
            href = addClassifyArg(href, "country");
            href = addClassifyArg(href, "date");
            window.location.href = href;
        }, false)
    });
    let str = getUrlPara("search_text");
    console.log('search_text: ', str);
    if (str != null) {
        window.search_text = str;
        window.csrfmiddlewaretoken = getUrlPara("csrfmiddlewaretoken");
        searchInClassify(str);
    }
    let content = $("#poster-list").html();
    let page_num = $("#page_num").text();
    content = trim(content);
    console.log(content, 'length: ', content.length);
    if (content == null || content.length === 0 || /[0-9]+/.test(content) === false) {
        let load_more = document.getElementById("load-more");
        load_more.textContent = "无相关显示结果QAQ";
        $("#load-more").off('click');
        load_more.style.backgroundColor = "white";
        load_more.style.textDecoration = "none";
    }else if(parseInt(page_num) <= 20){
        let load_more = document.getElementById("load-more");
        load_more.textContent = "我们的电影清单走到了尽头";
        $("#load-more").off('click');
        load_more.style.backgroundColor = "white";
        load_more.style.textDecoration = "none";
    }
};

function initialTag(tag_name) {
    let name = getUrlPara(tag_name);
    if (name === null) {
        $("#" + tag_name + " .tag-head").addClass("tag-selected");
    } else {
        let name_set = document.querySelectorAll("#" + tag_name + " li a");
        name_set.forEach(function (val) {
            if (val.innerText === name) {
                val.className = val.className + " tag-selected";
            }
        });
    }
}

/**
 * 去除字符串str头尾的空格
 * @param str 字符串
 * @return str去除头尾空格后的字符串。
 */
function trim(str) {
    if (str == null) return "";
// 去除前面所有的空格
    while (str.charAt(0) === ' ') {
        str = str.substring(1, str.length);
    }
// 去除后面的空格
    while (str.charAt(str.length - 1) === ' ') {
        str = str.substring(0, str.length - 1);
    }
    return str;
}

