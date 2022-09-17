import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { Platform } from 'react-native';

const getRepeatComponent = (type) => {
    let repeatsComponent = {};
    switch (type) {
        case 'year':
            repeatsComponent.year = false;
            repeatsComponent.month = true;
            repeatsComponent.day = true;
            repeatsComponent.hour = true;
            repeatsComponent.minute = true;
            repeatsComponent.second = true;
            console.log(repeatsComponent);
            break;
        case 'month':
            repeatsComponent.year = false;
            repeatsComponent.month = false;
            repeatsComponent.day = true;
            repeatsComponent.hour = true;
            repeatsComponent.minute = true;
            repeatsComponent.second = true;
            console.log(repeatsComponent);
            break;
        case 'week':
            repeatsComponent.year = false;
            repeatsComponent.month = true;
            repeatsComponent.day = true;
            repeatsComponent.dayOfWeek = true
            repeatsComponent.hour = true;
            repeatsComponent.minute = true;
            repeatsComponent.second = true;
            console.log(repeatsComponent);
            break;
        case 'day':
            repeatsComponent.year = false;
            repeatsComponent.month = false;
            repeatsComponent.day = false;
            repeatsComponent.hour = true;
            repeatsComponent.minute = true;
            repeatsComponent.second = true;
            console.log(repeatsComponent);
            break;
        case 'hour':
            repeatsComponent.year = false;
            repeatsComponent.month = false;
            repeatsComponent.day = false;
            repeatsComponent.hour = false;
            repeatsComponent.minute = true;
            repeatsComponent.second = true;
            console.log(repeatsComponent);
            break;
        case 'minute':
            repeatsComponent.year = false;
            repeatsComponent.month = false;
            repeatsComponent.day = false;
            repeatsComponent.hour = false;
            repeatsComponent.minute = false;
            repeatsComponent.second = true;
            console.log(repeatsComponent);
            break;
    }
    return repeatsComponent;
}

class Notifications {
    constructor() {
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token) {
                // console.log('TOKEN:', token);
            },
            onNotification: function (notification) {
                console.log('NOTIFICATION:', notification);
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            },
            popInitialNotification: true,
            requestPermissions: Platform.OS == 'ios',
            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: false,
                sound: true,
            },
        });

        PushNotification.createChannel(
            {
                channelId: 'livelikeyouaredying', // (required)
                channelName: 'Task reminder notifications', // (required)
                channelDescription: 'Reminder for any tasks',
                playSound: true,
                vibrate: true,
                soundName: 'alarm1.wav'
            },
            () => { },
        );

        PushNotification.getScheduledLocalNotifications(rn => {
            console.log('SN --- ', rn);
        });
    }

    schduleNotification(date, type, soundName) {
        PushNotification.localNotificationSchedule({
            channelId: 'livelikeyouaredying',
            title: '🔔 Notification!',
            message: 'Remember your biggest wish in life!',
            date,
            vibrate: true,
            vibration: 300,
            repeatType: type,
            repeatTime: '1',
            playSound: true,
            soundName
        });
    }
    schduleNotificationIOS(date, type, soundName) {
        PushNotificationIOS.addNotificationRequest({
            id: 'livelikeyouaredying',
            title: '🔔 Notification!',
            subtitle: 'Remember your biggest wish in life!',
            fireDate: date,
            repeats: true,
            repeatsComponent: getRepeatComponent(type)
        })
    }
    deleteNotification(id) {
        PushNotification.channelExists(id, function (exists) {
            if (exists) {
                PushNotification.deleteChannel('livelikeyouaredying')
                console.log('Current channel is deleted successfully');
            } else {
                console.log('Channeld is not existing now. ');
            }
        });
    }
    deleteAll() {
        PushNotification.cancelAllLocalNotifications();
        console.log('ios funciton is called');
    }
}

export default new Notifications();
