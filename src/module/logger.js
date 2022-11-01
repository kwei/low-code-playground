import { env } from '../../env.js';
const DEBUG = env.LOG.DEBUG;
const VERBOSE = env.LOG.VERBOSE;
const TIME = env.LOG.TIME;

const INFO_COLOR = "#118AB2";
const WARN_COLOR = "#FFD166";
const SUCCESS_COLOR = "#06D6A0";
const DEBUG_COLOR = "#FFFFFF";
const ERROR_COLOR = "#EF476F";
const DEFAULT_COLOR = "unset";

const trace = () => {
    const errStack = new Error().stack.split('\n').slice(1).join('\n');
    console.log(`%c${errStack}%c`, `color: ${WARN_COLOR}`, `color: ${DEFAULT_COLOR}`);
};

export const Logger = (props) => {
    const { className } = props;
    let _verbose = (...args) => {
        let now = new Date();
        console.log(`${TIME ? now.toISOString() + " " : "" }%c[INFO] ${className}: ${args}%c`, `color: ${INFO_COLOR}`, `color: ${DEFAULT_COLOR}`);
    }
    return {
        debug: (...args) => {
            if(DEBUG === true){
                let now = new Date();
                console.log(`${TIME ? now.toISOString() + " " : "" }%c[DEBUG] ${className}: ${args}%c`, `color: ${DEBUG_COLOR}`, `color: ${DEFAULT_COLOR}`);
            }
        },
        verbose: (...args) => {
            VERBOSE ? _verbose(...args) : null;
        },
        info: (...args) => {
            _verbose(...args);
        },
        success: (...args) => {
            let now = new Date();
            console.log(`${TIME ? now.toISOString() + " " : "" }%c[SUCCESS] ${className}: ${args}%c`, `color: ${SUCCESS_COLOR}`, `color: ${DEFAULT_COLOR}`);
        },
        error: (...args) => {
            let now = new Date();
            console.log(`${TIME ? now.toISOString() + " " : "" }%c[ERROR] ${className}: ${args}%c`, `color: ${ERROR_COLOR}`, `color: ${DEFAULT_COLOR}`);
            trace();
        },
    }

}