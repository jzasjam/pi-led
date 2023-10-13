# pi-led

##### By Jonathan Zasada-James 

### Node.js web server for controlling the LEDs on the Raspberry Pi Sense Hat with a HTML/JS user interface
------------------------------

## Pre-requisite:  
Install NodeJS
> eg: `curl -sL https://deb.nodesource/setup_18.x | sudo -E bash -`
> then: `sudo apt install -y nodejs`
> check with: `node -v`

Install NodeJS Modules
> Node Sense Hat: `npm install node-sense-hat`

> Sense Hat LED: `npm install sense-hat-led`

> Socket.io `npm install socket.io` 
------------------------------

## 1. pi-led Setup:  
Place the directory on your machine in an easy to access directory

------------------------------
### 2.  In terminal, cd to the directory you downloaded 
> eg: `cd Downloads/pi-led`

------------------------------

### 3. Start the web server 
> `node webserver.js`

------------------------------

### 4. View the application at https://raspberrypi:8080 (where 'raspberrypi' is the hostname) or https://[pi-ip-address]:8080 or https://localhost:8080
 - http://raspberrypi:8080/index.html - Choose a colour, draw on your Pi Sense Hat
 - http://raspberrypi:8080/send_message.html - Type, choose colours and send a message to Pi Sense Hat 

---------------------

## Notes:

- Might need `sudo` for commands
