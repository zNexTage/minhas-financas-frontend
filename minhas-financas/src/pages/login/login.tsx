import { Container } from "react-bootstrap"
import LoginForm from "../../components/forms/login-form";
import UserLogin from "../../entities/UserLogin";
import UserClient from "../../client/UserClient";
import useTokenStorage from "../../hooks/token/use-token-storage";
import { Navigate, useNavigate } from "react-router-dom";

interface IProps {
    client: UserClient;
}

const Login = ({ client }: IProps) => {
    const { setToken, getToken } = useTokenStorage();
    const navitation = useNavigate();

    const onSubmit = async (userLogin: UserLogin) => {
        try {
            const token = await client.login(userLogin);

            setToken(token);

            navitation("/Dashboard");
        }
        catch (err) {
            alert('Não foi possível realizar o login');
            console.log(err);
        }
    }

    const token = getToken();
    
    const isAuthenticated = !!token;

    return (
        <>
            {!isAuthenticated &&
                <Container className="mt-5">
                    <h1>
                        Login
                    </h1>
                    <LoginForm onSubmit={onSubmit} />
                </Container>
            }
            {/* Redirect to the dashboard when user is authenticated. */}
            {isAuthenticated && <Navigate to={"/Dashboard"} />}
        </>
    )
}

export default Login;