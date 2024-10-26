/** ゲージ */
class Guage {
    /** 
     * @param {Phaser.Scene} scene シーン
     * @param {number} x ゲージのX座標
     * @param {number} y ゲージのY座標
     * @param {number} w ゲージの幅
     * @param {number} h ゲージの高さ
     * @param {number} borderWidth 枠線の幅
     * @param {number} value 現在値（0～1）
     * @param {string} bgColor 背景色
     * @param {string} barColor バーの色
     * @param {string} borderColor 枠線の色
     */
    constructor(scene, x, y, w, h, borderWidth, value, bgColor, barColor, borderColor) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.borderWidth = borderWidth;
        this.value = value;
        this.bgColor = bgColor;
        this.barColor = barColor;
        this.borderColor = borderColor;
        this.scene = scene;
    }

    /** 描画 */
    draw() {
        // グラフィックを生成
        if (this.guageGraphics == null) {
            this.guageGraphics = this.scene.add.graphics();
        } else {
            this.guageGraphics.clear();
        }

        // 枠を描画
        this.guageGraphics.lineStyle(this.borderWidth, CommonUtil.convertColorCode(this.borderColor));
        this.guageGraphics.strokeRect(
            this.x - this.borderWidth / 2, // 枠の中心を合わせるために調整
            this.y - this.borderWidth / 2,
            this.w + this.borderWidth,
            this.h + this.borderWidth
        );

        // ゲージ背景を描画
        this.guageGraphics.fillStyle(CommonUtil.convertColorCode(this.bgColor));
        this.guageGraphics.fillRect(this.x, this.y, this.w, this.h);

        // ゲージの現在の進行状況を描画
        this.guageGraphics.fillStyle(CommonUtil.convertColorCode(this.barColor));
        this.guageGraphics.fillRect(
            this.x,
            this.y,
            this.w * this.value,
            this.h
        );
    }
}
