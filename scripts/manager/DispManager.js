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

}