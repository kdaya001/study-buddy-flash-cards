import React, { Reducer } from "react";

export interface User {
    email: string;
}

export enum ActionType {
    LOGIN = "login",
    LOGOUT = "logout",
    LIGHTMODE = 'toggleLight',
    DARKMODE = 'toggleDark',
}

export interface ApplicationState {
    currentUser: null | User;
    theme: "light" | "dark";
}

export const DefaultApplicationState: ApplicationState = {
    currentUser: null,
    theme: "light",
};

export type ApplicationAction = LoginAction | LogoutAction | LightModeAction | DarkModeAction;

export interface LoginAction {
    type: ActionType.LOGIN;
    payload: {
        user: User;
    };
}

export interface LogoutAction {
    type: ActionType.LOGOUT;
}

export interface LightModeAction {
    type: ActionType.LIGHTMODE;
}

export interface DarkModeAction {
    type: ActionType.DARKMODE;
}

export const ApplicationContextReducer: Reducer<
    ApplicationState,
    ApplicationAction
> = (state, action) => {
    switch (action.type) {
        case ActionType.LOGIN:
            return {
                ...state,
                currentUser: action.payload.user,
            };
        case ActionType.LOGOUT:
            return {
                ...state,
                currentUser: null,
            };
        case ActionType.LIGHTMODE:
            return {
                ...state,
                theme: 'light'
            };
        case ActionType.DARKMODE:
            return {
                ...state,
                theme: 'dark'
            }
    }
};

export const ApplicationContext = React.createContext<
    [ApplicationState, React.Dispatch<ApplicationAction>]
>([DefaultApplicationState, () => {}]);