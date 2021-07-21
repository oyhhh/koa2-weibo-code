const {jsonSchemaFileInfo} = require('../model/ErrorInfo')
function genValidator(validateFn) {
    async function validator(ctx, next) {
        const data = ctx.request.body
        const error = validateFn(data)
        if (error) {
            ctx.body = new ErrorModel(jsonSchemaFileInfo)
        }
        await next
    }

    return validator
}

module.exports = {
    genValidator
}