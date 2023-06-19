import { createBrowserRouter } from "react-router-dom";
import BasePage from "./components/base-page";
import Dashboard from "./pages/dashboard";
import moneyOutflowRoutes from "./routes/money-outflow-routes";
import moneyInflowRoutes from "./routes/money-inflow-routes";
import userRoutes from "./routes/user-routes";
import PrivateRoute from "./routes/private-route";
import MoneyInflowClient from "./client/MoneyInflowClient";
import createAxiosClient from "./factory/create-axios-client";
import MoneyOutflowClient from "./client/MoneyOutflowClient";

const axios = createAxiosClient();

const moneyInflowClient = new MoneyInflowClient(axios);
const moneyOutflowClient = new MoneyOutflowClient(axios);

/**
 * Application routes
 */
const router = createBrowserRouter([
    {

        path: "/",
        element: <BasePage />,
        children: [
            {
                path: "Dashboard",
                element: (<PrivateRoute>
                    <Dashboard moneyOutflowClient={moneyOutflowClient} moneyInflowClient={moneyInflowClient} />
                </PrivateRoute>)
            },
            ...userRoutes,
            ...moneyOutflowRoutes,
            ...moneyInflowRoutes
        ]
    },
])

export default router;