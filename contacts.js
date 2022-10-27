import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() {
    try {
        const resp = await fs.readFile(contactsPath, 'utf8');
        return JSON.parse(resp);
    } catch (error) {
        console.log(error);
    }
}

async function getContactById(contactId) {
    try {
        const contacts = await listContacts();
        const contactToFind = contacts.find(({ id }) => id === contactId);
        if (!contactToFind) {
            throw new Error(`ID:${contactId} is absent`);
        }
        return contactToFind;
    } catch (error) {
        console.log(error.message);
    }
}

async function removeContact(contactId) {
    try {
        const contacts = await listContacts();
        const contactsList = contacts.filter(({ id }) => id !== contactId);
        const isSameLength = contactsList.length === contacts.length;

        if (isSameLength) {
            throw new Error(`ID:${contactId} is absent`);
        }
        await fs.writeFile(contactsPath, JSON.stringify(contactsList), 'utf8');
        console.log(`contact with ID:${contactId} has been removed`);
    } catch (error) {
        console.log(error.message);
    }
}

async function addContact(name, email, phone) {
    try {
        const contact = {
            id: nanoid(2),
            name,
            email,
            phone,
        };
        const contacts = await listContacts();
        const contactsList = JSON.stringify([contact, ...contacts], null, '\t');
        await fs.writeFile(contactsPath, contactsList, 'utf8');
        console.log(`The new contact has been added`);
    } catch (error) {
        console.log(error.message);
    }
}

export default {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};
