export class Book {
    constructor(name, description, imageURL) {
        this.name = name;
        this.imageURL = imageURL;
        this.description = description;
        this.rating = [];
        this.comments = [];
    }
}