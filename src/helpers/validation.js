function validQuery(schema, getQuery) {

    let message = null;
    // get all the keys in the query and the approved structure
    let schemaKeys = Object.keys(schema);
    let getQueryKeys = Object.keys(getQuery);

    // check the number of parameters in the query
    switch (true) {
        /* if the number of parameters is equal to the value of 0,
        the function stops and returns the true value for the result */
        case getQueryKeys.length === 0:
            return setResult()
            break;
        /* if the number of parameters is greater than the number of allowable parameters,
        the function stops and returns the correct value for the result. */
        case getQueryKeys.length > schemaKeys.length:
            message = `Invalid Query! the number of parameters in the query is more than the maximum (${schemaKeys.length}) acceptable parameters!`;
            return setResult(message)
            break;
        default:
            break;
    }

    let validKeys = getQueryKeys.every((key) => {
        /* if the parameter entered in the query is not in the list of allowed parameters,
        the function returns the false value. */
        if (!schemaKeys.includes(key)) {
            message = `The '${key}' parameter is not allowed in the query!`;
            return false;
        }

        /* if the parameter entered in the query does not have a value,
        it removes its function from the query parameters and evaluates the next key. */
        if (!getQuery[key]) {
            delete getQuery[key];
            return true;
        }

        // Check the value of each key entered in the query with the defined rules of that key
        let value = getQuery[key]
        let rules = schema[key]
        for (let rule in rules) {
            let ruleValue = rules[rule]
            switch (rule) {
                /* All values received from the parameter values are in the form of strings.
                Using this section, you can check the number of a value and if it is a value,
                the key is converted to a number */
                case 'number':
                    if (isNaN(+value)) {
                        message = `The value of the '${key}' query parameter must be a number!`
                        return false
                    }
                    getQuery[key] = +value
                    break;

                // Check that the value of this key is equal to one of the limited and allowed values
                case 'range':
                    if (!ruleValue.includes(value)) {
                        message = `The value of the '${key}' query parameter is not approved! Approved values: '${ruleValue}'`
                        return false
                    }
                    break;
                default:
                    return true
                    break;
            }
        }
        return true;
    })

    if (!validKeys) {
        return setResult(message);
    }

    return setResult(message);
}

function setResult(message) {
    return { result: !message, message: message }
}

// this function checks the validity of a url
function validUrl(url) {
    return /^(https?:\/\/)?(\w+[\-\.@]?\w+)+(\.\w+)+([\/\?:][\w%#@\/\?\-_~\.,\+\=\$&'\(\)\*;\:\[\]!]*)?$/.test(url);
}

module.exports = { validQuery, validUrl }