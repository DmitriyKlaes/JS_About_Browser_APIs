const productsData = [
  {
    id: 1,
    name: 'Ноутбук',
    category: 'Электроника',
  },
  {
    id: 2,
    name: 'Смартфон',
    category: 'Электроника',
  },
  {
    id: 3,
    name: 'Кофемашина',
    category: 'Бытовая техника',
  },
  {
    id: 4,
    name: 'Фотокамера',
    category: 'Электроника',
  },
  {
    id: 5,
    name: 'Микроволновая печь',
    category: 'Бытовая техника',
  },
  {
    id: 6,
    name: 'Книга',
    category: 'Книги',
  },
  {
    id: 7,
    name: 'Футболка',
    category: 'Одежда',
  },
  {
    id: 8,
    name: 'Шапка',
    category: 'Одежда',
  },
  {
    id: 9,
    name: 'Стул',
    category: 'Мебель',
  },
  {
    id: 10,
    name: 'Стол',
    category: 'Мебель',
  },
];

const init = () => {
  const products = document.getElementById('products');
  productsData.forEach((product) => {
    const liEl = document.createElement('li');
    liEl.id = product.id;
    liEl.textContent = product.name;
    liEl.dataset.category = product.category;
    products.appendChild(liEl);
  });
};
init();

const selectEl = document.getElementById('categories');

selectEl.addEventListener('change', (e) => {
  if (e.target.value) {
    const products = document.getElementById('products');
    products.innerHTML = '';
    productsData.forEach((product) => {
      if (product.category == selectEl.value) {
        const liEl = document.createElement('li');
        liEl.id = product.id;
        liEl.textContent = product.name;
        liEl.dataset.category = product.category;
        products.appendChild(liEl);
      }
    });
  } else {
    init();
  }
});


//---------


let fact;
const photoContainer = document.querySelector('#photo-container');

async function showPic() {
  const url = 'https://api.unsplash.com/photos/?client_id=mUx0s_UkgyKc-xwp2glq3xiWj0GtQh11p-TppF-cY9A';
  const response = await fetch(url);

  fact = await response.json();
  const urlsImg = Array.from(fact[0].urls);

  fact.forEach((value) => {
    const image = document.createElement('img');
    image.setAttribute('src', `${value.urls.regular}`);
    image.setAttribute('width', '304');
    image.setAttribute('height', '228');
    photoContainer.append(image);
  });
};

document.addEventListener('scroll', function (e) {
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
    showPic();
  }
});

showPic();
