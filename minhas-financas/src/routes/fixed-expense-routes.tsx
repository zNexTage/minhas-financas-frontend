import { RouteObject } from "react-router-dom";
import RegisterFixedExpense from "../pages/fixed-expense/register-fixed-expense";
import PrivateRoute from "./private-route";

export const FIXED_EXPENSE_BASE_URL = "FixedExpense";

const fixedExpenseRoutes: RouteObject[] = [
    {
        path: `${FIXED_EXPENSE_BASE_URL}/Register`,
        element: (<PrivateRoute>
            <RegisterFixedExpense />
        </PrivateRoute>)
    }
]

export default fixedExpenseRoutes;