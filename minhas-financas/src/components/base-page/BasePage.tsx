import { Container, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

const BasePage = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="MoneyOutflow">
                        Minhas Finanças
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <Outlet />
        </>
    )
}

export default BasePage;