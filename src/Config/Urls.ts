export const BASE_URL =
  process.env.REACT_APP_ENV === "dev"
    ? "http://localhost:8080"
    : "https://task-manager-api.krishnadas.site";

export const HOME_PAGE =
  process.env.REACT_APP_ENV === "dev"
    ? "http://localhost:3000"
    : "https://task-manager.krishnadas.site";
