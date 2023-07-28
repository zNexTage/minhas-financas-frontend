import { RouteObject } from "react-router-dom";
import Login from "../pages/login";
import createAxiosClient from "../factory/create-axios-client";
import UserClient from "../client/UserClient";

const axios = createAxiosClient();
const userClient = new UserClient(axios);

const userRoutes: RouteObject[] = [
    {
        path: ``,
        element: <Login client={userClient} />
    }
];

export default userRoutes;