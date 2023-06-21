import { useEffect, useState } from "react"
import { Container, Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import MoneyInflow from "../../entities/MoneyInflow";
import MoneyInflowClient from "../../client/MoneyInflowClient";

interface IProps {
    client: MoneyInflowClient;
}

const ListMoneyInflow = ({ client }: IProps) => {
    const [moneyInflows, setMoneyInflows] = useState<Array<MoneyInflow>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getAllMoneyInflows();
    }, []);

    const getAllMoneyInflows = async () => {
        setIsLoading(true);

        try {
            const response = await client.getAll();

            setMoneyInflows(response);
        }
        catch (err) {
            //TODO: Handle exception
        }
        finally {
            setIsLoading(false);
        }
    }

    const calcTotalMoneyInflows = (moneyInflows: Array<MoneyInflow>) => {
        const total = moneyInflows.reduce<number>((previousValue, currentValue: MoneyInflow) => previousValue + currentValue.value, 0);
        const nFormat = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

        return nFormat.format(total);
    }

    return (
        <Container className="mt-5">
            <h1>
                Entrada de dinheiro
            </h1>
            <Link to={"/MoneyInflow/Register"} className="btn btn-info text-white">
                Adicionar entrada
            </Link>
            <Table striped bordered hover size="lg" className="mt-2">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Descrição</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !isLoading &&
                        <>
                            {
                                moneyInflows.length > 0 &&
                                <>
                                    {moneyInflows.map(moneyInflow => (
                                        <tr key={moneyInflow.id}>
                                            <td>
                                                {moneyInflow.date.toLocaleDateString()}
                                            </td>
                                            <td>
                                                {moneyInflow.description}
                                            </td>
                                            <td>
                                                {moneyInflow.getFormatedValue()}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td className="text-end" colSpan={3}>
                                            Total  {calcTotalMoneyInflows(moneyInflows)}
                                        </td>
                                    </tr>
                                </>
                            }
                            {moneyInflows.length == 0 && (
                                <tr>
                                    <td className="text-center" colSpan={3}>
                                        Nenhum registro encontrado
                                    </td>
                                </tr>
                            )
                            }
                        </>
                    }
                    {isLoading && <tr>
                        <td className="text-center" colSpan={3}>
                            Nenhum registro encontrado
                        </td>
                    </tr>
                    }
                </tbody>
            </Table>
        </Container>
    )
}

export default ListMoneyInflow;