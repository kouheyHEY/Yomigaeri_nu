class IkuseiScene extends BaseScene {
    constructor() {
        super(C_COMMON.SCENE_IKUSEISCENE);
    }

    initInstVal() {
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

        // ウインドウに表示する内容を追加
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