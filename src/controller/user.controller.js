import * as userRepository from '../repository/user.repository.js'
import { hash } from '../service/password-hasher.js';
import jwt from 'jsonwebtoken';
const secretKey = 'your-secret-key';
import validator from 'validator';
import { io } from '../server.js'; 

export const createUser = async (req, res) => {
  const { first_name, last_name, email, phone, password } = req.body;

  const validationError = validateUserData(req);

  if (validationError) {
    return res.status(400).json({ msg: validationError });
  }

  try {
    const hashedPassword = await hash(password);
    const user =await userRepository.create(
      first_name,
      last_name,
      email,
      phone,
      hashedPassword,
    )
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};



export const login = async (req, res) => {
  const {email, password} = req.body
  const user = await userRepository.login(email);
  if(user){
    const hashedPassword = await hash(password);
    if(hashedPassword === user.password){
      const token = jwt.sign({ user }, secretKey, { expiresIn: '1h' });
      res.json({token})
    }else{
      res.status(400).json({msg: 'Wrong email or password'})
    }
  }else{
    res.status(400).json({msg: 'Wrong email or password'})
  }
}

export const getUserById = async (req, res) => {
  try {
      const response = await userRepository.findById(req.params.id);
      res.status(200).json(response)
  } catch (error) {
      res.status(500).json({ msg: error.message })
  }
}

export const updateUser = async (req, res) => {
  const validationError = validateUserData(req);

  if (validationError) {
    return res.status(400).json({ msg: validationError });
  }
  try {
    const id = Number(req.params.id);
    const data = req.body;
    const updatedUser = await userRepository.update(id,data);
    if (updatedUser) {
      io.emit('userUpdated', { id, updatedUser });
      res.status(200).json(updatedUser);
    } else {
      res.status(400).json({ msg: 'Error updating user' });
    }
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const validateUserData = (req) => {
  const { first_name, last_name, email, phone } = req.body;

  if (first_name && !validator.isAlpha(first_name)) {
    return 'First name should contain only letters.';
  }

  if (last_name && !validator.isAlpha(last_name)) {
    return 'Last name should contain only letters.';
  }

  if (email && !validator.isEmail(email)) {
    return 'Invalid email format.';
  }

  if (phone && !validator.isMobilePhone(phone)) {
    return 'Invalid phone number format.';
  }

  return null;
};