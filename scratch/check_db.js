const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(process.env.MONGODB_URI);
};

const run = async () => {
  await dbConnect();
  const User = mongoose.model('User', new mongoose.Schema({}, { strict: false }));
  const collectors = await User.find({ role: 'collector' });
  console.log('Collectors found:', collectors.length);
  collectors.forEach(c => console.log(`- ${c.name} (${c.email})`));
  
  const allUsers = await User.find({});
  console.log('Total users:', allUsers.length);
  const roles = [...new Set(allUsers.map(u => u.role))];
  console.log('Roles present:', roles);
  
  process.exit();
};

run();
