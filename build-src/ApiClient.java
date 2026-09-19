package com.urea.selfservice.client;

import android.content.Context;
import android.os.Handler;
import android.os.Looper;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ApiClient {
    public interface Callback<T> { void onSuccess(T value); void onError(String message); }

    private final Context context;
    private final ExecutorService executor = Executors.newCachedThreadPool();
    private final Handler main = new Handler(Looper.getMainLooper());

    public ApiClient(Context context) { this.context = context.getApplicationContext(); }

    public void login(String username, String password, Callback<String> callback) {
        executor.execute(() -> {
            try {
                JSONObject body = new JSONObject();
                body.put("username", username);
                body.put("password", password);
                JSONObject result = requestObject("POST", "/api/client/login", body, false);
                String token = result.optString("access_token", "");
                if (token.isEmpty()) throw new Exception("服务器未返回登录令牌");
                main.post(() -> callback.onSuccess(token));
            } catch (Exception e) { main.post(() -> callback.onError(messageOf(e))); }
        });
    }

    public void getDevices(Callback<JSONArray> callback) {
        executor.execute(() -> {
            try {
                JSONArray arr = requestArray("GET", "/api/client/devices", null, true);
                main.post(() -> callback.onSuccess(arr));
            } catch (Exception e) { main.post(() -> callback.onError(messageOf(e))); }
        });
    }

    public void getDevice(int id, Callback<JSONObject> callback) {
        executor.execute(() -> {
            try {
                JSONObject obj = requestObject("GET", "/api/client/devices/" + id, null, true);
                main.post(() -> callback.onSuccess(obj));
            } catch (Exception e) { main.post(() -> callback.onError(messageOf(e))); }
        });
    }

    private JSONObject requestObject(String method, String path, JSONObject body, boolean auth) throws Exception {
        String text = request(method, path, body == null ? null : body.toString(), auth);
        return new JSONObject(text);
    }

    private JSONArray requestArray(String method, String path, JSONObject body, boolean auth) throws Exception {
        String text = request(method, path, body == null ? null : body.toString(), auth);
        return new JSONArray(text);
    }

    private String request(String method, String path, String body, boolean auth) throws Exception {
        String base = Prefs.serverUrl(context);
        if (base.isEmpty()) throw new Exception("请先配置服务器地址");
        URL url = new URL(base + path);
        HttpURLConnection c = (HttpURLConnection) url.openConnection();
        c.setRequestMethod(method);
        c.setConnectTimeout(9000);
        c.setReadTimeout(12000);
        c.setRequestProperty("Accept", "application/json");
        c.setRequestProperty("Content-Type", "application/json; charset=utf-8");
        if (auth) {
            String token = Prefs.token(context);
            if (token.isEmpty()) throw new Exception("登录状态已失效，请重新登录");
            c.setRequestProperty("Authorization", "Bearer " + token);
        }
        if (body != null) {
            c.setDoOutput(true);
            try (OutputStream os = c.getOutputStream()) {
                os.write(body.getBytes(StandardCharsets.UTF_8));
            }
        }
        int code = c.getResponseCode();
        InputStream is = code >= 200 && code < 300 ? c.getInputStream() : c.getErrorStream();
        String text = readAll(is);
        if (code == 401) throw new UnauthorizedException(detail(text, "登录状态已失效，请重新登录"));
        if (code < 200 || code >= 300) throw new Exception(detail(text, "服务器请求失败（" + code + "）"));
        return text;
    }

    private static String detail(String text, String fallback) {
        try {
            JSONObject o = new JSONObject(text);
            String d = o.optString("detail", "");
            return d.isEmpty() ? fallback : d;
        } catch (Exception e) { return fallback; }
    }

    private static String readAll(InputStream is) throws Exception {
        if (is == null) return "";
        StringBuilder sb = new StringBuilder();
        try (BufferedReader br = new BufferedReader(new InputStreamReader(is, StandardCharsets.UTF_8))) {
            String line;
            while ((line = br.readLine()) != null) sb.append(line);
        }
        return sb.toString();
    }

    private static String messageOf(Exception e) {
        String m = e.getMessage();
        if (m == null || m.trim().isEmpty()) return "网络请求失败，请检查服务器地址和网络";
        return m;
    }

    public static class UnauthorizedException extends Exception {
        public UnauthorizedException(String message) { super(message); }
    }
}
