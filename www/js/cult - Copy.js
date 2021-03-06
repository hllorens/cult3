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





// TODO reemplazar undefined por null

var nombre_partida=undefined;
var sessions=undefined;
var top_scores_sessions=undefined;
var dbRef=firebase.database().ref().child('sessions');
dbRef.once('value',function(snap){sessions=snap.val()});
firebase.database().ref().child('top_scores').once('value',function(snap){top_scores_sessions=snap.val()});
var dbRefChat=firebase.database().ref().child('chat');
var dbRefChallenge=undefined;
var dbRefChallengeKey=undefined;
var app_name='CULT';
var listening_private_challenges=false;
// MEDIA
var data_map={"debtgdp":{"indicator":"debtgdp","indicator_sf":"debt\/GDP (%)","last_year":2015,"previous_year":2014,"previous_year2":2013,"previous_year3":2012,"last_lustrum":2011,"last_decade":2006,"last_2decade":1996,"data_source":"wb","data":{"last_year":{"Afghanistan":null,"Argentina":null,"Australia":null,"Belgium":null,"Brazil":null,"Canada":null,"Switzerland":null,"China":null,"Germany":null,"Denmark":null,"Egypt":null,"Spain":null,"European Union":null,"Finland":null,"France":null,"United Kingdom":null,"Greece":null,"Indonesia":null,"India":null,"Italy":null,"Japan":null,"South Korea":null,"Mexico":null,"Netherlands":null,"Norway":null,"Pakistan":null,"Poland":null,"Portugal":null,"Russian Federation":null,"Saudi Arabia":null,"Sweden":null,"Turkey":null,"United States":null,"World":null,"South Africa":null},"previous_year":{"Afghanistan":null,"Argentina":null,"Australia":null,"Belgium":null,"Brazil":null,"Canada":null,"Switzerland":null,"China":null,"Germany":null,"Denmark":null,"Egypt":null,"Spain":null,"European Union":null,"Finland":null,"France":null,"United Kingdom":null,"Greece":null,"Indonesia":null,"India":null,"Italy":null,"Japan":null,"South Korea":null,"Mexico":null,"Netherlands":null,"Norway":null,"Pakistan":null,"Poland":null,"Portugal":null,"Russian Federation":null,"Saudi Arabia":null,"Sweden":null,"Turkey":null,"United States":"97.5474421685661","World":null,"South Africa":null},"previous_year2":{"Afghanistan":null,"Argentina":null,"Australia":"38.3391837878014","Belgium":"101.551417921627","Brazil":null,"Canada":"48.8842840027418","Switzerland":null,"China":null,"Germany":"52.3337185641055","Denmark":"46.1496595780449","Egypt":null,"Spain":"96.4723345683963","European Union":"83.4110019234184","Finland":"53.5310665001131","France":"88.5793492607987","United Kingdom":"98.2639835522543","Greece":"181.929564213094","Indonesia":null,"India":null,"Italy":"134.856331529496","Japan":"201.567701009239","South Korea":null,"Mexico":null,"Netherlands":"68.2729078737726","Norway":"20.9372173275409","Pakistan":null,"Poland":"55.5915720253257","Portugal":"138.046002848182","Russian Federation":"12.6779987859877","Saudi Arabia":null,"Sweden":"41.9805889213771","Turkey":"38.0102144234847","United States":"96.7625108322791","World":null,"South Africa":null},"previous_year3":{"Afghanistan":null,"Argentina":null,"Australia":"40.4096305062822","Belgium":"103.806418260502","Brazil":null,"Canada":"52.3492874729538","Switzerland":null,"China":null,"Germany":"55.2278518690605","Denmark":"48.9555806387358","Egypt":null,"Spain":"83.4509462112741","European Union":"61.8821120081487","Finland":"52.4653015871427","France":"88.9239643514465","United Kingdom":"101.950921593814","Greece":"165.477789379429","Indonesia":"25.0343541103907","India":"50.4994183712661","Italy":"127.035920607563","Japan":"195.472130303954","South Korea":null,"Mexico":null,"Netherlands":"68.536372147237","Norway":"20.774933832635","Pakistan":null,"Poland":"55.155028385652","Portugal":"133.881608750281","Russian Federation":"8.68858887066403","Saudi Arabia":null,"Sweden":"42.0213308727746","Turkey":"43.525738119276","United States":"94.3749572507522","World":null,"South Africa":null},"last_lustrum":{"Afghanistan":null,"Argentina":null,"Australia":"30.5135780024755","Belgium":"94.9144792790299","Brazil":null,"Canada":"51.890139791471","Switzerland":"24.1914956028948","China":null,"Germany":"53.3842374737341","Denmark":"49.9151850874112","Egypt":null,"Spain":"61.8320218457735","European Union":"57.6081296597538","Finland":"47.8912373202485","France":"79.483451529755","United Kingdom":"97.506607059056","Greece":"111.113002795702","Indonesia":"24.8651867947499","India":"45.0864736815309","Italy":"108.349261373723","Japan":"189.419708735785","South Korea":null,"Mexico":null,"Netherlands":"62.4229113945708","Norway":"20.2795657407862","Pakistan":null,"Poland":"51.5774402080486","Portugal":"102.410174533787","Russian Federation":"8.68938624527213","Saudi Arabia":null,"Sweden":"42.8164646881496","Turkey":"45.5186858693388","United States":"90.1621260469988","World":null,"South Africa":null},"last_decade":{"Afghanistan":null,"Argentina":null,"Australia":"21.6548331898462","Belgium":null,"Brazil":null,"Canada":null,"Switzerland":"33.707064070497","China":null,"Germany":null,"Denmark":null,"Egypt":null,"Spain":"33.7246779841544","European Union":null,"Finland":null,"France":null,"United Kingdom":"45.8053366168546","Greece":null,"Indonesia":null,"India":"59.1099377543981","Italy":null,"Japan":null,"South Korea":null,"Mexico":null,"Netherlands":"42.6931774396939","Norway":"48.1881559415559","Pakistan":null,"Poland":"46.793914424681","Portugal":null,"Russian Federation":"9.89107334166946","Saudi Arabia":null,"Sweden":null,"Turkey":null,"United States":"55.2941842181172","World":null,"South Africa":null},"last_2decade":{"Afghanistan":null,"Argentina":null,"Australia":null,"Belgium":null,"Brazil":null,"Canada":null,"Switzerland":"21.7024877945298","China":null,"Germany":null,"Denmark":null,"Egypt":null,"Spain":"61.0846090985098","European Union":null,"Finland":null,"France":null,"United Kingdom":"47.2607666403587","Greece":null,"Indonesia":"23.923142554795","India":"44.9352806704411","Italy":null,"Japan":null,"South Korea":"6.93982497887893","Mexico":"26.0254438773894","Netherlands":"67.7728443354724","Norway":"23.5714553368536","Pakistan":null,"Poland":"43.8258430717803","Portugal":null,"Russian Federation":null,"Saudi Arabia":null,"Sweden":null,"Turkey":"37.9207517149446","United States":"46.5855092779056","World":null,"South Africa":"48.9129342676567"}}},"employed":{"indicator":"employed","indicator_sf":"employed %","last_year":2015,"previous_year":2014,"previous_year2":2013,"previous_year3":2012,"last_lustrum":2011,"last_decade":2006,"last_2decade":1996,"data_source":"wb","data":{"last_year":{"Afghanistan":null,"Argentina":null,"Australia":null,"Belgium":null,"Brazil":null,"Canada":null,"Switzerland":null,"China":null,"Germany":null,"Denmark":null,"Egypt":null,"Spain":null,"European Union":null,"Finland":null,"France":null,"United Kingdom":null,"Greece":null,"Indonesia":null,"India":null,"Italy":null,"Japan":null,"South Korea":null,"Mexico":null,"Netherlands":null,"Norway":null,"Pakistan":null,"Poland":null,"Portugal":null,"Russian Federation":null,"Saudi Arabia":null,"Sweden":null,"Turkey":null,"United States":null,"World":null,"South Africa":null},"previous_year":{"Afghanistan":"43.4000015258789","Argentina":"55.9000015258789","Australia":"61.2000007629395","Belgium":"48.7999992370605","Brazil":"65","Canada":"61.5","Switzerland":"65","China":"68","Germany":"56.9000015258789","Denmark":"58.2999992370605","Egypt":"42.7999992370605","Spain":"44.4000015258789","European Union":"51.659725456124","Finland":"54.2999992370605","France":"50.2000007629395","United Kingdom":"58.2000007629395","Greece":"39.0999984741211","Indonesia":"63.5","India":"52.2000007629395","Italy":"43.0999984741211","Japan":"56.9000015258789","South Korea":"58.7999992370605","Mexico":"58.5999984741211","Netherlands":"59.7000007629395","Norway":"62.5999984741211","Pakistan":"51.7000007629395","Poland":"51.2999992370605","Portugal":"51.7000007629395","Russian Federation":"60.5","Saudi Arabia":"52.0999984741211","Sweden":"58.9000015258789","Turkey":"44.7999992370605","United States":"58.5","World":"59.7115156865394","South Africa":"39.4000015258789"},"previous_year2":{"Afghanistan":"43.5","Argentina":"56.5","Australia":"61.5","Belgium":"48.7999992370605","Brazil":"65.3000030517578","Canada":"61.5","Switzerland":"65.1999969482422","China":"68","Germany":"56.7000007629395","Denmark":"58.0999984741211","Egypt":"42.5999984741211","Spain":"43.5","European Union":"51.28875110805","Finland":"54.9000015258789","France":"50.0999984741211","United Kingdom":"57.4000015258789","Greece":"38.7000007629395","Indonesia":"63.5","India":"52.2000007629395","Italy":"43.0999984741211","Japan":"56.7999992370605","South Korea":"59.0999984741211","Mexico":"58.5","Netherlands":"60.0999984741211","Norway":"62.5999984741211","Pakistan":"51.5999984741211","Poland":"50.7000007629395","Portugal":"50.4000015258789","Russian Federation":"60.2000007629395","Saudi Arabia":"51.7999992370605","Sweden":"58.9000015258789","Turkey":"45.0999984741211","United States":"57.7999992370605","World":"59.6391912122206","South Africa":"39.2999992370605"},"previous_year3":{"Afghanistan":"43.7999992370605","Argentina":"56.2999992370605","Australia":"61.9000015258789","Belgium":"49","Brazil":"65.5999984741211","Canada":"61.5","Switzerland":"65.3000030517578","China":"68","Germany":"56.5999984741211","Denmark":"58.5","Egypt":"42.7999992370605","Spain":"44.5","European Union":"51.5459987172764","Finland":"55.5","France":"50.5999984741211","United Kingdom":"57.0999984741211","Greece":"40.2999992370605","Indonesia":"63.7000007629395","India":"52.2000007629395","Italy":"43.7999992370605","Japan":"56.2999992370605","South Korea":"58.9000015258789","Mexico":"58.5","Netherlands":"61.2999992370605","Norway":"63.4000015258789","Pakistan":"51.5","Poland":"50.7999992370605","Portugal":"51.5","Russian Federation":"60","Saudi Arabia":"49.2999992370605","Sweden":"58.9000015258789","Turkey":"44.9000015258789","United States":"57.7000007629395","World":"59.6086275964902","South Africa":"38.7999992370605"},"last_lustrum":{"Afghanistan":"43.7000007629395","Argentina":"56.2000007629395","Australia":"62.2999992370605","Belgium":"49.2000007629395","Brazil":"65.3000030517578","Canada":"61.5","Switzerland":"65.3000030517578","China":"67.9000015258789","Germany":"56.2999992370605","Denmark":"59.0999984741211","Egypt":"42.9000015258789","Spain":"46.4000015258789","European Union":"51.81573704329","Finland":"55.5999984741211","France":"50.7999992370605","United Kingdom":"57","Greece":"44","Indonesia":"63.2999992370605","India":"52.7999992370605","Italy":"44.0999984741211","Japan":"56.5","South Korea":"58.5","Mexico":"57.0999984741211","Netherlands":"61.5","Norway":"63.2000007629395","Pakistan":"51.2999992370605","Poland":"50.7999992370605","Portugal":"53.5999984741211","Russian Federation":"59.2999992370605","Saudi Arabia":"48.7999992370605","Sweden":"58.7999992370605","Turkey":"44.5999984741211","United States":"57.2999992370605","World":"59.5772145861402","South Africa":"38.5999984741211"},"last_decade":{"Afghanistan":"43.7000007629395","Argentina":"55.9000015258789","Australia":"61.7999992370605","Belgium":"48.7000007629395","Brazil":"64","Canada":"62.4000015258789","Switzerland":"64.6999969482422","China":"69.6999969482422","Germany":"52.7000007629395","Denmark":"63.7000007629395","Egypt":"41.7999992370605","Spain":"52.5999984741211","European Union":"52.3549904604233","Finland":"56.7999992370605","France":"50.9000015258789","United Kingdom":"59","Greece":"48.7000007629395","Indonesia":"60.7000007629395","India":"57.0999984741211","Italy":"45.7000007629395","Japan":"57.9000015258789","South Korea":"59.2999992370605","Mexico":"58.7999992370605","Netherlands":"62.2999992370605","Norway":"63.0999984741211","Pakistan":"50.2999992370605","Poland":"46.5999984741211","Portugal":"57.5999984741211","Russian Federation":"57.7000007629395","Saudi Arabia":"47.7000007629395","Sweden":"59.4000015258789","Turkey":"41.2000007629395","United States":"62.0999984741211","World":"60.7102429424859","South Africa":"42.4000015258789"},"last_2decade":{"Afghanistan":"44.2999992370605","Argentina":"48","Australia":"58.2000007629395","Belgium":"45.5999984741211","Brazil":"62.5999984741211","Canada":"58.0999984741211","Switzerland":"65.0999984741211","China":"74.8000030517578","Germany":"53.0999984741211","Denmark":"61","Egypt":"41.9000015258789","Spain":"39.5","European Union":"50.2739511951336","Finland":"52","France":"48.7000007629395","United Kingdom":"56.4000015258789","Greece":"46.7000007629395","Indonesia":"64.5999984741211","India":"57.9000015258789","Italy":"41.5999984741211","Japan":"61.4000015258789","South Korea":"60.7999992370605","Mexico":"56.2999992370605","Netherlands":"55.2999992370605","Norway":"61","Pakistan":"47.0999984741211","Poland":"50.5999984741211","Portugal":"54.5999984741211","Russian Federation":"53.5999984741211","Saudi Arabia":"48.5999984741211","Sweden":"56.7000007629395","Turkey":"49.5","United States":"62.2000007629395","World":"61.7047136022689","South Africa":"43.7999992370605"}}},"extdebt":{"indicator":"extdebt","indicator_sf":"external debt","last_year":2015,"previous_year":2014,"previous_year2":2013,"previous_year3":2012,"last_lustrum":2011,"last_decade":2006,"last_2decade":1996,"data_source":"wb","data":{"last_year":{"Afghanistan":null,"Argentina":null,"Australia":null,"Belgium":null,"Brazil":null,"Canada":null,"Switzerland":null,"China":null,"Germany":null,"Denmark":null,"Egypt":null,"Spain":null,"European Union":null,"Finland":null,"France":null,"United Kingdom":null,"Greece":null,"Indonesia":null,"India":null,"Italy":null,"Japan":null,"South Korea":null,"Mexico":null,"Netherlands":null,"Norway":null,"Pakistan":null,"Poland":null,"Portugal":null,"Russian Federation":null,"Saudi Arabia":null,"Sweden":null,"Turkey":null,"United States":null,"World":null,"South Africa":null},"previous_year":{"Afghanistan":"2554678000","Argentina":null,"Australia":null,"Belgium":null,"Brazil":"556871157000","Canada":null,"Switzerland":null,"China":"959509815000","Germany":null,"Denmark":null,"Egypt":"39623992000","Spain":null,"European Union":null,"Finland":null,"France":null,"United Kingdom":null,"Greece":null,"Indonesia":"293397401000","India":"463230464350.4","Italy":null,"Japan":null,"South Korea":null,"Mexico":"432602236000","Netherlands":null,"Norway":null,"Pakistan":"62184234000","Poland":null,"Portugal":null,"Russian Federation":null,"Saudi Arabia":null,"Sweden":null,"Turkey":"408202751000","United States":null,"World":null,"South Africa":"144005733000"},"previous_year2":{"Afghanistan":"2576820000","Argentina":null,"Australia":null,"Belgium":null,"Brazil":"483814083000","Canada":null,"Switzerland":null,"China":"870848286000","Germany":null,"Denmark":null,"Egypt":"44444146000","Spain":null,"European Union":null,"Finland":null,"France":null,"United Kingdom":null,"Greece":null,"Indonesia":"266133750000","India":"429742425138.5","Italy":null,"Japan":null,"South Korea":null,"Mexico":"406042143000","Netherlands":null,"Norway":null,"Pakistan":"60045292000","Poland":null,"Portugal":null,"Russian Federation":null,"Saudi Arabia":null,"Sweden":null,"Turkey":"389385574000","United States":null,"World":null,"South Africa":"139244973000"},"previous_year3":{"Afghanistan":"2708631000","Argentina":null,"Australia":null,"Belgium":null,"Brazil":"440512741000","Canada":null,"Switzerland":null,"China":"750745640000","Germany":null,"Denmark":null,"Egypt":"39996714000","Spain":null,"European Union":null,"Finland":null,"France":null,"United Kingdom":null,"Greece":null,"Indonesia":"252555372000","India":"395071134090.6","Italy":null,"Japan":null,"South Korea":null,"Mexico":"348945146000","Netherlands":null,"Norway":null,"Pakistan":"62143613000","Poland":null,"Portugal":null,"Russian Federation":null,"Saudi Arabia":null,"Sweden":null,"Turkey":"336961273000","United States":null,"World":null,"South Africa":"144958642000"},"last_lustrum":{"Afghanistan":"2627442000","Argentina":null,"Australia":null,"Belgium":null,"Brazil":"404046105000","Canada":null,"Switzerland":null,"China":"710233988000","Germany":null,"Denmark":null,"Egypt":"35145102000","Spain":null,"European Union":null,"Finland":null,"France":null,"United Kingdom":null,"Greece":null,"Indonesia":"219619132000","India":"336845285775.1","Italy":null,"Japan":null,"South Korea":null,"Mexico":"291833290000","Netherlands":null,"Norway":null,"Pakistan":"65520332000","Poland":null,"Portugal":null,"Russian Federation":null,"Saudi Arabia":null,"Sweden":null,"Turkey":"305135381000","United States":null,"World":null,"South Africa":"116929482000"},"last_decade":{"Afghanistan":"969197000","Argentina":null,"Australia":null,"Belgium":null,"Brazil":"194303020000","Canada":null,"Switzerland":null,"China":"320800407000","Germany":null,"Denmark":null,"Egypt":"30648521000","Spain":null,"European Union":null,"Finland":null,"France":null,"United Kingdom":null,"Greece":null,"Indonesia":"135959441000","India":"159525527066","Italy":null,"Japan":null,"South Korea":null,"Mexico":"170608370000","Netherlands":null,"Norway":null,"Pakistan":"37174387000","Poland":null,"Portugal":null,"Russian Federation":null,"Saudi Arabia":null,"Sweden":null,"Turkey":"209593623000","United States":null,"World":null,"South Africa":"59381328000"},"last_2decade":{"Afghanistan":null,"Argentina":null,"Australia":null,"Belgium":null,"Brazil":"181381552000","Canada":null,"Switzerland":null,"China":"128817086000","Germany":null,"Denmark":null,"Egypt":"31484019000","Spain":null,"European Union":null,"Finland":null,"France":null,"United Kingdom":null,"Greece":null,"Indonesia":"128988714000","India":"93966072270","Italy":null,"Japan":null,"South Korea":null,"Mexico":"156339589000","Netherlands":null,"Norway":null,"Pakistan":"29768436000","Poland":null,"Portugal":null,"Russian Federation":null,"Saudi Arabia":null,"Sweden":null,"Turkey":"79829428000","United States":null,"World":null,"South Africa":"26050001000"}}},"gdp":{"indicator":"gdp","indicator_sf":"GDP (total)","last_year":2015,"previous_year":2014,"previous_year2":2013,"previous_year3":2012,"last_lustrum":2011,"last_decade":2006,"last_2decade":1996,"data_source":"wb","data":{"last_year":{"Afghanistan":"19199437988.8023","Argentina":"583168571071.407","Australia":"1339539063150.01","Belgium":"454039037373.849","Brazil":"1774724818900.48","Canada":"1550536520141.93","Switzerland":"664737543616.5","China":"10866443998394.2","Germany":"3355772429854.72","Denmark":"295164313328.842","Egypt":"330778550716.746","Spain":"1199057336142.84","European Union":"16229464160142.9","Finland":"229810358212.266","France":"2421682377730.95","United Kingdom":"2848755449421.34","Greece":"195212006432.295","Indonesia":"861933968740.332","India":"2073542978208.77","Italy":"1814762858045.91","Japan":"4123257609614.74","South Korea":"1377873107856.33","Mexico":"1144331343172.45","Netherlands":"752547410446.934","Norway":"388314890978.609","Pakistan":"269971498118.442","Poland":"474783393022.947","Portugal":"198931394033.492","Russian Federation":"1326015096948.19","Saudi Arabia":"646001866666.667","Sweden":"492618068568.573","Turkey":"718221078308.824","United States":"17946996000000","World":"73502340958392.9","South Africa":"312797576593.594"},"previous_year":{"Afghanistan":"20050189881.6659","Argentina":"529726189460.922","Australia":"1454675479665.84","Belgium":"531234803749.453","Brazil":"2417046323841.9","Canada":"1783775590895.93","Switzerland":"701037135966.049","China":"10351111762216.4","Germany":"3868291231823.77","Denmark":"346119472127.525","Egypt":"301498960051.639","Spain":"1381342101735.68","European Union":"18516744672413.1","Finland":"272335981538.937","France":"2829192039171.84","United Kingdom":"2990201431078.23","Greece":"235574074998.314","Indonesia":"890487074595.966","India":"2042438591343.98","Italy":"2138540909211.12","Japan":"4596156556721.9","South Korea":"1411333926201.24","Mexico":"1297845522512.7","Netherlands":"879319321494.639","Norway":"500519016133.298","Pakistan":"243382758001.33","Poland":"544982089079.093","Portugal":"230116913840.321","Russian Federation":"2030972571014.27","Saudi Arabia":"753831466666.667","Sweden":"571100683085.099","Turkey":"798797266164.039","United States":"17348071500000","World":"78088515958673.4","South Africa":"349873026988.676"},"previous_year2":{"Afghanistan":"20046334303.9661","Argentina":"554155198994.424","Australia":"1563950959269.52","Belgium":"521370527591.376","Brazil":"2465773850934.56","Canada":"1837443486716.34","Switzerland":"684919206141.128","China":"9490602600148.49","Germany":"3745317149399.13","Denmark":"338927058604.182","Egypt":"286011230726.274","Spain":"1369261671179","European Union":"17986267255955","Finland":"269980111642.898","France":"2808511203185.39","United Kingdom":"2712296271989.99","Greece":"239509850570.447","Indonesia":"912524136718.019","India":"1863208343557.81","Italy":"2130330362918.37","Japan":"4908862837290.47","South Korea":"1305604981271.91","Mexico":"1261832901816.47","Netherlands":"864169242952.925","Norway":"522746212765.957","Pakistan":"231149768633.284","Poland":"524059039422.894","Portugal":"226073492966.495","Russian Federation":"2230628062254.41","Saudi Arabia":"744335733333.333","Sweden":"578742001487.571","Turkey":"823242587456.666","United States":"16663160000000","World":"76362589725320.3","South Africa":"366057913372.207"},"previous_year3":{"Afghanistan":"20536542736.7297","Argentina":"548934618735.756","Australia":"1537477830480.51","Belgium":"497815990388.023","Brazil":"2460658440428.04","Canada":"1824288757447.57","Switzerland":"665408300271.743","China":"8461623162714.07","Germany":"3539615377794.51","Denmark":"325012162409.979","Egypt":"276353323880.224","Spain":"1339946773437.24","European Union":"17249382954724.7","Finland":"256706466091.089","France":"2681416108537.39","United Kingdom":"2630472981169.65","Greece":"245670666639.047","Indonesia":"917869913364.916","India":"1824960308640.71","Italy":"2072823111961.1","Japan":"5957250118648.75","South Korea":"1222807195712.49","Mexico":"1186598324461.82","Netherlands":"828946812396.788","Norway":"509704856037.817","Pakistan":"224646134571.4","Poland":"500227851988.331","Portugal":"216368178659.447","Russian Federation":"2170145829223.92","Saudi Arabia":"733955733333.333","Sweden":"543880647757.404","Turkey":"788863301224.944","United States":"16155255000000","World":"74373326726786.4","South Africa":"397386418270.402"},"last_lustrum":{"Afghanistan":"17930239399.8149","Argentina":"533200293249.748","Australia":"1389919156068.22","Belgium":"526975257158.743","Brazil":"2614573170731.71","Canada":"1788703385548.26","Switzerland":"696311671959.459","China":"7492432097810.11","Germany":"3757464553794.83","Denmark":"341498686832.939","Egypt":"236001858960.015","Spain":"1487924659438.42","European Union":"18321253083347.7","Finland":"273657214345.288","France":"2862502085070.89","United Kingdom":"2594904662714.31","Greece":"287779921184.32","Indonesia":"892969104529.574","India":"1815865716201.58","Italy":"2276150874756.74","Japan":"5908989186412.22","South Korea":"1202463682633.85","Mexico":"1171187519660.64","Netherlands":"893701695857.659","Norway":"498157406416.158","Pakistan":"213755282058.719","Poland":"528742068313.757","Portugal":"244879869335.557","Russian Federation":"2031771419408.96","Saudi Arabia":"669506666666.667","Sweden":"563113421113.421","Turkey":"774754155820.895","United States":"15517926000000","World":"72818110559359.7","South Africa":"416596716626.957"},"last_decade":{"Afghanistan":"7057598406.61553","Argentina":"233581686065.467","Australia":"746880802635.52","Belgium":"409813072387.404","Brazil":"1107640325472.35","Canada":"1315415197461.21","Switzerland":"429195591242.622","China":"2729784031906.09","Germany":"3002446368084.31","Denmark":"282961088316.405","Egypt":"107484034870.974","Spain":"1264551499184.54","European Union":"15295130473683.3","Finland":"216552502822.732","France":"2325011918203.49","United Kingdom":"2588077276908.92","Greece":"273317737046.795","Indonesia":"364570515631.492","India":"949116769619.216","Italy":"1942633841801.53","Japan":"4356750212598.01","South Korea":"1011797457138.5","Mexico":"965281191371.844","Netherlands":"726649102998.369","Norway":"345424664369.357","Pakistan":"137264061106.043","Poland":"343261472028.873","Portugal":"208566948939.907","Russian Federation":"989930542278.695","Saudi Arabia":"376900133511.348","Sweden":"420032121655.688","Turkey":"530900094644.732","United States":"13855888000000","World":"51045344395537.6","South Africa":"271638630111.497"},"last_2decade":{"Afghanistan":null,"Argentina":"272149750000","Australia":"401335356600.91","Belgium":"281357654723.127","Brazil":"850425828275.793","Canada":"628546387972.131","Switzerland":"329619351051.78","China":"860844098049.121","Germany":"2503665193657.4","Denmark":"187632400365.599","Egypt":"67629716981.1321","Spain":"640998292394.588","European Union":"9735448852000.77","Finland":"132099404607.818","France":"1614245416078.98","United Kingdom":"1306575663026.52","Greece":"145861612825.595","Indonesia":"227369671349.161","India":"399787263892.645","Italy":"1308929305684.53","Japan":"4706187126019.61","South Korea":"603413139412.021","Mexico":"397404138184.313","Netherlands":"445704575163.399","Norway":"163517783497.163","Pakistan":"63320122807.1223","Poland":"157079211268.128","Portugal":"122629812841.175","Russian Federation":"391719993756.828","Saudi Arabia":"157743124165.554","Sweden":"288103936773.039","Turkey":"181475555282.555","United States":"8100201000000","World":"31324989666994.9","South Africa":"147608050636.15"}}},"gdpgrowth":{"indicator":"gdpgrowth","indicator_sf":"GDP growth (%)","last_year":2015,"previous_year":2014,"previous_year2":2013,"previous_year3":2012,"last_lustrum":2011,"last_decade":2006,"last_2decade":1996,"data_source":"wb","data":{"last_year":{"Afghanistan":"1.51991126448578","Argentina":"2.37229601701262","Australia":"2.25782511179634","Belgium":"1.3739371824101","Brazil":"-3.84736249471105","Canada":"1.07826875075381","Switzerland":"0.90963699789468","China":"6.90000000000018","Germany":"1.68772378120711","Denmark":"1.17855128146489","Egypt":"4.2","Spain":"3.21428640203662","European Union":"1.94875959684644","Finland":"0.546055313579501","France":"1.155966988731","United Kingdom":"2.32918332093841","Greece":"-0.231571523177266","Indonesia":"4.7939213038221","India":"7.57013036787396","Italy":"0.759532980888949","Japan":"0.472784704380771","South Korea":"2.61193540870619","Mexico":"2.54686997094976","Netherlands":"1.99058496608222","Norway":"1.5980686009933","Pakistan":"5.53810056237647","Poland":"3.64971913068008","Portugal":"1.45446380454275","Russian Federation":"-3.72667344001421","Saudi Arabia":"3.48565641322274","Sweden":"4.09363731662084","Turkey":"3.98485920209721","United States":"2.42597052645783","World":"2.46640414916892","South Africa":"1.28329572193775"},"previous_year":{"Afghanistan":"1.31253090764642","Argentina":"-2.55847744625616","Australia":"2.4998512224341","Belgium":"1.29547335319668","Brazil":"0.103371359100009","Canada":"2.47289263838321","Switzerland":"1.88947694383224","China":"7.26851324138448","Germany":"1.59977039232734","Denmark":"1.26190583842356","Egypt":"2.22879101389299","Spain":"1.36067301686447","European Union":"1.35781573312721","Finland":"-0.6983098876632","France":"0.259494108111838","United Kingdom":"2.85284331716611","Greece":"0.653982658187189","Indonesia":"5.02388905199018","India":"7.24347174583309","Italy":"-0.343160835971517","Japan":"-0.0314292658077306","South Korea":"3.34144751931207","Mexico":"2.25031646693301","Netherlands":"1.01112840751658","Norway":"2.21476279313688","Pakistan":"4.73835494419686","Poland":"3.28253807593806","Portugal":"0.905794224709112","Russian Federation":"0.706370560425242","Saudi Arabia":"3.63874159548291","Sweden":"2.26697842199903","Turkey":"3.02011821310668","United States":"2.4277956361022","World":"2.61213017091302","South Africa":"1.54870063532459"},"previous_year2":{"Afghanistan":"1.95912289275337","Argentina":"2.30248415836283","Australia":"2.44004906206246","Belgium":"0.00305605676224729","Brazil":"3.01514051081094","Canada":"2.21806818754125","Switzerland":"1.7688305613223","China":"7.68380996955","Germany":"0.29784758571904","Denmark":"-0.243779282941276","Egypt":"2.10672461668477","Spain":"-1.67197184815122","European Union":"0.186819335161488","Finland":"-0.758036294820087","France":"0.576241546834495","United Kingdom":"2.15990387108103","Greece":"-3.19823963560829","Indonesia":"5.55726368891023","India":"6.6388127357182","Italy":"-1.74819043935348","Japan":"1.35671650069271","South Korea":"2.89622005439183","Mexico":"1.34536241963883","Netherlands":"-0.495377914664218","Norway":"0.998705449736832","Pakistan":"4.36724945081146","Poland":"1.26470516286732","Portugal":"-1.13015582888232","Russian Federation":"1.27945391095746","Saudi Arabia":"2.66991139463894","Sweden":"1.24120491730943","Turkey":"4.19250934713969","United States":"1.48952494920856","World":"2.39295209998747","South Africa":"2.21235443137809"},"previous_year3":{"Afghanistan":"14.4347412879524","Argentina":"-1.05287445030977","Australia":"3.63272030319823","Belgium":"0.158656858456524","Brazil":"1.91545862251941","Canada":"1.74547228318005","Switzerland":"1.1246293105261","China":"7.75029759317401","Germany":"0.405170675144007","Denmark":"-0.073322003416564","Egypt":"2.19387835367519","Spain":"-2.62030851235816","European Union":"-0.477141820104237","Finland":"-1.42618935959564","France":"0.18269303354748","United Kingdom":"1.17905612305687","Greece":"-7.30049393532073","Indonesia":"6.03005065305615","India":"5.61856277332065","Italy":"-2.81901912719412","Japan":"1.74220042526984","South Korea":"2.29238242636897","Mexico":"4.01817386885878","Netherlands":"-1.05703740393571","Norway":"2.74876878288389","Pakistan":"3.50703342009689","Poland":"1.5617067210744","Portugal":"-4.02825671444592","Russian Federation":"3.51794186549459","Saudi Arabia":"5.3844659496954","Sweden":"-0.286320615444041","Turkey":"2.12746070917433","United States":"2.22403085385714","World":"2.46517782434037","South Africa":"2.21982400625758"},"last_lustrum":{"Afghanistan":"6.11368516942299","Argentina":"6.14748633986851","Australia":"2.37956133560841","Belgium":"1.7968378886938","Brazil":"3.91025534813345","Canada":"3.1412190013904","Switzerland":"1.80455391510743","China":"9.4845062015219","Germany":"3.66000015503516","Denmark":"1.15214252475052","Egypt":"1.81664664403142","Spain":"-1.0000804875138","European Union":"1.76116801415327","Finland":"2.57081774452163","France":"2.07922917455807","United Kingdom":"1.97239856307874","Greece":"-9.13249415322949","Indonesia":"6.1697842077098","India":"6.63835345010762","Italy":"0.576624660417949","Japan":"-0.454282296791092","South Korea":"3.68170466650844","Mexico":"4.04461387888593","Netherlands":"1.6636263443925","Norway":"0.968779709886419","Pakistan":"2.74840254954","Poland":"5.00851175729775","Portugal":"-1.82685290639886","Russian Federation":"4.26417656482873","Saudi Arabia":"9.95893280986544","Sweden":"2.66440795069538","Turkey":"8.77274629625198","United States":"1.60145467247139","World":"3.11209348936166","South Africa":"3.21245175505393"},"last_decade":{"Afghanistan":"5.55413762257501","Argentina":"8.14253597906148","Australia":"2.9828702853226","Belgium":"2.49946444651674","Brazil":"3.96050202907196","Canada":"2.6234126230555","Switzerland":"4.01278550769901","China":"12.6882251044697","Germany":"3.70015957205484","Denmark":"3.79674260857645","Egypt":"6.84296058663602","Spain":"4.17411911565355","European Union":"3.38511867117558","Finland":"4.05519744386183","France":"2.37494689958575","United Kingdom":"2.66182255294851","Greece":"5.6524337201578","Indonesia":"5.50095178520269","India":"9.26395889780733","Italy":"2.00658762971075","Japan":"1.6929042449209","South Korea":"5.176133981787","Mexico":"4.94451434826912","Netherlands":"3.51863696135297","Norway":"2.3950924655358","Pakistan":"6.17754203617736","Poland":"6.19268954779022","Portugal":"1.55305269222063","Russian Federation":"8.15343197288385","Saudi Arabia":"5.57674743458874","Sweden":"4.68812715248721","Turkey":"6.89348933743625","United States":"2.666625826122","World":"4.3803420996136","South Africa":"5.58504596151144"},"last_2decade":{"Afghanistan":null,"Argentina":"5.52668982269238","Australia":"3.94914072165129","Belgium":"1.5931570573082","Brazil":"2.20753552431761","Canada":"1.61104803051136","Switzerland":"0.601093571481528","China":"9.92472266262089","Germany":"0.817897617014211","Denmark":"2.90013212887818","Egypt":"4.98873055162254","Spain":"2.67463906729668","European Union":"2.01695076043676","Finland":"3.65883306320907","France":"1.3880040284493","United Kingdom":"2.66781264553228","Greece":"2.86212884645293","Indonesia":"7.64278628425994","India":"7.54952224818398","Italy":"1.28636643695856","Japan":"2.61005462854109","South Korea":"7.18591656580236","Mexico":"5.87476668289335","Netherlands":"3.56671923564109","Norway":"5.02799544492025","Pakistan":"4.84658128374571","Poland":"6.2389167858055","Portugal":"3.49668294438787","Russian Federation":"-3.60000000025505","Saudi Arabia":"3.38381343115093","Sweden":"1.51786123912999","Turkey":"7.37966447593668","United States":"3.79588122942587","World":"3.33649208282347","South Africa":"4.29999999677185"}}},"gdppcap":{"indicator":"gdppcap","indicator_sf":"GDP per capita","last_year":2015,"previous_year":2014,"previous_year2":2013,"previous_year3":2012,"last_lustrum":2011,"last_decade":2006,"last_2decade":1996,"data_source":"wb","data":{"last_year":{"Switzerland":"80214.7301520483","Norway":"74734.564089525","Australia":"56327.7214484289","United States":"55836.7926308733","Denmark":"52002.1510437879","Sweden":"50272.9415019928","Netherlands":"44433.4143287366","United Kingdom":"43734.0001709187","Canada":"43248.529909341","Finland":"41920.7977456941","Germany":"41219.049207038","Belgium":"40231.2831740081","France":"36248.1801907194","Japan":"32477.2151449234","European Union":"31843.1854947788","Italy":"29847.0497853143","South Korea":"27221.5240509661","Spain":"25831.5823052954","Saudi Arabia":"20481.7453220484","Portugal":"19222.9355983016","Greece":"18035.5543201083","Argentina":"13431.8783398577","Poland":"12494.4661900747","World":"10004.901645177","Turkey":"9130.02606479616","Russian Federation":"9057.11306037766","Mexico":"9009.2611626629","Brazil":"8538.5899749574","China":"7924.65395661835","South Africa":"5691.68676962801","Egypt":"3614.74676616271","Indonesia":"3346.48703949478","India":"1581.58891324619","Pakistan":"1428.98863660717","Afghanistan":"590.269515382605"},"previous_year":{"Norway":"97429.7084759454","Switzerland":"85610.8420285261","Australia":"61995.8296976","Denmark":"61330.9126252044","Sweden":"58899.9797944845","United States":"54398.4600093994","Netherlands":"52138.6839244096","Canada":"50185.4814970346","Finland":"49864.5762453579","Germany":"47767.0019056435","Belgium":"47299.8601085612","United Kingdom":"46278.5202128829","France":"42546.8387870273","European Union":"36425.565954594","Japan":"36152.6900171468","Italy":"35179.6539515302","Spain":"29718.5002155441","South Korea":"27989.3539925863","Saudi Arabia":"24406.4678217219","Portugal":"22124.3670925451","Greece":"21627.3542876417","Poland":"14337.2063674308","Russian Federation":"13902.1428503026","Argentina":"12324.9387857728","Brazil":"11728.7993875108","World":"10754.8380434097","Mexico":"10350.814693018","Turkey":"10303.8988002501","China":"7587.28973166335","South Africa":"6472.10102734624","Indonesia":"3499.58873476515","Egypt":"3365.70742057477","India":"1576.81766887286","Pakistan":"1315.26762194284","Afghanistan":"633.947864294639"},"previous_year2":{"Norway":"102910.435039364","Switzerland":"84669.2929367996","Australia":"67652.6832146189","Denmark":"60361.7387715794","Sweden":"60283.24522267","United States":"52660.2951049798","Canada":"52266.1756761394","Netherlands":"51425.0789882648","Finland":"49638.0771298139","Belgium":"46622.4679873931","Germany":"45600.7745095204","France":"42571.1979897409","United Kingdom":"42294.8901157814","Japan":"38549.6780060974","European Union":"35402.4915235558","Italy":"35367.6030486724","Spain":"29370.6638674201","South Korea":"25997.8810547699","Saudi Arabia":"24646.0208730264","Greece":"21842.7033068901","Portugal":"21618.7353389663","Russian Federation":"15543.6978380394","Poland":"13776.4547643996","Argentina":"13027.2048221392","Brazil":"12071.7779871352","Turkey":"10800.3579763053","World":"10641.2498170593","Mexico":"10197.4445635608","China":"6991.85386564447","South Africa":"6881.79474218603","Indonesia":"3631.67269360347","Egypt":"3264.45006267526","India":"1456.20162816791","Pakistan":"1275.71274958523","Afghanistan":"653.347488111011"},"previous_year3":{"Norway":"101563.702677597","Switzerland":"83208.68654235","Australia":"67646.1038529626","Denmark":"58125.3648186912","Sweden":"57134.0770682404","Canada":"52495.2884719937","United States":"51433.0470904727","Netherlands":"49474.705606422","Finland":"47415.5598711351","Japan":"46701.0080028836","Belgium":"44734.4523465803","Germany":"44010.9313869814","United Kingdom":"41294.5148008666","France":"40838.024436834","Italy":"34814.1243593936","European Union":"34150.5278543395","Spain":"28647.8352426892","Saudi Arabia":"24883.1897146534","South Korea":"24453.9719124644","Greece":"22242.681934771","Portugal":"20577.4026375899","Russian Federation":"15154.4722788295","Poland":"13142.0459946086","Argentina":"13040.306395228","Brazil":"12157.3082176473","Turkey":"10539.3703371146","World":"10490.7024459876","Mexico":"9720.56167412905","South Africa":"7590.0284383506","China":"6264.64387793993","Indonesia":"3700.52353809447","Egypt":"3226.13137881998","India":"1444.266597568","Pakistan":"1266.38075811451","Afghanistan":"690.842629014956"},"last_lustrum":{"Norway":"100575.117263444","Switzerland":"88002.6095703805","Australia":"62216.5471294133","Denmark":"61304.0612046553","Sweden":"59593.6847982389","Netherlands":"53537.2751512189","Canada":"52083.8262233942","Finland":"50787.5649828531","United States":"49781.8006563523","Belgium":"47699.8070518961","Japan":"46229.9723879442","Germany":"45936.0812598523","France":"43807.4759032413","United Kingdom":"41020.3769643089","Italy":"38332.3003680405","European Union":"36241.9183717417","Spain":"31832.2380807085","Greece":"25914.6815458943","South Korea":"24155.8298493082","Saudi Arabia":"23256.0956126438","Portugal":"23194.7409567701","Russian Federation":"14212.080885022","Poland":"13891.14168806","Brazil":"13039.1216499582","Argentina":"12800.2018563295","Turkey":"10538.4351203671","World":"10392.3314925321","Mexico":"9730.277761437","South Africa":"8081.41717532479","China":"5574.18709336902","Indonesia":"3647.62662181143","Egypt":"2816.66694347778","India":"1455.66677851326","Pakistan":"1230.81542756809","Afghanistan":"622.379654358451"},"last_decade":{"Norway":"74114.697150083","Switzerland":"57348.9278823975","Denmark":"52041.0029728889","United States":"46437.0671173065","Sweden":"46256.4716010495","Netherlands":"44453.9711946212","United Kingdom":"42534.3062613449","Finland":"41120.6765061581","Canada":"40386.6994835116","Belgium":"38852.3610339939","France":"36544.5085344191","Germany":"36447.8723183195","Australia":"36084.8589777475","Japan":"34075.9789494111","Italy":"33410.7482014867","European Union":"30708.5201339901","Spain":"28482.6094833461","Greece":"24801.1578065035","South Korea":"20917.0302377023","Portugal":"19821.4446268632","Saudi Arabia":"14826.9166983811","Poland":"8999.73962660636","Mexico":"8666.33535331064","World":"7740.33246882947","Turkey":"7727.27240453727","Russian Federation":"6920.19439783608","Argentina":"5904.67813228342","Brazil":"5808.34054715979","South Africa":"5668.38677090783","China":"2082.18336250102","Indonesia":"1590.17790597325","Egypt":"1409.17787522982","Pakistan":"876.95110885413","India":"816.733776198889","Afghanistan":"280.245644106914"},"last_2decade":{"Switzerland":"46610.0597512362","Japan":"37422.8641429074","Norway":"37321.4433901355","Denmark":"35650.7243420099","Sweden":"32587.2641044641","Germany":"30564.2478058387","United States":"30068.2309182833","Netherlands":"28698.6660159512","Belgium":"27701.8519735545","France":"27015.2589591084","Finland":"25777.6412996396","Italy":"23020.0991388792","United Kingdom":"22462.5094323584","Australia":"21917.7192180061","Canada":"21183.2200827089","European Union":"20090.4198327145","Spain":"16236.7716792911","Greece":"13749.1151520996","South Korea":"13254.6374001395","Portugal":"12185.0638930534","Saudi Arabia":"8159.9806741278","Argentina":"7683.57384790824","World":"5411.50028410375","Brazil":"5144.64365955867","Mexico":"4131.80570593217","Poland":"4066.84202921958","South Africa":"3690.17847905164","Turkey":"3052.49811884532","Russian Federation":"2643.89769649787","Indonesia":"1137.26564794368","Egypt":"1063.43341585838","China":"707.029771302305","Pakistan":"503.749451985561","India":"408.241774685944","Afghanistan":null}}},"inflation":{"indicator":"inflation","indicator_sf":"inflation","last_year":2015,"previous_year":2014,"previous_year2":2013,"previous_year3":2012,"last_lustrum":2011,"last_decade":2006,"last_2decade":1996,"data_source":"wb","data":{"last_year":{"Afghanistan":"-1.53384658328173","Argentina":null,"Australia":"1.5083667216592","Belgium":"0.560593980466415","Brazil":"9.02723977356148","Canada":"1.12524136094334","Switzerland":"-1.14391506884691","China":"1.44255538382248","Germany":"0.234429944519196","Denmark":"0.452034153691609","Egypt":"10.3574896480911","Spain":"-0.501190518268432","European Union":"-0.0585336103604789","Finland":"-0.2071643707866","France":"0.0378037334443199","United Kingdom":"0.0500208420171881","Greece":"-1.73590236566741","Indonesia":"6.3631211311561","India":"5.87242659466756","Italy":"0.0387867504463516","Japan":"0.786380218889009","South Korea":"0.7061628760088","Mexico":"2.72064126256974","Netherlands":"0.600248147278815","Norway":"2.1736483195324","Pakistan":"2.53951590878071","Poland":"-0.991300366300363","Portugal":"0.487271927236811","Russian Federation":"15.5253283302064","Saudi Arabia":"2.18463706835827","Sweden":"-0.0467847449833748","Turkey":"7.6708536484588","United States":"0.118627135552317","World":"1.43914561309002","South Africa":"4.58827104223609"},"previous_year":{"Afghanistan":"4.60433400900534","Argentina":null,"Australia":"2.48792270531402","Belgium":"0.340000000000007","Brazil":"6.33209234205231","Canada":"1.90663590717818","Switzerland":"-0.0131860440706863","China":"1.99684708355259","Germany":"0.906797035167657","Denmark":"0.564020540449505","Egypt":"10.1458005507475","Spain":"-0.147031810368282","European Union":"0.220566200354005","Finland":"1.04120000617985","France":"0.507700672785821","United Kingdom":"1.46019160885392","Greece":"-1.31224241067529","Indonesia":"6.39492540819923","India":"6.35319454414932","Italy":"0.241057542767966","Japan":"2.74885464389837","South Korea":"1.27240642704561","Mexico":"4.01861720191058","Netherlands":"0.976035079699608","Norway":"2.02509628525307","Pakistan":"7.19167116470147","Poland":"0.106951871658061","Portugal":"-0.278153367467859","Russian Federation":"7.81289506953224","Saudi Arabia":"2.67052555416665","Sweden":"-0.179638494114759","Turkey":"8.85457271364333","United States":"1.62222297740851","World":"2.66086052673185","South Africa":"6.37525900888742"},"previous_year2":{"Afghanistan":"7.6543165673232","Argentina":"10.6194330100695","Australia":"2.44988864142539","Belgium":"1.11393855643004","Brazil":"6.20189961255349","Canada":"0.938291897815499","Switzerland":"-0.2173196618342","China":"2.62711864406717","Germany":"1.50472226668734","Denmark":"0.789071780078061","Egypt":"9.42157654022033","Spain":"1.4086282854704","European Union":"1.38768994636635","Finland":"1.47828813293557","France":"0.863606929999857","United Kingdom":"2.55454668654317","Greece":"-0.921271918055054","Indonesia":"6.41338677822315","India":"10.9076433121022","Italy":"1.21999212908335","Japan":"0.359471660257854","South Korea":"1.30786601430184","Mexico":"3.80638982343198","Netherlands":"2.50689852657885","Norway":"2.13170917396269","Pakistan":"7.6895036551002","Poland":"1.03426983636865","Portugal":"0.274416666667","Russian Federation":"6.77645788336934","Saudi Arabia":"3.50626361655801","Sweden":"-0.0442929701484368","Turkey":"7.49309030547683","United States":"1.46483265562683","World":"2.70270270270271","South Africa":"5.44527948193558"},"previous_year3":{"Afghanistan":"7.21825776057512","Argentina":"10.0302590249304","Australia":"1.76278015613196","Belgium":"2.83966343445893","Brazil":"5.40196474982358","Canada":"1.5156782312455","Switzerland":"-0.692544620825857","China":"2.62492093611669","Germany":"2.00849118223384","Denmark":"2.39791485664639","Egypt":"7.11815561959625","Spain":"2.44591462840482","European Union":"2.71876904402473","Finland":"2.80833232604085","France":"1.95568550044072","United Kingdom":"2.82170974709121","Greece":"1.50151979452967","Indonesia":"4.2795119590945","India":"9.31244560487363","Italy":"3.04136253041364","Japan":"-0.033428046130773","South Korea":"2.19230769230769","Mexico":"4.11150854557474","Netherlands":"2.45554765291609","Norway":"0.709219858156017","Pakistan":"9.68505340962508","Poland":"3.55686995444071","Portugal":"2.77333854051581","Russian Federation":"5.07801418439715","Saudi Arabia":"2.88596245446876","Sweden":"0.888377506923492","Turkey":"8.89156996512183","United States":"2.0693372652606","World":"3.85216033315955","South Africa":"5.65358300324086"},"last_lustrum":{"Afghanistan":"10.2016601415825","Argentina":"9.46568627451001","Australia":"3.30385015608742","Belgium":"3.53208210722741","Brazil":"6.63619865692984","Canada":"2.91213508872295","Switzerland":"0.231346209987862","China":"5.41085005784499","Germany":"2.07517293107789","Denmark":"2.75868226051246","Egypt":"10.0539169045357","Spain":"3.19624297191142","European Union":"3.3096597846384","Finland":"3.41680903370978","France":"2.11748680870384","United Kingdom":"4.48423964475475","Greece":"3.32987017363469","Indonesia":"5.35749960388808","India":"8.85784529680106","Italy":"2.74143821348254","Japan":"-0.283333333333303","South Korea":"4","Mexico":"3.40737961671249","Netherlands":"2.34107017751366","Norway":"1.30097087378643","Pakistan":"11.9167694652057","Poland":"4.25833333333301","Portugal":"3.6530110043073","Russian Federation":"8.4281759458628","Saudi Arabia":"5.82359105588522","Sweden":"2.96115073822149","Turkey":"6.47187967115079","United States":"3.15684156862221","World":"4.99551018479139","South Africa":"4.99551018479139"},"last_decade":{"Afghanistan":"7.25489556090272","Argentina":"10.9011245348844","Australia":"3.53848733858798","Belgium":"1.79094071005309","Brazil":"4.18368053152467","Canada":"2.00202539534157","Switzerland":"1.05877758998626","China":"1.46318904320046","Germany":"1.57742924103114","Denmark":"1.89007333484537","Egypt":"7.64452644526446","Spain":"3.51580473658775","European Union":"2.60196916518754","Finland":"1.56666666666664","France":"1.6837264500819","United Kingdom":"2.3335277939828","Greece":"3.1959459698068","Indonesia":"13.1094152835923","India":"6.1455223880597","Italy":"2.06978661049542","Japan":"0.240663900414279","South Korea":"2.24172558306922","Mexico":"3.62946322575935","Netherlands":"1.16765305950397","Norway":"2.3321503585138","Pakistan":"7.92108440058785","Poland":"1.11494394480717","Portugal":"2.74331509593894","Russian Federation":"9.68710888610764","Saudi Arabia":"2.207346665551","Sweden":"1.36021468627677","Turkey":"9.59724212288414","United States":"3.22594410070408","World":"4.48692235999473","South Africa":"4.64162489421264"},"last_2decade":{"Afghanistan":null,"Argentina":"0.155695900742301","Australia":"2.61241970021413","Belgium":"2.05891932722997","Brazil":"15.7574360967243","Canada":"1.57053112507139","Switzerland":"0.818824340630962","China":"8.32401506091792","Germany":"1.44606103619587","Denmark":"2.11136023916288","Egypt":"7.18710369720018","Spain":"3.5585065811347","European Union":"3.33960207441314","Finland":"0.616615282060184","France":"2.00477822790072","United Kingdom":"2.48110098856377","Greece":"8.1962194841968","Indonesia":"7.96848016949892","India":"8.9771490750816","Italy":"3.97452428385338","Japan":"0.131871754719204","South Korea":"4.92342922570487","Mexico":"34.3776581888577","Netherlands":"2.01666666666699","Norway":"1.25869418891632","Pakistan":"10.3738085885004","Poland":"19.8172212329473","Portugal":"3.12069756769158","Russian Federation":"47.7416666666667","Saudi Arabia":"1.22206956395951","Sweden":"0.470973017170886","Turkey":"80.3469027803627","United States":"2.93120419993459","World":"6.95008597032137","South Africa":"7.35412590631834"}}},"laborforce":{"indicator":"laborforce","indicator_sf":"labor force (% of population)","last_year":2015,"previous_year":2014,"previous_year2":2013,"previous_year3":2012,"last_lustrum":2011,"last_decade":2006,"last_2decade":1996,"data_source":"wb","data":{"last_year":{"Afghanistan":null,"Argentina":null,"Australia":null,"Belgium":null,"Brazil":null,"Canada":null,"Switzerland":null,"China":null,"Germany":null,"Denmark":null,"Egypt":null,"Spain":null,"European Union":null,"Finland":null,"France":null,"United Kingdom":null,"Greece":null,"Indonesia":null,"India":null,"Italy":null,"Japan":null,"South Korea":null,"Mexico":null,"Netherlands":null,"Norway":null,"Pakistan":null,"Poland":null,"Portugal":null,"Russian Federation":null,"Saudi Arabia":null,"Sweden":null,"Turkey":null,"United States":null,"World":null,"South Africa":null},"previous_year":{"Afghanistan":"47.7999992370605","Argentina":"60.9000015258789","Australia":"65.0999984741211","Belgium":"53.2999992370605","Brazil":"69.6999969482422","Canada":"66.0999984741211","Switzerland":"68.0999984741211","China":"71.4000015258789","Germany":"59.9000015258789","Denmark":"62.4000015258789","Egypt":"49.2999992370605","Spain":"59","European Union":"57.5272201216252","Finland":"59.4000015258789","France":"55.7000007629395","United Kingdom":"62.0999984741211","Greece":"53.0999984741211","Indonesia":"67.6999969482422","India":"54.2000007629395","Italy":"49.2000007629395","Japan":"59","South Korea":"61","Mexico":"61.5999984741211","Netherlands":"64.1999969482422","Norway":"64.8000030517578","Pakistan":"54.5","Poland":"56.5","Portugal":"60.2999992370605","Russian Federation":"63.7999992370605","Saudi Arabia":"55.2000007629395","Sweden":"64","Turkey":"49.4000015258789","United States":"62.4000015258789","World":"63.4945166822987","South Africa":"52.5"},"previous_year2":{"Afghanistan":"47.9000015258789","Argentina":"60.7999992370605","Australia":"65.1999969482422","Belgium":"53.2999992370605","Brazil":"69.8000030517578","Canada":"66.1999969482422","Switzerland":"68.1999969482422","China":"71.3000030517578","Germany":"59.9000015258789","Denmark":"62.5","Egypt":"49.0999984741211","Spain":"59","European Union":"57.5512071623515","Finland":"59.7999992370605","France":"55.9000015258789","United Kingdom":"62.0999984741211","Greece":"53.2000007629395","Indonesia":"67.6999969482422","India":"54.2000007629395","Italy":"49.0999984741211","Japan":"59.2000007629395","South Korea":"61","Mexico":"61.5999984741211","Netherlands":"64.4000015258789","Norway":"64.9000015258789","Pakistan":"54.4000015258789","Poland":"56.5","Portugal":"60.2999992370605","Russian Federation":"63.7000007629395","Saudi Arabia":"54.9000015258789","Sweden":"64.0999984741211","Turkey":"49.4000015258789","United States":"62.5","World":"63.4571075672245","South Africa":"52.0999984741211"},"previous_year3":{"Afghanistan":"47.9000015258789","Argentina":"60.7000007629395","Australia":"65.3000030517578","Belgium":"53","Brazil":"69.9000015258789","Canada":"66.3000030517578","Switzerland":"68.0999984741211","China":"71.0999984741211","Germany":"59.7999992370605","Denmark":"63.2999992370605","Egypt":"49","Spain":"59.4000015258789","European Union":"57.5791136701505","Finland":"60.0999984741211","France":"56.0999984741211","United Kingdom":"62.0999984741211","Greece":"53.2000007629395","Indonesia":"67.8000030517578","India":"54.0999984741211","Italy":"49","Japan":"58.9000015258789","South Korea":"60.7999992370605","Mexico":"61.5999984741211","Netherlands":"64.6999969482422","Norway":"65.5","Pakistan":"54.2000007629395","Poland":"56.5","Portugal":"61.0999984741211","Russian Federation":"63.5","Saudi Arabia":"52.2000007629395","Sweden":"64.0999984741211","Turkey":"49.4000015258789","United States":"62.9000015258789","World":"63.377431631036","South Africa":"51.7999992370605"},"last_lustrum":{"Afghanistan":"48","Argentina":"60.5999984741211","Australia":"65.5999984741211","Belgium":"53","Brazil":"69.9000015258789","Canada":"66.4000015258789","Switzerland":"68.0999984741211","China":"71","Germany":"59.9000015258789","Denmark":"64","Egypt":"48.7999992370605","Spain":"59.2999992370605","European Union":"57.3422861039762","Finland":"60.2999992370605","France":"56","United Kingdom":"61.9000015258789","Greece":"53.4000015258789","Indonesia":"67.8000030517578","India":"54.7999992370605","Italy":"48.0999984741211","Japan":"59.0999984741211","South Korea":"60.5","Mexico":"60.2999992370605","Netherlands":"64.3000030517578","Norway":"65.4000015258789","Pakistan":"54.0999984741211","Poland":"56.0999984741211","Portugal":"61.2999992370605","Russian Federation":"63.4000015258789","Saudi Arabia":"51.7999992370605","Sweden":"63.9000015258789","Turkey":"49.5","United States":"63","World":"63.4000748220933","South Africa":"51.2999992370605"},"last_decade":{"Afghanistan":"47.9000015258789","Argentina":"62.0999984741211","Australia":"64.9000015258789","Belgium":"53","Brazil":"69.9000015258789","Canada":"66.5999984741211","Switzerland":"67.4000015258789","China":"72.5999984741211","Germany":"58.7999992370605","Denmark":"66.3000030517578","Egypt":"46.7000007629395","Spain":"57.5999984741211","European Union":"57.0503289815813","Finland":"61.5","France":"55.7999992370605","United Kingdom":"62.4000015258789","Greece":"53.5","Indonesia":"67.6999969482422","India":"59.7000007629395","Italy":"49","Japan":"60.4000015258789","South Korea":"61.4000015258789","Mexico":"60.7000007629395","Netherlands":"64.8000030517578","Norway":"65.4000015258789","Pakistan":"53.5999984741211","Poland":"54.0999984741211","Portugal":"62.4000015258789","Russian Federation":"62.0999984741211","Saudi Arabia":"51","Sweden":"63.9000015258789","Turkey":"45.9000015258789","United States":"65.0999984741211","World":"64.5186991478093","South Africa":"54.7999992370605"},"last_2decade":{"Afghanistan":"48.4000015258789","Argentina":"57.9000015258789","Australia":"63.5999984741211","Belgium":"50.4000015258789","Brazil":"67.1999969482422","Canada":"64.1999969482422","Switzerland":"67.5999984741211","China":"78.4000015258789","Germany":"58.2999992370605","Denmark":"65.4000015258789","Egypt":"46.0999984741211","Spain":"50.9000015258789","European Union":"56.2942312986894","Finland":"60.7000007629395","France":"55.5999984741211","United Kingdom":"61.5","Greece":"51.7000007629395","Indonesia":"67.5999984741211","India":"60.2999992370605","Italy":"47.2000007629395","Japan":"63.5999984741211","South Korea":"62.0999984741211","Mexico":"59.4000015258789","Netherlands":"59.0999984741211","Norway":"64.0999984741211","Pakistan":"49.7000007629395","Poland":"57.7999992370605","Portugal":"58.5999984741211","Russian Federation":"59.4000015258789","Saudi Arabia":"51.7000007629395","Sweden":"63.0999984741211","Turkey":"53","United States":"65.9000015258789","World":"65.7756292675022","South Africa":"55.4000015258789"}}},"lifeexpect":{"indicator":"lifeexpect","indicator_sf":"life expectancy (years)","last_year":2015,"previous_year":2014,"previous_year2":2013,"previous_year3":2012,"last_lustrum":2011,"last_decade":2006,"last_2decade":1996,"data_source":"wb","data":{"last_year":{"Afghanistan":null,"Argentina":null,"Australia":null,"Belgium":null,"Brazil":null,"Canada":null,"Switzerland":null,"China":null,"Germany":null,"Denmark":null,"Egypt":null,"Spain":null,"European Union":null,"Finland":null,"France":null,"United Kingdom":null,"Greece":null,"Indonesia":null,"India":null,"Italy":null,"Japan":null,"South Korea":null,"Mexico":null,"Netherlands":null,"Norway":null,"Pakistan":null,"Poland":null,"Portugal":null,"Russian Federation":null,"Saudi Arabia":null,"Sweden":null,"Turkey":null,"United States":null,"World":null,"South Africa":null},"previous_year":{"Afghanistan":"60.3744634146342","Argentina":"76.1586097560976","Australia":"82.2512195121951","Belgium":"80.5878048780488","Brazil":"74.4018780487805","Canada":"81.9566097560976","Switzerland":"82.8487804878049","China":"75.7822682926829","Germany":"80.8439024390244","Denmark":"80.5487804878049","Egypt":"71.1217073170732","Spain":"83.0780487804878","European Union":"80.6738136414","Finland":"81.1292682926829","France":"82.3731707317073","United Kingdom":"81.0560975609756","Greece":"81.2853658536585","Indonesia":"68.8884878048781","India":"68.0138048780488","Italy":"82.690243902439","Japan":"83.5878048780488","South Korea":"82.1558536585366","Mexico":"76.7218536585366","Netherlands":"81.3048780487805","Norway":"81.7512195121951","Pakistan":"66.1833658536585","Poland":"77.2536585365854","Portugal":"80.7219512195122","Russian Federation":"70.3658536585366","Saudi Arabia":"74.3372195121951","Sweden":"81.9560975609756","Turkey":"75.163512195122","United States":"78.9414634146341","World":"71.4549981566129","South Africa":"57.1821219512195"},"previous_year2":{"Afghanistan":"60.0282682926829","Argentina":"75.9860975609756","Australia":"82.1487804878049","Belgium":"80.5878048780488","Brazil":"74.1224390243903","Canada":"81.7650487804878","Switzerland":"82.7975609756098","China":"75.5851463414634","Germany":"80.8439024390244","Denmark":"80.3","Egypt":"70.9257804878049","Spain":"83.0780487804878","European Union":"80.5895336429721","Finland":"80.9756097560976","France":"82.219512195122","United Kingdom":"81.0048780487805","Greece":"81.2853658536585","Indonesia":"68.7046097560976","India":"67.6604146341463","Italy":"82.690243902439","Japan":"83.3319512195122","South Korea":"81.7051219512195","Mexico":"76.5326585365854","Netherlands":"81.3048780487805","Norway":"81.7512195121951","Pakistan":"65.9636829268293","Poland":"77","Portugal":"80.7219512195122","Russian Federation":"70.3658536585366","Saudi Arabia":"74.1776341463415","Sweden":"81.9560975609756","Turkey":"74.9007073170732","United States":"78.8414634146341","World":"71.243252170123","South Africa":"56.7365853658537"},"previous_year3":{"Afghanistan":"59.6796097560976","Argentina":"75.816243902439","Australia":"82.0463414634146","Belgium":"80.3853658536585","Brazil":"73.8395853658537","Canada":"81.5624390243903","Switzerland":"82.6975609756098","China":"75.3929268292683","Germany":"80.8926829268293","Denmark":"80.0512195121951","Egypt":"70.7291463414634","Spain":"82.4268292682927","European Union":"80.3078602965072","Finland":"80.6268292682927","France":"81.9682926829268","United Kingdom":"80.9048780487805","Greece":"80.6341463414634","Indonesia":"68.5195609756098","India":"67.2898780487805","Italy":"82.2390243902439","Japan":"83.0960975609756","South Korea":"81.2134146341464","Mexico":"76.3540975609756","Netherlands":"81.1048780487805","Norway":"81.4512195121951","Pakistan":"65.7168780487805","Poland":"76.7463414634146","Portugal":"80.3731707317073","Russian Federation":"70.3658536585366","Saudi Arabia":"74.0160243902439","Sweden":"81.7048780487805","Turkey":"74.6368048780488","United States":"78.7414634146342","World":"71.0049775062799","South Africa":"56.0983170731707"},"last_lustrum":{"Afghanistan":"59.3279512195122","Argentina":"75.6490487804878","Australia":"81.8951219512195","Belgium":"80.5853658536585","Brazil":"73.5523414634146","Canada":"81.3492926829268","Switzerland":"82.6951219512195","China":"75.2021707317073","Germany":"80.7414634146342","Denmark":"79.8","Egypt":"70.5333170731707","Spain":"82.4756097560976","European Union":"80.2896981674923","Finland":"80.4707317073171","France":"82.1146341463415","United Kingdom":"80.9512195121951","Greece":"80.7317073170732","Indonesia":"68.3343902439024","India":"66.9041707317073","Italy":"82.1878048780488","Japan":"82.5912195121951","South Korea":"80.9670731707317","Mexico":"76.1856585365854","Netherlands":"81.2048780487805","Norway":"81.2951219512195","Pakistan":"65.447","Poland":"76.6951219512195","Portugal":"80.4707317073171","Russian Federation":"69.6585365853659","Saudi Arabia":"73.8548536585366","Sweden":"81.8024390243903","Turkey":"74.3673414634146","United States":"78.6414634146341","World":"70.764917994639","South Africa":"55.2956585365854"},"last_decade":{"Afghanistan":"57.4325609756098","Argentina":"74.8499024390244","Australia":"81.0414634146342","Belgium":"79.380487804878","Brazil":"72.1317317073171","Canada":"80.4187804878049","Switzerland":"81.490243902439","China":"74.0717073170732","Germany":"79.1317073170732","Denmark":"78.0951219512195","Egypt":"69.6031951219512","Spain":"80.8219512195122","European Union":"78.7377506814038","Finland":"79.2146341463415","France":"80.8121951219512","United Kingdom":"79.2487804878049","Greece":"79.4390243902439","Indonesia":"67.3674878048781","India":"64.9080975609756","Italy":"81.2829268292683","Japan":"82.3219512195122","South Korea":"78.9692682926829","Mexico":"75.4387804878049","Netherlands":"79.6975609756098","Norway":"80.3439024390244","Pakistan":"64.0993902439024","Poland":"75.1439024390244","Portugal":"78.419512195122","Russian Federation":"66.6431707317073","Saudi Arabia":"73.2581707317073","Sweden":"80.7487804878049","Turkey":"72.8285853658537","United States":"77.6878048780488","World":"69.3390709741998","South Africa":"51.6137073170732"},"last_2decade":{"Afghanistan":"53.6020487804878","Argentina":"72.8873414634146","Australia":"78.0780487804878","Belgium":"77.1873170731707","Brazil":"68.1097317073171","Canada":"78.2304878048781","Switzerland":"78.8960975609756","China":"70.1998292682927","Germany":"76.6731707317073","Denmark":"75.5914634146342","Egypt":"67.2320975609756","Spain":"78.1204878048781","European Union":"76.0655494161561","Finland":"76.6934146341464","France":"77.9536585365854","United Kingdom":"77.0878048780488","Greece":"77.6853658536585","Indonesia":"65.3058292682927","India":"60.9156097560976","Italy":"78.5219512195122","Japan":"80.200243902439","South Korea":"73.8312195121951","Mexico":"73.0989024390244","Netherlands":"77.4356097560976","Norway":"78.1504878048781","Pakistan":"61.7479512195122","Poland":"72.2463414634146","Portugal":"75.2609756097561","Russian Federation":"66.1941463414634","Saudi Arabia":"71.4432926829268","Sweden":"78.9590243902439","Turkey":"67.5862195121951","United States":"76.0268292682927","World":"66.5646362304982","South Africa":"60.6054634146341"}}},"pop65":{"indicator":"pop65","indicator_sf":"population % aged >65","last_year":2015,"previous_year":2014,"previous_year2":2013,"previous_year3":2012,"last_lustrum":2011,"last_decade":2006,"last_2decade":1996,"data_source":"wb","data":{"last_year":{"Afghanistan":"2.46908972426905","Argentina":"10.9265535851309","Australia":"15.0448748888824","Belgium":"18.2248164293518","Brazil":"7.84467496770036","Canada":"16.1357784616535","Switzerland":"18.0418460178465","China":"9.55120656634957","Germany":"21.2406519413629","Denmark":"18.9594398104384","Egypt":"5.22026119572125","Spain":"18.7894661035796","European Union":"19.1928923427408","Finland":"20.4771837047151","France":"19.1205109623995","United Kingdom":"17.7603695294859","Greece":"21.396558181815","Indonesia":"5.17372908147055","India":"5.61611017147319","Italy":"22.4098759007142","Japan":"26.3420131425476","South Korea":"13.1269190003094","Mexico":"6.46698907543437","Netherlands":"18.2304693863117","Norway":"16.3329186310334","Pakistan":"4.49238092385866","Poland":"15.5333238336452","Portugal":"20.7914682047571","Russian Federation":"13.3658426985027","Saudi Arabia":"2.86230612625622","Sweden":"19.9420190919181","Turkey":"7.53869755140193","United States":"14.7860692786228","World":"8.26669140126872","South Africa":"5.03336128565458"},"previous_year":{"Afghanistan":"2.43468454325801","Argentina":"10.8089836893072","Australia":"14.7242740805711","Belgium":"18.0048461107743","Brazil":"7.57532620019252","Canada":"15.6909477359273","Switzerland":"17.8373971838849","China":"9.18268084838188","Germany":"21.070280975949","Denmark":"18.4990735623216","Egypt":"5.17090205846929","Spain":"18.4415918160846","European Union":"18.8413064069213","Finland":"19.8080902829738","France":"18.6690889318142","United Kingdom":"17.4985778317594","Greece":"20.8689440754957","Indonesia":"5.10861501684987","India":"5.48830449671205","Italy":"22.0141920876075","Japan":"25.7054221977529","South Korea":"12.6763034070043","Mexico":"6.30848223499061","Netherlands":"17.7076918334221","Norway":"16.033698720078","Pakistan":"4.4909308899168","Poland":"15.018130255603","Portugal":"20.3677383066488","Russian Federation":"13.2313586817099","Saudi Arabia":"2.79464731325567","Sweden":"19.6316243418311","Turkey":"7.38828835350513","United States":"14.3897106161988","World":"8.10290487771328","South Africa":"5.02803328737243"},"previous_year2":{"Afghanistan":"2.39441375376844","Argentina":"10.6998318503718","Australia":"14.37815703296","Belgium":"17.7501241356456","Brazil":"7.32897515887361","Canada":"15.2468171713849","Switzerland":"17.5987123091709","China":"8.88928751468627","Germany":"20.951761441487","Denmark":"17.9746147649136","Egypt":"5.11109714326295","Spain":"18.0898192091157","European Union":"18.4816878347675","Finland":"19.0499427752596","France":"18.1830928692418","United Kingdom":"17.1551822454978","Greece":"20.3184140913694","Indonesia":"5.06172295304005","India":"5.38140684600555","Italy":"21.5880087454983","Japan":"25.0093263010257","South Korea":"12.2470076086797","Mexico":"6.18056349053321","Netherlands":"17.1415199465387","Norway":"15.6913120026754","Pakistan":"4.48262949921268","Poland":"14.5366112549936","Portugal":"19.9485339754923","Russian Federation":"13.1618650861356","Saudi Arabia":"2.76258597755422","Sweden":"19.2511372578031","Turkey":"7.2744230959637","United States":"13.9970054921467","World":"7.96269501917187","South Africa":"5.02704130844397"},"previous_year3":{"Afghanistan":"2.35081115180802","Argentina":"10.5980692726567","Australia":"14.034997899515","Belgium":"17.5019930915786","Brazil":"7.10177594262306","Canada":"14.8268085680827","Switzerland":"17.3485795427633","China":"8.65420482519149","Germany":"20.864925837079","Denmark":"17.4565057636425","Egypt":"5.0433615560107","Spain":"17.7489792350216","European Union":"18.1185981821503","Finland":"18.2850524384642","France":"17.7193241135186","United Kingdom":"16.7742949190709","Greece":"19.7955167312921","Indonesia":"5.02539142684806","India":"5.28980200034704","Italy":"21.1636862520206","Japan":"24.2867873787552","South Korea":"11.8371847570891","Mexico":"6.07584950402988","Netherlands":"16.564387875375","Norway":"15.3701393301845","Pakistan":"4.46714831716551","Poland":"14.1078127794812","Portugal":"19.5393330832782","Russian Federation":"13.1264564421011","Saudi Arabia":"2.7575627337453","Sweden":"18.8530424562085","Turkey":"7.18740071284942","United States":"13.6235403068426","World":"7.83677283295553","South Africa":"5.02899903579431"},"last_lustrum":{"Afghanistan":"2.30968149825366","Argentina":"10.5005529146418","Australia":"13.734007837951","Belgium":"17.3036957613123","Brazil":"6.88606142391981","Canada":"14.4583760448036","Switzerland":"17.114143369267","China":"8.44642884568832","Germany":"20.7626105747534","Denmark":"17.0138958002373","Egypt":"4.97568650762952","Spain":"17.4380088569144","European Union":"17.8106646909573","Finland":"17.6256566198699","France":"17.3274843897203","United Kingdom":"16.4316114622368","Greece":"19.3551681437369","Indonesia":"4.98642296595114","India":"5.20313628226433","Italy":"20.7772624447601","Japan":"23.5872887769159","South Korea":"11.4500603079315","Mexico":"5.97907182047553","Netherlands":"16.0247810302577","Norway":"15.1374510617296","Pakistan":"4.44771788792939","Poland":"13.7557422139177","Portugal":"19.1496488889146","Russian Federation":"13.1013697533569","Saudi Arabia":"2.76416872634771","Sweden":"18.4955178162892","Turkey":"7.1108285944522","United States":"13.2907766221524","World":"7.72926674013201","South Africa":"5.03631008908735"},"last_decade":{"Afghanistan":"2.19700785610009","Argentina":"10.1577425980346","Australia":"12.9793963261981","Belgium":"17.1744592190844","Brazil":"6.01326626814559","Canada":"13.2538505817407","Switzerland":"15.9762480654229","China":"7.6323937272518","Germany":"19.2988212185012","Denmark":"15.3771870363645","Egypt":"5.00347528659233","Spain":"16.6823372062722","European Union":"16.8789404155846","Finland":"16.1467360346333","France":"16.6684247689632","United Kingdom":"16.0094016621915","Greece":"18.642885899098","Indonesia":"4.86275689709304","India":"4.85475301293907","Italy":"19.6731191479833","Japan":"20.3935742299682","South Korea":"9.56603513578855","Mexico":"5.43499167021726","Netherlands":"14.265508330079","Norway":"14.7110896369377","Pakistan":"4.30890077954659","Poland":"13.316231085703","Portugal":"17.453360932982","Russian Federation":"13.8106076482349","Saudi Arabia":"2.82523276756084","Sweden":"17.3592431858656","Turkey":"6.645499659332","United States":"12.3905071582908","World":"7.34952679146026","South Africa":"4.74500337104628"},"last_2decade":{"Afghanistan":"2.31721561852898","Argentina":"9.64780232505187","Australia":"12.0014804834936","Belgium":"16.2090379876362","Brazil":"4.6031262984666","Canada":"12.0574086295027","Switzerland":"14.7988712727701","China":"6.02369436942944","Germany":"15.5856866721618","Denmark":"15.2075895495247","Egypt":"4.97243607732852","Spain":"15.3976286345647","European Union":"14.9372087384481","Finland":"14.3671670482817","France":"15.3294239728141","United Kingdom":"15.861664156479","Greece":"15.6780941807263","Indonesia":"4.26625139429284","India":"4.14385637538834","Italy":"16.819484008819","Japan":"14.9406389209257","South Korea":"6.1397263694415","Mexico":"4.7078763727532","Netherlands":"13.2044034961365","Norway":"15.8167749708102","Pakistan":"4.01478385622337","Poland":"11.3276368480945","Portugal":"15.2312182280902","Russian Federation":"12.3222425046523","Saudi Arabia":"2.89872735480797","Sweden":"17.4144294202332","Turkey":"5.2964477524936","United States":"12.54821524623","World":"6.54204810114461","South Africa":"3.50908415157127"}}},"popdensity":{"indicator":"popdensity","indicator_sf":"population per km2","last_year":2015,"previous_year":2014,"previous_year2":2013,"previous_year3":2012,"last_lustrum":2011,"last_decade":2006,"last_2decade":1996,"data_source":"wb","data":{"last_year":{"Afghanistan":"49.8216493582085","Argentina":"15.8646960379144","Australia":"3.09557931869362","Belgium":"372.712054161162","Brazil":"24.8676772583374","Canada":"3.94256717153222","Switzerland":"209.711914161352","China":"146.057646126616","Germany":"233.583362024445","Denmark":"133.773320763611","Egypt":"91.9263488874378","Spain":"92.7975630235301","European Union":"120.259798289831","Finland":"18.039464937971","France":"122.011744895965","United Kingdom":"269.244128466912","Greece":"83.9699922420481","Indonesia":"142.177125366395","India":"440.957532818286","Italy":"206.711378935201","Japan":"348.251239850779","South Korea":"519.330279276876","Mexico":"65.3397587386507","Netherlands":"503.015147015147","Norway":"14.2258511410149","Pakistan":"245.076891344956","Poland":"124.096188889977","Portugal":"112.976506550218","Russian Federation":"8.7988005033929","Saudi Arabia":"14.6720559708609","Sweden":"24.0557544066382","Turkey":"102.212530696568","United States":"35.137647555267","World":"56.6273687195715","South Africa":"45.3032506856421"},"previous_year":{"Afghanistan":"48.4445455380939","Argentina":"15.7051131110941","Australia":"3.05430483058459","Belgium":"370.911922060766","Brazil":"24.6559519223176","Canada":"3.90868410547742","Switzerland":"207.223630934305","China":"145.317355990401","Germany":"232.347793653526","Denmark":"133.006716945557","Egypt":"89.9891204982671","Spain":"92.9227364506907","European Union":"119.947479519526","Finland":"17.9720030274112","France":"121.441128503517","United Kingdom":"267.073781672385","Greece":"84.5028161365399","Indonesia":"140.460914013811","India":"435.657170581093","Italy":"206.667369279935","Japan":"348.726684222076","South Korea":"517.349178174953","Mexico":"64.5005442526814","Netherlands":"500.891238491238","Norway":"14.0651672165259","Pakistan":"240.042919779992","Poland":"124.136164723556","Portugal":"113.548711790393","Russian Federation":"8.78187156642264","Saudi Arabia":"14.3679065353609","Sweden":"23.8034811214219","Turkey":"100.728646232605","United States":"34.8630981194698","World":"55.965621247407","South Africa":"44.5627672640846"},"previous_year2":{"Afghanistan":"46.9970590938333","Argentina":"15.5437057174908","Australia":"3.00917082123843","Belgium":"369.313639365918","Brazil":"24.4383770791109","Canada":"3.86599882773538","Switzerland":"204.710648851098","China":"144.583456848168","Germany":"235.647997360418","Denmark":"132.334008955927","Egypt":"88.0143744035361","Spain":"93.2009456028468","European Union":"119.878144273997","Finland":"17.8978314521702","France":"120.484437236671","United Kingdom":"265.06934237176","Greece":"85.067579519007","Indonesia":"138.701941409937","India":"430.345478761869","Italy":"204.779859930645","Japan":"349.294000987492","South Korea":"515.253206246281","Mexico":"63.6539566346871","Netherlands":"499.09212949213","Norway":"13.907440211365","Pakistan":"235.046500103778","Poland":"124.229110740995","Portugal":"114.162609170306","Russian Federation":"8.76278012831512","Saudi Arabia":"14.0490261386526","Sweden":"23.5684661462169","Turkey":"99.0393292880995","United States":"34.5919827667255","World":"55.3128509975651","South Africa":"43.8485323777632"},"previous_year3":{"Afghanistan":"45.5331970100787","Argentina":"15.3818021040015","Australia":"2.95852205719641","Belgium":"367.51142668428","Brazil":"24.2161035828546","Canada":"3.82156900910649","Switzerland":"202.370204474137","China":"143.87139360204","Germany":"230.750625466231","Denmark":"131.783455102522","Egypt":"86.0524406047516","Spain":"93.5068371284061","European Union":"119.180344366336","Finland":"17.8155615518773","France":"119.913196885826","United Kingdom":"263.30054147894","Greece":"85.6866640806827","Indonesia":"136.918724090154","India":"424.994581241024","Italy":"202.419653906303","Japan":"349.905335198596","South Korea":"513.656302003082","Mexico":"62.7953203528897","Netherlands":"496.884994068802","Norway":"13.7402921326781","Pakistan":"230.116557700291","Poland":"124.300058781268","Portugal":"114.803406485424","Russian Federation":"8.74414195142295","Saudi Arabia":"13.7210700147463","Sweden":"23.3696027888251","Turkey":"97.2534685498226","United States":"34.3378376635161","World":"54.6450416986555","South Africa":"43.1595188134245"},"last_lustrum":{"Afghanistan":"44.1276337959134","Argentina":"15.2211671764065","Australia":"2.90798641031983","Belgium":"364.85284015852","Brazil":"23.9906945803731","Canada":"3.77662530749952","Switzerland":"200.23276647434","China":"143.172112343875","Germany":"234.673149529493","Denmark":"131.288522271977","Egypt":"84.1706102767592","Spain":"93.5078358806114","European Union":"119.200050789992","Finland":"17.7309947678436","France":"119.335112143576","United Kingdom":"261.47612119208","Greece":"86.1512723041117","Indonesia":"135.135961624447","India":"419.564848193355","Italy":"201.874784116407","Japan":"350.611778743948","South Korea":"511.976139051733","Mexico":"61.9178842048407","Netherlands":"495.049644128114","Norway":"13.561001519528","Pakistan":"225.287525944375","Poland":"124.296296901022","Portugal":"115.269789278306","Russian Federation":"8.72943779855369","Saudi Arabia":"13.3919020882081","Sweden":"23.027764780426","Turkey":"95.5225264087938","United States":"34.0772433101355","World":"54.0076018519263","South Africa":"42.4947514870962"},"last_decade":{"Afghanistan":"38.5742961737585","Argentina":"14.4549620161582","Australia":"2.69423219608711","Belgium":"348.347357992074","Brazil":"22.8158706362899","Canada":"3.58173081681331","Switzerland":"189.385176000202","China":"139.645342881819","Germany":"236.225197866483","Denmark":"128.146877209522","Egypt":"76.6229192827364","Spain":"88.9761493446631","European Union":"117.484474319093","Finland":"17.3169839860577","France":"116.19154205232","United Kingdom":"251.50589013351","Greece":"85.4954383242824","Indonesia":"126.555407740247","India":"390.855715578217","Italy":"197.674505337594","Japan":"350.765432098765","South Korea":"499.297543352601","Mexico":"57.2971820262867","Netherlands":"484.185456161137","Norway":"12.7604128735506","Pakistan":"203.046114829805","Poland":"124.514452206843","Portugal":"115.035399584563","Russian Federation":"8.73438752843799","Saudi Arabia":"11.8249580172025","Sweden":"22.1292221084954","Turkey":"89.2698062705456","United States":"32.5673998463204","World":"50.824537726109","South Africa":"39.503814491601"},"last_2decade":{"Afghanistan":"26.7772569923108","Argentina":"12.9425265558028","Australia":"2.38353097379691","Belgium":null,"Brazil":"19.7775049233442","Canada":"3.26297546272012","Switzerland":"178.907356810362","China":"129.688982907321","Germany":"234.652470709559","Denmark":"124.041338675465","Egypt":"63.8863117183183","Spain":"79.0449022905654","European Union":"115.109584625376","Finland":"16.8244952230868","France":"109.124923753484","United Kingdom":"240.428843053776","Greece":"82.3025601241272","Indonesia":"110.360965902504","India":"329.373646487443","Italy":"193.329981979531","Japan":"345.012345679012","South Korea":"471.953980924736","Mexico":"49.4774608400422","Netherlands":"460.026599526066","Norway":"11.9956084272201","Pakistan":"163.05735133873","Poland":"126.103921120507","Portugal":"109.988469945355","Russian Federation":"9.04630625547992","Saudi Arabia":"8.99260404988626","Sweden":"21.5455427206707","Turkey":"77.2468432883334","United States":"29.4131648134723","World":"44.6306645742767","South Africa":"32.9738494258464"}}},"popgrowth":{"indicator":"popgrowth","indicator_sf":"population growth (%)","last_year":2015,"previous_year":2014,"previous_year2":2013,"previous_year3":2012,"last_lustrum":2011,"last_decade":2006,"last_2decade":1996,"data_source":"wb","data":{"last_year":{"Afghanistan":"2.80298628268961","Argentina":"1.01099303655331","Australia":"1.34230521538215","Belgium":"0.484152118345574","Brazil":"0.855052949410704","Canada":"0.863130607208001","Switzerland":"1.1936198767308","China":"0.508136747291937","Germany":"0.530366450974923","Denmark":"0.574710112989708","Egypt":"2.12989211912798","Spain":"-0.134797807745048","European Union":"0.260379602436529","Finland":"0.374669477746381","France":"0.468770345078223","United Kingdom":"0.809355272673642","Greece":"-0.63253610615375","Indonesia":"1.21443840284205","India":"1.20929453040919","Italy":"0.021292655039706","Japan":"-0.136430273792572","South Korea":"0.382201749887462","Mexico":"1.29270519749327","Netherlands":"0.423129431870569","Norway":"1.1359481678125","Pakistan":"2.07542637608567","Poland":"-0.0322083993822133","Portugal":"-0.505203315904984","Russian Federation":"0.192585836711792","Saudi Arabia":"2.09477238316221","Sweden":"1.05424008112992","Turkey":"1.46240495099752","United States":"0.784422625629869","World":"1.18241780790602","South Africa":"1.64800933118317"},"previous_year":{"Afghanistan":"3.03347255254667","Argentina":"1.03305555285726","Australia":"1.48874492272964","Belgium":"0.431837337674369","Brazil":"0.886360083057745","Canada":"1.09806938773565","Switzerland":"1.22010397343287","China":"0.506311591779847","Germany":"-1.41037952718465","Denmark":"0.507053283010163","Egypt":"2.2188633037184","Spain":"-0.298951059088036","European Union":"0.0578381038082227","Finland":"0.413560207519414","France":"0.790901326087468","United Kingdom":"0.753349499398544","Greece":"-0.666113290031891","Indonesia":"1.26019335881402","India":"1.22673029572789","Italy":"0.917504095962437","Japan":"-0.162550165733791","South Korea":"0.40595970701192","Mexico":"1.32121763533464","Netherlands":"0.359828172726548","Norway":"1.12773667734928","Pakistan":"2.10343724180588","Poland":"-0.0748462292920506","Portugal":"-0.539190466792077","Russian Federation":"0.217632654954767","Saudi Arabia":"2.24439270805474","Sweden":"0.992219728591882","Turkey":"1.69131935172685","United States":"0.780696606482205","World":"1.1801421126447","South Africa":"1.61574465596681"},"previous_year2":{"Afghanistan":"3.16433627387256","Argentina":"1.04706505456002","Australia":"1.69747274985435","Belgium":"0.489184301296706","Brazil":"0.913687864138812","Canada":"1.15590039039348","Switzerland":"1.14987975781229","China":"0.49370963351136","Germany":"2.10015710103447","Denmark":"0.416901360752097","Egypt":"2.25432617430608","Spain":"-0.327669039579687","European Union":"0.584502341943846","Finland":"0.460723772785295","France":"0.474516613147779","United Kingdom":"0.669533807456598","Greece":"-0.725120806658085","Indonesia":"1.29398294440884","India":"1.25119062623581","Italy":"1.1592511168095","Japan":"-0.174866975766575","South Korea":"0.429494122423308","Mexico":"1.35809314149312","Netherlands":"0.294820793441482","Norway":"1.20914158930136","Pakistan":"2.11974141846723","Poland":"-0.0603600174744649","Portugal":"-0.548815210952228","Russian Federation":"0.212923595008292","Saudi Arabia":"2.36204707328032","Sweden":"0.847348652246305","Turkey":"1.81963885972764","United States":"0.737405823064126","World":"1.22210639817094","South Africa":"1.58382576812855"},"previous_year3":{"Afghanistan":"3.13554616440454","Argentina":"1.04980926143269","Australia":"1.72289521851643","Belgium":"0.726031655132031","Brazil":"0.935181982037551","Canada":"1.18302385819388","Switzerland":"1.06181932886789","China":"0.487231117971201","Germany":"-1.69134895621081","Denmark":"0.376272242619955","Egypt":"2.21110711674198","Spain":"0.0649259625617232","European Union":"-0.0846653798408283","Finland":"0.475809486683209","France":"0.483982304297933","United Kingdom":"0.695315842711388","Greece":"-0.540752950543684","Indonesia":"1.31061001922409","India":"1.28583203721824","Italy":"0.269541239520996","Japan":"-0.200320558786153","South Korea":"0.450977410550375","Mexico":"1.4071495144712","Netherlands":"0.370055034770235","Norway":"1.31344098868985","Pakistan":"2.12084736871807","Poland":"-0.000239076003298365","Portugal":"-0.405421787747567","Russian Federation":"0.168301590750173","Saudi Arabia":"2.42824061643758","Sweden":"0.739763272434863","Turkey":"1.79585498868024","United States":"0.761807513698898","World":"1.17803119620785","South Africa":"1.55224175435511"},"last_lustrum":{"Afghanistan":"2.98397866645826","Argentina":"1.04428767328593","Australia":"1.38952731561803","Belgium":"1.38684911331611","Brazil":"0.953765381161696","Canada":"0.987617711325488","Switzerland":"1.11187894263206","China":"0.47915045424996","Germany":"0.0253621280208064","Denmark":"0.411737855195019","Egypt":"2.1066381794963","Spain":"0.355338396471428","European Union":"0.220924866630256","Finland":"0.463558707499131","France":"0.483644884690839","United Kingdom":"0.781677289298684","Greece":"-0.147951277402184","Indonesia":"1.31374733349501","India":"1.32840109681551","Italy":"0.171978290995717","Japan":"-0.197526883816496","South Korea":"0.744180714074818","Mexico":"1.46266598582924","Netherlands":"0.466428782200821","Norway":"1.297189390693","Pakistan":"2.10981750620738","Poland":"0.0537697088781007","Portugal":"-0.147084878575482","Russian Federation":"0.0779670984684485","Saudi Arabia":"2.45371742438343","Sweden":"0.755150133665177","Turkey":"1.65485140182044","United States":"0.763850090826639","World":"1.20201763942845","South Africa":"1.52098111092005"},"last_decade":{"Afghanistan":"3.16125834846767","Argentina":"1.0501665291824","Australia":"1.47522794532757","Belgium":"0.659558214980699","Brazil":"1.17044204549015","Canada":"0.796844597283984","Switzerland":"0.627558473346134","China":"0.558374367373002","Germany":"-0.112797497644931","Denmark":"0.328645158919929","Egypt":"1.76198410376974","Spain":"1.69035255626114","European Union":"0.377593455514869","Finland":"0.383777136305104","France":"0.697191228293622","United Kingdom":"0.73504867842129","Greece":"0.30033180096664","Indonesia":"1.32127216342416","India":"1.54025760745955","Italy":"0.30055968851778","Japan":"0.0633735894181335","South Korea":"0.484653200790179","Mexico":"1.47874567106962","Netherlands":"0.160613668857538","Norway":"0.805392739160981","Pakistan":"2.04460469064385","Poland":"-0.0633705742926632","Portugal":"0.18033244147767","Russian Federation":"-0.327318706386192","Saudi Arabia":"2.6903286558977","Sweden":"0.562483906481893","Turkey":"1.23620643721729","United States":"0.964253917136075","World":"1.23983811982642","South Africa":"1.36908883643947"},"last_2decade":{"Afghanistan":"4.14183876292854","Argentina":"1.20676891837163","Australia":"1.31381929938745","Belgium":"0.1953931762382","Brazil":"1.55347567842489","Canada":"1.0771646811962","Switzerland":"0.441636406706345","China":"1.04814151412165","Germany":"0.289474899455448","Denmark":"0.565926341934592","Egypt":"1.84263019097166","Spain":"0.231202196009241","European Union":"0.135210796763204","Finland":"0.328037913627481","France":"0.354077244127682","United Kingdom":"0.254626384215086","Greece":"0.44067053086068","Indonesia":"1.49606531461805","India":"1.89839514985975","Italy":"0.0281044080072756","Japan":"0.253188880298405","South Korea":"0.952779421852704","Mexico":"1.84127375204761","Netherlands":"0.461395747607711","Norway":"0.506881682762136","Pakistan":"2.49544518790602","Poland":"0.0760741823645528","Portugal":"0.375996187340096","Russian Federation":"-0.145469155029265","Saudi Arabia":"2.50185230550836","Sweden":"0.159147080582875","Turkey":"1.57524323280021","United States":"1.16341161998189","World":"1.45032184055583","South Africa":"2.22517839282546"}}},"population":{"indicator":"population","indicator_sf":"population","last_year":2015,"previous_year":2014,"previous_year2":2013,"previous_year3":2012,"last_lustrum":2011,"last_decade":2006,"last_2decade":1996,"data_source":"wb","data":{"last_year":{"Afghanistan":"32526562","Argentina":"43416755","Australia":"23781169","Belgium":"11285721","Brazil":"207847528","Canada":"35851774","Switzerland":"8286976","China":"1371220000","Germany":"81413145","Denmark":"5676002","Egypt":"91508084","Spain":"46418269","European Union":"509668361","Finland":"5482013","France":"66808385","United Kingdom":"65138232","Greece":"10823732","Indonesia":"257563815","India":"1311050527","Italy":"60802085","Japan":"126958472","South Korea":"50617045","Mexico":"127017224","Netherlands":"16936520","Norway":"5195921","Pakistan":"188924874","Poland":"37999494","Portugal":"10348648","Russian Federation":"144096812","Saudi Arabia":"31540372","Sweden":"9798871","Turkey":"78665830","United States":"321418820","World":"7346633037","South Africa":"54956920"},"previous_year":{"Afghanistan":"31627506","Argentina":"42980026","Australia":"23464086","Belgium":"11231213","Brazil":"206077898","Canada":"35543658","Switzerland":"8188649","China":"1364270000","Germany":"80982500","Denmark":"5643475","Egypt":"89579670","Spain":"46480882","European Union":"508344735","Finland":"5461512","France":"66495940","United Kingdom":"64613160","Greece":"10892413","Indonesia":"254454778","India":"1295291543","Italy":"60789140","Japan":"127131800","South Korea":"50423955","Mexico":"125385833","Netherlands":"16865008","Norway":"5137232","Pakistan":"185044286","Poland":"38011735","Portugal":"10401062","Russian Federation":"143819569","Saudi Arabia":"30886545","Sweden":"9696110","Turkey":"77523788","United States":"318907401","World":"7260780278","South Africa":"54058647"},"previous_year2":{"Afghanistan":"30682500","Argentina":"42538304","Australia":"23117353","Belgium":"11182817","Brazil":"204259377","Canada":"35155499","Switzerland":"8089346","China":"1357380000","Germany":"82132753","Denmark":"5614932","Egypt":"87613909","Spain":"46620045","European Union":"508050888","Finland":"5438972","France":"65972097","United Kingdom":"64128226","Greece":"10965211","Indonesia":"251268276","India":"1279498874","Italy":"60233948","Japan":"127338621","South Korea":"50219669","Mexico":"123740109","Netherlands":"16804432","Norway":"5079623","Pakistan":"181192646","Poland":"38040196","Portugal":"10457295","Russian Federation":"143506911","Saudi Arabia":"30201051","Sweden":"9600379","Turkey":"76223639","United States":"316427395","World":"7176092192","South Africa":"53192216"},"previous_year3":{"Afghanistan":"29726803","Argentina":"42095224","Australia":"22728254","Belgium":"11128246","Brazil":"202401584","Canada":"34751476","Switzerland":"7996861","China":"1350695000","Germany":"80425823","Denmark":"5591572","Egypt":"85660902","Spain":"46773055","European Union":"505098575","Finland":"5413971","France":"65659790","United Kingdom":"63700300","Greece":"11045011","Indonesia":"248037853","India":"1263589639","Italy":"59539717","Japan":"127561489","South Korea":"50004441","Mexico":"122070963","Netherlands":"16754962","Norway":"5018573","Pakistan":"177392252","Poland":"38063164","Portugal":"10514844","Russian Federation":"143201676","Saudi Arabia":"29496047","Sweden":"9519374","Turkey":"74849187","United States":"314102623","World":"7089451551","South Africa":"52356381"},"last_lustrum":{"Afghanistan":"28809167","Argentina":"41655616","Australia":"22340024","Belgium":"11047744","Brazil":"200517584","Canada":"34342780","Switzerland":"7912398","China":"1344130000","Germany":"81797673","Denmark":"5570572","Egypt":"83787634","Spain":"46742697","European Union":"505526581","Finland":"5388272","France":"65342776","United Kingdom":"63258918","Greece":"11104899","Indonesia":"244808254","India":"1247446011","Italy":"59379449","Japan":"127817277","South Korea":"49779440","Mexico":"120365271","Netherlands":"16693074","Norway":"4953088","Pakistan":"173669648","Poland":"38063255","Portugal":"10557560","Russian Federation":"142960868","Saudi Arabia":"28788438","Sweden":"9449213","Turkey":"73517002","United States":"311718857","World":"7006907989","South Africa":"51549958"},"last_decade":{"Afghanistan":"25183615","Argentina":"39558750","Australia":"20697900","Belgium":"10547958","Brazil":"190698241","Canada":"32570505","Switzerland":"7483934","China":"1311020000","Germany":"82376451","Denmark":"5437272","Egypt":"76274285","Spain":"44397319","European Union":"498074489","Finland":"5266268","France":"63621376","United Kingdom":"60846820","Greece":"11020362","Indonesia":"229263980","India":"1162088305","Italy":"58143979","Japan":"127854000","South Korea":"48371946","Mexico":"111382857","Netherlands":"16346101","Norway":"4660677","Pakistan":"156524189","Poland":"38141267","Portugal":"10522288","Russian Federation":"143049528","Saudi Arabia":"25419994","Sweden":"9080505","Turkey":"68704721","United States":"298379912","World":"6594722462","South Africa":"47921682"},"last_2decade":{"Afghanistan":"17481800","Argentina":"35419683","Australia":"18311000","Belgium":"10156637","Brazil":"165303155","Canada":"29671900","Switzerland":"7071850","China":"1217550000","Germany":"81914831","Denmark":"5263074","Egypt":"63595629","Spain":"39478186","European Union":"484581653","Finland":"5124573","France":"59753098","United Kingdom":"58166950","Greece":"10608800","Indonesia":"199926615","India":"979290432","Italy":"56860281","Japan":"125757000","South Korea":"45524681","Mexico":"96181710","Netherlands":"15530498","Norway":"4381336","Pakistan":"125697651","Poland":"38624370","Portugal":"10063945","Russian Federation":"148160042","Saudi Arabia":"19331311","Sweden":"8840998","Turkey":"59451488","United States":"269394000","World":"5788596142","South Africa":"40000247"}}},"reserves":{"indicator":"reserves","indicator_sf":"gold\/silver reserves","last_year":2015,"previous_year":2014,"previous_year2":2013,"previous_year3":2012,"last_lustrum":2011,"last_decade":2006,"last_2decade":1996,"data_source":"wb","data":{"last_year":{"Afghanistan":"6976966101.37327","Argentina":"25520564393.8036","Australia":"49261208627.7604","Belgium":"24101847947.8291","Brazil":"356464978111.395","Canada":"79753516721.2641","Switzerland":"602402482145.859","China":"3405253357702.25","Germany":"173730921329.72","Denmark":"65185092232.3818","Egypt":"15858886842.5469","Spain":"53973839996.4031","European Union":null,"Finland":"10016274780.0994","France":"138198977176.891","United Kingdom":"129600909234.281","Greece":"6027606492.33105","Indonesia":"105928845986.863","India":"353319058314.405","Italy":"130592428257.837","Japan":"1233097778804.79","South Korea":"366707255995.707","Mexico":"177596630431.738","Netherlands":"38213747836.009","Norway":"57455935282.0481","Pakistan":"20027863930.586","Poland":"94902629476.0976","Portugal":"19402623213.6079","Russian Federation":"368042945901.372","Saudi Arabia":"626989681473.235","Sweden":"58098543091.0899","Turkey":"110489627489.474","United States":"383728469502.453","World":null,"South Africa":"45887064632.0386"},"previous_year":{"Afghanistan":"7528550402.40523","Argentina":"31410823483.4143","Australia":"53910346084.4978","Belgium":"25444420303.4322","Brazil":"363570247226.591","Canada":"74700002863.9467","Switzerland":"545787304073.241","China":"3900039358441.22","Germany":"193484844885.189","Denmark":"75391898442.9736","Egypt":"14927002166.4156","Spain":"50411867872.7529","European Union":null,"Finland":"10679258852.7593","France":"143977170862.924","United Kingdom":"107727629479.029","Greece":"6236288773.2901","Indonesia":"111862604046.204","India":"325081060905.901","Italy":"142756539021.191","Japan":"1260680415997.38","South Korea":"362834710646.116","Mexico":"195681644250.838","Netherlands":"43054424385.9934","Norway":"64800734876.8257","Pakistan":"14306813743.5247","Poland":"100452428565.274","Portugal":"19700742158.7829","Russian Federation":"386216377124.801","Saudi Arabia":"744440558276.383","Sweden":"62579183852.2533","Turkey":"127421926598.114","United States":"434416453479.958","World":null,"South Africa":"49121577905.7977"},"previous_year2":{"Afghanistan":"7288702808.98632","Argentina":"30533921358.1328","Australia":"52837031644.0728","Belgium":"26946180324.04","Brazil":"358816426346.517","Canada":"71937092647.18","Switzerland":"536235292234.498","China":"3880368275098.62","Germany":"198535181129.2","Denmark":"88676585995.6962","Egypt":"16536237509.56","Spain":"46335468959.02","European Union":null,"Finland":"11272358255.18","France":"145161120115.66","United Kingdom":"104418669118.24","Greece":"5763072025.66","Indonesia":"99386827824.74","India":"298092483487.487","Italy":"145724517428.74","Japan":"1266851419538.87","South Korea":"345694101316.376","Mexico":"180200037031.892","Netherlands":"46309218934.02","Norway":"58283144150.96","Pakistan":"7651260560.95194","Poland":"106221492600.971","Portugal":"17589254769.98","Russian Federation":"509692081493.02","Saudi Arabia":"737796506890.133","Sweden":"65363362010.6772","Turkey":"131053848307.023","United States":"448508967142.092","World":null,"South Africa":"49708176470.6712"},"previous_year3":{"Afghanistan":"7152304411.66686","Argentina":"43223271090.5489","Australia":"49138172510.564","Belgium":"30768940132.8315","Brazil":"373160978076.306","Canada":"68546344304.6514","Switzerland":"531302253382.241","China":"3387512975176.91","Germany":"248856492402.007","Denmark":"89697829949.2626","Egypt":"15672468061.2584","Spain":"50588476002.0462","European Union":null,"Finland":"11082345110.0045","France":"184521827260.365","United Kingdom":"105194404563.51","Greece":"7255024442.61224","Indonesia":"112797628043.608","India":"300425518088.108","Italy":"181670319827.779","Japan":"1268085526649.9","South Korea":"327724416296.583","Mexico":"167075785814.637","Netherlands":"54816126997.2448","Norway":"51856399864.7373","Pakistan":"13688479842.4827","Poland":"108902203765.188","Portugal":"22658232543.4348","Russian Federation":"537816373774.557","Saudi Arabia":"673739617131.103","Sweden":"52245310987.8558","Turkey":"119182966094.83","United States":"574268090541.4","World":null,"South Africa":"50688078607.1102"},"last_lustrum":{"Afghanistan":"6344642495.25739","Argentina":"46265809101.0066","Australia":"46714035204.1131","Belgium":"29114293149.0739","Brazil":"352010241721.417","Canada":"65819020598.9898","Switzerland":"330585901719.472","China":"3254674122432.29","Germany":"234104163353.968","Denmark":"84955231791.2683","Egypt":"18637544531.7575","Spain":"46704854402.6405","European Union":null,"Finland":"10276064353.5009","France":"168490352253.516","United Kingdom":"94544038250.0148","Greece":"6743420207.16311","Indonesia":"110136605627.115","India":"298739485811.368","Italy":"169872401864.175","Japan":"1295838776760.22","South Korea":"306934543258.158","Mexico":"149208131604.958","Netherlands":"50411074277.4324","Norway":"49397097548.673","Pakistan":"17697928678.7905","Poland":"97712443396.8254","Portugal":"20801308751.5782","Russian Federation":"497410247572.556","Saudi Arabia":"556570991484.125","Sweden":"50213905874.5147","Turkey":"87937258383.412","United States":"537267272427.958","World":null,"South Africa":"48748267721.6273"},"last_decade":{"Afghanistan":null,"Argentina":"32022296510.0172","Australia":"55078715673.8752","Belgium":"13436679649.158","Brazil":"85842861104.6689","Canada":"35063089703.1612","Switzerland":"64461047917.6955","China":"1080755680184.47","Germany":"111637054560.357","Denmark":"31083834394.0808","Egypt":"26006844917.5056","Spain":"19339947149.8916","European Union":null,"Finland":"7498638909.048","France":"98239160427.6836","United Kingdom":"47038783448.4777","Greece":"2849953362.47","Indonesia":"42597039985.2572","India":"178049789377.443","Italy":"75773324256.0656","Japan":"895321272119.849","South Korea":"239148088903.109","Mexico":"76329366176.0868","Netherlands":"23902292619.8384","Norway":"56841568021.0892","Pakistan":"12878021658.794","Poland":"48473947848.8856","Portugal":"9882746970.764","Russian Federation":"303773185537.126","Saudi Arabia":"228956883077.038","Sweden":"28017218814.5915","Turkey":"63264840946.3625","United States":"221088707676.236","World":null,"South Africa":"25593361010.2582"},"last_2decade":{"Afghanistan":null,"Argentina":"19719018706.8724","Australia":"17402143062.4941","Belgium":"22609781415.8045","Brazil":"59685476090.79","Canada":"21562306887.7352","Switzerland":"69182554318.1445","China":"111728906872.272","Germany":"118323154082.742","Denmark":"14754073287.3858","Egypt":"18296476741.5344","Spain":"63699015677.2589","European Union":null,"Finland":"7507186996.38048","France":"57020085575.061","United Kingdom":"46700030785.2408","Greece":"18782300969.9747","Indonesia":"19396150431.2003","India":"24889366112.5963","Italy":"70566444441.5457","Japan":"225593999841.827","South Korea":"34157943424.5348","Mexico":"19526913909.7629","Netherlands":"39606556277.5619","Norway":"26953900582.2874","Pakistan":"1307463660.42632","Poland":"18018686049.5498","Portugal":"21850468030.7761","Russian Federation":"16257617339.0512","Saudi Arabia":"16017719884.4657","Sweden":"20843374470.724","Turkey":"17819437214.5468","United States":"160660248052.918","World":null,"South Africa":"2341014437.17181"}}},"surfacekm":{"indicator":"surfacekm","indicator_sf":"surface (km2)","last_year":2015,"previous_year":2014,"previous_year2":2013,"previous_year3":2012,"last_lustrum":2011,"last_decade":2006,"last_2decade":1996,"data_source":"wb","data":{"last_year":{"Afghanistan":"652860","Argentina":"2780400","Australia":"7741220","Belgium":"30530","Brazil":"8515770","Canada":"9984670","Switzerland":"41285","China":"9562911","Germany":"357170","Denmark":"43090","Egypt":"1001450","Spain":"505940","European Union":"4383492","Finland":"338420","France":"549087","United Kingdom":"243610","Greece":"131960","Indonesia":"1910930","India":"3287260","Italy":"301340","Japan":"377962","South Korea":"100266","Mexico":"1964380","Netherlands":"41500","Norway":"385178","Pakistan":"796100","Poland":"312680","Portugal":"92220","Russian Federation":"17098250","Saudi Arabia":"2149690","Sweden":"447420","Turkey":"783560","United States":"9831510","World":"134325435.2","South Africa":"1219090"},"previous_year":{"Afghanistan":"652860","Argentina":"2780400","Australia":"7741220","Belgium":"30530","Brazil":"8515770","Canada":"9984670","Switzerland":"41285","China":"9562911","Germany":"357170","Denmark":"43090","Egypt":"1001450","Spain":"505940","European Union":"4383492","Finland":"338420","France":"549087","United Kingdom":"243610","Greece":"131960","Indonesia":"1910930","India":"3287260","Italy":"301340","Japan":"377962","South Korea":"100266","Mexico":"1964380","Netherlands":"41500","Norway":"385178","Pakistan":"796100","Poland":"312680","Portugal":"92220","Russian Federation":"17098250","Saudi Arabia":"2149690","Sweden":"447420","Turkey":"783560","United States":"9831510","World":"134325435.2","South Africa":"1219090"},"previous_year2":{"Afghanistan":"652860","Argentina":"2780400","Australia":"7741220","Belgium":"30530","Brazil":"8515770","Canada":"9984670","Switzerland":"41285","China":"9562911","Germany":"357170","Denmark":"43090","Egypt":"1001450","Spain":"505940","European Union":"4383492","Finland":"338420","France":"549087","United Kingdom":"243610","Greece":"131960","Indonesia":"1910930","India":"3287260","Italy":"301340","Japan":"377962","South Korea":"100266","Mexico":"1964380","Netherlands":"41500","Norway":"385178","Pakistan":"796100","Poland":"312680","Portugal":"92220","Russian Federation":"17098250","Saudi Arabia":"2149690","Sweden":"447420","Turkey":"783560","United States":"9831510","World":"134325435.2","South Africa":"1219090"},"previous_year3":{"Afghanistan":"652860","Argentina":"2780400","Australia":"7741220","Belgium":"30530","Brazil":"8515770","Canada":"9984670","Switzerland":"41285","China":"9562911","Germany":"357170","Denmark":"43090","Egypt":"1001450","Spain":"505940","European Union":"4383476","Finland":"338420","France":"549091","United Kingdom":"243610","Greece":"131960","Indonesia":"1910930","India":"3287260","Italy":"301340","Japan":"377960","South Korea":"100150","Mexico":"1964380","Netherlands":"41500","Norway":"385178","Pakistan":"796100","Poland":"312680","Portugal":"92210","Russian Federation":"17098250","Saudi Arabia":"2149690","Sweden":"447420","Turkey":"783560","United States":"9831510","World":"134325303.8","South Africa":"1219090"},"last_lustrum":{"Afghanistan":"652860","Argentina":"2780400","Australia":"7741220","Belgium":"30530","Brazil":"8515770","Canada":"9984670","Switzerland":"41285","China":"9562911","Germany":"357140","Denmark":"43090","Egypt":"1001450","Spain":"505600","European Union":"4385982","Finland":"338420","France":"549087","United Kingdom":"243610","Greece":"131960","Indonesia":"1910930","India":"3287260","Italy":"301340","Japan":"377955","South Korea":"100030","Mexico":"1964380","Netherlands":"41500","Norway":"385178","Pakistan":"796100","Poland":"312680","Portugal":"92210","Russian Federation":"17098250","Saudi Arabia":"2149690","Sweden":"450300","Turkey":"783560","United States":"9831510","World":"134327660.8","South Africa":"1219090"},"last_decade":{"Afghanistan":"652860","Argentina":"2780400","Australia":"7741220","Belgium":"30530","Brazil":"8515770","Canada":"9984670","Switzerland":"41285","China":"9562911.4","Germany":"357100","Denmark":"43090","Egypt":"1001450","Spain":"505370","European Union":"4385715","Finland":"338440","France":"549086","United Kingdom":"243610","Greece":"131960","Indonesia":"1910930","India":"3287260","Italy":"301340","Japan":"377920","South Korea":"99680","Mexico":"1964380","Netherlands":"41540","Norway":"385178","Pakistan":"796100","Poland":"312680","Portugal":"92090","Russian Federation":"17098240","Saudi Arabia":"2149690","Sweden":"450300","Turkey":"783560","United States":"9632030","World":"134112162.4","South Africa":"1219090"},"last_2decade":{"Afghanistan":"652860","Argentina":"2780400","Australia":"7741220","Belgium":null,"Brazil":"8515770","Canada":"9984670","Switzerland":"41285","China":"9562930","Germany":"357030","Denmark":"43090","Egypt":"1001450","Spain":"505990","European Union":"4352895","Finland":"338150","France":"549086","United Kingdom":"243610","Greece":"131960","Indonesia":"1910930","India":"3287260","Italy":"301340","Japan":"377800","South Korea":"99260","Mexico":"1964380","Netherlands":"41530","Norway":"385178","Pakistan":"796100","Poland":"312690","Portugal":"92120","Russian Federation":"17098240","Saudi Arabia":"2149690","Sweden":"450300","Turkey":"783560","United States":"9629090","World":"134035829.4","South Africa":"1219090"}}},"surpdeficitgdp":{"indicator":"surpdeficitgdp","indicator_sf":"surplus-or-deficit\/GDP (%)","last_year":2015,"previous_year":2014,"previous_year2":2013,"previous_year3":2012,"last_lustrum":2011,"last_decade":2006,"last_2decade":1996,"data_source":"wb","data":{"last_year":{"Afghanistan":null,"Argentina":null,"Australia":null,"Belgium":null,"Brazil":null,"Canada":null,"Switzerland":null,"China":null,"Germany":null,"Denmark":null,"Egypt":null,"Spain":null,"European Union":null,"Finland":null,"France":null,"United Kingdom":null,"Greece":null,"Indonesia":null,"India":null,"Italy":null,"Japan":null,"South Korea":null,"Mexico":null,"Netherlands":null,"Norway":null,"Pakistan":null,"Poland":null,"Portugal":null,"Russian Federation":null,"Saudi Arabia":null,"Sweden":null,"Turkey":null,"United States":null,"World":null,"South Africa":null},"previous_year":{"Afghanistan":null,"Argentina":null,"Australia":"-1.84566490257974","Belgium":"-2.5917064594114","Brazil":null,"Canada":"0.550976334524894","Switzerland":null,"China":null,"Germany":"0.409582768850857","Denmark":null,"Egypt":null,"Spain":"-3.85992546774751","European Union":"-2.69801906411694","Finland":"-2.6282713330865","France":"-3.77697192289241","United Kingdom":"-4.96056094041824","Greece":"-3.55768224567612","Indonesia":null,"India":null,"Italy":"-3.49179590319344","Japan":null,"South Korea":null,"Mexico":null,"Netherlands":"-1.98862350438312","Norway":"10.7820794748683","Pakistan":null,"Poland":"-1.61752986657329","Portugal":"-8.69720973001938","Russian Federation":"0.796396672572811","Saudi Arabia":null,"Sweden":"-0.935761557797345","Turkey":"1.50637658028577","United States":"-5.37121952406064","World":null,"South Africa":"-3.3153341273109"},"previous_year2":{"Afghanistan":null,"Argentina":null,"Australia":"-1.46964378374726","Belgium":"-2.44988858470746","Brazil":null,"Canada":"0.146496684006336","Switzerland":"0.440996732130595","China":null,"Germany":"-0.054700406264845","Denmark":"-1.17787047154745","Egypt":null,"Spain":"-4.77148608708469","European Union":"-3.01834323985709","Finland":"-1.83831846482212","France":"-3.62996251990303","United Kingdom":"-5.4858673079151","Greece":"-12.0400882596622","Indonesia":null,"India":null,"Italy":"-2.90941999137069","Japan":"-7.19314808664958","South Korea":null,"Mexico":null,"Netherlands":"-2.04146225668618","Norway":"11.484975907922","Pakistan":"-5.23482376063698","Poland":"-3.80374572627255","Portugal":"-5.59842407787282","Russian Federation":"0.886974113988299","Saudi Arabia":null,"Sweden":"-1.31358608390813","Turkey":"0.289376525279248","United States":"-4.19056769544312","World":"-3.39022795872328","South Africa":"-5.79408056849758"},"previous_year3":{"Afghanistan":"-0.62110794913849","Argentina":null,"Australia":"-3.03196547926757","Belgium":"-3.56069346258972","Brazil":"-1.80409842703882","Canada":"-0.212200078121228","Switzerland":"0.529284133092492","China":null,"Germany":"0.0814923444385559","Denmark":"-3.62037049332714","Egypt":"-10.1145116503682","Spain":"-7.91966799377105","European Union":"-3.87160127037803","Finland":"-1.09363190902584","France":"-4.48293545204461","United Kingdom":"-7.87334713336972","Greece":"-9.02858115694402","Indonesia":"-1.76022225518813","India":"-3.81993616044691","Italy":"-3.16915082843624","Japan":"-7.76741799463406","South Korea":null,"Mexico":null,"Netherlands":"-3.44718552182081","Norway":"14.4290720920758","Pakistan":"-8.00655974858454","Poland":"-3.48405639806703","Portugal":"-6.90712665305364","Russian Federation":"2.3543610461746","Saudi Arabia":null,"Sweden":"-0.788129613547547","Turkey":"-0.489141883606286","United States":"-7.38712573710536","World":"-4.46950505731211","South Africa":"-5.11260671770637"},"last_lustrum":{"Afghanistan":"-0.626409395980503","Argentina":null,"Australia":"-3.67251976351172","Belgium":"-3.61350123712102","Brazil":"-2.44605507233028","Canada":"-1.12524732728335","Switzerland":"0.55805541465158","China":null,"Germany":"-0.47434076178638","Denmark":"-2.18298858298553","Egypt":"-10.0824593392167","Spain":"-3.44334383083912","European Union":"-3.78488913243598","Finland":"-0.535889347738852","France":"-4.93424947700269","United Kingdom":"-7.42306172351619","Greece":"-10.5231697599818","Indonesia":"-1.07061071989681","India":"-3.04168737009338","Italy":"-3.31183068016079","Japan":"-8.20446300903752","South Korea":"1.69081025391673","Mexico":null,"Netherlands":"-3.64239286142016","Norway":"14.2451234306349","Pakistan":"-6.39570397736102","Poland":"-4.0804771227603","Portugal":"-7.97119814633625","Russian Federation":"3.08636198421442","Saudi Arabia":null,"Sweden":"0.260763003213114","Turkey":"-1.05905074538075","United States":"-9.00306522920653","World":"-4.7977103110766","South Africa":"-4.55828639961724"},"last_decade":{"Afghanistan":"-2.0278600964814","Argentina":null,"Australia":"1.24887971818504","Belgium":"-0.173849422338686","Brazil":"-2.83731092805499","Canada":"1.62557875683468","Switzerland":"0.0390770106592504","China":null,"Germany":"-1.79517393736551","Denmark":"4.10812775607011","Egypt":"-7.1684960336733","Spain":"0.0669660130122404","European Union":"-2.4763719438708","Finland":"2.44591972377675","France":"-3.68466390045255","United Kingdom":"-3.6589128094297","Greece":"-8.1482935290833","Indonesia":null,"India":"-2.24290094931539","Italy":"-3.85980144298831","Japan":"-0.744285920104522","South Korea":"1.0748253773648","Mexico":null,"Netherlands":"-0.954572808574408","Norway":"17.2599615765183","Pakistan":"-3.92427849506339","Poland":"-4.39528764927822","Portugal":"-5.71380051629271","Russian Federation":"8.02609445749623","Saudi Arabia":null,"Sweden":"0.197187393811262","Turkey":null,"United States":"-3.51119318331672","World":"-1.50905586472007","South Africa":"0.613786779687162"},"last_2decade":{"Afghanistan":null,"Argentina":null,"Australia":null,"Belgium":"-4.18200257476545","Brazil":null,"Canada":"-2.40448622732412","Switzerland":"-0.858595552217461","China":null,"Germany":"-2.86535983055775","Denmark":"-3.71894365271354","Egypt":"-1.40061028770706","Spain":"-5.4480401055755","European Union":"-4.77757148307087","Finland":"-6.2767000431119","France":"-5.62662385257556","United Kingdom":"-4.80886911016519","Greece":"-9.45003611157042","Indonesia":"2.31594841940272","India":"-1.98389775688133","Italy":"-7.64222108115423","Japan":null,"South Korea":"2.40453697727535","Mexico":"-0.110727265970875","Netherlands":"-3.47309387735949","Norway":"5.37482802465636","Pakistan":"-6.59875396960531","Poland":"-2.02714859492809","Portugal":"-5.79728685255662","Russian Federation":null,"Saudi Arabia":null,"Sweden":"-4.82623163737529","Turkey":"-8.38059012042843","United States":"-1.37626214302583","World":"-2.53789757839113","South Africa":"-5.16015936174673"}}},"unemployed":{"indicator":"unemployed","indicator_sf":"unemployed %","last_year":2015,"previous_year":2014,"previous_year2":2013,"previous_year3":2012,"last_lustrum":2011,"last_decade":2006,"last_2decade":1996,"data_source":"wb","data":{"last_year":{"Afghanistan":null,"Argentina":null,"Australia":null,"Belgium":null,"Brazil":null,"Canada":null,"Switzerland":null,"China":null,"Germany":null,"Denmark":null,"Egypt":null,"Spain":null,"European Union":null,"Finland":null,"France":null,"United Kingdom":null,"Greece":null,"Indonesia":null,"India":null,"Italy":null,"Japan":null,"South Korea":null,"Mexico":null,"Netherlands":null,"Norway":null,"Pakistan":null,"Poland":null,"Portugal":null,"Russian Federation":null,"Saudi Arabia":null,"Sweden":null,"Turkey":null,"United States":null,"World":null,"South Africa":null},"previous_year":{"Afghanistan":"9.10000038146973","Argentina":"8.19999980926514","Australia":"6","Belgium":"8.5","Brazil":"6.80000019073486","Canada":"6.90000009536743","Switzerland":"4.5","China":"4.69999980926514","Germany":"5","Denmark":"6.59999990463257","Egypt":"13.1999998092651","Spain":"24.7000007629395","European Union":"10.2073997075471","Finland":"8.60000038146973","France":"9.89999961853027","United Kingdom":"6.30000019073486","Greece":"26.2999992370605","Indonesia":"6.19999980926514","India":"3.59999990463257","Italy":"12.5","Japan":"3.70000004768372","South Korea":"3.5","Mexico":"4.90000009536743","Netherlands":"6.90000009536743","Norway":"3.40000009536743","Pakistan":"5.19999980926514","Poland":"9.19999980926514","Portugal":"14.1999998092651","Russian Federation":"5.09999990463257","Saudi Arabia":"5.59999990463257","Sweden":"8","Turkey":"9.19999980926514","United States":"6.19999980926514","World":"5.93229864405431","South Africa":"25.1000003814697"},"previous_year2":{"Afghanistan":"9.19999980926514","Argentina":"7.09999990463257","Australia":"5.69999980926514","Belgium":"8.39999961853027","Brazil":"6.5","Canada":"7.09999990463257","Switzerland":"4.40000009536743","China":"4.59999990463257","Germany":"5.30000019073486","Denmark":"7","Egypt":"13.1999998092651","Spain":"26.2999992370605","European Union":"10.8820139247283","Finland":"8.19999980926514","France":"10.3999996185303","United Kingdom":"7.5","Greece":"27.2000007629395","Indonesia":"6.30000019073486","India":"3.59999990463257","Italy":"12.1999998092651","Japan":"4","South Korea":"3.09999990463257","Mexico":"4.90000009536743","Netherlands":"6.69999980926514","Norway":"3.5","Pakistan":"5.09999990463257","Poland":"10.3999996185303","Portugal":"16.5","Russian Federation":"5.5","Saudi Arabia":"5.69999980926514","Sweden":"8.10000038146973","Turkey":"8.69999980926514","United States":"7.40000009536743","World":"5.99341814950671","South Africa":"24.6000003814697"},"previous_year3":{"Afghanistan":"8.5","Argentina":"7.19999980926514","Australia":"5.19999980926514","Belgium":"7.5","Brazil":"6.09999990463257","Canada":"7.19999980926514","Switzerland":"4.19999980926514","China":"4.5","Germany":"5.40000009536743","Denmark":"7.5","Egypt":"12.6999998092651","Spain":"25.2000007629395","European Union":"10.509131795132","Finland":"7.59999990463257","France":"9.89999961853027","United Kingdom":"8","Greece":"24.2000007629395","Indonesia":"6.09999990463257","India":"3.59999990463257","Italy":"10.6999998092651","Japan":"4.30000019073486","South Korea":"3.20000004768372","Mexico":"4.90000009536743","Netherlands":"5.30000019073486","Norway":"3.20000004768372","Pakistan":"5.09999990463257","Poland":"10.1000003814697","Portugal":"15.6000003814697","Russian Federation":"5.5","Saudi Arabia":"5.59999990463257","Sweden":"8.10000038146973","Turkey":"9.19999980926514","United States":"8.19999980926514","World":"5.99481616391903","South Africa":"25"},"last_lustrum":{"Afghanistan":"8.89999961853027","Argentina":"7.19999980926514","Australia":"5.09999990463257","Belgium":"7.09999990463257","Brazil":"6.69999980926514","Canada":"7.40000009536743","Switzerland":"4","China":"4.30000019073486","Germany":"5.90000009536743","Denmark":"7.59999990463257","Egypt":"12","Spain":"21.7000007629395","European Union":"9.61118501626309","Finland":"7.69999980926514","France":"9.19999980926514","United Kingdom":"7.80000019073486","Greece":"17.7000007629395","Indonesia":"6.59999990463257","India":"3.5","Italy":"8.39999961853027","Japan":"4.5","South Korea":"3.40000009536743","Mexico":"5.30000019073486","Netherlands":"4.40000009536743","Norway":"3.29999995231628","Pakistan":"5.09999990463257","Poland":"9.60000038146973","Portugal":"12.6999998092651","Russian Federation":"6.5","Saudi Arabia":"5.80000019073486","Sweden":"7.80000019073486","Turkey":"9.80000019073486","United States":"9","World":"5.99469009955319","South Africa":"24.7000007629395"},"last_decade":{"Afghanistan":"8.80000019073486","Argentina":"10.1000003814697","Australia":"4.80000019073486","Belgium":"8.19999980926514","Brazil":"8.39999961853027","Canada":"6.30000019073486","Switzerland":"4","China":"4","Germany":"10.3000001907349","Denmark":"3.90000009536743","Egypt":"10.6000003814697","Spain":"8.60000038146973","European Union":"8.22169439831428","Finland":"7.59999990463257","France":"8.80000019073486","United Kingdom":"5.5","Greece":"8.89999961853027","Indonesia":"10.3000001907349","India":"4.30000019073486","Italy":"6.80000019073486","Japan":"4.09999990463257","South Korea":"3.40000009536743","Mexico":"3.20000004768372","Netherlands":"3.90000009536743","Norway":"3.40000009536743","Pakistan":"6.09999990463257","Poland":"13.8000001907349","Portugal":"7.69999980926514","Russian Federation":"7.09999990463257","Saudi Arabia":"6.30000019073486","Sweden":"7.09999990463257","Turkey":"10.1999998092651","United States":"4.69999980926514","World":"5.89997626027573","South Africa":"22.6000003814697"},"last_2decade":{"Afghanistan":"8.39999961853027","Argentina":"17.2000007629395","Australia":"8.5","Belgium":"9.5","Brazil":"6.80000019073486","Canada":"9.60000038146973","Switzerland":"3.70000004768372","China":"4.59999990463257","Germany":"8.89999961853027","Denmark":"6.80000019073486","Egypt":"9","Spain":"22.5","European Union":"10.693881403155","Finland":"14.3999996185303","France":"12.3999996185303","United Kingdom":"8.30000019073486","Greece":"9.69999980926514","Indonesia":"4.40000009536743","India":"4","Italy":"11.8999996185303","Japan":"3.40000009536743","South Korea":"2","Mexico":"5.19999980926514","Netherlands":"6.40000009536743","Norway":"4.80000019073486","Pakistan":"5.30000019073486","Poland":"12.3999996185303","Portugal":"6.80000019073486","Russian Federation":"9.69999980926514","Saudi Arabia":"6","Sweden":"10.1000003814697","Turkey":"6.59999990463257","United States":"5.5","World":"6.18759065171808","South Africa":"21"}}},"history":[{"fact":"Neolithic Era","begin":"-10000","end":"-2000","wiki":"Neolithic","p":247},{"fact":"Writing (Civilization)","begin":"-3500","end":"-600","wiki":"History_of_writing","p":15},{"fact":"Maya civilization","begin":"-2000","end":"1697","wiki":"Maya_civilization","p":84},{"fact":"Ancient Greece (Greek Empire)","begin":"-1200","end":"146","wiki":"Ancient_Greece","p":440},{"fact":"Romulus and Remus","begin":"-771","end":"-717","wiki":"Romulus_and_Remus","p":35},{"fact":"Rome founding","begin":"-753","end":"-753","wiki":"Founding_of_Rome","p":13},{"fact":"Thales","begin":"-624","end":"-546","wiki":"Thales","p":27},{"fact":"Pythagoras","begin":"-570","end":"-495","wiki":"Pythagoras","p":46},{"fact":"Rome Republic","begin":"-509","end":"-45","wiki":"Roman_Republic","p":251},{"fact":"Socrates","begin":"-470","end":"-399","wiki":"Socrates","p":88},{"fact":"Plato","begin":"-427","end":"-347","wiki":"Plato","p":243},{"fact":"Aristotle","begin":"-384","end":"-322","wiki":"Aristotle","p":385},{"fact":"Alexander the Great","begin":"-356","end":"-323","wiki":"Alexander_the_Great","p":222},{"fact":"Pre-Roman Europe (Greeks, Celts, Iberians, Berbers,...)","begin":"-300","end":"-270","wiki":"Pre-Roman_peoples_of_the_Iberian_Peninsula","p":11},{"fact":"Eratosthenes","begin":"-276","end":"-194","wiki":"Eratosthenes","p":27},{"fact":"Julious Caesar Dictatorship","begin":"-49","end":"-44","wiki":"Julius_Caesar","p":194},{"fact":"Roman Britain","begin":"-43","end":"410","wiki":"Roman_Britain","p":111},{"fact":"Caesar Augustus Emperorship","begin":"-27","end":"-14","wiki":"Augustus","p":191},{"fact":"Roman Empire","begin":"-27","end":"476","wiki":"Roman_Empire","p":698},{"fact":"Ptolemy","begin":"100","end":"170","wiki":"Ptolemy","p":148},{"fact":"Western Roman Empire","begin":"395","end":"476","wiki":"Western_Roman_Empire","p":86},{"fact":"Dissolution of the Roman Empire (Fall of Western Roman Empire)","begin":"476","end":"476","wiki":"Dissolution_of_the_Roman_Empire","p":0},{"fact":"Eastern Roman Empire (Bizantine Empire)","begin":"395","end":"1453","wiki":"Byzantine_Empire","p":509},{"fact":"Visigoths","begin":"291","end":"711","wiki":"Visigoths","p":89},{"fact":"European Tribes: Visigoths, Franks, Vandals, Goths, Angles, Saxons","begin":"418","end":"720","wiki":"","p":0},{"fact":"Visigoths in Spain","begin":"477","end":"711","wiki":"","p":0},{"fact":"Muslims in Spain","begin":"711","end":"1492","wiki":"Timeline_of_the_Muslim_presence_in_the_Iberian_Peninsula","p":6},{"fact":"Charles I (Charlemagne)","begin":"742","end":"814","wiki":"Charlemagne","p":187},{"fact":"Holy Roman Empire","begin":"962","end":"1806","wiki":"Holy_Roman_Empire","p":371},{"fact":"House of Habsburg\/Austria","begin":"1100","end":"2000","wiki":"House_of_Habsburg","p":190},{"fact":"Ramon Berenguer I (Count of Barcelona)","begin":"1023","end":"1076","wiki":"Ramon_Berenguer_I,_Count_of_Barcelona","p":0},{"fact":"Ramon Berenguer IV de Barcelona i Petronila d Arago","begin":"1137","end":"1137","wiki":"Ramon_Berenguer_IV,_Count_of_Barcelona","p":9},{"fact":"Genghis Khan Reign","begin":"1206","end":"1227","wiki":"Genghis_Khan","p":86},{"fact":"James I of Aragon Reign","begin":"1213","end":"1276","wiki":"James_I_of_Aragon","p":22},{"fact":"Roger_Bacon (Modern Scientific method)","begin":"1214","end":"1292","wiki":"Roger_Bacon","p":24},{"fact":"Aztec\/Mexica","begin":"1228","end":"1521","wiki":"Aztec","p":91},{"fact":"Alfonso X of Castile (the wise) Reign","begin":"1252","end":"1284","wiki":"Alfonso_X_of_Castile","p":26},{"fact":"Ottoman Empire","begin":"1299","end":"1923","wiki":"Ottoman_Empire","p":806},{"fact":"House of Bourbon","begin":"1268","end":"2020","wiki":"House_of_Bourbon","p":86},{"fact":"Renaissance (art)","begin":"1300","end":"1602","wiki":"Renaissance","p":161},{"fact":"black death (bubonic)","begin":"1320","end":"1352","wiki":"Black_Death","p":122},{"fact":"Ming dynasty","begin":"1368","end":"1644","wiki":"Ming_dynasty","p":212},{"fact":"Inca_Empire","begin":"1438","end":"1533","wiki":"Inca_Empire","p":99},{"fact":"Printing press (difusion)","begin":"1440","end":"1440","wiki":"Printing_press","p":92},{"fact":"Colombus","begin":"1451","end":"1506","wiki":"Christopher_Columbus","p":137},{"fact":"Fall of Constantinople (Byzantine Empire)","begin":"1453","end":"1453","wiki":"Fall_of_Constantinople","p":61},{"fact":"Nicolaus Copernicus","begin":"1473","end":"1543","wiki":"Nicolaus_Copernicus","p":57},{"fact":"Catholic Monarchs","begin":"1475","end":"1516","wiki":"Catholic_Monarchs","p":31},{"fact":"European Discovery of America","begin":"1492","end":"1492","wiki":"Voyages_of_Christopher_Columbus","p":36},{"fact":"Magellan","begin":"1480","end":"1521","wiki":"Ferdinand_Magellan","p":40},{"fact":"Elcano","begin":"1476","end":"1526","wiki":"Juan_Sebasti\u00e1n_Elcano","p":9},{"fact":"Philip IV of France \/ Philip I of Spain","begin":"1478","end":"1506","wiki":"Philip_IV_of_France","p":32},{"fact":"Hern\u00e1n Cort\u00e9s Conquests (Cuba\/M\u00e9xico)","begin":"1511","end":"1547","wiki":"Hern\u00e1n_Cort\u00e9s","p":46},{"fact":"Francisco Pizarro (conquests in office)","begin":"1513","end":"1541","wiki":"Francisco_Pizarro","p":21},{"fact":"Charles I of Spain (V of Germany) Reign","begin":"1516","end":"1556","wiki":"Charles_V,_Holy_Roman_Emperor","p":154},{"fact":"First trip around the world","begin":"1519","end":"1522","wiki":"Timeline_of_Magellan's_circumnavigation","p":0},{"fact":"Protestant Reformation","begin":"1517","end":"1555","wiki":"Protestant_Reformation","p":291},{"fact":"Church of England","begin":"1530","end":"1530","wiki":"Church_of_England","p":393},{"fact":"Council of Trent","begin":"1545","end":"1563","wiki":"Council_of_Trent","p":70},{"fact":"Philip II of Spain Reign","begin":"1556","end":"1598","wiki":"Philip_II_of_Spain","p":124},{"fact":"Galileo Galilei","begin":"1564","end":"1642","wiki":"Galileo_Galilei","p":101},{"fact":"Keppler","begin":"1571","end":"1630","wiki":"Johannes_Kepler","p":54},{"fact":"Philip III Reign","begin":"1598","end":"1621","wiki":"Philip_III_of_Spain","p":27},{"fact":"Baroque(art)-NeoClassicism(music)","begin":"1600","end":"1800","wiki":"Baroque","p":236},{"fact":"30 years' war","begin":"1618","end":"1648","wiki":"Thirty_Years'_War","p":161},{"fact":"Philip IV Reign","begin":"1621","end":"1665","wiki":"Philip_IV_of_Spain","p":35},{"fact":"Isaac Newton","begin":"1642","end":"1726","wiki":"Isaac_Newton","p":167},{"fact":"Qing\/Manchu dynasty","begin":"1644","end":"1912","wiki":"Qing_dynasty","p":281},{"fact":"Charles II Reign","begin":"1665","end":"1700","wiki":"Charles_II_of_Spain","p":24},{"fact":"Glorious Revolution (England)","begin":"1688","end":"1689","wiki":"Glorious_Revolution","p":82},{"fact":"[Central] Bank of England Creation","begin":"1694","end":"1694","wiki":"Bank_of_England","p":76},{"fact":"Philippe V of Spain, Duke d Anjou","begin":"1700","end":"1746","wiki":"Philip_V_of_Spain","p":44},{"fact":"War of the Spanish Succession","begin":"1701","end":"1715","wiki":"War_of_the_Spanish_Succession","p":77},{"fact":"Battle of Almansa","begin":"1707","end":"1707","wiki":"Battle_of_Almansa","p":0},{"fact":"David Hume","begin":"1711","end":"1776","wiki":"David_Hume","p":80},{"fact":"Treaty of Utrecht","begin":"1715","end":"1715","wiki":"Treaty_of_Utrecht","p":43},{"fact":"Adam Smith","begin":"1723","end":"1790","wiki":"Adam_Smith","p":117},{"fact":"Age of Enlightment\/Reason","begin":"1650","end":"1780","wiki":"Age_of_Enlightenment","p":242},{"fact":"Immanuel Kant","begin":"1724","end":"1804","wiki":"Immanuel_Kant","p":133},{"fact":"George Washington (1st US president)","begin":"1732","end":"1799","wiki":"George_Washington","p":238},{"fact":"James Watt (steam engine)","begin":"1736","end":"1819","wiki":"James_Watt","p":41},{"fact":"Thomas Jefferson (US president)","begin":"1743","end":"1826","wiki":"Thomas_Jefferson","p":196},{"fact":"Jeremy Bentham","begin":"1748","end":"1832","wiki":"Jeremy_Bentham","p":42},{"fact":"7 years' war","begin":"1756","end":"1763","wiki":"Seven_Years'_War","p":150},{"fact":"Charles_III_of_Spain","begin":"1759","end":"1788","wiki":"Charles_III_of_Spain","p":46},{"fact":"Industrial Revolution","begin":"1760","end":"1820","wiki":"Industrial_Revolution","p":324},{"fact":"Andrew Jackson (US president)","begin":"1767","end":"1845","wiki":"Andrew_Jackson","p":101},{"fact":"Steam engine (Watt)","begin":"1778","end":"1778","wiki":"Watt_steam_engine","p":7},{"fact":"American Revolutionary War (Independence War)","begin":"1775","end":"1783","wiki":"American_Revolutionary_War","p":337},{"fact":"US Independence","begin":"1776","end":"1776","wiki":"United_States_Declaration_of_Independence","p":139},{"fact":"US Constitution","begin":"1787","end":"1787","wiki":"United_States_Constitution","p":368},{"fact":"French Revolution","begin":"1789","end":"1799","wiki":"French_Revolution","p":470},{"fact":"French_Constitution (language unification)","begin":"1792","end":"1792","wiki":"French_Constitution_of_1791","p":6},{"fact":"Napoleon","begin":"1769","end":"1821","wiki":"Napoleon","p":462},{"fact":"Simon Bolivar","begin":"1783","end":"1830","wiki":"Sim\u00f3n_Bol\u00edvar","p":43},{"fact":"Charles IV of Spain reign","begin":"1788","end":"1808","wiki":"Charles_IV_of_Spain","p":20},{"fact":"First [Central] Bank of the US","begin":"1791","end":"1811","wiki":"First_Bank_of_the_United_States","p":11},{"fact":"Romanticism (art)","begin":"1800","end":"1850","wiki":"Romanticism","p":195},{"fact":"Ferdinand VII of Spain Reign","begin":"1808","end":"1833","wiki":"Ferdinand_VII_of_Spain","p":34},{"fact":"Dissolution of the Holy Roman Empire","begin":"1806","end":"1806","wiki":"Dissolution_of_the_Holy_Roman_Empire","p":0},{"fact":"Mexican_War_of_Independence","begin":"1810","end":"1821","wiki":"Mexican_War_of_Independence","p":39},{"fact":"Waterloo Battle","begin":"1815","end":"1815","wiki":"Battle_of_Waterloo","p":64},{"fact":"Louis XVIII (Bourbon)","begin":"1755","end":"1824","wiki":"Louis_XVIII_of_France","p":38},{"fact":"Lenin","begin":"1870","end":"1924","wiki":"Vladimir_Lenin","p":160},{"fact":"Darwin","begin":"1809","end":"1882","wiki":"Charles_Darwin","p":215},{"fact":"Karl Marx","begin":"1818","end":"1883","wiki":"Karl_Marx","p":199},{"fact":"Friedrich_Nietzsche","begin":"1844","end":"1900","wiki":"Friedrich_Nietzsche","p":111},{"fact":"labor movement: socialism anarchism","begin":"1830","end":"1914","wiki":"","p":0},{"fact":"Isabel II Reign","begin":"1833","end":"1868","wiki":"Isabella_II_of_Spain","p":24},{"fact":"Abraham Lincoln (US president)","begin":"1809","end":"1865","wiki":"Abraham_Lincoln","p":230},{"fact":"Second [Central] Bank of US","begin":"1816","end":"1836","wiki":"","p":0},{"fact":"US Free Banking Era","begin":"1837","end":"1862","wiki":"Free_Banking_Era","p":0},{"fact":"J.P. Morgan","begin":"1837","end":"1913","wiki":"J._P._Morgan","p":35},{"fact":"J.D. Rockefeller","begin":"1839","end":"1937","wiki":"John_D._Rockefeller","p":28},{"fact":"Thomas Edison","begin":"1847","end":"1931","wiki":"Thomas_Edison","p":92},{"fact":"Nikola Tesla","begin":"1856","end":"1943","wiki":"Nikola_Tesla","p":38},{"fact":"American Civil War","begin":"1861","end":"1865","wiki":"American_Civil_War","p":835},{"fact":"Internal Revenue Service (IRS)","begin":"1862","end":"1862","wiki":"Internal_Revenue_Service","p":129},{"fact":"US National [Central] Banks","begin":"1913","end":"1963","wiki":"","p":0},{"fact":"henry ford","begin":"1863","end":"1947","wiki":"Henry_Ford","p":48},{"fact":"Gandhi","begin":"1869","end":"1948","wiki":"Mahatma_Gandhi","p":123},{"fact":"Freud","begin":"1856","end":"1939","wiki":"Sigmund_Freud","p":140},{"fact":"Ku Klux Klan","begin":"1865","end":"2015","wiki":"Ku_Klux_Klan","p":65},{"fact":"Realpolitik","begin":"1853","end":"1900","wiki":"Realpolitik","p":14},{"fact":"Otto von Bismark","begin":"1815","end":"1898","wiki":"Otto_von_Bismarck","p":79},{"fact":"Glorious Revolution (Spain)","begin":"1868","end":"1868","wiki":"Glorious_Revolution_(Spain)","p":6},{"fact":"Germany\/German-lang unification","begin":"1871","end":"1871","wiki":"Unification_of_Germany","p":40},{"fact":"Italy\/Italian-lang unification","begin":"1870","end":"1931","wiki":"Italian_unification","p":75},{"fact":"First Spanish Republic","begin":"1873","end":"1874","wiki":"First_Spanish_Republic","p":9},{"fact":"Alfonso XII of Spain reign","begin":"1874","end":"1885","wiki":"Alfonso_XII_of_Spain","p":10},{"fact":"Albert Einstein","begin":"1879","end":"1955","wiki":"Albert_Einstein","p":186},{"fact":"Alfonso XIII of Spain reign","begin":"1886","end":"1931","wiki":"Alfonso_XIII_of_Spain","p":22},{"fact":"Keynes","begin":"1883","end":"1946","wiki":"John_Maynard_Keynes","p":58},{"fact":"Hayek","begin":"1899","end":"1992","wiki":"Friedrich_Hayek","p":60},{"fact":"Suez Canal","begin":"1865","end":"1865","wiki":"Suez_Canal","p":91},{"fact":"European Imperialism. Colonial Empire. Colonization of Africa and Asia","begin":"1880","end":"1914","wiki":"Colonial_empire","p":20},{"fact":"Berlin conference","begin":"1885","end":"1885","wiki":"Berlin_Conference","p":22},{"fact":"International Alliance of Women","begin":"1904","end":"1904","wiki":"International_Alliance_of_Women","p":3},{"fact":"US Bank Panic","begin":"1907","end":"1907","wiki":"Panic_of_1907","p":11},{"fact":"Republic of China (first)","begin":"1912","end":"1949","wiki":"Republic_of_China_(1912\u201349)","p":88},{"fact":"Federal Reserve (fed, American Central Bank) creation","begin":"1913","end":"1913","wiki":"Federal_Reserve_System","p":94},{"fact":"WWI","begin":"1914","end":"1918","wiki":"World_War_I","p":1999},{"fact":"Flu pandemic (Spanish influenza)","begin":"1918","end":"1920","wiki":"1918_flu_pandemic","p":39},{"fact":"Treaty of Versailles","begin":"1919","end":"1919","wiki":"Treaty_of_Versailles","p":143},{"fact":"League of Nations","begin":"1920","end":"1946","wiki":"League_of_Nations","p":184},{"fact":"Ottoman Killing of Christians (Armenia)","begin":"1915","end":"1915","wiki":"Armenian_Genocide","p":52},{"fact":"Ottoman Killing of Christians (Assyria)","begin":"1914","end":"1920","wiki":"Assyrian_genocide","p":21},{"fact":"Hitler","begin":"1889","end":"1945","wiki":"Adolf_Hitler","p":334},{"fact":"Musolini","begin":"1905","end":"1905","wiki":"Benito_Mussolini","p":133},{"fact":"Stalin","begin":"1878","end":"1953","wiki":"Joseph_Stalin","p":250},{"fact":"Churchill","begin":"1874","end":"1965","wiki":"Winston_Churchill","p":227},{"fact":"Roosvelt","begin":"1882","end":"1945","wiki":"Franklin_D._Roosevelt","p":325},{"fact":"John F. Kennedy (US President)","begin":"1917","end":"1963","wiki":"John_F._Kennedy","p":222},{"fact":"John Von Newman","begin":"1903","end":"1957","wiki":"John_von_Neumann","p":59},{"fact":"Alan Turing","begin":"1912","end":"1954","wiki":"Alan_Turing","p":41},{"fact":"Chinese Civil War","begin":"1927","end":"1949","wiki":"Chinese_Civil_War","p":88},{"fact":"Great Depression","begin":"1929","end":"1939","wiki":"Great_Depression","p":448},{"fact":"Second Spanish Republic","begin":"1931","end":"1936","wiki":"Second_Spanish_Republic","p":60},{"fact":"Spanish Civil War","begin":"1936","end":"1939","wiki":"Spanish_Civil_War","p":168},{"fact":"Franco","begin":"1892","end":"1975","wiki":"Francisco_Franco","p":101},{"fact":"Spain Franco's Dictatorship","begin":"1939","end":"1975","wiki":"Francoist_Spain","p":60},{"fact":"WWII","begin":"1939","end":"1945","wiki":"World_War_II","p":3954},{"fact":"Bretton Woods system","begin":"1944","end":"1971","wiki":"Bretton_Woods_system","p":38},{"fact":"Mao Zedong in office (Communist China - People's Repulic)","begin":"1949","end":"1974","wiki":"Mao_Zedong","p":126},{"fact":"Hiroshima - Enola Gay and Nagasaki - Attomic Bombs","begin":"1945","end":"1945","wiki":"Atomic_bombings_of_Hiroshima_and_Nagasaki","p":66},{"fact":"IMF creation","begin":"1945","end":"1945","wiki":"International_Monetary_Fund","p":293},{"fact":"world bank creation","begin":"1947","end":"1947","wiki":"World_Bank","p":324},{"fact":"OECD","begin":"1948","end":"1948","wiki":"Organisation_for_Economic_Co-operation_and_Development","p":259},{"fact":"NATO","begin":"1949","end":"1949","wiki":"NATO","p":403},{"fact":"Warsaw Pact","begin":"1955","end":"1991","wiki":"Warsaw_Pact","p":99},{"fact":"Berlin Wall","begin":"1961","end":"1989","wiki":"Berlin_Wall","p":74},{"fact":"Marshall Plan","begin":"1947","end":"1952","wiki":"Marshall_Plan","p":65},{"fact":"Cold War","begin":"1947","end":"1991","wiki":"Cold_War","p":493},{"fact":"USSR","begin":"1922","end":"1991","wiki":"Soviet_Union","p":1624},{"fact":"Ronald Regan","begin":"1911","end":"2004","wiki":"Ronald_Reagan","p":284},{"fact":"Margaret Thatcher","begin":"1925","end":"2013","wiki":"Margaret_Thatcher","p":141},{"fact":"Vietnam War","begin":"1955","end":"1975","wiki":"Vietnam_War","p":421},{"fact":"European Union Formation","begin":"1958","end":"1958","wiki":"European_Union","p":1108},{"fact":"John F. Kennedy (US President) in office","begin":"1961","end":"1963","wiki":"John_F._Kennedy","p":222},{"fact":"Exhorbitant privilege (Gaulle predicting USD crisis)","begin":"1965","end":"1965","wiki":"","p":0},{"fact":"US Black Civil Rigths","begin":"1964","end":"1964","wiki":"Civil_Rights_Act_of_1964","p":61},{"fact":"Richard Nixon (US President) in office","begin":"1969","end":"1974","wiki":"Richard_Nixon","p":228},{"fact":"fiat currency (0% reserve ratio)","begin":"1971","end":"1971","wiki":"Nixon_Shock","p":10},{"fact":"Spanish transition","begin":"1975","end":"1977","wiki":"Spanish_transition_to_democracy","p":20},{"fact":"Spanish Constitution of 1978","begin":"1978","end":"1978","wiki":"Spanish_Constitution_of_1978","p":25},{"fact":"Internet TCP\/IP standardization","begin":"1974","end":"1982","wiki":"Internet","p":549},{"fact":"Japan crisis (asset\/stock price bubble)","begin":"1986","end":"1991","wiki":"Japanese_asset_price_bubble","p":12},{"fact":"Japan crisis lost 2 decades","begin":"1991","end":"2010","wiki":"Lost_Decade_(Japan)","p":10},{"fact":"World Wide Web (internet\/www\/http) release","begin":"1990","end":"1990","wiki":"World_Wide_Web","p":221},{"fact":"Maastricht Treaty","begin":"1992","end":"1992","wiki":"Maastricht_Treaty","p":40},{"fact":"NAFTA","begin":"1994","end":"1994","wiki":"North_American_Free_Trade_Agreement","p":72},{"fact":"WTO Creation","begin":"1995","end":"1995","wiki":"World_Trade_Organization","p":213},{"fact":"ECB","begin":"1998","end":"1998","wiki":"European_Central_Bank","p":54},{"fact":"NATO bombing of Yugoslavia","begin":"1999","end":"1999","wiki":"NATO_bombing_of_Yugoslavia","p":38},{"fact":"George W Bush (US presidnet) in office","begin":"2001","end":"2009","wiki":"George_W._Bush","p":409},{"fact":"US 9\/11 attacks","begin":"2001","end":"2001","wiki":"September_11_attacks","p":373},{"fact":"Euro Currency","begin":"2002","end":"2002","wiki":"Euro","p":371},{"fact":"Iraq War","begin":"2003","end":"2011","wiki":"Iraq_War_(2003\u201311)","p":0},{"fact":"Madrid 11M","begin":"2004","end":"2004","wiki":"2004_Madrid_train_bombings","p":15},{"fact":"London Bombings Al-Quaeda","begin":"2005","end":"2005","wiki":"7_July_2005_London_bombings","p":31},{"fact":"DNIe (Spain)","begin":"2006","end":"2006","wiki":"Electronic_identification","p":0},{"fact":"Lisbon Treaty","begin":"2007","end":"2007","wiki":"Treaty_of_Lisbon","p":52},{"fact":"Financial crisis of 2007-08","begin":"2007","end":"2008","wiki":"Financial_crisis_of_2007\u201308","p":179},{"fact":"Lehman Brothers Bank crash","begin":"2008","end":"2008","wiki":"Bankruptcy_of_Lehman_Brothers","p":0},{"fact":"Arab Spring","begin":"2010","end":"2017","wiki":"","p":0},{"fact":"Syrian Civil war","begin":"2011","end":"2017","wiki":"","p":0},{"fact":"Lybia Crisis","begin":"2011","end":"2017","wiki":"","p":0},{"fact":"Iran, Saudi Arabia tensions (nuclear)","begin":"2012","end":"2016","wiki":"","p":0},{"fact":"Transatlantic Trade and Investment Partnership (TTIP) Euro US Trade Agreement","begin":"2017","end":"2017","wiki":"","p":0}],"health":{"indicator":"population","indicator_sf":"population","last_year":2015,"previous_year":2014,"previous_year2":2013,"previous_year3":2012,"last_lustrum":2011,"last_decade":2006,"last_2decade":1996,"data_source":"wb","data":{"last_year":{"Afghanistan":0.0073461509409261,"Argentina":0.167436558278,"Australia":0.70219922627254,"Belgium":0.5015323631676,"Brazil":0.10643419180959,"Canada":0.5391469849411,"Switzerland":0.99998753346177,"China":0.09878053496657,"Germany":0.51384638618005,"Denmark":0.6482743374592,"Egypt":0.04505091221167,"Spain":0.32201794179614,"European Union":0.3969618227777,"Finland":0.52259476116462,"France":0.45187685755487,"United Kingdom":0.54519911851629,"Greece":0.22482846088148,"Indonesia":0.041706642073761,"India":0.01970447211192,"Italy":0.37207692064463,"Japan":0.40486597764979,"South Korea":0.33934570370516,"Mexico":0.11230183216459,"Netherlands":0.5539183918529,"Norway":0.93166883373997,"Pakistan":0.017802074929385,"Poland":0.15575027387605,"Portugal":0.23963099497893,"Russian Federation":0.1128983796768,"Saudi Arabia":0.25532399452353,"Sweden":0.6267170805998,"Turkey":0.1138073524338,"United States":0.69607904340058,"World":0.12471402230257,"South Africa":0.070943164165001},"previous_year":{"Afghanistan":0.006496456514092,"Argentina":0.12649056410566,"Australia":4.6363031427206,"Belgium":3.4854665055294,"Brazil":4.1203719026872,"Canada":5.5150839747142,"Switzerland":4.8786831385179,"China":3.077864235153,"Germany":5.4902611601002,"Denmark":5.6294785603341,"Egypt":0.034534717112548,"Spain":2.3050147709606,"European Union":4.3738548182517,"Finland":4.5117902642362,"France":4.4366823985472,"United Kingdom":5.474983667064,"Greece":2.2219687878157,"Indonesia":2.0359088494618,"India":2.0161738928867,"Italy":3.3610670143821,"Japan":4.3710540715214,"South Korea":5.2872671429526,"Mexico":2.1062285298285,"Netherlands":5.5351312729965,"Norway":5.9999897361902,"Pakistan":2.0134893929429,"Poland":4.1471440958994,"Portugal":3.2270700327304,"Russian Federation":4.1426786866937,"Saudi Arabia":4.2504930806372,"Sweden":4.6045279280398,"Turkey":0.10574699402692,"United States":5.5583251850007,"World":4.1103753486655,"South Africa":0.066418150362668},"previous_year2":{"Afghanistan":0.0063389829016026,"Argentina":4.1265780755582,"Australia":4.6573840950992,"Belgium":3.4530295491372,"Brazil":4.1172940137948,"Canada":5.5078705153287,"Switzerland":4.8227376835441,"China":2.0679314382742,"Germany":5.4431015619755,"Denmark":5.5865366203971,"Egypt":0.031711556378388,"Spain":3.285390532614,"European Union":4.3440029333276,"Finland":4.4823327888064,"France":4.4136625986807,"United Kingdom":4.4109776632428,"Greece":2.2122399278415,"Indonesia":2.0352799275624,"India":2.0141404671704,"Italy":3.3436639154731,"Japan":5.3745847346904,"South Korea":5.2526165693967,"Mexico":2.0990807643526,"Netherlands":4.4996974210496,"Norway":4.9999902828124,"Pakistan":2.0123866228833,"Poland":4.1338586777826,"Portugal":4.2100635890879,"Russian Federation":4.1510313102077,"Saudi Arabia":4.2394802904448,"Sweden":3.5857738838594,"Turkey":2.1049393870716,"United States":5.511700247743,"World":4.1033933032446,"South Africa":0.066861973127935},"previous_year3":{"Afghanistan":0.0067922162231992,"Argentina":4.1283854965058,"Australia":5.6660362124419,"Belgium":3.4404472382085,"Brazil":4.119691463556,"Canada":5.5168607198049,"Switzerland":4.8192659813367,"China":2.0616720709546,"Germany":5.4333234238878,"Denmark":4.5722946612453,"Egypt":0.03175476369799,"Spain":2.2820578069473,"European Union":3.3362375233871,"Finland":4.4668455227715,"France":4.40208286386,"United Kingdom":4.4065774849894,"Greece":3.2189924288737,"Indonesia":2.0364256465702,"India":2.014210456684,"Italy":2.3427713192961,"Japan":4.4598100184583,"South Korea":4.2407648723687,"Mexico":2.0956991663152,"Netherlands":4.4871199483882,"Norway":5.9999901539627,"Pakistan":2.0124589860822,"Poland":3.1293872283913,"Portugal":3.2025960268789,"Russian Federation":4.1492016525523,"Saudi Arabia":3.2449909668382,"Sweden":4.562534405127,"Turkey":2.1037611869131,"United States":4.506401851592,"World":4.1032820010441,"South Africa":0.074721856709391},"last_lustrum":{"Afghanistan":0.006178264279134,"Argentina":4.1272601236229,"Australia":4.6185978085061,"Belgium":3.4742605164154,"Brazil":4.1296356594425,"Canada":4.5178500173852,"Switzerland":5.8749839121725,"China":2.0554131801683,"Germany":5.4567241133762,"Denmark":4.6095251278115,"Egypt":0.027995661552176,"Spain":2.3164921796445,"European Union":3.3603368244336,"Finland":4.5049615289021,"France":3.4355597795476,"United Kingdom":4.4078481644408,"Greece":2.2576549970905,"Indonesia":2.0362577416863,"India":2.0144634857815,"Italy":2.38112111038,"Japan":4.4596462191225,"South Korea":4.2401670562912,"Mexico":2.0967364297071,"Netherlands":4.5323013943,"Norway":5.9999900571829,"Pakistan":2.0122278299149,"Poland":3.1381071388828,"Portugal":3.2306111251754,"Russian Federation":4.141298178632,"Saudi Arabia":3.2312211632996,"Sweden":4.5925191679582,"Turkey":2.104771790549,"United States":3.4949613981156,"World":4.1033191088936,"South Africa":0.080342110406485},"last_decade":{"Afghanistan":0.0037677499179608,"Argentina":1.0796559705335,"Australia":4.4868650937705,"Belgium":3.5242058934049,"Brazil":1.078356125984,"Canada":5.5449081091397,"Switzerland":5.7737726805558,"China":3.0280805756824,"Germany":4.4917630877519,"Denmark":5.7021549702552,"Egypt":0.018999981506748,"Spain":3.3842909784232,"European Union":3.4143243015863,"Finland":5.5548113678842,"France":4.4930669616098,"United Kingdom":4.5738849094292,"Greece":2.3346186216788,"Indonesia":1.0214421426125,"India":2.0110063699585,"Italy":4.4507843853673,"Japan":5.459760078091,"South Korea":4.2822116400927,"Mexico":4.1169179081413,"Netherlands":5.5997861814723,"Norway":4.9999865073995,"Pakistan":2.0118188583714,"Poland":3.1214163988066,"Portugal":4.2674293411296,"Russian Federation":2.0933579258082,"Saudi Arabia":3.2000401710926,"Sweden":5.6241065993616,"Turkey":0.10424750692689,"United States":4.6265433025149,"World":4.1044237211569,"South Africa":0.07646778559226},"last_2decade":{"Afghanistan":null,"Argentina":3.1648265179,"Australia":3.4702143557631,"Belgium":3.5943105870578,"Brazil":2.1103547965184,"Canada":4.4544559735765,"Switzerland":5.999978545404,"China":2.0151475834846,"Germany":4.6557221331395,"Denmark":4.764850432123,"Egypt":0.022794079679982,"Spain":2.3483319216054,"European Union":3.4310103857394,"Finland":4.5530274244919,"France":3.5795800113385,"United Kingdom":3.4819026096992,"Greece":2.2949602559077,"Indonesia":2.0243781203888,"India":2.0087372077371,"Italy":2.4938654715685,"Japan":5.8028709755498,"South Korea":4.2843514355243,"Mexico":2.0886247674425,"Netherlands":5.6156968295925,"Norway":5.8006950342763,"Pakistan":1.0107862863654,"Poland":1.087230998006,"Portugal":4.2614041680719,"Russian Federation":1.0567023022627,"Saudi Arabia":4.1750476338729,"Sweden":4.6991251304628,"Turkey":1.0654686592365,"United States":4.6450802912237,"World":4.1160800975794,"South Africa":0.079149833721331},"data_source":"cult","indicator":"health","indicator_sf":"health(cult score)"}}};

var alive_timeout=null;


var activity_timer=new ActivityTimer();
var user_data={};
var session_data={
	user: null,
    type: "qa",
	level: "normal",
	timestamp: "0000-00-00 00:00",
    alive_beat: 0,
    last_zombie_check: 0,
	num_correct: 0,
	num_answered: 0,
	result: 0,
    action: 'send_session_data_post',
	details: []
};
// GAME
var data_source="wb";
var data_not_loaded_yet=9999;
var json_data_files=undefined;
var indicator_list=[];
var country_list=[];
var period_list=[];
var fact_list=[];
var fact_map={};
var period_map={};
var lifes=3;
var dificulty='normal'; // easy, difficult
var zombies_beat={};
var zombies_to_kill=[];


var connection_mode="unset";
var header_zone=document.getElementById('header');
var header_text=undefined;
var canvas_zone=document.getElementById('zone_canvas');
var canvas_zone_vcentered=document.getElementById('zone_canvas_vcentered');
var canvas_zone_answers;
var canvas_zone_question;

var dom_score_correct;
var dom_score_answered;
var correct_answer='undefined';
var answer_msg="";
var show_answer_timeout;
var internet_access=true;

function check_internet_access(){ // ENTRY-POINT
    console.log('entry-point cult.js');
    if(navigator.onLine) set_internet_access_true();
    else set_internet_access_false();
}
var set_internet_access_true=function(){
    console.log('internet access');
    internet_access=true;
    if(is_local()){connection_mode="local-online";}
    else{connection_mode="online";}
    menu_screen();
}
var set_internet_access_false=function(){
    internet_access=false;
    connection_mode="offline";
	allowBackExit();
   	var splash=document.getElementById("splash_screen");
	if(splash!=null){ splash.parentNode.removeChild(splash); }
	canvas_zone_vcentered.innerHTML=' \
		<div id="menu-logo-div"></div> \
		<nav id="responsive_menu">\
		<br />NO INTERNET \
		<br /><button id="retry-button" class="coolbutton">Retry</button> \
        </nav>\
        ';
        document.getElementById("retry-button").addEventListener(clickOrTouch,function(){check_internet_access();});
}

function login_screen(){
    canvas_zone_vcentered.innerHTML=' \
      <div id="footer">\
          Nombre jugador: <input id="text" pattern="[a-zA-Z0-9]+" /><br />\
        <button id="button">Jugar</button>\
      </div>\
        ';
    document.getElementById("text").addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("button").click();
        }
    });
    document.getElementById('button').addEventListener('click', function(evt) {
        var username=document.getElementById('text').value.toLowerCase().trim();
        var username_clean = username.replace(/[^a-z0-9]/gi,'');
        if(username_clean.length==0){
            alert("\""+username+"\" no es válido. Use letras sin acento y números.")
        }else{
            session_data.user=username_clean;
            firebase.database().ref().child('users/'+username_clean).once('value', function(snapshot) {crear_usurio_si_disponible(snapshot.val());});
        }
    });
}
function crear_usurio_si_disponible(existente) {
    if(existente!=undefined && existente!=null && existente!='null' && existente!=""){
        alert('el nombre '+session_data.user+' ya existe, elige otro');
        session_data.user="";
    }else{
        var updates = {};
        updates['users/'+session_data.user] = get_timestamp_str();
        firebase.database().ref().update(updates);
        menu_screen();
    }
}

function handle_alive(){
    session_data.alive_beat++;
    alive_timeout=setTimeout(function(){handle_alive();}.bind(this),7000); // put it again alive (otherwise use interval...)
    var updates={};
    updates['challenges/'+nombre_partida+'/u/'+session_data.user+'/alive_beat'] = session_data.alive_beat;
    firebase.database().ref().update(updates);
    // what if this does not exist??? we should clear the timeout...
}


var EASY_FORBIDDEN_INDICATORS=['lifeexpect', 'unemployed'];
var NORMAL_FORBIDDEN_INDICATORS=['popdensity','employed','surpdeficitgdp','reserves','inflation','gdp','gdppcap','gdpgrowth','extdebt','debtgdp','pop65','laborforce','p15to64','popgrowth'];
var DIFFICULT_FORBIDDEN_INDICATORS=[];

// Pagerank or inlinks normalized to 0-10000
var POPULARITY_MIN={
    easy: 120,
    normal: 50,
    difficult: 0
};

var YEAR_DIFF_RANGE={
    easy: {min:150,max:250},
    normal: {min:50,max:150},
    difficult: {min:1,max:50}
};

var TIMES_BIGGER_MIN={
    easy: 1.51,
    normal: 1.25,
    difficult: 1.05
};

var match_level_forbidden_indicators=function(level,indicator){
	if(level=='easy' && (EASY_FORBIDDEN_INDICATORS.indexOf(indicator)!=-1
		|| !match_level_forbidden_indicators('normal',indicator)))
		return false;
	if(level=='normal' && (NORMAL_FORBIDDEN_INDICATORS.indexOf(indicator)!=-1
		|| !match_level_forbidden_indicators('difficult',indicator)))
		return false;
	if(level=='difficult' && DIFFICULT_FORBIDDEN_INDICATORS.indexOf(indicator)!=-1)
		return false;
	return true;
}

var match_level_times_bigger_margin=function(level, times_bigger){
	//console.log(level+"  "+times_bigger);
	if(times_bigger<TIMES_BIGGER_MIN[level]) return false;
	return true;
}

var match_level_year_diff_range=function(level, year_diff){
	if(year_diff>=YEAR_DIFF_RANGE[level].min && year_diff<=YEAR_DIFF_RANGE[level].max) return true;
	return false;
}

var match_level_history_pop=function(level, fact){
	if(fact.p>=POPULARITY_MIN[level]) return true;
	return false;
}





function menu_screen(){
	allowBackExit();
    console.log('menu screen');
    dbRefChat.off();
    lifes=3;
    
	var splash=document.getElementById("splash_screen");
	if(splash!=null){ splash.parentNode.removeChild(splash); }

	console.log('menu_screen user: '+session_data.user);
	if(connection_mode=="unset"){
        canvas_zone_vcentered.innerHTML='...waiting for session state...';
	}else if(session_data.user==null){
		login_screen();
	}else{
        if(!listening_private_challenges){
            firebase.database().ref().child('challenges-private/'+session_data.user).on('value', function(snapshot) {listen_user_private_challenge(snapshot.val());});
            listening_private_challenges=true;
        }
		hamburger_menu_content.innerHTML=''+get_reduced_display_name(session_data.user)+'<ul>\
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
		if(indicator_list.length==0){
            indicator_list=Object.keys(data_map);
            indicator_list.splice(indicator_list.indexOf('history'));
        } 
        if(country_list.length==0) load_country_list_from_indicator('population');
        if(period_list.length==0) load_period_list_from_indicator_ignore_last_year('population');
        if(fact_list.length==0) load_fact_list_and_map();
	}
}

function crear_partida(){
    canvas_zone_vcentered.innerHTML=' \
      <div id="footer">\
          Nombre partida: <input id="text" pattern="[a-zA-Z0-9]+" /><br />\
        <button id="create">Crear</button>\
      </div>\
        <br /><button id="go-back" class="minibutton fixed-bottom-right go-back">&lt;</button> \
        ';
    document.getElementById("text").addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("create").click();
        }
    });
    document.getElementById('create').addEventListener('click', function(evt) {
        nombre_partida=document.getElementById('text').value.toLowerCase().trim();
        nombre_partida = nombre_partida.replace(/[^a-z0-9]/gi,'');
        if(nombre_partida.length==0){alert("indicar nombre")}
        else{
            firebase.database().ref().child('challenges/'+nombre_partida).once('value', function(snapshot) {crear_partida_si_disponible(snapshot.val());});
        }
    });
    document.getElementById("go-back").addEventListener(clickOrTouch,function(){menu_screen();});
}

function crear_partida_si_disponible(partida_existente) {
    if(partida_existente!=undefined && partida_existente!=null && partida_existente!='null' && partida_existente!=""){
        alert('el nombre ya existe, elige otro');
    }else{
        activity_timer.set_end_callback(silly_cb_challenge);
        var challange_instance={
            // modified by the game
            time_left: 60,
            timestamp: get_timestamp_str(),
            question: '',
            answer_options: ['',''],
            answer_msg: '',
            game_status:'waiting',
            // modified by each user, avoid concurrent mod overwritting
            u:{}
        };
        challange_instance.u[session_data.user]= {
                    role: 'inviter',
                    score: 0,
                    lifes: 3,
                    answer: ''
                };

        var updates = {};
        updates['challenges/'+nombre_partida] = challange_instance;
        updates['challenges-private/'+session_data.user] = nombre_partida;
        firebase.database().ref().update(updates);
    }
}




function unirse_a_partida(){
    canvas_zone_vcentered.innerHTML=' \
      <div id="footer">\
          Nombre partida: <input id="text" pattern="[a-zA-Z0-9]+" /><br />\
        <button id="join">Unirse</button>\
      </div>\
        <br /><button id="go-back" class="minibutton fixed-bottom-right go-back">&lt;</button> \
        ';
    document.getElementById("text").addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("join").click();
        }
    });
    document.getElementById('join').addEventListener('click', function(evt) {
        nombre_partida=document.getElementById('text').value.toLowerCase().trim();
        nombre_partida = nombre_partida.replace(/[^a-z0-9]/gi,'');
        document.getElementById('join').value
        if(nombre_partida.length==0){alert("indicar nombre")}
        else{
            firebase.database().ref().child('challenges/'+nombre_partida).once('value', function(snapshot) {unirse_partida_si_disponible(snapshot.val());});
        }
    });
    document.getElementById("go-back").addEventListener(clickOrTouch,function(){menu_screen();});
}

function unirse_partida_si_disponible(partida_existente) {
    if(partida_existente!=undefined && partida_existente!=null && partida_existente!='null' && partida_existente!="" && partida_existente.game_status=="waiting"){
        var updates = {};
        updates['challenges-private/'+session_data.user] = nombre_partida;
        var user_instance={
                role: 'invitee',
                score: 0,
                lifes: 3,
                alive_beat: session_data.alive_beat,
                answer: ''
        }
        updates['challenges/'+nombre_partida+'/u/'+session_data.user]=user_instance;
        firebase.database().ref().update(updates);
    }else{
        alert('el nombre no existe ¿está bien?');
    }
}


var countdown_limit_end_secs=30;
var silly_cb=function(){
	activity_timer.stop();
	if(debug) console.log("question timeout!!!");
	check_correct("timeout","incorrect","Timeout! You have not answered");
}
var silly_cb_challenge=function(){
	activity_timer.stop();
	if(debug) console.log("question timeout!!!");
	check_correct_challenge("timeout");
}
var tricker_cb=function(){
	if(debug) console.log("tricker progress "+activity_timer.seconds);
	document.getElementById("time_left").value=activity_timer.seconds;
	if(activity_timer.seconds==countdown_limit_end_secs-3){
		// blink background
		// change progress color to red
		console.log("progress-red...");
		document.getElementById("time_left").classList.add("progress-red");
	}
}
activity_timer.set_tricker_callback(tricker_cb);
activity_timer.set_limit_end_seconds(countdown_limit_end_secs); 
activity_timer.set_end_callback(silly_cb);

var end_game=function(){
    alert('this will ask if you want to store your session (save game to continue later or exit?)');
	activity_timer.stop();
	activity_timer.reset();
	menu_screen();
}








function listen_user_private_challenge(challange_id) {
    if(challange_id!=undefined && challange_id!=null && challange_id!='null' && challange_id!=""){
        console.log('challange_id '+challange_id);
        // CORE POINT //////////////////////////////////////////////////////////////////////////777777777
        dbRefChallenge=firebase.database().ref().child('challenges/'+challange_id); // get ref to the created challenge
        dbRefChallengeKey=challange_id; // store the ref
        dbRefChallenge.on('value', function(snapshot) {listen_challenge(snapshot.val());}); // listen to changes
        alive_timeout=setTimeout(function(){handle_alive();}.bind(this),7000); // produce beat for this user
        /////////////////////////////////////////////////////////////////////////////////////////777777777
    }else{
            console.log('challange_id undefined. No games started with this user!');
			var updates = {};
			updates['challenges-private/'+firebaseCodec.encodeFully(session_data.user)] = null;
			firebase.database().ref().update(updates);
            // remove usr-name and challenge
            var tmpRef=firebase.database().ref().child('challenges/'+nombre_partida);
            nombre_partida="";
            tmpRef.remove();
            tmpRef.off();
            tmpRef=null;
            if(!session_data.user.includes("gmail.com")){
                //tmpRef=firebase.database().ref().child('users/'+session_data.user);
                //tmpRef.remove()
                //tmpRef.off();
                //tmpRef=null;
                //session_data.user=null;
                // clean just in case...?? re-program this...
                //tmpRef=firebase.database().ref().child('challenges-private/'+session_data.user);
                //tmpRef.remove()
                //tmpRef.off();
                //tmpRef=null;
                clearTimeout(show_answer_timeout);
                clearTimeout(alive_timeout);
                zombies_beat={};
                zombies_to_kill=[];
            }
        remove_modal();
        menu_screen();
    }
}

function listen_challenge(challenge){
    session_data.challenge=challenge;
    console.log('challenge:'+JSON.stringify(challenge));
    if(challenge==null || challenge==undefined){
        var header_status=document.getElementById('header_status');
        header_status.innerHTML='';
        /////// re-implement this
        clearTimeout(show_answer_timeout);
        clearTimeout(alive_timeout);
        zombies_beat={};
        zombies_to_kill=[];
        activity_timer.reset();
        if(session_data.mode!="test") remove_modal();
        ///////
        dbRefChallenge.off();
        dbRefChallenge=undefined;
        dbRefChallengeKey=undefined;
        console.log('challenge canceled!');
        //alert('challenge canceled!');
        menu_screen();
    }else if(challenge.game_status=='over'){
        reset_local_game();

        /////// re-implement this
        clearTimeout(show_answer_timeout);
        clearTimeout(alive_timeout);
        zombies_beat={};
        zombies_to_kill=[];


        activity_timer.reset();
        if(session_data.mode!="test"){ remove_modal();}
        ///////
        dbRefChallenge.off();
        dbRefChallenge=undefined;
        dbRefChallengeKey=undefined;
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
			updates['challenges-private/'+firebaseCodec.encodeFully(session_data.user)] = null;
			firebase.database().ref().update(updates);
            // remove usr-name and challenge
            var tmpRef=firebase.database().ref().child('challenges/'+nombre_partida);
            nombre_partida="";
            tmpRef.remove()
            tmpRef.off();
            tmpRef=null;
            if(!session_data.user.includes("gmail.com")){
                tmpRef=firebase.database().ref().child('users/'+session_data.user);
                tmpRef.remove()
                tmpRef.off();
                tmpRef=null;
                tmpRef=firebase.database().ref().child('challenges-private/'+session_data.user);
                session_data.user=null;
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
        if(session_data.last_zombie_check!=challenge.u[session_data.user].alive_beat){
            session_data.last_zombie_check=challenge.u[session_data.user].alive_beat;
            handle_zombies(challenge); // if someone is no longer alive, kill user and make next invitee inviter
        }else{
            console.log("zombies already checked");
        }
        if(challenge.game_status=='waiting'){
            reset_local_game();
            activity_timer.set_end_callback(silly_cb_challenge);
            var accept_button='';
            //var updates = {};
            if(session_data.user==get_session_master(challenge) && Object.keys(challenge.u).length>1){
                accept_button='<button id="start_challenge">start</button>';
            }
            //firebase.database().ref().update(updates);
            //challenge:'+JSON.stringify(challenge)+'
            var somos="";
            for (var user in challenge.u){
                if(user!=session_data.user) somos+="<li>"+user+"</li>";
                else somos+=""+user+" (tú)<br />"
            }
            canvas_zone_vcentered.innerHTML=' \
              PARTIDA: '+nombre_partida+'<br />...esperando... <br/>de momento somos:<br/>'+somos+'<br />\
              '+accept_button+'\
            <br /><button id="go-back" class="minibutton fixed-bottom-right go-back">&lt;</button> \
            ';
            console.log('session-master:'+get_session_master(challenge));
            if(session_data.user==get_session_master(challenge) && Object.keys(challenge.u).length>1){
                document.getElementById("start_challenge").addEventListener(clickOrTouch,function(){
                    var updates = {};
                    updates['challenges/'+dbRefChallengeKey+'/game_status'] = 'playing';
                    firebase.database().ref().update(updates);
                    });
            }
            document.getElementById("go-back").addEventListener(clickOrTouch,function(){cancel_challenge(challenge);}.bind(challenge));
        }else if(challenge.game_status=='playing'){
            if(session_data.user==get_session_master(challenge)){
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
            if(challenge.u[session_data.user].answer!='' || challenge.u[session_data.user].lifes<=0){
                document.getElementById('enemy_answer').innerHTML=get_enemies_life_answer_representation(challenge);
            }
            if(all_answered(challenge)){
                // do the checking and trigger a timeout to trigger playing again
                // TODO do something more fancy (like showing what each person answered ...)
                //diff_country_question_challenge(random_item(indicator_list),challenge);
                if(session_data.user==get_session_master(challenge)){
                    setTimeout(function(){
                        var updates = {};
                        updates['challenges/'+dbRefChallengeKey+'/game_status'] = 'playing';
                        for(var u in challenge.u) {
                            if ( challenge.u.hasOwnProperty(u)) {
                                updates['challenges/'+dbRefChallengeKey+'/u/'+u+'/answer'] = '';
                            }
                        }
                        firebase.database().ref().update(updates);
                    }, 4000);
                }
            }else if(challenge.question!=null && challenge.question!='' && all_unanswered(challenge)){
                /////// re-implement this
                clearTimeout(show_answer_timeout);
                activity_timer.reset();
                if(session_data.mode!="test") remove_modal();
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
                dom_score_correct.innerHTML=challenge.u[session_data.user].score;

                activity_timer.start();
                canvas_zone_question.innerHTML=challenge.question;
                //var possible_answers=''; //for(var a=0;a<challenge.answers.length;a++)
                canvas_zone_answers.innerHTML='\
                <div id="answer-'+challenge.answer_options[0]+'" class="answer aleft coolbutton">'+challenge.answer_options[0]+'</div>\
                <div id="answer-'+challenge.answer_options[1]+'" class="answer aright coolbutton">'+challenge.answer_options[1]+'</div>\
                ';
                if(challenge.u[session_data.user].lifes>0){
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
                                        <b>You</b><span style="color:red">[X]</span> ('+get_lifes_representation(challenge.u[session_data.user].lifes)+')<br />\
                                        <span id="enemy_answer">'+get_enemies_life_answer_representation(challenge)+'</span></div>');
                }
            }
        }
    }
}



var get_session_master=function(challenge){
    return Object.keys(challenge.u).sort()[0];
}


var get_role=function(role,challenge){
    var ret="???";
    for (var user in challenge.u){
        if(challenge.u[user].role==role) ret=user;
    }
    return ret;
}


function get_challenge_zombies_beat(challenge){
    console.log("get_challenge_zombies_beat calc");
    console.log(challenge);
    var ret={};
    for (var user in challenge.u){
        ret[user]=challenge.u[user].alive_beat;
    }
    return ret;
}

var get_winner_string=function(challenge){
    var winner=session_data.user;
    var tie="";
    for (var user in challenge.u) {
        if(challenge.u[user].score>challenge.u[winner].score){ winner=user; tie="";}
        else if(challenge.u[user].score==challenge.u[winner].score) tie="tie";
    }
    return winner;
}


function two_alive(challenge){
    var alive=0;
    for (var user in challenge.u){
        if(challenge.u[user].lifes>0) alive++;
    }
    console.log('alive: '+alive+' of '+Object.keys(challenge.u).length);
    if(alive>=2) return true;
    else return false;
}


function cancel_challenge(challenge){
    // TODO if game status not just "waiting"
    var r = confirm("¿Seguro que quieres salir, el juego parará para todos los jugadores?");
    if (r == true) {
        var updates = {};
        console.log('canceling '+JSON.stringify(challenge));
        for (var user in challenge.u){
            updates['challenges-private/'+firebaseCodec.encodeFully(user)] = null;
        }
        console.log('updates '+JSON.stringify(updates));
        updates['challenges/'+dbRefChallengeKey] = null;
        firebase.database().ref().update(updates);
    }
}

function finish_challenge(challenge){
    var updates = {};
    console.log('game over '+JSON.stringify(challenge));
	// to be done by each user (so game over is shown for both)
    //for (var user in challenge.u){
    //    updates['challenges-private/'+firebaseCodec.encodeFully(user)] = null;
    //}
    console.log('updates '+JSON.stringify(updates));
    challenge.game_status='over';
    updates['challenges/'+dbRefChallengeKey] = challenge;
    firebase.database().ref().update(updates);
}


function all_answered(challenge){
    for (var user in challenge.u){
        if(challenge.u[user].lifes>0 && (challenge.u[user].answer==undefined || challenge.u[user].answer==null || challenge.u[user].answer=='')) return false;
    }
    console.log('all answered true');
    return true;
}

function all_unanswered(challenge){
    for (var user in challenge.u){
        if(challenge.u[user].answer!='') return false;
    }
    console.log('all unanswered true');
    return true;
}


// instead of showing the result for you it could show empty screen and only the db change trigger the result show...
function get_enemies_life_answer_representation(challenge){
    var representation=[];
    for (var user in challenge.u){
        var color="black";
        var answer="waiting";
        var bold="";
        if(user!=session_data.user){
                //bold=";font-weight: bold";
            
            if(challenge.u[user].answer!=""){
                if(challenge.u[user].answer==challenge.correct_answer){color="green";answer="V";}
                else{color="red";answer="X";}
            }
            representation.push(''+user+'<span style="color:'+color+''+bold+'">['+answer+']</span> ('+get_lifes_representation(challenge.u[user].lifes)+')');
        }
    }
    return representation.join('<br /> ');
}

function get_lifes_representation(lif){
	var lifes_representation='';
	for (var i=0;i<lif;i++){
		lifes_representation+="&#9825; ";
	}
    return lifes_representation.trim();
}

function update_lifes_representation(){
	var elem_lifes=document.getElementById('current_lifes');
	elem_lifes.innerHTML=get_lifes_representation(lifes)+" ";
}


var history_question_challenge=function(challenge){
	console.log("history question");
	var fact1=random_item(data_map.history);
    while(!match_level_history_pop(session_data.level,fact1)){
        console.log("fact "+fact1.wiki+" popularity="+fact1.p+" does not match level "+session_data.level);
        fact1=random_item(data_map.history);
    }
    var fact2=random_item(data_map.history,fact1.fact);
    var year_diff=Math.abs(Number(fact1.begin) - Number(fact2.begin));
    var unblocker=0;
    while(!match_level_history_pop(session_data.level,fact2) || !match_level_year_diff_range(session_data.level,year_diff)){
        console.log("fact "+fact2.wiki+" popularity="+fact2.p+" or "+year_diff+" does not match level "+session_data.level);
        fact2=random_item(data_map.history);
        year_diff=Math.abs(Number(fact1.begin) - Number(fact2.begin));
        unblocker++;
        if(unblocker>100){
            history_question_challenge(challenge);
            return;
        }
    }
    // Makes sense to discard overlaps since the question is "what was before"
    // and not "what satrted before" or "what ended before"
    if(! (fact1.end<fact2.begin || fact2.end<fact1.begin)){
        console.log("USLESS: overlapping facts "+fact1.fact+" "+fact2.fact+"");
        history_question_challenge(challenge); return;
    }

    challenge.correct_answer=fact1.fact;
    if(Number(fact2.end) < Number(fact1.begin)){
		challenge.correct_answer=fact2.fact;
		challenge.answer_msg='<br /><span>'+fact2.fact+'</span> (<b>'+fact2.begin+'</b> <--> '+fact2.end+')<br />was before<br /><span>'+fact1.fact+'</span> (<b>'+fact1.begin+'</b> <--> '+fact1.end+')<br />';
    }else{
		challenge.answer_msg='<br /><span>'+fact1.fact+'</span> (<b>'+fact1.begin+'</b> <--> '+fact1.end+')<br />was before<br /><span>'+fact2.fact+'</span> (<b>'+fact2.begin+'</b> <--> '+fact2.end+')<br />';
    }

    //update challenge
    var updates = {};
    updates['challenges/'+dbRefChallengeKey+'/game_status'] = 'waiting_answers';
    updates['challenges/'+dbRefChallengeKey+'/question'] = 'What was before?';
    updates['challenges/'+dbRefChallengeKey+'/correct_answer'] = challenge.correct_answer;
    updates['challenges/'+dbRefChallengeKey+'/answer_options'] = [fact1.fact,fact2.fact];
    updates['challenges/'+dbRefChallengeKey+'/answer_msg'] = challenge.answer_msg;
    firebase.database().ref().update(updates);
}


function check_correct_challenge(clicked_answer){
    var updates = {};
    var challenge=session_data.challenge;
    // TODO handle all time-outs to check if someone might have left
    // What happens if the host leaves? how will others notice? create a game timeout or something
    activity_timer.stop();
    document.getElementById("time_left").value=0;
    document.getElementById("time_left").classList.remove("progress-red");
	if(typeof(challenge.answer_msg)==='undefined') challenge.answer_msg="";
	var activity_results={};
	var timestamp=new Date();
	var timestamp_str=timestamp.getFullYear()+"-"+
		pad_string((timestamp.getMonth()+1),2,"0") + "-" + pad_string(timestamp.getDate(),2,"0") + " " +
		 pad_string(timestamp.getHours(),2,"0") + ":"  + pad_string(timestamp.getMinutes(),2,"0") + 
			":"  + pad_string(timestamp.getSeconds(),2,"0");
	if(typeof clicked_answer != "string"){
		alert("ERROR: Unexpected answer... non-string");
	}
	/*activity_results.choice=clicked_answer;*/
	if (clicked_answer==challenge.correct_answer){
		session_data.num_correct++;
        challenge.u[session_data.user].score++;
        updates['challenges/'+dbRefChallengeKey+'/u/'+session_data.user+'/score'] = challenge.u[session_data.user].score;
		//activity_results.result="correct";
		if(session_data.mode!="test"){
			//audio_sprite.playSpriteRange("zfx_correct");
			dom_score_correct.innerHTML=session_data.num_correct;
			open_js_modal_content('<div class="js-modal-correct"><h1>CORRECT</h1>'+challenge.answer_msg+'<br />\
            '+clicked_answer+' (correct)<br />\
            <b>You</b><span style="color:green">[V]</span> ('+get_lifes_representation(challenge.u[session_data.user].lifes)+')<br />\
            <span id="enemy_answer">'+get_enemies_life_answer_representation(challenge)+'</span></div>');
		}
	}else{
		activity_results.result="incorrect";
        challenge.u[session_data.user].lifes--;
        lifes=challenge.u[session_data.user].lifes;
        updates['challenges/'+dbRefChallengeKey+'/u/'+session_data.user+'/lifes'] = challenge.u[session_data.user].lifes;
		//update_lifes_representation();
		if(session_data.mode!="test"){
			//audio_sprite.playSpriteRange("zfx_wrong"); // add a callback to move forward after the sound plays... <br />Correct answer: <b>'+challenge.correct_answer+'</b>
			open_js_modal_content('<div class="js-modal-incorrect"><h1>INCORRECT</h1> <br />'+challenge.answer_msg+'<br />\
                                    correct: '+challenge.correct_answer+'<br />\
                                    '+clicked_answer+' (incorrect)<br />\
                                    <b>You</b><span style="color:red">[X]</span> ('+get_lifes_representation(challenge.u[session_data.user].lifes)+')<br />\
                                    <span id="enemy_answer">'+get_enemies_life_answer_representation(challenge)+'</span></div>');
		}
	}
    
  
    //session_data.details.push(activity_results);
    session_data.num_answered++;
    updates['challenges/'+dbRefChallengeKey+'/u/'+session_data.user+'/answer'] = clicked_answer;
    firebase.database().ref().update(updates);
	//dom_score_answered.innerHTML=session_data.num_answered;
	//var waiting_time=1000;
	//if(session_data.mode!="test") waiting_time=120000; 
	//show_answer_timeout=setTimeout(function(){nextActivity()}, waiting_time);
}




function handle_zombies(challenge) {
    var challenge_zombies_beat=get_challenge_zombies_beat(challenge);
    console.log("zimbie beat monitoring");
    if(zombies_beat==null || Object.keys(zombies_beat).length!=Object.keys(challenge_zombies_beat).length){ // initialize
        zombies_beat=challenge_zombies_beat;
        console.log("initialize");
    }else{ // compare local to global
        for (var user in challenge.u){
            if(user!=session_data.user){
                console.log("is "+user+" a zombie "+challenge.u[user].alive_beat+" "+zombies_beat[user]+"? to kill "+zombies_to_kill.join(", "));
                if(challenge.u[user].alive_beat==zombies_beat[user]){
                    if(zombies_to_kill.indexOf(user)==-1){
                        console.log("candidate");
                        zombies_to_kill.push(user);
                    }else{
                        console.log("yes, who should kill?\n\n");
                        // are there session_masters before me who could kill zombies?
                        var leader=get_session_master(challenge);
                        if(user==leader){
                            for (var new_leader in challenge.u){
                                if(zombies_to_kill.indexOf(new_leader)==-1){
                                    leader=new_leader;
                                    break;
                                }
                            }
                        }
                        if(leader==session_data.user){
                            // the session_master is automated. Kill zombies
                            console.log("I"+session_data.user+" will kill the zombie!! "+user);
                            // delete user, delete challenge-private, and cleanup session
                            var tmpRef=firebase.database().ref().child('users/'+user);
                            tmpRef.remove()
                            tmpRef=null;
                            tmpRef=firebase.database().ref().child('challenges-private/'+user);
                            //zombies_to_kill=[]; activate to only kill one at a time... could make sense
                            tmpRef.remove()
                            tmpRef=null;
                            tmpRef=firebase.database().ref().child('challenges/'+nombre_partida+'/u/'+user);
                            tmpRef.remove()
                            tmpRef=null;
                        }else{
                            console.log("leader will kill "+leader);
                        }
                    }
                }else{
                    console.log("not a zombie");
                    zombies_beat[user]=challenge.u[user].alive_beat;
                    if(zombies_to_kill.indexOf(user)!=-1){
                        console.log("lo quito de candidatos a zombie");
                        zombies_to_kill.splice(zombies_to_kill.indexOf(user), 1);
                    }
                }
            }
        }
    }
}




var load_country_list_from_indicator=function(indicator){
	for (var country in data_map[indicator].data.last_year) {
		country_list.push(country);
	}
}

var load_period_list_from_indicator_ignore_last_year=function(indicator){
	period_map['last_year']=data_map[indicator].last_year;
	for (var period in data_map[indicator].data) {
		if(period!='last_year')	period_list.push(period);
		period_map[period]= data_map[indicator][period];
	}
}

var load_fact_list_and_map=function(){
    // TODO maybe it could be a map from the start?? from php..?
    // THIS IS ALREADY DONE
    for (var i=0;i<data_map.history.length;i++){
        fact_list.push(data_map.history[i].fact);
        fact_map[data_map.history[i].fact]=data_map.history[i];
    }
}



var reset_local_game=function(){
    session_data.type="qa";
	session_data.num_correct=0;
	var timestamp=new Date();
	session_data.timestamp=timestamp.getFullYear()+"-"+
		pad_string((timestamp.getMonth()+1),2,"0") + "-" + pad_string(timestamp.getDate(),2,"0") + " " +
		 pad_string(timestamp.getHours(),2,"0") + ":"  + pad_string(timestamp.getMinutes(),2,"0");
    lifes=3;
	activity_timer.reset()
}






// starting the machine at the end so we know everything is loaded

// Check for media needs
if(typeof images === 'undefined'){var images = [];}
if(typeof sounds === 'undefined'){var sounds = [];}

var QueryString=get_query_string();
var debug=false;
var user_bypass=undefined;
if(QueryString.hasOwnProperty('debug') && QueryString.debug=='true') debug=true;
if(QueryString.hasOwnProperty('user') && QueryString.user!='') user_bypass=QueryString.user;

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
	check_internet_access();
    console.log('end index.js');
}

// window.onload = function () does not work for apps
window.onload = function () { 
	if(debug) console.log("win.onload");
	//var splash=document.getElementById("splash_screen");
	//if(splash!=null && (ResourceLoader.lazy_audio==false || ResourceLoader.not_loaded['sounds'].length==0)){ splash.parentNode.removeChild(splash); }
}













