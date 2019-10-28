/**
 * wangEditor
 * @author 李哲军
 * @date    2019-10-18
 * @type {string}
 */


let imgMaxWidth = null;

const editor_L =  {
    /**
     * 富文本编辑器 editor实例化之后返回值
     * editor.txt.html('<p>用 JS 设置的内容</p>') 值为空则为获取
     * editor.txt.text()获取无标签
     * editor.txt.append('<p>追加的内容</p>')
     * editor.txt.clear()
     * editor.txt.getJSON获取 JSON 格式的编辑器的内容
     *
     * 参数说明
     * @param editorObjName     用于存储富文本编辑器对象的状态名 *
     * @param toolbarSelector   存储菜单的节点
     * @param textSelector      编辑内容的节点
     * @param editorContentName    存储初始化显示的编辑内容的状态名
     */

    editor(editorObjName, toolbarSelector, textSelector = null, editorContentName){
        let editor = require('wangeditor');
        let result = new editor(toolbarSelector, textSelector);

        result.customConfig.menus = [
            'head',  // 标题
            'bold',  // 粗体
            'fontSize',  // 字号
            'fontName',  // 字体
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            'foreColor',  // 文字颜色
            'backColor',  // 背景颜色
            'link',  // 插入链接
            'list',  // 列表
            'justify',  // 对齐方式
            'quote',  // 引用
            'emoticon',  // 表情
            'image',  // 插入图片
            'table',  // 表格
            // 'video',  // 插入视频
            'code',  // 插入代码
            'undo',  // 撤销
            'redo'  // 重复
        ];

        editor_L.editorText.call(this, result, editorObjName, toolbarSelector, textSelector, editorContentName);
    },
    // 自定义初始化富文本
    editorText(Editor, editorObjName, toolbarSelector, textSelector, editorContentName){
        // 插入图片最大宽度
        imgMaxWidth = getComputedStyle(textSelector).width;

        // 关闭粘贴样式的过滤
        Editor.customConfig.pasteFilterStyle = false;

        // 是否忽略粘贴内容中的图片
        Editor.customConfig.pasteIgnoreImg = false;
        // 粘贴触发的函数
        // Editor.customConfig.pasteTextHandle = function (content) {
        //     // content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回
        //     return content
        // };

        textSelector.onpaste =  (e) => {
            //获取clipboardData对象
            let data =e.clipboardData||window.clipboardData;
            //获取图片内容
            let blob = data.items[0].getAsFile();
            //判断是不是图片，最好通过文件类型判断
            let isImg = (blob&&1) || -1;
            let reader = new FileReader();
            if(isImg>=0){
                //将文件读取为 DataURL
                reader.readAsDataURL(blob);
            }

            reader.onload =  (event) => {
                let base64_str = event.target.result;
                // 在编辑内容中插入图片
                editor_L.inEditorText.call(this, editorObjName, base64_str)
            }
        };

        // 插入图片时触发
        // Editor.customConfig.linkImgCallback = function (url) {
        //     console.log(url) // url 即插入图片的地址
        // };

        // 校验插入链接
        // Editor.customConfig.linkCheck = function (text, link) {
        //     console.log(text) // 插入的文字
        //     console.log(link) // 插入的链接
        //
        //     return true // 返回 true 表示校验成功
        //     // return '验证失败' // 返回字符串，即校验失败的提示信息
        // };
        Editor.create();
        if (this[editorContentName]) {
            Editor.txt.html(this[editorContentName]);
        }

        this[editorObjName] = Editor;

        // 添加本地上传功能
        let label = document.createElement('label');
        let ipt = document.createElement('input');
        ipt.type = 'file';
        ipt.id = 'pic';
        ipt.style = 'position: fixed;top: -1000px;';
        ipt.onchange = editor_L.getPicture.bind(this, editorObjName);
        label.innerHTML = '本地图片上传';
        label.style = "position: relative;top:1px;";
        label.className = 'pointer';
        label.setAttribute('for', 'pic');
        toolbarSelector.appendChild(label);
        toolbarSelector.appendChild(ipt);
    },
    /**
     * 获取本地图片数据并插入光标处
     * @param editorObjName     用于存储富文本编辑器对象的状态名 *
     * @param e     Event事件对象
     * @returns {Promise<void>}
     */
    async getPicture(editorObjName, e){
        let picData = await editor_L.getPictureData.call(this, e);
        editor_L.inEditorText.call(this, editorObjName, picData)
    },
    inEditorText(editorObjName, picData){
        let Editor = this[editorObjName],
            evt = Editor.selection.getSelectionContainerElem()[0],
            endOffset = Editor.selection._currentRange.endOffset,
            imgStr = `<span><img src="${picData}" alt="" style="max-width: ${(imgMaxWidth.match(/\d+/)[0] - 35) + 'px'}"></span>`;   // 光标位于当前元素的位置

        // 是否为 <span><img/></span> 的格式 --> <span><span><img/></span><span><img/></span></span>
        let nodeEl = evt.childNodes[0];
        if (nodeEl.nodeName === 'IMG'){
            evt.innerHTML = `<span><img src="${nodeEl.src}" /></span>` + `<span>${imgStr}</span>`
        } else {
            // 元素中无img节点
            // 获取光标最后停留的元素
            let leftStr = evt.innerHTML.substring(0, endOffset),
                rightStr = evt.innerHTML.substring(endOffset, evt.innerHTML.length);
            evt.innerHTML = `<span>${leftStr.trim()}</span>` + imgStr.trim() + `<span>${rightStr.trim()}</span>`;
        }
    },
    // 将图片插入编辑内容

    /**
     * 获取上传图片数据
     * @param e 事件对象
     * @returns {Promise<unknown>} 图片数据
     */
    getPictureData(e){
        return new Promise(resolve=>{
            let file = e.target.files;
            if(!file.length) return;
            let reader = new FileReader();
            reader.onload = (e) => {    //成功读取文件
                resolve(e.target.result)
            };
            reader.readAsDataURL(file[0]);
        })
    }
};

export default editor_L.editor
