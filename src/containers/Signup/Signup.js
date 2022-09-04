import React, { useEffect, useState } from 'react';
import { signup } from '../../features/authSlice';
import { Layout } from '../../components/Layout';
import { Container, Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import { Input } from '../../components/UI/Input';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

/**
* @author
* @function Signup
**/

export const Signup = (props) => {

  const [firstname,setFirstName] = useState('');
  const [lastname,setLastName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const user = useSelector(state=>state.authStore);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(!user.isLoading){
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    }
  },[user.isLoading])

  if (user.isLoggedIn) {
    // console.log("hgfjhgkgjkgkj")
    return <Navigate to="/" />;
  }

  const onSignup = (e)=>{
    e.preventDefault();
    dispatch(signup({firstname,lastname,email,password}))
  }

  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: '70px' }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={onSignup}>
              <Row>
                <Col md="6">
                  <Input
                    controlId="formBasicFirstName"
                    label="First Name"
                    type="text"
                    // value=""
                    placeholder="Enter First Name"
                    onChange={(e) => {setFirstName(e.target.value)}}
                  />
                </Col>
                <Col md="6">
                  <Input
                    controlId="formBasicLastName"
                    label="Last Name"
                    type="text"
                    // value=""
                    placeholder="Enter Last Name"
                    onChange={(e) => { setLastName(e.target.value)}}
                  />
                </Col>
              </Row>
              <Input
                controlId="formBasicEmail"
                label="Email address"
                type="email"
                // value=""
                placeholder="Enter email"
                onChange={(e) => {setEmail(e.target.value) }}
              />
              <Input
                controlId="formBasicPassword"
                label="Password"
                // value="" 
                type="password"
                placeholder="Enter Password"
                onChange={(e) => { setPassword(e.target.value)}}

              />
              <Button variant="primary" type="submit" disabled = {user.isLoading}>
                Submit
              </Button>
              {user.isLoading && <Spinner animation='border' variant='primary' style={{marginLeft:'6px'}}/>}
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>

  )

}