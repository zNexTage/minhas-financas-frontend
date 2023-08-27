import { Modal } from "react-bootstrap";
import MoneyOutflowDto from "../../../dto/MoneyOutflowDto";
import FixedExpense from "../../../entities/FixedExpense";
import FormMoneyOutflow from "../../forms/form-money-outflow";
import dayjs from "dayjs";
dayjs.locale("pt-br");

interface IProps {
    fixedExpense: FixedExpense | null,
    isOpen: boolean,
    onSubmit: (moneyOutflowDto: MoneyOutflowDto) => Promise<void>
}

/**
 * A modal with MoneyOutflowForm
 * @param  
 * @returns 
 */
const MoneyOutflowModal = ({ fixedExpense, isOpen, onSubmit }: IProps) => {    

    return (
        <Modal show={isOpen} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Confirmar gasto</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <FormMoneyOutflow 
                onSubmit={onSubmit} 
                defaultValues={{
                    description: fixedExpense?.description || "",
                    paymentCategory: fixedExpense?.paymentCategory || "",
                    value: fixedExpense?.value || 0,
                    date: dayjs().format("DD/MM/YYYY"),
                    paymentLocation: "",
                    paymentMethod: "",
                    quantity: 0
                }} />
            </Modal.Body>

        </Modal>
    )
}

export default MoneyOutflowModal;