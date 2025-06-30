export default TypeList;
/**
 * TypeList holds registered resource factory callbacks
 */
declare class TypeList {
    /**
     * Creates a TypeList instance
     * @param {resourceFactoryCallback} defaultFactory Default factory function
     */
    constructor(defaultFactory: resourceFactoryCallback);
    root: {};
    defaultFactory: resourceFactoryCallback;
    /**
     * Adds a resource factory callback to a pattern.
     * The pattern may use the following wild cards:
     * * The asterisk (*) matches any part at any level of the resource name.
     * * The greater than symbol (>) matches one or more parts at the end of a resource name, and must be the last part.
     * @param {string} pattern Pattern of the resource type.
     * @param {resourceFactoryCallback} factory Resource factory callback
     */
    addFactory(pattern: string, factory: resourceFactoryCallback): void;
    /**
     * Removes a resource factory callback.
     * @param {string} pattern Pattern of the resource type.
     * @returns {?resourceFactoryCallback} Factory callback or undefined if no callback is registered on the pattern
     */
    removeFactory(pattern: string): resourceFactoryCallback | null;
    /**
     * Gets the factory callback that best matches the pattern.
     * Matching will give priority to text, then to *-wildcards, and last to >-wildcards.
     * @param {string} rid Resource ID
     * @returns {resourceFactoryCallback} Factory callback
     */
    getFactory(rid: string): resourceFactoryCallback;
    _match(ts: any, i: any, l: any): any;
}
