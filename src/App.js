import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import axios from "axios";
import nanoid from "nanoid";

import "./App.css";

import Card from "./components/Card";
import Create from "./components/Create";
import CardEdit from "./components/CardEdit";

class App extends React.Component {
  state = {
    posts: []
  };
  componentDidMount() {
    this.getPosts();
  }
  setData = posts => {
    this.setState({ posts });
  };
  getPosts = () => {
    axios
      .get("http://localhost:7777/posts")
      .then(response => this.setData(response.data));
  };
  handleOnRemove = id => e => {
    axios
      .delete("http://localhost:7777/posts/" + id)
      .then(response => this.setData(response.data));
  };
  render() {
    const { posts } = this.state;
    return (
      <div className="App">
        <Router>
          <Link to="/">
            <button className="button">Домашняя страница</button>
          </Link>
          <Link to="/posts/new">
            <button className="button">Создать пост</button>
          </Link>
          <Switch>
            <Route
              path="/posts/new"
              exact
              component={() => <Create setData={this.setData} />}
            />
            <Route
              path="/posts/:id"
              exact
              component={() => <CardEdit onRemove={this.handleOnRemove} />}
            />
            <Route
              path="/"
              exact
              component={() => (
                <div className="list">
                  {posts &&
                    posts.map(post => <Card key={nanoid()} post={post} />)}
                </div>
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
