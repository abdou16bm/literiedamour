let globalSub_cat = []

fetch("/api/subcat/list")
.then(response => response.json())
.then(result => globalSub_cat = result.sub_category)


const cat_select = document.querySelector("[name='product_category']")
const sub_cat_select = document.querySelector("[name='product_sub_cat']")
if (cat_select && sub_cat_select) {

    cat_select.oninput = ()=>{

        sub_cat_select.innerHTML = ""
        const sub_cat_list = globalSub_cat.filter(x=> x["cat_id"] == cat_select.value)
        if (sub_cat_list.length > 0) {
            
            if (typeof(subCat_list_id) != "undefined" && subCat_list_id.length > 0) {

                sub_cat_list.forEach((sub_cat) => {
        
                    sub_cat_select.innerHTML += "<option " + 
                    (subCat_list_id.indexOf(parseInt(sub_cat.sub_cat_id)) != -1 ? 'selected' : '') + 
                    " value='"+sub_cat.sub_cat_id+"'>"+sub_cat.sub_cat_name+"</option>"
        
                });
    
                sub_cat_select.removeAttribute("disabled")

            } else {

                sub_cat_list.forEach((sub_cat) => {
        
                    sub_cat_select.innerHTML += "<option value='"+sub_cat.sub_cat_id+"'>"+sub_cat.sub_cat_name+"</option>"
        
                });
    
                sub_cat_select.removeAttribute("disabled")

            }

        } else sub_cat_select.setAttribute("disabled","disabled")

    }

}


setTimeout(() =>cat_select.oninput(), 200);