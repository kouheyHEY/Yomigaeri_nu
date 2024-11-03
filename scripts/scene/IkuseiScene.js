class IkuseiScene extends BaseScene {
    constructor() {
        super(C_COMMON.SCENE_IKUSEISCENE);
    }

    initInstVal() {
        this.wanModel = new WanModel();
    }

    initArea() {
        // 背景色を設定
        this.cameras.main.setBackgroundColor(C_COMMON.COMMON_COLOR_WHITE);

        /** インフォ表示用ウインドウの描画 START */
        // 画面右側にウインドウを表示
        this.infoWindow = new TextWindow(this, C_IS.WINDOW_INFO_X, C_IS.WINDOW_INFO_Y, C_IS.WINDOW_INFO_W, C_IS.WINDOW_INFO_H, C_IS.WINDOW_INFO_COLUMN);

        // ウインドウのプロパティを設定
        this.infoWindow.setProperty({
            frameWeight: C_COMMON.WINDOW_FRAME_WEIGHT,
            frameColor: C_COMMON.COMMON_COLOR_WINDOW_FRAME,
            frameRound: C_COMMON.WINDOW_ROUND,
            bgColor: C_COMMON.COMMON_COLOR_WINDOW_BG,
            fontSize: C_COMMON.FONT_SIZE_SMALL,
            fontColor: C_COMMON.COMMON_COLOR_WINDOW_FONT,
            fontFamily: C_COMMON.FONT_FAMILY_BIT12,
        });

        // ウインドウに表示するパラメータを追加
        const wanDispParamObj = this.wanModel.getDispParamObj();
        for (const paramMaster of C_MASTER.PARAM_LIST) {
            const param = { ...paramMaster };
            // ゲージの場合
            if (param.TYPE === "gauge") {
                param.VALUE = wanDispParamObj[param.VALUE_KEY];
            } else {
                // 改行ではない場合
                if (param.KEY !== "br") {
                    // 置き換え対象の値を取得
                    const replaceValList = (() => {
                        if (typeof wanDispParamObj[param.KEY] === "string") {
                            return [wanDispParamObj[param.KEY]];
                        } else if (Array.isArray(wanDispParamObj[param.KEY])) {
                            return wanDispParamObj[param.KEY];
                        } else {
                            return [wanDispParamObj[param.KEY]];
                        }
                    })();

                    // 文字列をフォーマット
                    param.STRING = CommonUtil.formatString(
                        param.STRING,
                        replaceValList
                    );
                }
            }
            // ウインドウに表示するパラメータを追加
            this.infoWindow.addDispContent(
                param.KEY,
                param
            );
        }

        // ウインドウに表示するメニュー内容を追加
        for (const menuMaster of C_MASTER.MENU_LIST) {
            const menu = { ...menuMaster };
            this.infoWindow.addDispContent(
                menu.KEY,
                menu
            );
        }
        // ウインドウを描画
        this.infoWindow.redraw();
        /** インフォ表示用ウインドウの描画 END */

        /** メイン用テキストウインドウの描画 START */
        this.mainWindow = new TextWindow(this, C_IS.WINDOW_TEXT_MAIN_X, C_IS.WINDOW_TEXT_MAIN_Y, C_IS.WINDOW_TEXT_MAIN_W, C_IS.WINDOW_TEXT_MAIN_H, C_IS.WINDOW_INFO_COLUMN);
        this.mainWindow.setProperty({
            frameWeight: C_COMMON.WINDOW_FRAME_WEIGHT,
            frameColor: C_COMMON.COMMON_COLOR_WINDOW_FRAME,
            frameRound: C_COMMON.WINDOW_ROUND,
            bgColor: C_COMMON.COMMON_COLOR_WINDOW_BG,
            fontSize: C_COMMON.FONT_SIZE_SMALL,
            fontColor: C_COMMON.COMMON_COLOR_WINDOW_FONT,
            fontFamily: C_COMMON.FONT_FAMILY_BIT12,
        });
        // ウインドウにランダムに会話内容を表示
        this.mainWindow.addDispContent(
            "conversation",
            {
                STRING: C_MASTER.CONVERSATIONS.DEFAULT_LIST[Math.floor(Math.random() * C_MASTER.CONVERSATIONS.DEFAULT_LIST.length)],
                KEY: "conversation",
            }
        );
        // ウインドウを描画
        this.mainWindow.redraw();
        /** メイン用テキストウインドウの描画 END */
    }

    update() {
        // 項目がホバーされている時
        if (this.infoWindow.exParam.expl != null) {
            // メインウインドウの表示内容を更新
            this.mainWindow.updateMenu(C_MASTER.CONVERSATIONS.KEY, this.infoWindow.exParam.expl);
        }

        // 項目がクリックされている時
        if (this.infoWindow.exParam.pressedKey != null) {
            // アクションの効果量を取得
            const actionEffectMap = ActionManager.getActionEffectMap(this.infoWindow.exParam.pressedKey);
            // アクションの効果を設定、反映
            this.wanModel.setEffectByMap(actionEffectMap);
            this.wanModel.applyEffect();
            // 表示用パラメータを取得
            const dispParam = this.wanModel.getDispParamObj();
            // メインウインドウの効果が反映されたパラメータの表示を、XX(+YY)の形式に変更
            for (const [key, value] of actionEffectMap) {
                // 変動量が0の場合は、表示しない
                if (value === 0) {
                    continue;
                }

                const paramMaster = C_MASTER.PARAM_LIST.find(param => param.KEY === key);
                const param = ObjectUtil.deepCopy(paramMaster);
                // パラメータに数値をあてはめる
                const paramStr = CommonUtil.formatString(param.STRING, [dispParam[key]]);
                // パラメータの表示を更新
                this.infoWindow.updateMenu(key, `${paramStr}(${value > 0 ? "+" : ""}${value})`);

                // hp, なつき度ゲージの場合は、ゲージの表示を更新
                if (key === C_COMMON.PARAM_KEY.HP || key === C_COMMON.PARAM_KEY.AFFECTION) {
                    this.infoWindow.updateGuage(key + "Gauge", dispParam[key + "Rate"]);
                }
            }
            // クリックされた項目をリセット
            this.infoWindow.exParam.pressedKey = null;
        }
    }
}