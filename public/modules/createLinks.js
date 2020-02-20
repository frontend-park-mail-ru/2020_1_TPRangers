let linkTemplate = '<a class="<%-cl%>" href="/<%-link%>" data-section="<%-link%>"><%-name%></a>';


function Link(linkTo) {
  function getElem() {
    return linkTo.template({
      name: linkTo.name,
      link: linkTo.link,
      cl: linkTo.cl,
    })
  }
  this.getElem = getElem;
}

export default function createLinks(data = {
  by_default: {
    name: 'undefined',
    link: 'undefined',
    cl: 'main_link'

  } }) {
  let pageItem = new Link({
    template: _.template(linkTemplate),
    name: data.name,
    link: data.link,
    cl: data.cl,
  });


  return pageItem.getElem();
}