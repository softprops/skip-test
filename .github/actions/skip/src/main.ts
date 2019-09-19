import { setFailed } from "@actions/core";
import { GitHub } from "@actions/github";
import { env } from "process";

async function run() {
  try {
    console.log("hello")
  } catch (error) {
    setFailed(error.message);
  }
}

run();
