/* tslint:disable */
/* eslint-disable */
/**
 * Data Modelling Storage Service
 * API for basic data modelling interaction
 *
 * The version of the OpenAPI document: 1.26.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */



/**
 * 
 * @export
 * @interface Repository
 */
export interface Repository {
    /**
     * 
     * @type {string}
     * @memberof Repository
     */
    'type': string;
    /**
     * 
     * @type {}
     * @memberof Repository
     */
    'data_types'?:  | null;
    /**
     * 
     * @type {string}
     * @memberof Repository
     */
    'host'?: string | null;
    /**
     * 
     * @type {number}
     * @memberof Repository
     */
    'port'?: number | null;
    /**
     * 
     * @type {string}
     * @memberof Repository
     */
    'username'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Repository
     */
    'password'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Repository
     */
    'database'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Repository
     */
    'collection'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Repository
     */
    'account_url'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Repository
     */
    'container'?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof Repository
     */
    'tls'?: boolean | null;
}

