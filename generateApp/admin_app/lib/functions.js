
const isNumber = (values) => { 

    let check = true
    values.forEach(val => 
    isNaN(parseFloat(val)) || isNaN(val - 0) ? check = false : false);

    return check

}


const isValidate = (values,callback) => { 

    let check = true
    if (values.length > 0) {
        
        values.forEach(val => 
        typeof(val) == "undefined" || val == null || val == "null" || val.toString().trim() == "" ? check = false : false);

    }

    callback ? callback(check) : false

}


const filter_generate = (arrayFilter,callback) => {

    let myFilter = ""
    let filterClause = ""
    
    if (arrayFilter.length > 0) {
        
        arrayFilter.forEach(filter => {
            
            myFilter != "" ? filterClause = "and" : filterClause = "where"

            myFilter +=  filterClause + " (" + filter + ") "

        });

    }

    callback ? callback(null,myFilter) : false

}



exports.isNumber = isNumber;
exports.isValidate = isValidate;
exports.filter_generate = filter_generate