import MoneyOutflow from "../entities/MoneyOutflow";
import MoneyOutflowMapper from "../mappers/money-outflow";
import IHttpClient from "./providers/IHttpClient";

/**
 * A client to request to the MoneyOutflows endpont;
 */
class MoneyOutflowClient {
    private BASE_URL: string = "MoneyOutflow";
    private mapper: MoneyOutflowMapper;

    constructor(
        private client: IHttpClient
    ) {
        this.mapper = new MoneyOutflowMapper();
    }

    /**
     * Get all money outflow associate to the logged user; 
     * The user must be logged, otherwise, 401 will be returned by the server.
     * @returns A list of MoneyOutflow
     */
    async getAll(): Promise<Array<MoneyOutflow>> {
        const response = await this.client.getAll<Array<MoneyOutflowDto>>({ url: this.BASE_URL });

        const moneyOutflows = response.map(dto => this.mapper.fromDto(dto));

        return moneyOutflows;
    }

    async register(moneyOutflow: MoneyOutflowDto) {
        const response = await this.client.post<MoneyOutflowDto>({
            url: `${this.BASE_URL}/Register`,
            payload: moneyOutflow
        });

        return this.mapper.fromDto(response);
    }
}

export default MoneyOutflowClient;