import { ProfileType } from "@/types";
import { DocumentData, DocumentSnapshot } from "firebase/firestore";

export class Profile {
    data: ProfileType;
    id: string;

    constructor(id: string, data: ProfileType) {
        this.id = id;
        this.data = data;
    }

    static fromSnapshot(snapshot: DocumentSnapshot<DocumentData>) {
        return new Profile(snapshot.id, snapshot.data() as ProfileType);
    }
}

export default Profile;