import { Container } from "react-bootstrap";
import FormMoneyOutflow from "../../components/forms/form-money-outflow";
import MoneyOutflowClient from "../../client/MoneyOutflowClient";

interface IProps {
    client: MoneyOutflowClient
}

const RegisterMoneyOutflow = ({ client }: IProps) => {

    const onSubmit = async (moneyOutflow: MoneyOutflowDto) => {
        try{
            debugger
            await client.register(
                moneyOutflow
            );
            alert("Saída de dinheiro registrado com sucesso!");
        }
        catch(err){
            alert("Não possível realizar o registro da saída");
        }
    }

    return (
        <Container>
            <FormMoneyOutflow
                onSubmit={onSubmit}
            />
        </Container>
    )
}

export default RegisterMoneyOutflow;