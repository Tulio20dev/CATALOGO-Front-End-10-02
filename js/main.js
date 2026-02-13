const API_KEY = "9ed4d53db23dc98cfda64348b807b218";
const API_URL = "https://api.themoviedb.org/3";
const API_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const campoPesquisa= document.getElementById("campoPesquisa");
const botaoPesquisa= document.getElementById("botaoPesquisa");
const filmesGrid = document.getElementById("filmesGrid");

async function requisicaoFilmes(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Erro na requisição");
    } const data = await response.json();
        renderizarFilmes(data.results);
    
    } catch (error) {
        console.error("Erro: ", error);
        filmesGrid.innerHTML = "<p>erro ao carregar os filmes.</p>";
    }
}
function buscaFilme()  {
    const informacao = campoPesquisa.value.trim()
    if (informacao === "") {
        window.location.reload() ;
        return;
    }
    console.log("Pesquisando por: ", informacao);
    const url = `${API_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(informacao)}&language=pt-BR`;
    requisicaoFilmes(url);
    campoPesquisa.value = ""
}
function renderizarFilmes(filmes) {
    filmesGrid.innerHTML = "";
    if (!filmes || filmes.length === 0) {
        filmesGrid.innerHTML = "<p>Nenhum filme encontrado.</p>";
        return;
    }
    filmes.forEach(filme => {
        const card = document.createElement("div");
        card.classList.add("card");
        const imagem = filme.poster_path
            ? API_IMAGE_URL + filme.poster_path
            : "";
        card.innerHTML = `
            <img src="${imagem}" alt="${filme.title}">
            <h3>${filme.title}</h3>
            <p>${filme.vote_average}
            ${filme.overview}
            ${filme.genre_ids}
            ${filme.release_date}
            </p>
        `;
        filmesGrid.appendChild(card);
        
    });
}
botaoPesquisa.addEventListener("click", buscaFilme);
campoPesquisa.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        buscaFilme();
    }
});