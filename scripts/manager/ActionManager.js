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
        // 体力減少、なつき度増加、筋力増加、魅力増加、知力減少
        if (key == C_COMMON.ACTION_KEY.WALK) {
            delta_hp = C_COMMON.ACTION_EFFECT_VAL.DEC;
            delta_affection = C_COMMON.ACTION_EFFECT_VAL.INC;
            delta_muscle = C_COMMON.ACTION_EFFECT_VAL.INC;
            delta_charm = C_COMMON.ACTION_EFFECT_VAL.INC;
            delta_intelligence = C_COMMON.ACTION_EFFECT_VAL.DEC;
        }
        // ごはん
        // 体力増加、魅力減少、筋力少し増加、知力減少
        if (key == C_COMMON.ACTION_KEY.FOOD) {
            delta_hp = C_COMMON.ACTION_EFFECT_VAL.INC;
            delta_charm = C_COMMON.ACTION_EFFECT_VAL.SMALL_DEC;
            delta_muscle = C_COMMON.ACTION_EFFECT_VAL.SMALL_INC;
            delta_intelligence = C_COMMON.ACTION_EFFECT_VAL.DEC;
        }
        // 風呂
        // なつき度減少、魅力かなり増加、筋力少し減少
        if (key == C_COMMON.ACTION_KEY.BATH) {
            delta_affection = C_COMMON.ACTION_EFFECT_VAL.DEC;
            delta_charm = C_COMMON.ACTION_EFFECT_VAL.LARGE_INC;
            delta_muscle = C_COMMON.ACTION_EFFECT_VAL.SMALL_DEC;
        }
        // 寝る
        // 体力増加、筋力減少、知力増加
        if (key == C_COMMON.ACTION_KEY.SLEEP) {
            delta_hp = C_COMMON.ACTION_EFFECT_VAL.INC;
            delta_muscle = C_COMMON.ACTION_EFFECT_VAL.DEC;
            delta_intelligence = C_COMMON.ACTION_EFFECT_VAL.INC;
        }
        // じゃれつく
        // 体力かなり減少、なつき度かなり増加、筋力少し増加
        if (key == C_COMMON.ACTION_KEY.JARETSUKU) {
            delta_hp = C_COMMON.ACTION_EFFECT_VAL.HUGE_DEC;
            delta_affection = C_COMMON.ACTION_EFFECT_VAL.LARGE_INC;
            delta_muscle = C_COMMON.ACTION_EFFECT_VAL.SMALL_INC;
        }
        // 筋トレ
        // 体力かなり減少、なつき度減少、筋力かなり増加、魅力増加、知力かなり減少
        if (key == C_COMMON.ACTION_KEY.TRAINING) {
            delta_hp = C_COMMON.ACTION_EFFECT_VAL.HUGE_DEC;
            delta_affection = C_COMMON.ACTION_EFFECT_VAL.DEC;
            delta_muscle = C_COMMON.ACTION_EFFECT_VAL.LARGE_INC;
            delta_charm = C_COMMON.ACTION_EFFECT_VAL.INC;
            delta_intelligence = C_COMMON.ACTION_EFFECT_VAL.HUGE_DEC;
        }

        effectMap.set(C_COMMON.PARAM_KEY.HP, delta_hp);
        effectMap.set(C_COMMON.PARAM_KEY.AFFECTION, delta_affection);
        effectMap.set(C_COMMON.PARAM_KEY.MUSCLE, delta_muscle);
        effectMap.set(C_COMMON.PARAM_KEY.CHARM, delta_charm);
        effectMap.set(C_COMMON.PARAM_KEY.INTELLIGENCE, delta_intelligence);
        return effectMap;
    }
}