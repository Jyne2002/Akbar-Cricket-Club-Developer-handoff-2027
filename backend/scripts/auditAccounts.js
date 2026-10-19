const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
process.env.NODE_ENV = 'production';

const { connectDB, closeDB } = require('../src/config/db');
const { comparePassword } = require('../src/config/security');
const User = require('../src/models/User');

const publishedDemoPasswords = ['AkbarCricket@2026!', 'Manager@2026!', 'Coach@2026!'];

async function auditAccounts() {
  try {
    await connectDB();
    const users = await User.find({});
    let unsafeAccounts = 0;

    for (const user of users) {
      for (const password of publishedDemoPasswords) {
        if (await comparePassword(password, user.password)) {
          console.error(`Unsafe demo password still active for account: ${user.email}`);
          unsafeAccounts++;
          break;
        }
      }
    }

    if (unsafeAccounts > 0) {
      console.error('Change these passwords through Settings before deploying. No records were modified.');
      process.exitCode = 1;
    } else {
      console.log(`Checked ${users.length} accounts: no published demo passwords found. No records were modified.`);
    }
  } catch (err) {
    console.error('Account audit failed:', err.message);
    process.exitCode = 1;
  } finally {
    await closeDB();
  }
}

auditAccounts();
