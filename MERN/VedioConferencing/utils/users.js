const users = [];

// Join user to chat
function userJoin(id, username, room) {
    const exist = users.find(user => user.username === username);

    if (exist) {
        return false;
    }

    const user = { id, username, room };

    users.push(user);

    return user;
}

// Get current user
function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

// User leaves chat
function userLeave(id) {
    const index = users.findIndex(user => user.id === id);

    // If not found will return -1
    if (index !== -1) {
        const leftUser = users[index];
        users.splice(index, 1);
        return leftUser;
    }
}

// Get room users
function getRoomUsers(room) {
    return users.filter(user => user.room === room);
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
};