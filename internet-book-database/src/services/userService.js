export const ENDPOINT_BASE = "http://localhost:4000/api/users/";

class UserService {
    token = undefined;

    async register(user) {
        const userResp = await fetch(
            ENDPOINT_BASE + "signup",
            {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            }
        );
        const createdUser = await userResp.json();
        if (userResp.status >= 400) {
            console.log("Error registering user", createdUser);
        }
        return createdUser;
    }

    async login(credentials) {
        const userResp = await fetch(
            ENDPOINT_BASE + "login",
            {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            }
        );
        const resp = await userResp.json();
        this.token = resp.token;
        return resp;
    }

    async updateUser(user) {
        const userResp = await fetch(
            ENDPOINT_BASE + encodeURIComponent(user.username),
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            }
        )
        const updatedUser = await userResp.json();
        return updatedUser;
    }

    async getUsers() {
        const userResp = await fetch(ENDPOINT_BASE);
        const documents = await userResp.json();
        return documents.users;
    }

    async deleteUser(id) {
        const deleteResp = await fetch(
            ENDPOINT_BASE + encodeURIComponent(id),
            {
                method: 'DELETE'
            }
        );
        const deleted = await deleteResp.json();
        if (deleteResp.status >= 400) {
            console.error("Error deleting user");
        }
        return deleted;
    }
}

export default new UserService();