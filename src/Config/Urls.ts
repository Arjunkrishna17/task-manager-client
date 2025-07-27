export const BASE_URL =
  process.env.REACT_APP_ENV === "dev"
    ? "http://localhost:8080"
    : "https://continued-loutitia-shelf-686a6c4e.koyeb.app";

export const HOME_PAGE =
  process.env.REACT_APP_ENV === "dev"
    ? "http://localhost:3000"
    : "https://task-manager.krishnadas.site";
