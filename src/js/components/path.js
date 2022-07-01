class Path{
  constructor(){
    this.getElements();
    this.renderTable();
    this.drawPath();
  }
  renderTable(){
    for(let i=0;i<100;i++){
      this.dom.wrapper.innerHTML += `<div class="square">${i}</div>`;
    }
  }
  getElements(){
    this.dom = {};
    this.dom.wrapper = document.querySelector('.table-wrapper');
  }
  drawPath(){
    const thisPath = this;
    this.dom.squares = this.dom.wrapper.querySelectorAll('.square');
    console.log(this.dom.squares);
    this.dom.wrapper.addEventListener('click',function(event){
      const thisTargetValue = parseInt(event.target.innerHTML);
      console.log(thisTargetValue);
      console.log(event.target);
      if(
        event.target.classList.contains('square')
       &&
       !thisPath.dom.wrapper.querySelector('.path')
       ||
         thisPath.dom.squares[thisTargetValue-1].classList.contains('path')
       ||
         thisPath.dom.squares[thisTargetValue+1].classList.contains('path')
       ||
         thisPath.dom.squares[thisTargetValue-10].classList.contains('path')
       ||
         thisPath.dom.squares[thisTargetValue+10].classList.contains('path')
      ){
        event.target.classList.add('path');
      }else{
        console.log('false');
      }
    });
  }
}

export default Path;