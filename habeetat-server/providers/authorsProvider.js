const fs = require('fs');

function getAllUsers () {
    return JSON.parse(fs.readFileSync('/home/luke08/progetti/node/habeetat-backend/habeetat-server/providers/users.json', {encoding: 'utf8'}));
}
function getUser(username){
    const users= getAllUsers();
    return users.find(users => users.username === username);
}
function addUser(username, name, surname, age){
    const users= getAllUsers();
    if((users.find(users => users.username === username))==undefined){
        const userA={        
            "username": username,
            "name": name,
            "surname": surname,
            "age": parseInt(age)
        };
        users.push(userA);
        fs.writeFileSync('users.json', JSON.stringify(users, null, 2), 'utf-8');
    }
    else{
        throw new Error("L'utente già esiste");
    }
    return JSON.parse(fs.readFileSync('users.json', {encoding: 'utf8'}));
}
function removeUser(username){
    let users= getAllUsers();
    users= users.filter(users => users.username !== username);
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2), 'utf-8');
    return JSON.parse(fs.readFileSync('users.json', {encoding: 'utf8'}));
}
function updateUser(username, name, surname, age){
    const user={        
            "username": username,
            "name": name,
            "surname": surname,
            "age": parseInt(age)
        };
    let userF= getUser(username);
    if(!userF)
        throw new Error("non esiste");
    const UserN= getAllUsers().map(u => {
        if(user.username === username){
            userF={
                ...user,
                "name": name ? name : u.name,
                "surname": surname ? surname : u.surname,
                "age": age ? age : u.age
                }
            }
    });
    return userF;
}
module.exports = {
    getAllUsers, getUser, addUser, removeUser, updateUser
}