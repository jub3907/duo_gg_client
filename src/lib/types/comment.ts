export type CommentType = {
  commentId: number;
  // LocalDateTime, YYYY-MM-DD[T]HH:mm:ss.SSS
  createdDate: string;
  nickname: string;
  content: string;
};
