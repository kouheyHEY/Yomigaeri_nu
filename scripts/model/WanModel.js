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
        this.hp = 2;
        /** @type {number} 体力最大値 */
        this.hpMax = 3;
        /** @type {number} なつき度 */
        this.affection = 2;
        /** @type {number} なつき度最大値 */
        this.affectionMax = 3;
        /** @type {number} 筋力 */
        this.muscle = 0;
        /** @type {number} 知力 */
        this.intelligence = 0;
        /** @type {number} 魅力 */
        this.charm = 0;

        // 潜在パラメータ
        /** @type {Map<string, number>} 各アクションの実行回数 */
        this.actionNumMap = new Map();
        // 初期化
        for (const key in C_COMMON.ACTION_KEY) {
            this.actionNumMap.set(key, 0);
        }

        // アクションの効果、後で反映
        /** @type {Map<string, number>} 各アクションの効果 */
        this.actionEffectMap = new Map();
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
            hpRate: this.hp / this.hpMax,
            affection: this.affection,
            affectionRate: this.affection / this.affectionMax,
            muscle: this.muscle,
            intelligence: this.intelligence,
            charm: this.charm,
        };
    }

    /**
     * アクションの効果を設定する
     * @param {Map<string, number>} actionEffectMap アクションの効果のマップ
     */
    setEffectByMap(actionEffectMap) {
        if (this.actionEffectMap.size > 0) {
            throw new Error("アクションの効果が既に設定されています。");
        }
        this.actionEffectMap = actionEffectMap;
    }

    /**
     * アクションの効果を反映する
     */
    applyEffect() {
        if (this.actionEffectMap.size === 0) {
            throw new Error("アクションの効果が設定されていません。");
        }

        for (const key in this.actionEffectMap) {
            this[key] += this.actionEffectMap.get(key);
        }

        this.actionEffectMap.clear();
    }

    /**
     * アクションの実行回数をカウントする
     * @param {string} key アクションのキー
     */
    countActionNum(key) {
        if (!this.actionNumMap.has(key)) {
            throw new Error(`アクションの実行回数が設定されていません。key: ${key}`);
        }
        this.actionNumMap.set(key, this.actionNumMap.get(key) + 1);
    }
}