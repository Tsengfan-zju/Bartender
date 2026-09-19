package com.urea.selfservice.client;

import android.app.Application;

public class UreaApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        // 高德 SDK 必须延迟到用户同意隐私政策之后初始化，具体在 AmapBootstrap 中完成。
    }
}
