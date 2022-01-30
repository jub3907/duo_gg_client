import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SummonerBasic } from 'lib/types/summoner';

type SummonerState = {
  id: string;
  name: string;
  puuid: string;
};

const initialState: SummonerState = {
  id: '',
  name: '',
  puuid: '',
};

const summonerSlice = createSlice({
  name: 'summoner',
  initialState,
  reducers: {
    initSummonerState: (state, { payload }: PayloadAction<SummonerBasic>) => {
      state.id = payload.id;
      state.name = payload.name;
      state.puuid = payload.puuid;
    },
    clearSummonerState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const selectSummonerState = ({
  summonerReducer,
}: {
  summonerReducer: SummonerState;
}) => ({
  ...summonerReducer,
});
export const { initSummonerState, clearSummonerState } = summonerSlice.actions;
export default summonerSlice.reducer;
