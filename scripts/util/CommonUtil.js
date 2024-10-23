class CommonUtil {

    /**
     * 文字列型のカラーコードを数値型のカラーコードに変換する
     * @param {string} colorCode 文字列型のカラーコード
     * @returns {number} 数値型のカラーコード
     */
    static convertColorCode(colorCode) {
        return parseInt(colorCode.replace('#', '0x'));
    }
}