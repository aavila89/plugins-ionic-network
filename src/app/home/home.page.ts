import { Component, OnInit, inject } from '@angular/core';
import { Network } from '@capacitor/network';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit{

  status = 'Online';
  networkType!: string;
  toastController = inject(ToastController);

  constructor() {}
  async ngOnInit(): Promise<void> {
    const status = await Network.getStatus();
    const {connected, connectionType} = status;
    this.status = connected ? 'Online' : 'Offline';
    this.networkType = connectionType;

    let icon = connectionType === 'wifi' ? 'assets/icon/wifi.svg' : 'assets/icon/signal_cellular.svg';
    if (!connected) {
      icon = 'assets/icon/wifi_off.svg';
    } 
    this.presentToast(this.status, icon, 'top');
  }

  async presentToast(message: string, icon: string, position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      color: message === 'Online' ? 'success' : 'danger',
      message: `Status network ${message}`,
      duration: 2000,
      position,
      icon
    });

    await toast.present();
  }

  async presentToastEvents(message: string, position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      color: 'medium',
      message,
      duration: 1500,
      position
    });

    await toast.present();
  }

  async onClick() {
    await this.presentToastEvents('Tab Subscribe network button.', 'top');
    Network.addListener('networkStatusChange', networkStatus => {
      const {connected, connectionType} = networkStatus;
      this.status = connected ? 'Online' : 'Offline';
      let icon = connectionType === 'wifi' ? 'assets/icon/wifi.svg' : 'assets/icon/signal_cellular.svg';
      if (!connected) {
        icon = 'assets/icon/wifi_off.svg'
      } 
      this.presentToast(this.status, icon, 'top');
    });
  }

}