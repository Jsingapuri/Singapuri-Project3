import React from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import { removePokemon } from "../utils/localStorage";
import { REMOVE_POKEMON } from "../utils/mutations";
import { GET_USER } from "../utils/queries";

const SavedPokemon = () => {
  const { loading, data } = useQuery(GET_USER);
  const userData = data?.getSingleUser || [];
  console.log(Auth.getToken());
  const [removePokemon, { error }] = useMutation(REMOVE_POKEMON);

  const handleDeletePokemon = async (pokemon) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removePokemon({ variables: { pokemon } });

      if (!data) {
        throw new Error("something went wrong!");
      }

      removePokemon(pokemon);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing saved Pokemon!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedPokemon.length
            ? `Viewing ${userData.savedPokemon.length} saved ${
                userData.savedPokemon.length === 1 ? "pokemon" : "pokemon"
              }:`
            : "You have no saved pokemon!"}
        </h2>
        <CardColumns>
          {userData.savedPokemon.map((pokemon) => {
            return (
              <Card key={pokemon.pokemonId} border="dark">
                {pokemon.image ? (
                  <Card.Img
                    src={pokemon.image}
                    alt={`The cover for ${pokemon.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{pokemon.title}</Card.Title>
                  <p className="small">Authors: {pokemon.authors}</p>
                  <Card.Text>{pokemon.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeletePokemon(pokemon.pokemonId)}
                  >
                    Delete this Pokemon!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
        {error && <div>Something went wrong</div>}
      </Container>
    </>
  );
};

export default SavedPokemon;
