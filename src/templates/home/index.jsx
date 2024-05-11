import './styles.css';

import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/Textinput';
import { useState, useEffect, useCallback } from 'react';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  const handleLoadPosts = useCallback(async (posts, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  function loadMorePosts() {
    const nextPage = page + postsPerPage;
    const newPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...newPosts);

    setPosts(posts);
    setPage(nextPage);
  }

  function handleChange(e) {
    const { value } = e.target;
    setSearchValue(value);
  }

  return (
    <section className="container">
      <div className="searchContainer">
        {!!searchValue && <h1>Search Value: {searchValue}</h1>}

        <TextInput searchValue={searchValue} handleChange={handleChange} />
      </div>

      {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}

      {filteredPosts.length === 0 && <p className="not-exists">Posts not exists! XD</p>}

      <div className="button-container">
        {!searchValue && <Button text={'load More Posts'} onClick={loadMorePosts} disabled={noMorePosts}></Button>}
      </div>
    </section>
  );
};
