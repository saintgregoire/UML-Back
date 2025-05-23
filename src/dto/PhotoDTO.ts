import { IPhoto } from "../interfaces/photo.interface";


export class PhotoDTO {
    id: string;
    url: string;
    description: string;

    constructor(photo: IPhoto) {
        this.id= photo.id;
        this.url = photo.url;
        this.description = photo.description;
    }
}