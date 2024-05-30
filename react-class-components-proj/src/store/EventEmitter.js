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

    emit(action) {
        const subscriptions = this.events[action.type];
        if (subscriptions) {
            subscriptions.forEach((listener) => listener.call(null, action));
        }
    }
}

const eventEmitter = new EventEmitter();
export default eventEmitter;
