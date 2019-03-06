import { LogLevel } from './LogLevel.js'
export { LogLevel }
export class Logger {
    _logLevel = LogLevel.information;
    constructor() {
        // this.logLevel = ;
    }

    isLogLevelEnabled(logLevel) {
        return this._logLevel <= logLevel;
    }

    get logLevel() {
        return this._logLevel;
    }

    set logLevel(value) {
        if (value < LogLevel.none) {
            this._logLevel = LogLevel.none;
        }
        else
            if (value > LogLevel.Critical) {
                this._logLevel = LogLevel.Critical;
            }
            else {
                this._logLevel = value;
            }
    }



    get isTraceEnabled() {
        return this.isLogLevelEnabled(LogLevel.trace);
    }

    get isDebugEnabled() {
        return this.isLogLevelEnabled(LogLevel.debug);
    }

    get isInfoEnabled() {
        return this.isLogLevelEnabled(LogLevel.information);
    }

    get isWarnEnabled() {
        return this.isLogLevelEnabled(LogLevel.warning);
    }

    get isErrorEnabled() {
        return this.isLogLevelEnabled(LogLevel.error);
    }

    get isCriticalEnabled() {
        return this.isLogLevelEnabled(LogLevel.critical);
    }

    trace(message) {
        if (!this.isTraceEnabled) {
            return;
        }
        console.trace(getString(message));
    }

    traceFormat(format, ...args) {
        if (!this.isTraceEnabled) {
            return;
        }
        console.trace(getformatString(format, args));
    }

    debug(message) {
        if (!this.isDebugEnabled) {
            return;
        }
        console.debug(getString(message));
    }

    debugFormat(format, ...args) {
        if (!this.isDebugEnabled) {
            return;
        }
        console.debug(getformatString(format, args));
    }

    info(message) {
        if (!this.isInfoEnabled) {
            return;
        }
        console.info(getString(message));
    }

    infoFormat(format, ...args) {
        if (!this.isInfoEnabled) {
            return;
        }
        console.info(getformatString(format, args));
    }

    warn(message) {
        if (!this.isWarnEnabled) {
            return;
        }
        console.warn(getString(message));
    }

    warnFormat(format, ...args) {
        if (!this.isWarnEnabled) {
            return;
        }
        console.warn(getformatString(format, args));
    }

    error(message) {
        if (!this.isErrorEnabled) {
            return;
        }
        console.error(getString(message));
    }

    errorFormat(format, ...args) {
        if (!this.isErrorEnabled) {
            return;
        }
        console.error(getformatString(format, args));
    }

    critical(message) {
        if (!this.isCriticalEnabled) {
            return;
        }
        console.log('%c ' + getString(message), 'background:#aaa;color:#FF0000;;font-weight:bold;font-size:16px')
    }

    criticalFormat(message, ...args) {
        if (!this.isCriticalEnabled) {
            return;
        }
        console.log('%c ' + getformatString(message, args), 'background:#aaa;color:#FF0000;;font-weight:bold;font-size:16px')
    }
}

function getformatString(format, args) {
    let target = {};
    if (args.length > 1) {

        for (let arg of args) {
            target = Object.assign(target, arg)
        }
    }
    else {
        target = args[0];
    }
    if(!format.startsWith('`'))
    {
        format='`'+format+'`';
    }
    let func = new Function('data','return ' + format);
    return '[' + new Date().toLocaleString() + ']' + func(target);
}

function getString(obj) {
    if (Object.is(obj, undefined)) {
        return '传入日志参数为undefined';
    }
    else
        if (Object.is(obj, null)) {
            return '传入日志参数为null'
        }
    return '[' + new Date().toLocaleString() + '] ' + JSON.stringify(obj);

}





// trace:0,
// debug:1,
// information:2,
// warning:3,
// error:4,
// critical:5,