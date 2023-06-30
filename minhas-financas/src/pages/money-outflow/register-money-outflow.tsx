import { Container } from "react-bootstrap";
import FormMoneyOutflow from "../../components/forms/form-money-outflow";
import MoneyOutflowClient from "../../client/MoneyOutflowClient";
import { useNavigate } from "react-router-dom";

interface IProps {
    client: MoneyOutflowClient
}

const RegisterMoneyOutflow = ({ client }: IProps) => {
    const navigate = useNavigate();

    const onSubmit = async (moneyOutflow: MoneyOutflowDto) => {
        try {
            await client.register(
                moneyOutflow
            );

            alert("Saída de dinheiro registrado com sucesso!");

            navigate("/Dashboard");
        }
        catch (err) {
            alert("Não possível realizar o registro da saída");
        }
    }

    return (
        <Container className="mt-5">
            <h1>
                Saída de dinheiro | Registro
            </h1>
            <FormMoneyOutflow
                onSubmit={onSubmit}
            />
        </Container>
    )
}

export default RegisterMoneyOutflow;