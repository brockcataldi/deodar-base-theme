const path  = require('path');
const fs    = require('fs');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

const getBlockPoints = (directory) => {

    const directoryURI = path.resolve(__dirname, 'blocks', directory);
    const blockPoints = [];

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

                    blockPoints.push({ 
                        name: directoryEntry,
                        entry: entryPoints, 
                        output:  path.resolve(directoryURI, directoryEntry)
                    });
                }
            }
        }
        return blockPoints;
    }catch(error){
        console.error(error);
    }
};

const getBlockModule = (options, points) => {

    return {
        entry: points.entry,
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
            path: points.output,
            filename: `${points.name}.build.js`
        },
        plugins: [
            new RemoveEmptyScriptsPlugin(),
            new MiniCssExtractPlugin({
                filename: `${points.name}.build.css`
            }),
        ],
        externals: {
            jquery: 'jQuery',
            gsap: 'gsap'
        }
    };
}

const getBlocksModules = (options) => {

    const blocksLocation = path.resolve(__dirname, 'blocks');
    const directories = fs.readdirSync(blocksLocation);
    let modules = [];

    for(const directory of directories){

        if(!directory.includes('.')){
            modules = [
                ...modules, 
                ...getBlockPoints(directory).map((points) => getBlockModule(options, points))
            ];
        }
    }

    return modules;
}

const getBaseEntryPoints = () => {

    const entryPoints = {};
    const partsURI = path.resolve(__dirname, 'source');

    try{
        if(fs.existsSync( partsURI )){
            const partsEntries = fs.readdirSync(partsURI);
            
            for(const partsEntry of partsEntries){
                if(partsEntry.includes('.') != false){
                    const name = partsEntry.split('.')[0];

                    if( name in entryPoints ){
                        entryPoints[name].push(path.resolve(__dirname, 'source', partsEntry));
                    }else{
                        entryPoints[name] = [path.resolve(__dirname, 'source', partsEntry)]
                    }
                }
            }
        }
    }
    catch(error){
        console.error(error);
    }

    return entryPoints;
}

const getBaseModules = (options) => {

    const baseModules = [];

    for (const [key, value] of Object.entries(getBaseEntryPoints())) {
        
        baseModules.push({
            entry: { [key]: value},
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
                filename: '[name].build.js'
            },
            plugins: [
                new RemoveEmptyScriptsPlugin(),
                new MiniCssExtractPlugin({
                    filename: "[name].build.css"
                }),
                new MiniCssExtractPlugin({
                    filename: "../editor-style.css"
                })
            ],
            externals: {
                jquery: 'jQuery',
                gsap: 'gsap'
            }
        })
    }


    return baseModules;
}

module.exports = (env, options) => {
    return [
        ...getBlocksModules(options),
        ...getBaseModules(options)
    ];
}
