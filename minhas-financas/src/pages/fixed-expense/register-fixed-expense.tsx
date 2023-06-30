import { Container } from "react-bootstrap";
import FormFixedExpense from "../../components/forms/form-fixed-expense";
import FixedExpenseDto from "../../dto/FixedExpenseDto";
import FixedExpenseClient from "../../client/FixedExpenseClient";

interface IProps {
    client: FixedExpenseClient
}

const RegisterFixedExpense = ({ client }: IProps) => {
    const onSubmit = async (data: FixedExpenseDto): Promise<void> => {
        debugger
        await client.register(data);

        alert("Gasto fixo registrado com sucesso");
    }

    return (
        <Container className="mt-5">
            <h1>
                Gasto fixo | Registro
            </h1>

            <FormFixedExpense onSubmit={onSubmit} />
        </Container>
    )
}

export default RegisterFixedExpense;