import { RouteObject } from "react-router-dom";
import ListMoneyInflow from "../pages/money-inflow/list-money-inflow";
import RegisterMoneyInflow from "../pages/money-inflow/register-money-inflow";
import createAxiosClient from "../factory/create-axios-client";
import MoneyInflowClient from "../client/MoneyInflowClient";
import PrivateRoute from "./private-route";

export const MONEY_INFLOW_BASE_URL = "MoneyInflow";

const axios = createAxiosClient();
const moneyInflowClient = new MoneyInflowClient(axios);

const moneyInflowRoutes: RouteObject[] = [
    {
        path: MONEY_INFLOW_BASE_URL,
        element: (<PrivateRoute>
            <ListMoneyInflow client={moneyInflowClient} />
        </PrivateRoute>)
    },
    {
        path: `${MONEY_INFLOW_BASE_URL}/Register`,
        element: (<PrivateRoute>
            <RegisterMoneyInflow client={moneyInflowClient} />
        </PrivateRoute>)
    }
]

export default moneyInflowRoutes;