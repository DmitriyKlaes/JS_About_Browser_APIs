const getRandomImage = async () => {
    const url = `https://api.unsplash.com/photos/random/?client_id=mUx0s_UkgyKc-xwp2glq3xiWj0GtQh11p-TppF-cY9A&count=1`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
            renderImage(data[0]);
        }
    } catch (err) {
        console.log(err);
    }
};

function renderImage(element) {
    const newImage = localStorage.getItem(element.id);

    if (newImage !== null) {
        getRandomImage();
    }

    const box = document.createElement('div');
    box.classList.add('box');

    const author = document.createElement('div');
    author.classList.add('author');

    const linkAuthor = document.createElement('a');
    linkAuthor.setAttribute('id', 'linkPortfolio');
    linkAuthor.setAttribute('target', '_blank');
    linkAuthor.setAttribute('href', element.user.links.html);

    const imgAuthor = document.createElement('img');
    imgAuthor.classList.add('author-photo');
    imgAuthor.setAttribute('id', 'authorPhoto');
    imgAuthor.setAttribute('src', element.user.profile_image.medium);
    imgAuthor.setAttribute('alt', 'photo');

    linkAuthor.appendChild(imgAuthor);

    const nameAuthor = document.createElement('p');
    nameAuthor.classList.add('author_name');
    nameAuthor.setAttribute('id', 'authorName');
    nameAuthor.textContent = element.user.name;

    author.appendChild(linkAuthor);
    author.appendChild(nameAuthor);

    const like = document.createElement('div');
    like.classList.add('make-like');

    const imgLike = document.createElement('img');
    imgLike.classList.add('like-icon');
    imgLike.setAttribute('id', 'likeImage');
    imgLike.setAttribute('data-id', element.id);
    imgLike.setAttribute('data-link', element.urls.regular);
    imgLike.setAttribute('data-like', '0');
    imgLike.setAttribute('src', './img/empty-like.png');
    imgLike.setAttribute('alt', 'like');
    imgLike.addEventListener('click', () => {
        if (imgLike.like === '1') {
            imgLike.src = './img/empty-like.png'
            imgLike.like = '0';
        } else {
            imgLike.src = './img/feel-like.png'
            imgLike.like = '1';
        }
        increaseLike();
    });

    const likeCounter = document.createElement('p');
    likeCounter.classList.add('like-counter');
    likeCounter.setAttribute('id', 'likeCounter');
    likeCounter.textContent = '0';

    like.appendChild(imgLike);
    like.appendChild(likeCounter);

    box.appendChild(author);
    box.appendChild(like);

    imageBox.appendChild(box);
    imageBox.style.background = `url(${element.urls.regular}`;
    imageBox.style.backgroundPosition = 'center';
    imageBox.style.backgroundRepeat = 'no-repeat';
    imageBox.style.backgroundSize = 'cover';
}

function increaseLike() {
    if (likeCounter.textContent === '0') likeCounter.innerHTML = '1';
    else likeCounter.innerHTML = '0';
}

getRandomImage();