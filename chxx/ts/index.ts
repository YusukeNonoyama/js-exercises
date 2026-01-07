export function parseJson(jsonString : any) {
    try {
        const result = JSON.parse(jsonString);
        return { success: true, data: result };
    } catch (error) {
        return { success: false, error: error };
    }
};