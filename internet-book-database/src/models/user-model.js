export class User {
    constructor(name, username, password, gender, role, imageURL, description, registeredOn, lastModificationOn) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.gender = gender;
        this.role = role;
        this.imageURL = imageURL;
        this.description = description;
        this.registeredOn = registeredOn;
        this.lastModificationOn = lastModificationOn;
        this.readlist = [];
    }

}