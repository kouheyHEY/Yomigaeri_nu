class IkuseiScene extends BaseScene {
    constructor() {
        super(C_COMMON.SCENE_IKUSEISCENE);
    }

    initInstVal() {
    }

    initArea() {

        // 背景色を設定
        this.cameras.main.setBackgroundColor(C_COMMON.COMMON_COLOR_WHITE);

        // 左下にウインドウを表示
        this.menuWindow = new TextWindow(this, C_IS.WINDOW_MENU_X, C_IS.WINDOW_MENU_Y, C_IS.WINDOW_MENU_W, C_IS.WINDOW_MENU_H);
        // ウインドウのプロパティを設定
        this.menuWindow.setProperty({
            frameWeight: C_COMMON.WINDOW_FRAME_WEIGHT,
            frameColor: C_COMMON.COMMON_COLOR_WINDOW_FRAME,
            frameRound: C_COMMON.WINDOW_ROUND,
            bgColor: C_COMMON.COMMON_COLOR_WINDOW_BG,
            fontSize: C_COMMON.FONT_SIZE_SMALL,
            fontColor: C_COMMON.COMMON_COLOR_WINDOW_FONT,
            fontFamily: C_COMMON.FONT_FAMILY_BIT12,
        });
        // ウインドウに表示する内容を追加
        this.menuWindow.addDispContent(
            C_MENU.DISP_CONTENT_MAP.TALK.KEY,
            C_MENU.DISP_CONTENT_MAP.TALK.STRING
        );
        // ウインドウを描画
        this.menuWindow.redraw();
    }

    update() {
        this.menuWindow.redraw();
    }
}