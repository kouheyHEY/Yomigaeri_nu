/**
 * ワンモデル
 */
class WanModel {
    /**
     * コンストラクタ
     */
    constructor() {
        // パラメータ
        /** @type {string} 名前 */
        this.name = "デフォルト";
        /** @type {number} 転生レベル */
        this.ascensionLevel = 0;
        /** @type {number} 体力 */
        this.hp = 0;
        /** @type {number} 体力最大値 */
        this.hpMax = 0;
        /** @type {number} なつき度 */
        this.affection = 0;
        /** @type {number} なつき度最大値 */
        this.affectionMax = 0;
        /** @type {number} 筋力 */
        this.muscle = 0;
        /** @type {number} 知力 */
        this.intelligence = 0;
        /** @type {number} 魅力 */
        this.charm = 0;

        // 潜在パラメータ
        /** @type {Map<string, number>} 潜在パラメータ */
        this.actionNumMap = new Map();
        // 初期化
        for (const key in C_COMMON.ACTION_KEY) {
            this.actionNumMap.set(key, 0);
        }
    }

    /**
     * 表示パラメータを取得する
     * @returns {Object} 表示パラメータ
     * @property {string} name 名前
     * @property {number} ascensionLevel 転生レベル
     * @property {number} hp 体力
     * @property {number} affection なつき度
     * @property {number} muscle 筋力
     * @property {number} intelligence 知力
     * @property {number} charm 魅力
     */
    getDispParamObj() {
        return {
            name: this.name,
            ascensionLevel: this.ascensionLevel,
            hp: this.hp,
            affection: this.affection,
            muscle: this.muscle,
            intelligence: this.intelligence,
            charm: this.charm,
        };
    }
}