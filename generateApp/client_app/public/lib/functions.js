let productToCart_btn_list = document.querySelectorAll(".productToCart_btn")
let myInputQte_list = document.querySelectorAll(".myInputQte")
let myBtnDelete_list = document.querySelectorAll(".myBtnDelete")
let cart_wait = localStorage.getItem("cartWait")
let formating=Intl.NumberFormat('en-US')
let btn_ToCheckout = document.querySelectorAll(".btn-ToCheckout")
let btnSubCatPrice = document.querySelectorAll(".btnSubCatPrice")
let productToCartPrice = 0;
let product_price = document.querySelector("#product_price");


function checkout(idp) {

    fetch("/api/checkout/" + idp)
        .then(response => response.json())
        .then(result => {

            console.log("multi product : ",result.multi)
            if (result.multi == false) location.href = "/checkout/"+idp
            else if (result.multi == true) {

                if (typeof(result.err) != "undefined" && result.err != null){

                    if (result.err.code == "ER_DUP_ENTRY") {

                        console.log("Product exixts.")
                        document.getElementById("alert_msg").innerHTML = '<div class="alert alert-info" role="alert">Produit existe déja dans votre panier. <a href="/cart">Voir panier</a></div>'
                        setTimeout(() => {

                            $('#alert_modal').modal('show');

                        }, 500);

                    } else console.log(result.err)

                }
                else {

                    console.log("Product add to cart.");
                    setTimeout(() => {

                        $('#cart_modal').modal('show');

                    }, 500);

                    loadDropCart()

                }

            }

        })

}

if (btn_ToCheckout.length > 0) {

    for (let i = 0; i < btn_ToCheckout.length; i++) {

        let idp = btn_ToCheckout[i].getAttribute("idp")
        btn_ToCheckout[i].addEventListener("click",()=>checkout(idp))

    }

}

if (btnSubCatPrice.length > 0) {
    for (let i = 0; i < btnSubCatPrice.length; i++) {
        btnSubCatPrice[i].addEventListener("click",() => {
            let subCatBlock = btnSubCatPrice[i];
            productToCartPrice = subCatBlock.getAttribute("data")
            product_price.innerText = formating.format(productToCartPrice)+" DA"
        })
    }
}



/* if (document.getElementById("select_brand")) {

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

} */




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



if (document.getElementById("wilaya_checkout") && document.querySelector(".deliveryType") && document.getElementById("delivery_price") && document.getElementById("order_total")) {

    document.getElementById("wilaya_checkout").oninput = function () {

        // price get from view checkout
        const price = productPrice
        const wilaya = document.getElementById("wilaya_checkout").value
        const type = document.querySelector(".deliveryType").value

        fetch("/api/delivery_price/"+wilaya+"/"+type)
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


if (document.getElementById("wilaya_checkout") && document.querySelector(".deliveryType")){

    document.querySelector(".deliveryType").oninput = () =>
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

                        "<li><a href='/products/list/1?catP="+data.category[i].cat_id+"&bprice=&eprice='>"+data.category[i].cat_name+"</a></li>"

                }

            }

            if (document.getElementById("footer_cat")) {

                document.getElementById("footer_cat").innerHTML = ""

                for (let i = 0; i < data.category.length; i++) {

                    document.getElementById("footer_cat").innerHTML +=

                        "<li><a href='/products/list/1?catP="+data.category[i].cat_id+"&bprice=&eprice='>"+data.category[i].cat_name+"</a></li>"

                }

            }

        }

})



if (typeof(productToCart_btn_list) != "undefined" && productToCart_btn_list.length > 0) {

    for (let i = 0; i < productToCart_btn_list.length; i++) {

        productToCart_btn_list[i].addEventListener("click",function () {

            let product = productToCart_btn_list[i].getAttribute("idp")

            if (typeof(product) != "undefined" && product != null && product != null) {

                fetch("/api/cart_p/add?product="+product+"&price="+productToCartPrice)
                    .then(response => response.json())
                    .then(result => {

                        if (typeof(result.loggedin) != "undefined" && result.loggedin != null) {

                            let dataWait = {product : productToCart_btn_list[i].getAttribute("idp")}

                            localStorage.setItem('cartWait',JSON.stringify(dataWait))
                            location.href = "/login"

                        }
                        else {

                            if (typeof(result.err) != "undefined" && result.err != null){

                                if (result.err.code == "ER_DUP_ENTRY") {

                                    console.log("Product exixts.")
                                    document.getElementById("alert_msg").innerHTML = '<div class="alert alert-info" role="alert">Produit existe déja dans votre panier. <a href="/cart">Voir panier</a></div>'
                                    setTimeout(() => {

                                        $('#alert_modal').modal('show');

                                    }, 500);

                                } else console.log(result.err)

                            }
                            else {

                                console.log("Product add to cart.");
                                setTimeout(() => {

                                    $('#cart_modal').modal('show');

                                }, 500);

                                loadDropCart()

                            }

                        }

                    })

            }

        })

    }

}




if (typeof(cart_wait) != "undefined" && cart_wait != null && cart_wait != "") {

    let product = JSON.parse(cart_wait).product

    if (typeof(product) != "undefined" && product != null && product != null) {

        fetch("/api/cart_p/add?product="+product)
            .then(response => response.json())
            .then(result => {

                if (typeof(result.loggedin) != "undefined" && result.loggedin != null) console.log("Not Authentificated.")
                else {

                    localStorage.removeItem("cartWait")

                    if (typeof(result.err) != "undefined" && result.err != null){

                        if (result.err.code == "ER_DUP_ENTRY") {

                            console.log("Product exixts.")
                            document.getElementById("alert_msg").innerHTML = '<div class="alert alert-info" role="alert">Produit existe déja dans votre panier. <a href="/cart">Voir panier</a></div>'
                            setTimeout(() => {

                                $('#alert_modal').modal('show');

                            }, 500);

                        } else console.log(result.err)

                    }
                    else {

                        console.log("Product add to cart.")
                        setTimeout(() => {

                            $('#cart_modal').modal('show');

                        }, 500);

                        loadDropCart()

                    }

                }

            })

    }

}




if (typeof(myBtnDelete_list) != "undefined" && myBtnDelete_list.length > 0) {


    for (let i = 0; i < myBtnDelete_list.length; i++) {


        myBtnDelete_list[i].addEventListener("click",function () {


            let product = myBtnDelete_list[i].getAttribute("idp")

            fetch("/api/cart_p/"+product+"/delete")
                .then(response => response.json())
                .then(result => {

                    if (typeof(result.loggedin) != "undefined" && result.loggedin != null) console.log("Not Authentificated.")
                    else {

                        if (typeof(result.err) != "undefined" && result.err != null) console.log(result.err)
                        else {

                            console.log("Product deleted from cart.")
                            location.reload()

                        }

                    }

                })

        })

    }

}




if (typeof(myInputQte_list) != "undefined" && myInputQte_list.length > 0) {

    for (let i = 0; i < myInputQte_list.length; i++) {

        myInputQte_list[i].addEventListener("input",function () {

            if (myInputQte_list[i].value != null && myInputQte_list[i].value != "" && myInputQte_list[i].value > 0) {

                let product = myInputQte_list[i].getAttribute("idp")
                let qte = myInputQte_list[i].value

                fetch("/api/cart_p/"+product+"/edit?qte="+qte)
                    .then(response => response.json())
                    .then(result => {

                        if (typeof(result.loggedin) != "undefined" && result.loggedin != null) console.log("Not Authentificated.")
                        else {

                            if (typeof(result.err) != "undefined" && result.err != null) console.log(result.err)
                            else {

                                console.log("Product qte updated.")
                                $(".myTotalCart").load(" .myTotalCart > *");
                                loadDropCart()

                            }

                        }

                    })

            } else myInputQte_list[i].value = 1

        })

    }

}



if (document.querySelector(".myBtnValid") && document.querySelector(".deliveryType")) {

    document.querySelector(".myBtnValid").addEventListener("click",function () {

        let type = document.querySelector(".deliveryType").value

        fetch("/api/cart/"+type+"/valid")
            .then(response => response.json())
            .then(result => {

                if (typeof(result.err) != "undefined" && result.err != null){

                    if (result.err.code == "EMPTY_CART") {

                        console.log("Empty cart")
                        document.getElementById("alert_msg").innerHTML = '<div class="alert alert-info" role="alert">Votre panier est vide. </div>'
                        setTimeout(() => {

                            $('#alert_modal').modal('show');

                        }, 500);

                    } else console.log(result.err)

                }
                else {

                    if (result.multi == false) location.href = "/orders"
                    else location.href = "/logout?buyer=success"

                }

            })

    })

}


if (document.querySelector(".myBtnValid_drop") &&  document.querySelector(".deliveryType")) {

    document.querySelector(".myBtnValid_drop").addEventListener("click",function () {

        let type = document.querySelector(".deliveryType").value

        fetch("/api/cart/"+type+"/valid")
            .then(response => response.json())
            .then(result => {

                if (typeof(result.loggedin) != "undefined" && result.loggedin != null) console.log("Not Authentificated.")
                else {

                    if (typeof(result.err) != "undefined" && result.err != null){

                        if (result.err.code == "EMPTY_CART") {

                            console.log("Empty cart")
                            document.getElementById("alert_msg").innerHTML = '<div class="alert alert-info" role="alert">Votre panier est vide. </div>'
                            setTimeout(() => {

                                $('#alert_modal').modal('show');

                            }, 500);

                        } else console.log(result.err)

                    }
                    else {

                        if (result.multi == false) location.href = "/orders"
                        else location.href = "/logout?buyer=success"

                    }

                }

            })

    })

}

function loadDropCart() {

    if (document.getElementById("qteCart_drop") && document.getElementById("productCart_drop") && document.getElementById("totalCart_drop")) {

        fetch("/api/cart")
            .then(response => response.json())
            .then(result => {



                if (typeof(result.loggedin) != "undefined" && result.loggedin != null) console.log("Not Authentificated.")
                else {

                    if (typeof(result.err) != "undefined" && result.err != null) console.log(result.err)
                    else {

                        let qteCart = document.getElementById("qteCart_drop")
                        let productCart = document.getElementById("productCart_drop")
                        let totalCart = document.getElementById("totalCart_drop")

                        qteCart.innerHTML = ""
                        productCart.innerHTML = ""
                        totalCart.innerHTML = ""

                        if (result.cart.length > 0) {

                            qteCart.innerText = result.cart[0].productCount

                            if (result.cart_p.length > 0) {

                                totalCart.innerText = "Total : " + formating.format(result.cart[0].totalPrice)+" DA"

                                for (let i = 0; i < result.cart_p.length; i++) {

                                    productCart.innerHTML +=

                                        '<div class="product-widget">' +
                                        '<div class="product-img">' +
                                        '<img src="/img/product/'+result.cart_p[i].product_id+'/main.jpg" alt="">' +
                                        '</div>' +
                                        '<div class="product-body">' +
                                        '<h3 class="product-name"><a href="#">'+result.cart_p[i].product_name+'</a></h3>' +
                                        '<h4 class="product-price"><span class="qty">'+result.cart_p[i].product_qt_c+'x</span>'+formating.format(result.cart_p[i].product_price_c)+" DA"+'</h4>' +
                                        '</div>' +
                                        '</div>'

                                }

                            } else {productCart.innerHTML = "<span class = 'text-info'>Votre panier est vide.</span>"}

                        }

                    }

                }

            })

    }

}





window.onload = loadDropCart()
