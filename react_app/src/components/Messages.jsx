import React, { Component } from "react";
import FormMessage from "../components/FormMessage";
import ListMessage from "../components/ListMessage";
import { AppString } from "../config/Constants";
import { myFirestore } from "../config/MyFirebase";
import moment from "moment";

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      newMessage: false,
    };
    this.groupChatId = null;
    this.listMessage = [];
    this.removeListener = null;
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.currentPairUser !== prevProps.currentPairUser) {
      this.getListHistory();
    }
  };

  onSendMessage = (content, type) => {
    if (content.trim() === "") {
      return;
    }

    const timestamp = moment().valueOf().toString();

    const itemMessage = {
      idFrom: this.props.currentUserId,
      idTo: this.props.currentPairUser.id,
      timestamp: timestamp,
      content: content.trim(),
      type: type,
    };
    //SET MESSAGES
    myFirestore
      .collection(AppString.MESSAGES)
      .doc(this.groupChatId)
      .collection(this.groupChatId)
      .doc(timestamp)
      .set(itemMessage)
      .then(() => {
        this.child.scrollToMyRef();
        console.log("mensaje enviado");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  hashString = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash += Math.pow(str.charCodeAt(i) * 31, str.length - i);
      hash = hash & hash;
    }
    return hash;
  };

  getListHistory = () => {
    if (this.removeListener) {
      this.removeListener();
    }
    this.listMessage.length = 0;
    if (
      this.hashString(this.props.currentUserId) <=
      this.hashString(this.props.currentPairUser.id)
    ) {
      this.groupChatId = `${this.props.currentUserId}-${this.props.currentPairUser.id}`;
    } else {
      this.groupChatId = `${this.props.currentPairUser.id}-${this.props.currentUserId}`;
    }

    this.removeListener = myFirestore
      .collection(AppString.MESSAGES)
      .doc(this.groupChatId)
      .collection(this.groupChatId)
      .onSnapshot(
        (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === AppString.DOC_ADDED) {
              this.listMessage.push(change.doc.data());
              this.child.scrollToMyRef();
            }
          });
          this.setState({ isLoading: false });
        },
        (err) => {
          console.log(err);
        }
      );
  };

  render() {
    return (
      <React.Fragment>
        <div id="uncolabChat_righttab">
          {this.props.currentPairUser ? (
            <>
              <ListMessage
                ref={(element) => {
                  this.child = element;
                }}
                currentUser={this.props.currentUserId}
                currentPairUser={this.props.currentPairUser}
                messages={this.listMessage}
              />
              <FormMessage
                onChange={this.props.onChange}
                inputValues={this.props.inputValues}
                onKeyPress={this.props.onKeyPress}
              />
            </>
          ) : (
            <>
              <div className="wrapper-welcome">
                <h4>
                  <strong>{this.props.currentUserNickname} </strong>
                  Bienvenido a programadores y novatos
                </h4>
                <img
                  src={AppString.PROGRAMMERS_NOOBS_IMAGE}
                  alt="programadores y novatos"
                />
              </div>
            </>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Messages;
