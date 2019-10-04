REM @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
REM @ WEB SERVER START SCRIPT
REM @ @version: 1.0
REM @ @authors: Government of Canada
REM @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

@echo off
if "%1" == "start" ( 
	echo "serving content from %2"
	%~dp0\.serve\win\tiny %~dp0\%2 8000
)

if "%1" == "stop" (
	echo "shutting down server"
	taskkill /f /im "tiny.exe"
)

