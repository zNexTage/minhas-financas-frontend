import { Alert, Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import MoneyInflowDto from "../../../dto/MoneyInflowDto";

interface IProps {
    onSubmit: (data: MoneyInflowDto) => Promise<void>;
}

const FormMoneyInflow = ({ onSubmit }: IProps) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<MoneyInflowDto>();

    const processSubmit = async (dto: MoneyInflowDto) => {
        await onSubmit(dto);

        reset();
    }

    return (
        <Card>
            <Card.Header>
                <b>Preencha os campos para registrar um recebimento</b>
            </Card.Header>

            <Card.Body>
                <Form onSubmit={handleSubmit(processSubmit)}>
                    <div>
                        <Form.Label
                            htmlFor="txtDescription">
                            Descrição
                        </Form.Label>
                        <Form.Control
                            {...register("description", {
                                required: {
                                    message: "Informe a descrição",
                                    value: true
                                },
                                maxLength: {
                                    message: "A descrição deve ter no máximo 100 caracteres",
                                    value: 100
                                }
                            })}
                            placeholder="Descreva quem lhe enviou esse dinheiro"
                            id="txtDescription"
                        />
                        {errors.description &&
                            <Alert className="mt-2" variant="danger">
                                {errors.description.message}
                            </Alert>
                        }
                    </div>

                    <div>
                        <Form.Label
                            htmlFor="txtValue">
                            Valor
                        </Form.Label>
                        <Form.Control
                            {...register("value", {
                                valueAsNumber: true,
                                required: {
                                    message: "Informe o valor recebido",
                                    value: true
                                }
                            })}
                            placeholder="Qual o valor recebido?"
                            id="txtValue"
                            type="number"
                        />
                        {errors.value &&
                            <Alert className="mt-2" variant="danger">
                                {errors.value.message}
                            </Alert>
                        }
                    </div>

                    <div>
                        <Form.Label
                            htmlFor="txtDate">
                            Data
                        </Form.Label>
                        <Form.Control
                            {...register("date", {
                                required: {
                                    message: "Informe a data do recebimento",
                                    value: true
                                }
                            })}
                            placeholder="Quando que você recebeu?"
                            id="txtDate"
                            type="date"
                        />
                        {errors.date &&
                            <Alert className="mt-2" variant="danger">
                                {errors.date.message}
                            </Alert>
                        }
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        className="mt-2"
                        size="lg">
                        Enviar
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default FormMoneyInflow;