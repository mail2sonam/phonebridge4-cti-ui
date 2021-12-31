import React, { Component } from 'react';
import SockJsClient from 'react-stomp';
import './App.css';
// import '.App.css'
import { Input, message, Modal, Upload } from "antd";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './MessageStyle.css';
import NameComponent from './NameComponent';
import Widget from "components/Widget/index";

class WebSocketChat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            typedMessage: "",
            name: "",
            oncloseval: false
        }

    }

    setName = (name) => {
        this.setState({ name: name });
    };

    sendMessage = () => {
        this.clientRef.sendMessage('/app/user-all', JSON.stringify({
            name: this.state.name,
            message: this.state.typedMessage
        }));
    };

    displayMessages = () => {
        return (
            <div>
                {this.state.messages.map(msg => {
                    return (
                        <div>
                            {this.state.name == msg.name ?
                                <div>
                                    <p className="title1">{msg.name} : </p><br />
                                    <p>{msg.message}</p>
                                </div> :
                                <div>
                                    <p className="title2">{msg.name} : </p><br />
                                    <p>{msg.message}</p>
                                </div>
                            }
                        </div>)
                })}
            </div>
        );
    };

    onClose = () => {
    }


    onCancelme = () => {
        this.setState({ oncloseval: true });
        localStorage.setItem("chatvisible", false)
    }

    render() {
        return (
            <div>


                <Modal onCancel={this.onCancelme} visible={true}
                    closable={false}
                    // onOk={() => {
                    //     this.onClose();
                    // }}
                    style={{ zIndex: 2600 }}>

                    <div className="gx-card-body">
                        <NameComponent setName={this.setName} />
                        <div className="align-center">
                            <h1>Welcome to Eupraxia Chat</h1>
                            <br /><br />
                        </div>
                        <div className="align-center">
                            User : <p className="title1"> {this.state.name}</p>
                        </div>
                        <div className="align-center">
                            <br /><br />
                            <table>
                                <tr>
                                    <td>
                                        <TextField id="outlined-basic" label="Enter Message to Send" variant="outlined"
                                            onChange={(event) => {
                                                this.setState({ typedMessage: event.target.value });
                                            }} />
                                    </td>
                                    <td>
                                        <Button variant="contained" color="primary"
                                            onClick={this.sendMessage}>Send</Button>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <br /><br />
                        <div className="align-left">
                            {this.displayMessages()}
                        </div>

                        <SockJsClient url='"http://192.168.10.210:5001/eupraxia""
"/websocket-chat/'
                            topics={['/topic/user']}
                            onConnect={() => {
                                console.log("connected");
                            }}
                            onDisconnect={() => {
                                console.log("Disconnected");
                            }}
                            onMessage={(msg) => {
                                var jobs = this.state.messages;
                                jobs.push(msg);
                                this.setState({ messages: jobs });
                            }}
                            ref={(client) => {
                                this.clientRef = client
                            }} />

                    </div>


                </Modal>

            </div>
        )
    }
}

export default WebSocketChat;