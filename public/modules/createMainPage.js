let menuTemplate = ' <% items.forEach(function(item) { %> \
                          <a class="<%=item.cl%>" href="/<%=item.link%>" data-section="<%=item.link%>"><%-item.name%></a> \
                          <% }); %>';

export function createMainPage(parent) {
  let menu = new Menu({
    // передаём также шаблоны
    template: _.template(menuTemplate),
    items: [
      {
        name: 'Вход',
        link: 'login',
        cl: 'main_link',
      },
      {
        name: 'Регистрация',
        link: 'registration',
        cl: 'main_link',
      },
      {
        name: 'Настройки',
        link: 'settings',
        cl: 'main_link',
      },
      {
        name: 'О проекте',
        link: 'about',
        cl: 'main_link',
      },
    ]
  });
  parent.appendChild(menu.getElem());
}

function Menu(options) {
  let elem;

  function getElem() {
    if (!elem) render();
    return elem;
  }

  function render() {
    let html = options.template({
      items: options.items
    });

    elem = document.createElement('div');
    elem.classList.add('mainMenu');
    elem.innerHTML = html;
  }


  this.getElem = getElem;
}

