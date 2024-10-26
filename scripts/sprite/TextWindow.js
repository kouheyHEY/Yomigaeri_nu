class TextWindow {
    /**
     * コンストラクタ
     * @param {Phaser.Scene} scene シーン
     * @param {number} x X座標
     * @param {number} y Y座標
     * @param {number} width 幅
     * @param {number} height 高さ
     * @param {number} column 列数
     */
    constructor(scene, x, y, width, height, column) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.column = column;
        /** @type {Map<string, MenuItem>} 表示内容のマップ */
        this.dispContentMap = new Map();
        /** @type {Object} ウインドウのプロパティ */
        this.windowProperty = {
            frameWeight: C_COMMON.WINDOW_FRAME_WEIGHT,
            frameColor: CommonUtil.convertColorCode(C_COMMON.COMMON_COLOR_WINDOW_FRAME),
            frameRound: C_COMMON.WINDOW_ROUND,
            bgColor: CommonUtil.convertColorCode(C_COMMON.COMMON_COLOR_WINDOW_BG),
        };
        /** @type {Object} フォントのスタイル */
        this.fontStyle = {
            fontSize: C_COMMON.FONT_SIZE_SMALL,
            fill: C_COMMON.COMMON_COLOR_WINDOW_FONT,
            fontFamily: C_COMMON.FONT_FAMILY_BIT12,
        };
        /** @type {Phaser.GameObjects.Group} 表示オブジェクトグループ */
        this.dispObjGroup = this.scene.add.group();
        /** @type {Map<string, Guage>} ゲージのマップ */
        this.guageMap = new Map();
        /** @type {Map<string, MenuItem>} メニューのマップ */
        this.menuMap = new Map();
        /** @type {Phaser.GameObjects.Container} ウインドウコンテナ */
        this.windowContainer = this.scene.add.container(this.x, this.y);

        /**
         * @type {Object} 追加パラメータ
         * @property {string} expl 説明
         */
        this.exParam = {
            expl: null,
        };
    }

    /**
     * ウインドウのプロパティを設定する
     * @param {Object} property プロパティ
     * @param {number} property.frameWeight 枠の太さ
     * @param {number} property.frameColor 枠の色
     * @param {number} property.frameRound 枠の丸み
     * @param {number} property.bgColor 背景色
     * @param {number} property.fontSize 文字の大きさ
     * @param {number} property.fontColor 文字の色
     * @param {string} property.fontFamily フォント
     */
    setProperty(property) {
        this.windowProperty.frameWeight = property.frameWeight;
        this.windowProperty.frameColor = CommonUtil.convertColorCode(property.frameColor);
        this.windowProperty.frameRound = property.frameRound;
        this.windowProperty.bgColor = CommonUtil.convertColorCode(property.bgColor);
        this.fontStyle.fontSize = property.fontSize;
        this.fontStyle.fill = property.fontColor;
        this.fontStyle.fontFamily = property.fontFamily;
    }

    /**
     * ウインドウの列数を設定する
     * @param {number} column 列数
     */
    setColumn(column) {
        this.column = column;
    }

    /**
     * ウインドウを再描画する
     */
    redraw() {
        // 枠付きの矩形を描画
        const windowRect = this.scene.add.graphics();
        windowRect.fillStyle(this.windowProperty.bgColor, 1.0);
        windowRect.fillRoundedRect(0, 0, this.width, this.height, this.windowProperty.frameRound);

        windowRect.lineStyle(this.windowProperty.frameWeight, this.windowProperty.frameColor, 1.0);
        windowRect.strokeRoundedRect(0, 0, this.width, this.height, this.windowProperty.frameRound);

        this.windowContainer.add(windowRect);

        // 表示オブジェクトグループの内容をクリア
        this.dispObjGroup.clear(true, true);

        // ウインドウに表示する内容を描画
        this.drawDispContent();
    }

    /**
     * ゲージを更新する
     * @param {string} guageKey ゲージのキー
     * @param {number} value 値
     */
    updateGuage(guageKey, value) {
        const guage = this.guageMap.get(guageKey);
        if (guage) {
            guage.value = value;
            guage.draw();
        }
    }

    /**
     * メニューを更新する
     * @param {string} menuKey メニューのキー
     * @param {string} content 表示内容
     */
    updateMenu(menuKey, content) {
        const menu = this.menuMap.get(menuKey);
        if (menu) {
            menu.setText(content);
        }
    }

    /**
     * ウインドウに表示する内容を追加する
     * 既に同じキーがある場合は、上書きするか追加するかを指定する
     * 上書きしない場合はエラー
     * @param {string} key キー
     * @param {string} content 表示内容
     * @param {boolean} isOverwrite 上書きするか
     */
    addDispContent(key, content, isOverwrite = false) {
        // 改行の場合は、キーを連番にする
        if (key === C_COMMON.BR) {
            this.dispContentMap.set(key + this.dispContentMap.size, content);
            return;
        }

        // 既に同じキーがある場合は、上書きするか追加するかを指定する
        if (this.dispContentMap.has(key)) {
            if (isOverwrite) {
                // 上書きする
                this.dispContentMap.set(key, content);
            } else {
                throw new Error(`${key} is already exists.`);
            }
        } else {
            // 追加する
            this.dispContentMap.set(key, content);
        }
    }

    /**
     * ウインドウに表示する内容を削除する
     * @param {string} key キー
     */
    removeDispContent(key) {
        this.dispContentMap.delete(key);
    }

    /**
     * ウインドウに表示する内容を全て削除する
     */
    clearDispContent() {
        this.dispContentMap.clear();
    }

    /**
     * ウインドウに表示する内容を全て描画する
     */
    drawDispContent() {
        if (this.dispContentMap.size === 0) {
            return;
        }

        // 描画可能な範囲
        const drawableWidth = this.width - C_COMMON.WINDOW_PADDING_LEFT_SMALL * 2;

        // 左上から順番に描画
        let x = 0;
        let y = 0;
        let i = 0;
        // マップを順番に処理
        for (const [key, content] of this.dispContentMap) {
            if (content.KEY === C_COMMON.BR) {
                // 改行の場合
                // 最終列だった場合は空行を挟み、そうでない場合は空列を挟んで次の行にする
                i += this.column - (i % this.column);
                continue;
            } else if (content.TYPE === "gauge") {
                // ゲージの場合
                const w = drawableWidth * content.COL / this.column;
                const h = CommonUtil.convertPxToNumber(this.fontStyle.fontSize);
                x = (drawableWidth - w) / 2;
                y = (h + C_COMMON.WINDOW_PADDING_LINE_SMALL) * Math.floor(i / this.column);

                // ゲージを描画
                const guage = new Guage(
                    this.scene,
                    x + C_COMMON.WINDOW_PADDING_LEFT_SMALL, y + C_COMMON.WINDOW_PADDING_LINE_SMALL, w, h,
                    C_IS.GAUGE_PROPERTY[content.KEY].BORDER_WIDTH,
                    content.VALUE,
                    C_IS.GAUGE_PROPERTY[content.KEY].BG_COLOR,
                    C_IS.GAUGE_PROPERTY[content.KEY].BAR_COLOR,
                    C_IS.GAUGE_PROPERTY[content.KEY].BORDER_COLOR
                );
                guage.draw();
                this.guageMap.set(key, guage);
                this.dispObjGroup.add(guage.guageGraphics);
                this.windowContainer.add(guage.guageGraphics);
                i += content.COL;
            } else {
                // テキストの場合
                // 次の行,列に描画するためにx,y座標を調整
                x = (drawableWidth / this.column) * (i % this.column);
                y = (CommonUtil.convertPxToNumber(this.fontStyle.fontSize) + C_COMMON.WINDOW_PADDING_LINE_SMALL) * Math.floor(i / this.column);
                // 内容を描画するためのテキストオブジェクトを生成
                const dispText = this.scene.add.text(
                    x + C_COMMON.WINDOW_PADDING_LEFT_SMALL,
                    y + C_COMMON.WINDOW_PADDING_LINE_SMALL,
                    content.STRING,
                    this.fontStyle
                );

                dispText.setInteractive();
                // ホバー時のアクションを設定
                dispText.on("pointerover", () => {
                    this.exParam.expl = content.EXPL;
                });
                // ホバー解除時のアクションを設定
                dispText.on("pointerout", () => {
                    this.exParam.expl = "";
                });
                this.menuMap.set(key, dispText);
                this.dispObjGroup.add(dispText);
                this.windowContainer.add(dispText);
                i++;
            }
        }
    }
}