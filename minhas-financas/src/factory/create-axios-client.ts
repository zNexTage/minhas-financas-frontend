import AxiosClient from "../client/AxiosClient";
import useTokenStorage from "../hooks/token/use-token-storage"

/**
 * Create an axios client using getToken from useTokenStorage hook
 * @returns 
 */
const createAxiosClient = () => {
    const { getToken } = useTokenStorage();

    return new AxiosClient(getToken);
}

export default createAxiosClient;