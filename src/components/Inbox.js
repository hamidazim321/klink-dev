import {
  addDoc,
  onSnapshot,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState, useRef } from "react";
import { Stack, Dropdown, Form, Button, Container } from "react-bootstrap";
import { TiArrowBack } from "react-icons/ti";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { chatroomCol } from "../firebase";
import Message from "./Message";
import { BsEmojiLaughing } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Inbox() {
  const [messages, setMessages] = useState();
  const dropdownRef = useRef();
  const [showDropdown, setShowDropdown] = useState(false);
  const [myMessage, setMyMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const { username } = useSelector((state) => state.currentUser);
  const bottomMsg = useRef()
  const navigate = useNavigate()
  useEffect(() => {
    const q = query(chatroomCol, orderBy("time", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      try {
        const { docs } = snapshot;
        const arr = [];
        docs.forEach((doc) => {
          arr.push({
            message: doc.data(),
            id: doc.id,
          });
        });
        setMessages(arr);
      } catch (err) {}
      setLoading(false);
    });
    return unsubscribe;
  }, []);

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

  const sendMessage = async (e) => {
    e.preventDefault();
    if (myMessage === "") {
      return;
    }
    try {
      await addDoc(chatroomCol, {
        message: myMessage,
        sender: username,
        time: serverTimestamp(),
      });
      bottomMsg.current.scrollIntoView({behaviour: 'smooth'})
    } catch (err) {
      console.error(err.message);
    }
    setMyMessage("")
  };

  if (loading) {
    return <div></div>;
  }

  return (
    <Container fluid style={{ height: "100vh"}} className="p-0">
      <Button 
      variant="success" 
      type="button" 
      onClick={() => navigate('/home')}
      className="w-auto position-fixed text-white fs-4"
      >
        <TiArrowBack />
      </Button>
      <Stack
        direction="vertical"
        gap={2}
        className="bg-secondary-subtle p-2 w-100 pb-5 w-100 m-0"
        style={{minHeight: '100%'}}
      >
        {messages && messages.map((data) => (
          <Message
            key={data.id}
            sender={data.message.sender}
            time={data.message.time}
            message={data.message.message}
          />
        ))}
        <div ref={bottomMsg}></div>
      </Stack>
      <Form
        onSubmit={sendMessage}
        className="w-100 fixed-bottom d-flex gap-1 align-items-baseline"
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
              className="fs-1 p-2"
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
          placeholder="Hello"
          className="mb-2 fs-4  flex-grow"
          style={{ minHeight: "40px" }}
          value={myMessage}
          onChange={(e) => setMyMessage(e.target.value)}
        />
        <Button variant="success" type="submit">
          <IoSend />
        </Button>
      </Form>
    </Container>
  );
}
