async function insertComic() {
    const getURL = (url: string, queries: {[key: string]: string}) => {
      const urlSchema = new URL(url);
      const params = new URLSearchParams(queries);
      urlSchema.search = params.toString();
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
  
      const comicSection = document.getElementById('comic');
      
      // Call a separate function to update the DOM with the comic data
      updateComicDOM(comicSection, data);
        
    } catch (error) {
      console.log('An error occurred:', error);
    }
  }
  
  function updateComicDOM(comicSection: HTMLElement | null, data: {img: string, alt: string, title: string, year: number, month: number, day: number}) {
    if (!comicSection) return;
  
    // Create the elements you want to add
    const comicImage = document.createElement('img');
    comicImage.src = data.img;
    comicImage.alt = data.alt;
    comicImage.style.width = '30%';
  
    const titleParagraph = document.createElement('p');
    titleParagraph.textContent = data.title;
  
    const dateParagraph = document.createElement('p');
    const event = new Date(Date.UTC(data.year, data.month - 1, data.day));
    dateParagraph.textContent = event.toLocaleDateString("en-US", { weekday: undefined, year: 'numeric', month: 'long', day: 'numeric' });
  
    // Add the elements to the section
    comicSection.appendChild(comicImage);
    comicSection.appendChild(titleParagraph);
    comicSection.appendChild(dateParagraph);
  }
  
  // Call the function after the page loads
  window.addEventListener('load', insertComic);
  