import { Container } from "react-bootstrap"
import FormMoneyInflow from "../../components/forms/form-money-inflow"
import MoneyInflowDto from "../../dto/MoneyInflowDto"
import MoneyInflowClient from "../../client/MoneyInflowClient";
import { useNavigate } from "react-router-dom";

interface IProps {
    client: MoneyInflowClient;
}

const RegisterMoneyInflow = ({ client }: IProps) => {
    const navigate = useNavigate();

    const onSubmit = async (data: MoneyInflowDto) => {
        await client.register(data);

        alert("Entrada de dinheiro registrada com sucesso!");

        navigate("/Dashboard");
    }

    return (
        <Container className="mt-5">
            <h1>
                Entrada de dinheiro | Registro
            </h1>
            <FormMoneyInflow onSubmit={onSubmit} />
        </Container>
    )
}

export default RegisterMoneyInflow;