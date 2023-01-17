import { dest, lastRun, parallel, series, src, watch } from "gulp";
import nodemon from "gulp-nodemon";
import alias from "gulp-ts-alias";
import ts from "gulp-typescript";

interface IGulpTSAliasPaths {
  [key: string]: string[] | undefined;
}

const tsProject = ts.createProject("tsconfig.json");
const tsConfig = tsProject.config;
const tsOption = tsProject.options;
const OUT_PATH = tsOption.outDir || "dist";
const TRANSPILE_PATH = tsConfig.include || "./src/**/*.ts";

const transpile = () =>
  src(TRANSPILE_PATH, {
    allowEmpty: true,
    since: lastRun(transpile),
    sourcemaps: true,
  })
    .pipe(
      alias({
        configuration: {
          paths: tsOption.paths as IGulpTSAliasPaths,
        },
      }), // type이 달라 맞춰주기 위한 처리
    )
    .pipe(tsProject())
    .pipe(
      dest(OUT_PATH, {
        sourcemaps: ".",
      }),
    );

const monit = () => {
  const watcher = watch(TRANSPILE_PATH, transpile);

  watcher.on("change", (path) => {
    // 파일 내용 변경 이벤트
    console.log(`File ${path} was changed`);
  });

  watcher.on("add", (path) => {
    // 파일 추가 이벤트
    console.log(`File ${path} was added`);
  });

  watcher.on("unlink", (path) => {
    // 파일 삭제 이벤트
    console.log(`File ${path} was removed`);
  });
};

const start = () =>
  nodemon({
    delay: 500,
    // ext: "ts",
    script: OUT_PATH,
    // watch: ["src"], // Gulp watch를 사용하기 때문에 불필요
  });

export const build = series(transpile);

export default series(transpile, parallel(monit, start));
