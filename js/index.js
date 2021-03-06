﻿// 获取所有的城市
let citys,weatherobj;
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	success:function(obj){
		citys = obj.data;
		for(let i in citys){
			let section = document.createElement('section');
			let citys_title = document.createElement('h1');
			citys_title.className = "citys_title";
			citys_title.innerHTML = i;
			section.appendChild(citys_title);
			for(let j in citys[i]){
				let citys_list = document.createElement('ul');
				citys_list.className = 'citys_list';
				let li = document.createElement('li');
				li.innerHTML = j;
				citys_list.appendChild(li);
				section.appendChild(citys_list);
			}
			$(".citys_box").append(section);
		}

	}
})
$.getScript("https://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js",function(){
    getFullWeather(remote_ip_info.city);
});
// 获取当前城市所有的天气信息
function getFullWeather(nowcity){
	$(".now_city").html(nowcity);
	// 获取当前城市的天气信息
	$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city="+nowcity,
	dataType:"jsonp",
	success:function(obj){
		weatherobj = obj.data;
		console.log(weatherobj);
		// 当前的空气质量
		$(".now_air_quality").html(weatherobj.weather.quality_level);
		$(".now_temp_temp").html(weatherobj.weather.current_temperature);
		$(".now_wind_level").html(weatherobj.weather.wind_level+"级");
		$(".now_wind").html(weatherobj.weather.wind_direction);
		$(".now_weather").html(weatherobj.weather.current_condition);
		// 近期两天的天气信息
		// 今天的信息
		$(".today_temp_max").html(weatherobj.weather.dat_high_temperature);
		$(".today_temp_min").html(weatherobj.weather.dat_low_temperature);
		$(".today_weather").html(weatherobj.weather.dat_condition);
		$(".today_img").attr('src',"img/"+weatherobj.weather.dat_weather_icon_id+".png");
		// 明天的信息
		$(".tomorrow_temp_max").html(weatherobj.weather.tomorrow_high_temperature);
		$(".tomorrow_temp_min").html(weatherobj.weather.tomorrow_low_temperature);
		$(".tomorrow_weather").html(weatherobj.weather.tomorrow_condition);
		$(".tomorrow_img").attr('src',"img/"+weatherobj.weather.tomorrow_weather_icon_id+".png");
		// 未来24小时的天气信息
		let hours_array = weatherobj.weather.hourly_forecast;
		for(let i = 0;i < hours_array.length;i++){
			// 创建元素并添加到页面中
			let hours_list = document.createElement('li');
			let hours_time = document.createElement('span');
			hours_time.className = 'hours_time';

			let hours_img = document.createElement('img');
			hours_img.className = 'hours_img';

			let hours_temp = document.createElement('span');
			hours_temp.className = 'hours_temp';

			hours_list.appendChild(hours_time);
			hours_list.appendChild(hours_img);
			hours_list.appendChild(hours_temp);

			$('.hours_content').append(hours_list);

			// 当下的时间
			hours_time.innerHTML = hours_array[i].hour+":00";
			hours_img.setAttribute('src',"img/"+hours_array[i].weather_icon_id+".png");
			hours_temp.innerHTML = hours_array[i].temperature+"°";
			// console.log(hours_array);
		}
		let week_array = weatherobj.weather.forecast_list;
		for(let p = 0;p < week_array.length;p++){
			// 创建元素并添加到页面中
			let week_list = document.createElement('li');
			let week_time = document.createElement('span');
			week_time.className = 'week_date';

			let week_weather = document.createElement('span');
			week_weather.className = 'week_weather';

			let week_img = document.createElement('img');
			week_img.className = 'week_img';

			let week_max_temp = document.createElement('span');
			week_max_temp.className = 'week_max_temp';
			
			let week_min_temp = document.createElement('span');
			week_min_temp.className = 'week_min_temp';

			let week_wind_level = document.createElement('span');
			week_wind_level.className = 'week_wind_level';

			let week_wind_leveltime = document.createElement('span');
			week_wind_leveltime.className = 'week_wind_leveltime';
			
			
			week_list.appendChild(week_time);
			week_list.appendChild(week_weather);
			week_list.appendChild(week_img);
			week_list.appendChild(week_max_temp);
			week_list.appendChild(week_min_temp);
			week_list.appendChild(week_wind_level);
			week_list.appendChild(week_wind_leveltime);
			$('.week_content').append(week_list);

			// 未来一周的时间
			week_time.innerHTML = week_array[p].date.substring(5,7)+"/"+week_array[p].date.substring(8);
			week_weather.innerHTML = week_array[p].condition;
			week_img.setAttribute('src',"img/"+week_array[p].weather_icon_id+".png");
			week_max_temp.innerHTML = week_array[p].high_temperature+"°";
			week_min_temp.innerHTML = week_array[p].low_temperature+"°";
			week_wind_level.innerHTML = week_array[p].wind_direction;
			week_wind_leveltime.innerHTML = week_array[p].wind_level+"级";

			// console.log(week_array);
		}
		
	}

})
}
$(function(){
		$(".now_city").on("click",function(){
			$(".search").val("");
			$(".confirm").html('取消');
			$(".citys").css("display","block");
		})
	
//原生js加载$方法
// window.onload = function(){

// }
// 事件委派
	$("body").delegate(".citys_list li", "click", function() {
		let son = this.innerHTML;
		getFullWeather(son);
		$(".citys").css("display","none");
	})

	$("body").delegate(".citys_title li", "click", function() {
		let son = this.innerHTML;
		getFullWeather(son);
		$(".citys").css("display","none");
	})
	$(".search").on("focus",function(){
		$(".confirm").html('确认');
	})

	$(".confirm").on("click",function(){
		if(this.innerText == "取消"){
			$(".citys").css("display","none");
		}else if(this.innerText == "确认"){
			let text = $(".search").val();	
			for(let i in citys){
				if(text == i){
					getFullWeather(text);
					$(".citys").css("display","none");
					return;
				}else{
					for(let j in citys[i]){
						if(text == j){
						getFullWeather(text);
						$(".citys").css("display","none");
						return;
				}
			}
		}
	}
	alert("输入地区有误");
	$(".search").val("");
	$(".confirm").html('取消');
		
	
}
})		
})