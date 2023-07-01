import { RouteObject } from "react-router-dom";
import ListMoneyOutflow from "../pages/money-outflow/list-money-outflow";
import createAxiosClient from "../factory/create-axios-client";
import MoneyOutflowClient from "../client/MoneyOutflowClient";
import RegisterMoneyOutflow from "../pages/money-outflow/register-money-outflow";
import PrivateRoute from "./private-route";
import FixedExpenseClient from "../client/FixedExpenseClient";

export const MONEY_OUTFLOW_BASE_ROUTE = "MoneyOutflow";

const axios = createAxiosClient();
const moneyOutflowClient = new MoneyOutflowClient(axios);
const fixedExpenseClient = new FixedExpenseClient(axios);

const moneyOutflowRoutes: RouteObject[] = [
    {
        path: MONEY_OUTFLOW_BASE_ROUTE,
        element: (<PrivateRoute>
            <ListMoneyOutflow
                fixedExpenseClient={fixedExpenseClient}
                outflowClient={moneyOutflowClient}
            />
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