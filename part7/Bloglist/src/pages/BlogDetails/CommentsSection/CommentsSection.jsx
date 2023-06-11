import CommentForm from '../CommentForm/CommentForm';

const CommentsSection = ({ comments }) => (
  <div>
    <h2>Comments</h2>
    <CommentForm />
    {comments.length ? <ul>{comments}</ul> : <p>Be the first to comment!</p>}
  </div>
);

export default CommentsSection;
