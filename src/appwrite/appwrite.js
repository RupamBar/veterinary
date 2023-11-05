import { Client, Account, Databases} from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setKey('09af97086776c036d7940772b6b13b1cb68f9ca1aa992d1568a07ac53bcd91273657b7710592c2d5d78799103c187d5c1214201dfa7e75bdf31af6313b02337adf97c51c9ae53f0e26b8042a30e5627cb0782d2857d609561a9cfb40f8aa5a7fe1a64ac0037d1910c6d16378f9b7767ebac1f3eeaaeb74d4ccc5eb0d77da4e23')
    .setProject('6545ed6de3a86f244b12'); // Replace with your project ID

export const account = new Account(client);
export { ID } from 'appwrite';
export const databases = new Databases(client, '65461ef045ebbcafaa6e');
