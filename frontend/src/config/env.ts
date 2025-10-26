export const env = {
  apiBaseUrl: (import.meta.env.VITE_API_BASE_URL as string) ?? "",
};

if (!env.apiBaseUrl) {
  throw new Error("[ENV] VITE_API_BASE_URL is required");
}
