import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Dropdown, Alert } from "react-bootstrap";
import data from "@emoji-mart/data";
import { addDoc, serverTimestamp } from "firebase/firestore";
import Picker from "@emoji-mart/react";
import { BsEmojiLaughing } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { postsCol } from "../firebase";
import Header from "./Header";
import Footer from "./Footer";

export default function MakePost() {
  const [post, setPost] = useState("");
  const {username, uid} = useSelector((state => state.currentUser))
  const dropdownRef = useRef();
  const [showDropdown, setShowDropdown] = useState(false);
  const [alert, setAlert] = useState() 
  const [loading, setLoading] = useState(false)

  const handlePost = async(e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await addDoc(postsCol, {
        post_by: username,
        post: post,
        posted_at: serverTimestamp(),
        likes: [],
        post_id: uid,
        comments: []
      })
      setAlert('Posted Successfully')
      setPost("")

    }catch(err){
      setAlert('Could not be posted')
    }
    setLoading(false)
  } 

  const handleDropdownToggle = (isOpen) => {
    setShowDropdown(isOpen);
  };

  const handleDocumentClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  const handleEmojiSelect = (emoji) => {
    setPost(prev => prev + emoji.native)
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  return (
    <>
    <Header name={username} />
    <Form className="w-100 p-2" onSubmit={handlePost}>
      {alert && (
        alert === 'Posted Successfully' ? (
          <Alert variant="success">{alert}</Alert>
        ): <Alert variant="danger">{alert}</Alert>
      )}
      {loading && (
        <Alert variant="info">Posting...</Alert>
      )}
      <Form.Control
        type="textarea"
        placeholder="What's on your mind"
        className="mb-2 fs-3"
        style={{ minHeight: "80px" }}
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />
      <div className="d-flex justify-content-end">
        <Button
          variant="primary"
          type="submit"
          className="fs-5 border rounded-pill me-auto"
        >
          Post now
        </Button>
        <Dropdown
          className="d-flex justify-content-end"
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
    </Form>
    <Footer />
    </>
  );
}
