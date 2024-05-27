import './assets/endmysuffering.css';
import * as utils from './utils.js';
import * as Tweakpane from './tweakpane.js';

window.addEventListener('load', async () => {
   console.log('Hello, world!');

   // embed twitch player

   const script = document.createElement('script');
   script.setAttribute('src', 'https://embed.twitch.tv/embed/v1.js');
   document.body.appendChild(script);

   if (DataStore.get('rgba-val') == null) {
      DataStore.set('rgba-val', '#0009');
   }

   window.Effect.apply('unified', {
      color: `${DataStore.get('rgba-val')}`,
   });

   const div = document.createElement('div');
   let element = document.createElement('div');
   div.classList.add('tweakpane-container-wrapper');
   element.classList.add('tweakpane-container');
   element.style.width = '300px';
   element.style.top = '20px';
   element.style.left = '20px';
   div.appendChild(element);
   document.body.appendChild(div);
   // utils.makeDraggable(element);
   element.ariaReadOnly = false;
   element.disable = false;

   while (!(await utils.getUsername())) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
   }
   Tweakpane.getTweakPaneReady(await utils.getUsername());
});
