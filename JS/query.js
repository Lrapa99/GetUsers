import getData from "./getFetch.js";

const d = document,
  $inputDocs = d.getElementById("allDocuments"),
  $errorServidor = d.getElementById("error-servidor"),
  $captionDataTable = d.getElementById("count-data-table");

function errorServidor() {
  // console.log($captionDataTable);
  $errorServidor.classList.replace("loader-hidden", "loader-visible");
  const showError = (mutations) => {
    mutations.forEach((mutation) => {
      // console.log(mutation);
      $errorServidor.classList.replace("loader-visible", "loader-hidden");
    });
  };

  const config = { attributes: true, childList: true, characterData: true };

  const observer = new MutationObserver(showError);

  observer.observe($captionDataTable, config);
}

export default function query(url, typesDoc) {
  d.addEventListener("click", (e) => {
    if (e.target.matches("#btn-buscar")) {
      let inputDocsValues = $inputDocs.value || null;
      if (inputDocsValues) {
        // $loader.classList.replace("loader-hidden", "loader-visible");
        e.preventDefault();

        const allDoc = new Set(inputDocsValues.split(" "));

        const arrSinDuplicado = Array.from(allDoc);

        if (arrSinDuplicado.length <= 999) {
          for (let doc of arrSinDuplicado) {
            getData(url, typesDoc, doc, 1);
          }
        }

        if (arrSinDuplicado.length >= 1999) {
          const newArrP1 = arrSinDuplicado.splice(
            0,
            arrSinDuplicado.length / 2
          );
          const newArrP2 = arrSinDuplicado.splice(0, arrSinDuplicado.length);

          console.log(newArrP1, newArrP2);

          const getUser = async () => {
            console.log("promises 1");
            const promises1 = await Promise.all(
              await newArrP1.forEach(async (el) => {
                const result = await getData(url, typesDoc, el, 1);
                // return result;
                console.log(result);
              })
            );
            console.log("promises 2");
            const promises2 = await Promise.all(
              await newArrP2.forEach(async (el) => {
                const result = await getData(url, typesDoc, el, 1);
                // return result;
                console.log(result);
              })
            );
          };

          getUser();
        }

        setTimeout(() => {
          console.log("error servidor");
          errorServidor();
        }, 2000);
      }
    }
  });
}
