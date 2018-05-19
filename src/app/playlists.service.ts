import { Injectable, Input, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Playlist } from './playlist';
import { PLAYLISTS } from './playlist-mock';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { QuerySnapshot } from '@firebase/firestore-types';
import { query } from '@angular/core/src/render3/instructions';
import { TagsService } from './tags.service'



@Injectable()
export class PlaylistsService {
  private itemsCollection: AngularFirestoreCollection<Playlist>;
  playlistsFire: Observable<Playlist[]>;
  playlists: Playlist[] = PLAYLISTS;
  parent: String

  getPlaylists(): Observable<Playlist[]> {
    return this.db.collection('playlists',ref =>ref.orderBy("name")).snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Playlist;
        return data;
      });
    })
  }

  /*  getPlaylists (): Observable<Playlist[]> {
      return of(this.playlists);
     }*/

  addPlaylist(playlist: Playlist) {
    console.log("to add", playlist)
    playlist.id = this.db.createId();
    this.db.collection('playlists').doc(playlist.id).set(Object.assign({}, playlist));
    this.checkTag(playlist.tag, playlist.id);
    //this.playlists.push(playlist);

  }

  editPlaylist(playlist: Playlist): void {
    this.db.collection('playlists').doc(playlist.id).set(Object.assign({}, playlist));
    this.checkTag(playlist.tag, playlist.id);

    /*this.db.collection("cities").doc(playlist.id)
    .update({
    tag: 1
     })
    .then(function() {
    console.log("Document successfully updated!");
    })
    .catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
    });
    this.playlists[this.indexOf(playlist.id,this.playlists)]=playlist
    */
  }

  deletePlaylist(playlist: Playlist): void {
    this.db.collection("playlists").doc(playlist.id).delete().then( ()=> {
      this.checkTag(playlist.tag,'No Playlist')
      console.log("Document successfully deleted!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
  }

  //check if tag is free on have another playlist
  checkTag(tag: any, playlistId: string) {
    this.tagsService.checkTag(tag, playlistId);
  }


  indexOf(id: string, arr: any[]): number {
    let k: number = 0;
    for (let a of arr) {
      if (a.id === id) {
        return k
      }
      k++
    }
    return -1
  }

  constructor(private db: AngularFirestore, private tagsService: TagsService) {
    //   //ref makes it a collection reference
    //     db.collection('playlists').ref.get().then(querySnapshot =>
    //       console.log("query: ",querySnapshot.docs.length))
    //     /*function(querySnapshot) {
    //     querySnapshot.forEach(function(doc) {
    //           // doc.data() is never undefined for query doc snapshots
    //           console.log(doc.id, " => ", doc.data());
    //       });
    //   })*/
    //   .catch(function(error) {
    //       console.log("Error getting documents: ", error);
    //   });
    //   db.collection('playlists').snapshotChanges().map(actions => {
    //     return actions.map(a => {
    //       const data = a.payload.doc.data() as Playlist;
    //       //const id = a.payload.doc.id;
    //       return  data;
    //     });
    //   })
    //   .subscribe(obs => console.log(obs));
  }
}

