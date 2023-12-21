const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
	entry: './src/index.tsx',
	mode: 'development',
	devServer: {
		static: path.join(__dirname, 'dist'),
		compress: true,
		port: 80,
		open: false,
		historyApiFallback: true,
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss'],
	},
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				use: {
					loader: 'ts-loader',
				},
			},
			{
				test: /\.html$/i,
				loader: 'html-loader',
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'sass-loader',
					},
				],
			},
			{
				test: /\.svg$/i,
				type: 'asset',
				resourceQuery: /url/, // *.svg?url
			},
			{
				test: /\.svg$/i,
				issuer: /\.[jt]sx?$/,
				resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
				use: ['@svgr/webpack'],
			},
			{
				test: /\.(gif|svg|jpg|png)$/,
				loader: 'file-loader',
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
	],
}
