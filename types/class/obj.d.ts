/**
 * /obj~PropertyDefinition
 */
export type func = {
    /**
     * Type of the property. May be 'string', '?string', 'number', '?number', 'boolean', '?boolean'
     */
    type: string;
    /**
     * Default value of the property.
     */
    default?: any;
    /**
     * Asserts the value. Throws an exception on failed assertion.
     */
    assert?: Function;
    /**
     * Filter callback receiving the initial value as only parameter, returning the filtered value.
     */
    filter?: Function;
    /**
     * Name of target property. Default is to use the same property name as the source.
     */
    property?: string;
};
/**
 * Compares two values deeply using strict equal testing for non-objects (===).<br>
 * Two objects are considered equal if they contain the same set of properties with equal value.
 * @param {*} a Value to compare with b.
 * @param {*} b Value to compare with a.
 * @returns {boolean} True if the values are equal, otherwise false.
 */
export function equal(a: any, b: any): boolean;
/**
 * Updates an target object from a source object based upon a definition
 * @param {object} target Target object
 * @param {object} source Source object
 * @param {Object.<string, string|func/obj~PropertyDefinition>} def Definition object which is a key/value object where the key is the property and the value is the property type or a property definition.
 * @param {boolean} strict Strict flag. If true, exceptions will be thrown on errors. If false, errors will be ignored. Default is true.
 * @returns {?Object.<string, *>} Key/value object where the key is the updated properties and the value is the old values.
 */
export function update(target: object, source: object, def: any, strict?: boolean): {
    [x: string]: any;
} | null;
/**
 * Copies a source object based upon a definition
 * @param {object} source Source object
 * @param {object} def Definition object which is a key/value object where the key is the property and the value is the value type.
 * @param {boolean} strict Strict flag. If true, exceptions will be thrown on errors. If false, errors will be ignored. Default is false.
 * @returns {object} Copy of the object
 */
export function copy(source: object, def: object, strict?: boolean): object;
