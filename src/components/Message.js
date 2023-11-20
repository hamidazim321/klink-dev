import React from "react";
import { useSelector } from "react-redux";

export default function Message({ message, sender, time }) {
  const {username} = useSelector((state) => state.currentUser);
  const formatToLocalTime = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    const timeString = date.toLocaleTimeString(undefined, options).toLowerCase();
    return timeString;
  };
  
  

  let content;
  if (username === sender) {
    content = (
      <div className="ms-auto bg-success-subtle p-2 border rounded" style={{maxWidth: '50%'}}>
        <p className="fs-5">{message}</p>
        {time && <span>{formatToLocalTime(time)}</span>}
      </div>
    );
  } else {
    content = (
      <div className="bg-primary-subtle me-auto w-auto p-2" style={{maxWidth: '50%'}}>
        <span className="fs-6 fw-semibold">{sender}</span>
        <p className="fs-5">{message}</p>
        {time && <span>{formatToLocalTime(time)}</span>}
      </div>
    );
  }
  return content

}
