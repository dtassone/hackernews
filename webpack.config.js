const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	context: __dirname,
	mode: 'development',
	entry: [
		'webpack-dev-server/client?http://localhost:8080',
		'./src/index.tsx' 
	],
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.less|\.css$/,
                use: [ 
                    'style-loader',
                    'css-loader', 
                    'less-loader'
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
                exclude: /node_modules/,
                use: ['file-loader?name=[name].[ext]']
              }
		]
	},
	resolve: {
		extensions: [ '.tsx', '.ts', '.js' ]
    },
    devServer: {
		// hot:true,
        contentBase: ['./dist', './public'],
        compress: true,
        port: 3000
	},
	plugins: [
		// new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'HackerNews Reader - Development',
			template: './public/index.html'
		})
	],
	output: {
		filename: 'app-bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
};
