export default ResCollection;
/**
 * ~addEvent
 */
export type ResCollection = {
    /**
     * Item being added to the collection.
     */
    item: any;
    /**
     * Index where item was added.
     */
    idx: number;
};
/**
 * Add event data
 * @typedef {object} ResCollection~addEvent
 * @property {*} item Item being added to the collection.
 * @property {number} idx Index where item was added.
 */
/**
 * Add event emitted on any item being added to the collection.
 * @callback ResCollection~addCallback
 * @param {ResCollection~addEvent} event Add event data.
 * @param {ResCollection} collection Collection emitting event.
 * @param {string} event Event name including namespace.
 * @param {?string} action Event action.
 */
/**
 * Remove event data
 * @typedef {object} ResCollection~removeEvent
 * @property {*} item Item being removed from the collection.
 * @property {number} idx Index from where the item was removed.
 */
/**
 * Remove event emitted on any item being added to the collection.
 * @callback ResCollection~removeCallback
 * @param {ResCollection~removeEvent} event Remove event data.
 * @param {ResCollection} collection Collection emitting event.
 * @param {string} event Event name including namespace.
 * @param {?string} action Event action.
 */
/**
 * ResCollection represents a collection provided over the RES API.
 * @implements {module:modapp~Collection}
 */
declare class ResCollection<T = unknown> implements module {
    /**
     * Creates an ResCollection instance
     * @param {ResClient} api ResClient instance
     * @param {string} rid Resource id.
     * @param {object} [opt] Optional settings
     * @param {function} [opt.idCallback] Id callback function.
     */
    constructor(api: ResClient, rid: string, opt?: {
        idCallback?: Function;
    });
    _api: ResClient;
    _rid: string;
    _idCallback: Function;
    _map: {};
    _list: T[];
    /**
     * ResClient instance.
     * @returns {ResClient} ResClient instance
     */
    getClient(): ResClient;
    /**
     * Collection resource ID
     * @returns {string} Resource ID
     */
    getResourceId(): string;
    /**
     * Length of the collection
     */
    get length(): number;
    /**
     * Internal collection array. Do not mutate directly.
     */
    get list(): T[];
    /**
     * Attach a collection event handler function for one or more events.
     * If no event or handler is provided, the collection will still be considered listened to,
     * until a matching off call without arguments is made.
     * Available events are 'add', 'remove', and custom events.
     * @param {?string} [events] One or more space-separated events. Null means any event.
     * @param {ResCollection~addCallback|ResCollection~removeCallback|eventCallback} [handler] Handler function to execute when the event is emitted.
     * @returns {this}
     */
    on(events?: string | null, handler: any): this;
    /**
    * Remove a collection event handler function.
    * Available events are 'add', 'remove', and custom events.
    * @param {?string} [events] One or more space-separated events. Null means any event.
    * @param {ResCollection~addCallback|ResCollection~removeCallback|eventCallback} [handler] Handler function to remove.
    * @returns {this}
    */
    off(events?: string | null, handler: any): this;
    /**
     * Get an item from the collection by id.
     * Requires that id callback is defined for the collection.
     * @param {string} id Id of the item
     * @returns {*} Item with the id. Undefined if key doesn't exist
     */
    get(id: string): T | undefined;
    /**
     * Retrieves the order index of an item.
     * @param {*} item Item to find
     * @returns {number} Order index of the first matching item. -1 if the item doesn't exist.
     */
    indexOf(item: T): number;
    /**
     * Gets an item from the collection by index position
     * @param {number} idx  Index of the item
     * @returns {*} Item at the given index. Undefined if the index is out of bounds.
     */
    atIndex(idx: number): T | undefined;
    /**
     * Calls a method on the collection.
     * @param {string} method Method name
     * @param {*} params Method parameters
     * @returns {Promise.<object>} Promise of the call result.
     */
    call(method: string, params: any): Promise<object>;
    /**
     * Calls an auth method on the collection.
     * @param {string} method Auth method name
     * @param {*} params Method parameters
     * @returns {Promise.<object>} Promise of the auth result.
     */
    auth(method: string, params: any): Promise<object>;
    /**
     * Returns a shallow clone of the internal array.
     * @returns {Array.<*>} Clone of internal array
     */
    toArray(): Array<T>;
    /**
     * Initializes the collection with a data array.
     * Should only be called by the ResClient instance.
     * @param {Array.<*>} data ResCollection data array
     * @private
     */
    private __init;
    /**
     * Add an item to the collection.
     * Should only be called by the ResClient instance.
     * @param {*} item Item
     * @param {idx} [idx] Index value of where to insert the item.
     * @private
     */
    private __add;
    /**
     * Remove an item from the collection.
     * Should only be called by the ResClient instance.
     * @param {number} idx Index of the item to remove
     * @returns {*} Removed item or undefined if no item was removed
     * @private
     */
    private __remove;
    _hasId(): void;
    toJSON(): any[];
    [Symbol.iterator](): {
        next: () => {
            value: T;
            done: boolean;
        };
    };
}
