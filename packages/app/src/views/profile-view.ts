import {
    define,
    Form,
    History,
    View
} from "@calpoly/mustang";
import {  html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Gamer } from "server/models";
//   import { AvatarElement } from "../components/traveler-avatar";
import { Msg } from "../messages";
import { Model } from "../model";
// import resetCSS from "../styles/reset.css";


class ProfileViewer extends LitElement {
    @property()
    username?: string;

    render() {
        return html`
        <h2>Gamer Profile</h2>
      <section class="grid-container">
        <div class="flex-container">
          <div class="column">
            <div class="profile-container">
              <img slot="avatar" class="avatar-image" src="" alt="Avatar" />
            </div>
            <div>
              <p><strong>Name:</strong> <slot name="name">Johnson</slot></p>
              <p>
                <strong>Email:</strong>
                <slot name="email">Johnson@example.com</slot>
              </p>
              <p>
                <strong>Bio:</strong> <slot name="bio">Johnson is a goat</slot>
              </p>
              <p>
                <strong>Last Online:</strong>
                <slot name="name">lastOnline</slot>
              </p>
            </div>
          </div>
        </div>
        <div class="flex-container">
          <p><strong>Games Played Recently:</strong></p>
          <ul>
            <slot name="games">
              <li><a href="../game/apex.html">Apex Legends</a></li>
              <li><a href="../game/overwatch.html">Overwatch</a></li>
            </slot>
          </ul>
          <p><strong>Lobby List:</strong></p>
          <ul>
            <slot name="teams">
              <li><a href="../teams/lobby.html">Default Lobby</a></li>
            </slot>
          </ul>
        </div>
      </section>
      `;
    }

    // static styles = [
    //     resetCSS,
    //     css`
    //     * {
    //       margin: 0;
    //       box-sizing: border-box;
    //     }
    //     section {
    //       display: grid;
    //       grid-template-columns: [key] 1fr [value] 3fr [controls] 1fr [end];
    //       gap: var(--size-spacing-medium)
    //         var(--size-spacing-xlarge);
    //       align-items: end;
    //     }
    //     .profile-container {
    //   width: 120px;
    //   height: auto;
    // }

    // .row div {
    //   display: flex;
    //   gap: 20px;
    //   align-items: center;
    // }
    // h2 {
    //   text-align: center;
    //   color: var(--color-accent);
    //   padding-bottom: 20px;
    //   padding-top: 20px;
    //   margin-bottom: 20px;
    // }
    // strong {
    //   color: var(--color-accent);
    // }

    // .grid-container {
    //   display: grid;
    //   grid-template-columns: repeat(2, 1fr);
    // }

    // .flex-container {
    //   display: flex;
    //   flex-direction: column;
    //   gap: 20px;
    //   padding: 10px;
    // }

    // ul {
    //   padding: 0;
    //   margin: 0;
    //   list-style: none;
    // }

    // ul li {
    //   margin-bottom: 8px;
    // }

    // ul li a {
    //   color: var(--color-primary);
    //   text-decoration: none;
    // }

    // ul li a:hover {
    //   text-decoration: underline;
    // }
    //   `
    // ];
}

export class ProfileEditor extends LitElement {
    static uses = define({
        "mu-form": Form.Element
    });

    @property()
    username?: string;

    @property({ attribute: false })
    init?: Gamer;

    // static styles = [resetCSS, css`
    //     mu-form {
    //     grid-column: key / end;
    //   }
    //   mu-form input {
    //     grid-column: input;
    //   }
    //   mu-form label:has(input[type="file"]) {
    //     grid-row-end: span 4;
    //   }
    //     `];

    render() {
        return html`
        <section>
          <h1>Edit Profile</h1>
          <nav>
            <a class="close" href="../${this.username}">Close</a>
            <button class="delete">Delete</button>
          </nav>
          <mu-form .init=${this.init} @mu-form:submit=${this._handleSubmit}>
            <label>
              <span>Username</span>
              <input disabled name="userid" />
            </label>
            <label>
              <span>Name</span>
              <input name="name" type="text" placeholder="Your Name" />
            </label>
            <label>
              <span>Email</span>
              <input name="email" type="email" placeholder="name@example.com" />
            </label>
            <label>
              <span>Bio</span>
              <input name="bio" type="text" placeholder="Short bio" />
            </label>
            <label>
              <span>Last Online</span>
              <input name="lastOnline" type="text" placeholder="e.g. Today at 5PM" />
            </label>
            <label>
              <span>Avatar</span>
              <input
                name="avatar"
                type="file"
                @change=${this._handleAvatarSelected} />
            </label>
            <slot name="avatar"></slot>
            <label>
              <span>Nickname</span>
              <input name="nickname" type="text" placeholder="Nickname" />
            </label>
            <label>
              <span>Home City</span>
              <input name="home" type="text" placeholder="Home City" />
            </label>
            <label>
              <span>Color</span>
              <input type="color" name="color" />
            </label>
          </mu-form>
        </section>
      `;
    }

    _handleSubmit(event: Form.SubmitEvent<Gamer>) {
        const detail = event.detail;
        this.dispatchEvent(
            new CustomEvent("profile:submit", {
                bubbles: true,
                composed: true,
                detail
            })
        );
    }

    async _handleAvatarSelected(ev: Event) {
        const target = ev.target as HTMLInputElement;
        const selectedFile = (target.files as FileList)[0];
        if (!selectedFile) return;

        const url = await new Promise<string>((resolve, reject) => {
            const fr = new FileReader();
            fr.onload = () => resolve(fr.result as string);
            fr.onerror = (err) => reject(err);
            fr.readAsDataURL(selectedFile);
        });

        this.dispatchEvent(
            new CustomEvent("profile:new-avatar", {
                bubbles: true,
                composed: true,
                detail: url
            })
        );
    }
}

export class ProfileViewElement extends View<Model, Msg> {
    static uses = define({
        "profile-viewer": ProfileViewer,
        "profile-editor": ProfileEditor,
    });

    @property({ type: Boolean, reflect: true })
    edit = false;

    @property({ attribute: "user-id", reflect: true })
    userid = "";

    @state()
    get profile(): Gamer | undefined {
        return this.model.profile;
    }

    @state()
    newAvatar?: string;

    constructor() {
        super("playpal:model");

        this.addEventListener(
            "profile:new-avatar",
            (event: Event) => {
                this.newAvatar = (event as CustomEvent)
                    .detail as string;
            }
        );
    }

    attributeChangedCallback(
        name: string,
        oldValue: string,
        newValue: string
    ) {
        super.attributeChangedCallback(name, oldValue, newValue);
        if (
            name === "user-id" &&
            oldValue !== newValue &&
            newValue
        ) {
            console.log("Profiler Page:", newValue);
            this.dispatchMessage([
                "profile/select",
                { userid: newValue }
            ]);
        }
    }

    render() {
        const {
            avatar,
            name,
            userId,
            // email,
            // bio,
            // lastOnline,
            games = [],
            teams = []
        } = this.profile || {};
        const initial = (name || userId || "?").slice(
            0,
            1
        );
        const games_html = games.map(
            (s) => html` <li>${s}</li> `
        );
        const teams_html = teams.map(
            (s) => html` <li>${s}</li> `
        );

        const fields = html`
        <traveler-avatar
          slot="avatar"
          src=${this.newAvatar || avatar}
          initial=${initial}></gamer-avatar>
      `;

        return this.edit
            ? html`
            <profile-editor
              username=${name}
              .init=${this.profile}
              @mu-form:submit=${(
                event: Form.SubmitEvent<Gamer>
            ) => this._handleSubmit(event)}>
              ${fields}
            </profile-editor>
          `
            : html`
            <profile-viewer username=${name}>
              ${fields}
              <span slot="name">${name}</span>
              <span slot="userid">${userId}</span>
              <ul slot="games">
                ${games_html}
              </ul>
               <ul slot="lobbies">
                ${teams_html}
              </ul>
            </profile-viewer>
          `;
    }

    _handleSubmit(event: Form.SubmitEvent<Gamer>) {
        console.log("Handling submit of mu-form");
        const profile = this.newAvatar
            ? { ...event.detail, avatar: this.newAvatar }
            : event.detail;
        this.dispatchMessage([
            "profile/save",

            {
                userid: this.userid,
                profile,
                onSuccess: () =>
                    History.dispatch(this, "history/navigate", {
                        href: `/app/profile/${this.userid}`
                    }),
                onFailure: (error: Error) =>
                    console.log("ERROR:", error)
            }
        ]);
    }

    // static styles = [resetCSS];
}