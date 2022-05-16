import React, {useContext} from 'react';
import {Routes, Route} from 'react-router-dom'
import {adminRoutes, authRoutes, publicRoutes} from "../routes";
//import {SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";


const AppRouter = observer(() => {
    const {store} = useContext(Context)
    return (

    <Routes>
            {store.isAuth ===true && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}
            {store.isAuth ===true && adminRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}
    </Routes>
    );
});

export default AppRouter;