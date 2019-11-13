import "./sass/style.scss";

import React from "react";
import { env as mainEnv } from "snowball";
import { createApplication, Page } from "snowball/app";

import { LocaleProvider } from "antd";
import zhCN from 'antd/es/locale-provider/zh_CN';

import router from "./app/router";
import * as projectEnv from "./env";

const env = {
    ...mainEnv,
    ...projectEnv
};

const projects = {
};

class UserService {
}

Page.extentions.react({
    Provider: ({ children }) => {
        return <LocaleProvider locale={zhCN.default}>{children}</LocaleProvider>;
    }
});

window.SNOWBALL_MAIN_APP = createApplication({
    projects,
    routes: router,
    autoStart: true,
    extend(app) {
        return {
            env,
            services: [UserService]
        };
    },
    options: {
        disableTransition: true
    }
}, document.getElementById('root'), () => {
    console.log('application start!');
});