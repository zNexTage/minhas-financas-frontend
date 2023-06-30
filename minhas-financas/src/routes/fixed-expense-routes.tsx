import { RouteObject } from "react-router-dom";
import RegisterFixedExpense from "../pages/fixed-expense/register-fixed-expense";
import PrivateRoute from "./private-route";
import FixedExpenseClient from "../client/FixedExpenseClient";
import createAxiosClient from "../factory/create-axios-client";

export const FIXED_EXPENSE_BASE_URL = "FixedExpense";

const axios = createAxiosClient();

const fixedExpenseClient = new FixedExpenseClient(axios);

const fixedExpenseRoutes: RouteObject[] = [
    {
        path: `${FIXED_EXPENSE_BASE_URL}/Register`,
        element: (<PrivateRoute>
            <RegisterFixedExpense 
            client={fixedExpenseClient}
             />
        </PrivateRoute>)
    }
]

export default fixedExpenseRoutes;