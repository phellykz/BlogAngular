import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DaoServiceService {

    constructor(private angularFire: AngularFireDatabase) { }

    insert<T>(entity: string, obj: T): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.angularFire.list(entity).push(obj)
                .then(key => resolve(key), (error) => reject(error));
        });
    }

    update<T>(entity: string, key: string, data: any): Promise<void> {
        return new Promise<void>((resolve, reject) => {

            this.angularFire.list(entity).update(key, data)
                .then(() => resolve())
                .catch(error => reject(error));
        });
    }

    updateByPath<T>(entity: string, key: string, path: string, data: any): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.angularFire.list(`${entity}/${path}/${key}`).push(data)
                .then(() => resolve());
        });
    }


    remove<T>(entity: string, key: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {

            this.angularFire.list(entity).remove(key)
                .then(() => resolve())
                .catch(error => reject(error));
        });
    }


    list<T>(entity: string): AngularFireList<T[]> {
        return this.angularFire.list(entity);
    }    
}
