type ActionPayload = string | { id: string; type: string; name: string } | { id: string; size: string };

type Action = {
    type: string;
    payload: ActionPayload;
};
