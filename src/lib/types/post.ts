export type PostType = {
  rankType: string;
  position: string;
  name: string;
  tier: string;
  body: string;
  createdDate: string;
};

export type PostInputType = {
  name: string;
  body: string;
  tier: string;
  rankType: PostQueueType;
  position: PostRoleType;
};

export type PostInputKey = keyof PostInputType;

const PostRoleType = <const>[
  '포지션 상관없이 구함',
  '탑',
  '정글',
  '미드',
  '원딜',
  '서폿',
];

export type PostRoleType = (typeof PostRoleType)[number];

const PostQueueType = <const>['솔로랭크', '자유랭크', '무작위총력전', '일반'];

export type PostQueueType = (typeof PostQueueType)[number];
