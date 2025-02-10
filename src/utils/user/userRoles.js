// src/utils/userRoles.js

export const hasRole = (user, roleName) => {
    return user?.roles.some(role => role.name === roleName);
};

export const isOwner = (user) => {
    return hasRole(user, "OWNER");
};
