import styles from './RefreshSummonerButton.module.scss';
import { Button } from '@mui/material';
import { initializeApollo } from 'lib/apollo/apolloClient';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';

// TODO : button click event 구현

const BASIC_SUMMONER_INFO = gql`
  mutation basicSummonerInfo($name: String!) {
    basicSummonerInfo(name: $name) {
      freeRank {
        leaguePoints
        losses
        rank
        tier
        wins
      }
      iconPath
      id
      name
      profileIconId
      puuid
      soleRank {
        leaguePoints
        losses
        rank
        tier
        wins
      }
      summonerLevel
      updatedAt
    }
  }
`;

const RefreshSummonerButton = () => {
  const router = useRouter();

  return (
    <Button
      variant="outlined"
      fullWidth
      onClick={() => {
        router.reload();
      }}
    >
      전적 갱신
    </Button>
  );
};

export default RefreshSummonerButton;
