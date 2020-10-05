import React, { Component, memo } from "react";
import { myFirestore } from "../config/MyFirebase";
import ReactLoading from "react-loading";
import HeaderChat from "../components/HeaderChat";
import UserList from "../components/UserList";
import Messages from "../components/Messages";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/ChatWrapper.css";
import { AppString } from "../config/Constants";

class ChatWrapper extends Component {
  state = {
    isLoading: true,
    inputValue: "",
    users: [],
    currentPairUser: null,
    currentUserId: null,
    currentUserNickname: null,
    taskState: this.props.match.params.status,
    messagesUser: null,
  };

  componentDidMount() {
    this.verifyUser();
    this.getListUser();
  }

  updateUserStatus(currenUser) {
    let userDb = myFirestore.collection(AppString.USERS).doc(currenUser);
    let isProgrammer = /true/i.test(this.state.taskState);
    return userDb
      .update({
        programmer: isProgrammer,
      })
      .then(function () {
        console.log("Document successfully updated!");
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }
  verifyUser() {
    fetch("/plugins/un_colab/api/connect_chat_user")
      .then((response) => response.json())
      .then(async (user) => {
        let username = user.usernameUncode;
        let isAdmin = user.userAdmin;
        if (!isAdmin) {
          if (username) {
            let realname = user.userRealnameUncode;

            const result = await myFirestore
              .collection(AppString.USERS)
              .where(AppString.NICKNAME, "==", username)
              .get();
            if (result.docs.length === 0) {
              //si es usuario no existe
              let isProgrammer = /true/i.test(this.state.taskState);
              myFirestore
                .collection(AppString.USERS)
                .add({
                  nickname: username,
                  realname: realname,
                  programmer: isProgrammer,
                })
                .then((data) => {
                  this.setState({
                    currentUserId: data.id,
                    currentUserNickname: username,
                  });
                });
            } else {
              this.setState({
                currentUserId: result.docs[0].id,
                currentUserNickname: result.docs[0].data().nickname,
              });
            }
          } else {
            console.log("sin información de usuario desde UNCODE");
          }
          this.updateUserStatus(this.state.currentUserId);
        } else {
          console.log("usuario admin");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  getListUser = () => {
    myFirestore
      .collection(AppString.USERS)
      .orderBy("nickname")
      .onSnapshot(
        (snap) => {
          this.setState({
            isLoading: false,
            users: snap.docs.map((doc) => {
              let totalMessages;
              return { id: doc.id, data: doc.data(), cant: 20 };
            }),
          });
        },
        (error) => {
          console.log(error);
        }
      );
  };

  getPairUser = (idUsr, data) => {
    this.setState({
      currentPairUser: { id: idUsr, data: data },
    });
    this.getCountMessages(idUsr);
  };

  hashString = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash += Math.pow(str.charCodeAt(i) * 31, str.length - i);
      hash = hash & hash;
    }
    return hash;
  };

  getCountMessages(pairuser) {
    let groupChatId;
    if (this.state.currentUserId === null || pairuser === null) {
    } else {
      if (
        this.hashString(this.state.currentUserId) <= this.hashString(pairuser)
      ) {
        groupChatId = `${this.state.currentUserId}-${pairuser}`;
      } else {
        groupChatId = `${pairuser}-${this.state.currentUserId}`;
      }

      myFirestore
        .collection(AppString.MESSAGES)
        .doc(groupChatId)
        .collection(groupChatId)
        .get()
        .then((querySnapshot) => {
          this.setState({ messagesUser: querySnapshot.size });
        });
    }
  }

  updateMessage = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  onKeyboardPress = (e) => {
    if (e.key === "Enter") {
      this.child.onSendMessage(this.state.inputValue, 0);
      this.setState({ inputValue: "" });
    }
  };

  render() {
    const {
      inputValue,
      users,
      currentUserId,
      currentUserNickname,
      currentPairUser,
      taskState,
      messagesUser,
    } = this.state;
    return (
      <>
        {this.state.isLoading ? (
          <div className="viewLoading">
            <ReactLoading
              type={"bubbles"}
              color={"#94b43b"}
              height={"10%"}
              width={"10%"}
              className="loadding-chat"
            />
          </div>
        ) : null}
        <HeaderChat currentUser={currentUserNickname} />
        <div id="main_containerChat">
          <UserList
            currentUserId={currentUserId}
            users={users}
            getPairUser={this.getPairUser}
            currentPairUser={currentPairUser}
            taskState={taskState}
            messagesUser={messagesUser}
          />
          <Messages
            currentUserId={currentUserId}
            currentUserNickname={currentUserNickname}
            onChange={this.updateMessage}
            inputValues={inputValue}
            onKeyPress={this.onKeyboardPress}
            currentPairUser={currentPairUser}
            ref={(element) => {
              this.child = element;
            }}
          />
        </div>
      </>
    );
  }
}

export default ChatWrapper;
