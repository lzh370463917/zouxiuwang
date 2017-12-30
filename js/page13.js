$("#btn_register").on("click",function(){
	var name=$("#name").val();
	var psw=$("#psw").val();
	var repsw=$("#repsw").val();
	
	if(name==""){
		alert("请输入用户名")
	}else{
		if(psw==""){
			alert("请输入密码")
		}else{
			if(repsw==""){
				alert("请确认密码")
			}else{
				if(psw===repsw){
					var user=getUser(name,psw);
					console.log(user)
					register(user);
				}else{
					alert("两次密码输入不一致")
				}
			}
		}
	}
	
})

function getUser(name,psw){
	var user={
		username:name,
		password:psw
	}
	return user;
}
function register(user){
	$.ajax({
		type:"post",
		url:"http://datainfo.duapp.com/shopdata/userinfo.php",
		data:{
			status:"register",
			userID:user.username,
			password:user.password
		},
		success:function(data){
			console.log(data)
			if(data==1){
				alert("注册成功")
			}else {
				alert("注册失败")
			}
		}
	})
}
