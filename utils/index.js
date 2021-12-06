const paginationP = document.getElementById('pageNr');
const lastPageBtn = document.getElementById('lastPageBtn');
const nextPageBtn = document.getElementById('nextPageBtn');
const wrapper = document.getElementById('cardsWrapper');

let nr = 1;
let totalPages;
let ok;

const createElements = (
  imgSrc,
  name,
  wantedText,
  descText
) => {
  wrapper.innerHTML += `
        <div class="card">
          <div class="cardImg">
            <img class="img" src="${
              imgSrc ? imgSrc : 'Image not available'
            }" />
          </div>
          <div class="cardText">
            <h1 class="cardName">${name}</h1>
            <h2 class="cardWanted" style="display:${
              ok ? 'none' : 'block'
            }">${
    wantedText ? wantedText : 'Wanted motives not provided'
  }</h2>
            <p class="cardDesc" style="display:${
              ok ? 'none' : 'block'
            }>${
    descText ? descText : 'Description not provided'
  }</p>
          </div>
        </div>
  `;
};

const getData = async (pageNr) => {
  try {
    const url = new URL(
      `https://api.fbi.gov/wanted/v1/list?page=${pageNr}`
    );
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

const displayData = async (pageNr) => {
  try {
    let data = await getData(pageNr);

    totalPages = await data.total;
    paginationP.textContent = `You are on page ${pageNr} out of ${totalPages} `;

    for (let obj of data.items) {
      createElements(
        await obj.images[0].thumb,
        await obj.title,
        await obj.description,
        await obj.caution
      );
    }
  } catch (err) {
    console.error(err);
  }
};

displayData(nr);

lastPageBtn.addEventListener('click', () => {
  if (nr != 1) {
    nr--;
    wrapper.innerHTML = '';
    displayData(nr);
  }
});

nextPageBtn.addEventListener('click', () => {
  if (nr < totalPages) {
    nr++;
    wrapper.innerHTML = '';
    displayData(nr);
  }
});
