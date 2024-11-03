class ActionManager {
    /**
     * アクションの効果量を取得する
     * @param {string} key アクションのキー
     * @returns {Map<string, number>} アクションの効果量のマップ
     */
    static getActionEffectMap(key) {
        const effectMap = new Map();
        let delta_hp = 0;
        let delta_affection = 0;
        let delta_muscle = 0;
        let delta_charm = 0;
        let delta_intelligence = 0;
        // 散歩
        // 体力減少, なつき度増加, 知力減少, 魅力減少
        if (key == C_COMMON.ACTION_KEY.WALK) {
            delta_hp = C_COMMON.ACTION_EFFECT_VAL.DEC;
            delta_affection = C_COMMON.ACTION_EFFECT_VAL.INC;
            delta_intelligence = C_COMMON.ACTION_EFFECT_VAL.DEC;
            delta_charm = C_COMMON.ACTION_EFFECT_VAL.DEC;
        }
        // ごはん
        // 体力増加, なつき度増加, 魅力減少
        if (key == C_COMMON.ACTION_KEY.FOOD) {
            delta_hp = C_COMMON.ACTION_EFFECT_VAL.INC;
            delta_affection = C_COMMON.ACTION_EFFECT_VAL.INC;
            delta_charm = C_COMMON.ACTION_EFFECT_VAL.DEC;
        }
        // 風呂
        // なつき度減少, 筋力減少, 魅力増加
        if (key == C_COMMON.ACTION_KEY.BATH) {
            delta_affection = C_COMMON.ACTION_EFFECT_VAL.DEC;
            delta_muscle = C_COMMON.ACTION_EFFECT_VAL.DEC;
            delta_charm = C_COMMON.ACTION_EFFECT_VAL.INC;
        }
        // 寝る
        // 体力増加, 筋力減少, 知力増加
        if (key == C_COMMON.ACTION_KEY.SLEEP) {
            delta_hp = C_COMMON.ACTION_EFFECT_VAL.INC;
            delta_muscle = C_COMMON.ACTION_EFFECT_VAL.DEC;
            delta_intelligence = C_COMMON.ACTION_EFFECT_VAL.INC;
        }
        // じゃれつく
        // 体力減少, なつき度増加, 筋力増加, 知力増加
        if (key == C_COMMON.ACTION_KEY.JARETSUKU) {
            delta_hp = C_COMMON.ACTION_EFFECT_VAL.DEC;
            delta_affection = C_COMMON.ACTION_EFFECT_VAL.INC;
            delta_muscle = C_COMMON.ACTION_EFFECT_VAL.INC;
            delta_intelligence = C_COMMON.ACTION_EFFECT_VAL.INC;
        }
        // 筋トレ
        // 体力減少, なつき度減少, 筋力増加, 知力減少, 魅力増加
        if (key == C_COMMON.ACTION_KEY.TRAINING) {
            delta_hp = C_COMMON.ACTION_EFFECT_VAL.DEC;
            delta_affection = C_COMMON.ACTION_EFFECT_VAL.DEC;
            delta_muscle = C_COMMON.ACTION_EFFECT_VAL.INC;
            delta_intelligence = C_COMMON.ACTION_EFFECT_VAL.DEC;
            delta_charm = C_COMMON.ACTION_EFFECT_VAL.INC;
        }

        // 乱数調整用のアロー関数を定義
        // 引数は、調整対象の数値
        // 戻り値は、調整後の数値
        const randomize = (val) => {
            // 乱数で+-50% 元の値が12なら、調整の値は-6~6
            let deltaVal = Math.floor(val * (Math.random() - 0.5));
            deltaVal = Math.max(deltaVal, C_COMMON.ACTION_RESULT_VAL_MIN);
            deltaVal = Math.min(deltaVal, C_COMMON.ACTION_RESULT_VAL_MAX);
            // 調整後の数値を返す
            return val + deltaVal;
        };

        // 各変数は、反映前に乱数で+-50%、上限8で調整
        delta_hp = randomize(delta_hp);
        delta_affection = randomize(delta_affection);
        delta_muscle = randomize(delta_muscle);
        delta_charm = randomize(delta_charm);
        delta_intelligence = randomize(delta_intelligence);

        effectMap.set(C_COMMON.PARAM_KEY.HP, delta_hp);
        effectMap.set(C_COMMON.PARAM_KEY.AFFECTION, delta_affection);
        effectMap.set(C_COMMON.PARAM_KEY.MUSCLE, delta_muscle);
        effectMap.set(C_COMMON.PARAM_KEY.CHARM, delta_charm);
        effectMap.set(C_COMMON.PARAM_KEY.INTELLIGENCE, delta_intelligence);

        return effectMap;
    }
}