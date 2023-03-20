import { ChallengeController } from '../controllers/index.js';
export const ChallengeRouter = (router) => {
    router.get("/", ChallengeController.getHome);
    router.get("/info", ChallengeController.getInfo);
}