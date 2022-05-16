import React, {FC, useContext, useEffect, useState} from 'react';
import { Button, Card,  Row, Col } from "react-bootstrap";
import {  useNavigate } from "react-router-dom";
import { USER_COLLECTION } from "../utils/consts";
import {observer} from "mobx-react-lite";

const ListCollsections : FC = () =>{
  const navigator=useNavigate()
  async function click() {
    navigator(USER_COLLECTION)
  }
  return (
    <Card className='mt-2'>
                <Card.Body>
                  <Row className='align-items-center'>
                    <Col>
                      Название
                    </Col>
                    <Col className='col-sm-4'>
                      Предметов: 20
                    </Col>
                    <Col>
                      <Button className="mr-2 btn-primary" onClick={() => {click()}}>Открыть</Button>
                    </Col>
                    <Col>
                      <Button className="mr-2 btn-danger">удалить</Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
  );
}
export default observer(ListCollsections);