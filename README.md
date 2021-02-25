
# Features

1. Carousel accepts one argument **looped**. If the loop property is true
then carousel becomes looped, and it can be scrolled "infinitely" in a circle.
2. There are arrows allowing sliding to next or previous image/slide.
3. Progress bar in the bottom of the carousel indicates the current opened
image/slide. By clicking on any of the point, carousel will be scrolled
to selected slide
4. Carousel is adaptable for both desktop and mobile devices.

P.S. It is possible to modify Carousel in order it to meet any needs.
To show its possibilities I decided to make it square and centralize
content passed to it.

# Run application
To run application, it is enough to open index.html file in a desired browser.

# Building application

After setting up the environment and writing all the necessary React code,
open terminal, navigate to project folder and execute following command

**npm run build**

It will run "webpack --mode development" command that will build 
the main.js file representing the web app you have built! 

# Setting up the environment

**Notice**: all commands should be executed in the command line!  
**Prerequisites**: You should have installed Node.js with npm (new version of
Node.js already contains npm)

To setting up the environment we can simply run 'create-react-app' command in command line.  
But if you want to make it manually, here is a complete guide down below :)

To begin with we should set up the node environment. It gives all useful
libraries and access to v8-compile-engine that will compile all the Js code for us.

To do this, create empty folder where will be the desired project,
and navigate to it in command line and enter following command:

**npm init**
 
After setting up the node_modules, we may install all necessary libraries to
build the React project

### Installing react libraries

**npm install --save-dev react**  
**npm install --save-dev react-dom**

### Installing babel
Babel allows us to interpret JavaScript code to any desired version of Js code.
In our case Babel will interpret React code to simple javascript code
that will be used by Browser to simulate web-app behaviour

**npm install --save-dev @babel/core**  
**npm install --save-dev @babel/preset-react**  
**npm install --save-dev babel-loader**

### Installing webpack
Webpack is used for building project for us, it will use
babel-loader to compile all the js files, and simultaneously
style-loader/css-loader to compile css files and all of them
will be merged to one **main.js** file

**npm install --save-dev webpack**
**npm install --save-dev webpack-cli**

### Final preparation 
After the installation, we need to create a file **.babelrc** with content

{  
"presets": ["@babel/preset-react"]  
}

Now we need to create **webpack.config.js** with  

module.exports = {  
    module: {  
        rules: [  
            {  
                test: /\.jsx?$/,  
                exclude: /node_modules/,  
                use: {  
                    loader: "babel-loader"  
                }  
            },  
            {  
                test: /\.css$/i,  
                use: ["style-loader", "css-loader"]  
            }  
        ]  
    }  
};  

Also, we need to add following "build" line to scripts in **package.json**

"scripts": {  
    "test": "echo \"Error: no test specified\" && exit 1",   
    **"build": "webpack --mode development"**  
},

Finally, we need to create **index.html** file which will load all the compiled
scripts by webpack. (look into **index.html** file).

End!