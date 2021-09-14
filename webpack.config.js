
const path  = require('path');
const fs    = require('fs');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

const externals = {
    jquery: 'jQuery',
};

/**
 * Scans specified directory with a depth of 1, for a specificed file type
 * 
 * @param {string} target the path of the target directory
 * @param {string} type the file type to look for
 * @param {bool} flat whether or not to return an object or just string
 * @returns {string[]} of stylesheet names and paths
 */
const gather = (target, type, flat = false) => {
    const directories = fs.readdirSync(target)
                          .reduce((files, entry) => {

                            const entryPath = path.resolve(target, entry);

                            if( fs.lstatSync(entryPath).isDirectory() ){

                                const scanned = fs.readdirSync(entryPath)
                                .reduce((found, subEntry) => {

                                       if(subEntry.includes(type)){

                                           found.push(
                                            ( flat === true) ? path.resolve(entryPath, subEntry) :
                                            {
                                               entry:  path.resolve(entryPath, subEntry),
                                               name: subEntry.replace(`.${type}`, '')
                                           }
                                           
                                           );

                                       }
                                       return found;

                                }, [])

                                return files.concat(scanned);
                            }

                            return files;
                            
                          }, []);
    return directories;
};

/**
 * Creates a webpack module for the stylesheet
 * 
 * @param {object} options webpack options
 * @param {object} data the stylesheet data
 * @param {string} key the root key for filing
 * @returns {object}
 */
const style = (options, data, key) => {

    const { name, entry } = data;

    return {
        resolve: {
            alias: {
                library: path.resolve(__dirname, 'library'),
            }
        },
        mode: options.mode,
        entry: {
            [name]: entry
        },
        module: {
            rules: [
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader",
                    ],
                },
            ],
        },
        output: {
            path: path.resolve(__dirname, 'build', key),
            filename: '[name].js'
        },
        plugins: [
            new RemoveEmptyScriptsPlugin(),
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            }),
        ],
    };
};

/**
 * Creates the webpack config file
 * 
 * @param {object} env I honestly have no idea what gets passed here
 * @param {object} options Webpack options from the cli
 * @returns {void}
 */
module.exports = (env, options) => {

    const modules = [];

    const blockStyles = {
        acf: gather(path.resolve(__dirname, 'blocks', 'acf'), 'scss'),
        core: gather(path.resolve(__dirname, 'blocks', 'core'), 'scss'),
    };

    for( const [ key, stylesheets ] of Object.entries( blockStyles ) ){
        for ( const stylesheet of stylesheets ){
            modules.push(style(options, stylesheet, key));
        }
    }

    const componentStyles = [
        path.resolve(__dirname, 'source', 'index.scss'),
        ...gather(path.resolve(__dirname, 'template-parts'), 'scss', true)
    ];

    modules.push( style(options, {
        entry: componentStyles,
        name: 'components'
    }, '') );


    const blockScripts = {
        acf: gather(path.resolve(__dirname, 'blocks', 'acf'), 'js'),   
    }

    for( const [ key, stylesheets ] of Object.entries( blockScripts ) ){
        for ( const stylesheet of stylesheets ){
            modules.push(style(options, stylesheet, key));
        }
    }

    return modules;
}
  
  