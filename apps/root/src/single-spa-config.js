import { registerApplication, start } from "single-spa";

registerApplication(
  "@portfolio/guess-the-play",
  () => System.import("@portfolio/guess-the-play"),
  () => false,
);

start();
