import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import MoneyOutflow from "../../entities/MoneyOutflow";
import MoneyOutflowClient from "../../client/MoneyOutflowClient";
import { Link } from "react-router-dom";
import MoneyOutflowChart from "../../components/charts/money-outflow-chart";
import MoneyOutflowDto from "../../dto/MoneyOutflowDto";
import dayjs from "dayjs";

dayjs.locale("pt-br");
import "dayjs/locale/pt-br";
import FixedExpenseTable from "../../components/tables/fixed-expense-table";
import FixedExpense from "../../entities/FixedExpense";
import FixedExpenseClient from "../../client/FixedExpenseClient";

interface IProps {
    outflowClient: MoneyOutflowClient;
    fixedExpenseClient: FixedExpenseClient;
}

const ListMoneyOutflow = ({ outflowClient, fixedExpenseClient }: IProps) => {
    const [moneyOutflows, setMoneyOutflows] = useState<Array<MoneyOutflow>>([]);
    const [fixedExpenses, setFixedExpenses] = useState<Array<FixedExpense>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);

        Promise.all([
            getMoneyOutflows(),
            getFixedExpenses()
        ])
            .catch(err => {
                alert("Não foi possível obter as saídas e os gastos fixos");
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, []);

    const getMoneyOutflows = async () => {

        try {
            const moneyOutflows = await outflowClient.getAll();

            setMoneyOutflows(moneyOutflows);
        }
        catch (err) {
            //TODO: Handle exception!!
        }

    }

    const getFixedExpenses = async () => {
        try {
            const fixedExpensives = await fixedExpenseClient.getAll();

            setFixedExpenses(fixedExpensives);
        }
        catch (err) {
            //TODO: Handle exception!!
        }
    }

    const calcTotalMoneyOutflows = (moneyInflows: Array<MoneyOutflow>) => {
        const total = moneyInflows.reduce<number>((previousValue, currentValue: MoneyOutflow) => previousValue + (currentValue.value * currentValue.quantity), 0);
        const nFormat = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

        return nFormat.format(total);
    }

    const confirmPaymentFixedExpense = async (fixedId: number) => {
        const fixedExpense = fixedExpenses.find(fixed => fixed.id == fixedId)!;

        const outflowDto = new MoneyOutflowDto(
            fixedExpense.description,
            fixedExpense.value!,
            0,
            "Débito",
            "Nubank",
            fixedExpense.paymentCategory,
            dayjs().format("YYYY-MM-DD"),
        )
        try {
            const moneyOutflow = await outflowClient.register(outflowDto)

            setMoneyOutflows([...moneyOutflows, moneyOutflow]);
        }
        catch (err) {
            alert("Não foi possível confirmar o pagamento do gasto fixo.");
        }
    }

    return (
        <Container className="mt-5">
            <div className="d-flex justify-content-between">
                <h1>
                    Saída de dinheiro
                </h1>
                <h1>
                    {dayjs().format("MM/YYYY")}
                </h1>
            </div>

            <Link to={"/MoneyOutflow/Register"} className="btn btn-info text-white">
                Adicionar saída
            </Link>

            <Table striped bordered hover size="lg" className="mt-2">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Descrição</th>
                        <th>Valor</th>
                        <th>Quantidade</th>
                        <th>Forma de pagamento</th>
                        <th>Local do pagamento</th>
                        <th>Categoria</th>
                        <th>Valor total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !isLoading &&
                        <>
                            {
                                moneyOutflows.length > 0 &&
                                <>
                                    {
                                        moneyOutflows.map(moneyOutflow => (
                                            <tr key={moneyOutflow.id}>
                                                <td>
                                                    {moneyOutflow.date.toLocaleDateString()}
                                                </td>
                                                <td>
                                                    {moneyOutflow.description}
                                                </td>
                                                <td>
                                                    {moneyOutflow.getFormatedValue()}
                                                </td>
                                                <td>
                                                    {moneyOutflow.quantity}
                                                </td>
                                                <td>
                                                    {moneyOutflow.paymentMethod}
                                                </td>
                                                <td>
                                                    {moneyOutflow.paymentLocation}
                                                </td>
                                                <td>
                                                    {moneyOutflow.paymentCategory}
                                                </td>
                                                <td>
                                                    {moneyOutflow.getFormatedTotal()}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    <tr>
                                        <td colSpan={8} className="text-end">
                                            Total -{calcTotalMoneyOutflows(moneyOutflows)}
                                        </td>
                                    </tr>
                                </>
                            }
                            {moneyOutflows.length == 0 && (
                                <tr>
                                    <td className="text-center" colSpan={8}>
                                        Nenhum registro encontrado
                                    </td>
                                </tr>
                            )
                            }
                        </>
                    }
                    {isLoading && <tr>
                        <td className="text-center" colSpan={8}>
                            Aguarde...
                        </td>
                    </tr>
                    }
                </tbody>
            </Table>

            <FixedExpenseTable
                fixedExpenses={fixedExpenses}
                isLoading={isLoading}
                newColumns={[
                    {
                        columnName: "Confirmar",
                        columnElement: (fixedExpense) => <Button
                            variant="info"
                            className="w-100 text-light"
                            onClick={() => confirmPaymentFixedExpense(fixedExpense.id)}>
                            Confirmar
                        </Button>
                    }
                ]}
            />

            {(!isLoading && moneyOutflows.length > 0) &&
                <div className="p-5 m-auto" style={{ maxWidth: 600 }}>
                    <MoneyOutflowChart moneyOutflows={moneyOutflows} />
                </div>
            }
        </Container>
    );
}

export default ListMoneyOutflow;