// 组件渲染函数
function renderSubmenuTemp (data) {
    const doc = document.body;
    const fieId = data.renderId;
    const dataList = data.dataList;
    const str = {
        readState:'',
        readClass:'edit',
        outStr:'',
        fatherStr:'',
        childStr:''
    };

    if (!data.editor) {
        str.readState = 'readonly';
        str.readClass = 'readonly';
    }

    dataList.forEach(item => {
        let nowStr = '', lastStr = '';
        item.children.forEach(ele => {
            nowStr += `
            <div class="second-chlid">
                <span>-</span><input class="input-submenu ${str.readClass}" type="text" value="${ele.value}" ${str.readState}>
            </div>
            `;
        });
        lastStr += `<div class="second-div">${nowStr}</div>`;
        str.fatherStr += `
        <div class="top-category">
        <div class="first-div">
            <span>+</span><input class="input-submenu ${str.readClass}" type="text" value="${item.value}" ${str.readState}>
        </div>${lastStr}</div>
        `;
    });
    
    str.outStr = `
    <div class="submenu-wrapper">
        <div class="edit-bar">
            <button id="${fieId.editButtonId}">编辑</button>
            <button id="${fieId.preserveButtonId}" data-unit="${fieId.wrapperId}">保存</button>
        </div>
        <div class="edit-content">${str.fatherStr}</div>
    </div>
    `;
    const outerDiv = doc.querySelector('#' + fieId.wrapperId);
    outerDiv.innerHTML = str.outStr;
    setTimeout(()=>{
        bindSubmenuEvent (data);
    },10);
    
};

// 编辑按钮点击事件处理程序
function editSubmenuClick (e) {
    data.editor = true;
    renderSubmenuTemp (data);
    e.stopPropagation();
};
// 保存按钮点击事件处理程序
function preserveSubmenuClick (e) {
    console.log(this)
    data.editor = false;
    upDataSubmenuTemp (data);
    e.stopPropagation();
};
// 更新组件数据处理函数
function upDataSubmenuTemp (data) {
    const nowDiv = document.querySelector('#' + data.renderId.wrapperId);
    const dataDiv = nowDiv.firstElementChild.children[1].children;
    const dataArr = [];
    for (let i = 0; i < dataDiv.length; i++) {
        const obj = { value:'', children:[] };
        const nowDiv = dataDiv[i].querySelectorAll('input');
        nowDiv.forEach((item,index) => {
            if (index === 0) {
                obj['value'] = item.value;
            } else {
                obj['children'].push( { value:item.value } );
            };
        });
        dataArr.push(obj);
    };
    data.dataList = dataArr;
    setTimeout(()=>{renderSubmenuTemp (data)},10);
};
// 元素事件绑定函数
function bindSubmenuEvent (data) {
    const doc = document.body;
    const editDiv = doc.querySelector('#' + data.renderId.editButtonId);
    const preserveDiv = doc.querySelector('#' + data.renderId.preserveButtonId);
    editDiv.removeEventListener('click',editSubmenuClick);
    editDiv.addEventListener('click',editSubmenuClick);
    preserveDiv.removeEventListener('click',preserveSubmenuClick);
    preserveDiv.addEventListener('click',preserveSubmenuClick);
}