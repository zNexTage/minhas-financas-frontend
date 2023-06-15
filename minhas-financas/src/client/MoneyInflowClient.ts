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

    async getAll():Promise<Array<MoneyInflow>>{
        const response = await this.client.getAll<Array<MoneyInflowDto>>({url: this.BASE_URL});

        const moneyInflows = response.map(dto => this.mapper.fromDto(dto));

        return moneyInflows;
    }
}

export default MoneyInflowClient;