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
        this.name = C_IS.PARAM_INIT_VALUE.name;
        /** @type {number} 転生レベル */
        this.ascensionLevel = C_IS.PARAM_INIT_VALUE.ascensionLevel;
        /** @type {number} 体力 */
        this.hp = C_IS.PARAM_INIT_VALUE.hp;
        /** @type {number} 体力最大値 */
        this.hpMax = C_IS.PARAM_INIT_VALUE.hpMax;
        /** @type {number} なつき度 */
        this.affection = C_IS.PARAM_INIT_VALUE.affection;
        /** @type {number} なつき度最大値 */
        this.affectionMax = C_IS.PARAM_INIT_VALUE.affectionMax;
        /** @type {number} 筋力 */
        this.muscle = C_IS.PARAM_INIT_VALUE.muscle;
        /** @type {number} 知力 */
        this.intelligence = C_IS.PARAM_INIT_VALUE.intelligence;
        /** @type {number} 魅力 */
        this.charm = C_IS.PARAM_INIT_VALUE.charm;

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
            this.actionEffectMap.clear();
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

        for (const [key, value] of this.actionEffectMap) {
            if (this[key] === undefined) {
                throw new Error(`パラメータが設定されていません。key: ${key}`);
            }

            if (key === C_COMMON.PARAM_KEY.HP || key === C_COMMON.PARAM_KEY.AFFECTION) {
                // hp, なつき度は最大値を超えない
                this[key] = Math.min(this[key] + value, this[`${key}Max`]);
            } else {
                // その他はそのまま
                this[key] += value;
            }
            // 0未満になることはない
            this[key] = Math.max(this[key], 0);
        }
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