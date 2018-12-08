import * as firebase from "firebase";
import { promise } from "protractor";
import { resolve } from "path";
import { reject } from "q";


export class MyFireService{

    getUserFromDatabase(uid){
        const ref = firebase.database().ref('users/' + uid);
        return ref.once('value')
            .then(snapshot => snapshot.val());
    }

    uploadFile(file){
        const fileName = 'abc.png';
        const fileRef = firebase.storage().ref().child('image/'+fileName);
        const uploadTask = fileRef.put(file);

        return new Promise((resolve, reject) => {
            
            uploadTask.on('state_changed', snapshot => {
            },
            error => {
                reject(error);
            },
            () => {
                const fileUrl =  uploadTask.snapshot.ref.getDownloadURL();
                console.log(fileUrl);
                resolve({fileName, fileUrl});
            });

        });
        
    }
}