class DispManager {

    /**
     * コンストラクタ
     * @param {Phaser.Scene} scene シーン
     */
    constructor(scene) {
        this.scene = scene;

        /** 表示ウインドウのマップ
         * @type {{[key: string]: TextWindow}}
         */
        this.dispWindowMap = {};
        /** @type {CursorWindow} */
        this.cursorWindow = new CursorWindow(this.scene);
        /** @type {string} */
        this.cursorText = null;
    }

    update() {
        this.updateCursorWindowPos();

        // カーソルウインドウを最前面に表示
        this.cursorWindow.bringToTop();

        // ウインドウの配列を取得
        const windows = Object.values(this.dispWindowMap);

        // ウインドウが登録されている場合
        if (Object.keys(this.dispWindowMap).length > 0 && windows != null) {
            this.cursorText = null;
            for (const window of windows) {
                if (window.isFocused && window.dispObj.isList) {
                    const dispDetail = window.dispObj.expl[window.choosedMenuIdx];
                    this.cursorText = dispDetail != "" ? dispDetail : null;
                    break;
                }
            }
        }

        // カーソルウインドウに内容を表示
        this.cursorWindow.setText(this.cursorText);
        // カーソルウインドウの位置調整
        this.cursorWindow.updatePos();
    }

    /**
     * 新しいウインドウを追加する
     * @param {string} key ウインドウのキー
     * @param {TextWindow} window ウインドウオブジェクト
     * @param {boolean} isOverwrite 上書きするかどうか
     */
    addNewWindow(key, window, isOverwrite = false) {
        // ウインドウが既に存在する場合はエラー
        if (this.dispWindowMap[key] != null && !isOverwrite) {
            throw new Error(`[DispManager.addNewWindow] Window already exists: ${key}`);
        }
        this.dispWindowMap[key] = window;
    }

    /**
     * 指定したキーのウインドウを取得する
     * @param {string} key ウインドウのキー
     * @returns {TextWindow} ウインドウオブジェクト
     */
    getWindow(key) {
        return this.dispWindowMap[key];
    }

    /**
     * 背景色を設定する
     * @param {string} color 背景色
     */
    setBackgroundColor(color) {
        this.scene.cameras.main.setBackgroundColor(color);
    }

    /**
     * 説明用のウインドウを表示する
     * @param {string} text 表示する説明文
     */
    showCursorWindow(text) {
        if (!this.cursorWindow) {
            this.cursorWindow = new CursorWindow(this.scene);
        }
        this.cursorWindow.setText(text);
        this.cursorWindow.isDisp = true;
    }

    /**
     * 説明用のウインドウを非表示にする
     */
    hideCursorWindow() {
        if (this.cursorWindow) {
            this.cursorWindow.isDisp = false;
        }
    }

    /**
     * 説明用のウインドウの位置を更新する
     */
    updateCursorWindowPos() {
        if (this.cursorWindow && this.cursorWindow.isDisp) {
            this.cursorWindow.updatePos();
        }
    }
}