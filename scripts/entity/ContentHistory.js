class ContentHistory {
    constructor() {
        this.history = [];
    }

    add(content) {
        this.history.push(content);
    }

    restore() {
        if (this.history.length === 0) {
            throw new Error('[ContentHistory.restore]履歴がありません。');
        }
        return this.history.pop();
    }

    isEmpty() {
        return this.history.length === 0;
    }
}
