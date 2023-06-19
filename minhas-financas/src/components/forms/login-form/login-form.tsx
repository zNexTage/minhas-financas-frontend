import { Alert, Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import UserLogin from "../../../entities/UserLogin";

interface IProps {
    onSubmit: (data: UserLogin) => Promise<void>;
}

const LoginForm = ({ onSubmit }: IProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<UserLogin>();

    return (
        <Card>
            <Card.Header>
                Preencha os campos para se autenticar
            </Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Form.Label>
                            Nome de usuário
                        </Form.Label>
                        <Form.Control
                            {...register("username", {
                                required: {
                                    message: "Informe o seu nome de usuário",
                                    value: true
                                }
                            })}
                        />

                        {errors.username && <Alert>
                            {errors.username.message}
                        </Alert>
                        }
                    </div>

                    <div>
                        <Form.Label>
                            Senha
                        </Form.Label>
                        <Form.Control
                            type="password"
                            {...register("password", {
                                required: {
                                    message: "Informe a sua senha",
                                    value: true
                                }
                            })}
                        />

                        {errors.password && <Alert>
                            {errors.password.message}
                        </Alert>
                        }
                    </div>

                    <Button type="submit" className="mt-2">
                        Acessar
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default LoginForm;