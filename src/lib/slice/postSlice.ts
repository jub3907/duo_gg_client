import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostType } from 'lib/types/post';
import summonerSlice from './summonerSlice';

type PostState = {
  createdAt: number;
  posts: PostType[];
};

const initialState: PostState = {
  createdAt: new Date().getTime(),
  posts: [],
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    initPosts: (state, { payload }: PayloadAction<PostType[]>) => {
      state.posts = payload;
      state.createdAt = payload[payload.length - 1]?.createdAt;
    },
    addPosts: (state, { payload }: PayloadAction<PostType[]>) => {
      state.posts = state.posts.concat(payload);
      state.createdAt = payload[payload.length - 1]?.createdAt;
    },
    addCreatedPost: (state, { payload }: PayloadAction<PostType>) => {
      state.posts = [payload].concat(state.posts);
    },
  },
});

export const selectPostState = ({
  postReducer,
}: {
  postReducer: PostState;
}) => ({ ...postReducer });

export const { initPosts, addPosts, addCreatedPost } = postSlice.actions;
export default postSlice.reducer;
