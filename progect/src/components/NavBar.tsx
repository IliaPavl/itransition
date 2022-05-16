import React, { FC, useContext, useState } from 'react';
import { Context } from "../index";
import Nav from "react-bootstrap/Nav";
import { NavLink, useNavigate } from "react-router-dom";
import {
    HOME_PAGE,
    LOGIN_ROUTE,
    MESSENGER,
    USER_LIST,
    PROFILE_ROUTE,
    USER_COLLECTIONS,
    SEARCH_ROUTE
} from "../utils/consts";
import { Button, Navbar, Container, Col, FormControl, Row, NavbarBrand } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';

const NavBar: FC = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate()
    const [search, setSearch] = useState<string>('')
    const clickSearch = async () => {
        navigate(SEARCH_ROUTE)
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavbarBrand style={{ color: 'white' }} href={HOME_PAGE}>Home</NavbarBrand>
                <Row>
                    <Col>
                        <FormControl type='text' placeholder="Найти" onChange={e => setSearch(e.target.value)} />
                    </Col>
                    <Col>
                        <Button
                            variant={"outline-light"}
                            onChange={() => clickSearch()}>
                            Search
                        </Button>
                    </Col>
                </Row>
                <NavbarCollapse>
                    {store.isAuth ?
                        <Nav className="ml-auto" style={{ color: 'white' }}>
                            {store.isAdmin ?
                                <Button
                                    variant={"outline-light"}
                                    onClick={() => navigate(USER_LIST)}>
                                    Users list
                                </Button>
                                :
                                <div></div>
                            }
                            <Button
                                variant={"outline-light"}
                                onClick={() => navigate(MESSENGER)}
                                className="ml-2">
                                Messenger
                            </Button>

                            <Button
                                variant={"outline-light"}
                                onClick={() => navigate(PROFILE_ROUTE)}
                                className="ml-2">
                                Profile
                            </Button>

                            <Button
                                variant={"outline-light"}
                                onClick={() => navigate(USER_COLLECTIONS)}
                                className="ml-2">
                                UserCollection
                            </Button>

                            <Button
                                variant={"outline-light"}
                                onClick={() => store.logout()}
                                className="ml-2"
                            >Logout
                            </Button>
                        </Nav>
                        :

                        <Nav className="ml-auto" style={{ color: 'white' }}>
                            <Button variant={"outline-light"} onClick={() => navigate(LOGIN_ROUTE)}>Login</Button>
                        </Nav>
                    }

                </NavbarCollapse>
            </Container>


        </Navbar>

    );
};

export default observer(NavBar);
