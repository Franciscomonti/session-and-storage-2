const elementExists = (id) => document.getElementById(id) !== null;

elementExists("submit_login") && 
    document.getElementById('submit_login').addEventListener("click", (e) =>{
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        fetch('/login',{
            method: 'POST',
            headers: {
                "content-type": "application/json",
        },
        body: JSON.stringify({username,password}),
    })
    .then((res)=> res.json())
    .then((data)=> {
        console.log(data)
        if(data.message === "success"){
            window.location.href = '/profile'

        }else{
            console.log("usuario o clave invalida")
        }
    
    })
    
    .catch((err)=> console.log(err))
    

})

elementExists("signup") && 
    document.getElementById('signup').addEventListener("click", (e) =>{

        const first_name = document.getElementById('first_name').value;
        const last_name = document.getElementById('last_name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const age = document.getElementById('age').value;
        console.log(`${first_name} ${last_name} ${email} ${password} ${age}`);

        if(!first_name || !last_name || !email || !password || !age) {
            console.log('todos los campos son obligatorios')
        }else{
        fetch('/signup', {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                first_name,
                last_name,
                email,
                password,
                age,
            })
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err))
    }
    })   