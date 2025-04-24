import axios from "axios";
import { useState, useEffect } from "react";

interface IPost {
  id: string;
  title: string;
}

const PostList = () => {
  const [posts, setPosts]: [
    Record<string, IPost>,
    React.Dispatch<React.SetStateAction<IPost>>
  ] = useState({});

  const fetchPosts = async () => {
    const response = await axios.get("http://localhost:4000/posts");
    setPosts(response.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div key={post.id}>
        <div className="p-6 shadow-lg rounded-md w-100 flex flex-col justify-center items-left gap-4">
          <h2 className="text-2xl font-bold text-blue-700 text-left">
            {post.title}
          </h2>
        </div>
      </div>
    );
  });

  return (
    <div className="flex flex-col p-8 justify-start items-start border-3 border-gray-100 w-300  overflow-x-scroll">
      <h1 className="text-2xl font-bold text-blue-700 text-left">Post List</h1>
      <div className="flex gap-4 mt-4">{renderedPosts}</div>
    </div>
  );
};

export default PostList;
