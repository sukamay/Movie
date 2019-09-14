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
            window.data = QuickSort(window.data);
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

function QuickSort(arr) {
    QSort(arr, 0, arr.length - 1);
    return arr;
}

//对序列表中子序列作快排
function QSort(arr, low, high) {
    let pivot;
    if (low < high) {
        pivot = Partition(arr, low, high);
        QSort(arr, low, pivot - 1);
        QSort(arr, pivot + 1, high);
    }
}

//返回枢轴所在位置
function Partition(arr, low, high) {
    let pivot;
    let m = parseInt(low + (high - low) / 2);
    if (arr[low].rating.average < arr[high].rating.average) {
        let temp = arr[low];
        arr[low] = arr[high];
        arr[high] = temp;
    }
    if (arr[m].rating.average < arr[high].rating.average) {
        let temp = arr[high];
        arr[high] = arr[m];
        arr[m] = temp;
    }
    if (arr[m].rating.average < arr[low].rating.average) {
        let temp = arr[low];
        arr[low] = arr[m];
        arr[m] = temp;
    }
    pivot = arr[low];
    let num = pivot;
    while (low < high) {
        while (low < high && arr[high].rating.average <= pivot.rating.average) {
            high--;
        }
        arr[low] = arr[high];
        while (low < high && arr[low].rating.average >= pivot.rating.average) {
            low++;
        }
        arr[high] = arr[low];
    }
    arr[low] = num;
    return low;
}


