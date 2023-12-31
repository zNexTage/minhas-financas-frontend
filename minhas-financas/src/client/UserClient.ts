import TokenDto from "../dto/TokenDto";
import UserLogin from "../entities/UserLogin";
import IHttpClient from "./providers/IHttpClient";

class UserClient {
    private BASE_URL = "User";

    constructor(
        private client: IHttpClient
    ) {

    }

    async login(userLogin: UserLogin): Promise<TokenDto> {
        const token = await this.client.post<TokenDto>(
            {
                url: `${this.BASE_URL}/Login`,
                payload: userLogin
            }
        );

        return token;
    }
}

export default UserClient;