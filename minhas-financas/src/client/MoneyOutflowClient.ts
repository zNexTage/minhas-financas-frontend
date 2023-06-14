import MoneyOutflow from "../entities/MoneyOutflow";
import IHttpClient from "./providers/IHttpClient";

/**
 * A client to request to the MoneyOutflows endpont;
 */
class MoneyOutflowClient {
    private BASE_URL: string = "MoneyOutflow";

    constructor(
        private client: IHttpClient
    ) {

    }

    /**
     * Get all money outflow associate to the logged user; 
     * The user must be logged, otherwise, 401 will be returned by the server.
     * @returns A list of MoneyOutflow
     */
    async getAll(): Promise<Array<MoneyOutflow>> {
        const response = await this.client.getAll<Array<MoneyOutflowDto>>({ url: this.BASE_URL });
        
        const moneyOutflows = response.map(dto => new MoneyOutflow(
            dto.description,
            dto.value,
            dto.quantity,
            dto.paymentMethod,
            dto.paymentLocation,
            dto.paymentCategory,
            new Date(dto.date),
            dto.id
        ));

        return moneyOutflows;
    }
}

export default MoneyOutflowClient;