import { Card, Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom";
import { MONEY_INFLOW_BASE_URL } from "../../routes/money-inflow-routes";
import { MONEY_OUTFLOW_BASE_ROUTE } from "../../routes/money-outflow-routes";

const Dashboard = () => {
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
                            </Card.Header>
                            <Card.Body>
                                <p className="m-0">
                                    Total: R$ XXXX
                                </p>
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
                            </Card.Header>
                            <Card.Body>
                                <p className="m-0">
                                    Total: R$ XXXX
                                </p>
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