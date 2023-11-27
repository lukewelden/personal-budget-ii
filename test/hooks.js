import {
    dropTables,
    createTables,
    insertIntoTables
} from '../src/utils/queryFunctions.js';

before(async () => {
    await createTables();
    await insertIntoTables();
});

after(async () => {
    await dropTables(); 
});