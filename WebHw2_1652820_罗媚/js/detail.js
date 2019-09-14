window.onload = function () {
    let id = getUrlPara("id");
    let url = "js/films.json";/*json文件url*/
    let request = new XMLHttpRequest();
    request.open("get", url);/*设置请求方法与路径*/
    request.send(null);/*不发送数据到服务器*/
    request.onload = function () {/*XHR对象获取到返回信息后执行*/
        if (request.status === 200) {/*返回状态为200，即为数据获取成功*/
            let dataset = JSON.parse(request.responseText);
            for (let i = 0; i < dataset.length; i++) {
                if (dataset[i]._id === id) {
                    window.data = dataset[i];
                    console.log(id, window.data);
                    update(window.data);
                    break;
                }
            }
        }
    };
};

function update(data) {
    let pra = document.getElementById("main");
    pra.querySelector(".detail-poster img").src = data.poster;
    pra.querySelector("#stars").style.backgroundPosition = "0px " +
        Math.floor(10 - parseFloat(data.rating.average)) * (-15) + "px";
    pra.querySelector(".avg-review-left").textContent = data.rating.average;
    pra.querySelector(".rating-num").textContent = data.rating.rating_people + "人评价";
    let power_group = pra.querySelectorAll(".power");
    let percent_group = pra.querySelectorAll(".percent");
    for (let i = 0; i < 5; i++) {
        power_group[i].style.width = parseInt(data.rating.stars[i]) + "px";
        percent_group[i].textContent = data.rating.stars[i] + "%";
    }
    let names = data.title.split(' ');
    document.querySelector("title").textContent = names[0] + "（济影）";
    pra.querySelector(".detail-name-zh").textContent = names[0];
    pra.querySelector(".detail-name-en").textContent = names.slice(1).join(' ');
    pra.querySelector(".detail-intro .year").textContent = data.year;
    pra.querySelector(".detail-intro .type").textContent = data.genres.join('/');
    let detail_list = pra.querySelectorAll("table.detail-list td");
    //导演，编剧，主演，制片国家/地区，语言，上映日期，片场，IMDb链接，剧情简介
    detail_list[1].textContent = getDirectorsName(data);
    detail_list[3].textContent = getWritersName(data);
    detail_list[5].textContent = getCastsName(data);
    detail_list[7].textContent = data.countries;
    detail_list[9].textContent = data.languages;
    detail_list[11].textContent = data.pubdate;
    detail_list[13].textContent = data.duration + "分钟";
    detail_list[15].textContent = data.imdb;
    pra.querySelector(".content").textContent = data.summary;
}

function getUrlPara(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) {
        return unescape(r[2]);
    } else {
        return null; //返回参数值
    }
}

function getWritersName(data) {
    let names = [];
    if (data.hasOwnProperty("writers")) {
        for (let i = 0; i < data.writers.length; i++) {
            names[i] = data.writers[i].name;
        }
    }
    return names.join(" / ");
}

function getDirectorsName(data) {
    let names = [];
    if (data.hasOwnProperty("directors")) {
        for (let i = 0; i < data.directors.length; i++) {
            names[i] = data.directors[i].name;
        }
    }
    return names.join(" / ");
}

