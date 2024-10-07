import { MongoClient } from 'mongodb';
import { CryptoAdapter } from '../adapters/crypto/cryptoAdapter';

async function seed() {
  let client: MongoClient | null = null;

  try {
    const mongoUrl = 'mongodb://mongodb:27017/kenility';
    client = await MongoClient.connect(mongoUrl);
    const db = client.db();

    const cryptoAdapter = new CryptoAdapter();
    const hashedPassword = await cryptoAdapter.hashPassword('admin');

    const adminUser = {
      name: 'admin',
      lastname: 'admin',
      password: hashedPassword,
      address: 'example',
    };

    // Insert the admin user
    const result = await db.collection('users').insertOne(adminUser);
    console.log(`Admin user created with ID: ${result.insertedId}`);
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the connection
    if (client) {
      await client.close();
    }
  }
}

seed().catch(console.error);
