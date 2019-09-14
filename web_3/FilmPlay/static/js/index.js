window.paging_num = 10;
window.now_page = 1;
window.max_page = 20;
window.lpage = 1;
window.rpage = 5;
window.limit = 10;
window.offset = 0;
window.search_text = null;
window.csrfmiddlewaretoken = null;

window.onload = function () {
    let pages = document.getElementById("page").childNodes;
    pages.forEach(function (val) {
        if (parseInt(val.textContent) > 0) {
            val.addEventListener('click', turnToPage, false);
        }
    });
    window.limit = getUrlPara("limit");
    if (window.limit === null){
        window.limit = 10;
    }else{
        window.limit = parseInt(window.limit);
    }
    window.offset = getUrlPara("offset");
    if (window.offset === null){
        window.offset = 0;
    }else{
        window.offset = parseInt(window.offset);
    }
    updatePage();
    document.getElementById("prev_page").onclick = prePage;
    document.getElementById("next_page").onclick = nextPage;
    document.getElementById("search").onclick = search;
    document.getElementById("inp-query").onkeypress = checkInfo;
    document.getElementById("totop").addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, false);
    document.querySelectorAll(".aside span").forEach(function (val) {
        val.addEventListener('click', function () {
            // search(val.textContent);
            window.location.href = "/classify/?genre=" + val.textContent;
        }, false)
    });
    document.getElementById("first_page").addEventListener('click', function (val) {
        if ($("#first_page").hasClass("page-disabled") === false) {
            let href = window.location.href;
            href = changeURLArg(href, "offset", 0);
            window.location.href = href;
        }
    });
    document.getElementById("last_page").addEventListener('click', function (val) {
        if ($("#last_page").hasClass("page-disabled") === false){
            let href = window.location.href;
            href = changeURLArg(href, "offset", parseInt($("#page_num").text()));
            window.location.href = href;
        }
    });
    let str = getUrlPara("search_text");
    console.log('search_text: ', str);
    if (str != null){
        window.search_text = str;
        window.csrfmiddlewaretoken = getUrlPara("csrfmiddlewaretoken");
        search(str);
    }
};

