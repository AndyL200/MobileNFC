package com.app

import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod

class HCEModule(private val reactContext : ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {


    override fun getName() : String = "HCEModule"

    @ReactMethod
    fun startHce() {
        ApduDataStore.enable()
    }
    @ReactMethod
    fun stopHce() {
        ApduDataStore.disable()
    }
    //may be subject to change
    @ReactMethod
    fun setAPDUPayload(data : String) {
        ApduDataStore.setPayload(data.toByteArray(Charsets.UTF_8))
    }
}

