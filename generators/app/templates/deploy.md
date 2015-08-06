// Add the code for the project to a git repo

// login to the server
ssh root@13.656.554.443;

// cd to the directory where you want the apps to go

cd deploy

// git clone https..........

// if its a private repo enter your password


// Create a conf file on the server to run the app as a upstart service
nano /etc/init/appname.conf;

// add this to the file

/////////////////////////////////////

start on filesystem and started networking
respawn
chdir /root/deploy/appname
exec /usr/local/bin/node bin/www

////////////////////////////////////

chdir means change directory

stop appname
start appname


// now the app will be restarted every time the server restarts

// cd to the dir where the apps are and hit git pull to update the site
