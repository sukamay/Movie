// function updatePage(next) {
//     if (next === true) {
//         window.lpage = window.rpage;
//         window.rpage = window.rpage + 4;
//     } else {
//         window.rpage = window.lpage;
//         window.lpage = window.rpage - 4;
//     }
//     let pra = document.querySelectorAll("#page span");
//     let page = window.lpage;
//     for (let i = 2; i < 7; i++) {
//         pra[i].textContent = page;
//         if (page > window.max_page) {
//             pra[i].style.display = "none";
//         } else {
//             pra[i].style.display = "inline";
//         }
//         page++;
//     }
// }
//
// function prePage() {
//     let page = window.now_page;
//     if (page > 1) {
//         if (page === window.lpage) {
//             updatePage(false);
//         }
//         page--;
//         turnToPage(page);
//     }
// }
//
// function nextPage() {
//     let page = window.now_page;
//     if (page < window.max_page) {
//         if (page === window.rpage) {
//             updatePage(true);
//         }
//         page++;
//         turnToPage(page);
//     }
// }


// this version is for load local file
// function turnToPage(page) {
//     let pra = document.getElementById("films");
//     if (page > 0 && page <= window.max_page && page !== window.now_page) {
//         let film = document.querySelectorAll('.film');
//         window.now_page = page;
//         page = (page - 1) * 10;
//         for (let i = 0; i < window.paging_num; i++) {
//             let node = createFilm(window.data[page + i]);
//             pra.replaceChild(node, film[i]);
//         }
//         document.querySelectorAll(".page-current").forEach(function (val) {
//             val.className = "";
//         })
//     }
//     if (window.now_page === 1) {
//         document.getElementById("prev_page").className = "page-prev page-disabled";
//         document.getElementById("next_page").className = "page-next";
//     } else if (window.now_page === window.max_page) {
//         document.getElementById("next_page").className = "page-next page-disabled";
//         document.getElementById("prev_page").className = "page-prev";
//     } else {
//         document.getElementById("prev_page").className = "page-prev";
//         document.getElementById("next_page").className = "page-next";
//     }
//     if (window.now_page > 1 && window.now_page === window.lpage) {
//         updatePage(false);
//     } else if (window.now_page < window.max_page && window.now_page === window.rpage) {
//         updatePage(true);
//     }
//     let pages = document.querySelectorAll("#page span");
//     for (let i = 2; i < 7; i++) {
//         if (parseInt(pages[i].textContent) === window.now_page) {
//             pages[i].className = "page-current";
//             break;
//         }
//     }
// }

// this version is for load data from server
function turnToPage() {
    let page = parseInt(this.textContent);
    if (page > 0 && this.className !== "page-current"){
        page -= 1;
        let href = window.location.href;
        href = changeURLArg(href, "limit", window.limit);
        href = changeURLArg(href, "offset", window.limit * page);
        window.location.href = href;
    }
}

function updatePage() {
    let page_now = window.offset/window.limit + 1;
    if (page_now !== 1){
        $(".page-end").removeClass("page-disabled");
        $("#prev_page").removeClass("page-disabled");
    }
    if (window.offset >= parseInt($("#page_num").text())){
        $("#next_page").addClass("page-disabled");
        $("#last_page").addClass("page-disabled");
        $.each($("#page").children("span"), function (i, val) {
        let page = parseInt(val.innerText);
        if (page > page_now){
            val.style.display = "none";
        }
    });
    }
    $(".page-current").removeClass("page-current");
    $.each($("#page").children("span"), function (i, val) {
        let page = parseInt(val.innerText);
        if (page === page_now){
            val.className = "page-current";
        }
    });
}

function nextPage() {
    if ($("#next_page").hasClass("page-disabled")){
        return;
    }
    window.offset += parseInt(window.limit);
    let href = window.location.href;
    href = changeURLArg(href, "limit", window.limit);
    href = changeURLArg(href, "offset", window.offset);
     window.location.href = href;
}

function prePage() {
    if ($("#prev_page").hasClass("page-disabled")){
        return;
    }
    window.offset -= parseInt(window.limit);
    let href = window.location.href;
    href = changeURLArg(href, "limit", window.limit);
    href = changeURLArg(href, "offset", window.offset);
     window.location.href = href;
}
