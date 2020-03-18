
var telefone = "";
var name = "";
var radio = -1;
var option = "null";
var selecionados= [];

function enviarForm(){
              
            var obj = {};
            if(validarNome()&& validaTelefone() && validaSelecao() && validaRadio()){
            	alert(name+" "+telefone.replace(/[^\d]+/g,'')+" "+option+" "+radio+" "+selecionados);
            	obj["nome"] = name;
            	obj["telefone"] = telefone.replace(/[^\d]+/g,'');
            	obj["opcao"] = option;
            	if(radio==1){
            		var midias = []
            		for (var x = 0; x<selecionados.length; x++) {
            			midias[x]=selecionados[x].value;
    
					}
					obj["midias"] = midias;	            		
            	}
            	var data = JSON.stringify(obj);  
         
	            var xhr = new XMLHttpRequest();
	            var url = "http://localhost:8080";
	            xhr.open("POST", url, true);
	            xhr.setRequestHeader('Content-type','application/json; charset=utf-8');             
	                          
	            xhr.onload = function(){
	            	if(xhr.status==200){
	            		document.getElementById("enviarForm").disabled = true;
	            	}
	            };
	        	xhr.send(data);

            }

            

};
function validaRadio(){
	if(radio==-1){
		alert("Selecione Sim ou Não para redes Sociais!")
		return false;
	}else if(radio==1){
		selecionados= document.querySelectorAll('[type=checkbox]:checked');
		if(selecionados.length<1){
			alert("Você precisa selecionar ao menos uma rede social, ou marque não para esta opção!");
			return false;
		}else{
			return true;
		}
	}else{
		return true;
	}
}
function validaSelecao(){
	option = document.getElementById("direcionamento").value; 
	if(option =="null"){
		alert("Selecione como nos conheceu!")
		return false;
	}else{
		return true;
	}
}
function validarNome(){
	//busca valor digitado e remove espaços vazio começo e fim
	 name = document.getElementById("nome").value.trim(); 
	// verifica se primeira parte do texto e menor que 2 algarismo
	// e verifica tb se apos o espaço terá 2 algarismos (considerando que terá no minimo 2 algarismo no primeiro e último nome )
	if(name.indexOf(" ")>1){
			var partenome = name.substring(name.indexOf(" "), name.length).trim();
		while(partenome.length>2){
			//verifica se há mais um espaço em branco no meio
			if(partenome.indexOf(" ")>0){
				partenome = partenome.substring(partenome.indexOf(" "), partenome.length).trim();
			}else{
				break;
			}
		}
		if(partenome.length<2){
			alert("Verifique seu nome, precisamos do nome completo!");
			return false;
		}	
		
	}else{
		alert("Verifique seu nome, precisamos do nome completo!");
		return false;

	}
	return true;


};
function validaTelefone(){
	telefone = document.getElementById("telefone").value;

	if(telefone.length<13){
		alert("Verifique seu telefone, ele precisa ter 10 digitos!")
		return false;
	}else{
		return true;
	}
}
function somenteNumeros(e) {
    var charCode = e.charCode ? e.charCode : e.keyCode;
    // charCode 8 = backspace   
    // charCode 9 = tab
    if (charCode != 8 && charCode != 9) {
        // charCode 48 equivale a 0   
        // charCode 57 equivale a 9
        if (charCode < 48 || charCode > 57 || document.getElementById("telefone").value.length >12 ) {
        	alert("Somente números e apenas 10 digitos")
            return false;
        }else{
        	formataTelefone();
        }
    }
}
function formataTelefone(){
	telefone = document.getElementById("telefone").value;
	var l = telefone.length;
	if(l==3){
		telefone = telefone + ")";
	}
	if(l==8){
		telefone= telefone + "-";
	}
	if(l==0){
		telefone= "(";
	}
	if(l==3 || l==8 ||l==0){
		document.getElementById("telefone").value = telefone;

	}
}
function mostraRedeSocial(value){
	radio = value;
	if(value == "1"){
		document.getElementById("redeSocial").style.display = "block";
	}else{
		document.getElementById("redeSocial").style.display = "none";

	}
}

