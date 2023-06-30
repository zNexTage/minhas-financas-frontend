import { Alert, Card, Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom";
import { MONEY_INFLOW_BASE_URL } from "../../routes/money-inflow-routes";
import { MONEY_OUTFLOW_BASE_ROUTE } from "../../routes/money-outflow-routes";
import MoneyInflowClient from "../../client/MoneyInflowClient";
import MoneyOutflowClient from "../../client/MoneyOutflowClient";
import { useEffect, useState } from "react";
import { FIXED_EXPENSE_BASE_URL } from "../../routes/fixed-expense-routes";

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

    const balance = moneyInflowTotal - moneyOutflowTotal;

    const profiting = balance > 0;

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
                            <Card.Footer className="text-center">
                                <Link className="btn btn-link" to={`/${MONEY_INFLOW_BASE_URL}`}>
                                    Acessar
                                </Link>
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
                                className="d-flex justify-content-around"
                            >
                                <Link className="btn btn-link" to={`/${MONEY_OUTFLOW_BASE_ROUTE}`}>
                                    Acessar
                                </Link>

                                <Link className="btn btn-link" to={`/${MONEY_OUTFLOW_BASE_ROUTE}/Register`}>
                                    Registrar nova saída
                                </Link>

                                <Link className="btn btn-link" to={`/${FIXED_EXPENSE_BASE_URL}/Register`}>
                                    Registrar gasto fixo
                                </Link>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>

                {balance != 0 && <Alert className="mt-3" variant={`${profiting ? "success" : "danger"}`}>
                    {profiting ? "Lucro" : "Prejuízo"} de {numberFormat.format(balance)}
                </Alert>
                }

            </section>
        </Container>
    )
}

export default Dashboard;