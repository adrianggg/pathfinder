class Path{
  constructor(){
    this.getElements();
    this.drawPath();
  }
  getElements(){
    this.dom = {};
    this.dom.squares = document.querySelectorAll('td');
    this.dom.wrapperSquares = document.querySelector('tbody');    
    this.test = this.dom.squares[2];
  }
  drawPath(){
    this.dom.wrapperSquares.addEventListener('click',function(element){
      console.log(element.target);
      if(element.target == 'td'){
        element.target.classList.add('path');
      }
    });
  }
}

export default Path;