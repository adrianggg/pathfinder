import {templates,select} from '../settings.js';
import utils from '../utils.js';

class Path{
  constructor(){
    const thisPath = this;
    thisPath.step = 1;
    this.renderTable();
    this.getElements();

    this.initAction();

    this.drawPath();
  }
  renderTable(){

    const thisPath = this;
  
    let pageData = null;
    switch(thisPath.step) {
    case 1:
      pageData = { title: 'Draw routes', btnText: 'Finish drawing' };
      break;
    case 2:
      pageData = { title: 'Pick start and finish', btnText: 'Compute' };
      break;
    case 3:
      pageData = { title: 'The best route is', btnText: 'Start again' };
      break;
    }    
    
    const generatedHTML = templates.finder(pageData);
    console.log(generatedHTML);
    thisPath.element = utils.createDOMFromHTML(generatedHTML);

    const finderConatiner = document.querySelector(select.containerOf.pathfinder);

    /* add element to menu*/
    finderConatiner.appendChild(thisPath.element);
    
    let html = '';
    for(let row=0;row<10;row++){
      for(let col=0; col<10;col++){
        html += `<div class="square" data-row="${row}" data-col="${col}">
        row: ${row}
        col: ${col}
        </div>`;
      }
    }
    console.log(html);
    document.querySelector(select.containerOf.finder).innerHTML = html;
  }


  initAction(){
    const thisPath = this;
    this.dom.btn.addEventListener('click',function(event){
      event.preventDefault();
      
      thisPath.step++;
    });
  }
  
  getElements(){
    this.dom = {};
    this.dom.wrapper = document.querySelector('.table-wrapper');
    this.dom.btn = document.querySelector('.btn-finder');
  }
  drawPath(){
    const thisPath = this;
    this.dom.squares = this.dom.wrapper.querySelectorAll('.square');
    console.log(this.dom.squares);
    this.dom.wrapper.addEventListener('click',function(event){
      console.log(event.target);
      const clickedCol = parseInt(event.target.getAttribute('data-col'));
      const clickedRow = parseInt(event.target.getAttribute('data-row'));
      console.log('Clicked Col',clickedCol);
      console.log('Clicked Row',clickedRow);
      if(
        event.target.classList.contains('square')
       &&
       !thisPath.dom.wrapper.querySelector('.path')
       ||
        document.querySelector(`[data-col="${clickedCol-1}"][data-row="${clickedRow}"]`).classList.contains('path')
       ||
        document.querySelector(`[data-col="${clickedCol+1}"][data-row="${clickedRow}"]`).classList.contains('path')
       ||
        document.querySelector(`[data-col="${clickedCol}"][data-row="${clickedRow-1}"]`).classList.contains('path')
       ||
        document.querySelector(`[data-col="${clickedCol}"][data-row="${clickedRow+1}"]`).classList.contains('path')
      ){
        event.target.classList.add('path');
      }else{
        console.log('false');
      }
    });
  }
}

export default Path;