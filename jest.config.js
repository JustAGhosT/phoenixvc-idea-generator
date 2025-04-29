module.exports = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    "/node_modules/",
    "/.next/",
    "/dist/",
    "/.storybook/",
    "\\.stories\\.tsx$",
    "\\.stories-.*\\.tsx$"
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"] }]
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js"
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"]
};