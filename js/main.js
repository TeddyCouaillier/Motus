function addWord(nb){
    var classDiv = '<div class="d-flex flex-row justify-content-center text-center words animated fadeIn">';
    for(var i = 1; i<= 6 ; i++){
        classDiv += ('<div><input type="text" size="1" maxlength="1" class="letter-'+nb+'"></div>');
    }
    classDiv += '<div id="enter" onclick="onClick('+nb+')"><i class="fas fa-check"></i></div></div>';
    return classDiv;
}

// ADD NEW WORDS
var motus = document.getElementById('#motus');
var cpt = 1;

function addInput(){
    cpt++;
    setTimeout(function(){
    if(cpt<=8){
        $('#motus').append(addWord(cpt));
    } else {
        alert('PERDU !');
    }
    },7000);
}

// WORDS SEARCH
var words_s = 'canape';
var words_st = words_s.split('');

// Changement du background, interval de 2s
function changeColor(val, color,i){
    setTimeout(function(){
        $(val).addClass(color);
    },(i+1)*1000);
}

// VERIF DU MOT SAISI
function onClick(nb){
    // Tableau temporaire pour gerer les lettres mal placées
    words_tmp = words_s.split('');
    var words = '';

    // Recuperation du mot saisi
    var letters_select = document.querySelectorAll('.letter-'+nb);
    var letters = [];
    for(var i = 0 ; i < letters_select.length ; i++){
        letters[i] = (letters_select[i].value).toLowerCase();
        words += letters[i];
    }   

    // Verification du mot saisi
    for(i = 0 ; i < words_st.length ; i++){
        if(letters[i] === words_st[i]){
            
            changeColor(letters_select[i],"good",i);
            
            var tmp = 0;
            while(letters[i]!==words_tmp[tmp]){
                tmp++;
            }
            words_tmp.splice(tmp,1);
        }
        else {
            for(var j = 0 ; j < words_tmp.length ; j++){
                if(letters[i]===words_tmp[j]){
                    changeColor(letters_select[i],"bad",i);
                }
            }
        }
    }
    if(words !== words_s){
        addInput();
    } else {
        // Attends la fin de l'animation pour afficher l'alerte
        setTimeout(function(){
            alert('WIN!');
        },7000);
    }

}


