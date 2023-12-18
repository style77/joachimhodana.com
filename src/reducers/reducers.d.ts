type ActionPayload = string | { id: string; type: string; name: string } | { id: string; size: string } | number;

type Action = {
    type: string;
    payload: ActionPayload;
};