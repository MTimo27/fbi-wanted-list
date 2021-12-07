const paginationP = document.getElementById('pageNr');
const lastPageBtn = document.getElementById('lastPageBtn');
const nextPageBtn = document.getElementById('nextPageBtn');
const wrapper = document.getElementById('cardsWrapper');
const filterButton =
  document.getElementById('filterButton');
const filterWrapper =
  document.getElementById('filterWrapper');
const filterMale = document.getElementById('filterMale');
const filterFemale =
  document.getElementById('filterFemale');
const filterWhite = document.getElementById('filterWhite');
const filterBlack = document.getElementById('filterBlack');
const filterHispanic = document.getElementById(
  'filterHispanic'
);
const filterAsian = document.getElementById('filterAsian');
const filterText = document.getElementById('filterText');
const filterDelete =
  document.getElementById('filterDelete');

let nr = 1,
  totalPages,
  race = '',
  sex = '',
  ok = 1;

const createElements = (imgSrc, name, pdfLink) => {
  wrapper.innerHTML += `
      <div class="card">
        <a href=${pdfLink} target="_blank">
          <div class="cardImg">
            <img class="img" src="${
              imgSrc ? imgSrc : 'Image not available'
            }" />
          </div>
          <div class="cardText">
            <h1 class="cardName">${
              name ? name : 'Name not available'
            }</h1>
          </div>
        </a>
      </div>
  `;
};

const getData = async (pageNr) => {
  try {
    const url = new URL(
      `https://api.fbi.gov/wanted/v1/list`
    );
    url.search = new URLSearchParams({
      page: pageNr,
      race: race,
      sex: sex,
    });
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
    console.log(data);
    totalPages = await data.total;
    paginationP.textContent = `You are on page ${pageNr} out of ${totalPages}.`;

    for (let obj of data.items) {
      createElements(
        await obj.images[0].thumb,
        await obj.title,
        await obj.files[0].url
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

filterButton.addEventListener('click', () => {
  if (ok === 0) {
    filterWrapper.style.display = 'none';
    ok = 1;
  } else {
    filterWrapper.style.display = 'block';
    ok = 0;
  }
});

//DE SCHIMBAT INTR O VARIANTA MAI PUTIN REDUNDANTA
//DE AVUT OPTIUNEA SA PUI MAI MULT FILTRE IN ACELASI TIMP

filterMale.addEventListener('click', () => {
  sex = 'male';
  nr = 1;
  wrapper.innerHTML = '';
  filterWrapper.style.display = 'none';
  filterText.textContent = `FILTERED BY SEX: ${sex}`;
  displayData(nr);
});

filterFemale.addEventListener('click', () => {
  sex = 'female';
  nr = 1;
  wrapper.innerHTML = '';
  filterWrapper.style.display = 'none';
  filterText.textContent = `FILTERED BY SEX: ${sex}`;
  displayData(nr);
});

filterWhite.addEventListener('click', () => {
  sex = '';
  race = 'white';
  nr = 1;
  wrapper.innerHTML = '';
  filterWrapper.style.display = 'none';
  filterText.textContent = `FILTERED BY RACE: ${race}`;
  displayData(nr);
});

filterBlack.addEventListener('click', () => {
  sex = '';
  race = 'black';
  nr = 1;
  wrapper.innerHTML = '';
  filterWrapper.style.display = 'none';
  filterText.textContent = `FILTERED BY RACE: ${race}`;
  displayData(nr);
});

filterHispanic.addEventListener('click', () => {
  sex = '';
  race = 'hispanic';
  nr = 1;
  wrapper.innerHTML = '';
  filterWrapper.style.display = 'none';
  filterText.textContent = `FILTERED BY RACE: ${race}`;
  displayData(nr);
});

filterAsian.addEventListener('click', () => {
  sex = '';
  race = 'asian';
  nr = 1;
  wrapper.innerHTML = '';
  filterWrapper.style.display = 'none';
  filterText.textContent = `FILTERED BY RACE: ${race}`;
  displayData(nr);
});

filterDelete.addEventListener('click', () => {
  sex = '';
  race = '';
  nr = 1;
  wrapper.innerHTML = '';
  filterWrapper.style.display = 'none';
  filterText.textContent = ``;
  displayData(nr);
});
