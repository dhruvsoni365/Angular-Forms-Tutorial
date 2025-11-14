const bcrypt = require('bcryptjs');

async function test() {
  const password = 'passwordTest1';
  const hash = '$2b$10$yIthcFFWcFVvn3z26G.GQe48HkZUbVwQF/ftQ.wXgGsYZGffrrcP2';
  
  const isValid = await bcrypt.compare(password, hash);
  console.log('Password validation:', isValid);
}

test();
