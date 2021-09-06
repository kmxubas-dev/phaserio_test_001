// import { IP } from './IP.js';

const PATH_ASSETS =  '/game/assets/';
export const CST = {
    // DOMAIN: IP,
    SPINE: {
        CHARACTER: {
            IMAGE: PATH_ASSETS+'CHARACTER/spineboy-pma.png',
            JSON: PATH_ASSETS+'CHARACTER/spineboy-pro.json',
            ATLAS: PATH_ASSETS+'CHARACTER/spineboy-pma.atlas'
        },
        ALIEN: {
            IMAGE: PATH_ASSETS+'ALIEN/alien-pma.png',
            JSON: PATH_ASSETS+'ALIEN/alien-pro.json',
            ATLAS: PATH_ASSETS+'ALIEN/alien-pma.atlas'
        }
    },
    ASSETS: {
        MENU_BG: PATH_ASSETS+'MENU_BG.png',
        GAME_BG: PATH_ASSETS+'GAME_BG.png',
        BUTTON: PATH_ASSETS+'BUTTON.png',
        BTN_ROUND: PATH_ASSETS+'BTN_ROUND.png',

        BRANCH: PATH_ASSETS+'BRANCH.png',
        GROUND: PATH_ASSETS+'GROUND.png',
        BULLET: PATH_ASSETS+'BULLET.png'
    },
}
