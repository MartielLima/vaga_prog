package com.example.util;

import java.util.HashMap;
import java.util.Map;

public class SendMassage {

    public static Map<String, Object> SendErrorMassage(String message, String e) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "error");
        response.put("infos", message + " " + e);
        System.err.println(message + " " + e);
        return response;
    }

    public static Map<String, Object> SendSuccessMassage(String title, Object addInfo) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put(title, addInfo);
        System.err.println(title + " " + addInfo);
        return response;
    }
}
