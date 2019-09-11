import React, { useState, useEffect } from "react";
import faker from "faker";
import { timestampToDate } from "./Card";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";

function CardEdit({ match, onRemove }) {
  const postsUrl = "http://localhost:7777/posts/";

  const [post, setPost] = useState("");
  const id = match.params.id;

  useEffect(() => {
    axios.get(postsUrl + id).then(response => setPost(response.data));
  }, [id]);

  return (
    <div className="card">
      <div className="close" />
      <img className="avatar" src={faker.image.avatar()} alt="avatar" />
      <div className="content">
        <div className="author">{faker.name.firstName()}</div>
        <div>Created: {timestampToDate(post.created)}</div>
        <h1>{post.content}</h1>
        <Link to="/">
          <button className="form-button">Вернуться</button>
        </Link>
        <Link to="/">
          <button onClick={onRemove(id)} className="button-delete">
            Удалить
          </button>
        </Link>
      </div>
    </div>
  );
}

export default withRouter(CardEdit);
