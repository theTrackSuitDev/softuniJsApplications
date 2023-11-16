import { postTopic } from "./formHandle.js";
import { cancelPost } from "./formHandle.js";
import { addTopicCards } from "./utils.js";
import { showHome } from "./utils.js";

addTopicCards();

let cancelBtn = document.querySelector('button.cancel');
let postBtn = document.querySelector('button.public');

cancelBtn.addEventListener("click", cancelPost);
postBtn.addEventListener("click", postTopic);

let homeNav = document.querySelector("nav a");
homeNav.addEventListener("click", showHome);