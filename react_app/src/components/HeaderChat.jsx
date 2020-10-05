import React, { Component } from "react";

class HeaderChat extends Component {
  render() {
    return (
      <React.Fragment>
        <div id="uncolabChat_header">
          <div id="uncolabChat_self_container">
            <div id="uncolabChat_self_right">
              <div id="uncolabChat_notification">
                <i className="fa fa-bell"></i>
              </div>
            </div>
            <div id="uncolabChat_self_left">
              <div id="uncolabChat_self">
                <span className="uncolabChat_userscontentavatar">
                  <img
                    className="uncolabChat_userscontentavatarimage"
                    src="//fast.cometondemand.net/images/noavatar.png"
                    alt="imagen avatar"
                  />
                </span>
                <div id="uncolabChat_selfDetails">
                  <div className="uncolabChat_userdisplayname">
                    {this.props.currentUser}
                  </div>
                  <span className="uncolabChat_userscontentdot uncolabChat_available"></span>
                  <div className="selfstatus uncolabChat_userdisplaystatus">
                    I'm online
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default HeaderChat;
