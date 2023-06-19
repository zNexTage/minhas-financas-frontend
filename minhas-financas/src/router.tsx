import { createBrowserRouter } from "react-router-dom";
import BasePage from "./components/base-page";
import Dashboard from "./pages/dashboard";
import moneyOutflowRoutes from "./routes/money-outflow-routes";
import moneyInflowRoutes from "./routes/money-inflow-routes";
import userRoutes from "./routes/user-routes";


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
                element: <Dashboard />
            },
            ...userRoutes,
            ...moneyOutflowRoutes,
            ...moneyInflowRoutes
        ]
    },
])

export default router;