module.exports = function(grunt){

    grunt.loadNpmTasks("grunt-nodemon");
    grunt.loadNpmTasks("grunt-concurrent");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-less");
    
    grunt.initConfig({
    concurrent:{
      dev: {
        tasks: ["nodemon", "watch"],
        logConcurrentOutput:true
      }
    },
        
    nodemon:{
        dev: {
            script: 'index.js'
        }
    },
    watch:{
        options:{
        livereload:true
        },
        html:{
            files: "**/*.html"
        },
        less:{
          files:"**/*.less",
          tasks:["less"]
        }
    },
    less:{
      development:{
        options:{
          paths:["assets/css"]
        },
        files:{
          "assets/css/style.css":"test.less"
        }
      },
      production:{
        options:{
          paths:["assets/css"]
        },
        files:{
          "public/css/style.css":"test.less"
        }
      }
    }
    });


    grunt.registerTask("default",["concurrent"]);
};
                   
