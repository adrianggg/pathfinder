export const select = {
  templateOf: {
    finder: '#template-finder',
  },
  containerOf: {
    menu: '#product-list',
    about: '#about',
    pathfinder: '#finder',
    finder: '.table-wrapper',
  },
};
  
export const classNames = {
  finder: {
    path: 'path',
    shortpath: 'short-path',
  },
  // CODE ADDED START
  pages: {
    active: 'active',
  }
};
  
  
export const templates = {
  finder: Handlebars.compile(document.querySelector(select.templateOf.finder).innerHTML),
};
