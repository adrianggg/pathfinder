import Path from './components/path.js';

const app = {
  
  initPath: function(){
    new Path();
  },

  init: function(){
    this.initPath();
    // new Path();
  }
};

app.init();