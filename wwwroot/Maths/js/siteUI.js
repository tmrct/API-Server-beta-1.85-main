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
        renderResultText(maths);
    });

}
function addTest(operation){
    if(operation.includes("error")){
        compteurErreurs++;
    }
    if($("#content").text().includes("Veuillez faire un test")){
        $("#content").text('');
    }
    $("#content").append(
        $(`
            <div id="operation">
                OK ---> ${ operation }
            </div>
        `)
    );
    compteurOpérations++;
}
function renderHelpText(){

}
function renderResultText(){
    $("#result").text('');
    let texte = "";
    if(compteurOpérations!=0 && compteurErreurs ==0){
        texte="Bravo! Aucun problème!"
    }
    else if(compteurErreurs ==1){
        texte = `${compteurErreurs} erreur`
    }
    else if(compteurErreurs > 1){
        texte = `${compteurErreurs} erreurs`
    }
    $("#result").text(`${texte}`);
}