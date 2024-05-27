export async function transparency(boolean, rgba) {
   if (boolean) {
      window.Effect.apply('unified', {
         color: rgba,
      });
   } else {
      window.Effect.clear();
   }
}

export async function makeDraggable(element) {
   element.addEventListener('mousedown', (e) => {
      e.preventDefault();
      // drag only with middle mouse button
      if (e.button !== 1) {
         return;
      }
      const { clientX, clientY } = e;
      const { left, top } = element.getBoundingClientRect();
      const offsetX = clientX - left;
      const offsetY = clientY - top;

      const onMouseMove = (e) => {
         const { clientX, clientY } = e;
         element.style.left = `${clientX - offsetX}px`;
         element.style.top = `${clientY - offsetY}px`;
      };

      const onMouseUp = () => {
         document.removeEventListener('mousemove', onMouseMove);
         document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
   });
}

export function checkOutOfBounds(element) {
   let cont = document.getElementsByClassName(element)[0];

   let body = document.getElementById('body').getBoundingClientRect();
   // get container bounds
   let bounds = body.getBoundingClientRect();

   // if pane is outside of body bounds
   if (
      cont.getBoundingClientRect().left < bounds.left ||
      cont.getBoundingClientRect().top < bounds.top ||
      cont.getBoundingClientRect().right > bounds.right ||
      cont.getBoundingClientRect().bottom > bounds.bottom
   ) {
      // smooth transition to new position
      cont.style.transition = 'all 0.5s ease-in-out';
      cont.style.top = '50px';
      cont.style.left = '50px';
      // disable interaction
      cont.style.pointerEvents = 'none';
      // wait for transition to finish
      setTimeout(() => {
         cont.style.transition = 'none';
         cont.style.pointerEvents = 'all';
      }, 500);
   }
}

export async function getUsername() {
   const res = await fetch('/lol-summoner/v1/current-summoner');
   return (await res.json())['displayName'];
}
