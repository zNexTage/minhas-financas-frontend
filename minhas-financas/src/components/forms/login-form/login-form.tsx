import { Alert, Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import UserLogin from "../../../entities/UserLogin";
import { useState } from "react";

interface IProps {
    onSubmit: (data: UserLogin) => Promise<void>;
}

const LoginForm = ({ onSubmit }: IProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<UserLogin>();

    const processSubmit = async (data:UserLogin) => {
        setIsLoading(true);

        await onSubmit(data);

        setIsLoading(false);
    }

    return (
        <Card>
            <Card.Header>
                Preencha os campos para se autenticar
            </Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit(processSubmit)}>
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

                    <Button disabled={isLoading} type="submit" className="mt-2">
                        {!isLoading ? "Acessar" : "Aguarde..."}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default LoginForm;