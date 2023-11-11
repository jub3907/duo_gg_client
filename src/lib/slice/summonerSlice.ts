import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SummonerBasicType } from 'lib/types/summoner';

const initialState: SummonerBasicType = {
  summonerId: '',
  name: '',
  puuid: '',
  profileIconId: null,
  revisionDate: null,
  summonerLevel: null,
};

const summonerSlice = createSlice({
  name: 'summoner',
  initialState,
  reducers: {
    initSummonerState: (
      state,
      { payload }: PayloadAction<SummonerBasicType>,
    ) => {
      state.summonerId = payload.summonerId;
      state.name = payload.name;
      state.puuid = payload.puuid;
      state.profileIconId = payload.profileIconId;
      state.revisionDate = payload.revisionDate;
      state.summonerLevel = payload.summonerLevel;
    },
    clearSummonerState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const selectSummonerState = ({
  summonerReducer,
}: {
  summonerReducer: SummonerBasicType;
}) => ({
  ...summonerReducer,
});
export const { initSummonerState, clearSummonerState } = summonerSlice.actions;
export default summonerSlice.reducer;
