import { Container } from "react-bootstrap"
import FormMoneyOutflow from "../../components/forms/form-money-outflow"
import MoneyOutflow from "../../entities/MoneyOutflow"
import axios from "axios"

const RegisterMoneyOutflow = () => {

    const onSubmit = async (moneyOutflow: MoneyOutflow) => {
        debugger;
        
        const response = await axios.post("http://localhost:5132/MoneyOutflow/Register",
         moneyOutflow, 
         {
            headers: {

            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjQ4NmI1NTViLTQ1OWUtNDFmNS1iMTA0LTU3NTA3NjM3ODA0MSIsImV4cCI6MTY4NjUwNzU0OX0.YC0c1MGqjSiO2Xn1POHfTHNGk2nbtp5Rs7ZlZ4kesUY"
         }}
         );

         console.log(response);
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