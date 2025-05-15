import {connection} from './connection';
import bcrypt from 'bcryptjs'
const getAllUser = async function(){
    const [usersAll] = await connection.execute('SELECT * FROM tbl_usuario;');
    return usersAll
}

const getUser = async function(userId: number){
    const [user] = await connection.execute('SELECT * FROM tbl_usuario WHERE userId = ?',[userId]);
    return user;
}

const postUser = async function(name: string, userName:string, password:string){
    const resenha = await bcrypt.hash(password,10)
    const [result] = await connection.execute('insert into tbl_usuario (name, username, password) values(?, ?, ?)',[name,userName,resenha]);
    return result;
}

const getLogin = async function(userName: string){
    const [rows] = await connection.execute('SELECT * FROM tbl_usuario WHERE username = ?', [userName]);
    return rows[0];
}

const getUserID = async function(userName: string) {
    const [result] = await connection.execute('SELECT userId, name, password FROM tbl_usuario WHERE username = ?', [userName]);
    return result[0];
}

export default{
    getAllUser,
    getUser,
    postUser,
    getLogin,
    getUserID
}