function createFilm(data) {
    let film = document.createElement("tr");
    film.className = "film";
    film.id = data._id;
    let poster = document.createElement("td");
    poster.className = "poster";
    film.appendChild(poster);
    let pa = document.createElement("a");
    pa.href = "detail.html?id=" + data._id;
    pa.target = "_blank";
    poster.appendChild(pa);
    let pimg = document.createElement("img");
    pimg.src = data.poster;
    pimg.alt = "poster";
    pa.appendChild(pimg);
    let node = document.createElement("td");
    film.appendChild(node);
    let intro = document.createElement("div");
    intro.className = "intro";
    node.appendChild(intro);
    let ia = document.createElement("a");
    ia.href = "detail.html?id=" + data._id;
    ia.target = "_blank";
    ia.textContent = data.title;
    intro.appendChild(ia);
    let ip1 = document.createElement("p");
    intro.appendChild(ip1);
    let sp = document.createElement("span");
    sp.className = "year";
    sp.textContent = data.pubdate;
    ip1.appendChild(sp);
    for (let i = 0; i < data.genres.length; i++) {
        let sp = document.createElement("span");
        sp.className = "type";
        sp.textContent = data.genres[i];
        ip1.appendChild(sp);
    }
    sp = document.createElement("p");
    sp.className = "cast";
    sp.textContent = getCastsName(data);
    intro.appendChild(sp);
    let td_review = document.createElement("td");
    film.appendChild(td_review);
    let review = document.createElement("span");
    review.className = "review";
    review.textContent = data.rating.average;
    td_review.appendChild(review);
    return film;
}

function getCastsName(data) {
    let names = [];
    if (data.hasOwnProperty("casts")) {
        for (let i = 0; i < data.casts.length; i++) {
            names[i] = data.casts[i].name;
        }
    }
    return names.join(" / ");
}
