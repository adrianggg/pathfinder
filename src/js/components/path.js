class Path{
  constructor(){
    this.getElements();

    this.renderTable();

    this.initAction();

    this.drawPath();
  }
  renderTable(){
    let html = '';
    for(let row=0;row<10;row++){
      for(let col=0; col<10;col++){
        html += `<div class="square" data-row="${row}" data-col="${col}">
        row: ${row}
        col: ${col}
        </div>`;
      }
    }
    this.dom.wrapper.innerHTML = html;
  }
  initAction(){
    const thisPath = this;
    this.dom.btn.addEventListener('click',function(event){
      event.preventDefault();
      
      thisPath.dom.btn.innerHTML = 'mk';
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