
var fs=require("fs");
var telegram=require("telegram-bot-api");
 var request=require("request");
// var express=require("express");
// var cb=express();
var api = new telegram({
        token: '874332695:AAHx-LrkwdDXLA6cAwsICWwXM_QHkiZim2U',
        updates: {
        	enabled: true
    }
});

api.on("message",function(message)
{
	var m=message.text.toLowerCase();
	 if(m.includes("meaning"))
	 {
		m=m.replace("meaning of ",'');
		console.log(m);
		request("https://googledictionaryapi.eu-gb.mybluemix.net/?define="+m+"&lang=en",function(error,response,body)
		{
			
			//console.log(JSON.parse(body)[0].meaning.adjective[0].definition);
			api.sendMessage({chat_id:message.chat.id,text:"Hey I found one of the meaning \n"+ (JSON.parse(body)[0].meaning.adjective[0].definition)/*.meaning.adjective[0].definition).toString()*/ });
			
		});
	}
	var m=message.text.toLowerCase();
	if(m.includes("weather"))
	{
			var at=m.replace("weather at ","");
			request("http://api.apixu.com/v1/current.json?key=52b74c1018194b05a61142044192105&q="+at,function(error,response,body)
			{
				api.sendMessage({chat_id:message.chat.id,text:"Hey I found the wether and the wether condition -----\n\n"+(JSON.parse(body).current.temp_c)+"\n"+(JSON.parse(body).current.condition.text).toString()});
			});
		 console.log(at);
	}
	else if(m.includes("news"))
	{
		api.sendMessage({chat_id:message.chat.id,text:"Here are the news available \n 1) BITCOIN \n 2)BUSINESS HEADLINES OF US \n 3)APPLE"});
		var id=message.text.toLowerCase();
		//api.sendMessage({chat_id:message.chat.id,text:id});
	}
});


// cb.get("/hello",function(req,res)
// {
// 	request("http://api.apixu.com/v1/current.json?key=52b74c1018194b05a61142044192105&q=kayamkulam",function(error,response,body)
// 	{
// 		console.log((JSON.parse(body).current.temp_c));
// 		res.send((JSON.parse(body).current.temp_c).toString());
// 		console.log((JSON.parse(body).current.condition.text));
// 		res.send((JSON.parse(body).current.condition.text).toString());

// 	});
// });
// cb.listen(4000,function()
// {
// 	console.log("sjdh");
// })