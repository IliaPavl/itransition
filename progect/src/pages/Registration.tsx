import React, { FC, useContext, useState } from 'react';
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { Button, Container, Card, Form, Row } from "react-bootstrap";
import { LOGIN_ROUTE,HOME_PAGE } from "../utils/consts";
import { NavLink, useNavigate } from "react-router-dom";



const Registration: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [login, setLogin] = useState<string>('')
    const navigate = useNavigate ()

    const { store } = useContext(Context);
    const click = async () => {
        store.registration(email, password, login)
        navigate(HOME_PAGE)
    }
    return (

        <Container
            className="d-flex justify-content-center align-items-center mt-5"
        >
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto"> Login </h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                    className="mt-3"
                    placeholder="Enter your name..."
                    value={login}
                    onChange={e => setLogin(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter your email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter your Password..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">

                        <div>
                            <NavLink  to={LOGIN_ROUTE}>Login</NavLink>
                        </div>

                        <Button
                            variant={"outline-success"}
                            onClick={() => click()}
                        >
                            Registration
                        </Button>
                    </Row>

                </Form>
            </Card>
        </Container>
    );
};

export default observer(Registration);
