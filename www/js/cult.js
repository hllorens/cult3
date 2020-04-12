"use strict";

// Initialize Firebase!
var config = {
    apiKey: "AIzaSyDn6s-P6h6MB-PKXKRaBHFvkaPBbyKssLg",
    authDomain: "cult-game.firebaseapp.com",
    databaseURL: "https://cult-game.firebaseio.com",
    storageBucket: "cult-game.appspot.com",
    messagingSenderId: "718126583517"
};
firebase.initializeApp(config);

var firebaseCodec = {
    // firebase does not allow in keys: ".", "#", "$", "/", "[", or "]"
	encodeFully: function(s) {
		return encodeURIComponent(s).replace(/\./g, '%2E');
	},
	decode: function(s) {
		return decodeURIComponent(s);
	}
};


// in the menu just 2 buttons unirse (tiene q estar en estado waiting) o crear

// si creo o me uno, empiezo a escuchar en challenges/name y a leer puntualmente y escribir en beat
// me pregunta nombre de usuario
// si creo se asegura q la partida no existia y si me uno q existia y q no hay nadie q ya haya elegido ese nombre (la identidad es efímera)

// si salgo paro de escuchar en esa partida y de escribir en beat para q otros sepan q he salido aunque sea un accidente

var session={
    partida:"",
	user: "",
	timestamp: "0000-00-00 00:00",
    alive_beat: 0/*,
    last_zombie_check: 0,
	num_correct: 0,
	num_answered: 0,
	result: 0,
    action: 'send_session_post',
	details: []*/
};
var alive_timeout=null;
var zombies_beat={};
var zombies_to_kill=[];
var correct_answer='undefined';
var answer_msg="";
var show_answer_timeout;
var activity_timer=new ActivityTimer();

var header_zone=document.getElementById('header');
var header_text=undefined;
//var canvas_zone=document.getElementById('zone_canvas');
var canvas_zone_vcentered=document.getElementById('zone_canvas_vcentered');



function menu_screen(){
	allowBackExit();
    console.log('menu screen');
	var splash=document.getElementById("splash_screen");
	if(splash!=null){ splash.parentNode.removeChild(splash); }

	console.log('menu_screen user: ('+session.user+')');
    hamburger_menu_content.innerHTML=''+get_reduced_display_name(session.user)+'<ul>\
    <li>todo...</li>\
    </ul>';
    canvas_zone_vcentered.innerHTML=' \
    <div id="menu-logo-div"></div> \
    <nav id="responsive_menu">\
    <br /><button id="create-button" class="coolbutton">Crear Partida</button> \
    <br /><button id="join-button" class="coolbutton">Unirse a Partida</button>\
    </nav>\
    ';
    document.getElementById("create-button").addEventListener(clickOrTouch,function(){crear_partida();});
    document.getElementById("join-button").addEventListener(clickOrTouch,function(){unirse_a_partida();});
    /*if(indicator_list.length==0){
        indicator_list=Object.keys(data_map);
        indicator_list.splice(indicator_list.indexOf('history'));
    } 
    if(country_list.length==0) load_country_list_from_indicator('population');
    if(period_list.length==0) load_period_list_from_indicator_ignore_last_year('population');
    if(fact_list.length==0) load_fact_list_and_map();
	*/
}




function crear_partida(){
    canvas_zone_vcentered.innerHTML=' \
          Nombre partida: <input id="partida" pattern="[a-zA-Z0-9]+" /><br />\
          Nombre jugador: <input id="jugador" pattern="[a-zA-Z0-9]+" value="'+session.user+'" /><br />\
        <button id="create">Crear</button>\
        <br /><button id="go-back" class="minibutton fixed-bottom-right go-back">&lt;</button> \
        ';
    document.getElementById("partida").addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("jugador").focus();
        }
    });
    document.getElementById("jugador").addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("create").click();
        }
    });
    document.getElementById('create').addEventListener('click', function(evt) {
        // variables globales de momento...
        var partida=document.getElementById('partida').value.toLowerCase().trim();
        partida = partida.replace(/[^a-z0-9]/gi,'');
        var username=document.getElementById('jugador').value.toLowerCase().trim();
        username= username.replace(/[^a-z0-9]/gi,'');
        if(username.length==0){
            alert("\""+username+"\" no es válido. Use sólo letras sin acento y números.");
        }else{
            session.user=username;
        }
        if(partida.length==0){alert("\""+partida+"\" no es válido o está vacío. Use sólo letras sin acento y números.");}
        else{
            session.partida=partida;
            firebase.database().ref().child('challenges/'+partida).once('value', function(snapshot) {crear_partida_si_disponible(snapshot.val());});
        }
    });
    document.getElementById("go-back").addEventListener(clickOrTouch,function(){menu_screen();});
}

function crear_partida_si_disponible(partida) {
    if(partida!=undefined && partida!=null && partida!='null' && partida!=""){
        alert('el nombre de partida \"'+session.partida+'\" ya existe, elige otro');
            session.partida="";
    }else{
        var challange_instance={
            // modified by the game
            name: session.partida,
            time_left: 60,
            timestamp: get_timestamp_str(),
            question: '',
            answer_options: ['',''],
            answer_msg: '',
            game_status:'waiting',
            // modified by each user, avoid concurrent mod overwritting
            u:{}
        };
        challange_instance.u[session.user]= {
                    role: 'inviter',
                    score: 0,
                    lifes: 3,
                    answer: ''
                };
        var challenge_beat={
            u:{}
        };
        challenge_beat.u[session.user]={
            alive_beat: session.alive_beat
        };

        var updates = {};
        updates['challenges/'+session.partida] = challange_instance;
        updates['challenges-beat/'+session.partida] = challenge_beat;
        firebase.database().ref().update(updates);
        console.log('crear partida '+session.partida);
        // CORE POINT //////////////////////////////////////////////////////////////////////////777777777
        firebase.database().ref().child('challenges/'+session.partida).on('value', function(snapshot) {listen_challenge(snapshot.val());}); // listen to changes
        alive_timeout=setTimeout(function(){handle_alive();}.bind(this),7000); // produce beat for this user
        /////////////////////////////////////////////////////////////////////////////////////////777777777
    }
}

function unirse_a_partida(){
    canvas_zone_vcentered.innerHTML=' \
      <div id="footer">\
          Nombre partida: <input id="partida" pattern="[a-zA-Z0-9]+" /><br />\
          Nombre jugador: <input id="jugador" pattern="[a-zA-Z0-9]+" value="'+session.user+'" /><br />\
        <button id="join">Unirse</button>\
      </div>\
        <br /><button id="go-back" class="minibutton fixed-bottom-right go-back">&lt;</button> \
        ';
    document.getElementById("partida").addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("jugador").focus();
        }
    });
    document.getElementById("jugador").addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("join").click();
        }
    });
    document.getElementById('join').addEventListener('click', function(evt) {
        var partida=document.getElementById('partida').value.toLowerCase().trim();
        partida = partida.replace(/[^a-z0-9]/gi,'');
        var username=document.getElementById('jugador').value.toLowerCase().trim();
        username= username.replace(/[^a-z0-9]/gi,'');
        if(username.length==0){
            alert("\""+username+"\" no es válido. Use sólo letras sin acento y números.");
        }else{
            session.user=username;
        }
        if(partida.length==0){alert("El nombre \""+partida+"\" no es válido o está vacío. Use sólo letras sin acento y números.");}
        else{
            session.partida=partida;
            firebase.database().ref().child('challenges/'+partida).once('value', function(snapshot) {unirse_partida_si_disponible(snapshot.val());});
        }
    });
    document.getElementById("go-back").addEventListener(clickOrTouch,function(){menu_screen();});
}

function unirse_partida_si_disponible(partida) {
    if(partida!=undefined && partida!=null && partida!='null' && partida!="" && partida.game_status=="waiting"){
        if (partida.u.hasOwnProperty(session.user)){
            alert('El jugador "'+session.user+'" ya existe. Elige otro nombre.');
            return;
        }
        var updates = {};
        updates['challenges/'+session.partida+'/u/'+session.user]={
                role: 'invitee',
                score: 0,
                lifes: 3,
                answer: ''
        };
        updates['challenges-beat/'+session.partida+'/u/'+session.user]={
            alive_beat: session.alive_beat
        };
        firebase.database().ref().update(updates);
        console.log('unido a partida '+session.partida);
        // CORE POINT //////////////////////////////////////////////////////////////////////////777777777
        firebase.database().ref().child('challenges/'+session.partida).on('value', function(snapshot) {listen_challenge(snapshot.val());}); // listen to changes
        alive_timeout=setTimeout(function(){handle_alive();}.bind(this),7000); // produce beat for this user
        /////////////////////////////////////////////////////////////////////////////////////////777777777
    }else{
        alert('La partida '+session.partida+' no existe ¿seguro que se llama así?');
        session.partida="";
    }
}



function handle_alive(){
    session.alive_beat++;
    alive_timeout=setTimeout(function(){handle_alive();}.bind(this),7000); // put it again alive (otherwise use interval...)
    var updates={};
    updates['challenges-beat/'+session.partida+'/u/'+session.user+'/alive_beat'] = session.alive_beat;
    firebase.database().ref().update(updates);
    firebase.database().ref().child('challenges-beat/'+session.partida).once('value', function(snapshot) {handle_zombies(snapshot.val());});
    // TODO: what if this does not exist??? we should clear the timeout...
}
function handle_zombies(challenge_beat) {
    var challenge_zombies_beat=challenge_beat.u;
    console.log("handle_zombies "+session.alive_beat);
    if(zombies_beat==null || objectProperties(zombies_beat).length!=objectProperties(challenge_zombies_beat).length){ // initialize
        zombies_beat=challenge_zombies_beat;
        console.log("initialize zombies_beat");
    }else{ // compare local to global
        for (var user in challenge_zombies_beat){
            if(user!=session.user){
                console.log("is "+user+" a zombie "+challenge_zombies_beat[user].alive_beat+" "+zombies_beat[user]+"? to kill "+zombies_to_kill.join(", "));
                if(challenge_zombies_beat[user].alive_beat==zombies_beat[user]){
                    if(zombies_to_kill.indexOf(user)==-1){
                        console.log("candidate");
                        zombies_to_kill.push(user);
                    }else{
                        console.log("yes, who should kill?\n\n");
                        // are there session_masters before me who could kill zombies?
                        var leader=get_session_master(challenge_beat);
                        if(user==leader){
                            for (var new_leader in challenge_zombies_beat){
                                if(zombies_to_kill.indexOf(new_leader)==-1){
                                    leader=new_leader;
                                    break;
                                }
                            }
                        }
                        if(leader==session.user){
                            // the session_master is automated. Kill zombies
                            console.log("I"+session.user+" will kill the zombie!! "+user);
                            //zombies_to_kill=[]; activate to only kill one at a time... could make sense
                            firebase.database().ref().child('challenges/'+session.partida+'/u/'+user).remove();
                            firebase.database().ref().child('challenges-beat/'+session.partida+'/u/'+user).remove();
                        }else{
                            console.log("leader will kill "+leader);
                        }
                    }
                }else{
                    console.log("not a zombie");
                    zombies_beat[user]=challenge_zombies_beat[user].alive_beat;
                    if(zombies_to_kill.indexOf(user)!=-1){
                        console.log("lo quito de candidatos a zombie");
                        zombies_to_kill.splice(zombies_to_kill.indexOf(user), 1);
                    }
                }
            }
        }
    }
}














function listen_challenge(challenge){
    session.challenge=challenge;    // TODO: necessary???
    console.log('challenge:'+JSON.stringify(challenge));
    
    
    if(challenge==null || challenge==undefined){ // CANCELLED!! -----------------------------------------------
        var header_status=document.getElementById('header_status');
        header_status.innerHTML='';
        /////// re-implement this
        clearTimeout(show_answer_timeout);
        clearTimeout(alive_timeout);
        zombies_beat={};
        zombies_to_kill=[];
        activity_timer.reset();
        if(session.mode!="test") remove_modal();
        ///////
        firebase.database().ref().child('challenges/'+session.partida).off();
        console.log('challenge canceled!');
        //alert('challenge canceled!');
        menu_screen();
    }else if(challenge.game_status=='over'){ // OVER!! -----------------------------------------------
        reset_local_game();

        /////// re-implement this
        clearTimeout(show_answer_timeout);
        clearTimeout(alive_timeout);
        zombies_beat={};
        zombies_to_kill=[];


        activity_timer.reset();
        if(session.mode!="test"){ remove_modal();}
        ///////
        firebase.database().ref().child('challenges/'+session.partida).off();
        console.log('challenge over!');
        canvas_zone_vcentered.innerHTML=' \
          GAME OVER! <br /><br />Winner: '+get_winner_string(challenge)+'<br />\
          <button id="accept_over">accept</button>\
        <br />\
        ';
		document.getElementById("accept_over").addEventListener(clickOrTouch,function(){
            var header_status=document.getElementById('header_status');
            header_status.innerHTML='';
			var updates = {};
			updates['challenges-private/'+firebaseCodec.encodeFully(session.user)] = null;
			firebase.database().ref().update(updates);
            // remove usr-name and challenge
            var tmpRef=firebase.database().ref().child('challenges/'+session.partida);
            session.partida="";
            tmpRef.remove()
            tmpRef.off();
            tmpRef=null;
            if(!session.user.includes("gmail.com")){
                tmpRef=firebase.database().ref().child('users/'+session.user);
                tmpRef.remove()
                tmpRef.off();
                tmpRef=null;
                tmpRef=firebase.database().ref().child('challenges-private/'+session.user);
                session.user=null;
                clearTimeout(alive_timeout);
                zombies_beat={};
                zombies_to_kill=[];
                tmpRef.remove()
                tmpRef.off();
                tmpRef=null;
            }
            
            
			menu_screen();
		});
    }else{
        if(Object.keys(challenge.u).length<2 && challenge.game_status!="waiting"){ 
            console.log("canceling game, only 1 player alive");
            cancel_challenge(challenge);
        }
        if(challenge.game_status=='waiting'){
            reset_local_game();
            //activity_timer.set_end_callback(silly_cb_challenge); needed?
            var accept_button='';
            //var updates = {};
            if(session.user==get_session_master(challenge) && objectProperties(challenge.u).length>1){
                accept_button='<button id="start_challenge">start</button>';
            }
            //firebase.database().ref().update(updates);
            //challenge:'+JSON.stringify(challenge)+'
            var somos="";
            for (var user in challenge.u){
                if(user!=session.user) somos+=user+"<br/>";
                else somos+=""+user+" (tú)<br />"
            }
            canvas_zone_vcentered.innerHTML=' \
              PARTIDA: '+session.partida+'<br />...esperando... <br/>de momento somos:<br/>'+somos+'<br />\
              '+accept_button+'\
            <br /><button id="go-back" class="minibutton fixed-bottom-right go-back">&lt;</button> \
            ';
            console.log('session-master:'+get_session_master(challenge));
            if(session.user==get_session_master(challenge) && objectProperties(challenge.u).length>1){
                document.getElementById("start_challenge").addEventListener(clickOrTouch,function(){
                    var updates = {};
                    updates['challenges/'+session.partida+'/game_status'] = 'playing';
                    firebase.database().ref().update(updates);
                    });
            }
            document.getElementById("go-back").addEventListener(clickOrTouch,function(){cancel_challenge(challenge);}.bind(challenge));
        }
        /*else if(challenge.game_status=='playing'){
            if(session.user==get_session_master(challenge)){
                if(two_alive(challenge)){
                    var randnum=Math.floor((Math.random() * 10));
                    //if (randnum <= 5) diff_country_question_challenge(random_item(indicator_list),challenge);
                    //else 
                        history_question_challenge(challenge);
                }else{
                    finish_challenge(challenge);
                }
            }
        }else if(challenge.game_status=='waiting_answers'){
            if(challenge.u[session.user].answer!='' || challenge.u[session.user].lifes<=0){
                document.getElementById('enemy_answer').innerHTML=get_enemies_life_answer_representation(challenge);
            }
            if(all_answered(challenge)){
                // do the checking and trigger a timeout to trigger playing again
                // TODO do something more fancy (like showing what each person answered ...)
                //diff_country_question_challenge(random_item(indicator_list),challenge);
                if(session.user==get_session_master(challenge)){
                    setTimeout(function(){
                        var updates = {};
                        updates['challenges/'+session.partida+'/game_status'] = 'playing';
                        for(var u in challenge.u) {
                            if ( challenge.u.hasOwnProperty(u)) {
                                updates['challenges/'+session.partida+'/u/'+u+'/answer'] = '';
                            }
                        }
                        firebase.database().ref().update(updates);
                    }, 4000);
                }
            }else if(challenge.question!=null && challenge.question!='' && all_unanswered(challenge)){
                /////// re-implement this
                clearTimeout(show_answer_timeout);
                activity_timer.reset();
                if(session.mode!="test") remove_modal();
                ///////
                var header_status=document.getElementById('header_status');
                header_status.innerHTML='Life: <span id="current_lifes">&#9825; &#9825; &#9825;</span> Sc: <span id="current_score_num">0</span> '; //current_lifes2
                update_lifes_representation();
                //update_lifes2_representation(usr_pos,challenge);
                canvas_zone_vcentered.innerHTML=' \
                <div id="question"></div>\
                <div id="answers"></div>\
                <div id="game-panel">\
                  <progress id="time_left" value="0" max="'+countdown_limit_end_secs+'"></progress>\
                </div>\
                <button id="go-back" class="minibutton fixed-bottom-right go-back">&lt;</button> \
                ';
                //get elements
                dom_score_correct=document.getElementById('current_score_num');
                canvas_zone_question=document.getElementById('question');
                canvas_zone_answers=document.getElementById('answers');
                dom_score_correct.innerHTML=challenge.u[session.user].score;

                activity_timer.start();
                canvas_zone_question.innerHTML=challenge.question;
                //var possible_answers=''; //for(var a=0;a<challenge.answers.length;a++)
                canvas_zone_answers.innerHTML='\
                <div id="answer-'+challenge.answer_options[0]+'" class="answer aleft coolbutton">'+challenge.answer_options[0]+'</div>\
                <div id="answer-'+challenge.answer_options[1]+'" class="answer aright coolbutton">'+challenge.answer_options[1]+'</div>\
                ';
                if(challenge.u[session.user].lifes>0){
                    var boxes=document.getElementsByClassName("answer");
                    for(var i=0;i<boxes.length;i++){
                        boxes[i].addEventListener(clickOrTouch,function(){
                            check_correct_challenge(this.innerHTML)
                            });
                    }
                    document.getElementById("go-back").addEventListener(clickOrTouch,function(){cancel_challenge(challenge);}.bind(challenge));
                }else{
                    open_js_modal_content('<div class="js-modal-incorrect"><h1>MUERTO</h1> <br />'+challenge.answer_msg+'<br />\
                                        correct: '+challenge.correct_answer+'<br />\
                                        <b>You</b><span style="color:red">[X]</span> ('+get_lifes_representation(challenge.u[session.user].lifes)+')<br />\
                                        <span id="enemy_answer">'+get_enemies_life_answer_representation(challenge)+'</span></div>');
                }
            }
        }*/
    }
}


var reset_local_game=function(){
    session.type="qa";
	session.num_correct=0;
	var timestamp=new Date();
	session.timestamp=timestamp.getFullYear()+"-"+
		pad_string((timestamp.getMonth()+1),2,"0") + "-" + pad_string(timestamp.getDate(),2,"0") + " " +
		 pad_string(timestamp.getHours(),2,"0") + ":"  + pad_string(timestamp.getMinutes(),2,"0");
    session.lifes=3;
	activity_timer.reset()
}

var get_session_master=function(challenge){
    return Object.keys(challenge.u).sort()[0];
}


function cancel_challenge(challenge){
    // TODO if game status not just "waiting"
    var r = confirm("¿Seguro que quieres salir, el juego parará para todos los jugadores?");
    if (r == true) {
        var updates = {};
        console.log('canceling '+JSON.stringify(challenge));
        updates['challenges/'+session.partida] = null;
        updates['challenges-beat/'+session.partida] = null;
        firebase.database().ref().update(updates);
    }
}






var QueryString=get_query_string();
var debug=false;
var user_bypass=undefined;
if(QueryString.hasOwnProperty('debug') && QueryString.debug=='true') debug=true;

// responsive tunings
prevent_scrolling();

var is_app=is_cordova();
if(is_app){
    if (!window.cordova) alert("ERROR: Running cordova without including cordova.js!");
	document.addEventListener('deviceready', onDeviceReady, false);
}else{
    onDeviceReady();
}

function onDeviceReady() {
    console.log('userAgent: '+navigator.userAgent+' is_app: '+is_app);
	menu_screen(); // <----- entry point
}

// window.onload = function () does not work for apps
window.onload = function () { 
	if(debug) console.log("win.onload");
	//var splash=document.getElementById("splash_screen");
	//if(splash!=null && (ResourceLoader.lazy_audio==false || ResourceLoader.not_loaded['sounds'].length==0)){ splash.parentNode.removeChild(splash); }
}













