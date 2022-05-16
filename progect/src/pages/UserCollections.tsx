import React, { FC, useContext, useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import { Button, Navbar, Container, Card, Form, Row, Col } from "react-bootstrap";
import ListCollsections from '../components/ListCollsections';
import { NavLink, useNavigate } from "react-router-dom";
import { USER_COLLECTION } from "../utils/consts";



const UserCollection: FC = () => {
  const navigator=useNavigate()
  async function click() {
    navigator(USER_COLLECTION)
  }
  return (
    <div>
      <Container
        className="d-flex justify-content-center align-items-center mt-5"
      >
        <Card>
          <Card.Header>Мои коллекции</Card.Header>
          <Card.Body>
            <div className="form-group row">
              <div className="col">
                <input type="text" name="email" className="form-control" placeholder="Название коллекции" />
              </div>
              <Button className="mr-2" onClick={() => {click()}}>Создать коллекцию</Button>
            </div>
            <div className="form-group row">
              <Col>
              <ListCollsections/>
              <ListCollsections/>
              <ListCollsections/>
              </Col>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
export default observer(UserCollection);