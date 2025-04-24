import axios from "axios";
import { useEffect, useState } from "react";

interface IComment {
  id: string;
  content: string;
}
const CommentList = ({ postId }: { postId: string }) => {
  const [comments, setComments]: [
    Record<string, IComment>,
    React.Dispatch<React.SetStateAction<Record<string, IComment>>>
  ] = useState({});

  const fetchComments = async () => {
    const response = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    );

    setComments(response.data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const renderedComments = Object.values(comments).map((comment) => {
    return (
      <li key={comment.id} className="items-left gap-4 text-md text-black">
        {comment.content} (#{comment.id})
      </li>
    );
  });

  return (
    <div className="h-35 overflow-y-scroll">
      <p>
        {Object.values(comments).length} comment
        {Object.values(comments).length > 1 ? "s" : ""}
      </p>
      <ul className="flex flex-col gap-2 p-2 list-disc">{renderedComments}</ul>
    </div>
  );
};

export default CommentList;
