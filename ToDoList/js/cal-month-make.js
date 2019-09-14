let Calendar = function (t, date, container) {
    this.divId = t.RenderID ? t.RenderID : '[data-render="calendar"]', this.DaysOfWeek = t.DaysOfWeek ? t.DaysOfWeek : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], this.Months = t.Months ? t.Months : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let e = date;
    this.CurrentMonth = e.getMonth(), this.CurrentYear = e.getFullYear();
    let r = t.Format;
    this.f = "string" == typeof r ? r.charAt(0).toUpperCase() : "M";
    this.container = container;
    this.container.id = this.divId;
    console.log('container: ', this.container);
};
Calendar.prototype.nextMonth = function () {
    11 === this.CurrentMonth ? (this.CurrentMonth = 0, this.CurrentYear = this.CurrentYear + 1) : this.CurrentMonth = this.CurrentMonth + 1, this.divId = '[data-active="false"] .render', this.showCurrent()
}, Calendar.prototype.prevMonth = function () {
    0 === this.CurrentMonth ? (this.CurrentMonth = 11, this.CurrentYear = this.CurrentYear - 1) : this.CurrentMonth = this.CurrentMonth - 1, this.divId = '[data-active="false"] .render', this.showCurrent()
}, Calendar.prototype.previousYear = function () {
    this.CurrentYear = this.CurrentYear - 1, this.showCurrent()
}, Calendar.prototype.nextYear = function () {
    this.CurrentYear = this.CurrentYear + 1, this.showCurrent()
}, Calendar.prototype.showCurrent = function () {
    this.Calendar(this.CurrentYear, this.CurrentMonth)
}, Calendar.prototype.checkActive = function () {
    1 === this.container.querySelector(".months").getAttribute("class").includes("active") ? this.container.querySelector(".months").setAttribute("class", "months") : this.container.querySelector(".months").setAttribute("class", "months active"), "true" == this.container.querySelector(".month-a").getAttribute("data-active") ? (this.container.querySelector(".month-a").setAttribute("data-active", !1), this.container.querySelector(".month-b").setAttribute("data-active", !0)) : (this.container.querySelector(".month-a").setAttribute("data-active", !0), this.container.querySelector(".month-b").setAttribute("data-active", !1)),
    //     setTimeout(function () {
    //     this.container.querySelector(".calendar .header").setAttribute("class", "header active")
    // }, 200),
        this.container.querySelector(".header").setAttribute("class", "header active");
        this.container.setAttribute("data-theme", this.Months[parseInt(this.container.getAttribute("data-month"))].toLowerCase())
}, Calendar.prototype.Calendar = function (t, e) {
    "number" == typeof t && (this.CurrentYear = t), "number" == typeof t && (this.CurrentMonth = e);
    let r = (new Date).getDay(),
        n = (new Date).getMonth(),
        a = (new Date).getFullYear(),
        o = new Date(t, e, 1).getDay(),
        i = new Date(t, e + 1, 0).getDate(),
        u = 0 === e ? new Date(t - 1, 11, 0).getDate() : new Date(t, e, 0).getDate(),
        s = "<span>" + this.Months[e] + " &nbsp; " + t + "</span>",
        d = '<div class="table">';
    d += '<div class="row head">';
    for (let c = 0; c < 7; c++) d += '<div class="cell">' + this.DaysOfWeek[c] + "</div>";
    d += "</div>";
    for (let h, l = dm = "M" == this.f ? 1 : 0 == o ? -5 : 2, v = (c = 0, 0); v < 6; v++) {
        d += '<div class="row">';
        for (let m = 0; m < 7; m++) {
            if ((h = c + dm - o) < 1) d += '<div class="cell disable">' + (u - o + l++) + "</div>";
            else if (h > i) d += '<div class="cell disable">' + l++ + "</div>";
            else {
                d += '<div class="cell' + (r == h && this.CurrentMonth == n && this.CurrentYear == a ? " active" : "") + '"><span>' + h + "</span></div>", l = 1
            }
            c % 7 == 6 && h >= i && (v = 10), c++
        }
        d += "</div>"
    }
    d += "</div>", this.container.querySelector('[data-render="month-year"]').innerHTML = s, this.container.querySelector(this.divId).innerHTML = d, this.container.setAttribute("data-date", this.Months[e] + " - " + t), this.container.setAttribute("data-month", e)
}, Calendar.prototype.getContainer = function () {
    return this.container;
},

window.onload = function () {
    let cur = new Date();
    let cur_year = cur.getFullYear();
    for(let i = 0;i < 12; i++) {
        let container = document.createElement("div");
        container.classList.add("calendar");
        container.innerHTML = " <div class=\"header\">\n" +
            "            <div class=\"text\" data-render=\"month-year\"></div>\n" +
            "        </div>\n" +
            "        <div class=\"months\" data-flow=\"left\">\n" +
            "            <div class=\"month month-a\">\n" +
            "                <div class=\"render render-a\"></div>\n" +
            "            </div>\n" +
            "            <div class=\"month month-b\">\n" +
            "                <div class=\"render render-b\"></div>\n" +
            "            </div>\n" +
            "        </div>";
        let t = new Calendar({
            RenderID: ".render-a",
            Format: "M"
        }, new Date(cur_year, i), container);
        console.log(t.getContainer());
        document.getElementById("calendar-panel").appendChild(t.getContainer());
        t.showCurrent();
        t.checkActive();
    }
    let e = document.querySelectorAll(".header [data-action]");
    for (i = 0; i < e.length; i++) e[i].onclick = function () {
        if (document.querySelector(".calendar .header").setAttribute("class", "header"), "true" == document.querySelector(".months").getAttribute("data-loading")) return document.querySelector(".calendar .header").setAttribute("class", "header active"), !1;
        let e;
        document.querySelector(".months").setAttribute("data-loading", "true"), this.getAttribute("data-action").includes("prev") ? (t.prevMonth(), e = "left") : (t.nextMonth(), e = "right"), t.checkActive(), document.querySelector(".months").setAttribute("data-flow", e), document.querySelector('.month[data-active="true"]').addEventListener("webkitTransitionEnd", function () {
            document.querySelector(".months").removeAttribute("data-loading")
        }), document.querySelector('.month[data-active="true"]').addEventListener("transitionend", function () {
            document.querySelector(".months").removeAttribute("data-loading")
        })
    }
};
