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
        html += `<div class="square" data-row="${row}" data-col="${col}"></div>`;
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
    console.log('pick',thisPath.pickArray);
    console.log('path',thisPath.pathArray);
    const squares = thisPath.dom.wrapper.querySelectorAll('.square');
    console.log(squares);
    const squareArray = [];
    for(let i=0;i<10;i++){
      squareArray[i] = [];
      for(let j=0;j<10;j++){
        if(squares[i*10+j].classList.contains('path')){
          squareArray[i][j] = 'Empty';
        }else{
          squareArray[i][j] = 'Obstacle';
        }
      }
    }
    squareArray[thisPath.pickArray[0].row-1][thisPath.pickArray[0].col-1]= 'Start';
    squareArray[thisPath.pickArray[1].row-1][thisPath.pickArray[1].col-1]= 'Goal';
    console.log(squareArray);
    
    const shortestPath = this.findShortestPath([thisPath.pickArray[0].row-1,thisPath.pickArray[0].col-1],squareArray);
    console.log(shortestPath);
    thisPath.drawShortestPath(shortestPath,thisPath.pickArray[0]);
  }
  drawShortestPath(path,square){
    this.dom.wrapper.querySelector(`[data-row="${square.row}"][data-col="${square.col}"]`).classList.add('short-path');
    if(path.length==0){
      return;
    }else{
      const direction = path.shift();
      if (direction === 'up') {
        square.row -= 1;
      } else if (direction === 'right') {
        square.col += 1;
      } else if (direction === 'down') {
        square.row += 1;
      } else if (direction === 'left') {
        square.col -= 1;
      }
      this.drawShortestPath(path,square);
    }
  }
  
  findShortestPath(startCoordinates, grid){
    var distanceFromTop = startCoordinates[0];
    var distanceFromLeft = startCoordinates[1];

    var location = {
      distanceFromTop: distanceFromTop,
      distanceFromLeft: distanceFromLeft,
      path: [],
      status: 'Start'
    };

    var queue = [location];

    while (queue.length > 0) {

      var currentLocation = queue.shift();

      var newLocation = this.exploreInDirection(currentLocation, 'up', grid);
      if (newLocation.status === 'Goal') {
        return newLocation.path;
      } else if (newLocation.status === 'Valid') {
        queue.push(newLocation);
      }

      newLocation = this.exploreInDirection(currentLocation, 'right', grid);
      if (newLocation.status === 'Goal') {
        return newLocation.path;
      } else if (newLocation.status === 'Valid') {
        queue.push(newLocation);
      }

      newLocation = this.exploreInDirection(currentLocation, 'down', grid);
      if (newLocation.status === 'Goal') {
        return newLocation.path;
      } else if (newLocation.status === 'Valid') {
        queue.push(newLocation);
      }

      newLocation = this.exploreInDirection(currentLocation, 'left', grid);
      if (newLocation.status === 'Goal') {
        return newLocation.path;
      } else if (newLocation.status === 'Valid') {
        queue.push(newLocation);
      }
    }

    return false;

  }

  locationStatus(location, grid){
    var gridSize = grid.length;
    var dft = location.distanceFromTop;
    var dfl = location.distanceFromLeft;

    if (location.distanceFromLeft < 0 ||
        location.distanceFromLeft >= gridSize ||
        location.distanceFromTop < 0 ||
        location.distanceFromTop >= gridSize) {

      return 'Invalid';
    } else if (grid[dft][dfl] === 'Goal') {
      return 'Goal';
    } else if (grid[dft][dfl] !== 'Empty') {
      return 'Blocked';
    } else {
      return 'Valid';
    }
  }

  exploreInDirection(currentLocation, direction, grid){
    var newPath = currentLocation.path.slice();
    newPath.push(direction);

    var dft = currentLocation.distanceFromTop;
    var dfl = currentLocation.distanceFromLeft;

    if (direction === 'up') {
      dft -= 1;
    } else if (direction === 'right') {
      dfl += 1;
    } else if (direction === 'down') {
      dft += 1;
    } else if (direction === 'left') {
      dfl -= 1;
    }

    var newLocation = {
      distanceFromTop: dft,
      distanceFromLeft: dfl,
      path: newPath,
      status: 'Unknown'
    };
    newLocation.status = this.locationStatus(newLocation, grid);

    if (newLocation.status === 'Valid') {
      grid[newLocation.distanceFromTop][newLocation.distanceFromLeft] = 'Visited';
    }
    return newLocation;
  }

  drawPath(){
    const thisPath = this;
    this.dom.squares = this.dom.wrapper.querySelectorAll('.square');
    this.dom.wrapper.addEventListener('click',function(event){
      const clickedCol = parseInt(event.target.getAttribute('data-col'));
      const clickedRow = parseInt(event.target.getAttribute('data-row'));
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
          row: parseInt(event.target.getAttribute('data-row')),
          col: parseInt(event.target.getAttribute('data-col'))
        });
      }
    });
  }
}

export default Path;