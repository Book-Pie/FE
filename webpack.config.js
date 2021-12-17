const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 절대 경로로 바꿔주는 기능
const getAbsolutePath = (pathDir) => path.resolve(__dirname, pathDir);

const PRODUCTION = "production";
const PORT = 8080;

module.exports = (_, { mode }) => {
  const config = {
    // 프로젝트 이름
    name: "book-pie",
    // 프로젝트 모드 develoment, production
    mode,
    // https://webpack.js.org/configuration/devtool/
    devtool: mode === PRODUCTION ? "hidden-source-map" : "eval-source-map",
    // example
    // devtool: mode === PRODUCTION ? "eval-source-map" : "eval-source-map",

    resolve: {
      // 확장자를 생략 할 수 있다.
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
      // example var bar_1 = require("@src/bar"); 이렇게 들어가서 못찾느다
      // tsconfig에 path alias를 쓰고싶다면 웹팩이 빌드할때 해당 경로를 알 수 있도록 해줘야한다.
      alias: {
        src: getAbsolutePath("src"),
        utils: getAbsolutePath("src/utils"),
        style: getAbsolutePath("src/style"),
        components: getAbsolutePath("src/components"),
      },
    },

    // 1 느낌 시작(entry)
    // 2 웹팩이 코드를 사용해야되는데 어떤 도구를 이용할지.(module)
    // 3 웹팩 번들링된 후 추가적으로 이용한 모듈(plugin)
    // 4 번들링(output)

    // 번들링 시작 부분
    entry: "./src/index.tsx",

    module: {
      rules: [
        {
          // 정규식으로 가져온다.
          // *.(ts|tsx)
          test: /\.(ts|tsx)$/,
          // 웹팩이 번들링을 안해도되는 파일을 지정해줄 수 있다.
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            // .babelrc에 설정을 하던 여기에하던 취향대로하면된다.
            presets: [
              "@babel/preset-react",
              // ts-loader , @babel/preset-typescript 둘 중 하나를 써야 ts를 컴파일러해준다.
              // 둘 차이점은 북마크에 있음
              "@babel/preset-typescript",
              [
                // [번역] babel-preset-env는 무엇이고 왜 필요한가?
                // 공부가 좀더 필요하다 es6 이후 문법을 es5 문법으로 변환을 하는데 필요한 plugin을 모아둔거
                // https://babeljs.io/docs/en/babel-preset-env
                // @babel/plugin-transform-arrow-functions 에로우 함수는 해당 플러그인을 이용해야된다.
                // @babel/preset-env대상 환경에 필요한 구문 변환(및 선택적으로 브라우저 폴리필)을 세세하게 관리할 필요 없이 최신 JavaScript를 사용할 수 있는 스마트 사전 설정입니다.
                // 이것은 당신의 삶을 더 쉽게 만들고 JavaScript 번들을 더 작게 만듭니다!
                "@babel/preset-env",
                {
                  modules: "auto",
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
              mode === PRODUCTION
                ? ["@babel/plugin-transform-runtime"]
                : ["@babel/plugin-transform-runtime", "react-refresh/babel"],
          },
        },
        {
          test: /\.css$/,
          // PRODUCTION 환경이면 MiniCssExtractPlugin.loader css로 따로 추출
          // DEV "style-loader","css-loader",
          use: [
            mode === PRODUCTION ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
          ],
        },
      ],
    },

    //example
    // css-loader는 css파일을 임포트 할 수 있도록하는 역할
    // style-loader는 style태그를 만들어서 내용물을 넣어주는
    // use:[ "style-loader","css-loader",]

    plugins: [
      // 빌드를 하기전에 이전에 빌드된 결과물을 지워준다.
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({ template: "./public/index.html" }),
      // [name].[chunkhash] 이렇게하면 장점은 캐시가 적용이안된다.
      // new MiniCssExtractPlugin({ filename: "[name].[chunkhash].css" }),
      new ReactRefreshWebpackPlugin(),
    ],
    // ...(mode === PRODUCTION
    //   ? [new MiniCssExtractPlugin({ filename: "[name].css" })]
    //   : []),

    output: {
      path: getAbsolutePath("dist"),
      filename: "[name].[chunkhash].js",
      // 정적파일 경로를 지정해준다.
      publicPath: "/",
    },

    // https://webpack.js.org/configuration/dev-server/ devServer.hot참조
    //webpack-dev-server v4부터 HMR이 기본적으로 활성화되어 있습니다.
    // 핫 리로딩은 하는법
    // 1. hot: "only" 설정은 주던지
    // 2. @pmmmwh/react-refresh-webpack-plugin && react-reflash/babel추가

    devServer: {
      port: PORT,
      // 서버가 시작된 후 브라우저를 열도록 dev-server에 지시합니다. 로 설정하여 true기본 브라우저를 엽니 다.
      open: true,
      // 프로토콜을 https를 이용
      //제공되는 모든 항목에 대해 gzip 압축 을 활성화합니다 .
      compress: true,
      // 없는 라우터는 index.html로 반환
      historyApiFallback: true,
      devMiddleware: {
        publicPath: "/",
      },
      proxy: {
        "/api": "http://localhost:5000",
      },
    },
  };

  return config;
};
