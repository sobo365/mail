$(document).ready(function(){

    $('#btn').on('click', function(){

        var data = {
            'username' : 'a',
            'password' : 'a'
        }


        console.log(data);
    	$.ajax({
    		type: 'POST',
    	    contentType: 'application/json',
    	    url: '/auth/login',
    	    data: JSON.stringify(data),
    	    dataType: 'json',
    	    crossDomain: true,
    	    cache: false,
    		processData: false,
    		success:function(response){
    			var token = response.token;
   
    			localStorage.setItem("token",token);
    				    				
    		},
    			error: function (jqXHR, textStatus, errorThrown) {  
    				if(jqXHR.status=="401"){
    					alert("err");
    				}
    			}
    		});

    });
});