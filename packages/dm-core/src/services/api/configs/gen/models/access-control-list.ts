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
import { AccessLevel } from './access-level';

/**
 * acl:   owner: \'user_id\'   roles:     \'role\': WRITE   users:     \'user_id\': WRITE   others: READ
 * @export
 * @interface AccessControlList
 */
export interface AccessControlList {
    /**
     * 
     * @type {string}
     * @memberof AccessControlList
     */
    'owner': string;
    /**
     * 
     * @type {{ [key: string]: AccessLevel; }}
     * @memberof AccessControlList
     */
    'roles'?: { [key: string]: AccessLevel; };
    /**
     * 
     * @type {{ [key: string]: AccessLevel; }}
     * @memberof AccessControlList
     */
    'users'?: { [key: string]: AccessLevel; };
    /**
     * 
     * @type {AccessLevel}
     * @memberof AccessControlList
     */
    'others'?: AccessLevel;
}


