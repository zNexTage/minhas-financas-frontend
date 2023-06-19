import { RouteObject } from "react-router-dom";
import ListMoneyOutflow from "../pages/money-outflow/list-money-outflow";
import createAxiosClient from "../factory/create-axios-client";
import MoneyOutflowClient from "../client/MoneyOutflowClient";
import RegisterMoneyOutflow from "../pages/money-outflow/register-money-outflow";

const BASE_ROUTE = "MoneyOutflow";

const axios = createAxiosClient();
const moneyOutflowClient = new MoneyOutflowClient(axios);

const moneyOutflowRoutes: RouteObject[] = [
    {
        path: BASE_ROUTE,
        element: <ListMoneyOutflow client={moneyOutflowClient} />
    },
    {
        path: `${BASE_ROUTE}/Register`,
        element: <RegisterMoneyOutflow client={moneyOutflowClient} />
    },
]

export default moneyOutflowRoutes;