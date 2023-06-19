import { RouteObject } from "react-router-dom";
import ListMoneyInflow from "../pages/money-inflow/list-money-inflow";
import RegisterMoneyInflow from "../pages/money-inflow/register-money-inflow";
import createAxiosClient from "../factory/create-axios-client";
import MoneyInflowClient from "../client/MoneyInflowClient";

const BASE_URL = "MoneyInflow";

const axios = createAxiosClient();
const moneyInflowClient = new MoneyInflowClient(axios);

const moneyInflowRoutes: RouteObject[] = [
    {
        path: BASE_URL,
        element: <ListMoneyInflow client={moneyInflowClient} />
    },
    {
        path: `${BASE_URL}/Register`,
        element: <RegisterMoneyInflow client={moneyInflowClient} />
    }
]

export default moneyInflowRoutes;