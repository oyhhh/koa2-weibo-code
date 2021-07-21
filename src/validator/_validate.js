const Ajv = require('ajv')
const ajv = new Ajv({})

/**
 *
 * @param schema json schema规则
 * @param data 待校验的数据
 * @returns {any}
 */
function validate(schema, data = {}) {
    const valid = ajv.validate(schema, data)
    if (!valid) {
        return ajv.errors[0]
    }
}

module.exports = validate