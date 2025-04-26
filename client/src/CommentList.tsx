enum CommentStatus {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
}

export interface IComment {
  id: string;
  content: string;
  status: CommentStatus;
}

const CommentList = ({ comments }: { comments: Array<IComment> }) => {
  const renderedComments = Object.values(comments).map((comment) => {
    let content = "";

    if (comment.status === CommentStatus.Approved) {
      content = comment.content;
    } else if (comment.status === CommentStatus.Pending) {
      content = "This comment is awaiting moderation";
    } else if (comment.status === CommentStatus.Rejected) {
      content = "This comment has been rejected";
    }
    return (
      <li key={comment.id} className="items-left gap-4 text-md text-black">
        {content} (#{comment.id})
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
