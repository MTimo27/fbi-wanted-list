let nr = 1;
let ok;

const createElements = (
  imgSrc,
  name,
  wantedText,
  descText
) => {
  const wrapper = document.getElementById('cardsWrapper');
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
    wantedText ? `Wanted for: ${wantedText}` : (ok = true)
  }</h2>
            <p class="cardDesc" style="display:${
              ok ? 'none' : 'block'
            }>${descText ? descText : (ok = true)}</p>
          </div>
        </div>
  `;
};

const getData = async (pageNr) => {
  try {
    // console.log(pageNr);
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

const displayData = async () => {
  try {
    let data = await getData(nr);
    console.log(data);
    // if (data === undefined) {
    //   console.log('undefined');
    //   return;
    // } else {
    for (let obj of data.items) {
      // for (let i = 0; i < data.items.length; i++) {
      //   let obj = data.items[i];
      // if (
      //   obj.nationality === 'Romanian' ||
      //   obj.place_of_birth === 'Romania'
      // ) {
      //   console.log(obj.nationality);
      createElements(
        await obj.images[0].thumb,
        await obj.title,
        await obj.description,
        await obj.caution
      );
      //}
    }
    // nr++;
    // console.log(nr);
    // displayData();
    //}
  } catch (err) {
    console.error(err);
  }
};

displayData();
