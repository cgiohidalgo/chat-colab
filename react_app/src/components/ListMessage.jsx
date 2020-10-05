import React, { Component } from "react";
import moment from "moment";

class ListMessage extends Component {
  chatContainer = React.createRef();

  scrollToMyRef = () => {
    const scroll =
      this.chatContainer.current.scrollHeight -
      this.chatContainer.current.clientHeight;
    this.chatContainer.current.scrollTo(0, scroll);
  };

  render() {
    return (
      <>
        <div className="uncolabChat_tabsubtitle">
          <div className="uncolabChat-users">
            <div className="uncolabChat_userlist-headermsg" amount="0">
              <span className="uncolabChat_userscontentavatar">
                <img
                  alt="imagen"
                  className="uncolabChat_userscontentavatarimage"
                  src="//fast.cometondemand.net/images/noavatar.png"
                />
              </span>
              <div className="uncolabChat_chatboxDisplayDetails">
                <div className="uncolabChat_userdisplayname" title="Alex">
                  {this.props.currentPairUser.data.nickname}
                </div>
                <span className="uncolabChat_userscontentdot uncolabChat_desktop"></span>
                <div className="uncolabChat_userdisplaystatus">
                  I'm available
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="chat-content" ref={this.chatContainer}>
          {this.props.messages.length > 0 ? (
            this.props.messages.map((msg, index) =>
              msg.idFrom === this.props.currentUser ? (
                <div key={index} className="uncolabChat_messagebox_self">
                  <span className="uncolabChat_self_ts">
                    {moment(Number(msg.timestamp)).format("lll")}
                  </span>
                  <div className="uncolabChat_chatboxmessage uncolabChat_self">
                    <span className="uncolabChat_chatboxmessagecontent">
                      {msg.content}
                    </span>
                  </div>
                </div>
              ) : (
                <div key={index} className="uncolabChat_messagebox">
                  <span className="uncolabChat_ts">
                    {moment(Number(msg.timestamp)).format("lll")}
                  </span>
                  <div className=" uncolabChat_chatboxmessage">
                    <span className="uncolabChat_groupusername">
                      {msg.content}
                    </span>
                  </div>
                </div>
              )
            )
          ) : (
            <div className="alert alert-warning" role="alert">
              Aún no hay colaboración!
            </div>
          )}
        </div>
      </>
    );
  }
}
export default ListMessage;
