//const API_URL = "https://api-server-5.glitch.me/api/contacts";
const API_URL = "http://localhost:5000/api/maths";
let currentHttpError = "";

function API_getcurrentHttpError () {
    return currentHttpError; 
}
function API_GetMaths(operation) {
    return new Promise(resolve => {
        $.ajax({
            url: operation,
            success: maths => { currentHttpError = ""; resolve(JSON.stringify(maths)); },
            error: (xhr) => { console.log(xhr); resolve(null); }
        });
    });
}