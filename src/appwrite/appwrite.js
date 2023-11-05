import { Client, Account, Databases} from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6545ed6de3a86f244b12'); // Replace with your project ID

export const account = new Account(client);
export { ID } from 'appwrite';
export const databases = new Databases(client, '65461ef045ebbcafaa6e');
