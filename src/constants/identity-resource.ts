
const api = {
    getAll: {
        url: "/IdentityResources/GetAll",
        method: "POST",
    },
    create: {
        url: "/IdentityResources/Create",
        method: "POST",
    },
    get: {
        url: "/IdentityResources/Get",
        method: "POST",
    },
    update: {
        url: "/IdentityResources/Update",
        method: "PUT",
    },
    delete: {
        url: "/IdentityResources/Delete",
        method: "DELETE"
    }
};

export default api;