import React, { useEffect, useState } from "react";
import { postsCol } from "../firebase";
import { getDocs, orderBy, query } from "firebase/firestore";
import { Container } from "react-bootstrap";
import PostCard from "./PostCard";
export default function Home() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    const fetchPosts = async() => {
      const q = query(postsCol, orderBy('posted_at', 'desc'))
      try {
        const snapshot = await getDocs(q);
        const { docs} = await snapshot;
        let arr = []
        docs.forEach((doc) => {
          arr.push({
            data: doc.data(),
            id: doc.id
          })
        })
        setPosts(arr)
      } catch (err) {
        console.error(err);
      }
    }
    fetchPosts()
  }, []);
  return (
    <Container className="d-flex flex-column gap-3">
      {posts.map(post => (
        <PostCard data={post.data} key={post.id}/>
      ))}
    </Container>
  );
}
