let sub_cat = []
let brands = []
let price = []
let bprice = ""
let eprice = ""
const priceMin = document.getElementById("price-min")
const priceMax = document.getElementById("price-max")
const catDiv = document.getElementById("cat-choice")
const inputCatList = catDiv.querySelectorAll("input")
const brandDiv = document.getElementById("brand-choice")
const inputBrandList = brandDiv.querySelectorAll("input")



if (document.getElementById('price-min') && document.getElementById('price-max')) {
    
    document.getElementById('price-min').oninput = () => {

        if (priceMin.value == 0) {
        
            setTimeout(() => {
                priceMin.value = "" 
            }, 100);
      
        }
    
    }

    document.getElementById('price-max').oninput = () => {

        if (priceMax.value == 0) {
        
            setTimeout(() => {
                priceMax.value = "" 
            }, 100);
      
        }
    
    }

}



if (document.getElementById('cat-choice')) {

    document.getElementById('cat-choice').onclick = () => {


        for (let i = 0; i < inputCatList.length; i++) {
           
            if (inputCatList[i].checked == true) {
    
                if (sub_cat.indexOf(inputCatList[i].value) == -1) {
    
                    sub_cat.push(inputCatList[i].value)
                    
                }
                
            } else {
    
                if (sub_cat.indexOf(inputCatList[i].value) != -1) {
    
                    sub_cat.splice(sub_cat.indexOf(inputCatList[i].value),1)
                    
                }
    
            }
            
        }
    
    
        //console.log("subCat : ",sub_cat)
    
    }
    
}



if (document.getElementById('brand-choice')) {
    
    document.getElementById('brand-choice').onclick = () => {

        for (let i = 0; i < inputBrandList.length; i++) {
           
            if (inputBrandList[i].checked == true) {
    
                if (brands.indexOf(inputBrandList[i].value) == -1) {
    
                    brands.push(inputBrandList[i].value)
                    
                }
                
            } else {
    
                if (brands.indexOf(inputBrandList[i].value) != -1) {
    
                    brands.splice(brands.indexOf(inputBrandList[i].value),1)
                    
                }
    
            }
            
        }
    
    
        //console.log("brands : ",brands)
    
    }

}



if (document.getElementById('btn-filter')) {

    document.getElementById('btn-filter').onclick = () => {

        if (priceMin.value != "" && priceMin.value != 0 && priceMax.value != "" && priceMax.value != 0) {
            
            price.push(priceMin.value)
            price.push(priceMax.value)
            bprice = priceMin.value
            eprice = priceMax.value
    
        } else {price = []}
    
        if (sub_cat.length > 0 || brands.length > 0 || price.length > 0 ) {
           
      
            location.href = "/products/list/1?cat="+sub_cat+"&bprice="+bprice+"&eprice="+eprice+"&brand="+brands
    
    
        } else {
    
            document.getElementById("alert_msg").innerHTML = 
            "<div class='alert alert-danger' role='alert'>Manque d'informations ! </div>"
            $('#alert_modal').modal('show');
    
        }
    
    }
    
}

