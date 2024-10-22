/**
 * ウインドウに表示する内容のエンティティ
 * 表示内容のアーカイブ、復元、子メニューの取得、選択肢の設定を行う
 */
class DispContent {

    /**
     * 表示内容オブジェクトの型定義
     * @typedef {Object} DispContentObj
     * @property {string[]} expl - 説明
     * @property {object[] | null} obj - 表示内容
     * @property {number} dispObjType - 表示内容のタイプ
     * @property {string[]} dispStr - 表示する文字列
     * @property {number} choosedIdx - 選択した内容のインデックス
     * @property {boolean} isList - リスト形式の表示かどうか
     * @property {boolean} isLine - 1行形式の表示かどうか
     * @property {boolean} isMenu - メニュー形式の表示かどうか
     */

    /**
     * ウインドウに表示する内容のエンティティ
     * @param {boolean} isList リストかどうか
     * @param {boolean} isLine 文章かどうか
     * @param {boolean} isMenu 選択可能かどうか
     * @param {number} type 表示コンテンツタイプ
     * @param {Phaser.Scene} scene 使用シーン
     */
    constructor(isList, isLine, isMenu, type, scene) {
        this.history = new ContentHistory();

        /** @type {DispContentObj} */
        this.dispContentObj = {
            expl: [],
            obj: [],
            dispObjType: type,
            dispStr: [],
            choosedIdx: 0,
            isList: isList,
            isLine: isLine,
            isMenu: isMenu,
        };

        // 使用シーン
        this.scene = scene;
    }

    /** @type {string[]} */
    get expl() { return this.dispContentObj.expl; }
    set expl(value) { this.dispContentObj.expl = value; }

    /** @type {object[]} */
    get obj() { return this.dispContentObj.obj; }
    set obj(value) { this.dispContentObj.obj = value; }

    /** @type {number} */
    get dispObjType() { return this.dispContentObj.dispObjType; }
    set dispObjType(value) { this.dispContentObj.dispObjType = value; }

    /** @type {string[]} */
    get dispStr() { return this.dispContentObj.dispStr; }
    set dispStr(value) { this.dispContentObj.dispStr = value; }

    /** @type {boolean} */
    get isList() { return this.dispContentObj.isList; }
    set isList(value) { this.dispContentObj.isList = value; }

    /** @type {boolean} */
    get isLine() { return this.dispContentObj.isLine; }
    set isLine(value) { this.dispContentObj.isLine = value; }

    /** @type {boolean} */
    get isMenu() { return this.dispContentObj.isMenu; }
    set isMenu(value) { this.dispContentObj.isMenu = value; }

    /**
     * 表示対象オブジェクトを追加し、表示文字列、表示説明文を設定する
     * 説明文がない時は空文字を設定する
     * @param {object} dispObj 表示対象のオブジェクト
     */
    addContent(dispObj) {
        this.dispContentObj.obj.push(dispObj);
        const { dispStr, expl } = this.getDisplayInfo(dispObj);
        this.dispContentObj.dispStr.push(dispStr);
        this.dispContentObj.expl.push(expl);
    }

    /**
     * 表示対象オブジェクトのリストを追加する
     * @param {object[]} dispObjList 表示対象のオブジェクトのリスト
     */
    addContentList(dispObjList) {
        dispObjList.forEach(dispObj => {
            this.addContent(dispObj);
        });
    }

    /**
     * 表示情報を取得する
     * @param {object} obj 表示対象のオブジェクト
     * @returns {{dispStr: string, expl: string}} 表示文字列と説明文
     * @private
     */
    getDisplayInfo(obj) {
        if (typeof obj === 'string') {
            return { dispStr: obj, expl: '' };
        } else {
            if (obj.tabName !== undefined && obj.tabName == C_DB.TABLE_NAME.M_MENU) {
                return { dispStr: obj.colName, expl: obj.expl };
            } else {
                return { dispStr: obj.name, expl: obj.expl };
            }
        }
    }

    /**
     * 表示内容を履歴に保存する
     * @param {number} index 選択した要素
     */
    archiveContent(index) {
        this.dispContentObj.choosedIdx = index;
        this.history.add(ObjectUtil.deepCopy(this.dispContentObj));
    }

    /** 表示内容を履歴から復元する */
    restoreContent() {
        if (this.history.isEmpty()) {
            throw new Error('[DispContent.restoreContent]履歴がありません。');
        }
        Object.assign(this.dispContentObj, this.history.restore());
    }

    /**
     * 表示コンテンツの数を取得する
     * @returns {number} コンテンツ数
     */
    getContentLength() {
        return this.dispContentObj.obj.length;
    }
}