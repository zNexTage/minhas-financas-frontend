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

    useEffect(() => {
        getAllMoneyInflows();
    }, []);

    const getAllMoneyInflows = async () => {
        const response = await client.getAll();

        setMoneyInflows(response);
    }

    return (
        <Container className="mt-5">
            <h1>
                Entrada de dinheiro
            </h1>
            <Link to={"/MoneyOutflow/Register"} className="btn btn-info text-white">
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
                        moneyInflows.map(moneyInflow => (
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
                        ))
                    }
                </tbody>
            </Table>
        </Container>
    )
}

export default ListMoneyInflow;