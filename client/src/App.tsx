import PostCreate from "./PostCreate";
import PostList from "./PostList";

export default function App() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-center text-3xl font-extrabold text-blue-700">
        Blog App
      </h1>
      <main className="flex flex-col items-center gap-10">
        <PostCreate />
        <PostList />
      </main>
    </div>
  );
}
