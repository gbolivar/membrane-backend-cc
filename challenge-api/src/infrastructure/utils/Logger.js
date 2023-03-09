import log4js from "log4js";
/**
 * Author Gregorio Bolivar <elalconxvii@gmail.com>
 * Version 1.0.1
 * Description: Module for logging
 * Create: 2021-10-07 10:14
 * last update: 2021-12-07 00:14
 */

export const log = {
    uuid(msg) {

        if (typeof process.env.UUID !== 'undefined') {
            return this.getModule() + '  ' + process.env.UUID + ' | ' + msg
        } else {
            return this.getModule() + '  -- | ' + msg
        }

    },
    load(module) {
        this.module = module;
    },
    getModule() {
        if (typeof this.module == 'undefined') {
            this.module = 'Core';
        }
        return this.module;
    },
    main() {
        const date = new Date();
        const today = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        const hour = '-' + ('0' + date.getHours()).slice(-2);
        const fileLog = process.env.LOG4J_PATH_LOG + today + '/' + today + hour + '_' + process.env.LOG4J_FILE_LOG
        log4js.configure({
            appenders: { cheese: { type: "file", filename: fileLog } },
            categories: { default: { appenders: ["cheese"], level: "error" } }
        });
        const logger = log4js.getLogger("cheese");
        logger.level = "debug";
        return logger;
    },
    debug(msg) {
        let log = this.main()
        log.debug(this.uuid(msg));
    },
    info(msg) {
        let log = this.main()
        log.info(this.uuid(msg));
    },
    warn(msg) {
        let log = this.main()
        log.warn(this.uuid(msg));
    },
    error(msg) {
        let log = this.main()
        log.error(this.uuid(msg));
    },
    fatal(msg) {
        let log = this.main()
        log.fatal(this.uuid(msg));
    }
}