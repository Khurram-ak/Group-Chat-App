import { useHistory } from "react-router"
import { useState } from "react";
import { Container, Row, Col, Form, Input, FormGroup, Label, Button } from 'reactstrap';
import signupimg from "../../images/signupimg.png"
import { signUp } from "../../confiq/firebase.js";
import './index.css'
import swal from "sweetalert";


export default function SignIn() {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [contact, setContact] = useState("")
    const history = useHistory()

    const register = () => {
       signUp(email,password,fullName,contact)
       swal("", "SIGN UP Successfully!", "success")

        setFullName("")
        setPassword("")
        setEmail("")
        setContact("")
        history.push("/signin")
    }
    return <>
        <div id="bgImgSignUP">
            <div className="navbar">
                <i onClick={() => { history.push("/") }} class="fas fa-chalkboard-teacher"></i>
                <div>
                    <button onClick={() => { history.push("/signin") }}>SignIn</button>
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>

            <Container>
                <Row>
                    <Col md="6">
                        <img src={signupimg} alt="login" width="100%" />
                    </Col>
                    <Col md="6">
                        <div id="inputBox">
                            <h2>SIGN UP</h2>
                            <p>Sign in here to continue!!</p>
                            <Form >
                                <FormGroup>
                                    <Label for="exampleEmail">Full Name :</Label>
                                    <Input
                                        type="name"
                                        name="name"
                                        id="Input"
                                        value={fullName}
                                        placeholder="Full Name Here"
                                        onChange={(e) => { setFullName(e.target.value) }}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleEmail">Email Address :</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="Input"
                                        value={email}

                                        placeholder="Email Address Here"
                                        onChange={(e) => { setEmail(e.target.value) }}

                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="examplePassword">Password :</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        id="Input"
                                        value={password}

                                        placeholder="Password Here"
                                        onChange={(e) => { setPassword(e.target.value) }}

                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="examplePassword">Contact No. :</Label>
                                    <Input
                                        type="number"
                                        name="contact"
                                        id="Input"
                                        value={contact}

                                        placeholder="Contact No. Here"
                                        onChange={(e) => { setContact(e.target.value) }}

                                    />
                                </FormGroup>
                                <br></br>
                            </Form>
                            <button onClick={ register  } >Sign Up</button>

                        </div>
                    </Col>
                </Row>
            </Container>
        </div>


    </>
}