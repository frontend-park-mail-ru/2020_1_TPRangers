class Observer {
  constructor() {
    this.subscribers = [];
  }

  get subs() {
    return this.subscribers;
  }

  on(event, callback) {
    if (this.subscribers.hasOwnProperty(event)) {
      for (const sub_callback in this.subscribers[event]) {
        if (this.subscribers[event].hasOwnProperty(sub_callback)) {
          if (this.subscribers[event][sub_callback] === callback) {
            console.warn(`[DEBUG] Repeated callback for event ${event}`);
            return;
          }
        }
      }
      console.info(`[DEBUG] Added new callback for event ${event}`);
      this.subscribers[event].push(callback);
    } else {
      console.info(`[DEBUG] Created new event type: ${event}`);
      this.subscribers[event] = [callback];
    }
  }

  emit(event, data) {
    if (this.subscribers.hasOwnProperty(event)) {
      this.subscribers[event].forEach(callback => {
        callback(data);
      });
    } else {
      console.error(`[WARNING] No event ${event} to emit`);
    }
  }

  off(event, callback) {
    if (
      this.subscribers.hasOwnProperty(event) &&
      this.subscribers[event].hasOwnProperty(callback)
    ) {
      this.subscribers[event] = this.subscribers[event].filter(
        sub => sub !== callback
      );
    } else {
      console.warn("[WARNING] No such event or callback in this event");
    }
  }
}

export default new Observer();
