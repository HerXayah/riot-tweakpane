import Tweakpane from 'https://esm.sh/tweakpane@3.1.6';
import * as utils from './utils.js';

export let values = {
   Transparency: true,
   red: 0,
   green: 0,
   blue: 0,
   alpha: 0,
};

export function getTweakPaneReady(username) {
   const pane = new Tweakpane.Pane({
      container: document.getElementsByClassName('tweakpane-container')[0],
      title: `Hello 💖 ${username} 💖`,
   });
   pane.addInput(values, 'Transparency');
   pane.addInput(values, 'red', {
      min: 0,
      max: 9,
      value: 0,
      step: 1,
      label: 'Red',
   });
   pane.addInput(values, 'green', {
      min: 0,
      max: 9,
      value: 0,
      step: 1,
      label: 'Green',
   });
   pane.addInput(values, 'blue', {
      min: 0,
      max: 9,
      value: 0,
      step: 1,
      label: 'Blue',
   });
   pane.addInput(values, 'alpha', {
      min: 0,
      max: 9,
      value: 9,
      step: 1,
      label: 'Opacity',
   });
   const btn = pane.addButton({
      title: 'Save Changes!',
      label: 'Transparency',
   });
   btn.on('click', () => {
      utils.transparency(
         values.Transparency,
         values.red,
         values.green,
         values.blue,
         values.alpha
      );
   });

   window.onkeyup = function (e) {
      // if key is f10
      if (e.keyCode == 121) {
         // toggle visibility
         pane.hidden = !pane.hidden;
         let cont = document.getElementsByClassName('tweakpane-container')[0];

         DataStore.set('posx', window.screenLeft / window.screenTop);
         DataStore.set('posy', window.screenX / window.screenY);

         cont.style.top = DataStore.get('posy');
         cont.style.left = DataStore.get('posx');
      }
   };
}
