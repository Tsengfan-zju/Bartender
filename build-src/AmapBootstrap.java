package com.urea.selfservice.client;

import android.content.Context;
import com.amap.api.location.AMapLocationClient;
import com.amap.api.maps.MapsInitializer;

public final class AmapBootstrap {
    private AmapBootstrap() {}

    public static boolean initIfAllowed(Context context) {
        if (!Prefs.privacyAccepted(context)) return false;
        Context app = context.getApplicationContext();
        try {
            MapsInitializer.updatePrivacyShow(app, true, true);
            MapsInitializer.updatePrivacyAgree(app, true);
            AMapLocationClient.updatePrivacyShow(app, true, true);
            AMapLocationClient.updatePrivacyAgree(app, true);
            String key = Prefs.amapKey(app);
            if (key != null && !key.trim().isEmpty()) {
                MapsInitializer.setApiKey(key.trim());
                AMapLocationClient.setApiKey(key.trim());
            }
            return true;
        } catch (Throwable ignored) {
            return false;
        }
    }
}
