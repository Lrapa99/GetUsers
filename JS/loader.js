const d = document,
  $captionDataTable = d.getElementById("count-data-table"),
  $loader = d.getElementById("loader");

export default function loader() {
  // console.log($captionDataTable);
  $loader.classList.replace("loader-visible", "loader-hidden");
  const showloader = (mutations) => {
    mutations.forEach((mutation) => {
      // console.log(mutation);
      $loader.classList.replace("loader-hidden", "loader-visible");
    });
  };

  const config = { attributes: true, childList: true, characterData: true };

  const observer = new MutationObserver(showloader);

  observer.observe($captionDataTable, config);
}
