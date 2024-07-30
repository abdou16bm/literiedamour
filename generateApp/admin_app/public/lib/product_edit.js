let globalSub_cat = []

fetch("/api/subcat/list")
.then(response => response.json())
.then(result => globalSub_cat = result.sub_category)


const cat_select = document.querySelector("[name='product_category']")
const sub_cat_select = document.querySelector("#product_sub_cat")
const subcat_selection = document.querySelector("#subcat-selection")
const product_form = document.querySelector("#product-form")

if (cat_select && sub_cat_select) {

    cat_select.oninput = ()=>{

        sub_cat_select.innerHTML = ""
        const sub_cat_list = globalSub_cat.filter(x=> x["cat_id"] == cat_select.value)
        if (sub_cat_list.length > 0) {
            
            if (typeof(subCat_list_id) != "undefined" && subCat_list_id.length > 0) {

                sub_cat_list.forEach((sub_cat) => {
        
                    sub_cat_select.innerHTML += "<option " + 
                    (subCat_list_id.indexOf(parseInt(sub_cat.sub_cat_id)) != -1 ? 'selected' : '') + 
                    " value='"+sub_cat.sub_cat_id+"'>"+sub_cat.sub_cat_name+"</option>";

                    subCat_list_id.indexOf(parseInt(sub_cat.sub_cat_id)) != -1 ? 
                    createSubcatELement(sub_cat.sub_cat_id,sub_cat.sub_cat_name,subCat_list_price[subCat_list_id.indexOf(parseInt(sub_cat.sub_cat_id))]) 
                    : false
        
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


    sub_cat_select.oninput = () => setSelection()

}

function setSelection() {
    
    const options = sub_cat_select.querySelectorAll("option");

    options.forEach(option => {
  
        if (option.selected == true && !subcat_selection.querySelector("#subcat" + option.value)) 
        createSubcatELement(option.value,option.innerText,0)
        else if (option.selected == false && subcat_selection.querySelector("#subcat" + option.value)) 
        subcat_selection.querySelector("#subcat" + option.value).remove()

    });

}

function createSubcatELement(id,text,price) {

    const div = document.createElement("div");
    div.className = "d-flex justify-content-between align-items-center gap-4 my-3 subcat-block";
    div.id = "subcat" + id;
    div.setAttribute("subcatId",id);
    div.innerHTML = '<input type="text" class="form-control" disabled readonly value="' + text + '">' +
    '<input type="number" class="form-control" id="subcat-price" value="' + price + '" placeholder="prix">'

    subcat_selection.append(div)

}

product_form.onsubmit = (e) => {
   
    e.preventDefault()

    let product_subcat = [];
    const subcat_block = subcat_selection.querySelectorAll(".subcat-block");
    subcat_block.forEach(block => product_subcat.push({id : block.getAttribute("subcatId"), price : block.querySelector("#subcat-price").value}));

    console.log(product_subcat);

    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "product_sub_cat";
    input.value = JSON.stringify(product_subcat);
    product_form.append(input);
    
    product_form.submit()

}

setTimeout(() =>cat_select.oninput(), 200);