import FixedExpenseDto from "../dto/FixedExpenseDto";
import FixedExpense from "../entities/FixedExpense";
import IHttpClient from "./providers/IHttpClient";
import IHttpClientRequestParameters from "./providers/IHttpClientRequestParameters";

class FixedExpenseClient {
    private BASE_URL = 'FixedExpense';

    
    constructor(
        private client: IHttpClient,
    ) {        
        
    }

    async register(fixedDto:FixedExpenseDto): Promise<FixedExpense> {
        const requestParams: IHttpClientRequestParameters = {
            url: `${this.BASE_URL}/Register`,
            payload: fixedDto
        };

        return await this.client.post<FixedExpense>(requestParams);            
    }

    async getAll():Promise<FixedExpense[]> {
        return await this.client.get({
            url: this.BASE_URL
        });
    }
}

export default FixedExpenseClient;