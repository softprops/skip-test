import { setFailed } from "@actions/core";
import { GitHub } from "@actions/github";
import { env } from "process";

async function run() {
  try {
    console.log(`hello ${env.GITHUB_REPOSITORY} ${env.GITHUB_SHA} ${env.GITHUB_WORKFLOW}`);
    const gh = new GitHub(env.GITHUB_TOKEN || "");
  } catch (error) {
    setFailed(error.message);
  }
}

run();
