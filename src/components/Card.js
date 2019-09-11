import React from "react";
import faker from "faker";
import { withRouter } from "react-router-dom";

export function timestampToDate(ts) {
  var d = new Date();
  d.setTime(ts);
  return (
    ("0" + d.getDate()).slice(-2) +
    "." +
    ("0" + (d.getMonth() + 1)).slice(-2) +
    "." +
    d.getFullYear()
  );
}

function Card({ post, history }) {
  return post ? (
    <div className="card" onClick={() => history.push(`/posts/${post.id}`)}>
      <div className="close" />
      <img className="avatar" src={faker.image.avatar()} alt="avatar" />
      <div className="content">
        <div className="author">{faker.name.firstName()}</div>
        <div>Created: {timestampToDate(post.created)}</div>
        <h1>{post.content}</h1>
      </div>
    </div>
  ) : null;
}

export default withRouter(Card);
