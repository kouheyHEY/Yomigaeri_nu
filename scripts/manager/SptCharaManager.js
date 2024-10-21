/**
 * 味方キャラマネージャー
 */
class SptCharaManager {
    /**
     * コンストラクタ
     * @param {Scene} scene シーン
     */
    constructor(scene) {
        this.scene = scene;
        /* キャラクター一覧 */
        this.characters = [];
    }

    /**
     * キャラクターをセットする
     * @param {DataModel[]} chraraModels キャラクターのデータモデル
     */
    setCharacters(charaModels) {
        if (this.characters.length > 0) {
            // 既に初期化されている場合
            return;
        }
        this.characters = charaModels;
    }

    /**
     * 指定したIDのキャラクターを取得する
     * @param {number} id キャラクターID
     * @returns {DataModel} キャラクターのデータモデル
     */
    getCharacter(id) {
        return ObjectUtil.deepCopy(this.characters.find(chara => chara.id == id));
    }

    /**
     * 全キャラクターを取得する
     * @returns {DataModel[]} キャラクターモデルの配列
     */
    getAllCharacters() {
        return ObjectUtil.deepCopy(this.characters);
    }

    /**
     * 指定したIDのキャラクターが存在するかどうかを確認する
     * @param {number} id キャラクターID
     * @returns {boolean} キャラクターが存在するかどうか
     */
    isCharaExist(id) {
        let isExist = false;
        // 指定したidのキャラクターが存在しない場合はfalse
        if (this.characters.find(chara => chara.id == id) == null) {
            isExist = false;
        } else {
            // キャラの名前がnullでない場合はtrue
            isExist = this.characters.find(chara => chara.id == id).name !== C_DB.T_SPT_CHARA.NAME_NULL;
        }
        return isExist;
    }

    /**
     * 指定したIDのキャラクターの対象パラメータを更新する
     * @param {number} id キャラクターID
     * @param {object} updateParams 更新パラメータ
     */
    updateCharacter(id, updateParams) {
        const character = this.getCharacter(id);
        if (!character) {
            // キャラが存在しない場合
            throw new Error(`[SptCharaManager.updateCharacter] キャラが存在しません。characterId: ${id}`);
        }
        for (const key in updateParams) {
            // 更新パラメータを更新
            character[key] = updateParams[key];
        }
    }

    /**
     * 指定したキャラクターにエフェクトを適用する
     * @param {number} characterId キャラクターID
     * @param {EffectModel} effect エフェクトモデル
     * @param {number} type エフェクト種類
     */
    applyEffect(characterId, effect, type) {
        const character = this.getCharacter(characterId);
        if (!character) {
            // キャラが存在しない場合
            throw new Error(`[SptCharaManager.applyEffect] キャラが存在しません。characterId: ${characterId}`);
        }

        if (type === C_COMMON.EFFECT_TYPE_ITEM) {
            // アイテムの場合
            EffectUtils.applyItemEffect(effect, character);
        } else if (type === C_COMMON.EFFECT_TYPE_ACTION) {
            // アクションの場合
            EffectUtils.applyActionEffect(effect, character);
        }
        this.updateCharacter(characterId, character);
    }

}