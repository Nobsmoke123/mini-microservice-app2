import { useState, useEffect } from "react";

const PostList = () => {
  const [posts, setPosts] = useState({});
  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-700">Post List</h1>
    </div>
  );
};

export default PostList;
