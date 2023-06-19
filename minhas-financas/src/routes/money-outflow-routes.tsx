import { RouteObject } from "react-router-dom";
import ListMoneyOutflow from "../pages/money-outflow/list-money-outflow";
import createAxiosClient from "../factory/create-axios-client";
import MoneyOutflowClient from "../client/MoneyOutflowClient";
import RegisterMoneyOutflow from "../pages/money-outflow/register-money-outflow";
import PrivateRoute from "./private-route";

export const MONEY_OUTFLOW_BASE_ROUTE = "MoneyOutflow";

const axios = createAxiosClient();
const moneyOutflowClient = new MoneyOutflowClient(axios);

const moneyOutflowRoutes: RouteObject[] = [
    {
        path: MONEY_OUTFLOW_BASE_ROUTE,
        element: (<PrivateRoute>
            <ListMoneyOutflow client={moneyOutflowClient} />
        </PrivateRoute>)
    },
    {
        path: `${MONEY_OUTFLOW_BASE_ROUTE}/Register`,
        element: (<PrivateRoute>
            <RegisterMoneyOutflow client={moneyOutflowClient} />
        </PrivateRoute>)
    },
]

export default moneyOutflowRoutes;