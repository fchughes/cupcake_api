import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Schemas {
        export interface Cupcake {
            something: string;
            id?: number; // int64
            name: string;
            description?: string;
            price: number;
            ingredients?: string[];
        }
        export interface User {
            id?: number; // int64
            name: string;
        }
    }
}
declare namespace Paths {
    namespace AddCupcake {
        export type RequestBody = Components.Schemas.Cupcake;
        namespace Responses {
            export interface $405 {
            }
        }
    }
    namespace AddUser {
        export type RequestBody = Components.Schemas.User;
        namespace Responses {
            export interface $405 {
            }
        }
    }
    namespace DeleteCupcake {
        namespace Parameters {
            export type CupcakeId = number; // int64
        }
        export interface PathParameters {
            cupcakeId: Parameters.CupcakeId /* int64 */;
        }
        namespace Responses {
            export interface $400 {
            }
            export interface $404 {
            }
        }
    }
    namespace GetCupcakeById {
        namespace Parameters {
            export type CupcakeId = number; // int64
        }
        export interface PathParameters {
            cupcakeId: Parameters.CupcakeId /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Cupcake;
            export interface $400 {
            }
            export interface $404 {
            }
        }
    }
    namespace GetUserById {
        namespace Parameters {
            export type UserId = number; // int64
        }
        export interface PathParameters {
            userId: Parameters.UserId /* int64 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.User;
            export interface $400 {
            }
            export interface $404 {
            }
        }
    }
    namespace ListCupcakes {
        namespace Responses {
            export type $200 = Components.Schemas.Cupcake[];
        }
    }
    namespace ListUsers {
        namespace Responses {
            export type $200 = Components.Schemas.User[];
        }
    }
    namespace UpdateCupcake {
        namespace Parameters {
            export type CupcakeId = number; // int64
        }
        export interface PathParameters {
            cupcakeId: Parameters.CupcakeId /* int64 */;
        }
        export type RequestBody = Components.Schemas.Cupcake;
        namespace Responses {
            export interface $400 {
            }
            export interface $404 {
            }
            export interface $405 {
            }
        }
    }
}

export interface OperationMethods {
  /**
   * listCupcakes - List all cupcakes
   * 
   * Returns a list of available cupcakes
   */
  'listCupcakes'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListCupcakes.Responses.$200>
  /**
   * addCupcake - Add a new cupcake to the store
   */
  'addCupcake'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AddCupcake.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * getCupcakeById - Find cupcake by ID
   * 
   * Returns a single cupcake
   */
  'getCupcakeById'(
    parameters?: Parameters<Paths.GetCupcakeById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetCupcakeById.Responses.$200>
  /**
   * updateCupcake - Update an existing cupcake
   */
  'updateCupcake'(
    parameters?: Parameters<Paths.UpdateCupcake.PathParameters> | null,
    data?: Paths.UpdateCupcake.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * deleteCupcake - Deletes a cupcake
   */
  'deleteCupcake'(
    parameters?: Parameters<Paths.DeleteCupcake.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * listUsers - List all users
   * 
   * Returns a list of users
   */
  'listUsers'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListUsers.Responses.$200>
  /**
   * addUser - Add a new userto the store
   */
  'addUser'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AddUser.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * getUserById - Find User by ID
   * 
   * Returns a single user
   */
  'getUserById'(
    parameters?: Parameters<Paths.GetUserById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUserById.Responses.$200>
}

export interface PathsDictionary {
  ['/cupcake']: {
    /**
     * addCupcake - Add a new cupcake to the store
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AddCupcake.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
    /**
     * listCupcakes - List all cupcakes
     * 
     * Returns a list of available cupcakes
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListCupcakes.Responses.$200>
  }
  ['/cupcake/{cupcakeId}']: {
    /**
     * getCupcakeById - Find cupcake by ID
     * 
     * Returns a single cupcake
     */
    'get'(
      parameters?: Parameters<Paths.GetCupcakeById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetCupcakeById.Responses.$200>
    /**
     * updateCupcake - Update an existing cupcake
     */
    'put'(
      parameters?: Parameters<Paths.UpdateCupcake.PathParameters> | null,
      data?: Paths.UpdateCupcake.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
    /**
     * deleteCupcake - Deletes a cupcake
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteCupcake.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
  }
  ['/user']: {
    /**
     * addUser - Add a new userto the store
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AddUser.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
    /**
     * listUsers - List all users
     * 
     * Returns a list of users
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListUsers.Responses.$200>
  }
  ['/user/{userId}']: {
    /**
     * getUserById - Find User by ID
     * 
     * Returns a single user
     */
    'get'(
      parameters?: Parameters<Paths.GetUserById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUserById.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
