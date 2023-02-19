async function insertComic() {
    const getURL = (url, queries) => {
      const urlSchema = new URL(url);
      const params = new URLSearchParams(queries);
      urlSchema.search = params;
      return urlSchema;
    };
  
    try {
      const urlToGetId = getURL('https://fwd.innopolis.app/api/hw2', {
        email: 't.aizatvafin@innopolis.university',
      });
      const resp = await fetch(urlToGetId);
      const comicId = await resp.text();
      const urlToGetComic = getURL('https://getxkcd.vercel.app/api/comic', {
        num: comicId,
      });
      const resp1 = await fetch(urlToGetComic);
      const data = await resp1.json();
  
      const event = new Date(Date.UTC(data.year, data.month, data.day));
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      document.getElementById('comic').innerHTML = `
        <img src="${data.img}" alt="${data.alt}">
        <p>${data.title}</p>
        <p>${event.toLocaleDateString('en-US', options)}</p>
      `;
    } catch (error) {
      console.log('An error occurred:', error);
    }
  }
  
  insertComic();
  