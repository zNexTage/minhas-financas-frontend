import { Container } from "react-bootstrap";
import FormFixedExpense from "../../components/forms/form-fixed-expense";
import FixedExpenseDto from "../../dto/FixedExpenseDto";

const RegisterFixedExpense = () => {
    const onSubmit = (data: FixedExpenseDto): Promise<void> => {
        throw new Error("Not implemented");
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