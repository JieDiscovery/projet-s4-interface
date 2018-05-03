import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigRoutingModule } from './config-routing.module';
import { ConfigComponent } from './config.component';
import { StatModule } from '../../shared/index';
import {TagModule} from '../../shared/index'
import { PlaylistsService } from '../../playlists.service';
import { TagsService } from '../../tags.service';
import { AddComponent } from './components/add/add.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddTagComponent } from './components/add-tag/add-tag.component';

@NgModule({
  imports: [
    CommonModule,
    ConfigRoutingModule,
    StatModule,
    TagModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ConfigComponent,
    AddComponent,
    AddTagComponent,
    ],
    entryComponents: [
      AddComponent,
    AddTagComponent,
  ],
  providers : [PlaylistsService, TagsService, NgbModal]
})
export class ConfigModule { }
