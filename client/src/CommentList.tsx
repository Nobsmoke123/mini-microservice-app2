interface IComment {
  id: string;
  content: string;
}

const CommentList = ({ comments }: { comments: Array<IComment> }) => {
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
