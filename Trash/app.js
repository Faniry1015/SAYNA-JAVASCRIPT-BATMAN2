import { fetchJSON } from "./api.js";
const questionaire = await fetchJSON("https://batman-api.sayna.space/questions")
console.log(questionaire)