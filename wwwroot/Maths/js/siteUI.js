Init_UI();
let compteurOpérations =0;
let compteurErreurs =0;
function Init_UI() {
    $("#beginTest").on('click', async ()=>{
        let apiOperation = $("#apiOperation").val();
        const maths = await API_GetMaths(apiOperation);
        addTest(maths)
        renderResultText()
    });
    $("#loadHelp").on('click', async ()=>{
        let apiOperation = $("#loadHelp").attr("help");
        const maths = await API_GetMaths(apiOperation);
    });

}
function addTest(operation){
    if(operation.includes("error")){
        compteurErreurs++;
    }
    let contentValue = $("#content").text();
    if($("#content").text().includes("Veuillez faire un test")){
        $("#content").text('');
    }
    $("#content").append(
        $(`
            <div>
                OK ---> ${ operation }
            </div>
        `)
    );
    compteurOpérations++;
}

function renderResultText(){
    $("#result").text('');
    let texte = "";
    if(compteurOpérations!=0 && compteurErreurs ==0){
        texte="Bravo! Aucune erreur!"
    }
    else if(compteurErreurs ==1){
        texte = `${compteurErreurs} erreur`
    }
    else if(compteurErreurs > 1){
        texte = `${compteurErreurs} erreurs`
    }
    $("#result").text(`${texte}`);
}
function renderError(message) {
    eraseContent();
    $("#content").append(
        $(`
            <div class="errorContainer">
                ${message}
            </div>
        `)
    );
}
function getFormData($form) {
    const removeTag = new RegExp("(<[a-zA-Z0-9]+>)|(</[a-zA-Z0-9]+>)", "g");
    var jsonObject = {};
    $.each($form.serializeArray(), (index, control) => {
        jsonObject[control.name] = control.value.replace(removeTag, "");
    });
    return jsonObject;
}

function renderOperation(mathOperation) {
    return $(`
            <div>
                <span></span>
            </div>
    `);
}