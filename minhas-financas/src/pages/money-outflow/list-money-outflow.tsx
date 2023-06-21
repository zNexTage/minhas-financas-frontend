import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import MoneyOutflow from "../../entities/MoneyOutflow";
import MoneyOutflowClient from "../../client/MoneyOutflowClient";
import { Link } from "react-router-dom";

interface IProps {
    client: MoneyOutflowClient;
}

const ListMoneyOutflow = ({ client }: IProps) => {
    const [moneyOutflows, setMoneyOutflows] = useState<Array<MoneyOutflow>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getMoneyOutflows();
    }, []);

    const getMoneyOutflows = async () => {
        setIsLoading(true);

        try {
            const moneyOutflows = await client.getAll();

            setMoneyOutflows(moneyOutflows);
        }
        catch (err) {
            //TODO: Handle exception!!
        }
        finally {
            setIsLoading(false);
        }
    }

    const calcTotalMoneyOutflows = (moneyInflows: Array<MoneyOutflow>) => {
        const total = moneyInflows.reduce<number>((previousValue, currentValue: MoneyOutflow) => previousValue + currentValue.value, 0);
        const nFormat = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

        return nFormat.format(total);
    }

    return (
        <Container className="mt-5">
            <h1>
                Saída de dinheiro
            </h1>
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
        </Container>
    );
}

export default ListMoneyOutflow;