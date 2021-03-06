function CountdownTimer (elm, tl) {
	this.initialize.apply(this,arguments);
}

CountdownTimer.prototype = {
	initialize: function (elm, tl2) {
		this.elem = document.getElementById(elm);
		this.tl = tl2;
	},

	countDown: function () {
		var timer = '';

		var today = new Date();
		var timeBetween = this.tl - today;

		var day  = Math.floor(timeBetween / 86400000      );
		var hour = Math.floor(timeBetween /  3600000 % 24 );
		var min  = Math.floor(timeBetween /    60000 % 60 );
		var sec  = Math.floor(timeBetween /     1000 % 60 );

		if(day < 10)
			tempDay = "0" + day;
		else
			tempDay = "" + day;

		if(hour < 10)
			tempHour = "0" + hour;
		else
			tempHour = "" + hour;

		if(min < 10)
			tempMin = "0" + min;
		else
			tempMin = "" + min;

		if(sec < 10)
			tempSec = "0" + sec;
		else
			tempSec = "" + sec;

		if(timeBetween > 0){
			timer += '<li class="info__item"><p class="info__item_time">' + tempDay.charAt(0) + tempDay.charAt(1) + '</p> <p class="info__item_text">дней</p></li>';
			timer += '<li class="info__item"><p class="info__item_time">' + tempHour.charAt(0) + tempHour.charAt(1) + '</p> <p class="info__item_text">часов</p></li>';
			timer += '<li class="info__item"><p class="info__item_time">' + tempMin.charAt(0) + tempMin.charAt(1) + '</p> <p class="info__item_text">минут</p></li>';
			timer += '<li class="info__item"><p class="info__item_time">' + tempSec.charAt(0) + tempSec.charAt(1) + '</p> <p class="info__item_text">секунд</p></li>';
			this.elem.innerHTML = timer;
			tid = setTimeout((function (_this) { return function () { _this.countDown(); }})(this), 100000);
		}
		else{
			this.elem.innerHTML = '<div style="text-align:center;">Ожидаем новости</div>';
			return;
		}
	},

	addZero: function (num) {
		return ('0' + num).slice(-2);

	}
};

function CDT(){
	// Set countdown limit
	var i = 0;
	$('#countdown-bot, #countdown-top').each(function(){
		if($(this).hasClass('traiders-table__countdown--counter')) {
			$(this).attr('id', 'traiders-table__countdown--counter'+i);
			i++;
		}

		if($(this).attr('data-day'))
			var tl = new Date($(this).attr('data-day'));
		else
			var tl = new Date("Thu, 16 Mar 2050 19:00:00 GMT");

		// You can add time's up message here
		var timer = new CountdownTimer($(this).attr('id'), tl);
		timer.countDown();
	})
}

window.onload=function(){
	CDT();
	setInterval(function () {
		CDT();
	}, 1000);
};