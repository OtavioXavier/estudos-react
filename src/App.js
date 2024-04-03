import "./App.css";
import { Component } from "react";
import { PostCard } from './components/PostCard';

class App extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    this.loadPosts();
  }

  loadPosts = async () => {
    const postsResponse = fetch("https://jsonplaceholder.typicode.com/posts"); //Requisição de posts
    const photosResponse = fetch("https://jsonplaceholder.typicode.com/photos"); //Requisição de photos

    const [posts, photos] = await Promise.all([postsResponse, photosResponse]); //response de posts e photos

    const postsJson = await posts.json(); //tratamento de posts
    const photosJson = await photos.json(); //tratamento de photos

    const postsAndPhotos = postsJson.map((post, index) => {
      return { ...post, cover: photosJson[index].url };
    });

    this.setState({ posts: postsAndPhotos }); //agregando o valor de posts ao estado
  };

  render() {
    const { posts } = this.state;
    return (
      <section className="container">
        <div className="posts">
          {posts.map((post) => (
           
           <PostCard 
            title={post.title}
            body={post.body}
            id={post.id}
            cover={post.cover}
            key={post.id}/>
          ))}
        </div>
      </section>
    );
  }
}

export default App;
