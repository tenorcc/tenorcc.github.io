var TenorCore = function(){

}
TenorCore.prototype.debounce = function(fn, delay) {
	var timer = null;
	return function () {
	var context = this, args = arguments;
	clearTimeout(timer);
	timer = setTimeout(function () {
		fn.apply(context, args);
	}, delay);
	};
}
TenorCore.prototype.getWindowHeight = function() {
    return window.innerHeight|| document.documentElement.clientHeight|| document.getElementsByTagName('body')[0].clientHeight;
}
TenorCore.prototype.getDocHeight = function() {
    var D = document;
    return Math.max(D.body.scrollHeight, D.documentElement.scrollHeight, D.body.offsetHeight, D.documentElement.offsetHeight, D.body.clientHeight, D.documentElement.clientHeight);
}

var Tenor = new TenorCore();

(function(){	
	var header = document.getElementById("header");
	var navigation = document.getElementById("navigation");
	var navigationHeight = navigation.offsetHeight;
	header.style.paddingTop = navigationHeight+"px";

	var headerHeight = header.offsetHeight;

	// Navigācijas ēna
	window.addEventListener("load", function(){
		// Ja gadījumā lietotājs jau ir noskrollojis zemāk, tad ir jāpieliek ēna
		if(window.scrollY >= headerHeight - navigationHeight) {
			navigation.classList.add("navigation__shadow");
		}
		var previousPosition = window.scrollY;
		// Var vēl pārbaudīt cik tālu lietotājs ir noskrollojis. Ja ir pašā apakšā, tad tehiski navigāciju var nerādīt
		// if(window.scrollY + Tenor.getWindowHeight() - Tenor.getDocHeight() < navigationHeight ) {
		// 	navigation.classList.add("navigation--hidden");
		// 	navigation.style.top = "-"+navigationHeight+"px";
		// }
		
		window.addEventListener("scroll", Tenor.debounce(function(){
			if(window.scrollY < headerHeight - navigationHeight) {
				navigation.classList.remove("navigation__shadow");
				navigation.classList.remove("navigation--hidden");
				navigation.style.top = "";
				previousPosition = window.scrollY;
				return;
			}
			
			navigation.classList.add("navigation__shadow");
			// Pārbaudam vai lapa tika paskrollota vairāk par 100 pikseļiem (lai mazāk raustās navigācija)
			if(Math.abs(window.scrollY - previousPosition) < 100) {
				previousPosition = window.scrollY;
				return;
			}

			// Tagad pārbaudam, vai skrolloja uz augšu vai uz leju
			if(window.scrollY - previousPosition > 0) {
				navigation.classList.add("navigation--hidden");
				navigation.style.top = "-"+navigationHeight+"px";
				previousPosition = window.scrollY;
				return;
			}

			navigation.classList.remove("navigation--hidden");
			navigation.style.top = "";
			previousPosition = window.scrollY;
		},100));
	});
})();