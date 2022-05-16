import React, { FC, useContext, useEffect, useState } from 'react';
import { Context } from "../index";
import UserService from "../services/UserService";
import { IUser } from "../models/IUser";
import { observer } from "mobx-react-lite";
import { Button, Container, Table, FormCheck, Form, Col, Row } from "react-bootstrap";



const UserListPage: FC = () => {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);
  const [search, setSearch] = useState<string>('')

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
    uncheck()
  }

  let massiv: any[] = [];
  const heandlChenge = (e: { target: { id: any; }; }) => (
    massiv.includes(e.target.id) ?
      massiv.splice(massiv.indexOf(e.target.id), massiv.indexOf(e.target.id) + 1)
      :
      massiv.push(e.target.id)
    ,
    console.log(massiv)
  );

  const del = async () => {
    const response = await UserService.deliteUser(massiv);
    setUsers(response.data);
    uncheck()
  }

  const clickSearch = async () => {
    const response = await UserService.searcUsers(search);
    setUsers(response.data);
    uncheck()
  }

  const changeActive = async () => {
    await UserService.changeBlock(massiv);
    const response = await UserService.fetchUsers();
    setUsers(response.data);
    uncheck()
  }

  const changeRole = async () => {
    await UserService.roleChange(massiv);
    const response = await UserService.fetchUsers();
    setUsers(response.data);
    console.log(massiv)
    uncheck()
  }

  function uncheck() {
    var uncheck = document.getElementsByTagName('input');
    for (var i = 0; i < uncheck.length; i++) {
      if (uncheck[i].type == 'checkbox') {
        uncheck[i].checked = false;
      }
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  function isActive(isBanned: boolean) {
    let str;
    isBanned ? str = "true" : str = "false"
    return str;
  }

  return (

    <Container
      className=" justify-content-center"
      style={{ height: window.innerHeight - 54 }}>

      <Col className='mt-3'>
        <Row>
          <Row>
            <Col>
              <Form.Control type='text' placeholder="Найти" onChange={e => setSearch(e.target.value)} />
            </Col>
            <Col>
              <Button
                variant={"success"}
                onClick={() => clickSearch()}>
                Search
              </Button>
            </Col>
          </Row>
          <Button className="m-1" onClick={() => getUsers()}>refresh</Button>
          <Button className="m-1" onClick={() => del()}>delite</Button>
          <Button className="m-1" onClick={() => changeActive()}>BAN</Button>
          <Button className="m-1" onClick={() => changeRole()}>changeRole</Button>
        </Row>
        <Row>
          <Table className="table table-bordered table-hover mt-2">
            <thead className="thead-dark">
              <tr>
                <th >#</th>
                <th >id</th>
                <th>Login</th>
                <th>Email</th>
                <th>Role</th>
                <th >isBanned</th>
              </tr>
            </thead>
            <tbody className="table-light">
              {users.map(user =>

                <tr key={user.id}>
                  <td><FormCheck
                    name='users'
                    className="ml-4"
                    type='checkbox'
                    id={user.id}
                    onChange={heandlChenge}
                  /></td>
                  <td>{user.id}</td>
                  <td>{user.login}</td>
                  <td>{user.email}</td>
                  <td>{user.role_id}</td>
                  <td>{isActive(user.isBanned)}</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Row>
      </Col>
    </Container>
  );
};
export default observer(UserListPage);


