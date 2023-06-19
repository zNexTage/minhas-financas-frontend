const useTokenStorage = () => {
    const TOKEN_KEY = 'MinhasFinancasTokenKey';

    /**
     * Save token in localstorage
     * @param token 
     */
    const setToken = (token:string): void => {
        localStorage.setItem(TOKEN_KEY, token);
    }

    /**
     * Get token from localstorage
     * @returns 
     */
    const getToken = () => localStorage.getItem(TOKEN_KEY);

    return {
        setToken,
        getToken
    }
}

export default useTokenStorage;