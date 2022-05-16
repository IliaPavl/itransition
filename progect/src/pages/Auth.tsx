import React, {FC, useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import LoginForm from "../components/LoginForm";
import {observer} from "mobx-react-lite";
import NavBar from "../components/NavBar";
import {BrowserRouter} from "react-router-dom";


const Auth : FC = () =>{
  return (
   <div>
    <LoginForm/>
   </div>
  );
}
export default observer(Auth);