import { Component } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import { StopTimingPage } from '../stop-timing/stop-timing';
import { Projects } from '../../providers/projects';
import { ProjectModel } from '../../models/project-model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	constructor(public navCtrl: NavController, public alertCtrl: AlertController, public projectsService: Projects, public modalCtrl: ModalController) {

	}

	ionViewDidLoad(){
		this.projectsService.load();
	}

	newProject(): void {

		let prompt = this.alertCtrl.create({
			title: 'New Project',
			message: 'Enter a name for your new project',
			inputs: [
				{
					name: 'title'
				}
			],
			buttons: [
				{
					text: 'Cancel'
				},
				{
					text: 'Add',
					handler: (data) => {
						let project = new ProjectModel(data.title, new Date(), 0, false);
						this.projectsService.addProject(project);
					}
				}
			]
		});

		prompt.present();

	}

	editProject(project): void {

		let prompt = this.alertCtrl.create({
			title: 'Edit Project',
			message: 'Enter a new name for your new project',
			inputs: [
				{
					name: 'title'
				}
			],
			buttons: [
				{
					text: 'Cancel'
				},
				{
					text: 'Save',
					handler: (data) => {
						this.projectsService.editProject(project, data.title);
					}
				}
			]
		});

		prompt.present();

	}

	toggleTimer(project): void {


		if(!project.active){

			if(!this.projectsService.projectActive){
				this.projectsService.startTiming(project, false);
			} else {

				let alert = this.alertCtrl.create({
					title: 'Oops!',
					subTitle: 'You are already timing a project. You must stop it before timing a new project.',
					buttons: ['OK']
				});

				alert.present();

			}

		} else {

			let elapsedTime = this.projectsService.stopTiming(project);

			let modal = this.modalCtrl.create(StopTimingPage, {
				elapsedTime: elapsedTime
			});

			modal.onDidDismiss((modifiedSeconds) => {

				if(modifiedSeconds > elapsedTime){
					let difference = modifiedSeconds - elapsedTime;
					this.projectsService.increaseSeconds(project, difference);
				} else {
					let difference = elapsedTime - modifiedSeconds;
					this.projectsService.decreaseSeconds(project, difference);
				}

			});

			modal.present();

		}

	}

}
