export default ResError;
/**
 * ResError represents a RES API error.
 */
declare class ResError {
    constructor(rid: any, method: any, params: any);
    rid: any;
    method: any;
    params: any;
    __init(err: any): this;
    _code: any;
    _message: any;
    _data: any;
    /**
     * Error code
     * @type {string}
     */
    get code(): string;
    /**
     * Error message
     * @type {string}
     */
    get message(): string;
    /**
     * Error data object
     * @type {*}
     */
    get data(): any;
    /**
     * Error resource ID
     * @returns {string} Resource ID
     */
    getResourceId(): string;
}
