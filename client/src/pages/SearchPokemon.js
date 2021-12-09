import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";

import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { searchPokemon } from "../utils/API";
import { savePokemonIds, getSavedPokemonIds } from "../utils/localStorage";
import { SAVE_POKEMON } from "../utils/mutations";

const SearchPokemon = () => {
  const [searchedPokemon, setSearchedPokemon] = useState([]);

  const [searchInput, setSearchInput] = useState("");

  const [savedPokemonIds, setSavedPokemonIds] = useState(getSavedPokemonIds());
  const [savePokemon, { error }] = useMutation(SAVE_POKEMON);

  useEffect(() => {
    return () => savePokemonIds(savedPokemonIds);
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchPokemon(searchInput);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const pokemonData = await response.json();

      setSearchedPokemon(pokemonData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSavePokemon = async (pokemonId) => {
    const pokemonToSave = searchedPokemon.find(
      (searchedPokemon) => searchedPokemon.id === pokemonId
    );

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await savePokemon({
        variables: { pokemonData: { ...pokemonToSave } },
      });

      if (!data) {
        throw new Error("something went wrong!");
      }

      setSavedPokemonIds([...savedPokemonIds, pokemonToSave.id]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className="text-warning bg-danger">
        <Container>
          <h1>Search The PokéDex!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a pokemon"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="primary" size="lg">
                  Catch Them All
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedPokemon.name
            ? `Viewing ${searchedPokemon.name}!`
            : "Search for a pokemon to begin"}
        </h2>
        <CardColumns>
          <Card key={searchedPokemon.id} border="danger">
            {searchedPokemon.name ? (
              <Card.Img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${searchedPokemon.id}.png`}
                alt={`The cover for ${searchedPokemon.name}`}
                variant="top"
              />
            ) : null}
            <Card.Body>
              <Card.Title>{searchedPokemon.name}</Card.Title>
              <Card.Text>{searchedPokemon.id}</Card.Text>
              {Auth.loggedIn() && (
                <Button
                  disabled={savedPokemonIds?.some(
                    (savedPokemonId) => savedPokemonId === searchedPokemon.id
                  )}
                  className="btn-block btn-info"
                  onClick={() => handleSavePokemon(searchedPokemon.id)}
                >
                  {savedPokemonIds?.some(
                    (savedPokemonId) => savedPokemonId === searchedPokemon.id
                  )
                    ? "This Pokemon has already been saved!"
                    : "Catch this Pokemon!"}
                </Button>
              )}
            </Card.Body>
          </Card>
          
        </CardColumns>
        {error && <div>Something went wrong</div>}
      </Container>
    </>
  );
};

export default SearchPokemon;
