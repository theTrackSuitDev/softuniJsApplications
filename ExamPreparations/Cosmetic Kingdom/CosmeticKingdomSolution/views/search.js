import { html, render, nothing, setActiveNav, htmlContainer } from "../utils.js";
import { getBySearch } from "../endRequests.js";

const beforeSearchTemplate = () => html`
<section id="searchPage">
            <h1>Search by Name</h1>

            <div class="search">
                <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
                <button class="button-list" @click=${searchByName}>Search</button>
            </div>

            <h2>Results:</h2>
        </section>
`;

async function searchByName() {
    const searchInput = document.querySelector("#search-input").value;
    if (searchInput === "") {
        alert("Search filed is required!");
        return;
    }

    let items = await getBySearch(searchInput);

        let resultsTemplate = (items) => html`
        <section id="searchPage">
            <h1>Search by Name</h1>

            <div class="search">
                <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name" value="${searchInput}">
                <button class="button-list" @click=${searchByName}>Search</button>
            </div>

            <h2>Results:</h2>

            <div class="search-result">
                ${items.length > 0 ? html`
                    ${items.map(item => html`
                        <div class="card-box">
                            <img src=".${item.imgUrl}">
                            <div>
                                <div class="text-center">
                                    <p class="name">Name: ${item.name}</p>
                                    <p class="artist">Artist: ${item.artist}</p>
                                    <p class="genre">Genre: ${item.genre}</p>
                                    <p class="price">Price: $${item.price}</p>
                                    <p class="date">Release Date: ${item.releaseDate}</p>
                                </div>
                                <div class="btn-group">
                                    ${sessionStorage.accessToken ? html`
                                    <a href="/details/${item._id}" id="details">Details</a>
                                    `: nothing}
                                </div>
                            </div>
                        </div>
                    `)}
                `: html `
                    <p class="no-result">No result.</p>
                    `
                }                
            </div>
        </section>
        `;

    render(resultsTemplate(items), htmlContainer);
}

export async function searchView() {
    setActiveNav();

    render(beforeSearchTemplate(), htmlContainer);
}