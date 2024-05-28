export async function processLink(link) {
   try {
      const url = new URL(link);

      if (url.hostname === 'www.youtube.com' && url.pathname === '/watch') {
         const videoId = url.searchParams.get('v');
         if (videoId) {
            return `https://cdpn.io/pen/debug/oNPzxKo?v=${videoId}`;
         }
      } else if (url.hostname === 'youtu.be') {
         const videoId = url.pathname.slice(1); // youtu.be/VIDEO_ID
         if (videoId) {
            return `https://cdpn.io/pen/debug/oNPzxKo?v=${videoId}`;
         }
      } else {
         throw new Error('Invalid YouTube link');
      }
   } catch (error) {
      throw new Error('Invalid URL format');
   }
}

export async function replaceLinks(link) {
   console.log(link);

   const element = document.querySelector(
      '#rcp-fe-viewport-root > section.rcp-fe-viewport-overlay > div:nth-child(3) > lol-uikit-full-page-modal > span > div > iframe'
   );

   if (!element) {
      throw new Error('Iframe element not found');
   }

   if (link.includes('cdpn.io')) {
      element.src = link;
   } else {
      throw new Error('Invalid YouTube link');
   }

   element.src = link;
}
