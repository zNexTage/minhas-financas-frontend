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

    useEffect(() => {
        getMoneyOutflows();
    }, []);

    const getMoneyOutflows = async () => {
        const moneyOutflows = await client.getAll();

        setMoneyOutflows(moneyOutflows);
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
                </tbody>
            </Table>
        </Container>
    );
}

export default ListMoneyOutflow;