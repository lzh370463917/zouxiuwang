$(function (){
	var testuser=localStorage.getItem("testuser");
	if(testuser&&testuser!=""){
		testuser=JSON.parse(testuser);
		$("#name").val(testuser.username);
		$("#psw").val(testuser.password)
	}
}())




$("#btn_login").on("click",function(){
	var name=$("#name").val();
	var psw=$("#psw").val();
	var check=$("#check").attr("checked");
	
	if(name==""){
		alert("请输入用户名")
	}else{
		if(psw==""){
			alert("请输入密码")
		}else{
			var user=getUser(name,psw);
			login(user);
			console.log(!check)
			if(check){
				localStorage.setItem("testuser",JSON.stringify(user))
			}else{
				localStorage.removeItem("testuser")
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

function login(user){
	$.ajax({
		type:"get",
		url:"http://datainfo.duapp.com/shopdata/userinfo.php",
		data:{
			status:"login",
			userID:user.userName,
			password:user.password
		},
		success:function(data){
			console.log(JSON.parse(data).code)
			if(JSON.parse(data).code){
				alert("登录成功")
			}else{
				alert("登录失败")
			}
		}
	})
}
