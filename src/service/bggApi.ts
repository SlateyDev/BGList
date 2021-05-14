import {parse} from 'fast-xml-parser';
import {BggGameListDefinition} from '../interface/bggGameListDefinition';

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

export const bggGetGameList = async (
  username: string,
): Promise<BggGameListDefinition | undefined> => {
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

    return {
      totalItems: responseData.items['@_totalitems'],
      termsOfUse: responseData.items['@_termsofuse'],
      pubDate: responseData.items['@_pubdate'],
      items: responseData.items.item.map((item: any) => ({
        collId: item['@_collid'],
        objectId: item['@_objectid'],
        objectType: item['@_objecttype'],
        subType: item['@_subtype'],
        image: item.image,
        name: {
          text: item.name['#text'],
          sortIndex: item.name['@_sortindex'],
        },
        numPlays: item.numplays,
        stats: {
          maxPlayers: item.stats['@_maxplayers'],
          maxPlaytime: item.stats['@_maxplaytime'],
          minPlayers: item.stats['@_minplayers'],
          minPlaytime: item.stats['@_minplaytime'],
          numOwned: item.stats['@_numowned'],
          playingTime: item.stats['@_playingtime'],
          rating: {
            value: item.stats.rating['@_value'],
            average: {
              value: item.stats.rating.average['@_value'],
            },
            bayesianAverage: {
              value: item.stats.rating.bayesaverage['@_value'],
            },
            median: {
              value: item.stats.rating.median['@_value'],
            },
            standardDeviation: {
              value: item.stats.rating.stddev['@_value'],
            },
            usersRated: {
              value: item.stats.rating.usersrated['@_value'],
            },
          },
        },
        status: {
          forTrade: item.status['@_fortrade'],
          lastModified: item.status['@_lastmodified'],
          own: item.status['@_own'],
          preOrdered: item.status['@_preordered'],
          previouslyOwned: item.status['@_prevowned'],
          want: item.status['@_want'],
          wantToBuy: item.status['@_wanttobuy'],
          wantToPlay: item.status['@_wanttoplay'],
          wishlist: item.status['@_wishlist'],
          wishlistPriority: item.status['@_wishlistpriority'],
        },
        thumbnail: item.thumbnail,
        yearPublished: item.yearpublished,
      })),
    };
  } catch (error) {
    console.error(error);
  }
};
