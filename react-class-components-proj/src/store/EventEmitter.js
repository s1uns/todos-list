class EventEmitter {
    constructor() {
        this.events = {};
    }

    subscribe(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    unsubscribe(event, listenerToRemove) {
        if (!this.events[event]) return;

        this.events[event] = this.events[event].filter(
            (listener) => listener !== listenerToRemove,
        );
    }

    emit(event, ...args) {
        if (this.events[event]) {
            this.events[event].forEach((listener) => listener(...args));
        }
    }
}

export default new EventEmitter();
