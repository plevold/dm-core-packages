/* tslint:disable */
/* eslint-disable */
/**
 * Data Modelling Storage Service
 * API for basic data modelling interaction
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import globalAxios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { ErrorResponse } from '../models';
// @ts-ignore
import { Lookup } from '../models';
/**
 * LookupTableApi - axios parameter creator
 * @export
 */
export const LookupTableApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Create a recipe lookup table from a package containing RecipeLinks. Associate it with an application. This can be used for setting Ui- and StorageRecipes for specific applications.  - **application**: name of application
         * @summary Create Lookup
         * @param {string} application 
         * @param {string} recipePackage 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createLookup: async (application: string, recipePackage: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'application' is not null or undefined
            assertParamExists('createLookup', 'application', application)
            // verify required parameter 'recipePackage' is not null or undefined
            assertParamExists('createLookup', 'recipePackage', recipePackage)
            const localVarPath = `/api/application/{application}`
                .replace(`{${"application"}}`, encodeURIComponent(String(application)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication APIKeyHeader required
            await setApiKeyToObject(localVarHeaderParameter, "Access-Key", configuration)

            // authentication OAuth2AuthorizationCodeBearer required
            // oauth required
            await setOAuthToObject(localVarHeaderParameter, "OAuth2AuthorizationCodeBearer", [], configuration)

            if (recipePackage !== undefined) {
                localVarQueryParameter['recipe_package'] = recipePackage;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Fetch a single lookup table.  - **application**: name of application
         * @summary Get Lookup
         * @param {string} application 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getLookup: async (application: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'application' is not null or undefined
            assertParamExists('getLookup', 'application', application)
            const localVarPath = `/api/application/{application}`
                .replace(`{${"application"}}`, encodeURIComponent(String(application)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication APIKeyHeader required
            await setApiKeyToObject(localVarHeaderParameter, "Access-Key", configuration)

            // authentication OAuth2AuthorizationCodeBearer required
            // oauth required
            await setOAuthToObject(localVarHeaderParameter, "OAuth2AuthorizationCodeBearer", [], configuration)


    
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
 * LookupTableApi - functional programming interface
 * @export
 */
export const LookupTableApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = LookupTableApiAxiosParamCreator(configuration)
    return {
        /**
         * Create a recipe lookup table from a package containing RecipeLinks. Associate it with an application. This can be used for setting Ui- and StorageRecipes for specific applications.  - **application**: name of application
         * @summary Create Lookup
         * @param {string} application 
         * @param {string} recipePackage 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createLookup(application: string, recipePackage: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createLookup(application, recipePackage, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Fetch a single lookup table.  - **application**: name of application
         * @summary Get Lookup
         * @param {string} application 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getLookup(application: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Lookup>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getLookup(application, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * LookupTableApi - factory interface
 * @export
 */
export const LookupTableApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = LookupTableApiFp(configuration)
    return {
        /**
         * Create a recipe lookup table from a package containing RecipeLinks. Associate it with an application. This can be used for setting Ui- and StorageRecipes for specific applications.  - **application**: name of application
         * @summary Create Lookup
         * @param {string} application 
         * @param {string} recipePackage 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createLookup(application: string, recipePackage: string, options?: any): AxiosPromise<void> {
            return localVarFp.createLookup(application, recipePackage, options).then((request) => request(axios, basePath));
        },
        /**
         * Fetch a single lookup table.  - **application**: name of application
         * @summary Get Lookup
         * @param {string} application 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getLookup(application: string, options?: any): AxiosPromise<Lookup> {
            return localVarFp.getLookup(application, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for createLookup operation in LookupTableApi.
 * @export
 * @interface LookupTableApiCreateLookupRequest
 */
export interface LookupTableApiCreateLookupRequest {
    /**
     * 
     * @type {string}
     * @memberof LookupTableApiCreateLookup
     */
    readonly application: string

    /**
     * 
     * @type {string}
     * @memberof LookupTableApiCreateLookup
     */
    readonly recipePackage: string
}

/**
 * Request parameters for getLookup operation in LookupTableApi.
 * @export
 * @interface LookupTableApiGetLookupRequest
 */
export interface LookupTableApiGetLookupRequest {
    /**
     * 
     * @type {string}
     * @memberof LookupTableApiGetLookup
     */
    readonly application: string
}

/**
 * LookupTableApi - object-oriented interface
 * @export
 * @class LookupTableApi
 * @extends {BaseAPI}
 */
export class LookupTableApi extends BaseAPI {
    /**
     * Create a recipe lookup table from a package containing RecipeLinks. Associate it with an application. This can be used for setting Ui- and StorageRecipes for specific applications.  - **application**: name of application
     * @summary Create Lookup
     * @param {LookupTableApiCreateLookupRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LookupTableApi
     */
    public createLookup(requestParameters: LookupTableApiCreateLookupRequest, options?: AxiosRequestConfig) {
        return LookupTableApiFp(this.configuration).createLookup(requestParameters.application, requestParameters.recipePackage, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Fetch a single lookup table.  - **application**: name of application
     * @summary Get Lookup
     * @param {LookupTableApiGetLookupRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LookupTableApi
     */
    public getLookup(requestParameters: LookupTableApiGetLookupRequest, options?: AxiosRequestConfig) {
        return LookupTableApiFp(this.configuration).getLookup(requestParameters.application, options).then((request) => request(this.axios, this.basePath));
    }
}