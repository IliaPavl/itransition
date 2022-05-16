import React, { FC, useContext, useEffect, useState } from 'react';
import { Context } from "./index";
import { observer } from "mobx-react-lite";
import { IUser } from "./models/IUser";
import { Spinner } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";



import AppRouter from "./components/AppRouter";



const App: FC = () => {
    const { store } = useContext(Context);
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        console.log("APP:  " + localStorage.getItem('token'))

        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

    if (store.isLoading) {
        return <Spinner animation={"grow"} />
    }

    if (!store.isAuth) {
        return (
            <div>
                <BrowserRouter>
                    <NavBar />
                    <AppRouter />
                </BrowserRouter>
            </div>
        );
    }

    return (
        <BrowserRouter>
            <NavBar />
            <div>
                <h1>{store.user.isBanned ? 'Аккаунт заблокирован' : ''}</h1>
            </div>
            <AppRouter />
        </BrowserRouter>
    );

};

export default observer(App);
