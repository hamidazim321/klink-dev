import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Card, Stack } from "react-bootstrap";
import { AiFillLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { useSelector } from "react-redux";
import { postsCol } from "../firebase";

export default function PostCard({ data, id, commentsHandler }) {
  const { comments, likes, post, post_by, posted_at } = data;
  const { uid } = useSelector((state) => state.currentUser);
  const [liked, setLiked] = useState(false);
  const [newLikes, setNewLikes] = useState(likes);

  const handleLike = async (id) => {
    const docRef = doc(postsCol, id);
    let updateLikes;
    if (liked) {
      updateLikes = likes.filter((like) => like!== uid)
      setLiked(false)
    } else {
      updateLikes = [...likes, uid];
    }
    try {
      setNewLikes(updateLikes);
      updateDoc(docRef, {
        likes: updateLikes,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (newLikes.includes(uid)) {
      setLiked(true);
    }
  }, [setLiked, uid, newLikes]);

  return (
    <Card>
      <Card.Body>
        {posted_at && (
          <Card.Title className="fs-6">
            by {post_by} - {new Date(posted_at.toMillis()).toLocaleDateString()}
          </Card.Title>
        )}
        <Card.Text className="fs-4">{post}</Card.Text>
        <Stack
          direction="horizontal"
          className="d-flex gap-4 align-items-center"
        >
          <div
            className="d-flex gap-1 align-items-center"
            onClick={() => handleLike(id)}
          >
            <AiFillLike style={{ color: liked ? "red" : "black" }} />
            <span>{newLikes.length}</span>
          </div>
          <div
            className="d-flex gap-1 align-items-center"
            onClick={() => commentsHandler(comments, id, uid)}
          >
            <FaRegComment />
            <span>{comments.length}</span>
          </div>
        </Stack>
      </Card.Body>
    </Card>
  );
}
