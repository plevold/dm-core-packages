/* tslint:disable */
/* eslint-disable */
/**
 * Data Modelling Storage Service
 * API for basic data modelling interaction
 *
 * The version of the OpenAPI document: 1.2.3
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


// May contain unused imports in some cases
// @ts-ignore
import { StorageDataTypes } from './storage-data-types';

/**
 * 
 * @export
 * @interface StorageAttribute
 */
export interface StorageAttribute {
    /**
     * 
     * @type {string}
     * @memberof StorageAttribute
     */
    'name': string;
    /**
     * 
     * @type {string}
     * @memberof StorageAttribute
     */
    'type'?: string;
    /**
     * 
     * @type {boolean}
     * @memberof StorageAttribute
     */
    'contained'?: boolean;
    /**
     * 
     * @type {StorageDataTypes}
     * @memberof StorageAttribute
     */
    'storageAffinity'?: StorageDataTypes;
    /**
     * 
     * @type {string}
     * @memberof StorageAttribute
     */
    'label'?: string;
    /**
     * 
     * @type {string}
     * @memberof StorageAttribute
     */
    'description'?: string;
}

