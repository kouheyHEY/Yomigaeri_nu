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
                param.MAX = wanDispParamObj[param.KEY];
                param.VALUE = wanDispParamObj[param.KEY];
                param.COL = this.infoWindow.column;
            }
            // 改行ではない場合
            if (param.KEY !== "br") {
                param.STRING = CommonUtil.formatString(
                    param.STRING,
                    [wanDispParamObj[param.KEY]]
                );
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
    }

    update() {
    }
}