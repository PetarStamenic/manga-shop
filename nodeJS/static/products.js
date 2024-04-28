window.addEventListener("load", ()=>{
    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length - 1];

    fetch('http://localhost:8000/vendor/product', {method:"GET", headers: {'Authorization' : `Bearer ${token}`}})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateTable(data);
        });

    document.getElementById("addUserBtn").addEventListener("click", createUser);
});


function createUser(){
    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length - 1];

    let user = {
        userId : document.getElementById("input_name").value,
        title : document.getElementById("input_surname").value,
        metaTitle : document.getElementById("input_email").value,
        slug : document.getElementById("input_password").value,
        summary : document.getElementById("input_mobile_phone").value,
        type : document.getElementById("input_adress").value,
        price : document.getElementById("input_name1").value,
        discount : document.getElementById("input_surname1").value,
        quantity : document.getElementById("input_email1").value,
        forSale : document.getElementById("input_password1").value,
        publishedAt : document.getElementById("input_mobile_phone1").value,
        saleStartsAt : document.getElementById("input_adress1").value,
        saleEndsAt : document.getElementById("input_mobile_phone2").value,
        content : document.getElementById("input_adress2").value

    };

    user_json = JSON.stringify(user);

    console.log(user_json);

    fetch("http://localhost:8000/vendor/product/add", {
        method:"POST",
        headers:{
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        body: user_json
    })
        .then(response => response.json())
        .then(data => {
            if(data.msg){
                alert(data.msg);
            }else if(data.error){
                alert(data.error);
            }else{
                fetch('http://localhost:8000/vendor/product', {method:"GET", headers: {"Authorization" : `Bearer ${token}`}})
                    .then(response => response.json())
                    .then(data => updateTable(data));
            }
        });
}

function updateTable(data){
    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length - 1];

    var tabela = document.getElementById("usersTable");
    tabela.innerHTML = "";

    for(i in data){
        let redHTML =
            `<tr data-userID="` + data[i].id + `"><td>`+data[i].id + `</td><td>` + data[i].userId +
            `</td><td>` + data[i].title + `</td><td>` + data[i].metaTitle + `</td><td>` + data[i].slug
            + `</td><td>` + data[i].summary + `</td><td>` + data[i].type + `</td><td>` + data[i].type + `</td><td>` + data[i].price + `</td><td>` + data[i].discount + `</td><td>` + data[i].quantity + `</td><td>` + data[i].forSale + `</td><td>` + data[i].publishedAt + `</td><td>` + data[i].saleStartsAt + `</td><td>` + data[i].saleEndsAt + `</td>  
<td>` + data[i].content + `</td><td>
            <button class="btn btn-danger btn-sm btn_obrisi">Delete</button>
            <button class="btn btn-warning btn-sm btn_izmeni">Change</button>
            </td>`;
        tabela.innerHTML += redHTML;
    }

    var obrisi_buttons = document.querySelectorAll(".btn_obrisi");

    for(i=0;i<obrisi_buttons.length;i++){
        let id = obrisi_buttons[i].parentNode.parentNode.dataset.userid;
        obrisi_buttons[i].addEventListener("click", function(){
            fetch("http://localhost:8000/vendor/product/delete/" + id, {method:"DELETE", headers:{'Authorization' : `Bearer ${token}`}})
                .then(response => response.json())
                .then(data => {
                    if(data.msg){
                        alert(data.msg);
                    }else if(data.error){
                        alert(data.error);
                    }else{
                        fetch("http://localhost:8000/vendor/product", {method:"GET", headers:{'Authorization' : `Bearer ${token}`}})
                            .then(response => response.json())
                            .then(data => updateTable(data));
                    }
                });
        });
    }

    var izmeni_buttons = document.querySelectorAll(".btn_izmeni");

    for(i=0;i<izmeni_buttons.length;i++){
        izmeni_buttons[i].addEventListener("click", function(){
            let user_id = this.parentNode.parentNode.dataset.userid;
            let edit = {
                id: user_id,
                userId : document.getElementById("edit_input_name").value,
                title : document.getElementById("edit_input_surname").value,
                metaTitle : document.getElementById("edit_input_email").value,
                slug : document.getElementById("edit_input_password").value,
                summary : document.getElementById("edit_input_mobile_phone").value,
                type : document.getElementById("edit_input_adress").value,
                price : document.getElementById("edit_input_name1").value,
                discount : document.getElementById("edit_input_surname1").value,
                quantity : document.getElementById("edit_input_email1").value,
                forSale : document.getElementById("edit_input_password1").value,
                publishedAt : document.getElementById("edit_input_mobile_phone1").value,
                saleStartsAt : document.getElementById("edit_input_adress1").value,
                saleEndsAt : document.getElementById("edit_input_mobile_phone2").value,
                content : document.getElementById("edit_input_adress2").value
            };

            console.log(edit);

            http_body = JSON.stringify(edit);

            fetch("http://localhost:8000/vendor/product/edit/"+user_id, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
                body: http_body
            })
                .then(response => response.json())
                .then(data => {
                    if(data.msg){
                        alert(data.msg);
                    }else if(data.error){
                        alert(data.error);
                    }else{
                        fetch("http://localhost:8000/vendor/product", {method:"GET", headers:{'Authorization' : `Bearer ${token}`}})
                            .then(response => response.json())
                            .then(tableData => updateTable(tableData));
                    }
                });
        });
    }
}