function updatePage(next) {
    if (next === true) {
        window.lpage = window.rpage;
        window.rpage = window.rpage + 4;
    } else {
        window.rpage = window.lpage;
        window.lpage = window.rpage - 4;
    }
    let pra = document.querySelectorAll("#page span");
    let page = window.lpage;
    for (let i = 2; i < 7; i++) {
        pra[i].textContent = page;
        if (page > window.max_page) {
            pra[i].style.display = "none";
        } else {
            pra[i].style.display = "inline";
        }
        page++;
    }
}

function prePage() {
    let page = window.now_page;
    if (page > 1) {
        if (page === window.lpage) {
            updatePage(false);
        }
        page--;
        turnToPage(page);
    }
}

function nextPage() {
    let page = window.now_page;
    if (page < window.max_page) {
        if (page === window.rpage) {
            updatePage(true);
        }
        page++;
        turnToPage(page);
    }
}

function turnToPage(page) {
    let pra = document.getElementById("films");
    if (page > 0 && page <= window.max_page && page !== window.now_page) {
        let film = document.querySelectorAll('.film');
        window.now_page = page;
        page = (page - 1) * 10;
        for (let i = 0; i < window.paging_num; i++) {
            let node = createFilm(window.data[page + i]);
            pra.replaceChild(node, film[i]);
        }
        document.querySelectorAll(".page-current").forEach(function (val) {
            val.className = "";
        })
    }
    if (window.now_page === 1) {
        document.getElementById("prev_page").className = "page-prev page-disabled";
        document.getElementById("next_page").className = "page-next";
    } else if (window.now_page === window.max_page) {
        document.getElementById("next_page").className = "page-next page-disabled";
        document.getElementById("prev_page").className = "page-prev";
    } else {
        document.getElementById("prev_page").className = "page-prev";
        document.getElementById("next_page").className = "page-next";
    }
    if (window.now_page > 1 && window.now_page === window.lpage) {
        updatePage(false);
    } else if (window.now_page < window.max_page && window.now_page === window.rpage) {
        updatePage(true);
    }
    let pages = document.querySelectorAll("#page span");
    for (let i = 2; i < 7; i++) {
        if (parseInt(pages[i].textContent) === window.now_page) {
            pages[i].className = "page-current";
            break;
        }
    }
}
