import TokenDto from "../../dto/TokenDto";

const useTokenStorage = () => {
    const TOKEN_KEY = 'MinhasFinancasTokenKey';

    /**
     * Save token in localstorage
     * @param token 
     */
    const setToken = (tokenDto: TokenDto): void => {
        localStorage.setItem(TOKEN_KEY, JSON.stringify(tokenDto));
    }

    /**
     * Get token from localstorage
     * @returns 
     */
    const getToken = (): TokenDto | null => {
        const tokenDto = localStorage.getItem(TOKEN_KEY);

        if (!tokenDto) return null;

        return JSON.parse(tokenDto) as TokenDto;
    }

    const removeToken = () => localStorage.removeItem(TOKEN_KEY);

    return {
        setToken,
        getToken,
        removeToken
    }
}

export default useTokenStorage;