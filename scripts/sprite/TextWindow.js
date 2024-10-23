class TextWindow {
    constructor(scene, x, y, width, height) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.dispContentMap = new Map();

        this.windowProperty = {
            frameWeight: C_COMMON.WINDOW_FRAME_WEIGHT,
            frameColor: CommonUtil.convertColorCode(C_COMMON.COMMON_COLOR_WINDOW_FRAME),
            frameRound: C_COMMON.WINDOW_ROUND,
            bgColor: CommonUtil.convertColorCode(C_COMMON.COMMON_COLOR_WINDOW_BG),
        };

        this.fontStyle = {
            fontSize: C_COMMON.FONT_SIZE_SMALL,
            fill: C_COMMON.COMMON_COLOR_WINDOW_FONT,
            fontFamily: C_COMMON.FONT_FAMILY_BIT12,
        };

        this.dispTextGroup = this.scene.add.group();

        this.windowContainer = this.scene.add.container(this.x, this.y);
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

        // ウインドウに表示する内容を描画
        this.drawDispContent();
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
        if (this.dispContentMap.has(key)) {
            if (isOverwrite) {
                this.dispContentMap.set(key, content);
            } else {
                throw new Error(`${key} is already exists.`);
            }
        } else {
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

        // 上から順番に描画
        let y = 0;
        this.dispContentMap.forEach((content, key) => {
            // 内容を描画するためのテキストオブジェクトを生成
            const dispText = this.scene.add.text(
                C_COMMON.WINDOW_PADDING_LEFT_SMALL,
                y + C_COMMON.WINDOW_PADDING_LINE_SMALL,
                content,
                this.fontStyle
            );

            this.dispTextGroup.add(dispText);
            // 次の行に描画するためにy座標を調整
            y -= this.fontStyle.fontSize + C_COMMON.WINDOW_PADDING_LINE_SMALL;

            // コンテナに追加
            this.windowContainer.add(dispText);
        });
    }
}