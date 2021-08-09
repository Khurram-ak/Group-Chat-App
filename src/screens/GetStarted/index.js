import React from "react"
import { Container, Row, Col, Alert } from 'reactstrap';
import { useHistory } from "react-router-dom"
import body from "../../images/body.png"
import "./index.css"

export default function GetStarted() {
    const history=useHistory()
    return <>
        <div id="bgImgStart">
            <div className="navbar">
                <i class="fas fa-chalkboard-teacher"></i>
                <div>
                    <button onClick={()=>{history.push("/signin")}}>SignIn</button>
                    <button onClick={()=>{history.push("/signup")}}>SignUp</button>
                </div>
            </div>

            <Container>
                <Row id="row">
                    <Col md="6">
                        <div className="mainBox">
                            <img src={body} alt="logo" width="30%" />
                        </div>
                    </Col>
                    <Col md="6">
                        <div className="textBox">
                            <h1>CHAT WEB-APPLICATION.</h1>
                            <p>Chat & find new friends now with chat web app room! <br></br>
                                Our chat room will help you stay connected & discover new friends.<br></br><br></br>
                                Click below to get Started</p><br></br>
                            <button onClick={()=>{history.push("/signin")}}>Get Started  <i class="fas fa-arrow-right"></i></button>
                        </div>
                    </Col>
                </Row>

            </Container>



        </div>


    </>
}

{/* <div id="body">
    <div className="mainBox">
        <img src={body} alt="logo" width="30%" />
    </div>
    <div className="textBox">
        <h1>Text here</h1>
        <h1>Text here</h1>
        <h1>Text here</h1>
        <h1>Text here</h1>
        <h1>Text here</h1>
        <h1>Text here</h1>
        <button>get Started</button>
    </div>
</div> */}