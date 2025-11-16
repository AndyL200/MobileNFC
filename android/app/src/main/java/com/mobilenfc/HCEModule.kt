package com.mobilenfc

import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.mobilenfc.ApduDataStore

class HCEModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private var isHceOn: Boolean = false

    override fun getName(): String {
        return NAME
    }

    @ReactMethod
    fun start(callback: Callback) {
        try {
            ApduDataStore.enable()
            isHceOn = true
            callback.invoke("HCE Process started")
        } catch (e: Exception) {
            callback.invoke("Failed to start HCE: ${e.message}")
        }
    }

    @ReactMethod
    fun stop() {
        try {
            ApduDataStore.disable()
            isHceOn = false
        } catch (e: Exception) {
            // Handle silently
        }
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun isOn(): Boolean {
        return isHceOn
    }

    @ReactMethod
    fun setAPDUPayload(data: String) {
        try {
            ApduDataStore.setPayload(data.toByteArray(Charsets.UTF_8))
        } catch (e: Exception) {
            // Handle silently or log
        }
    }

    companion object {
        const val NAME = "HCEModule"

    }
}

