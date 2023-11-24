/* tslint:disable */
/* eslint-disable */
/**
 * Data Modelling Job API
 * REST API used with the Data Modelling framework to schedule jobs
 *
 * The version of the OpenAPI document: 1.3.5
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


// May contain unused imports in some cases
// @ts-ignore
import { JobStatus } from './job-status';

/**
 * 
 * @export
 * @interface StatusJobResponse
 */
export interface StatusJobResponse {
    /**
     * 
     * @type {JobStatus}
     * @memberof StatusJobResponse
     */
    'status': JobStatus;
    /**
     * 
     * @type {Array<string>}
     * @memberof StatusJobResponse
     */
    'log'?: Array<string>;
    /**
     * 
     * @type {number}
     * @memberof StatusJobResponse
     */
    'percentage'?: number;
}



