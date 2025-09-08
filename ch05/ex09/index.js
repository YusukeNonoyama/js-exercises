export function parseJson(jsonString) {
  try {
    const result = JSON.parse(jsonString);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error };
  }
}
