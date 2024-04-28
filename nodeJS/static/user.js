window.addEventListener("load", ()=>{
    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length - 1];

    fetch('http://localhost:8000/vendor/user', {method:"GET", headers: {'Authorization' : `Bearer ${token}`}})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateTable(data);
        });

    document.getElementById("addUserBtn").addEventListener("click", createUser);

    document.getElementById("actionCreate").addEventListener("click", function(){
        $("#userModal").modal('show');
    });

    document.getElementById("actionEdit").addEventListener("click", function(){
        $("#editUserModal").modal('show');
    });
});


function createUser(){
    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length - 1];

    let user = {
        firstName : document.getElementById("input_name").value,
        lastName : document.getElementById("input_surname").value,
        email : document.getElementById("input_email").value,
        passwordHash : document.getElementById("input_password").value,
        phone : document.getElementById("input_mobile_phone").value,
        vendor : document.getElementById("input_vendor").value,
        addres : document.getElementById("input_adress").value

    };

    user_json = JSON.stringify(user);

    console.log(user_json);

    fetch("http://localhost:8000/vendor/user/add", {
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
                fetch('http://localhost:8000/vendor/user', {method:"GET", headers: {"Authorization" : `Bearer ${token}`}})
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
            `<tr data-userID="` + data[i].id + `"><td>`+data[i].id + `</td><td>` + data[i].firstName +
            `</td><td>` + data[i].lastName + `</td><td>` + data[i].email + `</td><td>` + data[i].passwordHash
            + `</td><td>` + data[i].phone + `</td><td>` + data[i].vendor
            + `</td><td>` + data[i].adress + `</td><td>  
            <button class="btn btn-danger btn-sm btn_obrisi">Delete</button>
            <button class="btn btn-warning btn-sm btn_izmeni">Change</button>
            </td>`;
        tabela.innerHTML += redHTML;
    }

    var obrisi_buttons = document.querySelectorAll(".btn_obrisi");

    for(i=0;i<obrisi_buttons.length;i++){
        let id = obrisi_buttons[i].parentNode.parentNode.dataset.userid;
        obrisi_buttons[i].addEventListener("click", function(){
            fetch("http://localhost:8000/vendor/user/delete/" + id, {method:"DELETE", headers:{'Authorization' : `Bearer ${token}`}})
                .then(response => response.json())
                .then(data => {
                    if(data.msg){
                        alert(data.msg);
                    }else if(data.error){
                        alert(data.error);
                    }else{
                        fetch("http://localhost:8000/vendor/user", {method:"GET", headers:{'Authorization' : `Bearer ${token}`}})
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
                    firstName : document.getElementById("edit_input_name").value,
                    lastName : document.getElementById("edit_input_surname").value,
                    email : document.getElementById("edit_input_email").value,
                    passwordHash : document.getElementById("edit_input_password").value,
                    phone : document.getElementById("edit_input_mobile_phone").value,
                    vendor : document.getElementById("edit_input_vendor").value,
                    addres : document.getElementById("edit_input_adress").value
                };

                console.log(edit);

                http_body = JSON.stringify(edit);

                fetch("http://localhost:8000/vendor/user/edit/"+user_id, {
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
                            fetch("http://localhost:8000/vendor/user", {method:"GET", headers:{'Authorization' : `Bearer ${token}`}})
                                .then(response => response.json())
                                .then(tableData => updateTable(tableData));
                        }
                    });
            });
    }
}