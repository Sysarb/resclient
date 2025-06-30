export default CacheItem;
declare class CacheItem {
    /**
     * Creates a CacheItem instance
     * @param {string} rid Resource ID
     * @param {function} unsubscribe Unsubscribe callback
     */
    constructor(rid: string, unsubscribe: Function);
    rid: string;
    _unsubscribe: Function;
    type: any;
    item: any;
    direct: number;
    indirect: number;
    subscribed: number;
    promise: any;
    /**
     * Adds or subtracts from the subscribed counter.
     * @param {number} dir Value to add. If 0, the subscribed counter will be set to 0.
     */
    addSubscribed(dir: number): void;
    unsubTimeout: any;
    setPromise(promise: any): any;
    setItem(item: any, type: any): this;
    setType(modelType: any): this;
    addDirect(): void;
    removeDirect(): void;
    resetTimeout(): void;
    _checkUnsubscribe(): void;
    addIndirect(n?: number): void;
}
