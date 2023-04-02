import * as Contacts from "./contacts.js";

const allContacts = await Contacts.listContacts();
console.log(allContacts);

const dupaContact = await Contacts.getContactById("DUPA");
console.log(dupaContact);

await Contacts.addContact("Adam", "adam@mail.com", "123456789");


const adam = await Contacts.getContactById("vxgVOj96zIi5a1a7orBMG");
console.log({ adam });

await Contacts.removeContact("vxgVOj96zIi5a1a7orBMG");
