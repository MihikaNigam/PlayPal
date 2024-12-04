import { css, html } from "@calpoly/mustang/server";
import { Gamer } from "../models";
import renderPage from "./renderPage";

export class GamerPage {
    data: Gamer;
    constructor(data: Gamer) {
        this.data = data;
    }
    render() {
        return renderPage({
            body: this.renderBody(),
            styles: [
                css`
                    main.page {
                        --page-grids: 8;
                        @media screen and (max-width: 48rem) {
                        --page-grids: 6;
                        }
                    }
                `
            ],
            scripts: [
                `import { define, Auth } from "@calpoly/mustang";
                import { GamerProfileElement } from "/scripts/gamer_profile.js";
                
                define({
                    "gamer-profile": GamerProfileElement,
                    "mu-auth": Auth.Provider,
                });`
            ]
        });
    }
    renderBody() {
        const {
            _id: userid
        } = this.data;
        const endpoint = `/gamers/${userid}`;
        const apiEndpoint = `/api${endpoint}`;


        return html`
        <mu-auth provides="playpal:auth">
            <pp-header></pp-header>
            <gamer-profile src= "${apiEndpoint}"></gamer-profile>
        </mu-auth>
    `
    }
}
