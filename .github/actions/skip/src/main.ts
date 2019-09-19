import { setFailed } from "@actions/core";
import { GitHub } from "@actions/github";
import { env } from "process";

async function run() {
  try {
    console.log(`hello ${env.GITHUB_REPOSITORY} ${env.GITHUB_SHA}`);
    const gh = new GitHub(env.GITHUB_TOKEN || "");
    const [owner, repo] = (env.GITHUB_REPOSITORY || "").split("/");
    const ref = env.GITHUB_SHA || "";
    const status = "in_progress";
    let checksResponse = await gh.checks.listForRef({
      owner,
      repo,
      ref,
      status
    });
    const check_run_id = checksResponse.data.check_runs.map(run => run.id)[0];
    const conclusion = "neutral";
    let checkUpdateResponse = await gh.checks.update({
      check_run_id,
      owner,
      repo,
      conclusion,
      status: "completed"
    });

    console.log(JSON.stringify(checkUpdateResponse, null, 4));
  } catch (error) {
    setFailed(error.message);
  }
}

run();
