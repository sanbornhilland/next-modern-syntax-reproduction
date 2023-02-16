This repo provides reproduction steps for a Next.JS build failure when importing TS files with private identifiers from external directories.

## Setup

1. The Next.JS app is located in `my-app`
1. `externalDir: true` is set in `next.config.js`
1. The `my-app/pages/index.tsx` file imports `src/Main.ts` which include private identifiers

## Reproduction Steps

1. Run `yarn install` in `my-app`
1. Run `yarn build` in `my-app`

## Result

```
../src/Main.ts:2:3
Type error: Private identifiers are only available when targeting ECMAScript 2015 and higher.

  1 | export default class Main {
> 2 |   #message = "Hello World";
    |   ^
  3 |
  4 |   printMessage() {
  5 |     console.log(this.#message);
error Command failed with exit code 1.
```

## Expected

This code will build just fine and should not be treated as a TS error. If the same code is imported from within the Next.JS app e.g. from `my-app/Main.ts` then the build does not fail. I would expect that since the module being imported in both cases is identical, then the type checking should produce the same result in both cases.

Note that setting `typescript.ignoreBuildErrors = true` in `next.config.js` suppresses the type error and the module is transformed corretly in the build output. So the TS warning seems to be incorrect and inconsistent with the build output.
