import React, { useEffect, useState } from "react";
import { postsCol } from "../firebase";
import { getDocs, orderBy, query } from "firebase/firestore";
import { Container, Modal, Stack } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import PostCard from "./PostCard";
import CommentBox from "./CommentBox";
import { useSelector } from "react-redux";
import Footer from "./Footer";
import Header from "./Header";
export default function Home() {
  const [posts, setPosts] = useState();
  const [showComments, setShowComments] = useState(false);
  const [selectedComments, setSelectedComments] = useState();
  const [postId, setPostId] = useState();
  const { username } = useSelector((state) => state.currentUser);
  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(postsCol, orderBy("posted_at", "desc"));
      try {
        const snapshot = await getDocs(q);
        const { docs } = await snapshot;
        let arr = [];
        docs.forEach((doc) => {
          arr.push({
            data: doc.data(),
            id: doc.id,
          });
        });
        setPosts(arr);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  const handleShowComments = (comments, id, uid) => {
    setShowComments((prev) => !prev);
    comments.length > 0
      ? setSelectedComments(comments)
      : setSelectedComments(null);
    setPostId(id);
  };

  const updateCommentsLocally = (updatedComments) => {
    setSelectedComments(updatedComments);
  };
  return (
    <>
    <Header name={username} />
    <Container className="d-flex flex-column gap-3 pb-5 my-3">
      {posts && posts.map((post) => (
        <PostCard
          data={post.data}
          id={post.id}
          commentsHandler={handleShowComments}
          key={post.id}
        />
      ))}
      <Modal
        show={showComments}
        backdrop="static"
        onHide={() => setShowComments(false)}
      >
        <Modal.Header closeButton>Post your comment</Modal.Header>
        <Modal.Body>
          <CommentBox
            commentHandler={updateCommentsLocally}
            currentComments={selectedComments}
            postId={postId}
          />
        </Modal.Body>
        <Modal.Footer className="d-flex flex-column">
          <p className="fw-bold fs-5">Comments</p>
          <Stack
            direction="vertical"
            gap={2}
            style={{ maxHeight: "400px", overflowY: "scroll" }}
          >
            {selectedComments &&
              selectedComments.map((comment) => (
                <div className="d-flex gap-2 align-items-start">
                  <span className="fw-semibold">{comment.comment_by}</span>
                  <span className="text-wrap">{comment.comment}</span>
                  {comment.comment_by === username ? (
                    <span className="ms-auto">
                      <FaTrash />
                    </span>
                  ) : null}
                </div>
              ))}
            {!selectedComments && <div>No Comments yet</div>}
          </Stack>
        </Modal.Footer>
      </Modal>
    </Container>
    <Footer />
    </>
  );
}
