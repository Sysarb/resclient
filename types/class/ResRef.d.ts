export default ResRef;
/**
 * ResRef represents a soft resource reference value.
 */
declare class ResRef {
    /**
     * Creates a ResRef instance
     * @param {ResClient} api ResClient instance
     * @param {string} rid Resource id.
     */
    constructor(api: ResClient, rid: string);
    _rid: string;
    _api: ResClient;
    /**
     * Referenced resource ID.
     * @returns {string} Resource ID.
     */
    get rid(): string;
    /**
     * Get referenced resource.
     * @return {Promise.<(ResModel|ResCollection)>} Promise of the resource.
     */
    get(): Promise<(ResModel | ResCollection)>;
    /**
     * Tests if another ResRef object is equivalent to this instance.
     * @param {*} o Value to test equality against.
     * @returns {boolean} True if equal, otherwise false.
     */
    equals(o: any): boolean;
    toJSON(): {
        rid: string;
    };
}
