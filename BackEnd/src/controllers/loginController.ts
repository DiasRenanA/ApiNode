import loginModel from '../models/loginModel'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const SECRET = 'chave_secreta'

const getAllUser = async function(_req, res){
    const listUsers = await loginModel.getAllUser();
    return res.status(200).json(listUsers)
}

const getUser = async function(req, res){
    try{
        const userId = req.params.userId;

        if(isNaN(userId)){
            return res.status(400).json({ error: 'ID inválido'});
        }
        const user  = await loginModel.getUser(userId);


        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro no servidor' });
    }
    
    
}

const postUser = async function(req, res){
    try{
        const {name, userName, password} = req.body

        if (!name || !userName || !password) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }
   
        const response = await loginModel.postUser(name, userName, password)
        return res.status(201).json({ message: 'Usuário criado com sucesso' });

    }catch (error){
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
}

const getLogin = async function(req, res){
    try{
        const {userName, password} = req.body

        if (!userName || !password) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios' });
        }

        const [user] = await loginModel.getLogin(userName);

        if (!user) {
            return res.status(401).json({ error: 'Credenciais inválidas - user' });
        }

        const passwordUser_teste = "12345";
        const userId_teste = 1
        const userName_teste = 'renan'

        var passwordTrue = false;

        if(password == passwordUser_teste){
            passwordTrue = true;
        }

        //const passwordTrue = await bcrypt.compare( passwordUser_teste,password);

        if (!passwordTrue) {
            return res.status(401).json({ error: 'Credenciais inválidas - password' });
        }

        const token = jwt.sign(
            {userId: userId_teste, userName: userName_teste},
            SECRET,
            { expiresIn: '1h' }
        );
        return res.status(200).json({ token });

    }catch(error){
        console.error(error);
        return res.status(500).json({ error: 'Erro no servidor' });
    }
}

export default{
   getAllUser,
   getUser,
   postUser,
   getLogin
}