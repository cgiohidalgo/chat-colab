import React, { useState, useEffect } from "react";
import { myFirestore } from "../config/MyFirebase";
import { AppString } from "../config/Constants";
import Checkbox from "@material-ui/core/Checkbox";
import Meesage from "@material-ui/icons/Message";
import MessageBorder from "@material-ui/icons/ChatBubbleOutline";

function Notification({ currUser, currPair, initialState, messagesUser }) {
  const [checked, setChecked] = useState(initialState);
  const [countPrev, setCountPrev] = useState(messagesUser);
  const [countNext, setCountNext] = useState(0);

  getMessagesUser(currUser, currPair);

  useEffect(() => {
    if (countNext === countPrev) {
      setChecked(false);
    }
  });

  const handleClick = (checked) => {
    setChecked(checked);
    setCountPrev(countNext);
  };

  function getMessagesUser(user, pair) {
    let groupChatId;
    if (user === null || pair === null) {
    } else {
      if (hashString(user) <= hashString(pair)) {
        groupChatId = `${user}-${pair}`;
      } else {
        groupChatId = `${pair}-${user}`;
      }

      myFirestore
        .collection(AppString.MESSAGES)
        .doc(groupChatId)
        .collection(groupChatId)
        .onSnapshot((doc) => {
          if (doc.size > 0 && countPrev !== countNext) {
            setChecked(true);
            setCountNext(doc.size);
          }
        });
    }
  }

  function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash += Math.pow(str.charCodeAt(i) * 31, str.length - i);
      hash = hash & hash;
    }
    return hash;
  }

  return (
    <>
      {/* <input
        id={currPair}
        type="checkbox"
        checked={checked}
        onChange={(e) => handleClick(e.target.checked)}
      /> */}
      <Checkbox
        id={currPair}
        icon={<MessageBorder className="uncolabChat_notification_disable" />}
        checkedIcon={<Meesage className="uncolabChat_notification" />}
        checked={checked}
        onChange={(e) => handleClick(e.target.checked)}
      />
    </>
  );
}

export default Notification;
