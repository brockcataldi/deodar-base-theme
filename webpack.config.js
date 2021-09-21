const path  = require('path');
const fs    = require('fs');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

const getBlockEntryPoints = (directory) => {

    const directoryURI = path.resolve(__dirname, 'blocks', directory);
    const blockStyles = {};

    try{
        if(fs.existsSync(directoryURI)){
            const directoryEntries = fs.readdirSync(directoryURI);

            for(const directoryEntry of directoryEntries){
                if(directoryEntry.includes('.') == false){

                    const fileStylesURI = path.resolve(directoryURI, directoryEntry, `${directoryEntry}.scss`);
                    const fileScriptsURI = path.resolve(directoryURI, directoryEntry, `${directoryEntry}.js`);
                    const entryPoints = [];


                    if(fs.existsSync(fileStylesURI)){
                        entryPoints.push(fileStylesURI);
                    }

                    if(fs.existsSync(fileScriptsURI)){
                        entryPoints.push(fileScriptsURI);
                    }

                    blockStyles[directoryEntry] = entryPoints;
                }
            }
        }
        return blockStyles;
    }catch(error){
        console.error(error);
    }
};

const getBlockModule = (options, key) => {
    return {
        entry: () => {
            return getBlockEntryPoints(key)
        },
        resolve: {
            alias: {
                'scss': path.resolve(__dirname, 'source', 'scss' ),
                'js': path.resolve(__dirname, 'source', 'js' ),
                'template-parts': path.resolve(__dirname, 'template-parts')
            }
        },
        mode: options.mode,
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
}

const getBlocksModules = (options) => {

    const directories = fs.readdirSync(path.resolve(__dirname, 'blocks'));
    const modules = [];

    for(const directory of directories){

        modules.push(getBlockModule(options, directory));
    }

    return modules;
}

const getPartsEntryPoints = () => {
    const partsURI = path.resolve(__dirname, 'template-parts');

    const entryPoints = [
        path.resolve(__dirname, 'source', 'index.scss'),
        path.resolve(__dirname, 'source', 'index.js'),
    ];

    try{
        if(fs.existsSync(partsURI)){
            const partsEntries = fs.readdirSync(partsURI);

            for(const partsEntry of partsEntries){
                if(partsEntry.includes('.') == false){

                    const fileStylesURI = path.resolve(partsURI, partsEntry, `${partsEntry}.scss`);

                    if(fs.existsSync(fileStylesURI)){
                        entryPoints.push(fileStylesURI);
                    }
                }
            }
        }

        return { main: entryPoints };
    }catch(error){
        console.error(error);
    }

}

const getPartsModule = (options) => {

    return [{
        entry: () => {
            return getPartsEntryPoints()
        },
        resolve: {
            alias: {
                'scss': path.resolve(__dirname, 'source', 'scss' ),
                'js': path.resolve(__dirname, 'source', 'js' ),
                'template-parts': path.resolve(__dirname, 'template-parts')
            }
        },
        mode: options.mode,
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
            path: path.resolve(__dirname, 'build'),
            filename: '[name].js'
        },
        plugins: [
            new RemoveEmptyScriptsPlugin(),
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            }),
        ],
    }];
}

module.exports = (env, options) => {
    return [
        ...getBlocksModules(options),
        ...getPartsModule(options)
    ];
}