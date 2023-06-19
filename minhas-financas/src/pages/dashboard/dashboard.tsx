import { Card, Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom";
import { MONEY_INFLOW_BASE_URL } from "../../routes/money-inflow-routes";
import { MONEY_OUTFLOW_BASE_ROUTE } from "../../routes/money-outflow-routes";
import MoneyInflowClient from "../../client/MoneyInflowClient";
import MoneyOutflowClient from "../../client/MoneyOutflowClient";
import { useEffect, useState } from "react";

interface IProps {
    moneyInflowClient: MoneyInflowClient,
    moneyOutflowClient: MoneyOutflowClient
}

const Dashboard = ({
    moneyInflowClient,
    moneyOutflowClient
}: IProps) => {
    const [moneyInflowTotal, setMoneyInflowTotal] = useState(0);
    const [moneyOutflowTotal, setMoneyOutflowTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const currentDate = new Date();

    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    useEffect(() => {
        setIsLoading(true);

        Promise.all([
            getTotalMoneyInflow(),
            getTotalMoneyOutflow()
        ])
            .catch(err => {
                alert("Falha ao obter o total de entradas/saídas de dinheiro...");
            })
            .finally(() => {
                setIsLoading(false);
            })
            ;
    }, []);

    const getTotalMoneyInflow = async () => {
        const total = await moneyInflowClient.getTotalByPeriod(currentMonth, currentYear);

        setMoneyInflowTotal(total);
    }

    const getTotalMoneyOutflow = async () => {
        const total = await moneyOutflowClient.getTotalByPeriod(currentMonth, currentYear);

        setMoneyOutflowTotal(total);
    }

    const numberFormat = new Intl.NumberFormat("pt-BR", { style: 'currency', currency: 'BRL' });

    return (
        <Container className="mt-5">
            <h1>Dashboard</h1>

            <section>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title>
                                    Entrada de dinheiro
                                </Card.Title>
                                <Card.Subtitle>
                                    Mês: {currentMonth}/{currentYear}
                                </Card.Subtitle>
                            </Card.Header>
                            <Card.Body>
                                {isLoading && 'Aguarde...'}
                                {!isLoading && <p className="m-0">
                                    Total: {numberFormat.format(moneyInflowTotal)}
                                </p>}
                            </Card.Body>
                            <Card.Footer
                                className="text-center"
                                as={Link}
                                to={`/${MONEY_INFLOW_BASE_URL}`}>
                                Acessar
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title>
                                    Saída de dinheiro
                                </Card.Title>
                                <Card.Subtitle>
                                    Mês: {currentMonth}/{currentYear}
                                </Card.Subtitle>
                            </Card.Header>
                            <Card.Body>
                                {isLoading && 'Aguarde...'}
                                {
                                    !isLoading &&
                                    <p className="m-0">
                                        Total: {numberFormat.format(moneyOutflowTotal)}
                                    </p>
                                }
                            </Card.Body>
                            <Card.Footer
                                className="text-center"
                                as={Link}
                                to={`/${MONEY_OUTFLOW_BASE_ROUTE}`}>
                                Acessar
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>



            </section>
        </Container>
    )
}

export default Dashboard;