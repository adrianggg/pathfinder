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
    end: 'end',
    start: 'short-path'
  },
  pages: {
    active: 'active',
  },
  nav:{
    active: 'activee',
  }
};
  
  
export const templates = {
  finder: Handlebars.compile(document.querySelector(select.templateOf.finder).innerHTML),
};
