import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Message({ message, sender, time }) {
  const {username} = useSelector((state) => state.currentUser);
  const formatToLocalTime = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString();
  };

  let content;
  if (username == sender) {
    content = (
      <div className="ms-auto bg-success">
        <p>{message}</p>
        {time && <span>{formatToLocalTime(time)}</span>}
      </div>
    );
  } else {
    content = (
      <div className="bg-primary-subtle me-auto">
        <span>{sender}</span>
        <p>{message}</p>
        {time && <span>{formatToLocalTime(time)}</span>}
      </div>
    );
  }
  return content;
}
