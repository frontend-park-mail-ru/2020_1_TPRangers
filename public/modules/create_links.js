
export default function createLinks(data = {
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