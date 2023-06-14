import IHttpClientRequestParameters from "./IHttpClientRequestParameters";

/**
 * A custom interface to allow to use with a http client, like axios, fetch etc...
 */
interface IHttpClient {
    getAll<T>(parameters: IHttpClientRequestParameters): Promise<T>
    getById<T>(id:string | number, parameters: IHttpClientRequestParameters): Promise<T>
    post<T>(parameters: IHttpClientRequestParameters): Promise<T>
    patch<T>(id: string | number, parameters: IHttpClientRequestParameters): Promise<T>;
    put<T>(id: string | number, parameters: IHttpClientRequestParameters): Promise<T>;    
}

export default IHttpClient;