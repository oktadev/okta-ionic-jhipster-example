import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { Tag } from './tag.model';
import { TagService } from './tag.provider';

@IonicPage({
    segment: 'tag-detail/:id'
})
@Component({
    selector: 'page-tag-detail',
    templateUrl: 'tag-detail.html'
})
export class TagDetailPage {
    tag: Tag;

    constructor(private modalCtrl: ModalController, private params: NavParams,
                private tagService: TagService, private toastCtrl: ToastController) {
        this.tag = new Tag();
        this.tag.id = params.get('id');
    }

    ionViewDidLoad() {
        this.tagService.find(this.tag.id).subscribe(data => this.tag = data);
    }

    open(item: Tag) {
        let modal = this.modalCtrl.create('TagDialogPage', {item: item});
        modal.onDidDismiss(tag => {
            if (tag) {
                this.tagService.update(tag).subscribe(data => {
                    this.tag = data;
                    let toast = this.toastCtrl.create(
                        {message: 'Tag updated successfully.', duration: 3000, position: 'middle'});
                    toast.present();
                }, (error) => console.error(error));
            }
        });
        modal.present();
    }
}
