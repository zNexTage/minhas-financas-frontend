import MoneyInflowDto from "../dto/MoneyInflowDto";
import MoneyInflow from "../entities/MoneyInflow";
import MoneyInflowMapper from "../mappers/money-inflow";
import IHttpClient from "./providers/IHttpClient";

class MoneyInflowClient {
    private BASE_URL = "MoneyInflow";
    private mapper: MoneyInflowMapper;

    constructor(
        private client: IHttpClient
    ) {
        this.mapper = new MoneyInflowMapper();
    }

    /**
     * Get all money inflows associate to the logged user; 
     * The user must be logged, otherwise, 401 will be returned by the server.
     * @returns 
     */
    async getAll(): Promise<Array<MoneyInflow>> {
        const response = await this.client.get<Array<MoneyInflowDto>>({ url: this.BASE_URL });

        const moneyInflows = response.map(dto => this.mapper.fromDto(dto));

        return moneyInflows;
    }


    async register(moneyInflowDto: MoneyInflowDto): Promise<MoneyInflow> {
        const response = await this.client.post<MoneyInflowDto>({
            url: `${this.BASE_URL}/Register`,
            payload: moneyInflowDto
        });

        return this.mapper.fromDto(response);
    }

    async getTotalByPeriod(month: number, year: number): Promise<number> {
        const total = await this.client.get<number>({
            url: `${this.BASE_URL}/TotalByPeriod?month=${month}&year=${year}`
        });

        return total;
    }
}

export default MoneyInflowClient;