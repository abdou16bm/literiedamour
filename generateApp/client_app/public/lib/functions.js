

if (document.getElementById("select_brand")) {
    
    document.getElementById("select_brand").oninput = function () {

        if (document.querySelector("input[catId]") && document.getElementById("select_product")) {

            const subCat = document.querySelector("input[catId]").getAttribute("catId");
            const brand = document.getElementById("select_brand").value

            if (typeof(subCat) != "undefined" && subCat != "" && typeof(brand) != "undefined" && brand != "") {

                fetch('/api/products/'+brand+'/'+subCat)
                .then((response) => {
                    return response.json()
                }).then((data) => {
                    

                    document.getElementById("select_product").innerHTML = ""
                    for (let i = 0; i < data.products.length; i++) {
                
                        document.getElementById("select_product").innerHTML += 
                        "<option value='" + data.products[i].product_id + "'>" + data.products[i].product_name + "</option>"
        
                    }

                    setTimeout(() => {
                        document.getElementById("select_product").oninput()
                    }, 100);
                    
                }).catch((err)=>{

                    console.log(err)

                })
        
            } else {

                document.getElementById("alert_msg").innerHTML = 
                "<div class='alert alert-danger' role='alert'>Manque d'informations !</div>"
                $('#alert_modal').modal('show');

            }

            
        } else {

            document.getElementById("alert_msg").innerHTML = 
            "<div class='alert alert-danger' role='alert'>Manque d'informations !</div>"
            $('#alert_modal').modal('show');

        }

    }

    document.getElementById("select_brand").oninput()
    setTimeout(() => {
        document.getElementById("select_product").oninput()
    }, 100); 

}

if (document.getElementById("btn_compare")) {
 
    document.getElementById("btn_compare").onclick = function () {
    
        if (document.querySelector("input[idp]") && document.getElementById("select_product")) {
    
            const product1 = document.querySelector("input[idp]").getAttribute("idp");
            const product2 = document.getElementById("select_product").value
        
            if (typeof(product1) != "undefined" && product1 != "" && typeof(product2) != "undefined" && product2 != "") {
        
                if (product1 != product2) {
                    
                    location.href = "/products/compare/"+product1+"/"+product2
                
                } else {
    
                    document.getElementById("alert_msg").innerHTML = 
                    "<div class='alert alert-danger' role='alert'>Les produits doivent étre différents ! </div>"
                    $('#alert_modal').modal('show');
    
                }
                 
                
            } else {
        
                document.getElementById("alert_msg").innerHTML = 
                "<div class='alert alert-danger' role='alert'>Manque d'informations !</div>"
                $('#alert_modal').modal('show');
        
            }
    
        } else {
            
            document.getElementById("alert_msg").innerHTML = 
            "<div class='alert alert-danger' role='alert'>Manque d'informations ! </div>"
            $('#alert_modal').modal('show');
    
        }
    
    }
    
}




if (document.getElementById("searchInput") && document.getElementById("searchBtn")) {
    
    document.getElementById("searchBtn").onclick = (e)=>{

        e.preventDefault()
        let searchProduct = document.getElementById("searchInput").value

        if (searchProduct != null && typeof(searchProduct) != "undefined" && searchProduct!=""){

            window.location.href='/products/list/1?product='+searchProduct.trim()
            
        } else {

            document.getElementById("alert_msg").innerHTML = '<div class="alert alert-danger" role="alert">Veuillez renseigner le champs de recherche.</div>'
            setTimeout(() => {
                
                $('#alert_modal').modal('show');
                
            }, 500);


        }

    }

}



if (document.getElementById("wilaya_checkout") && document.getElementById("delivery_price") && document.getElementById("order_total")) {
    
    document.getElementById("wilaya_checkout").oninput = function () {
        
        // price get from view checkout
        const price = productPrice
        const wilaya = document.getElementById("wilaya_checkout").value

        fetch("/api/delivery/price/"+wilaya)
        .then((response)=>response.json())
        .then(data=>{

            if (data.err != null) { 

                console.log(data.err)
            
            } else {

                console.log(data)
                let formating=Intl.NumberFormat('en-US')

                let deliveryPriceElement = document.getElementById("delivery_price")
                let orderTotalElement = document.getElementById("order_total")

                if (data.delivery_price != null && data.delivery_price != "" ) {
                    

                    deliveryPriceElement.innerText = formating.format(data.delivery_price[0].delivery_price)+" DA" 
                    
                    orderTotalElement.innerText = formating.format(price + data.delivery_price[0].delivery_price)+" DA"  


                } else {

                    deliveryPriceElement.innerText = "0.00 DA" 
                    
                    orderTotalElement.innerText = formating.format(price)+" DA"  

                }

            }
        
        })

    }

    document.getElementById("wilaya_checkout").oninput()

}






fetch("/api/cat/list")
.then((response)=>response.json())
.then(data=>{


    if (data.err != null && typeof(data.err) != "undefined") {

        console.log(data.err)     

    } else {

        if (document.getElementById("header_cat")) {

            document.getElementById("header_cat").innerHTML = ""
            
            for (let i = 0; i < data.category.length; i++) {
    
                document.getElementById("header_cat").innerHTML +=
                
                "<li><a href='/products/list/1?cat="+data.category[i].cat_id+"&bprice=&eprice='>"+data.category[i].cat_name+"</a></li>"
    
            }

        }

        if (document.getElementById("footer_cat")) {

            document.getElementById("footer_cat").innerHTML = ""
            
            for (let i = 0; i < data.category.length; i++) {
    
                document.getElementById("footer_cat").innerHTML +=
    
                "<li><a href='/products/list/1?cat="+data.category[i].cat_id+"&bprice=&eprice='>"+data.category[i].cat_name+"</a></li>"
                
            }

        }

    }
    
})
    

