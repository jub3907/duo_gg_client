import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MatchBasicType } from 'lib/types/match';

type MatchBasicState = {
  count: number;
  matches: MatchBasicType[];
};

const initialState: MatchBasicState = {
  count: 0,
  matches: [],
};

const MatchBasicSlice = createSlice({
  name: 'matchBasic',
  initialState,
  reducers: {
    initMatchBasics: (state, { payload }: PayloadAction<MatchBasicType[]>) => {
      state.matches = payload;
      state.count = state.matches.length;
    },
    addMatchBasics: (state, { payload }: PayloadAction<MatchBasicType[]>) => {
      state.matches = state.matches.concat(payload);
      state.count = state.matches.length;
    },
    clearMatchBasicState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const selectMatchBasicState = ({
  matchBasicReducer,
}: {
  matchBasicReducer: MatchBasicState;
}) => ({ ...matchBasicReducer });

export const { initMatchBasics, addMatchBasics, clearMatchBasicState } =
  MatchBasicSlice.actions;
export default MatchBasicSlice.reducer;
