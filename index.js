import networkStatus from "./JS/deteccion_red.js";
import initialLoading from "./JS/initialLoading.js";
import loader from "./JS/loader.js";
import query from "./JS/query.js";
import darkTheme from "./JS/tema_oscuro.js";

const d = document,
  w = window,
  url = "https://apiautogestion.coosalud.com/vAfiliado/GetByTipoDocAndDoc/",
  typesDoc = {
    1: "CC",
    2: "TI",
    3: "RC",
    4: "CE",
    5: "PE",
    6: "PT",
    7: "SC",
  };

w.addEventListener("load", (e) => {
  initialLoading();
});

d.addEventListener("DOMContentLoaded", (e) => {
  query(url, typesDoc);
});

setInterval(() => {
  loader();
}, 5000);

darkTheme();
networkStatus();
