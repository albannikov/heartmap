async function getAuthStatus(){
    let response = await fetch('http://localhost:3000/loginstatus');
    let result = await response.json();

  if (result == 0) {  
     window.location.replace("http://localhost:4000/login.html");
  } else {
    console.log("user isAuth");
  }
  };
          getAuthStatus();
