import { Auth, Update } from "@calpoly/mustang";
import {
    Game,
    Gamer
} from "server/models";
import { Msg } from "./messages";
import { Model } from "./model";

export default function update(
    message: Msg,
    apply: Update.ApplyMap<Model>,
    user: Auth.User
) {
    switch (message[0]) {
        case "profile/save":
            saveProfile(message[1], user)
                .then((profile) =>
                    apply((model) => ({ ...model, profile }))
                )
                .then(() => {
                    const { onSuccess } = message[1];
                    if (onSuccess) onSuccess();
                })
                .catch((error: Error) => {
                    const { onFailure } = message[1];
                    if (onFailure) onFailure(error);
                });
            break;
        case "profile/select":
            selectProfile(message[1], user).then((profile) =>
                apply((model) => ({ ...model, profile }))
            );
            break;
        case "game/index":
            indexGames(user).then((gameIndex: Game[] | undefined) =>
                apply((model) => ({ ...model, gameIndex }))
            );
            break;
        case "game/select":
            selectGame(message[1], user).then(
                (game: Game | undefined) =>
                    apply((model) => ({ ...model, game }))
            );
            break;
        default:
            const unhandled: never = message[0];
            throw new Error(`Unhandled message "${unhandled}"`);
    }
}

function saveProfile(
    msg: {
        userid: string;
        profile: Gamer;
    },
    user: Auth.User
) {
    return fetch(`/api/profiles/${msg.userid}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...Auth.headers(user)
        },
        body: JSON.stringify(msg.profile)
    })
        .then((response: Response) => {
            if (response.status === 200) return response.json();
            else
                throw new Error(
                    `Failed to save profile for ${msg.userid}`
                );
        })
        .then((json: unknown) => {
            if (json) return json as Gamer;
            return undefined;
        });
}

function selectProfile(
    msg: { userid: string },
    user: Auth.User
) {
    return fetch(`/api/profiles/${msg.userid}`, {
        headers: Auth.headers(user)
    })
        .then((response: Response) => {
            if (response.status === 200) {
                return response.json();
            }
            return undefined;
        })
        .then((json: unknown) => {
            if (json) {
                console.log("Gamer:", json);
                return json as Gamer;
            }
        });
}

function selectGame(msg: { gameid: string }, user: Auth.User) {
    return fetch(`/api/tours/${msg.gameid}`, {
        headers: Auth.headers(user)
    })
        .then((response: Response) => {
            if (response.status === 200) {
                return response.json();
            }
            return undefined;
        })
        .then((json: unknown) => {
            if (json) {
                console.log("Game:", json);
                let game: Game = json as Game;
                return game;
            }
        });
}

function indexGames(user: Auth.User) {
    return fetch("/api/games", {
        headers: Auth.headers(user)
    })
        .then((response: Response) => {
            if (response.status !== 200)
                throw `Failed to load index of games`;
            return response.json();
        })
        .then((json: unknown) => {
            if (json) {
                const data = json as Array<Game>;
                return data;
            }
        });
}