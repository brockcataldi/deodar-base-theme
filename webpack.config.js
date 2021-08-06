
const path  = require('path');
const fs    = require('fs');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

/**
 * Scans specified directory with a depth of 1, for a specificed file type
 * 
 * @param {string} target the path of the target directory
 * @param {string} type the file type to look for
 * @returns [] of stylesheet names and paths
 */
const gather = (target, type) => {
    const directories = fs.readdirSync(target)
                          .reduce((files, directory) => {

                            const scanned = fs.readdirSync(path.resolve(target, directory))
                                     .reduce((found, file) => {
                                            if(file.includes(type)){
                                                found.push({
                                                    entry:  path.resolve(target, directory, file),
                                                    name: file.replace(`.${type}`, '')
                                                })
                                            }
                                            return found;
                                     }, [])

                            return files.concat(scanned);
                          }, []);
    return directories;
};

/**
 * Creates a webpack module for the stylesheet
 * 
 * @param {object} options webpack options
 * @param {object} data the stylesheet data
 * @param {string} key the root key for filing
 * @returns 
 */
const style = (options, data, key) => {

    const { name, entry } = data;

    return {
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
 * @returns 
 */
module.exports = (env, options) => {

    const modules = [];

    const styles = {
        acf: gather(path.resolve(__dirname, 'blocks', 'acf'), 'scss'),
        core: gather(path.resolve(__dirname, 'blocks', 'core'), 'scss')
    };

    for( const [ key, stylesheets ] of Object.entries( styles ) ){
        for ( const stylesheet of stylesheets ){
            modules.push(style(options, stylesheet, key));
        }
    }

    return modules;
}
  
  