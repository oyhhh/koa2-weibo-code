/**
 * 大写代表返回类
 */

class BeseModel {
    constructor({code, data, message}) {
        this.code = code
        if (data) {
            this.data = data
        }
        if (message) {
            this.message = message
        }
    }
}

class SuccessModel extends BeseModel {
    constructor({data}) {
        super({
            code: 200,
            data
        })
    }
}

class ErrorModel extends BeseModel {
    constructor({code, message}) {
        super({
            code,
            message
        })
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}