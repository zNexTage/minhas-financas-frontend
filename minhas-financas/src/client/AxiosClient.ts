import axios, { AxiosHeaders, AxiosInstance } from "axios";
import IHttpClient from "./providers/IHttpClient";
import IHttpClientRequestParameters from "./providers/IHttpClientRequestParameters";
import TokenDto from "../dto/TokenDto";

class AxiosClient implements IHttpClient {
    private axiosClient!: AxiosInstance;
    private BASE_URL = import.meta.env.PROD ? "https://localhost:7039/" : "http://localhost:5001/";

    /**
     * Config and get request headers
     * @returns 
     */
    private getHeaders(): AxiosHeaders {
        const tokenDto = this.getToken();
        const headers: AxiosHeaders = new AxiosHeaders();

        if(tokenDto){
            headers.setAuthorization(`Bearer ${tokenDto.token}`);
        }            

        return headers;
    }

    constructor(
        private getToken: () => TokenDto | null
    ) {
        this.axiosClient = axios.create({
            baseURL: this.BASE_URL
        });        
    }

    async getById<T>(id: string | number, parameters: IHttpClientRequestParameters): Promise<T> {
        console.log(`${id} - ${parameters}`);
        throw new Error("Method not implemented.");
    }

    /**
     * Request to an endpoint and retrive all items of type T
     * @param parameters 
     * @returns 
     */
    async get<T>(parameters: IHttpClientRequestParameters): Promise<T> {
        const { url } = parameters;

        return new Promise(async (resolve, reject) => {
            try {
                const response = await this.axiosClient.get<T>(url, {
                    headers: this.getHeaders()
                });

                resolve(response.data);
            }
            catch (err) {
                reject(err);
            }
        })
    }
    async post<T>(parameters: IHttpClientRequestParameters): Promise<T> {
        const { url, payload } = parameters;

        return new Promise(async (resolve, reject) => {
            try {
                const response = await this.axiosClient.post<T>(
                    url,
                    payload, {
                    headers: this.getHeaders()
                });

                resolve(response.data);
            }
            catch (err) {
                reject(err);
            }
        })
    }
    async patch<T>(id: string | number, parameters: IHttpClientRequestParameters): Promise<T> {
        console.log(`${id} - ${parameters}`);
        throw new Error("Method not implemented.");
    }
    async put<T>(id: string | number, parameters: IHttpClientRequestParameters): Promise<T> {
        console.log(`${id} - ${parameters}`);
        throw new Error("Method not implemented.");
    }

}

export default AxiosClient;
