import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SummonerBasicType } from 'lib/types/summoner';

export type SummonerSliceType = SummonerBasicType & {
  gameName: string;
  tagLine: string;
};

const initialState: SummonerSliceType = {
  summonerId: '',
  name: '',
  puuid: '',
  profileIconId: null,
  revisionDate: null,
  summonerLevel: null,

  gameName: '',
  tagLine: '',
};

const summonerSlice = createSlice({
  name: 'summoner',
  initialState,
  reducers: {
    initSummonerState: (
      state,
      { payload }: PayloadAction<SummonerSliceType>,
    ) => {
      state.summonerId = payload.summonerId;
      state.name = payload.name;
      state.puuid = payload.puuid;
      state.profileIconId = payload.profileIconId;
      state.revisionDate = payload.revisionDate;
      state.summonerLevel = payload.summonerLevel;
      state.gameName = payload.gameName;
      state.tagLine = payload.tagLine;
    },
    clearSummonerState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const selectSummonerState = ({
  summonerReducer,
}: {
  summonerReducer: SummonerSliceType;
}) => ({
  ...summonerReducer,
});
export const { initSummonerState, clearSummonerState } = summonerSlice.actions;
export default summonerSlice.reducer;
