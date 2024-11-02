const C_IS = {

    /** インフォ表示用ウインドウ X座標 */
    WINDOW_INFO_X: 800,
    /** インフォ表示用ウインドウ Y座標 */
    WINDOW_INFO_Y: 24,
    /** インフォ表示用ウインドウ 幅 */
    WINDOW_INFO_W: 448,
    /** インフォ表示用ウインドウ 高さ */
    WINDOW_INFO_H: 672,
    /** インフォ表示用ウインドウの列数 */
    WINDOW_INFO_COLUMN: 2,

    /** メイン用テキストウインドウ X座標 */
    WINDOW_TEXT_MAIN_X: 32,
    /** メイン用テキストウインドウ Y座標 */
    WINDOW_TEXT_MAIN_Y: 552,
    /** メイン用テキストウインドウ 幅 */
    WINDOW_TEXT_MAIN_W: 736,
    /** メイン用テキストウインドウ 高さ */
    WINDOW_TEXT_MAIN_H: 144,
    /** メイン用テキストウインドウの列数 */
    WINDOW_TEXT_MAIN_COLUMN: 2,

    /** 各パラメータの初期値 */
    PARAM_INIT_VALUE: {
        name: "ワン丸",
        ascensionLevel: 0,
        hp: 50,
        hpMax: 100,
        affection: 50,
        affectionMax: 100,
        muscle: 10,
        intelligence: 10,
        charm: 10,
    },

    /** ゲージのプロパティ */
    GAUGE_PROPERTY: {
        hpGauge: {
            /** ゲージの幅 */
            WIDTH: 320,
            /** ゲージの高さ */
            HEIGHT: 16,
            /** ゲージのマージン */
            MARGIN: 16,
            /** ゲージの枠の幅 */
            BORDER_WIDTH: 2,
            /** ゲージの枠の色 */
            BORDER_COLOR: C_COMMON.COMMON_COLOR_BLACK_1,
            /** ゲージの背景色 */
            BG_COLOR: C_COMMON.COMMON_COLOR_WHITE,
            /** ゲージのバーの色 */
            BAR_COLOR: C_COMMON.COMMON_COLOR_BLACK_4,
        },
        affectionGauge: {
            /** ゲージの幅 */
            WIDTH: 320,
            /** ゲージのマージン */
            MARGIN: 16,
            /** ゲージの高さ */
            HEIGHT: 16,
            /** ゲージの枠の幅 */
            BORDER_WIDTH: 2,
            /** ゲージの枠の色 */
            BORDER_COLOR: C_COMMON.COMMON_COLOR_BLACK_1,
            /** ゲージの背景色 */
            BG_COLOR: C_COMMON.COMMON_COLOR_WHITE,
            /** ゲージのバーの色 */
            BAR_COLOR: C_COMMON.COMMON_COLOR_BLACK_4,
        },
    },
};