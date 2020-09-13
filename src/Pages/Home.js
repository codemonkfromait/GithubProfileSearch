import React, { useContext } from "react";
import {
  InputGroup,
  InputGroupAddon,
  Input,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";
import { toast } from "react-toastify";
import { UserContext } from "../Context/UserContext";
import { Redirect } from "react-router-dom";
import { useState } from "react";
import Repos from "../Components/Repos";
import UserCard from "../Components/UserCard";
import Axios from "axios";

export default function Home() {
  const context = useContext(UserContext);
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null);

  const fetchDetails = async () => {
    try {
      const { data } = await Axios.get(`https://api.github.com/users/${query}`);
      console.log(data);
      setUser(data);
    } catch (error) {
      toast("Not able to find user", { type: "error" });
    }
  };

  //put this code behind login

  if (!context.user?.uid) {
    return <Redirect to="/signin" />;
  }

  return (
    <Container>
      <Row className="mt-3">
        <Col md="5">
          <InputGroup>
            <Input
              type="text"
              value={query}
              placeholder="Enter username for search"
              onChange={(event) => setQuery(event.target.value)}
            />
            <InputGroupAddon addonType="append">
              <Button color="primary" onClick={fetchDetails}>
                Fetch user
              </Button>
            </InputGroupAddon>
          </InputGroup>
          {user ? <UserCard user={user} /> : null}
        </Col>

        <Col md="7">{user ? <Repos repos_url={user.repos_url} /> : null}</Col>
      </Row>
    </Container>
  );
}
