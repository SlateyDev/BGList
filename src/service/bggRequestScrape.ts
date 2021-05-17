import json5 from 'json5';

//Get further game details (no login)
//Note: request will get 301 - redirect if you don't use the correct tag
export const bggGetGameDetailsUsingScrape = async (
  objectId: number,
  objectTag: string,
) => {
  try {
    const response = await fetch(
      `https://boardgamegeek.com/boardgame/${objectId}/${objectTag}`,
      {
        method: 'GET',
      },
    );
    const html = await response.text();

    const re = /GEEK\.(?<key>.*?) = (?<value>.*?);[\n]/gs;
    let match = re.exec(html);
    if (match?.groups) {
      do {
        if (!match.groups) {
          continue;
        }
        console.log(`Key: ${match.groups.key}`);
        console.log(json5.parse(match.groups.value));
      } while ((match = re.exec(html)));
    }
  } catch (error) {
    console.error(error);
  }
};
