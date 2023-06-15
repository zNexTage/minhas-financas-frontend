import { Container } from "react-bootstrap"
import FormMoneyInflow from "../../components/forms/form-money-inflow"
import MoneyInflowDto from "../../dto/MoneyInflowDto"
import MoneyInflowClient from "../../client/MoneyInflowClient";

interface IProps {
    client: MoneyInflowClient;
}

const RegisterMoneyInflow = ({ client }: IProps) => {

    const onSubmit = async (data: MoneyInflowDto) => {
        await client.register(data);

        alert("Entrada de dinheiro registrada com sucesso!");
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