import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import { ListGroup, ListGroupItem } from "reactstrap";

export default function Repos({ repos_url }) {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchRepos = async () => {
      const { data } = await Axios.get(repos_url);
      setRepos(data);
    };
  }, [repos_url]);

  return (
    <ListGroup>
      {repos.map((repo) => (
        <ListGroupItem key={repo.id}>
          <div className="text-secondary">{repo.name}</div>
          <div className="text-danger">{repo.language}</div>
          <div className="text-success">{repo.description}</div>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}
