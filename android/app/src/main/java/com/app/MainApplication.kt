package com.app

import android.app.Application
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.app.HCEModule

class HCEPackage : ReactPackage {
  override fun createNativeModules(reactContext: ReactApplicationContext) =
    listOf(HCEModule(reactContext))

  override fun createViewManagers(reactContext: ReactApplicationContext) =
    emptyList<ViewManager<*, *>>()
}
class MainApplication : Application(), ReactApplication {

  override val reactHost: ReactHost by lazy {
    getDefaultReactHost(
      context = applicationContext,
      packages = listOf(
         // Add your custom package here
      )
    )
  }

  override fun onCreate() {
    super.onCreate()
    loadReactNative(this)
  }
