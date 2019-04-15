var tab_words = ['injurieux','divulgation','protection','perruque','essentiel','plantation','mitrailleur','seigneur','gymnastique','glandulaire','optimum','stupefaction','ennemi','rechauffer','geometrie','altercation','ordinateur','tableau','mysterieux','sanguinaire','interminable','legerete','orientation','berserker','partager','funeraille','recipient','programme','autoroute','balancer','constitution','degouter','culturel','braquage','tristement','confusion',
'excitation','federal','capsule','fragment','gigantesque','babillage','raquette','occident','androgyne','adhesif','munition','sauvage','deformer','decapiter','graveleux','obstacle','langage','scatophile','annihiler','magazine','crepuscule','paradoxe','repasser','surpasser','marginal','corrompu'];

var i_alea = parseInt(Math.random()*tab_words.length);
console.log(tab_words[i_alea]);

function addWord(taille,nb){
    var classDiv = '<div class="d-flex flex-row justify-content-center text-center words animated fadeIn">';
    for(var i = 1; i<= taille ; i++){
        classDiv += ('<div><input type="text" maxlength="1" class="letter-'+nb+'"></div>');
    }
    classDiv += '<div id="enter" onclick="onClick('+nb+')">CONFIRMER</div></div>';
    return classDiv;
}


// ADD NEW WORDS
var motus = document.getElementById('#motus');
var cpt = 0;
var taille = tab_words[i_alea].length;

function startGame(){
    cpt++;
    $('#motus').append(addWord(taille,cpt));
    $('#start').remove();
}



function addInput(taille){
    cpt++;
    setTimeout(function(){
    if(cpt<=8){
        $('#motus').append(addWord(taille,cpt));
    } else {
        $('#motus').append('<img src="./img/lose.gif" class="mx-auto img-fluid my-3" id="gif_lose"></img>');
        $('#motus').append('<span class="text-center text-white h3">Résultat : '+tab_words[i_alea]+'</span>');

    }
    },(taille+1)*700);
}

// WORDS SEARCH
var words_s = tab_words[i_alea];
var words_st = words_s.split('');

// Changement du background, interval de 2s
function changeColor(val, color,i){
    setTimeout(function(){
        $(val).addClass(color);
    },(i+1)*700);
}

// VERIF DU MOT SAISI
function onClick(nb){
    $('#enter').remove();
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

    }
    for(i = 0 ; i < words_st.length ; i++){
        if(letters[i] !== words_st[i]){
            for(var j = 0 ; j < words_tmp.length ; j++){
                if(letters[i]===words_tmp[j]){
                    changeColor(letters_select[i],"bad",i);
                }
            }
        }
    }
    if(words !== words_s){
        addInput(taille);
    } else {
        // Attends la fin de l'animation pour afficher l'alerte
        setTimeout(function(){
            $('#motus').append('<img src="./img/win.gif" class="mx-auto img-fluid my-3" id="gif_win"></img>');
            $('#motus').append('<a class="mx-auto" href="index.php"><button class="btn btn-warning">Restart</button></a>')
        },(taille+1)*700);
    }

}



/*

    function wait(ms){
        var d = new Date();
        var d2 = null;
        do{
            d2 = new Date();
        } while(d2-d < ms);
    }


*/