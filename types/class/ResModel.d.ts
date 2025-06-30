export default ResModel;
/**
 * ~changeCallback
 */
export type ResModel = (changed: {
    [x: string]: any;
}, model: Model, event: string, action: string | null) => any;
/**
 * Change event emitted on any change to one or more public (non-underscore) properties.
 * @callback ResModel~changeCallback
 * @param {Object.<string,*>} changed Changed key/value object where key is the changed property, and value is the old property value.
 * @param {Model} model ResModel emitting the event.
 * @param {string} event Event name including namespace.
 * @param {?string} action Event action.
 */
/**
 * ResModel represents a model provided over the RES API.
 * @implements {module:modapp~Model}
 */
declare class ResModel implements module {
    /**
     * Creates a ResModel instance
     * @param {ResClient} api ResClient instance
     * @param {string} rid Resource id.
     * @param {object} [opt] Optional parameters.
     * @param {object} [opt.definition] Object definition. If not provided, any value will be allowed.
     */
    constructor(api: ResClient, rid: string, opt?: {
        definition?: object;
    });
    _rid: string;
    _api: ResClient;
    _props: {};
    /**
     * Model properties.
     * @returns {object} Anonymous object with all model properties.
     */
    get props(): object;
    /**
     * ResClient instance.
     * @returns {ResClient} ResClient instance
     */
    getClient(): ResClient;
    /**
     * Model resource ID
     * @returns {string} Resource ID
     */
    getResourceId(): string;
    /**
     * Attach a model event handler function for one or more events.
     * If no event or handler is provided, the model will still be considered listened to,
     * until a matching off call without arguments is made.
     * Available events are 'change', or custom events.
     * @param {?string} [events] One or more space-separated events. Null means any event.
     * @param {ResModel~changeCallback|eventCallback} [handler] Handler function to execute when the event is emitted.
     * @returns {this}
     */
    on(events?: string | null, handler: any): this;
    /**
    * Remove a model event handler function.
    * Available events are 'change', or custom events.
    * @param {?string} events One or more space-separated events. Null means any event.
    * @param {ResModel~changeCallback|eventCallback} [handler] Handler function to remove.
    * @returns {this}
    */
    off(events: string | null, handler: any): this;
    /**
     * Calls the set method to update model properties.
     * @param {object} props Properties. Set value to undefined to delete a property.
     * @returns {Promise.<object>} Promise of the call being completed.
     */
    set(props: object): Promise<object>;
    /**
     * Calls a method on the model.
     * @param {string} method Method name
     * @param {*} params Method parameters
     * @returns {Promise.<object>} Promise of the call result.
     */
    call(method: string, params: any): Promise<object>;
    /**
     * Calls an auth method on the model.
     * @param {string} method Auth method name
     * @param {*} params Method parameters
     * @returns {Promise.<object>} Promise of the auth result.
     */
    auth(method: string, params: any): Promise<object>;
    /**
     * Initializes the model with a data object.
     * Should only be called by the ResClient instance.
     * @param {object} data Data object
     * @private
     */
    private __init;
    /**
     * Updates the model.
     * Should only be called by the ResClient instance.
     * @param {object} props Properties to update
     * @param {boolean} reset Flag that sets if missing values should be deleted.
     * @returns {?object} Changed properties
     * @private
     */
    private __update;
    toJSON(): any;
}
