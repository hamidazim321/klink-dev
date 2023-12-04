import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PostCard from "../components/PostCard";
import { useSelector } from "react-redux";
import {
  orderBy,
  where,
  query,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { postsCol } from "../firebase";
import { Button, Container } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
export default function MyPosts() {
  const { uid, username } = useSelector((state) => state.currentUser);
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);

  const handleDelete = async(id) => {
    const docRef = doc(postsCol, id);
    try {
      deleteDoc(docRef)
    }catch(err){
      console.error(err)
    }
  };
  useEffect(() => {
    const q = query(
      postsCol,
      where("post_id", "==", uid),
      orderBy("posted_at", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const livePosts = snapshot.docs.map((doc) => ({
        data: doc.data(),
        id: doc.id,
      }));
      setPosts(livePosts);
      setLoading(false)
    });
    return unsubscribe
  }, [uid]);
  return (
    <>
    <Header name={username} />
    <Container className="d-flex flex-column gap-3 pb-5 mb-5">
      {!loading && (
        <>
          <h1 className="h1 display-3">{username}'s Posts</h1>
          {posts &&
            posts.map((post) => (
              <div key={post.id}>
                <PostCard data={post.data} />
                <Button
                  type="button"
                  variant="danger"
                  className="rounded-pill mt-1"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete Post
                </Button>
              </div>
            ))}
          {!posts && <div>You have not yet made any posts</div>}
        </>
      )}
    </Container>
    <Footer />
    </>
  );
}
