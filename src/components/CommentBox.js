import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Dropdown, Alert } from "react-bootstrap";
import data from "@emoji-mart/data";
import { updateDoc, doc } from "firebase/firestore";
import Picker from "@emoji-mart/react";
import { BsEmojiLaughing } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { postsCol } from "../firebase";

export default function CommentBox({
  commentHandler,
  currentComments,
  postId,
}) {
  const [post, setPost] = useState("");
  const [error, setError] = useState(false);
  const dropdownRef = useRef();
  const { username } = useSelector((state) => state.currentUser);
  const [showDropdown, setShowDropdown] = useState(false);
  const handleDropdownToggle = (isOpen) => {
    setShowDropdown(isOpen);
  };

  const handleDocumentClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  const handleEmojiSelect = (emoji) => {
    setPost((prev) => prev + emoji.native);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  const postComment = async (e) => {
    setError(false);
    e.preventDefault();
    if (post.trim() === "") {
      setError("cannot post empty comment");
      return;
    }
    const newComment = {
      comment: post,
      comment_by: username,
    };
    const updatedComments = Array.isArray(currentComments) ? [...currentComments, newComment] : [newComment]
    try {
      const docRef = doc(postsCol, postId);
      await updateDoc(docRef, {
        comments: updatedComments,
      });
      commentHandler(updatedComments.reverse());
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Form className="w-100 p-2" onSubmit={postComment}>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Control
        type="textarea"
        placeholder="What's on your mind"
        className="mb-2 fs-6"
        style={{ minHeight: "60px" }}
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />
      <div
        style={{ height: "fit-content" }}
        className="d-flex justify-content-end"
      >
        <Button type="submit" className="fs-6 btn p-1 border me-auto">
          comment
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
  );
}
