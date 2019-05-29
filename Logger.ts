import { LogLevel } from './LogLevel'
export {LogLevel}
export default class Logger {
    private _logLevel = LogLevel.information;
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
            if (value > LogLevel.critical) {
                this._logLevel = LogLevel.critical;
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
        console.trace(Logger.getString(message));
    }

    traceFormat(format, ...args) {
        if (!this.isTraceEnabled) {
            return;
        }
        console.trace(Logger.getformatString(format, args));
    }

    debug(message) {
        if (!this.isDebugEnabled) {
            return;
        }
        console.debug(Logger.getString(message));
    }

    debugFormat(format, ...args) {
        if (!this.isDebugEnabled) {
            return;
        }
        console.debug(Logger.getformatString(format, args));
    }

    info(message) {
        if (!this.isInfoEnabled) {
            return;
        }
        console.info(Logger.getString(message));
    }

    infoFormat(format, ...args) {
        if (!this.isInfoEnabled) {
            return;
        }
        console.info(Logger.getformatString(format, args));
    }

    warn(message) {
        if (!this.isWarnEnabled) {
            return;
        }
        console.warn(Logger.getString(message));
    }

    warnFormat(format, ...args) {
        if (!this.isWarnEnabled) {
            return;
        }
        console.warn(Logger.getformatString(format, args));
    }

    error(message) {
        if (!this.isErrorEnabled) {
            return;
        }
        console.error(Logger.getString(message));
    }

    errorFormat(format, ...args) {
        if (!this.isErrorEnabled) {
            return;
        }
        console.error(Logger.getformatString(format, args));
    }

    critical(message) {
        if (!this.isCriticalEnabled) {
            return;
        }
        console.log('%c ' + Logger.getString(message), 'background:#aaa;color:#FF0000;;font-weight:bold;font-size:16px')
    }

    criticalFormat(message, ...args) {
        if (!this.isCriticalEnabled) {
            return;
        }
        console.log('%c ' + Logger.getformatString(message, args), 'background:#aaa;color:#FF0000;;font-weight:bold;font-size:16px')
    }
    private static regex=new RegExp('(?<!{){[0-9]+}(?!})','g').compile();
    private static getItemString(item:string,args:any[]):string{
        let index=parseInt(item);
        if(index>=args.length){
            return item;
        }
        return JSON.stringify(args[index]);
    }

    private static getformatString(format:string,args) {
        return '[' + new Date().toLocaleString() + '] '+format.replace(Logger.regex,Logger.getItemString)
    }

    private static getString(obj) {
        if (Object.is(obj, undefined)) {
            return '传入日志参数为undefined';
        }
        else
            if (Object.is(obj, null)) {
                return '传入日志参数为null'
            }
        return '[' + new Date().toLocaleString() + '] ' + JSON.stringify(obj);
    }
}

