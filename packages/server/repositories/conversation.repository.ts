// Map client id with LLM response id:
const map = new Map<string, string>();

export const conversations = {
    getLastResponseId(clientId: string) {
        return map.get(clientId);
    },
    setLastResponseId(clientId: string, responseId: string) {
        map.set(clientId, responseId);
    },
};
