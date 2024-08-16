module.exports = {
  extends: ['airbnb', 'plugin:prettier/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 2021, // ECMAScript 版本支持，可以根据需要调整
    sourceType: 'module', // 支持 ES 模块
  },
  env: {
    browser: true, // 代码将在浏览器环境下运行
    node: true, // 代码将在 Node.js 环境下运行
    es6: true, // 支持 ES6 语法
  },
  rules: {
    'import/no-extraneous-dependencies': 0, // 关闭 import/no-extraneous-dependencies 规则
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }], // 允许 JSX 语法出现在 .js 文件中
    'react/react-in-jsx-scope': 0, // 在 React 17 及以上版本中，React 不再需要显式导入
    'prettier/prettier': ['error'], // 将 Prettier 的格式化规则作为 ESLint 的错误
  },
  globals: {
    // 在这里添加你的全局变量
  },
};
