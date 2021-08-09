import { useHistory } from "react-router"
import { Container, Row, Col, Input, Label, Spinner, FormGroup } from 'reactstrap';

import React, { useEffect, useRef, useState } from "react";
import swal from 'sweetalert';
import avatar from "../../images/avatar.png"
import './index.css'
import { storeProfilePic, info, addMessage, getData, authState, getMessage } from '../../confiq/firebase'



export default function Dashboard() {


    const history = useHistory()

    const [currentUserUid, setCurrentUserUid] = useState("")
    const [userData, setUserData] = useState({})
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [loader, setLoader] = useState(false)


    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {

        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })

    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    console.log("currentUserUid1", currentUserUid);
    authState().onAuthStateChanged((user) => {
        if (user) {
            var uid = user.uid;
            setCurrentUserUid(uid)
        } else {
            console.log("USer is not load");
        }
    });

    useEffect(() => {
        (async function () {
            if (currentUserUid) {
                await getData()
                    .where("uid", "==", currentUserUid).onSnapshot((data) => {
                        data.forEach(doc => {
                            setUserData(doc.data())
                        })
                    })
            }
        })
            ()


    }, [currentUserUid])

    useEffect(() => {

        getData().get()
            .then((querySnapshot) => {
                const temp = []
                querySnapshot.forEach((doc) => {

                    temp.push(doc.data())

                });
                setAllUsers(temp)
            });


    }, [currentUserUid, messages])
    // console.log("ALLLL", allUsers);



    useEffect(() => {



        (async function () {
            if (currentUserUid) {
                await getMessage().orderBy('timestamp', 'asc')
                    .onSnapshot((doc) => {
                        const temp = []
                        doc.forEach(data => {

                            // console.log("data********", data.data());
                            temp.push(data.data())
                        })
                        setMessages(temp)
                        setInput("")
                    })
            }
        })
            ()

    }, [currentUserUid])

    // console.log("MEssages Timestamp", messages);


    // console.log("useerdata*********", userData);



    const onChange = async (e) => {
        setLoader(true)
        const imgUrl = await storeProfilePic(e.target.files[0])
        await info(currentUserUid, imgUrl)
        setLoader(false)

    }



    const sendMessage = async () => {
        if (currentUserUid == userData.uid) {
            await addMessage(currentUserUid, input)
        }
        setInput("")

    }

    console.log("userData.profileImg", userData);
    return <>
        <div id="bgImgDash">
            <div className="navbar">
                <i class="fas fa-chalkboard-teacher"></i>
                <div>
                    <button onClick={() => { history.push("/signin") }}>Log Out</button>
                </div>
            </div>
            <Container>
                <Row>
                    <Col md="6" >
                        <Label >
                            <div className="imgDiv">
                                {!loader ? <>
                                    {console.log("img", userData.profileImg)}
                                    <img src={userData.profileImg || avatar} alt="UploadPic" className="profilePic" />
                                    <input className="file" type="file" onChange={onChange} /></> :

                                    <Spinner className="spinner" color="warning" />
                                }

                            </div>
                        </Label>

                        <div className="userInfo">
                            <br></br>
                            <h2>{userData?.fullName}</h2>
                            <h4>{userData?.email}</h4>
                            <h5>{userData?.contact}</h5>
                        </div>
                    </Col>
                    <Col md="6" className="about">
                        <h1>All Messages </h1>
                        <span>Chat & find new friends now with chat web app room! <br></br>
                            Our chat room will help you stay connected & discover new friends.</span>
                    </Col>
                </Row>
            </Container>
            <br></br>
            <br></br>
            <Container>
                <Row>
                    <Col md="12 messageBox">
                        <div className="chatBox">
                            {
                                messages.map(item => {
                                    return item.sender !== currentUserUid ?
                                        <div className="messageWrap">
                                            {allUsers.map(_item => {
                                                return item.sender == _item.uid &&
                                                    <div className="msgImgDiv">
                                                        <img style={{ borderRadius: "50%" }} src={_item.profileImg ? _item.profileImg : avatar} width="50px" />
                                                    </div>
                                            })}

                                            <div className="message">
                                                <p>{item.message} </p>
                                                {allUsers.map(_item => {
                                                    return item.sender == _item.uid && <p id="name">{_item.fullName}</p>


                                                })}


                                            </div>
                                            <div ref={messagesEndRef} />
                                        </div> :
                                        <div className="messageWrap2">

                                            < div className="myMsg">
                                                <p>{item.message} </p>
                                            </div>
                                            <div ref={messagesEndRef} />

                                        </div>
                                })}





                        </div>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col className="inputField">
                        <FormGroup>
                            <Input onChange={(e) => { setInput(e.target.value) }} value={input} type="text" name="text" id="exampleEmail" placeholder="Type Message Here..." />
                        </FormGroup>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <button id="sendBtn" onClick={() => { sendMessage() }}>Send</button>

                        </div>
                    </Col>
                </Row>
            </Container>
            <br></br>
            <br></br>

        </div>


    </>
}