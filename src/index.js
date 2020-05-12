// CSS
import "./assets/sass/index.scss";

// JS
import "./ajax/ajax";
import "./controller/observer";
import "./modules/GlobalCallbacks";
import "./modules/Models";
import "./modules";
import "./assets/fonts/font-awesome.js";
import runtime from "serviceworker-webpack-plugin/lib/runtime";

if ('serviceWorker' in navigator) {
  const registration = runtime.register({ scope: './' });
}
