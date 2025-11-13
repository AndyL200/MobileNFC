package com.app

object ApduDataStore {
    @Volatile
    private var payload: ByteArray? = null
    @Volatile
    private var enabled: Boolean = false

    @Synchronized
    fun setPayload(data: ByteArray?) {
        payload = data
    }

    @Synchronized
    fun getPayload(): ByteArray? = payload

    fun enable() {
        enabled = true
    }

    fun disable() {
        enabled = false
    }

    fun isEnabled(): Boolean = enabled

}