import axios from "axios";
import { FormEvent, useState } from "react";

const CommentCreate = ({ postId }: { postId: string }) => {
  const [comment, setComment] = useState("");

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios.post(`http://posts.com/posts/${postId}/comments`, {
      content: comment,
    });
    setComment("");
  };

  return (
    <div>
      <div>
        <form
          className="flex flex-col gap-4 justify-start items-start"
          onSubmit={submitForm}
        >
          <div className="flex flex-col gap-2 mt-4">
            <label htmlFor="comment" className="text-xl text-black font-bold">
              Comment:
            </label>
            <input
              type="text"
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border-3 border-blue-700 w-80 p-1 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-700 text-xl w-50 text-white font-bold p-2 rounded-md"
          >
            Add Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentCreate;
