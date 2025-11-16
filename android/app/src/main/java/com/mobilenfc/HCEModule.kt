package com.mobilenfc

import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.mobilenfc.ApduDataStore


class HCEModule(private val reactContext : ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {


    override fun getName() : String = NAME

    @ReactMethod
    fun startHce(callback: Callback) {
        ApduDataStore.enable()
        callback.invoke("HCE Process started")
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

    companion object {
        const val NAME = "HCEModule"
    }
}

