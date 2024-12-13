import { Gamer } from "server/models";

export type Msg =
    | ["profile/select", { userid: string }]
    | [
        "profile/save",
        {
            userid: string;
            profile: Gamer;
            onSuccess?: () => void;
            onFailure?: (err: Error) => void;
        }
    ]
    | ["game/index"]
    | ["game/select", { gameid: string }];
