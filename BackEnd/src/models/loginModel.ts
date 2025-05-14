import {connection} from './connection';

const getAllUser = async function(){
    const [usersAll] = await connection.execute('SELECT * FROM tbl_usuario;');
    return usersAll
}

const getUser = async function(userId: number){
    const [user] = await connection.execute('SELECT * FROM tbl_usuario WHERE userId = ?',[userId]);
    return user;
}

const postUser = async function(name: string, userName:string, password:string){
    const [result] = await connection.execute('insert into tbl_usuario (name, username, password) values(?, ?, ?)',[name,userName,password]);
    return result;
}

const getLogin = async function(userName: string){
    const result = await connection.execute('SELECT * FROM tbl_usuario WHERE username = ?',[userName])
    return result;
}

export default{
    getAllUser,
    getUser,
    postUser,
    getLogin
}