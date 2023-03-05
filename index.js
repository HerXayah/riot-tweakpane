import './assets/endmysuffering.css';
import * as utils from './utils.js';
import * as Tweakpane from './tweakpane.js';

let username = await utils.getUsername();

window.addEventListener('load', async () => {
   console.log('Hello, world!');

   window.Effect.apply('unified', { color: '#0009' });

   const div = document.createElement('div');
   let element = document.createElement('div');
   div.classList.add('tweakpane-container-wrapper');
   element.classList.add('tweakpane-container');
   element.style.width = '300px';
   div.appendChild(element);
   document.body.appendChild(div);
   await utils.makeDraggable(element).then(() => {
      Tweakpane.getTweakPaneReady(username);
   });
});

// needs fixing. I want it to be able to
// move it back to inside the screen when
// it is dragged out of bounds

// also a bug is when you drag it out ill not react. just p[ress a boolean
// and it will react again

/* let element = document.getElementsByClassName('tweakpane-container')[0];

element.ondragend = function (e) {
   utils.checkOutOfBounds('tweakpane-container');
};
 */
