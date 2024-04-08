import "./styles.css";

import { Component } from "react";

import { loadPosts } from "../../utils/load-posts";
import { Posts } from "../../components/Posts";
import { Button } from "../../components/Button";
import { TextInput } from '../../components/Textinput';

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
    searchValue: "",
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  };

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;
    const nextPage = page + postsPerPage;
    const newPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    posts.push(...newPosts);

    this.setState({ posts, page: nextPage });

    console.log(page, postsPerPage, nextPage, nextPage + postsPerPage);
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  };

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue
      ? allPosts.filter((post) => {
          return post.title.toLowerCase().includes(searchValue.toLowerCase());
        })
      : posts;

    return (
      <section className="container">
        <div className="searchContainer">
        {!!searchValue && <h1>Search Value: {searchValue}</h1>}

        <TextInput searchValue={searchValue} handleChange={this.handleChange}/>

        </div>

        {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}

        {filteredPosts.length === 0 && <p className="not-exists">Posts not exists! XD</p>}


        <div className="button-container">
          {!searchValue && (
            <Button
              text={"load More Posts"}
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            ></Button>
          )}
        </div>
      </section>
    );
  }
}
