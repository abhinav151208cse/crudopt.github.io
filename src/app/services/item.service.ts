import { Injectable } from '@angular/core';
import{ AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument }from 'angularfire2/firestore';
import{ Item } from '../models/items'; 

import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ItemService {
  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  itemDoc: AngularFirestoreDocument<Item>;

  constructor(public afs: AngularFirestore) { 
    this.items = this.afs.collection('items').valueChanges();
   
    this.itemsCollection   = this.afs.collection('items', ref => ref.orderBy('title', 'asc'));
  }
  getItems(){
    return this.items;

  }
  addItem(item: Item){
    this.itemsCollection.add(item);
  } 
  deleteItem(item: Item){
    this.itemDoc=this.afs.doc('items/${item.id}');
    this.itemDoc.delete();

  }
}
