const C_COMMON = {
    /** ゲームタイトル */
    // GAME_TITLE: '犬と僕',
    GAME_TITLE: 'タイトル（仮）',
    /** 画面幅 */
    D_WIDTH: 1280,
    /** 画面高さ */
    D_HEIGHT: 720,
    /** FPS */
    FPS: 60,

    /** シーン名 PreLoadScene */
    SCENE_PRELOADSCENE: 'PreLoadScene',
    /** シーン名 TitleScene */
    SCENE_TITLESCENE: 'TitleScene',
    /** シーン名 IkuseiScene */
    SCENE_IKUSEISCENE: 'IkuseiScene',

    /** フォント ビット太字 */
    FONT_FAMILY_BIT12_BOLD: 'Bit12Bold',
    /** フォント ビット通常 */
    FONT_FAMILY_BIT12: 'Bit12',

    /** 文字の大きさ 大 */
    FONT_SIZE_LARGE: 64,
    /** 文字の大きさ 中 */
    FONT_SIZE_MEDIAM: 48,
    /** 文字の大きさ 小 */
    FONT_SIZE_SMALL: 24,
    /** 文字の大きさ 極小 */
    FONT_SIZE_SMALL_2: 18,

    /** ウインドウ 枠の太さ */
    WINDOW_FRAME_WEIGHT: 4,

    /** 共通色 白系 */
    COMMON_COLOR_WHITE: '#faebd7',

    /** 共通色 黒系１ */
    COMMON_COLOR_BLACK_1: '#1e0033',
    /** 共通色 黒系２ */
    COMMON_COLOR_BLACK_2: '#3c0066',
    /** 共通色 黒系３ */
    COMMON_COLOR_BLACK_3: '#590099',
    /** 共通色 黒系４ */
    COMMON_COLOR_BLACK_4: '#7700cc',

    /** 共通色 ウインドウ文字色 */
    COMMON_COLOR_WINDOW_FONT: '#1e0033',
    /** 共通色 ウインドウ背景色 */
    COMMON_COLOR_WINDOW_BG: '#faebd7',
    /** 共通色 ウインドウ枠色 */
    COMMON_COLOR_WINDOW_FRAME: '#1e0033',

    /** ウインドウ 行間 小 */
    WINDOW_PADDING_LINE_SMALL: 16,
    /** ウインドウ 行間 極小 */
    WINDOW_PADDING_LINE_SMALL_2: 12,
    /** ウインドウ 丸み */
    WINDOW_ROUND: 2,
    /** ウインドウ メニュー表示時の左側の余白 小 */
    WINDOW_PADDING_LEFT_SMALL: 16,
    /** ウインドウ メニュー表示時の左側の余白 極小 */
    WINDOW_PADDING_LEFT_SMALL_2: 12,

    /** キー定数 上 */
    KEY_UP: "UP",
    /** キー定数 下 */
    KEY_DOWN: "DOWN",
    /** キー定数 左 */
    KEY_LEFT: "LEFT",
    /** キー定数 右 */
    KEY_RIGHT: "RIGHT",
    /** キー定数 ENTER */
    KEY_ENTER: "ENTER",
    /** キー定数 スペースキー */
    KEY_SPACE: "SPACE",

    /** カーソルウインドウ 幅 */
    WINDOW_CURSOR_W: 320,
    /** カーソルウインドウ 高さ */
    WINDOW_CURSOR_H: 72,
    /** カーソルウインドウ 角とマウスの距離 */
    WINDOW_CURSOR_CORNER_POS: 24,

    /** メイン用ウインドウ メニュー列数 */
    WINDOW_TEXT_MAIN_COL_NUM: 3,

    /** エラーメッセージ 実装されていない */
    MSG_ERR_NOIMPL: "実装されていません。",

    /** 改行 */
    BR: "br",

    /** 各アクションのキー */
    ACTION_KEY: {
        /** 散歩 */
        WALK: "walk",
        /** ごはん */
        FOOD: "food",
        /** 風呂 */
        BATH: "bath",
        /** 寝る */
        SLEEP: "sleep",
        /** じゃれつく */
        JARETSUKU: "jaretsuku",
        /** 筋トレ */
        TRAINING: "training",

        /** KOTARO */
        KOTARO: "kotaro",
        /** ワンクイズ王 */
        WANKUIZU: "wankuizu",
        /** ワンコレ */
        WANKORE: "wankore",
        /** 転生 */
        ASCENSION: "ascension"
    },

    /** 各パラメータのキー */
    PARAM_KEY: {
        /** 名前 */
        NAME: "name",
        /** 転生レベル */
        ASCENSION_LEVEL: "ascensionLevel",
        /** 体力 */
        HP: "hp",
        /** 体力最大値 */
        HP_MAX: "hpMax",
        /** なつき度 */
        AFFECTION: "affection",
        /** なつき度最大値 */
        AFFECTION_MAX: "affectionMax",
        /** 筋力 */
        MUSCLE: "muscle",
        /** 知力 */
        INTELLIGENCE: "intelligence",
        /** 魅力 */
        CHARM: "charm",
    },

    /** アクションの効果量*/
    ACTION_EFFECT_VAL: {
        /** とてつもなく大きく増加 */
        HUGE_INC: 16,
        /** かなり大きく増加 */
        LARGE_INC: 8,
        /** 大きく増加 */
        INC: 4,
        /** 少し増加 */
        SMALL_INC: 2,
        /** 少し減少 */
        SMALL_DEC: -2,
        /** 減少 */
        DEC: -4,
        /** かなり減少 */
        LARGE_DEC: -8,
        /** とてつもなく減少 */
        HUGE_DEC: -16,
    },
};