<template>
  <Page>
    <ActionBar title="NativeScript-Vue with Twilio"/>
    <StackLayout class="p-20">
      <StackLayout>
        <Label text="Sender phone number" />
        <TextField
          :text="senderPhoneNumber"
          hint="+1512365432"
        />
        <Label text="Phone to call" />
        <TextField
          :text="phoneNumber"
          hint="+1512365443"
        />
        <Label text="Other options for twilio.makeCall method" />
      </StackLayout>
      <StackLayout orientation="horizontal">
        <TextField
          :text="option1.key"
          hint="key1"
          class="option"
        />
        <TextField
          :text="option1.value"
          hint="value1"
          class="option"
        />
      </StackLayout>
      <StackLayout orientation="horizontal">
        <TextField
          :text="option2.key"
          hint="key2"
          class="option"
        />
        <TextField
          :text="option2.value"
          hint="value2"
          class="option"
        />
      </StackLayout>
      <Button class="bg-primary call-button" text="CALL" @tap="onCall()" />
    </StackLayout>
  </Page>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import * as app from 'tns-core-modules/application';
  import * as dialogs from 'tns-core-modules/ui/dialogs';
  import { setupCallListener, setupPushListener, getAccessToken, Twilio, unregisterPushNotifications } from 'nativescript-twilio';

  import { isAndroid } from 'tns-core-modules/platform';
  import * as Permissions from 'nativescript-permissions';
  declare var android;

  @Component({
    name: 'home',
    components: {
    },
  })
  export default class App extends Vue {
    private message: string = '';
    private senderPhoneNumber: string = ''; // Assign the default phone number from where the call will originate, or the client that it originates from i.e. client:alice
    private phoneNumber: string = ''; // Assign the default receiving phone number or client i.e. +12345678
    private option1: any = {
      key: '',
      value: ''
    };
    private option2: any = {
      key: '',
      value: ''
    };
    private twilio: Twilio; // = new Twilio();

    
    private created() {
      setTimeout(() => {
        console.log('setupCallListener!');
        setupCallListener(this.callListener);
      }, 1000);

      console.log('Registering push listeners')
      setupPushListener(this.pushListener);

      if (isAndroid) {
        Permissions.requestPermission(android.Manifest.permission.RECORD_AUDIO, 'Needed for making calls').then(() => {
          console.log('Permission granted!');
        }).catch(() => {
          console.log('Permission is not granted :(');
        });
      }

    }

    private callListener(): void {
      const onConnectFailure = (call, error) => {
        dialogs.alert(`connection failure: ${error}`);
        console.log(call);
      };

      const onConnected = (call) => {
        console.log('call connected');
        console.log(call);
        // TODO: fix the issue of disconnecting the call after navigating
        // to some other page with the call connected
        // this should happen after 8 seconds of connecting the call
        // setTimeout(() => {
        //   debugger;
        //   frameModule.topmost().navigate('detail-page');
        // }, 8000);
      };

      const onDisconnected = (call) => {
        dialogs.alert('disconnected');
        console.log(call);
      };
    }

    private pushListener(): void {
      const onPushRegistered = (accessToken, deviceToken) => {
        dialogs.alert('push registration succeded');
      };

      const onPushRegisterFailure = (error) => {
        dialogs.alert(`push registration failed: ${error}`);
      };

      const onIncomingCall = (customParameters) => {
        return {
          from: customParameters.subscriber_name
        }
      };
      
      const onAcceptCall = (customParameters) => {
        console.log('OnAcceptCall fired!', customParameters);
      }

    }

    private onCall(): void {
      getAccessToken()
        .then((token) => {
          console.log(`Twilio access token: ${token}`);

          this.twilio = new Twilio(token);

          let options = {};
          if (this.option1.key) {
            options[this.option1.key] = this.option1.value;
          }
          if (this.option2.key) {
            options[this.option2.key] = this.option2.value;
          }

          console.log('Calling to ', this.phoneNumber);
          let call = this.twilio.makeCall(this.senderPhoneNumber, this.phoneNumber, options);
        })
      .catch((error) => {
        console.error(error);
        dialogs.alert(error);
      });
    }
  }


</script>

<style scoped lang="scss">
  ActionBar {
    background-color: #53ba82;
    color: #ffffff;
  }

  .message {
    text-align: left;
    font-size: 20;
    color: #333333;
    margin-left: 20;
  }

  .title {
    vertical-align: center;
    text-align: center;
    font-size: 20;
    color: #333333;
  }
</style>