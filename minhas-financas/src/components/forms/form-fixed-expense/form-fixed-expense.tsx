import { Alert, Button, Card, Form } from "react-bootstrap"
import { useForm } from "react-hook-form";
import FixedExpenseDto from "../../../dto/FixedExpenseDto";

interface IProps {
    onSubmit: (data: FixedExpenseDto) => Promise<void>
}

/**
 * A form to register a fixed expense
 * @param {IProps} 
 * @returns 
 */
const FormFixedExpense = ({ onSubmit }: IProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<FixedExpenseDto>();

    const processSubmit = async (data: FixedExpenseDto): Promise<void> => {
        await onSubmit(data);

        reset();
    }


    return (
        <Card>
            <Card.Header>
                <Card.Title>
                    Preencha os campos para realizar o registro de um gasto fixo
                </Card.Title>
            </Card.Header>
            <Card.Body>
                <p>
                    Um gasto fixo é uma despesa que você tem todo mês, como aluguel, conta de luz, conta de água... Os gastos registrados aqui irão aparecer todos os meses na sua <b>lista de saídas</b>, onde você poderá registrar quando efetuou o pagamento dessas dívidas.
                </p>
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
                            placeholder="Aluguel"
                            id="txtDescription"
                        />

                        {
                            errors.description &&
                            <Alert>
                                {errors.description.message}
                            </Alert>
                        }
                    </div>

                    <div>
                        <Form.Label
                            htmlFor="txtValue">
                            (Opcional) - Valor
                        </Form.Label>
                        <Form.Control
                            {...register("value", {
                                valueAsNumber: true
                            })}
                            placeholder="(Opcional) Informe um valor"
                            type="number"
                            id="txtValue"
                        />
                        <Form.Text className="text-muted">
                            Informe apenas se o valor for fixo, por exemplo: o valor do aluguel. Gastos que o valor tendem a mudar em cada mês, como contas, não há necessidade de registrar o valor aqui.
                        </Form.Text>

                        {
                            errors.value &&
                            <Alert>
                                {errors.value.message}
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
                                    message: "Escolha a categoria do gasto",
                                    value: true
                                },
                            })}
                        >
                            <option value="Boleto">Boleto</option>
                            <option value="Transporte">Transporte</option>
                            <option value="Alimentação">Alimentação</option>
                            <option value="Outros">Outros</option>
                        </Form.Select>

                        {
                            errors.paymentCategory &&
                            <Alert>
                                {errors.paymentCategory.message}
                            </Alert>
                        }
                    </div>

                    <Button type="submit" className="mt-2">
                        Salvar
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default FormFixedExpense;