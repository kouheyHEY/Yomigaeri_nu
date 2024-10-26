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
        for (const param of C_MASTER.PARAM_LIST) {
            // ゲージの場合
            if (param.TYPE === "gauge") {
                param.VALUE = wanDispParamObj[param.VALUE_KEY];
                param.COL = this.infoWindow.column;
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
        for (const menu of C_MASTER.MENU_LIST) {
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
    }
}