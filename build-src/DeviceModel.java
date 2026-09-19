package com.urea.selfservice.client;

import org.json.JSONObject;

import java.io.Serializable;
import java.util.Locale;

public class DeviceModel implements Serializable {
    public int id;
    public String name;
    public String onlineStatus;
    public String onlineStatusText;
    public String runtimeStatusText;
    public String productName;
    public String productUnit;
    public String productSpec;
    public double remainingVolume;
    public double tankCapacity;
    public Double todaySales;
    public Double longitude;
    public Double latitude;
    public transient Double gcjLongitude;
    public transient Double gcjLatitude;
    public String coordinateSystem;
    public String city;
    public String address;
    public double distanceMeters = -1;

    public static DeviceModel from(JSONObject o) {
        DeviceModel d = new DeviceModel();
        d.id = o.optInt("id");
        d.name = o.optString("display_name", o.optString("name", "设备"));
        d.onlineStatus = o.optString("online_status", "UNKNOWN");
        d.onlineStatusText = o.optString("online_status_text", d.onlineStatus);
        d.runtimeStatusText = o.optString("runtime_status_text", o.optString("runtime_status", ""));
        d.productName = o.optString("product_name", "车用尿素溶液");
        d.productUnit = o.optString("product_unit", "L");
        d.productSpec = o.optString("product_spec", "");
        d.remainingVolume = o.optDouble("remaining_volume_l", 0);
        d.tankCapacity = o.optDouble("tank_capacity_l", 0);
        if (o.has("today_sales_volume_l") && !o.isNull("today_sales_volume_l")) d.todaySales = o.optDouble("today_sales_volume_l", 0);
        else if (o.has("today_sales") && !o.isNull("today_sales")) d.todaySales = o.optDouble("today_sales", 0);
        JSONObject loc = o.optJSONObject("location");
        if (loc != null) {
            if (loc.has("longitude") && !loc.isNull("longitude")) d.longitude = loc.optDouble("longitude");
            if (loc.has("latitude") && !loc.isNull("latitude")) d.latitude = loc.optDouble("latitude");
            d.coordinateSystem = loc.optString("coordinate_system", "WGS84");
            d.address = loc.optString("address", o.optString("address", ""));
            d.city = loc.optString("city", o.optString("city", ""));
        } else {
            d.address = o.optString("address", "");
            d.city = o.optString("city", "");
        }
        return d;
    }

    public boolean hasLocation() { return longitude != null && latitude != null; }
    public double mapLongitude() { return gcjLongitude != null ? gcjLongitude : longitude; }
    public double mapLatitude() { return gcjLatitude != null ? gcjLatitude : latitude; }
    public boolean isOnline() { return "ONLINE".equalsIgnoreCase(onlineStatus); }
    public String remainingText() { return String.format(Locale.CHINA, "%.1f L", remainingVolume); }
    public String todaySalesText() { return todaySales == null ? "--" : String.format(Locale.CHINA, "%.1f L", todaySales); }
    public String addressText() {
        String a = address == null ? "" : address.trim();
        if (!a.isEmpty()) return a;
        String c = city == null ? "" : city.trim();
        return c.isEmpty() ? "未设置详细地址" : c;
    }
}
