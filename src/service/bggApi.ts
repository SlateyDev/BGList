import {parse} from 'fast-xml-parser';
import {GameDefinition} from '../interface/gameDefinition';

const decodeMap: any = {amp: '&', lt: '<', gt: '>', quot: '"'};
const decodeText = (text: string) =>
  text.replace(/&([^;]+);/g, (m: string, c: string) => {
    if (c.startsWith('#')) {
      return String.fromCharCode(parseInt(c.substr(1), 10));
    } else {
      return decodeMap[c] ?? m;
    }
  });

export const bggCheckLogin = async (): Promise<string | undefined> => {
  try {
    const response = await fetch(
      'https://boardgamegeek.com/api/accounts/current',
      {
        method: 'GET',
      },
    );

    if (response.status === 200) {
      const loggedInDetails = await response.json();
      return loggedInDetails.username;
    }
  } catch {
    return undefined;
  }
};

export const bggLogin = async (
  username: string,
  password: string,
): Promise<Response> => {
  return fetch('https://boardgamegeek.com/login/api/v1', {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({
      credentials: {username: username, password: password},
    }),
  });
};

export const bggLogout = async (): Promise<Response> => {
  return fetch('https://boardgamegeek.com/logout', {
    method: 'GET',
  });
};

function intOrUndefined(value: any) {
  return !isNaN(value) ? parseInt(value, 10) : undefined;
}

function floatOrUndefined(value: any) {
  return !isNaN(value) ? parseFloat(value) : undefined;
}

//Note: this request can fail and has not yet been handled
export const bggGetGameList = async (
  username: string,
): Promise<GameDefinition[] | undefined> => {
  try {
    const response = await fetch(
      `https://www.boardgamegeek.com/xmlapi/collection/${username}`,
      {
        method: 'GET',
      },
    );

    const responseXml = await response.text();
    const responseData = parse(responseXml, {
      ignoreAttributes: false,
      allowBooleanAttributes: true,
    });

    return responseData.items.item.map((item: any) => {
      return {
        collectionId: parseInt(item['@_collid'], 10),
        objectId: parseInt(item['@_objectid'], 10),
        imageUri: item.image,
        name: decodeText(item.name['#text']),
        numPlays: parseInt(item.numplays, 10),
        maxPlayers: parseInt(item.stats['@_maxplayers'], 10),
        maxPlaytime: intOrUndefined(item.stats['@_maxplaytime']),
        minPlayers: parseInt(item.stats['@_minplayers'], 10),
        minPlaytime: intOrUndefined(item.stats['@_minplaytime']),
        numOwned: parseInt(item.stats['@_numowned'], 10),
        playingTime: intOrUndefined(item.stats['@_playingtime']),
        rating: floatOrUndefined(item.stats.rating['@_value']),
        average: parseFloat(item.stats.rating.average['@_value']),
        bayesianAverage: parseFloat(item.stats.rating.bayesaverage['@_value']),
        median: parseFloat(item.stats.rating.median['@_value']),
        standardDeviation: parseFloat(item.stats.rating.stddev['@_value']),
        usersRated: parseFloat(item.stats.rating.usersrated['@_value']),
        forTrade: parseInt(item.status['@_fortrade'], 10) !== 0,
        lastModified: item.status['@_lastmodified'],
        own: parseInt(item.status['@_own'], 10) !== 0,
        preOrdered: parseInt(item.status['@_preordered'], 10) !== 0,
        previouslyOwned: parseInt(item.status['@_prevowned'], 10) !== 0,
        want: parseInt(item.status['@_want'], 10) !== 0,
        wantToBuy: parseInt(item.status['@_wanttobuy'], 10) !== 0,
        wantToPlay: parseInt(item.status['@_wanttoplay'], 10) !== 0,
        wishlist: parseInt(item.status['@_wishlist'], 10) !== 0,
        wishlistPriority:
          intOrUndefined(item.status['@_wishlistpriority']) ?? 0,
        thumbnailUri: item.thumbnail,
        yearPublished: parseInt(item.yearpublished, 10),
      };
    });
  } catch (error) {
    console.error(error);
  }
};

//Search for game
//request(GET): http://www.boardgamegeek.com/xmlapi/search?search=Crossbows%20and%20Catapults
//further querystring params: exact=1
//response: XML data
export const bggSearchGames = async (
  searchText: string,
  exact: boolean = false,
) => {
  try {
    const response = await fetch(
      `https://boardgamegeek.com/xmlapi/search?search=${encodeURIComponent(
        searchText,
      )}${exact ? '&exact=1' : ''}`,
      {
        method: 'GET',
      },
    );

    const responseXml = await response.text();

    const responseData = parse(responseXml, {
      attributeNamePrefix: 'attr_',
      textNodeName: 'innerText',
      ignoreAttributes: false,
      allowBooleanAttributes: true,
      arrayMode: true,
    });

    return (
      responseData.boardgames[0]?.boardgame?.map((item: any) => {
        return {
          objectId: item.attr_objectid,
          name: decodeText(item.name[0].innerText ?? item.name[0]),
          yearPublished: item.yearpublished,
        };
      }) ?? []
    );
  } catch (error) {
    console.error(error);
  }
};
