declare const _default: EventBus;
export default _default;
/**
 * ~eventCallback
 */
export type EventBus = (data: object | null, target: object, event: string, action: string | null) => any;
/**
 * Event callback
 * @callback EventBus~eventCallback
 * @param {?object} data Event data object
 * @param {object} target Target object
 * @param {string} event Event name including namespace
 * @param {?string} action Event action. This is the suffix of the event being listened to, or null if listening to the actual event.
 */
/**
 * EventBus is a bus for subscribing to and emitting events.
 */
declare class EventBus {
    _evs: {};
    _qh: any[];
    /**
     * Attach an event handler function for one or more events.
     * @param {object} [target] An optional target object. The handler will only be called if target matches the target of the emitted event.
     * @param {?string} events One or more space-separated events (eg. 'disconnect'). Null or empty means any event.
     * @param {EventBus~eventCallback} handler A function to execute when the event is emitted.
     * @param {string} [namespace] Namespace string that will be added, separated with a dot, to every event name. If no events is null, only events with that namespace will be affected.
     * @returns {this}
     */
    on(target?: object, events: string | null, handler: any, namespace?: string): this;
    /**
     * Remove an event handler.
     * @param {object} [target] An optional target object. The handler will only be removed if target matches the target of the handler.
     * @param {?string} events One or more space-separated events (eg. 'disconnect'). Null or empty means any event.
     * @param {function} [handler] An option handler function. The handler will only be remove if it is the same handler.
     * @param {string} [namespace] Namespace string that will be added, separated with a dot, to every event name.
     * @param {boolean} [strict] Flag for strict mode where an error will be thrown if the handler doesn't exist.
     * @returns {this}
     */
    off(target?: object, events: string | null, handler?: Function, namespace?: string, strict?: boolean): this;
    /**
     * Emits an event and triggers the base handler to be called, followed by any other handler bound.
     * @param {object} [target] Target object of the event
     * @param {string} event Name of the event. May include the namespace, if the namespace parameter is not provided.
     * @param {object} [data] Event data object. May be modified by the base handler, but shouldn't be changed any other handler.
     * @param {string} [namespace] Namespace string that will be added, separated with a dot, before the event name.
     * @returns {this}
     */
    emit(target?: object, event: string, data?: object, namespace?: string): this;
    _exec(cb: any): void;
}
