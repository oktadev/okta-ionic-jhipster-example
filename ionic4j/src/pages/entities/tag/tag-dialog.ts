import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Tag } from './tag.model';
import { TagService } from './tag.provider';
import { Entry, EntryService } from '../entry';

@IonicPage()
@Component({
    selector: 'page-tag-dialog',
    templateUrl: 'tag-dialog.html'
})
export class TagDialogPage {

    tag: Tag;
    entries: Entry[];
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private entryService: EntryService,
                private tagService: TagService) {
        this.tag = params.get('item');
        if (this.tag && this.tag.id) {
            this.tagService.find(this.tag.id).subscribe(data => {
                this.tag = data;
            });
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.tag.id : ''],
            name: [params.get('item') ? this.tag.name : '',  Validators.required],
            entries: [params.get('item') ? this.tag.entries : '',],
        });

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });
    }

    ionViewDidLoad() {
        this.entryService.query()
            .subscribe(data => { this.entries = data; }, (error) => this.onError(error));
    }

    /**
     * The user cancelled, dismiss without sending data back.
     */
    cancel() {
        this.viewCtrl.dismiss();
    }

    /**
     * The user is done and wants to create the tag, so return it
     * back to the presenter.
     */
    done() {
        if (!this.form.valid) { return; }
        this.viewCtrl.dismiss(this.form.value);
    }

    onError(error) {
        console.error(error);
        let toast = this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
        toast.present();
    }

    compareEntry(first: Entry, second: Entry): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackEntryById(index: number, item: Entry) {
        return item.id;
    }
}
