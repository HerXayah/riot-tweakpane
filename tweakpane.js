import { Pane } from 'https://cdn.jsdelivr.net/npm/tweakpane@4.0.3/dist/tweakpane.min.js';
import * as utils from './utils.js';
import * as TextareaPlugin from 'https://cdn.jsdelivr.net/npm/@pangenerator/tweakpane-textarea-plugin@2.0.0/dist/tweakpane-textarea-plugin.min.js';
import { processLink, replaceLinks } from './linkhandler.js';

export let values = {
   Transparency: true,
   RGBA: `${DataStore.get('rgba-val')}`,
   ytvideo: '',
};
export function getTweakPaneReady(username) {
   const pane = new Pane({
      container: document.getElementsByClassName('tweakpane-container')[0],
      title: `Hello 💖 ${username} 💖`,
   });

   pane.registerPlugin(TextareaPlugin);

   const tab = pane.addTab({
      pages: [{ title: 'Acrylical' }],
   });
   tab.pages[0].addBinding(values, 'Transparency');
   tab.pages[0].addBinding(values, 'RGBA', {
      picker: 'inline',
      expanded: false,
   });
   const applybtn = tab.pages[0].addButton({
      title: 'Apply Changes!',
      label: 'Transparency',
   });
   applybtn.on('click', () => {
      utils.transparency(values.Transparency, values.RGBA);
      DataStore.set('rgba-val', values.RGBA);
   });

   pane.addBinding(values, 'ytvideo');

   const meow = tab.pages[0].addButton({
      title: 'Funny Magic',
      label: 'counter', // optional
   });

   document.getElementsByClassName('tp-txtv_i').disabled = false;

   meow.on('click', async () => {
      try {
         const processedLink = await processLink(values.ytvideo);
         await replaceLinks(processedLink);
         console.log('Link replaced successfully!');
      } catch (error) {
         console.error('Error replacing link:', error);
      }
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
