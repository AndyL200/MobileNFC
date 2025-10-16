package com.anonymous.sampleNFC

import android.nfc.cardemulation.HostApduService
import android.os.Bundle
import android.util.Log

class ApduService : HostApduService() {
    //macros in hexadecimal
    companion object {
        val Tag = "HCE process "
        val STATUS_SUCCESS = "9000"
        val STATUS_FAILED = "6F00"
        val CLA_NOT_SUPPORTED = "6E00"
        val INS_NOT_SUPPORTED = "6D00"
        val AID = "A0000002471001"
        val SELECT_INS = "A4"
        val DEFAULT_CLA = "00"
        val MIN_APDU_LENGTH = 12
    }
    //this should return a byte array
    override fun processCommandApdu(commandApdu: ByteArray?, extras: Bundle?): ByteArray? {
        //TODO("Not yet implemented")
        val hexCommandApdu = toHex(commandApdu)

        if(hexCommandApdu.length < MIN_APDU_LENGTH) {
            return hexStringToByteArray(STATUS_FAILED)
        }
        if(hexCommandApdu.substring(0,2) != DEFAULT_CLA) {
            return hexStringToByteArray(CLA_NOT_SUPPORTED)
        }
        if(hexCommandApdu.substring(2,4) != SELECT_INS) {
            return hexStringToByteArray(INS_NOT_SUPPORTED);
        }
        if(hexCommandApdu.substring(10,24) == AID) {
            return hexStringToByteArray(STATUS_SUCCESS)
        }
        else {
            Log.d(Tag, "failed")
            return hexStringToByteArray(STATUS_FAILED)
        }

    }

    override fun onDeactivated(reason: Int) {
        //TODO("Not yet implemented")

    }
    private val HEX_CHARS = "0123456789ABCDEF"
    private fun hexStringToByteArray(st : String) : ByteArray
    {
        val byteList = ArrayList<Byte>();

        for(i in st.indices step 2)
        {
            val fbyte = HEX_CHARS.indexOf(st[i])
            val sbyte = HEX_CHARS.indexOf(st[i+1])

            val octet = fbyte.shl(4).or(sbyte)
            byteList.add(octet.toByte())
        }
        return byteList.toByteArray()
    }
    private val HEX_ARRAY = "0123456789ABCDEF".toCharArray()
    private fun toHex(byteArray: ByteArray) : String {
        val result = StringBuffer()
        byteArray.forEach {
            val oct = it.toInt()
            val f = oct and 0xF0.ushr(4)
            val s = oct and 0x0F
            result.append(HEX_ARRAY[f])
            result.append(HEX_ARRAY[s])
        }
        return result.toString()
        }
    }