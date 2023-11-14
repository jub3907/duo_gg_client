export type PostType = {
  rankType: PostRankType;
  position: PostRoleType;
  name: string;
  tier: string;
  body: string;
  createdDate: number;
};

export type PostFormType = {
  name: string;
  body: string;
  tier: string;
  rankType: PostRankType;
  position: PostRoleType;
};

export type PostInputKey = keyof PostFormType;

const PostRoleType = <const>[
  '모든 포지션',
  '탑',
  '정글',
  '미드',
  '원딜',
  '서폿',
];

export type PostRoleType = (typeof PostRoleType)[number];

const PostRankType = <const>['솔로랭크', '자유랭크', '무작위총력전', '일반'];

export type PostRankType = (typeof PostRankType)[number];
