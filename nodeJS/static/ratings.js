window.addEventListener("load", ()=>{
    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length - 1];

    fetch('http://localhost:8000/vendor/rating', {method:"GET", headers: {'Authorization' : `Bearer ${token}`}})
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
        productId : document.getElementById("input_name").value,
        title : document.getElementById("input_surname").value,
        ratingValue : document.getElementById("input_email").value,
        published : document.getElementById("input_password").value,
        publishedAt : document.getElementById("input_mobile_phone").value,
        content : document.getElementById("input_adress").value

    };

    user_json = JSON.stringify(user);

    console.log(user_json);

    fetch("http://localhost:8000/vendor/rating/add", {
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
                fetch('http://localhost:8000/vendor/rating', {method:"GET", headers: {"Authorization" : `Bearer ${token}`}})
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
            `<tr data-userID="` + data[i].id + `"><td>`+data[i].id + `</td><td>` + data[i].productId +
            `</td><td>` + data[i].title + `</td><td>` + data[i].ratingValue + `</td><td>` + data[i].published
            + `</td><td>` + data[i].publishedAt + `</td><td>` + data[i].content + `</td><td>  
            <button class="btn btn-danger btn-sm btn_obrisi">Delete</button>
            <button class="btn btn-warning btn-sm btn_izmeni">Change</button>
            </td>`;
        tabela.innerHTML += redHTML;
    }

    var obrisi_buttons = document.querySelectorAll(".btn_obrisi");

    for(i=0;i<obrisi_buttons.length;i++){
        let id = obrisi_buttons[i].parentNode.parentNode.dataset.userid;
        obrisi_buttons[i].addEventListener("click", function(){
            fetch("http://localhost:8000/vendor/rating/delete/" + id, {method:"DELETE", headers:{'Authorization' : `Bearer ${token}`}})
                .then(response => response.json())
                .then(data => {
                    if(data.msg){
                        alert(data.msg);
                    }else if(data.error){
                        alert(data.error);
                    }else{
                        fetch("http://localhost:8000/vendor/rating", {method:"GET", headers:{'Authorization' : `Bearer ${token}`}})
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
                    productId : document.getElementById("edit_input_name").value,
                    title : document.getElementById("edit_input_surname").value,
                    ratingValue : document.getElementById("edit_input_email").value,
                    published : document.getElementById("edit_input_password").value,
                    publishedAt : document.getElementById("edit_input_mobile_phone").value,
                    content : document.getElementById("edit_input_adress").value
                };

                console.log(edit);

                http_body = JSON.stringify(edit);

                fetch("http://localhost:8000/vendor/rating/edit/"+user_id, {
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
                            fetch("http://localhost:8000/vendor/rating", {method:"GET", headers:{'Authorization' : `Bearer ${token}`}})
                                .then(response => response.json())
                                .then(tableData => updateTable(tableData));
                        }
                    });
            });
    }
}