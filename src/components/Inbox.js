import { doc, onSnapshot, updateDoc, serverTimestamp} from "firebase/firestore";
import React, { useEffect, useState, useRef } from "react";
import { Stack, Dropdown, Form, Button } from "react-bootstrap";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { chatroomCol } from "../firebase";
import Message from "./Message";
import { BsEmojiLaughing } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";

export default function Inbox() {
  const [messages, setMessages] = useState();
  const [colId, setColId] = useState()
  const dropdownRef = useRef();
  const [showDropdown, setShowDropdown] = useState(false);
  const [myMessage, setMyMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const {username} = useSelector(state => state.currentUser)
  useEffect(() => {
    const unsubscribe = onSnapshot(
      chatroomCol,
      (snapshot) => {
        try {
          const docs = snapshot.docs
          const data = docs[0].data()
          const id = docs[0].id
          setMessages(data)
          setColId(id)
          console.log(data)

        }catch(err){

        }
        setLoading(false)
        console.log(messages)
      }
    );
    return unsubscribe;
  }, [chatroomCol]);

  const handleDropdownToggle = (isOpen) => {
    setShowDropdown(isOpen);
  };

  const handleDocumentClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMyMessage((prev) => prev + emoji.native);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  const sendMessage = async(e) => {
    e.preventDefault();
    if (myMessage === ""){
      return
    }
    const docRef = doc(chatroomCol,colId)
    console.log(colId)
    const updateData = {
      chat: {
        messages: [
          ...messages.chat.messages,
          {
            message: myMessage,
            sender: username,
            time: serverTimestamp
          }
        ]
      }
    }
    await updateDoc(docRef,updateData)
    console.log('updated Data',updateData)
  };

  if (loading) {
    return <div></div>;
  }

  return (
    <Stack style={{ height: "80vh" }} className="bg-secondary p-2 w-100">
      <div className="d-flex flex-column">
        {messages.chat.messages.map((message) => (
          <Message
            sender={message.sender}
            time={message.time}
            message={message.message}
          />
        ))}
      </div>
      <Form
        onSubmit={sendMessage}
        className="w-100 mt-auto d-flex gap-1 align-items-baseline"
      >
        <div className="d-flex justify-content-end">
          <Dropdown
            className="d-flex justify-content-end rounded"
            show={showDropdown}
            onToggle={(isOpen) => handleDropdownToggle(isOpen)}
            ref={dropdownRef}
          >
            <Dropdown.Toggle
              variant="outline"
              id="dropdown-basic"
              className="fs-1 p-2 text-white"
            >
              <BsEmojiLaughing />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Picker data={data} onEmojiSelect={handleEmojiSelect} />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Form.Control
          type="textarea"
          placeholder="What's on your mind"
          className="mb-2 fs-4  flex-grow"
          style={{ minHeight: "40px" }}
          value={myMessage}
          onChange={(e) => setMyMessage(e.target.value)}
        />
        <Button variant="success" type="submit">
          <IoSend />
        </Button>
      </Form>
    </Stack>
  );
}
