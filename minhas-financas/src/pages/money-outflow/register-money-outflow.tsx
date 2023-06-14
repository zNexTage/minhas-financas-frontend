import { Container } from "react-bootstrap"
import FormMoneyOutflow from "../../components/forms/form-money-outflow"
import MoneyOutflow from "../../entities/MoneyOutflow"
import axios from "axios"

const RegisterMoneyOutflow = () => {

    const onSubmit = async (moneyOutflow: MoneyOutflow) => {        
        const response = await axios.post("http://localhost:5132/MoneyOutflow/Register",
         moneyOutflow, 
         {
            headers: {
            "Authorization": "Bearer SET_TOKEN_HERE"
         }}
         );

        alert("Saída de dinheiro registrado com sucesso!");
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