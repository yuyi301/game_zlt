export const playerTemplate = {
  id: "xiaoyu",
  name: "小羽",
  hp: 100,
  maxHp: 100,
  energy: 3,
  portrait: "./assets/generated/xiaoyu.png",
};

export const skills = [
  { id: "pulse", name: "脉冲切线", energyCost: 1, damage: 14 },
  { id: "phase", name: "相位偏折", energyCost: 2, damage: 24 },
  { id: "order_break", name: "失序裁决", energyCost: 3, damage: 38 },
];

export const enemyPool = [
  { id: "glitch_guard", name: "异常守卫", hp: 55, maxHp: 55, damage: 8, sprite: "./assets/generated/glitch_guard.png" },
  { id: "void_parser", name: "虚空解析体", hp: 70, maxHp: 70, damage: 10, sprite: "./assets/generated/void_parser.png" },
];

export const chapters = [
  {
    id: "chapter_1",
    name: "漂移城区",
    intro: "协议崩坏后，城市模块开始无序重排。",
  },
];
