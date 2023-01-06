import response from "./response.js";
import toasts from "./toasts.js";

const d = document,
  $btnToast = d.getElementById("liveToastBtn");

export default async function getData(url, typesDoc, doc, num) {
  try {
    const res = await fetch(url + `${typesDoc[num]}/${doc}`);

    const json = await res.json();

    // console.log(json.codigo);

    if (json.codigo == 100) {
      if (num < 7) {
        getData(url, typesDoc, doc, num + 1);
        console.log(json.codigo);
      } else {
        throw { name: "error" };
      }
    } else {
      let result = JSON.parse(json.jsonObject);
      // console.log(response);

      response(result);
      return [result, json];
    }
  } catch (error) {
    const err = error.name === "error";

    if (err) {
      toasts(
        "❌Failed",
        "user not found",
        "No se encontraron datos, por favor intente nuevamente."
      );
      $btnToast.click();
    }

    // console.log(err);
  }
}
