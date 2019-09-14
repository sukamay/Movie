window.paging_num = 10;
window.now_page = 1;
window.max_page = 20;
window.lpage = 1;
window.rpage = 5;

window.onload = function () {
    let url = "js/films.json";/*json文件url*/
    let request = new XMLHttpRequest();
    request.open("get", url);/*设置请求方法与路径*/
    request.send(null);/*不发送数据到服务器*/
    request.onload = function () {/*XHR对象获取到返回信息后执行*/
        if (request.status === 200) {/*返回状态为200，即为数据获取成功*/
            window.data = JSON.parse(request.responseText);
            window.db = window.data;
            window.max_page = Math.floor(window.data.length / window.paging_num);
            let pra = document.getElementById("films");
            for (let i = 0; i < window.paging_num; i++) {
                pra.appendChild(createFilm(window.data[i]));
            }
        }
    };
    let pages = document.getElementById("page").childNodes;
    pages.forEach(function (val) {
        if (parseInt(val.textContent) > 0) {
            val.addEventListener('click', function () {
                turnToPage(parseInt(this.textContent));
            }, false);
        }
    });
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
    document.querySelector(".aside").childNodes.forEach(function (val) {
        val.addEventListener('click', function () {
            search(val.textContent);
        }, false)
    });
};

