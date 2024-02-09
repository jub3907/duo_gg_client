import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostFormType, PostType } from 'lib/types/post';
import summonerSlice from './summonerSlice';
import moment from 'moment';

type PostState = {
  posts: PostType[];
};

const initialState: PostState = {
  posts: [],
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    initPosts: (state, { payload }: PayloadAction<PostType[]>) => {
      state.posts = payload;
    },
    addPosts: (state, { payload }: PayloadAction<PostType[]>) => {
      state.posts = state.posts.concat(payload);
    },
    addCreatedPost: (state, { payload }: PayloadAction<PostFormType>) => {
      state.posts = [{ createdDate: moment.now(), ...payload }].concat(
        state.posts,
      );
    },
    clearPosts: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const selectPostState = ({
  postReducer,
}: {
  postReducer: PostState;
}) => ({ ...postReducer });

export const { initPosts, addPosts, addCreatedPost, clearPosts } =
  postSlice.actions;
export default postSlice.reducer;
