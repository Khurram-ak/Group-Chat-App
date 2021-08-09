import { useHistory } from "react-router"
import { Container, Row, Col, Form, Input, FormGroup, Label, Button } from 'reactstrap';
import login from "../../images/login.png"
import { useState } from "react";
import { signIn } from "../../confiq/firebase.js"
import './index.css'
import swal from "sweetalert";


export default function SignIn() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const history = useHistory()
    const logIn = async (e) => {
        e.preventDefault()
        try {
            console.log("Email", email);
            console.log("password", password);
            const user = await signIn(email, password)
           await swal("", "LOG IN Successfully!", "success");
            history.push('/dashboard')
            setEmail("")
            setPassword("")
        }
        catch (e) {
            const error = e.message
            swal("", "Email or Password Incorrect!", "error");

        }
    }


    return <>
        <div id="bgImgSignIn">
            <div className="navbar">
                <i onClick={() => { history.push("/") }} class="fas fa-chalkboard-teacher"></i>
                <div>
                    <button onClick={() => { history.push("/signup") }}>SignUp</button>
                </div>
            </div>
            <br></br>
            <br></br>

            <Container>
                <Row>
                    <Col md="6">
                        <img src={login} alt="login" width="100%" />
                    </Col>
                    <Col md="6">
                        <div id="inputBox">
                            <h2>SIGN IN</h2>
                            <p>Sign in here to continue!!</p>
                            <Form>
                                <FormGroup>
                                    <Label for="exampleEmail">Email Address :</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="Input"
                                        placeholder="Email Address Here"
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value) }}
                                    />
                                    <Label className="txt">We'll never share your email with anyone else.</Label>
                                </FormGroup>
                                <br></br>
                                <FormGroup>
                                    <Label for="examplePassword">Password :</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        id="Input"
                                        placeholder="Password Here"
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value) }}

                                    />
                                </FormGroup>
                                <Label className="txt" onClick={()=>{history.push("/signup")}}>Click here to sign up</Label>

                                <br></br>
                                <button onClick={logIn} >Log In</button>

                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>


    </>
}