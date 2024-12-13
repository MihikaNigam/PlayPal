import { Auth, Observer } from "@calpoly/mustang";
import {  html, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { Game } from "server/models";

export class HomeViewElement extends LitElement {
    src = "/api/games";

    @state()
    gameIndex = new Array<Game>();

    _authObserver = new Observer<Auth.Model>(
        this,
        "playpal:auth"
    );

    _user = new Auth.User();

    connectedCallback() {
        super.connectedCallback();
        this._authObserver.observe(({ user }) => {
            if (user) {
                this._user = user;
            }
            this.hydrate(this.src);
        });
    }

    hydrate(url: string) {
        fetch(url, {
            headers: Auth.headers(this._user)
        })
            .then((res: Response) => {
                if (res.status === 200) return res.json();
                throw `Server responded with status ${res.status}`;
            })
            .then((json: unknown) => {
                if (json) {
                    console.log('WE HAVE A JSON? :', json)
                    const games = json as Array<Game>;
                    this.gameIndex = games;
                }
            })
            .catch((err) =>
                console.log("Failed to fetch games data:", err)
            );
    }

    render() {
        const gameList = this.gameIndex.map(this.renderItem);
        return html`
        <main class="page">
            <h3>Trending Games Right Now 🔥</h3>
            <section class="three-grid-container">${gameList}</section>
        </main>
        `;
    }

    renderItem(game: Game) {
        const { _id } = game;

        return html`
        <article class="card">
            <a href="games/${_id}">
              <game-instance src="/api/games/${_id}"></game-instance>
            </a>
          </article>
        `;
    }



}

