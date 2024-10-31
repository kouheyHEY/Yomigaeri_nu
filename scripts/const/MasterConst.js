/** マスターの定義 */

/**
 * @typedef {Object} MenuItem
 * @property {string} STRING 表示内容 必須
 * @property {string} KEY キー 必須
 * @property {string} EXPL 説明 任意
 * @property {string} TYPE タイプ 任意
 * @property {number} VALUE 値 任意
 * @property {number} VALUE_KEY 値のキー 任意
 * @property {number} COL 表示の際の列数 任意
 */

const C_MASTER = {
    /** @type {MenuItem[]} パラメータのリスト */
    PARAM_LIST: [
        /** @type {MenuItem} 名前 */
        {
            STRING: "{}",
            KEY: "name",
        },
        /** @type {MenuItem} 転生レベル */
        {
            STRING: "転生レベル：{}",
            KEY: "ascensionLevel",
        },
        /** @type {MenuItem} 体力 */
        {
            STRING: "体力：{}",
            KEY: "hp",
        },
        /** @type {MenuItem} なつき度 */
        {
            STRING: "なつき度：{}",
            KEY: "affection",
        },
        /** @type {MenuItem} 体力ゲージ */
        {
            TYPE: "gauge",
            VALUE: 0,
            VALUE_KEY: "hpRate",
            COL: 1,
            KEY: "hpGauge",
        },
        /** @type {MenuItem} なつき度ゲージ */
        {
            TYPE: "gauge",
            VALUE: 0,
            VALUE_KEY: "affectionRate",
            COL: 1,
            KEY: "affectionGauge",

        },
        /** @type {MenuItem} 筋力 */
        {
            STRING: "筋力：{}",
            KEY: "muscle",
        },
        /** @type {MenuItem} 知力 */
        {
            STRING: "知力：{}",
            KEY: "intelligence",
        },
        /** @type {MenuItem} 魅力 */
        {
            STRING: "魅力：{}",
            KEY: "charm",
        },
        /** @type {MenuItem} 改行 */
        {
            KEY: "br",
        },
        /** @type {MenuItem} 改行 */
        {
            KEY: "br",
        },
    ],
    /** @type {MenuItem[]} 表示内容の定義のリスト */
    MENU_LIST: [
        /** @type {MenuItem} 散歩 */
        {
            STRING: "散歩",
            KEY: "walk",
            EXPL: "ワンを散歩に連れていく。",
        },
        /** @type {MenuItem} ごはん */
        {
            STRING: "ごはん",
            KEY: "food",
            EXPL: "ワンにご飯をあげる。",
        },
        /** @type {MenuItem} 風呂 */
        {
            STRING: "風呂",
            KEY: "bath",
            EXPL: "ワンをきれいにする。",
        },
        /** @type {MenuItem} 寝る */
        {
            STRING: "寝る",
            KEY: "sleep",
            EXPL: "ワンを寝かせる。",
        },
        /** @type {MenuItem} じゃれつく */
        {
            STRING: "じゃれつく",
            KEY: "jaretsuku",
            EXPL: "ワンとじゃれついて遊ぶ。",
        },
        /** @type {MenuItem}    筋トレ */
        {
            STRING: "筋トレ",
            KEY: "training",
            EXPL: "ワンの肉体を鍛え上げる。",
        },
        /** @type {MenuItem} 改行 */
        {
            KEY: "br",
        },
        /** @type {MenuItem} KOTARO */
        {
            STRING: "KOTARO",
            KEY: "kotaro",
            EXPL: "最強の肉体を持つワンを決めるコンテストに出場する。",
        },
        /** @type {MenuItem} ワンクイズ王 */
        {
            STRING: "ワンクイズ王",
            KEY: "wankuizu",
            EXPL: "世界のワン達と知力を競うコンテストに出場する。",
        },
        /** @type {MenuItem} ワンコレ */
        {
            STRING: "ワンコレ",
            KEY: "wankore",
            EXPL: "最高に美しいワンを決めるコンテストに出場する。",
        },
        /** @type {MenuItem} 改行 */
        {
            KEY: "br",
        },
        /** @type {MenuItem} 改行 */
        {
            KEY: "br",
        },
        /** @type {MenuItem} 転生 */
        {
            STRING: "転生",
            KEY: "ascension",
            EXPL: "ワンの能力を一部引き継いで新たな肉体に生まれ変わる。",
        },
        /** @type {MenuItem} 離れる */
        {
            STRING: "離れる",
            KEY: "end",
            EXPL: "ゲームを終了する。",
        },
    ],
    /** 会話内容 */
    CONVERSATIONS: {
        /** @type {string} キー */
        KEY: "conversation",
        /** @type {string[]} デフォルトの会話内容のリスト */
        DEFAULT_LIST: [
            "寝転がっている。",
            "丸まっている。",
            "つぶらな瞳でこちらを見ている。",
            "おかえり、と言わんばかりの笑顔。",
        ],
        /** @type {string[]} 散歩の会話内容のリスト */
        WALK_LIST: [
            "散歩に連れて行けと圧をかけている。",
        ],

    },
};