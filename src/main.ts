import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowDown, faArrowUp, faPlay, faPause, faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
library.add(faArrowDown, faArrowUp, faPlay, faPause, faArrowsRotate);

createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
