import React from "react";
import { Card, Stack } from "react-bootstrap";
import { AiFillLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";

export default function PostCard({ data }) {
  const { comments, likes, post, post_by, posted_at } = data;

  return (
    <Card>
      <Card.Body>
        {posted_at && (
          <Card.Title className="fs-6">
            by {post_by} - {new Date(posted_at.toMillis()).toLocaleDateString()}
          </Card.Title>
        )}
        <Card.Text className="fs-4">{post}</Card.Text>
        <Stack direction="horizontal" className="d-flex gap-4 align-items-center">
          <div className="d-flex gap-1 align-items-center">
            <AiFillLike />
            <span>{likes}</span>
          </div>
          <div className="d-flex gap-1 align-items-center">
          <FaRegComment /><span>{comments.length}</span>
          </div>
        </Stack>
      </Card.Body>
    </Card>
  );
}
