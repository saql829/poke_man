function fetchData() {
    const imgElement = document.getElementById("pokemonSprite");
    const detailsElement = document.getElementById("pokemonDetails");

    const pokemonName = document.getElementById("pokemonName").value.toLowerCase();

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Could not fetch the Pokémon details. Please check the name.");
            }
            return response.json();
        })
        .then(data => {
            const pokemonSprite = data.sprites.front_default;
            imgElement.src = pokemonSprite;
            imgElement.style.display = "block";

            // Details of Pokémon
            document.getElementById("name").innerText = `Name: ${data.name}`;
            document.getElementById("height").innerText = `Height: ${data.height}`;
            document.getElementById("weight").innerText = `Weight: ${data.weight}`;
            const types = data.types.map(typeInfo => typeInfo.type.name).join(", ");
            document.getElementById("type").innerText = `Type(s): ${types}`;

            detailsElement.style.display = "block";
        })
        .catch(error => {
            console.error(error.message);
            imgElement.style.display = "none";
            detailsElement.style.display = "none";
            alert(error.message);
        });
}
