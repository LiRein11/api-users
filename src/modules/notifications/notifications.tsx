import { notification } from 'antd';
import React, { ReactNode } from 'react';
import { ReactComponent as SuccessIcon } from 'app/assets/icons/success.svg';
import { ReactComponent as ErrorIcon } from 'app/assets/icons/error.svg';
import alert from 'app/assets/sounds/status_change.mp3';

import './notification.css';
// import { useLanguageStore } from '../language/api/store';

interface NotificationProps {
    title: string;
    description: string;
    buttons?: ReactNode;
}

interface SendNotificationProps extends NotificationProps {
    icon: ReactNode;
    placement?: 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight';
    duration?: number;
}

export class LocalNotification {
    public static success(props: NotificationProps) {
        LocalNotification.send({ ...props, icon: <SuccessIcon /> });
    }

    public static error(props: NotificationProps) {
        LocalNotification.send({
            ...props,
            icon: <ErrorIcon />,
            description: props.description ?? 'Ошибка ошибка',
            // description: props.description ?? useLanguageStore.getState().language.serverError,
        });
    }

    private static send(props: SendNotificationProps) {
        const audio = new Audio(alert);
        audio.play().catch((error) => {
            if (error.name === 'NotAllowedError') {
                audio.pause();
            }
        });
        notification.open({
            className: 'notification',
            message: props.title,
            description: props.description,
            icon: props.icon,
            placement: props.placement,
            duration: props.duration,
            btn: props.buttons,
        });
    }
}
