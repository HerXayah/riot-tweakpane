export async function processLink(link) {
   try {
      const url = new URL(link);

      if (url.hostname === 'www.youtube.com' && url.pathname === '/watch') {
         const videoId = url.searchParams.get('v');
         if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
         }
      } else if (url.hostname === 'youtu.be') {
         const videoId = url.pathname.slice(1); // youtu.be/VIDEO_ID
         if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
         }
      } else {
         throw new Error('Invalid YouTube link');
      }
   } catch (error) {
      throw new Error('Invalid URL format');
   }
}

export async function replaceLinks(link) {
   if (link.includes('youtube.com')) {
      link = `${link}?showinfo=0&rel=0&autohide=1&autoplay=1&widget_referrer=leagueclient`;
   }

   const element = document.querySelector(
      '#rcp-fe-viewport-root > section.rcp-fe-viewport-overlay > div:nth-child(3) > lol-uikit-full-page-modal > span > div > iframe'
   );

   if (!element) {
      throw new Error('Iframe element not found');
   }

   if (link.includes('youtube.com')) {
      element.src = link;
   } else {
      throw new Error('Invalid YouTube link');
   }
}
