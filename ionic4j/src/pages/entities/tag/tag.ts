import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { Tag } from './tag.model';
import { TagService } from './tag.provider';

@IonicPage()
@Component({
    selector: 'page-tag',
    templateUrl: 'tag.html'
})
export class TagPage {
    tags: Tag[];

    // todo: add pagination

    constructor(private navCtrl: NavController, private tagService: TagService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.tags = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.tagService.query().subscribe(
            (response) => {
                this.tags = response;
                if (typeof(refresher) !== 'undefined') {
                    refresher.complete();
                }
            },
            (error) => {
                console.error(error);
                let toast = this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
                toast.present();
            });
    }

    trackId(index: number, item: Tag) {
        return item.id;
    }

    open(slidingItem: any, item: Tag) {
        let modal = this.modalCtrl.create('TagDialogPage', {item: item});
        modal.onDidDismiss(tag => {
            if (tag) {
                if (tag.id) {
                    this.tagService.update(tag).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'Tag updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.tagService.create(tag).subscribe(data => {
                        this.tags.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'Tag added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(tag) {
        this.tagService.delete(tag.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'Tag deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(tag: Tag) {
        this.navCtrl.push('TagDetailPage', {id: tag.id});
    }
}
