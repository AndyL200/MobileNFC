package com.anonymous.sampleNFC

import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.anonymous.sampleNFC.ApduService

class HCEModule(private val reactContext : ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {




    override fun getName() : String = "HCEModule"

    @ReactMethod
    fun startHce() {
    //make a listener for apduservice??
    }
    @ReactMethod
    fun stopHce() {
        
    }
}