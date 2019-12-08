// default config

exports.keys = 'test';

// view 配置
exports.view = {
  defaultViewEngine: 'nunjucks',
  mapping: {
    '.tpl': 'nunjucks',
  },
};

// news 配置
exports.news = {
  pageSize: 10,
  serverUrl: 'https://hacker-news.firebaseio.com/v0',
};

// middleware 配置
exports.middleware = [
  'robot'
];

// robot 配置
exports.robot = {
  ua: [
    /Baiduspider/i,
  ]
};
