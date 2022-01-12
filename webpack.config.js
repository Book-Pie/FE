const path = require("path");
const webpack = require("webpack");
// 웹팩이 자동으로 html를 build 파일에 넣어주고
// script, link 태그를 유저가 아닌 웹팩이 자동으로 넣어준다.
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
// 웹팩 build시 이전 build 내용물을 제거해준다.
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// 웹팩 데브서버 핫 리로딩 시 필요한 플러그인
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
require("dotenv").config();

// 절대 경로로 바꿔주는 기능
const getAbsolutePath = pathDir => path.resolve(__dirname, pathDir);
const PRODUCTION = "production";
const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID ?? "";
const KAKAO_CLIENT_KEY = process.env.KAKAO_JDK_KEY ?? "";
const KAKAO_REDIRECT_PATH_DEV = "http://localhost:3000/oAuth/kakao";
const KAKAO_REDIRECT_PATH_PRO = "http://www.react-dev.p-e.kr/oAuth/kakao";
const KAKAO_OAUTH_URL_DEV = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_PATH_DEV}&response_type=code`;
const KAKAO_OAUTH_URL_PRO = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_PATH_PRO}&response_type=code`;
const NAVER_OAUTH_URL_DEV =
  "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=qtbZhYGrYVHhLWesnRyJ&redirect_uri=http://localhost:3000/oAuth/naver&state=state";
const NAVER_OAUTH_URL_PRO =
  "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=qtbZhYGrYVHhLWesnRyJ&redirect_uri=http://www.react-dev.p-e.kr/oAuth/naver&state=state";
const BASE_URL_DEV = "http://localhost:3000/api";
const BASE_URL_PRO = "http://3.34.100.122:8080/api";

module.exports = (_, argv) => {
  const { mode } = argv;
  const config = {
    // 프로젝트 이름
    name: "book-pie",
    // 프로젝트 모드 develoment, production
    mode,
    // 개발 시 필요한 소스맵 등록
    devtool: mode === PRODUCTION ? "source-map" : "eval-source-map",

    resolve: {
      // 확장자를 생략 시 웹팩한태 어떤 확장자를 생략 했는지 알려준다.
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
      // tsconfig에 path alias를 쓰고싶다면 웹팩이 빌드할때 해당 경로를 알 수 있도록 해줘야한다.
      // path를 등록 했다면 개발 툴에서는 경로를 인식하지만 웹팩 빌드 시 웹팩은 해당 경로를 모른다.
      // example const bar_1 = require("@src/bar"); 웹팩은 이렇게 들어가서 못찾느다.
      // 1. tsconfig.json path 등록 > 2. 웹팩 alias도 등록
      alias: {
        "@mui/styled-engine": "@mui/styled-engine-sc",
        src: getAbsolutePath("src"),
        api: getAbsolutePath("src/api"),
        assets: getAbsolutePath("src/assets"),
        components: getAbsolutePath("src/components"),
        hooks: getAbsolutePath("src/hooks"),
        modules: getAbsolutePath("src/modules"),
        pages: getAbsolutePath("src/pages"),
        style: getAbsolutePath("src/assets/style/"),
        utils: getAbsolutePath("src/utils"),
        router: getAbsolutePath("src/router"),
      },
    },

    // 웹팩이 어느 파일 부터 번들링을 해야되는지 설정
    entry: "./src/index.tsx",

    module: {
      rules: [
        {
          // ts,tsx 확장자를 찾아서 트랜스 파일링 한다.
          test: /\.(ts|tsx)$/,
          // 웹팩이 번들링을 제외 시킬 파일을 지정해줄 수 있다.
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            // 기존에 번들링 한 환경을 캐시해놨다가 다시 쓴다.
            // 빌드 속도 향상
            cacheDirectory: true,
            // .babelrc에 설정을 하던 여기에하던 취향대로하면된다.
            // React 17이상 사용하는 경우 import React를 생략 했다면 빌드 할땐 React를 포함하도록 해줘야한다.
            // 안 그러면 런타임 시점에 React가 없어서 작동을 못한다.
            presets: [
              ["@babel/preset-react", { runtime: "automatic" }],
              // ts 트랜스 파일링은 ts-loader , @babel/preset-typescript 둘 중 하나를 쓸 수 있다.
              // 밑에 자료에 차이점을 설명해준다.
              // https://github-wiki-see.page/m/woowa-techcamp-2021/store-4/wiki/babel-loader-%26-%40babel-preset-typescript-vs-ts-loader-%EA%B0%84%EB%8B%A8%ED%95%9C-%EC%A0%95%EB%A6%AC
              "@babel/preset-typescript",
              [
                // @babel/preset-env란? https://babeljs.io/docs/en/babel-preset-env
                // es6 이후 문법을 es5 문법으로 변환을 하는데 필요한 plugin을 모아둔 preset이다.
                // 안쓴다면 우리가 쓴 기능에대해서 하나하나 plugin을 추가 해줘야한다.
                // example 에로우 함수를 썼다면 @babel/plugin-transform-arrow-functions 플러그인을 추가해줘야한다.
                // @babel/preset-env대상 환경에 필요한 구문 변환(및 선택적으로 브라우저 폴리필)을
                // 세세하게 관리할 필요 없이 최신 JavaScript를 사용할 수 있는 스마트 사전 설정입니다.
                // 이것은 당신의 삶을 더 쉽게 만들고 JavaScript 번들을 더 작게 만듭니다!
                "@babel/preset-env",
                {
                  modules: false,
                  targets: {
                    // 5% in KR 한국에서 점유율 5%이상
                    // last 2 versions(크롬,오페라,엣지,파이어폭스) 최근 2개 버전의 브라우저를 선택하는 쿼리입니다
                    // https://blog.shiren.dev/2020-12-01/
                    browsers: ["last 2 versions", ">= 5% in KR"],
                  },
                },
              ],
            ],
            plugins:
              // @babel/plugin-transform-runtime es7 async await 폴리필 해주는 역할
              // react-refresh/babel 핫 리로딩
              // transform-remove-console build 시 error,warn console을 제외한 나머지는 모두 삭제해준다.
              // babel-plugin-styled-components dev시 styled-components 디버그를 편하게 해준다.
              // example App__test.icasd012 이런 형태로 class이름이 정해진다. App컴포넌트 하위에 Test 컴포넌트
              mode === PRODUCTION
                ? [
                    "@babel/plugin-transform-runtime",
                    ["transform-remove-console", { exclude: ["error", "warn"] }],
                    [
                      "babel-plugin-direct-import",
                      {
                        modules: ["@mui/material", "@mui/icons-material"],
                      },
                    ],
                  ]
                : ["@babel/plugin-transform-runtime", "babel-plugin-styled-components", "react-refresh/babel"],
          },
        },
        {
          // url-loader는 제한된 용량을 초과 시 file-loader 기능을 제공해준다.
          // 그래서 url-loader와 file-loader 둘 다 의존성 추가해줘야된다.
          test: /\.(png|jpg|gif|svg)$/i,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 8192,
                name: "[name].[ext]",
              },
            },
          ],
        },
        {
          // css-loader, style-loader
          // react-quill 사용을 할려면 css-loader가 필요하다.
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },

    plugins: [new CleanWebpackPlugin(), new HtmlWebpackPlugin({ template: "./public/index.html" })],

    output: {
      path: getAbsolutePath("build"),
      filename: "[name].[chunkhash].js",
      publicPath: "/",
      clean: true, // 내보내기 전에 output 디렉토리를 정리합니다.
    },

    // https://webpack.js.org/configuration/dev-server/ devServer.hot참조
    // webpack-dev-server v4이상 부터 HMR(new webpack.HotModuleReplacementPlugin())이 기본적으로 활성화되어 있습니다.
    // 핫 리로딩은 하는법
    // 1. hot: "only" 설정
    // 2. @pmmmwh/react-refresh-webpack-plugin && react-reflash/babel추가
    devServer: {
      port: 3000,
      // 서버가 시작된 후 브라우저를 열도록 dev-server에 지시합니다.
      // open: true,
      // 제공되는 모든 항목에 대해 gzip 압축을 활성화합니다.
      compress: true,
      // dev-serve에 없는 라우팅에 대해서는 index.html를 반환
      historyApiFallback: true,
      devMiddleware: {
        publicPath: "/",
      },
      // 설정한 url에 대해서 dev-serve가 Forward 프록시를 해준다.
      proxy: {
        "/api": {
          target: "http://3.34.100.122:8080",
          changeOrigin: true,
        },
        "/ttb": {
          target: "http://www.aladin.co.kr",
          changeOrigin: true,
        },
      },
    },
  };

  // 배포 환경
  if (mode === PRODUCTION && config.plugins) {
    // config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: "server", openAnalyzer: true }));
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.KAKAO_OAUTH_URL": JSON.stringify(KAKAO_OAUTH_URL_PRO),
        "process.env.NAVER_OAUTH_URL": JSON.stringify(NAVER_OAUTH_URL_PRO),
        "process.env.REDUX_DEV_TOOL": JSON.stringify(false),
        "process.env.BASE_URL": JSON.stringify(BASE_URL_PRO),
        "process.env.KAKAO_CLIENT_ID": JSON.stringify(KAKAO_CLIENT_ID),
        "process.env.KAKAO_JDK_KEY": JSON.stringify(KAKAO_CLIENT_KEY),
        "process.env.KAKAO_REDIRECT_PATH": JSON.stringify(KAKAO_REDIRECT_PATH_PRO),
      }),
    );
  }

  // 개발환경
  if (mode !== PRODUCTION && config.plugins) {
    // webpack v4 이상 부턴 hmr이 기본으로 들어가있다.
    // config.plugins.push(new webpack.HotModuleReplacementPlugin());
    // config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: "server", openAnalyzer: true }));
    config.plugins.push(new ReactRefreshWebpackPlugin());
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.KAKAO_OAUTH_URL": JSON.stringify(KAKAO_OAUTH_URL_DEV),
        "process.env.NAVER_OAUTH_URL": JSON.stringify(NAVER_OAUTH_URL_DEV),
        "process.env.REDUX_DEV_TOOL": JSON.stringify(true),
        "process.env.BASE_URL": JSON.stringify(BASE_URL_DEV),
        "process.env.KAKAO_CLIENT_ID": JSON.stringify(KAKAO_CLIENT_ID),
        "process.env.KAKAO_JDK_KEY": JSON.stringify(KAKAO_CLIENT_KEY),
        "process.env.KAKAO_REDIRECT_PATH": JSON.stringify(KAKAO_REDIRECT_PATH_DEV),
      }),
    );
  }

  return config;
};
