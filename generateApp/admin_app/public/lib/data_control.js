let confirmDelMessage = "Etes-vous sure de vouloir supprimer ?";
let confirmEnableMessage = "Etes-vous sure de vouloir réactiver l'annonce ?";
let confirmDisableMessage = "Etes-vous sure de vouloir désactiver l'annonce ?";

const confirmmodal = function(id,type){

    let link,linkMethod, linkRedirect;
    let modal_del_btn =document.getElementById('confirmActionModal').querySelectorAll("a")[1];
    let modal_text =document.querySelector('#modal_text');

    if (type == 1){
        modal_text.innerHTML = confirmDelMessage;
        link = '/api/product/'+id+'/delete';
        linkMethod = 'GET';
        linkRedirect = '/products/list'
        modal_del_btn.setAttribute('onclick','fetchDataApi(\''+link+'\',\''+linkMethod+'\',null,\''+linkRedirect+'\')');

    }

}


const set_info = function (info,type){

    let edit_info = JSON.parse(info);

    console.log(edit_info)

    let modal_inputs,modal_form,checkbox_inputs,services_counter,edit_counters_block,edit_doctors_block;

    if (type=='details') {

        modal_inputs = document.querySelector('#detail_edit').querySelectorAll('input,textarea,select');
        modal_form = document.querySelector('#detail_edit').querySelector('form');

        modal_form.setAttribute('action','/details/'+edit_info.detail_id+'/edit')

        modal_inputs[0].value = edit_info.sub_cat_id;
        modal_inputs[1].value = edit_info.detail_name;

    }

    else if (type=='product_details') {

        modal_inputs = document.querySelector('#product_details_edit').querySelectorAll('input,textarea,select');
        modal_form = document.querySelector('#product_details_edit').querySelector('form');

        modal_form.setAttribute('action','/product/details/'+edit_info.product_id+'/'+edit_info.detail_id+'/edit')

        modal_inputs[0].value = edit_info.product_id;
        modal_inputs[1].value = edit_info.detail_desig;

    }
    else if (type=='quantity') {

        modal_inputs = document.querySelector('#quantity_edit').querySelectorAll('input,textarea,select');
        modal_form = document.querySelector('#quantity_edit').querySelector('form');

        modal_form.setAttribute('action','/quantity/'+edit_info.product_id+'/edit')

    }

}


const fetchDataApi = function (link, linkMethod, bodyContent, linkRedirect) {
    fetch(link, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method : linkMethod,
        body : bodyContent,
    }).then(function (response){
        console.log(response)
        if (response.status == 200) {
            if (linkRedirect != 'null' && linkRedirect != null && typeof linkRedirect != 'undefined') window.location.replace(linkRedirect);
            else window.location.reload();
        }
        else {
            window.location.reload();
        }
    })
}


const delpic = function(id,pic) {

    let link, linkMethod, linkRedirect, bodyContent;
    let modal_del_btn = document.getElementById('confirmActionModal').querySelectorAll("a")[1];
    let modal_text = document.querySelector('#modal_text');
    modal_text.innerHTML = confirmDelMessage;
    link = '/api/content/remove/';
    linkMethod = 'DELETE';
    linkRedirect = null
    bodyContent =  JSON.stringify({id:id,pic:pic});
    modal_del_btn.setAttribute('onclick', 'fetchDataApi(\'' + link + '\',\'' + linkMethod + '\',\'' + bodyContent + '\',\'' + linkRedirect + '\')');
    /*    modal_del_btn.addEventListener('click',function (){
            // alert(bodyContent)
        // bodyContent =  JSON.stringify({id:id,pic:pic});
        // fetchDataApi(link,linkMethod,bodyContent,linkRedirect)
    })*/

}

function updateDeliveryPrice (w,p,t) {

    if (

        (p != "" && p != null && typeof(p) != "undefined")
        && (w != "" && w != null && typeof(w) != "undefined")
        && (t != "" && t != null && typeof(t) != "undefined")
        
    ) {
        
        let data_delivery = {wilaya : w,price : p,type : t}
        let url = "/api/delivery_price/edit"
        let option =  {headers: {'Accept': 'application/json','Content-Type': 'application/json'},method : "POST",body : JSON.stringify(data_delivery)}
        fetchData(url,option,function (result) {

            console.log(result)

            if (result.err != null) {
                
                console.log("price edit error.");
                document.getElementById("alert_msg").innerHTML = '<div class="alert alert-danger" role="alert">Erreur de modification du prix</div>'
                $('#alert_modal').modal('show');

            } else {

                console.log("price edit success.");
                document.getElementById("alert_msg").innerHTML = '<div class="alert alert-success" role="alert">Prix modifié avec succès</div>'
                $('#alert_modal').modal('show');
            
            }
        
        })

    } else {

        console.log("data error.");
        document.getElementById("alert_msg").innerHTML = '<div class="alert alert-info" role="alert">Données insuffisante.</div>'
        $('#alert_modal').modal('show');

    }

}



function quantity_reset(idp) {
    
    let url = "/api/quantity/" + idp + "/reset"
    let option =  {headers: {'Accept': 'application/json','Content-Type': 'application/json'},method : "GET"}
    fetchData(url,option,function (result) {

        if (result.err != null) {
            
            document.getElementById("alert_msg").innerHTML = "<div class='alert alert-danger' role='alert'>Echec de l'opération</div>";
            $('#alert_modal').modal('show');

        } else location.reload()
    
    })

}



function fetchData(url,option,callback) {

    fetch(url,option)
    .then(response => response.json())
    .then(result => {

        if (callback) callback(result)
    
    })
    .catch((err)=>{

        if (callback) callback({err : err})

    })
    
}