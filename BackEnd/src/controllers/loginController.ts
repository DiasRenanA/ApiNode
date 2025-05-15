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
       const { name, userName, password } = req.body;

        if (!name || !userName || !password) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        const existingUser = await loginModel.getUserID(userName);

        if (existingUser) {
            return res.status(409).json({ message: 'Usuário já cadastrado' });
        }

        await loginModel.postUser(name, userName, password);
        return res.status(201).json({ message: 'Usuário criado com sucesso' });

    }catch (error){
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
}

const getLogin = async function(req, res) {
    try {
        const { userName, password } = req.body;

        if (!userName || !password) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios' });
        }

        const user = await loginModel.getLogin(userName);

        if (!user) {
            return res.status(401).json({ error: 'Credenciais inválidas (usuário)' });
        }

        const truePassword = await bcrypt.compare(password, user.password);

        if (!truePassword) {
            return res.status(401).json({ error: 'Credenciais inválidas (senha)' });
        }

        const token = jwt.sign(
            { userId: user.userId, userName: user.username },
            SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({ token });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro no servidor' });
    }
};

export default{
   getAllUser,
   getUser,
   postUser,
   getLogin
}