/**
 * データベースから取得した値を保持するモデルクラス
 */
class DataModel {
    /**
     * データをセットする
     * @param {string} tabName データの取得元テーブル
     * @param {Object[]} initialData 取得データ
     */
    constructor(tabName, initialData = {}) {
        // 初期データにtabNameを追加
        this.data = { ...initialData, tabName };

        return new Proxy(this.data, {
            get(target, prop) {
                return target[prop];
            },
            set(target, prop, value) {
                target[prop] = value;
                return true;
            }
        });
    }

    // プロパティを追加するメソッド
    addProperty(key, value) {
        this.data[key] = value;
    }

    // データを取得するメソッド
    getData() {
        return this.data;
    }
}