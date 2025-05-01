import axios from "axios";
import { FormEvent, useState } from "react";

const PostCreate = () => {
  const [title, setTitle] = useState("");

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await axios.post("http://posts.com/posts", { title });

    setTitle("");
  };

  return (
    <div className="p-6 shadow-lg rounded-md w-300 flex flex-col justify-center items-left gap-4">
      <h2 className="text-2xl font-bold text-blue-700 text-left">
        Create Post
      </h2>
      <form className="flex flex-col gap-6" onSubmit={submitForm}>
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-xl text-black-300">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className=" p-2 border-3 border-blue-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-700 p-4 w-50 rounded-md text-white text-xl font-bolder"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default PostCreate;
