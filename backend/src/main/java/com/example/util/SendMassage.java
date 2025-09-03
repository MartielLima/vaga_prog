package com.example.util;

import java.util.HashMap;
import java.util.Map;

public class SendMassage {
    public static String SendErrorMassage(String message,String e) {
        Map<String, String> response = new HashMap<>();
        response.put("message", "error");
        response.put("infos", message + " " + e);
        System.err.println(message + " " + e);
        return response.toString();
    }
}