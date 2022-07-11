import {templates,select,classNames} from '../settings.js';
import utils from '../utils.js';

class Path{
  constructor(){
    const thisPath = this;
    thisPath.step = 1;
    this.renderTable();
  }
  renderTable(){
    const finderConatiner = document.querySelector(select.containerOf.pathfinder);
    finderConatiner.innerHTML = '';
    const thisPath = this;
  
    let pageData = null;
    switch(thisPath.step) {
    case 1:
      pageData = { title: 'Draw routes', btnText: 'Finish drawing' };
      thisPath.pathArray = [];
      break;
    case 2:
      pageData = { title: 'Pick start and finish', btnText: 'Compute' };
      break;
    case 3:
      pageData = { title: 'The best route is', btnText: 'Start again' };
      break;
    }    
    
    const generatedHTML = templates.finder(pageData);
    // console.log(generatedHTML);
    thisPath.element = utils.createDOMFromHTML(generatedHTML);

    // console.log(finderConatiner);
    finderConatiner.appendChild(thisPath.element);
    this.getElements();
    this.initAction();
  }

  drawTable(){
    // const thisPath = this;
    let html = '';
    for(let row=1;row<=10;row++){
      for(let col=1; col<=10;col++){
        html += `<div class="square" data-row="${row}" data-col="${col}">
        row: ${row}
        col: ${col}
        </div>`;
      }
    }

    // console.log(html);
    document.querySelector(select.containerOf.finder).innerHTML = html;
    // thisPath.initAction();
  }

  initAction(){
    const thisPath = this;
    this.drawTable();
    switch(thisPath.step) {
    case 1:
      console.log('draw');
      thisPath.drawPath();
      break;
    case 2:
      console.log('Start,END');
      thisPath.picksquare();
      break;
    case 3:
      console.log('finish drawing');
      thisPath.shortPath();
      break;
    }    
    this.dom.btn.addEventListener('click',function(event){
      event.preventDefault();
      thisPath.renderTable();      
    });
    if(thisPath.step==3){
      thisPath.step=0;
    }
    thisPath.step++;
  }

  renderPath(){
    const thisPath = this;
    // console.log(thisPath.pathArray);
    for(let elementID in thisPath.pathArray){
      let element = thisPath.pathArray[elementID];
      thisPath.dom.wrapper.querySelector(`[data-row="${element.row}"][data-col="${element.col}"]`)
        .classList.add(classNames.finder.path);
    }
  }

  picksquare(){
    const thisPath = this;
    thisPath.renderPath();

    thisPath.pickArray=[];
    let pickStart = true;
    this.dom.wrapper.addEventListener('click',function(event){
      if(event.target.classList.contains(classNames.finder.path) && thisPath.pickArray.length<2){      
        if(pickStart){
          event.target.classList.add(classNames.finder.start);
          pickStart = !pickStart;
        }else{
          event.target.classList.add(classNames.finder.end);
        }
        thisPath.pickArray.push({
          col:parseInt(event.target.getAttribute('data-col')),
          row:parseInt(event.target.getAttribute('data-row'))
        });
      }
    });
  }
  
  getElements(){
    this.dom = {};
    this.dom.btn = document.querySelector('.btn-finder');
    this.dom.wrapper = document.querySelector('.table-wrapper');
  }
  shortPath(){
    const thisPath = this;
    thisPath.renderPath();
    console.log(thisPath.pickArray);
    console.log(thisPath.pathArray);
    this.calculatePath(thisPath.pickArray[0],thisPath.pickArray[1]);
  }
  calculatePath(startPath,endPath){
    const thisPath = this;
    console.log('Start path',startPath);

    thisPath.dom.wrapper.querySelector(`[data-col="${startPath.col}"][data-row="${startPath.row}"]`)
      .classList.add(classNames.finder.shortpath);
    if(startPath.col == endPath.col && startPath.row == endPath.row){
      return;
    }else{
      console.log('startCOL',startPath.col);
      console.log('endCOL',endPath.col);
    }
    for(let elementID in thisPath.pathArray){
      console.log(thisPath.pathArray[elementID].col);
      console.log(startPath.col);
      if(startPath.col == thisPath.pathArray[elementID].col && startPath.row == thisPath.pathArray[elementID].row){
        startPath.col = startPath.col +1;
        this.calculatePath(startPath,endPath);
        return;
      }
    }
      
 

  }

  // TODO change queryselector to  '>col border'

  drawPath(){
    const thisPath = this;
    this.dom.squares = this.dom.wrapper.querySelectorAll('.square');
    // console.log(this.dom.squares);
    this.dom.wrapper.addEventListener('click',function(event){
      // console.log(event.target);
      const clickedCol = parseInt(event.target.getAttribute('data-col'));
      const clickedRow = parseInt(event.target.getAttribute('data-row'));
      // console.log('Clicked Col',clickedCol);
      // console.log('Clicked Row',clickedRow);
      if(
        event.target.classList.contains('square')
       &&
       !thisPath.dom.wrapper.querySelector('.path')
       ||
        document.querySelector(`[data-col="${clickedCol-1}"][data-row="${clickedRow}"]`)
       &&
        document.querySelector(`[data-col="${clickedCol-1}"][data-row="${clickedRow}"]`).classList.contains('path') 
       ||
       document.querySelector(`[data-col="${clickedCol+1}"][data-row="${clickedRow}"]`)
       &&
        document.querySelector(`[data-col="${clickedCol+1}"][data-row="${clickedRow}"]`).classList.contains('path')
       ||
        document.querySelector(`[data-col="${clickedCol}"][data-row="${clickedRow-1}"]`)
       &&
        document.querySelector(`[data-col="${clickedCol}"][data-row="${clickedRow-1}"]`).classList.contains('path')
       ||
        document.querySelector(`[data-col="${clickedCol}"][data-row="${clickedRow+1}"]`)
       &&
        document.querySelector(`[data-col="${clickedCol}"][data-row="${clickedRow+1}"]`).classList.contains('path')
      ){
        event.target.classList.add('path');  
        thisPath.pathArray.push({
          col: parseInt(event.target.getAttribute('data-col')),
          row: parseInt(event.target.getAttribute('data-row'))
        });
      }
    });
  }
}

export default Path;