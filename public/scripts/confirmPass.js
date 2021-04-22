document.getElementById("reg").addEventListener("submit", (event) => {
    if (document.getElementsByName("password")[0].value != document.getElementsByName("Cpassword")[0].value) 
    {
        event.preventDefault()
        document.getElementById("error").innerHTML = "The password isn't matching"
    }})