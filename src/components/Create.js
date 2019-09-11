import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Create({ setData }) {
  const [postText, setPostText] = useState("");
  const postUrl = "http://localhost:7777/posts";

  const handleChange = e => {
    const text = e.target.value;
    setPostText(text);
  };

  const handleClick = () => {
    const newNote = { id: 0, content: postText };
    axios
      .post(postUrl, newNote)
      .then(() => axios.get(postUrl))
      .then(response => setData(response.data));
  };

  return (
    <div className="create">
      <h1>Create post</h1>
      <div className="create__content">
        <textarea rows="3" cols="50" onChange={handleChange} />
        <Link to="/" onClick={handleClick}>
          <button className="button">Опубликовать</button>
        </Link>
      </div>
    </div>
  );
}
