import axios, { AxiosHeaders, AxiosInstance } from "axios";
import IHttpClient from "./providers/IHttpClient";
import IHttpClientRequestParameters from "./providers/IHttpClientRequestParameters";

class AxiosClient implements IHttpClient {
    private axiosClient!: AxiosInstance;
    private BASE_URL = "http://localhost:5132/";


    /**
     * Configuration the axios instance
     */
    private configuration() {
        const token = this.getToken();
        const headers: AxiosHeaders = new AxiosHeaders();

        if (token) {
            headers.setAuthorization(`Bearer ${token}`);
        }

        this.axiosClient = axios.create({
            baseURL: this.BASE_URL,
            headers: headers
        });
    }

    constructor(
        private getToken: () => string | null
    ) {
        this.configuration();
    }

    async getById<T>(id: string | number, parameters: IHttpClientRequestParameters): Promise<T> {
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
                const response = await this.axiosClient.get<T>(url);

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
                const response = await this.axiosClient.post<T>(url, payload);

                resolve(response.data);
            }
            catch (err) {
                reject(err);
            }
        })
    }
    async patch<T>(id: string | number, parameters: IHttpClientRequestParameters): Promise<T> {
        throw new Error("Method not implemented.");
    }
    async put<T>(id: string | number, parameters: IHttpClientRequestParameters): Promise<T> {
        throw new Error("Method not implemented.");
    }

}

export default AxiosClient;