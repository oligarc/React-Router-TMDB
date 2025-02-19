export const API_KEY = import.meta.env.VITE_API_KEY;
export const API_URL = import.meta.env.VITE_API_URL;

if (!API_KEY) {
  throw new Error("Missing VITE_API_KEY in .env file");
}
