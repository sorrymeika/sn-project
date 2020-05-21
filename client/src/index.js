import "./sass/style.scss";

import React from "react";
import { env as mainEnv } from "snowball";
import { createApplication, Page } from "snowball/app";

import { LocaleProvider } from "antd";
import zhCN from 'antd/es/locale-provider/zh_CN';


import router from "./app/router";
import * as projectEnv from "./env";
import { AppConfiguration } from "./shared/configuration";

const env = {
    ...mainEnv,
    ...projectEnv
};

const projects = {
};

Page.extentions.react({
    Provider: ({ children }) => {
        return <LocaleProvider locale={zhCN.default}>{children}</LocaleProvider>;
    }
});

createApplication({
    projects,
    routes: router,
    autoStart: true,
    extend(app) {
        return {
            env
        };
    },
    configuration: AppConfiguration,
    options: {
        disableTransition: true
    }
}, document.getElementById('root'), () => {
    console.log('application start!');
});