import React, { FC, useContext, useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import { Button, Container, Table, FormCheck, Card } from "react-bootstrap";


const Profile: FC = () => {
  return (
    <Container
      className=" justify-content-center"
      style={{ height: window.innerHeight - 54 }}>
      <Card>
        <Card.Header> Редактирование пользователя</Card.Header>
        <Card.Body>
          <div className="form-group row">
            <div className="card ml-5 mt-2" >
              <img src="/img/${filename}" className="card-img-top" alt="Картинка профиля" />
              <div className="card-body">
                <div className="custom-file">
                  <input type="file" name="file" id="customFile" />
                  
                </div>
              </div>
            </div>
          </div>
          <div className="form-group row ml-2">
            <label className="col-sm-2 col-form-label">Password:</label>
            <div className="col-sm-6">
              <input type="password" name="password" className="form-control" placeholder="Новый пароль" />
            </div>
          </div>
          <div className="form-group row ml-2">
            <label className="col-sm-2 col-form-label">Email:</label>
            <div className="col-sm-6">
              <input type="email" name="email" className="form-control" placeholder="some@some.com" />
            </div>
          </div>

          <div className="form-group row ml-2">
            <label className="col-sm-2 col-form-label">Role:</label>
            <div className="col-sm-6">
              <input type="email" name="role" className="form-control" placeholder="Role" />
            </div>
          </div>
        </Card.Body>
        <Card.Footer className="text-muted">
          <button className="btn btn-primary" type="submit">Save</button>
        </Card.Footer>

      </Card>

    </Container>
  );
}
export default observer(Profile);