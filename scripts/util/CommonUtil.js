class CommonUtil {

    /**
     * 文字列型のカラーコードを数値型のカラーコードに変換する
     * @param {string} colorCode 文字列型のカラーコード
     * @returns {number} 数値型のカラーコード
     */
    static convertColorCode(colorCode) {
        return parseInt(colorCode.replace('#', '0x'));
    }

    /**
     * pxがついている文字列を数値に変換する
     * @param {string} str 文字列
     * @returns {number} 数値
     */
    static convertPxToNumber(str) {
        // 未定義の場合は0を返す
        if (str === undefined) {
            return 0;
        }

        // 数値の場合はそのまま返す
        if (typeof str === 'number') {
            return str;
        }

        // pxがついている場合はpxを取り除いて数値に変換
        if (str.includes('px')) {
            return parseInt(str.replace('px', ''));
        }

        return parseInt(str);
    }

    /**
     * 文字列をフォーマットする
     * 「{}」に順番に値を割り当てていく
     * 使い方：
     * @param {string} str 文字列
     * @param {Object} list フォーマットするオブジェクトのリスト
     * @returns {string} フォーマットした文字列
     */
    static formatString(str, list) {
        let index = 0;
        // {}を値に置き換える
        return str.replace(/\{\}/g, () => list[index++] ?? '');
    }
}