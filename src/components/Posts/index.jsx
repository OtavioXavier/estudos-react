import { PostCard } from '../PostCard';
import './styles.css';

import P from 'prop-types';

export const Posts = ({ posts = [] }) => (
  <div className="posts">
    {posts.map((post) => (
      <PostCard title={post.title} body={post.body} id={post.id} cover={post.cover} key={post.id} />
    ))}
  </div>
);

Posts.propTypes = {
  posts: P.arrayOf(
    P.shape({
      title: P.string.isRequired,
      body: P.string.isRequired,
      cover: P.string.isRequired,
      id: P.number.isRequired,
    }),
  ),
};
