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



/**
 * An enumeration.
 * @export
 * @enum {string}
 */

export const RepositoryType = {
    MongoDb: 'mongo-db',
    AzureBlobStorage: 'azure-blob-storage',
    LocalStorage: 'localStorage'
} as const;

export type RepositoryType = typeof RepositoryType[keyof typeof RepositoryType];



