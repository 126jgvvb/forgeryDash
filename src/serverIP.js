/*
const SERVER_IP='http://192.168.1.3:3000';
export default SERVER_IP;
*/



let SERVER_IP=localStorage.getItem('forgery-server') ;

if(!SERVER_IP){ SERVER_IP="http://127.0.0.1:5000" }

export default SERVER_IP;