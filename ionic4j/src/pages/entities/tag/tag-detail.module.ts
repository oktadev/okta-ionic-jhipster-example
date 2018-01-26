import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { TagDetailPage } from './tag-detail';
import { TagService } from './tag.provider';

@NgModule({
    declarations: [
        TagDetailPage
    ],
    imports: [
        IonicPageModule.forChild(TagDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        TagDetailPage
    ],
    providers: [TagService]
})
export class TagDetailPageModule {
}
