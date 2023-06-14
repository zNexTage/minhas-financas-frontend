import { createBrowserRouter } from "react-router-dom";
import ListMoneyOutflow from "./pages/money-outflow/list-money-outflow";
import MoneyOutflowClient from "./client/MoneyOutflowClient";
import AxiosClient from "./client/AxiosClient";
import RegisterMoneyOutflow from "./pages/money-outflow/register-money-outflow";
import BasePage from "./components/base-page";



const router = createBrowserRouter([
    {

        path: "/",
        element: <BasePage />,
        children:[
            { 
                path: "MoneyOutflow",
                element: <ListMoneyOutflow
                client={new MoneyOutflowClient(new AxiosClient())} />
            },
            { 
                path: "MoneyOutflow/Register",
                element: <RegisterMoneyOutflow/>
            }
        ]
    },
])

export default router;