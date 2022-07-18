import Path from './components/path.js';
import {classNames} from './settings.js';
const app = {
  initPages: function(){
    const thisApp = this;
    thisApp.pages = document.querySelector('#pages').children;
    console.log(thisApp.pages);
    thisApp.navLinks = document.querySelectorAll('.nav a');

    const idFromHash = window.location.hash.replace('#/','');
    let pageMatchingHash = thisApp.pages[0].id;
    for(let page of thisApp.pages){
      if(page.id == idFromHash){
        pageMatchingHash = page.id;
        break;
      }
    }

    thisApp.activatePage(pageMatchingHash);
    for(let link of thisApp.navLinks){
      link.addEventListener('click',function(event){
        const clickedElement = this;
        event.preventDefault();
        // get page id from href attribute
        const id = clickedElement.getAttribute('href').replace('#','');
        // run thisApp.activePage with this id
        thisApp.activatePage(id);

        // change URL hash
        window.location.hash = '#/'+ id;
      });
    }
  },

  activatePage: function(pageId){
    const thisApp = this;
    // add class 'active' to matching pages, remove from non-matching 
    for(let page of thisApp.pages){
      page.classList.toggle(classNames.pages.active, page.id==pageId);
    }
    // add class 'active' to matching links, remove from non-matching 
    for(let link of thisApp.navLinks){
      link.classList.toggle(
        classNames.nav.active, 
        link.getAttribute('href') == '#'+ pageId
      );
    }
  },

  initPath: function(){
    new Path();
    this.initPages();
  },

  init: function(){
    this.initPath();
    // new Path();
  }
};

app.init();