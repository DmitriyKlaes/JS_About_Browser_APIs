const data = `[
    { 
        "id": "1",
        "classTitle": "Гантельки",
        "classDate": "20/10/2023",
        "classTime": "12:00 МСК",
        "classCapacity": "15",
        "classRecords": "15",
        "image": "./img/photo.png"
    },
    { 
        "id": "2",
        "classTitle": "Зумба",
        "classDate": "20/10/2023",
        "classTime": "12:00 МСК",
        "classCapacity": "15",
        "classRecords": "14",
        "image": "./img/photo.png"
    },
    { 
        "id": "3",
        "classTitle": "Пауэрлифтинг",
        "classDate": "20/10/2023",
        "classTime": "12:00 МСК",
        "classCapacity": "15",
        "classRecords": "14",
        "image": "./img/photo.png"
    },
    { 
        "id": "4",
        "classTitle": "Стрейчинг",
        "classDate": "20/10/2023",
        "classTime": "12:00 МСК",
        "classCapacity": "15",
        "classRecords": "14",
        "image": "./img/photo.png"
    },
    {
        "id": "5",
        "classTitle": "Пилатес",
        "classDate": "20/10/2023",
        "classTime": "12:00 МСК",
        "classCapacity": "15",
        "classRecords": "14",
        "image": "./img/photo.png"
    },
    { 
        "id": "6",
        "classTitle": "Кроссфит",
        "classDate": "20/10/2023",
        "classTime": "12:00 МСК",
        "classCapacity": "15",
        "classRecords": "14",
        "image": "./img/photo.png"
    }
]`;

const timetable = JSON.parse(data);

const cardBox = document.querySelector('.row');
cardRender();

cardBox.addEventListener('click', (e) => {
    if (e.target.classList.contains('button-join')) {
        timetable[e.target.id - 1].classRecords = Number(timetable[e.target.id - 1].classRecords) + 1;
        const student = document.querySelector(`[data-id="${e.target.id}"]`);
        student.textContent = timetable[e.target.id - 1].classRecords;

        const currentBtn = document.getElementById(`${e.target.id}`);

        currentBtn.classList.add('inactive');
        currentBtn.nextElementSibling.classList.remove('inactive');
    }
    if (e.target.classList.contains('button-cancel')) {
        let curentEl = timetable.filter((cls, index) => cls.classTitle === e.target.dataset.id);

        let index = Number(curentEl[0].id) - 1;

        timetable[index].classRecords = timetable[index].classRecords - 1;

        const student = document.querySelector(`[data-id="${index + 1}"]`);
        student.textContent = timetable[index].classRecords;

        const currentBtn = document.querySelector(`[data-id="${e.target.dataset.id}"]`);

        currentBtn.classList.add('inactive');
        currentBtn.previousElementSibling.classList.remove('inactive');
    }
});

function cardRender() {
    timetable.forEach(sportClass => {
        let card = `<article class="col-sm center">
                <div class="card__img-box">
                    <img class="card__img" src="${sportClass.image}" alt="photo">
                </div>
                <div class="center">
                    <h3 class="card__title">${sportClass.classTitle}</h3>
                    <div class="card__quantity-box">
                        <p data-id=${sportClass.id} class="card__people">${sportClass.classRecords}</p>
                        <p class="card__people-text">Записалось</p>
                    </div>
                </div>
                <div class="card__content center">
                    <p class="card__content-text">Кол-во мест: 
                    <span id="capacity">${sportClass.classCapacity}</span></p>
                    <p class="card__content-text">Дата: 
                    <span>${sportClass.classDate}</span></p>
                    <p class="card__content-text">Время: 
                    <span>${sportClass.classTime}</span></p>
                </div>
                <div class="card__buttons">
                    <button id=${sportClass.id} class="button-join">Запись</button>
                    <button data-id="${sportClass.classTitle}" class="button-cancel inactive">Отмена</button>
                </div>
            </article>`
        cardBox.insertAdjacentHTML('beforeend', card);

        if (Number(sportClass.classCapacity) === Number(sportClass.classRecords)) {
            const joinBtn = document.getElementById(`${sportClass.id}`);
            joinBtn.classList.add('inactive');
        }
    });
}