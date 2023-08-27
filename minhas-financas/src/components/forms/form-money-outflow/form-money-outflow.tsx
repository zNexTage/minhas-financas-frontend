import { Alert, Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import MoneyOutflowDto from "../../../dto/MoneyOutflowDto";

interface IProps {
    onSubmit: (moneyOutflow: MoneyOutflowDto) => Promise<void>;
    defaultValues?: MoneyOutflowDto;
}

const FormMoneyOutflow = ({ onSubmit, defaultValues }: IProps) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<MoneyOutflowDto>({
        defaultValues: {
            description: defaultValues?.description,
            date: defaultValues?.date,
            paymentCategory: defaultValues?.paymentCategory,
            paymentLocation: defaultValues?.paymentLocation,
            paymentMethod: defaultValues?.paymentMethod,
            quantity: defaultValues?.quantity,
            value: defaultValues?.value
        }
    });

    const processSubmit = async (formData: MoneyOutflowDto) => {
        await onSubmit(formData);

        reset();
    }

    return (
        <Card>
            <Card.Header>
                <b>Preencha os campos para registrar um gasto</b>
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
                            placeholder="Descreva com o que esse dinheiro foi gasto"
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
                                    message: "Informe o valor gasto",
                                    value: true
                                }
                            })}
                            placeholder="Quanto foi gasto?"
                            id="txtValue"
                            type="number"
                            step={"any"}
                        />
                        {errors.value &&
                            <Alert className="mt-2" variant="danger">
                                {errors.value.message}
                            </Alert>
                        }
                    </div>

                    <div>
                        <Form.Label
                            htmlFor="txtQuantity">
                            Quantidade
                        </Form.Label>
                        <Form.Control
                            {...register("quantity", {
                                required: {
                                    message: "Informe a quantidade",
                                    value: true
                                },
                                valueAsNumber: true
                            })}
                            placeholder="Qual foi quantidade de itens comprados?"
                            id="txtQuantity"
                            type="number"
                        />
                        {errors.quantity &&
                            <Alert className="mt-2" variant="danger">
                                {errors.quantity.message}
                            </Alert>
                        }
                    </div>

                    <div>
                        <Form.Label
                            htmlFor="cboPaymentMethod">
                            Método de pagamento
                        </Form.Label>
                        <Form.Select
                            id="cboPaymentMethod"
                            {...register("paymentMethod", {
                                required: {
                                    message: "Informe qual foi o método de pagamento",
                                    value: true
                                },
                            })}
                        >
                            <option value="Débito">Débito</option>
                            <option value="Crédito">Crédito</option>
                            <option value="Pix">Pix</option>
                            <option value="Dinheiro">Dinheiro</option>
                        </Form.Select>

                        {errors.paymentMethod &&
                            <Alert className="mt-2" variant="danger">
                                {errors.paymentMethod.message}
                            </Alert>
                        }
                    </div>

                    <div>
                        <Form.Label
                            htmlFor="txtLocation">
                            Local do pagamento
                        </Form.Label>
                        <Form.Control
                            {...register("paymentLocation", {
                                required: {
                                    message: "Informe onde o pagamento foi realizado",
                                    value: true
                                },
                                maxLength: {
                                    message: "O método de pagamento deve ter 20 caracteres",
                                    value: 20
                                }
                            })}
                            placeholder="Em que local a compra foi realizada?"
                            id="txtLocation"
                        />

                        {errors.paymentLocation &&
                            <Alert className="mt-2" variant="danger">
                                {errors.paymentLocation.message}
                            </Alert>
                        }
                    </div>

                    <div>
                        <Form.Label
                            htmlFor="cboCategory">
                            Categoria
                        </Form.Label>
                        <Form.Select id="cboCategory"
                            {...register("paymentCategory", {
                                required: {
                                    message: "Escolha a categoria do pagamento",
                                    value: true
                                },
                            })}
                        >
                            <option value="Boleto">Boleto</option>
                            <option value="Transporte">Transporte</option>
                            <option value="Alimentação">Alimentação</option>
                            <option value="Outros">Outros</option>
                        </Form.Select>

                        {errors.paymentCategory &&
                            <Alert className="mt-2" variant="danger">
                                {errors.paymentCategory.message}
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
                                    message: "Informe a data do gasto",
                                    value: true
                                }
                            })}
                            placeholder="Quando que o gasto foi realizado?"
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

export default FormMoneyOutflow;