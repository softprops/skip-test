"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const github_1 = require("@actions/github");
const process_1 = require("process");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(`hello ${process_1.env.GITHUB_REPOSITORY} ${process_1.env.GITHUB_SHA}`);
            const gh = new github_1.GitHub(process_1.env.GITHUB_TOKEN || "");
            const [owner, repo] = (process_1.env.GITHUB_REPOSITORY || "").split("/");
            const ref = process_1.env.GITHUB_SHA || "";
            const status = "in_progress";
            let checksResponse = yield gh.checks.listForRef({
                owner,
                repo,
                ref,
                status
            });
            const check_run_id = checksResponse.data.check_runs.map(run => run.id)[0];
            const conclusion = "neutral";
            let checkUpdateResponse = yield gh.checks.update({
                check_run_id,
                owner,
                repo,
                conclusion
            });
            console.log(JSON.stringify(checkUpdateResponse.data, null, 4));
        }
        catch (error) {
            core_1.setFailed(error.message);
        }
    });
}
run();
