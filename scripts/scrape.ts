import axios from 'axios';
import * as cheerio from 'cheerio';
import {encode} from 'gpt-3-encoder';

const BASE_URL = "http://www.paulgraham.com";

const getLinks = async () => {
  const html = await axios.get(`${BASE_URL}/articles.html`);
  const $ = cheerio.load(html.data);
  const tables = $("table");

  const linkArr: { url: string; title: string }[] = [];

  tables.each((i, table) => {
    if (i === 2) {
      const links = $(tables).find("a");
      links.each((i, link) => {
        const url = $(link).attr("href");
        const title = $(link).text();

        if (url && url.endsWith(".html")) {
          const linkObj = { 
            url, 
            title
          };
          
          linkArr.push(linkObj);
        }
      });
    }
  });

  return linkArr;
};

(async () => {
  const links = await getLinks();
  console.log(links);

})();