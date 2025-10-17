package com.anonymous.sampleNFC

import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod

class HCEModule(private val reactContext : ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {


    override fun getName() : String = "HCEModule"

    @ReactMethod
    fun startHce() {
        apduDataStore.enable()
    }
    @ReactMethod
    fun stopHce() {
        apduDataStore.disable()
    }
    //may be subject to change
    @ReactMethod
    fun setAPDUPayload(data : String) {
        apduDataStore.setPayload(data.toByteArray(Charsets.UTF_8))
    }
}