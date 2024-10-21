class DBManager {
    /**
     * データベースマネージャ
     */
    constructor(scene) {
        this.scene = scene;
        this.tabDataMap = {};
    }

    /**
     * 指定した名前のテーブルデータの参照を取得し保持する
     * @param {string} tabName テーブル名
     */
    loadTabData(tabName) {
        this.tabDataMap[tabName] = this.scene.registry.get(tabName);
    }

    /**
     * 指定したIDの要素を取得する
     * @param {string} tabName テーブル名
     * @param {string} id 要素のID
     */
    selectById(tabName, id) {
        /** @type {DataModel[]} */
        let modelList = [];

        // 一致するデータを取得
        let dataList = this.tabDataMap[tabName].filter(data => data[C_DB.COLNAME_COM_ID] == id);

        for (let data of dataList) {
            // モデルを配列にセット
            modelList.push(new DataModel(tabName, data));
        }

        return ObjectUtil.deepCopy(modelList);
    }

    /**
     * 指定したタイプの要素を取得する
     * @param {string} tabName テーブル名
     * @param {string} type 要素のタイプ
     */
    selectByType(tabName, type) {
        /** @type {DataModel[]} */
        let modelList = [];

        // 一致するデータを取得
        let dataList = this.tabDataMap[tabName].filter(data => data[C_DB.COLNAME_COM_TYPE] == type);

        for (let data of dataList) {
            // モデルを配列にセット
            modelList.push(new DataModel(tabName, data));
        }

        return ObjectUtil.deepCopy(modelList);
    }

    /**
     * 指定したメニューIDの要素を取得する
     * @param {string} tabName テーブル名
     * @param {string} menuId 要素のメニューID
     */
    selectByMenuId(tabName, menuId) {
        /** @type {DataModel[]} */
        let modelList = [];

        // 一致するデータを取得
        let dataList = this.tabDataMap[tabName].filter(data => data[C_DB.COLNAME_MENUID] == menuId);

        for (let data of dataList) {
            // モデルを配列にセット
            modelList.push(new DataModel(tabName, data));
        }

        return ObjectUtil.deepCopy(modelList);
    }

    /**
     * 指定したメニューIDとカラムIDの要素を取得する
     * @param {string} tabName テーブル名
     * @param {string} menuId 要素のメニューID
     * @param {string} colId 要素のカラムID
     */
    selectByMenuIdAndColId(tabName, menuId, colId) {
        /** @type {DataModel[]} */
        let modelList = [];

        // 一致するデータを取得
        let dataList = this.tabDataMap[tabName].filter(data =>
            data[C_DB.COLNAME_MENUID] == menuId &&
            data[C_DB.COLNAME_COLID] == colId
        );

        for (let data of dataList) {
            // モデルを配列にセット
            modelList.push(new DataModel(tabName, data));
        }

        return ObjectUtil.deepCopy(modelList);
    }

    // /**
    //  * 指定したIDの要素を削除する
    //  * @param {string} tabName テーブル名
    //  * @param {string} id 要素のID
    //  */
    // deleteById(tabName, id) {
    //     if (tabName.startsWith("Mst")) {
    //         console.log(`マスタテーブルのデータは削除できません。テーブル名: ${tabName}`);
    //         return;
    //     }
    //     // ここで削除ロジックを実装


    // }

}