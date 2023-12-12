


let form_check = function (values,callback) {

    let check = 0
    console.log("values check : ",values)

    for (let i = 0; i < values.length; i++) {
    
        if (typeof(values[i]) == "undefined" || values[i] == null || values[i] == "null" ||values[i] == "") {check = 1; break}
    
    }
   
   
    if (callback){
    
        if (check == 0) callback({statusNumber : 0, statusText : "valid"})
        else if (check == 1) callback({statusNumber : 1, statusText : "invalid"})
    
    }  

}




exports.form_check = form_check