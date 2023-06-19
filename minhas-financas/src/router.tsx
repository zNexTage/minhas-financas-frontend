import { createBrowserRouter } from "react-router-dom";
import ListMoneyOutflow from "./pages/money-outflow/list-money-outflow";
import MoneyOutflowClient from "./client/MoneyOutflowClient";
import AxiosClient from "./client/AxiosClient";
import RegisterMoneyOutflow from "./pages/money-outflow/register-money-outflow";
import BasePage from "./components/base-page";
import MoneyInflowClient from "./client/MoneyInflowClient";
import ListMoneyInflow from "./pages/money-inflow/list-money-inflow";
import RegisterMoneyInflow from "./pages/money-inflow/register-money-inflow";
import Login from "./pages/login";
import UserClient from "./client/UserClient";
import Dashboard from "./pages/dashboard";

const axios = new AxiosClient();
const moneyOutflowClient = new MoneyOutflowClient(axios);

const moneyInflowClient = new MoneyInflowClient(axios);

const userClient = new UserClient(axios);

const router = createBrowserRouter([
    {

        path: "/",
        element: <BasePage />,
        children: [
            {
                path: "Login",
                element:<Login client={userClient} />
            },
            {
                path: "Dashboard",
                element: <Dashboard />
            },
            {
                path: "MoneyOutflow",
                element: <ListMoneyOutflow
                    client={moneyOutflowClient} />
            },
            {
                path: "MoneyOutflow/Register",
                element: <RegisterMoneyOutflow client={moneyOutflowClient} />
            },
            {
                path: "MoneyInflow",
                element: <ListMoneyInflow client={moneyInflowClient} />
            },
            {
                path: "MoneyInflow/Register",
                element: <RegisterMoneyInflow client={moneyInflowClient} />
            }
        ]
    },
])

export default router;