import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const getusers= async (req, res) => {
	try {
		const Users = await User.find().sort({ createdAt: 'desc'});

		res.status(200)
			.json({
				data: Users,
				success: true
			});

	} catch (error) {

		res.status(404).json({ message: error.message, success: false });
		
	}
}

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if(!existingUser) {
      return res.status(404).json({ messageUser: 'User doesnt exist.', success: false });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if(!isPasswordCorrect) {
      return res.status(400).type('application/json').json({ messagePassword: 'Invalid credentials.', success: false });
    }

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1h' });
    
    res.status(200).json({ result: existingUser, token, success: true });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName, phoneNumber } = req.body;

    try {
      const existingUser = await User.findOne({ email });

      if(existingUser) {
        return res.status(404).json({ messageUser: 'User already exists.', success: false });
      }

      if(password !== confirmPassword) {
        return res.status(404).json({ messagePassword: 'Passwords dont match.', success: false });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const result = await User.create({ email, phoneNumber, password: hashedPassword, name: `${firstName} ${lastName}`,});

      const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '1h' });

      res.status(200).json({ result, token, success: true });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong.', success: false });
    }
}