module.exports = function(grunt){

    grunt.loadNpmTasks("grunt-nodemon");
    grunt.loadNpmTasks("grunt-concurrent");
    grunt.loadNpmTasks("grunt-contrib-watch");
    
    grunt.initConfig({
    concurrent:{
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
        }
    }    
    });


    grunt.registerTask("default"["nodemon"]);
};
                   
