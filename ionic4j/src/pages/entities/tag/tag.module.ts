import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { TagPage } from './tag';
import { TagService } from './tag.provider';

@NgModule({
    declarations: [
        TagPage
    ],
    imports: [
        IonicPageModule.forChild(TagPage),
        TranslateModule.forChild()
    ],
    exports: [
        TagPage
    ],
    providers: [TagService]
})
export class TagPageModule {
}
