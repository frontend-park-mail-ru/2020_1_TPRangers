const dataForMainPage = {
  login: {
    name: 'Вход',
    link: "login",
    cl: 'main_link',
  },
  registration: {
     name: 'Регистрация',
     link: "registration",
     cl: 'main_link',
  },
  about: {
    name: 'О проекте',
    link: "about",
    cl: 'main_link',
  },
};

function createLinks(data = {
  by_default: {
    name: 'undefined',
    link: 'undefined',
    cl: 'main_link'
  } }, parent = document.body) {
  parent.innerHTML = '';
  Object.values(data).forEach(function (item) {
    const pageItem = document.createElement('a');
    pageItem.textContent = item.name;
    pageItem.href = `/${item.link}`;
    pageItem.dataset.section = item.link;
    pageItem.classList.add(item.cl);

    parent.appendChild(pageItem);
  });
}

function createMainPage() {
  let app = document.getElementById("application")
  createLinks(dataForMainPage, app);
}

createMainPage();