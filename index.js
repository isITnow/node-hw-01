import { Command } from 'commander';
import contactsMethods from './contacts.js';

const program = new Command();
program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            const contactsList = await contactsMethods.listContacts();
            console.table(contactsList);
            break;

        case 'get':
            const contactToFind = await contactsMethods.getContactById(id);
            console.log(contactToFind);
            break;

        case 'add':
            await contactsMethods.addContact(name, email, phone);
            break;

        case 'remove':
            await contactsMethods.removeContact(id);
            break;

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

invokeAction(argv);
