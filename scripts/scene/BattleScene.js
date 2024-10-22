class BattleScene extends BaseScene {
    constructor() {
        super(C_COMMON.SCENE_BATTLESCENE);

    }

    /**
     * 画面更新用メソッド
     */
    update() {
        this.dispManager.update();

    }

    /**
     * インスタンス変数の定義メソッド
     * this.XXXはここに記載
     */
    initInstVal() {
        /** @type {DBManager} */
        this.dbManager = new DBManager(this);
        /* 必要なテーブルをロード */
        this.dbManager.loadTabData(C_DB.TABLE_NAME.T_SPT_CHARA);
        this.dbManager.loadTabData(C_DB.TABLE_NAME.T_ENEMY);
        this.dbManager.loadTabData(C_DB.TABLE_NAME.M_MENU);
        /** @type {SptCharaManager} */
        this.sptCharaManager = new SptCharaManager(this);
        /** @type {EnemyManager} */
        this.enemyManager = new EnemyManager(this);
        /** @type {MenuManager} */
        this.menuManager = new MenuManager(this);
        /** @type {DispManager} */
        this.dispManager = new DispManager(this);

    }

    /** 画面上の各オブジェクトを表示する
     * （テキスト表示などは変動するため、適時別ロジックで表示）
     */
    initArea() {

        // 背景色の設定
        this.dispManager.setBackgroundColor(C_COMMON.COMMON_COLOR_WHITE);

        if (this.sptCharaManager.isCharaExist(C_DB.T_SPT_CHARA.ID_SPRT1)) {
            // キャラ１が存在する場合
            // キャラ１のステータスウインドウを描画
            const windowChara1Stt = new TextWindow({
                startX: C_BS.WINDOW_CHARA1_STATUS_X,
                startY: C_BS.WINDOW_CHARA1_STATUS_Y,
                hSize: C_BS.WINDOW_CHARA1_STATUS_W,
                vSize: C_BS.WINDOW_CHARA1_STATUS_H,
                fontSize: C_COMMON.FONT_SIZE_SMALL,
                menuColNum: 1,
            }, this);

            // ウインドウを描画 
            windowChara1Stt.drawWindow();
            // ウインドウをマネージャに追加
            this.dispManager.addNewWindow(C_BS.KEY_WINDOW_CHARA1_STATUS, windowChara1Stt, true);
            // キャラ１のステータスを更新
            this.updateCharaStt(C_DB.T_SPT_CHARA.ID_SPRT1);
        }

        if (this.sptCharaManager.isCharaExist(C_DB.T_SPT_CHARA.ID_SPRT2)) {
            // キャラ２が存在する場合
            // キャラ２のステータスウインドウを描画
            const windowChara2Stt = new TextWindow({
                startX: C_BS.WINDOW_CHARA2_STATUS_X,
                startY: C_BS.WINDOW_CHARA2_STATUS_Y,
                hSize: C_BS.WINDOW_CHARA2_STATUS_W,
                vSize: C_BS.WINDOW_CHARA2_STATUS_H,
                fontSize: C_COMMON.FONT_SIZE_SMALL,
                menuColNum: 1,
            }, this);
            // ウインドウを描画
            windowChara2Stt.drawWindow();
            // ウインドウをマネージャに追加
            this.dispManager.addNewWindow(C_BS.KEY_WINDOW_CHARA2_STATUS, windowChara2Stt, true);
            // キャラ２のステータスを更新
            this.updateCharaStt(C_DB.T_SPT_CHARA.ID_SPRT2);
        }


        /** @type {TextWindow} 画面左下のメニューウインドウ */
        const windowMenu = new TextWindow({
            startX: C_COMMON.WINDOW_MENU_X,
            startY: C_COMMON.WINDOW_MENU_Y,
            hSize: C_COMMON.WINDOW_MENU_W,
            vSize: C_COMMON.WINDOW_MENU_H,
            menuColNum: 1,
            fontSize: C_COMMON.FONT_SIZE_SMALL,
            isLine: false, isList: true, isMenu: true
        }, this);
        windowMenu.drawWindow();

        /** @type {DispContent} メニューウインドウの表示コンテンツ */
        const dispCttMenu = new DispContent(true, false, true, C_COMMON.WINDOW_CONTENT_TYPE_MENU, this);

        // コンテンツを設定
        dispCttMenu.addContentList(this.dbManager.selectByMenuId(C_DB.TABLE_NAME.M_MENU, C_DB.M_MENU.MENUID_BATTLESCENE));
        windowMenu.setDispContent(dispCttMenu);

        // マネージャに追加
        this.dispManager.addNewWindow(C_BS.KEY_WINDOW_MENU, windowMenu, true);

        /** @type {TextWindow} 画面下のメインウインドウ */
        const windowTextMain = new TextWindow({
            startX: C_COMMON.WINDOW_TEXT_MAIN_X,
            startY: C_COMMON.WINDOW_TEXT_MAIN_Y,
            hSize: C_COMMON.WINDOW_TEXT_MAIN_W,
            vSize: C_COMMON.WINDOW_TEXT_MAIN_H,
            menuCol: 1,
            fontSize: C_COMMON.FONT_SIZE_SMALL,
            isLine: true, isList: false, isMenu: false
        }, this);
        windowTextMain.drawWindow();

        /** @type {DispContent} メインウインドウの表示コンテンツ */
        const dispCttTextMain = new DispContent(false, true, false, C_COMMON.WINDOW_CONTENT_TYPE_LINE, this);
        dispCttTextMain.addContent("テスト文字列です。");
        windowTextMain.setDispContent(dispCttTextMain);

        // 初期にアクティブにするウインドウの設定
        windowMenu.isActive = true;

        // マネージャに追加
        this.dispManager.addNewWindow(C_BS.KEY_WINDOW_TEXT_MAIN, windowTextMain, true);


        console.log('[BattleScene.initArea]START BattleScene');
    }

    /**
     * 指定したキャラのステータスを更新する
     * @param {number} charaIdx 更新対象のキャラの番号
     */
    updateCharaStt(charaIdx) {
        /** @type {TextWindow} */
        let window = null;
        /** @type {DataModel} */
        let charaModel = null;

        if (charaIdx === C_DB.T_SPT_CHARA.ID_SPRT1) {
            // キャラ１の場合
            window = this.dispManager.getWindow(C_BS.KEY_WINDOW_CHARA1_STATUS);
            charaModel = this.sptCharaManager.getCharacter(C_DB.T_SPT_CHARA.ID_SPRT1);
        } else if (charaIdx === C_DB.T_SPT_CHARA.ID_SPRT2) {
            // キャラ２の場合
            window = this.dispManager.getWindow(C_BS.KEY_WINDOW_CHARA2_STATUS);
            charaModel = this.sptCharaManager.getCharacter(C_DB.T_SPT_CHARA.ID_SPRT2);
        }

        if (window != null && charaModel != null) {
            // ウインドウに表示コンテンツをセット
            /** @type {DispContent} */
            const dispCtt = new DispContent(true, false, false, C_COMMON.WINDOW_CONTENT_TYPE_TEXTLIST, this);
            dispCtt.addContentList(TblSptCharaService.getBattleDispProps(charaModel, window.hSize, this));
            window.setDispContent(dispCtt);
            // ウインドウを更新
            this.dispManager.addNewWindow(C_BS.KEY_WINDOW_CHARA1_STATUS, window, true);
        }
        console.log('[BattleScene.updateCharaStt]END updateCharaStt');
    }

}