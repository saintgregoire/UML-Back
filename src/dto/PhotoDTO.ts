import { IPhoto } from "../interfaces/photo.interface";


export class PhotoDTO {
    url: string;
    description: string;

    constructor(photo: IPhoto) {
        this.url = photo.url;
        this.description = photo.description;
    }
}