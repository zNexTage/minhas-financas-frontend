import { Container, Table } from "react-bootstrap"
import FixedExpenseClient from "../../client/FixedExpenseClient";
import { Link } from "react-router-dom";
import { FIXED_EXPENSE_BASE_URL } from "../../routes/fixed-expense-routes";
import { useEffect, useState } from "react";
import FixedExpense from "../../entities/FixedExpense";

interface IProps {
    client: FixedExpenseClient
}

const ListFixedExpense = ({ client }: IProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [fixedExpenses, setFixedExpenses] = useState<Array<FixedExpense>>([]);

    useEffect(() => {
        setIsLoading(true);

        try {
            getAll();
        }
        catch (err) {
            alert("Não foi possível obter os gastos fixos");
        }
        finally {
            setIsLoading(false);
        }
    }, []);

    const getAll = async () => {
        const response = await client.getAll();

        setFixedExpenses(response);
    }

    const numberFormat = new Intl.NumberFormat("pt-br", { style: "currency", currency: "BRL" });

    return (
        <Container className="mt-5">
            <h1>
                Gastos fixos
            </h1>
            <p>
                Um gasto fixo é uma despesa que você tem todo mês, como aluguel, conta de luz, conta de água...
            </p>
            <hr />
            <Link
                to={`/${FIXED_EXPENSE_BASE_URL}/Register`}
                className="btn btn-info text-white">
                Adicionar gasto fixo
            </Link>

            <Table striped bordered hover size="lg" className="mt-2">
                <thead>
                    <tr>
                        <th>
                            Descrição
                        </th>
                        <th>
                            Valor
                        </th>
                        <th>
                            Categoria
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {!isLoading &&
                        <>
                            {
                                fixedExpenses.length > 0 &&
                                fixedExpenses.map(fixedExpense => (
                                    <tr key={fixedExpense.id}>
                                        <td>{fixedExpense.description}</td>
                                        <td>{
                                            fixedExpense.value ?
                                                numberFormat.format(fixedExpense.value)
                                                :
                                                "-"
                                        }
                                        </td>
                                        <td>{fixedExpense.paymentCategory}</td>
                                    </tr>
                                ))
                            }
                            {fixedExpenses.length == 0 &&
                                <tr>
                                    <td
                                        className="text-center"
                                        colSpan={3}>
                                        Nenhum registro encontrado
                                    </td>
                                </tr>
                            }
                        </>
                    }
                    {isLoading && <tr>
                        <td
                            className="text-center"
                            colSpan={3}>
                            Aguarde
                        </td>
                    </tr>
                    }
                </tbody>
            </Table>
        </Container>
    )
}

export default ListFixedExpense;