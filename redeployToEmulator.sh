#!/bin/sh
ionic build android
adb install -r platforms/android/ant-build/CordovaApp-debug.apk 

