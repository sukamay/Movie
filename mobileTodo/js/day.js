let storage = window.localStorage;
let items = [];
let timeOutEvent = 0;
let filter = 'All';
let item_num = 0;

function addTodo() {
    let add_todo = document.querySelector('#add-todo');
    let content = add_todo.value;
    if(typeof(content) === 'undefined' || content.length === 0 || content === ''){
        console.log('value is empty');
        return;
    }
    let priority = 0;
    if(content.endsWith('!')){
        for(let i = content.length - 1; i >= 0; i--){
            if(content[i] === '!'){
                priority++;
            }
        }
    }
    priority = Math.min(priority, 4);
    let item = {};
    item.id = 'item' + item_num;
    item_num++;
    storage.setItem('item_num', item_num);
    item.content = content;
    item.completed = false;
    item.priority = priority;
    items.push(item);
    update();
    add_todo.value= '';
}

function delTodo() {

}

function modTodo() {

}

function toggleAll() {
    for(let i in items){
        let item = items[i];
        item.completed = !item.completed;
    }
    update();
}

function clearAll() {
    items = [];
    storage.clear();
    update();
}

function clearCompleted() {
    let new_items = [];
    for(let i in items){
        let item = items[i];
        if(!item.completed){
            new_items.push(item);
        }
    }
    items = new_items;
    update();
}

function update(){
    let html_content = '';
    let item_count = 0;
    for(let i in items){
        let item = items[i];
        if(item.completed && filter === 'Todo'){
            continue;
        }else if(!item.completed && filter === 'Did'){
            continue;
        }
        if(!item.completed){
            item_count++;
        }
        html_content += '  <li id="' +  item.id + '"class="' + (item.completed ? 'completed': '') +  '">\n' +
            '                <input type="checkbox"' +  (item.completed ? 'checked': '') + '>\n' +
            '                <input type="text" value="' + item.content +
            '" readonly>\n' +
            '                <button class="destroy"></button>\n' +
            '            </li>';
    }
    document.querySelector('.todo-list').innerHTML = html_content;
    document.querySelectorAll('.todo-list li input[type="checkbox"]').forEach(function (value, key, parent) {
        value.addEventListener('touchstart', function (ev) {
            if(!this.checked){
                this.parentElement.classList.add('completed');
                this.checked = true;
            }else{
                this.parentElement.classList.remove('completed');
                this.checked = false;
            }
            let item = items[key];
            item.completed = !item.completed;
            update();
            ev.preventDefault();
        });
    });
    document.querySelectorAll('.todo-list li input[type="text"]').forEach(function (value, key, parent) {
        let item = items[key];
        function editItem(){
            console.log('into edit');
            value.focus();
            value.readOnly = false;
        }
        value.addEventListener('keyup', function (ev) {
            if(ev.keyCode === 13){
                item.content = value.value;
                value.readOnly = true;
                value.blur();
                update();
            }
        }, false);
        value.addEventListener('touchstart', function (ev) {
            timeOutEvent = setTimeout(editItem, 300);
            ev.preventDefault();
        }, false);
        value.addEventListener('touchmove', function (ev) {
            clearTimeout(timeOutEvent);
            timeOutEvent = 0;
        }, false);
        value.addEventListener('touchend', function (ev) {
            clearTimeout(timeOutEvent);
        }, false);
    });
    document.querySelectorAll('.todo-list li button').forEach(function (value, key) {
       let sx, sy, ex, ey, swipe_x, swipe_y;
        value.addEventListener('touchstart', function (ev) {
           sx = ev.changedTouches[0].pageX;
           sy = ev.changedTouches[0].pageY;
           swipe_x = true;
           swipe_y = true;
           if(this.classList.contains('swipe-left')){
               console.log('into swipe-left touch start');
               let conf = confirm('Are you sure to delete this event?');
               if(conf){
                   // remove the item
                   items.splice(key, 1);
                   update();
               }
           }
           ev.preventDefault();
       }, false);
        value.addEventListener('touchmove', function (ev) {
            ex = ev.changedTouches[0].pageX;
            ey = ev.changedTouches[0].pageY;
            if(swipe_x && Math.abs(ex - sx) - Math.abs(ey - sy) > 0){
                ev.stopPropagation();
                if(ex - sx > 10){
                    ev.preventDefault();
                    this.classList.remove('swipe-left');
                }
                if(sx - ex > 10){
                    ev.preventDefault();
                    this.classList.add('swipe-left');
                }
                swipe_y = false;
            }
        }, false);
    });
    document.querySelector('.todo-sum').textContent =
        (item_count > 0 ? item_count + '': 'no') +
        (item_count > 1 ? ' items ' : ' item ' ) + 'left';
    if(item_count < items.length){
        document.querySelector('#clear-completed').style.visibility = 'visible';
    }else{
        document.querySelector('#clear-completed').style.visibility = 'hidden';
    }
    let store_items = Object.assign([], items);
    for(let i in store_items){
        let store_item = store_items[i];
        store_item = JSON.stringify(store_item);
        store_items[i] = store_item;
    }
    storage.setItem('items', store_items.join('/'));
}


window.onload = function () {
    item_num = storage.getItem('item_num');
    if(item_num === null){
        item_num = 0;
    }
    items = storage.getItem('items');
    if(items == null){
        items = [];
    }else{
        let store_items = items.split('/');
        items = [];
        for(let i in store_items){
            let store_item = store_items[i];
            items.push(JSON.parse(store_item));
        }
    }
    update();
    document.querySelector('#add-todo').addEventListener('keyup', function (ev) {
        if(ev.keyCode === 13){
            addTodo();
        }
    }, false);
    document.querySelector('#clear-all').addEventListener('touchstart', function (ev) {
        clearAll();
        ev.preventDefault();
    }, false);
    document.querySelector('#clear-completed').addEventListener('touchstart', function (ev) {
        clearCompleted();
        ev.preventDefault();
    }, false);
    document.querySelector('.toggle-all').addEventListener('touchstart', function (ev) {
        toggleAll();
    }, false);
    document.querySelectorAll('.todo-filter ul li').forEach(function (value) {
        value.addEventListener('touchstart', function (ev) {
            filter = value.textContent;
            document.querySelectorAll('.todo-filter ul li').forEach(function (value) {
                value.classList.remove('filter-selected');
            });
            value.classList.add('filter-selected');
            update();
        }, false);
    });
};
