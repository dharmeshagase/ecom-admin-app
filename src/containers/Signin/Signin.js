import React, { useEffect, useState } from 'react'
import { login } from '../../features/authSlice';
import { Layout } from '../../components/Layout'
import { Container, Form, Row, Col, Button, Alert, Spinner } from 'react-bootstrap'
import { Input } from '../../components/UI/Input'
import { useDispatch, useSelector } from 'react-redux'
// import { loginRequest } from '../../features/authSlice'
import { Navigate } from 'react-router-dom'
/**
* @author
* @function Signin
**/

export const Signin = (props) => {
  // const loginRequest = createAction(authConstant.LOGIN_REQUEST);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authStore)
  const { message } = useSelector(state => state.messageStore)
  // console.log(props);
  // useEffect(() => {
  //     if(user.isLoggedIn)
  //      <Navigate to="/" />;
  // }, [dispatch])
  if (user.isLoggedIn) {
    // console.log("hgfjhgkgjkgkj")
    return <Navigate to="/" />;
  }
  // console.log(message)
  const userLogin = (e) => {
    e.preventDefault();
    const userObj = { email, password }
    dispatch(login(userObj))
      .unwrap()
      // .then(() => {

      //   console.log("Login Successful Now redirected")
      //   // props.history.push("/");
      //   console.log("##########################################")
      //   props.history.push('/');
      //   window.location.reload();
      // })
      .catch((error) => {
        // setLoading(false);
        // console.log(error);
        // console.log(message);
        return <Alert color='primary' fade={false}>Something went Wrong</Alert>
      });
  }
  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: '70px' }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userLogin}>
              <Input
                controlId="formBasicEmail"
                label="Email address"
                type="email"
                // value=""
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                controlId="formBasicPassword"
                label="Password"
                // value="" 
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}

              />

              <Button variant="primary" type="submit" disabled={user.isLoading}>
                Submit
              </Button>
              {user.isLoading && <Spinner animation='border' variant='primary' />}
            </Form>
          </Col>
        </Row>

      </Container>
    </Layout>

  )

}