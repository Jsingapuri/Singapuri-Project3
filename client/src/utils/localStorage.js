export const getSavedPokemonIds = () => {
  const savedPokemonIds = localStorage.getItem("saved_pokemon")
    ? JSON.parse(localStorage.getItem("saved_pokemon"))
    : [];

    return savedPokemonIds;
};
export const savePokemonIds = (pokemonIdArr) => {
  if (pokemonIdArr.length) {
    localStorage.setItem("saved_pokemon", JSON.stringify(pokemonIdArr));
  } else {
    localStorage.removeItem("saved_pokemon");
  }
};
export const removePokemonId = (pokemonId) => {
  const savedPokemonIds = localStorage.getItem("saved_pokemon")
  ? JSON.parse(localStorage.getItem("saved_pokemon"))
  : null;

  if (!savedPokemonIds) {
    return false;
  }
const updatedSavedPokemonIds = savedPokemonIds?.filter(
  (savedPokemonId) => savedPokemonId !== pokemonId
  );
  localStorage.setItem("saved_pokemon", JSON.stringify(updatedSavedPokemonIds));

  return true;
};



// export const getSavedBookIds = () => {
//   const savedBookIds = localStorage.getItem('saved_books')
//     ? JSON.parse(localStorage.getItem('saved_books'))
//     : [];

//   return savedBookIds;
// };
// export const saveBookIds = (bookIdArr) => {
//   if (bookIdArr.length) {
//     localStorage.setItem('saved_books', JSON.stringify(bookIdArr));
//   } else {
//     localStorage.removeItem('saved_books');
//   }
// };
// export const removeBookId = (bookId) => {
//   const savedBookIds = localStorage.getItem("saved_books")
//     ? JSON.parse(localStorage.getItem("saved_books"))
//     : null;

//   if (!savedBookIds) {
//     return false;
//   }

//   const updatedSavedBookIds = savedBookIds?.filter(
//     (savedBookId) => savedBookId !== bookId
//   );
//   localStorage.setItem("saved_books", JSON.stringify(updatedSavedBookIds));

//   return true;
// };