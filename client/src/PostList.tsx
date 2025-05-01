import axios from "axios";
import { useState, useEffect } from "react";
import CommentCreate from "./CommentCreate";
import CommentList, { IComment } from "./CommentList";

interface IPost {
  id: string;
  title: string;
  comments: Array<IComment>;
}

const PostList = () => {
  const [posts, setPosts]: [
    Record<string, IPost>,
    React.Dispatch<React.SetStateAction<Record<string, IPost>>>
  ] = useState({});

  const fetchPosts = async () => {
    const response = await axios.get("http://posts.com/posts");
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
            {post.title} (#{post.id})
          </h2>
          <div className="mt-4">
            <CommentList comments={post.comments} />
          </div>
          <div>
            <CommentCreate postId={post.id} />
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="flex flex-col p-8 justify-start items-start border-3 border-gray-100 w-300  overflow-x-scroll">
      <h1 className="text-2xl font-bold text-blue-700 text-left">Posts List</h1>
      <div className="flex gap-4 mt-4">{renderedPosts}</div>
    </div>
  );
};

export default PostList;
