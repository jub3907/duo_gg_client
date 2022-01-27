import Layout from '@common/Layout/Layout';
import Container from '@common/Container/Container';
import type { NextPage } from 'next';
import HomeSubHeader from '@pages/Home/HomeSubHeader/HomeSubHeader';
import PageTitleLayout from '@common/Layout/PageTitleLayout';
import Ranking from '@pages/Home/Ranking/Ranking';

const ranking = [
  {
    freeRank: null,
    updatedAt: 1643245892905,
    iconPath:
      'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/profileicon/4631.png',
    id: 'EsLFmBxEIWeIa1WhiET-p1oXRKq6Xejauon7QUlHOPzYCfw',
    name: '디알엑스 태윤',
    profileIconId: 4631,
    puuid:
      'cauUGVIorJzRY1qWsdW1I6UQghHELC84Od9tPTQVLxAqDCgcu0rwKgVC5y_sOpbX313TVPJerYAppA',
    soleRank: {
      leaguePoints: 1087,
      losses: 107,
      rank: 'I',
      tier: 'Challenger',
      wins: 136,
    },
    summonerLevel: 228,
  },
  {
    freeRank: null,
    updatedAt: 1643245892905,
    iconPath:
      'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/profileicon/25.png',
    id: 'amyuHjBZG9dJzpeJtAFn1_vPRU3Z_gdPBLnMl3iIoOdRJXU',
    name: 'Sound 0f Winter',
    profileIconId: 25,
    puuid:
      'AFdb-bJWA8rBTi5js37i2KH33U-49-8IPD0IFtJJXJxxI4KySVLMByJZ8dyMEKTUJjsbrazw96QCnQ',
    soleRank: {
      leaguePoints: 1041,
      losses: 70,
      rank: 'I',
      tier: 'Challenger',
      wins: 114,
    },
    summonerLevel: 517,
  },
  {
    freeRank: null,
    updatedAt: 1643245892905,
    iconPath:
      'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/profileicon/3495.png',
    id: '7DDrsSuk0osGih12fa_1U4AyW4_W--PMbgzsgvKLZiJeHRI',
    name: '칼과 창 방패',
    profileIconId: 3495,
    puuid:
      '9Sz8dzZn4bzC8lRYcIimcl7ayIfR7d64N-fMXxACTsIkFzkas9b647B7cPivZuqim-MTEL2EcZd9VA',
    soleRank: {
      leaguePoints: 1018,
      losses: 78,
      rank: 'I',
      tier: 'Challenger',
      wins: 107,
    },
    summonerLevel: 484,
  },
  {
    freeRank: null,
    updatedAt: 1643245892905,
    iconPath:
      'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/profileicon/1428.png',
    id: 'oR3yVUKz_TVXrldJQZ_Gdy9iu4z74hR4U-u5DG6oIY538tA',
    name: '패배를까먹은사람',
    profileIconId: 1428,
    puuid:
      'X5CVd-dE9aYILIvWqaQeQusZH_5ujy9ckk-TL1gjR5rPpseFMlL2Yx4PpiG0kdIxmkZB6fvhUdlIFA',
    soleRank: {
      leaguePoints: 1013,
      losses: 134,
      rank: 'I',
      tier: 'Challenger',
      wins: 163,
    },
    summonerLevel: 88,
  },
  {
    freeRank: null,
    updatedAt: 1643245892905,
    iconPath:
      'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/profileicon/3846.png',
    id: 'KoweN8EojzOoD1NjMSQUx8rvUYfAE_t6qU597ChcORDRwoM',
    name: 'whisper snow',
    profileIconId: 3846,
    puuid:
      'Cv1qAl1WTvnYA-xhl9P00Qaoy4g_Av893YO_G9SC0KY0S6W6-qUuFW1d9AE8dMu2hDaJurpJIayK_g',
    soleRank: {
      leaguePoints: 1012,
      losses: 115,
      rank: 'I',
      tier: 'Challenger',
      wins: 151,
    },
    summonerLevel: 543,
  },
  {
    freeRank: null,
    updatedAt: 1643245892905,
    iconPath:
      'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/profileicon/23.png',
    id: 'Lolo-JRV-mjAwqXfPabsVfYJK752r0BE4ppreXIpHtPHk7ocEV9OqcLlSg',
    name: 'Pupupupw',
    profileIconId: 23,
    puuid:
      'tOCyCTFJn7pIVgo4BBUFF_RzM-OBv4YjdWPMgCO-EEkX47pMtVNnUc8cRBH3JfJo3HGjiumK61fJkA',
    soleRank: {
      leaguePoints: 906,
      losses: 120,
      rank: 'I',
      tier: 'Challenger',
      wins: 147,
    },
    summonerLevel: 100,
  },
  {
    freeRank: null,
    updatedAt: 1643245892905,
    iconPath:
      'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/profileicon/4903.png',
    id: 'rHvGglOBU4v0Ou26d_CaXMYEU-dTBMFIXR4lrDivqTjQBg',
    name: 'Nierland',
    profileIconId: 4903,
    puuid:
      '9qIoTH8K3DQeaggoTuF0uCX5cgh4IdLzXeTFEieE3ZT8NIDfAIHd6gSuIqLMyZRWbU_BMFtrsvT79Q',
    soleRank: {
      leaguePoints: 899,
      losses: 33,
      rank: 'I',
      tier: 'Challenger',
      wins: 70,
    },
    summonerLevel: 319,
  },
  {
    freeRank: null,
    updatedAt: 1643245892905,
    iconPath:
      'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/profileicon/3495.png',
    id: 'V395j6J4U-cszcuQfv24OM2Mb9V5yXQLyuzb3DiCy6dN9Fq6OLpk_cwxtQ',
    name: '0o0OoO',
    profileIconId: 3495,
    puuid:
      'foiOUZTEXCKrVsGHbN-Geb_uSA31aySgtDJsUnJ4AOwqlEtwnpM5EiuJOOho6SqAuPaJ1nNuM7RKLQ',
    soleRank: {
      leaguePoints: 885,
      losses: 91,
      rank: 'I',
      tier: 'Challenger',
      wins: 110,
    },
    summonerLevel: 59,
  },
  {
    freeRank: null,
    updatedAt: 1643245892905,
    iconPath:
      'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/profileicon/2074.png',
    id: 'zdqrVOX34VLPEvhTUquRO1MKv1qvHr6DI8rsliL4FeXTV0Q',
    name: 'fragiIe',
    profileIconId: 2074,
    puuid:
      'N2lsgWOHvG5l9JWndZ2V94k5oHkycufBixJiJHVmyqNg4edqZBIQ2Q-KCxcUEgnJxS3s0Fu2yK7UBw',
    soleRank: {
      leaguePoints: 815,
      losses: 112,
      rank: 'I',
      tier: 'Challenger',
      wins: 138,
    },
    summonerLevel: 209,
  },
  {
    freeRank: null,
    updatedAt: 1643245892905,
    iconPath:
      'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/profileicon/4568.png',
    id: 'LKZjxQZFBpSP9z-vBt3f_HPyicMyvPrG5Jm_5ovVfmxwKXQ',
    name: '버기해적단 버기',
    profileIconId: 4568,
    puuid:
      '-Lpi-4ER24HCGqEZKOedyGRM944KeHicua_7mPN2D34afH8LD71LPL0ROAFaTJ7pYUQlO8-Sfvj3zg',
    soleRank: {
      leaguePoints: 801,
      losses: 110,
      rank: 'I',
      tier: 'Challenger',
      wins: 141,
    },
    summonerLevel: 200,
  },
];

const Home: NextPage = () => {
  return (
    <Layout subHeader={<HomeSubHeader />} activeMenu="summoner">
      <PageTitleLayout title="소환사 랭킹">
        <Ranking summoners={ranking} />
      </PageTitleLayout>
    </Layout>
  );
};

export default Home;
