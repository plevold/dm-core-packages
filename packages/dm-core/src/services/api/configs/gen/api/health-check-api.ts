/* tslint:disable */
/* eslint-disable */
/**
 * Data Modelling Storage Service
 * API for basic data modelling interaction
 *
 * The version of the OpenAPI document: 1.14.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError, operationServerMap } from '../base';
// @ts-ignore
import { ErrorResponse } from '../models';
/**
 * HealthCheckApi - axios parameter creator
 * @export
 */
export const HealthCheckApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Get the Health Status Of the Service.  This endpoint can be used to check the health status of the service. It always returns a 200 OK response to indicate that the service is up and running.  Returns: - string: A string indicating the health status. (\"OK\")
         * @summary Get
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getApiHealthcheckGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/healthcheck`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * HealthCheckApi - functional programming interface
 * @export
 */
export const HealthCheckApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = HealthCheckApiAxiosParamCreator(configuration)
    return {
        /**
         * Get the Health Status Of the Service.  This endpoint can be used to check the health status of the service. It always returns a 200 OK response to indicate that the service is up and running.  Returns: - string: A string indicating the health status. (\"OK\")
         * @summary Get
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getApiHealthcheckGet(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getApiHealthcheckGet(options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['HealthCheckApi.getApiHealthcheckGet']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
    }
};

/**
 * HealthCheckApi - factory interface
 * @export
 */
export const HealthCheckApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = HealthCheckApiFp(configuration)
    return {
        /**
         * Get the Health Status Of the Service.  This endpoint can be used to check the health status of the service. It always returns a 200 OK response to indicate that the service is up and running.  Returns: - string: A string indicating the health status. (\"OK\")
         * @summary Get
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getApiHealthcheckGet(options?: AxiosRequestConfig): AxiosPromise<string> {
            return localVarFp.getApiHealthcheckGet(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * HealthCheckApi - object-oriented interface
 * @export
 * @class HealthCheckApi
 * @extends {BaseAPI}
 */
export class HealthCheckApi extends BaseAPI {
    /**
     * Get the Health Status Of the Service.  This endpoint can be used to check the health status of the service. It always returns a 200 OK response to indicate that the service is up and running.  Returns: - string: A string indicating the health status. (\"OK\")
     * @summary Get
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof HealthCheckApi
     */
    public getApiHealthcheckGet(options?: AxiosRequestConfig) {
        return HealthCheckApiFp(this.configuration).getApiHealthcheckGet(options).then((request) => request(this.axios, this.basePath));
    }
}

