export function isResError(o: any): o is ResError;
export default ResClient;
/**
 * ~connectCallback
 */
export type ResClient = (event: object) => any;
import ResError from './ResError';
/**
 * Connect event emitted on connect.
 * @callback ResClient~connectCallback
 * @param {object} event WebSocket open event object
 */
/**
 * Disconnect event emitted on disconnect.
 * @callback ResClient~disconnectCallback
 * @param {object} event WebSocket close event object
 */
/**
 * Error event emitted on error.
 * @callback ResClient~errorCallback
 * @param {ResError} err ResError object
 */
/**
 * WebSocket factory function.
 * @callback ResClient~websocketFactory
 * @returns {WebSocket} WebSocket instance implementing the [WebSocket API]{@link https://developer.mozilla.org/en-US/docs/Web/API/WebSocket}.
 */
/**
 * OnConnect callback function.
 * @callback ResClient~onConnectCallback
 * @param {ResClient} ResClient instance
 * @returns {?Promise} Promise for the onConnect handlers completion. Must always resolve.
 */
/**
 * ResClient represents a client connection to a RES API.
 */
declare class ResClient {
    /**
     * Creates a ResClient instance
     * @param {string|ResClient~websocketFactory} hostUrlOrFactory Websocket host path, or websocket factory function. Path may be relative to current path.
     * @param {object} [opt] Optional parameters.
     * @param {function} [opt.onConnect] On connect callback called prior resolving the connect promise and subscribing to stale resources. May return a promise.
     * @param {string} [opt.namespace] Event bus namespace. Defaults to 'resclient'.
     * @param {bool} [opt.reconnectDelay] Milliseconds between WebSocket reconnect attempts. Defaults to 3000.
     * @param {bool} [opt.subscribeStaleDelay] Milliseconds until a subscribe attempt is made on a stale resource. Zero means no attempt to subscribe. Defaults to 2000.
     * @param {bool} [opt.subscribeRetryDelay] Milliseconds between subscribe attempts on a stale resource after a failed stale subscribe. Zero means no retries. Defaults to 10000.
     * @param {bool} [opt.unsubscribeDelay] Milliseconds between stopping listening to a resource, and the resource being unsubscribed. Defaults to 5000.
     * @param {bool} [opt.debug] Flag to debug log all WebSocket communication. Defaults to false.
     * @param {module:modapp~EventBus} [opt.eventBus] Event bus.
     */
    constructor(hostUrlOrFactory: any, opt?: {
        onConnect?: Function;
        namespace?: string;
        reconnectDelay?: bool;
        subscribeStaleDelay?: bool;
        subscribeRetryDelay?: bool;
        unsubscribeDelay?: bool;
        debug?: bool;
        eventBus?: any;
    });
    hostUrl: any;
    wsFactory: any;
    tryConnect: boolean;
    connected: boolean;
    ws: any;
    requests: {};
    reqId: number;
    cache: {};
    stale: {};
    connectPromise: Promise<any>;
    connectCallback: {
        resolve: (value: any) => void;
        reject: (reason?: any) => void;
    };
    types: {
        model: {
            id: string;
            list: TypeList;
            prepareData: (dta: any) => {};
            getFactory: (rid: any) => resourceFactoryCallback;
            synchronize: any;
        };
        collection: {
            id: string;
            list: TypeList;
            prepareData: (dta: any) => any;
            getFactory: (rid: any) => resourceFactoryCallback;
            synchronize: any;
        };
        error: {
            id: string;
            prepareData: (dta: any) => any;
            getFactory: (rid: any) => (api: any, rid: any) => ResError;
            synchronize: () => void;
        };
    };
    /**
     * Handles the websocket onopen event
     * @param {object} e Open event object
     * @private
     */
    private _handleOnopen;
    /**
     * Handles the websocket onerror event
     * @param {object} e Error event object
     * @private
     */
    private _handleOnerror;
    /**
     * Handles the websocket onmessage event
     * @param {object} e Message event object
     * @private
     */
    private _handleOnmessage;
    /**
     * Handles the websocket onclose event
     * @param {object} e Close event object
     * @private
     */
    private _handleOnclose;
    _unsubscribe(ci: any, useDelay: any): NodeJS.Timeout;
    /**
     * RES protocol level supported by this client version.
     * @returns {string} Supported RES protocol version.
     */
    get supportedProtocol(): string;
    /**
     * Connects the instance to the server.
     * Can be called even if a connection is already established.
     * @returns {Promise} A promise to the established connection.
     */
    connect(): Promise<any>;
    /**
     * Disconnects any current connection and stops attempts
     * of reconnecting.
     */
    disconnect(): void;
    /**
     * Gets the host URL to the RES API
     * @returns {string} Host URL
     */
    getHostUrl(): string;
    /**
     * Attach an event handler function for one or more instance events.
     * Available events are 'connect', 'disconnect', and 'error'.
     * @param {?string} events One or more space-separated events. Null means any event.
     * @param {ResClient~connectCallback|ResClient~disconnectCallback|ResClient~errorCallback} handler Handler function to execute when the event is emitted.
     */
    on(events: string | null, handler: any): void;
    /**
     * Remove an instance event handler.
     * Available events are 'connect', 'disconnect', and 'error'.
     * @param {?string} events One or more space-separated events. Null means any event.
     * @param {ResClient~connectCallback|ResClient~disconnectCallback|ResClient~errorCallback} [handler] Handler function to remove.
     */
    off(events: string | null, handler: any): void;
    /**
     * Sets the onConnect callback.
     * @param {?ResClient~onConnectCallback} onConnect On connect callback called prior resolving the connect promise and subscribing to stale resources. May return a promise.
     * @returns {this}
     */
    setOnConnect(onConnect: any): this;
    onConnect: any;
    /**
     * Model factory callback
     * @callback ResClient~modelFactory
     * @param {ResClient} api ResClient instance
     * @param {string} rid Resource ID
     * @returns {ResModel} Model instance object.
     */
    /**
     * Register a model type.
     * The pattern may use the following wild cards:
     * * The asterisk (*) matches any part at any level of the resource name.
     * * The greater than symbol (>) matches one or more parts at the end of a resource name, and must be the last part.
     * @param {string} pattern Pattern of the model type.
     * @param {ResClient~modelFactory} factory Model factory callback
     * @returns {this}
     */
    registerModelType(pattern: string, factory: any): this;
    /**
     * Unregister a previously registered model type pattern.
     * @param {string} pattern Pattern of the model type.
     * @returns {ResClient~modelFactory} Unregistered model factory callback
     */
    unregisterModelType(pattern: string): ResClient;
    /**
     * Collection factory callback
     * @callback ResClient~collectionFactory
     * @param {ResClient} api ResClient instance
     * @param {string} rid Resource ID
     * @returns {ResCollection} Collection instance object.
     */
    /**
     * Register a collection type.
     * The pattern may use the following wild cards:
     * * The asterisk (*) matches any part at any level of the resource name.
     * * The greater than symbol (>) matches one or more parts at the end of a resource name, and must be the last part.
     * @param {string} pattern Pattern of the collection type.
     * @param {ResClient~collectionFactory} factory Collection factory callback
     * @returns {this}
     */
    registerCollectionType(pattern: string, factory: any): this;
    /**
     * Unregister a previously registered collection type pattern.
     * @param {string} pattern Pattern of the collection type.
     * @returns {ResClient~collectionFactory} Unregistered collection factory callback
     */
    unregisterCollectionType(pattern: string): ResClient;
    /**
     * Get a resource from the API
     * @param {string} rid Resource ID
     * @param {function} [collectionFactory] Collection factory function.
     * @return {Promise.<(ResModel|ResCollection)>} Promise of the resource.
     */
    get(rid: string): Promise<(ResModel | ResCollection)>;
    /**
     * Calls a method on a resource.
     * @param {string} rid Resource ID.
     * @param {string} method Method name
     * @param {*} params Method parameters
     * @returns {Promise.<object>} Promise of the call result.
     */
    call(rid: string, method: string, params: any): Promise<object>;
    /**
     * Invokes a authentication method on a resource.
     * @param {string} rid Resource ID.
     * @param {string} method Method name
     * @param {*} params Method parameters
     * @returns {Promise.<object>} Promise of the authentication result.
     */
    authenticate(rid: string, method: string, params: any): Promise<object>;
    /**
     * Creates a new resource by calling the 'new' method.
     * Use call with 'new' as method parameter instead.
     * @param {*} rid Resource ID
     * @param {*} params Method parameters
     * @return {Promise.<(ResModel|ResCollection)>} Promise of the resource.
     * @deprecated since version 2.1.0. Use call with 'new' as method parameter instead.
     */
    create(rid: any, params: any): Promise<(ResModel | ResCollection)>;
    /**
     * Calls the set method to update model properties.
     * @param {string} modelId Model resource ID.
     * @param {object} props Properties. Set value to undefined to delete a property.
     * @returns {Promise.<object>} Promise of the call being completed.
     */
    setModel(modelId: string, props: object): Promise<object>;
    resourceOn(rid: any, events: any, handler: any): void;
    resourceOff(rid: any, events: any, handler: any): void;
    /**
     * Sends a JsonRpc call to the API
     * @param {string} action Action name
     * @param {string} rid Resource ID
     * @param {?string} method Optional method name
     * @param {?object} params Optional parameters
     * @returns {Promise.<object>} Promise to the response
     * @private
     */
    private _send;
    _sendNow(method: any, params: any): Promise<any>;
    /**
     * Receives a incoming json encoded data string and executes the appropriate functions/callbacks.
     * @param {string} json Json encoded data
     * @private
     */
    private _receive;
    _call(type: any, rid: any, method: any, params: any): Promise<any>;
    _handleErrorResponse(req: any, data: any): void;
    _handleSuccessResponse(req: any, data: any): void;
    _handleEvent(data: any): void;
    _handleChangeEvent(cacheItem: any, event: any, data: any, reset: any): boolean;
    _handleAddEvent(ci: any, event: any, data: any): boolean;
    _handleRemoveEvent(ci: any, event: any, data: any): boolean;
    _handleUnsubscribeEvent(ci: any): boolean;
    _setStale(rid: any, isRetry: any): void;
    _addStale(rid: any): boolean;
    _removeStale(rid: any): void;
    _subscribe(ci: any, throwError: any, isRetry: any): Promise<void>;
    _subscribeToStale(rid: any): void;
    _subscribeToAllStale(): void;
    protocol: number;
    /**
     * Resolves the connection promise
     * @private
     */
    private _connectResolve;
    /**
     * Rejects the connection promise
     * @param {*} e Error event
     * @private
     */
    private _connectReject;
    _emit(event: any, data: any): void;
    /**
     * Tries to delete the cached item.
     * It will delete if there are no direct listeners, indirect references, or any subscription.
     * @param {object} ci Cache item to delete
     * @param {boolean} isRetry Flag to tell if call is made as part of a stale subscribe attempt.
     * @private
     */
    private _tryDelete;
    /**
     * Reference State object
     * @typedef {object} RefState
     * @property {CacheItem} ci Cache item
     * @property {Number} rc Reference count from external references.
     * @property {Number} st State. Is either stateDelete, stateKeep, or stateStale.
     * @private
     */
    /**
     * Gets the reference state for a cacheItem and all its references
     * if the cacheItem was to be removed.
     * @param {CacheItem} ci Cache item
     * @return {Object.<string, RefState>} A key value object with key being the rid, and value being a RefState array.
     * @private
     */
    private _getRefState;
    /**
     * Seeks for resources that no longer has any reference and may
     * be deleted.
     * Callback used with _traverse.
     * @param {*} refs References
     * @param {*} ci Cache item
     * @param {*} state State as returned from parent's traverse callback
     * @returns {*} State to pass to children. False means no traversing to children.
     * @private
     */
    private _seekRefs;
    /**
     * Marks reference as stateDelete, stateKeep, or stateStale, depending on
     * the values returned from a _seekRefs traverse.
     * @param {*} refs References
     * @param {*} ci Cache item
     * @param {*} state State as returned from parent's traverse callback
     * @return {*} State to pass to children. False means no traversing to children.
     * @private
     */
    private _markDelete;
    _deleteRef(ci: any): void;
    _getRefItem(v: any): any;
    _cacheResources(r: any): void;
    _createItems(refs: any, type: any): {};
    _initItems(refs: any, type: any): void;
    _syncItems(refs: any, type: any): void;
    _syncModel(cacheItem: any, data: any): void;
    _syncCollection(cacheItem: any, data: any): void;
    _patchDiff(a: any, b: any, onKeep: any, onAdd: any, onRemove: any): void;
    _sendUnsubscribe(ci: any, count: any): void;
    _subscribeReferred(ci: any): void;
    _handleFailedSubscribe(cacheItem: any, isRetry: any): void;
    _reconnect(noDelay: any): void;
    _resolvePath(url: any): any;
    _traverse(ci: any, cb: any, state: any, skipFirst?: boolean): void;
    _prepareValue(v: any, addIndirect: any): any;
}
import TypeList from './TypeList';
import ResModel from './ResModel';
import ResCollection from './ResCollection';
