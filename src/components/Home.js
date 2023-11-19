import React, { useEffect } from "react";
import { postsCol } from "../firebase";
import { getDocs } from "firebase/firestore";
export default function Home() {
  useEffect(() => {
    const fetchPosts = async() => {
      try {
        const snapshot = await getDocs(postsCol);
        const { docs} = await snapshot;
        let arr = []
        docs.forEach((doc) => {
          arr.push({
            data: doc.data(),
            id: doc.id
          })
        })
        console.log(arr)
      } catch (err) {
        console.error(err);
      }
    }
    fetchPosts()
  }, []);
  return (
    <div>
      <button type="button">Home</button>
    </div>
  );
}
