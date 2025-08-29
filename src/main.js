const BASE_URL = "https://digimon-api.vercel.app/api/digimon";
const SKILL_URL = "https://digi-api.com/api/v1";
const BASE = "https://digi-api.com/api/v1";

const cardList = document.querySelector(".card-list");

loadDigimonData();

async function loadDigimonData() {
  try {
    const res = await fetch(BASE_URL);

    // skill fetch
    // Endpoint: digi-api.com/api/v1/{id} or {name}
    // 기존 API를 활용해서 skill만 따로 붙이려면 name을 쓰는게 유리함.
    //   const url = `${BASE}/digimon/${name}`;
    //   const res2 = await fetch(url);
    //   const data = await res2.json();
    //   console.log(data.skills); // 스킬만 출력

    if (!res.ok) {
      throw new Error("API fetch 실패");
    }

    const data = await res.json();
    console.log(data); // 배열 형태로 출력
    const randomItems = getRandomItems(data, 24);
    randomItems.forEach(({ name, img, level }) => {
      const li = document.createElement("li");
      li.classList = "card";
      li.innerHTML = `
              <figure>
                <img src="${img}" loading="lazy">
              </figure>
            `;
      cardList.append(li);
    });

    // grid-item DOM 구성
  } catch (err) {
    console.error(err);
  }
}

// 배열에서 랜덤으로 n개 뽑는 함수
function getRandomItems(arr, n) {
  const shuffled = arr.slice().sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

// Event

//   fetch("https://digimon-api.vercel.app/api/digimon")
//     .then((res) => res.json())
//     .then((data) => console.log(data));
