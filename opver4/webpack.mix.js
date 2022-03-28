const mix = require('laravel-mix');
const fs = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // installed via npm

const ImageminPlugin = require( 'imagemin-webpack-plugin' ).default;

mix.webpackConfig({
  plugins: [
      new CleanWebpackPlugin()
  ]
});

mix.setPublicPath('./public')

mix.ts('./_dev/js/adminConfigPage.ts', 'public/js/adminConfigPage.js')
mix.ts('./_dev/js/adminOrderPage.ts', 'public/js/adminOrderPage.js')
mix.ts('./_dev/js/adminOrderCreatePage.ts', 'public/js/adminOrderCreatePage.js')
mix.ts('./_dev/js/ifthenpaySuccessPage.ts', 'public/js/ifthenpaySuccessPage.js')
mix.ts('./_dev/js/checkoutMultibancoPage.ts', 'public/js/checkoutMultibancoPage.js')
mix.ts('./_dev/js/checkoutMbwayPage.ts', 'public/js/checkoutMbwayPage.js')
mix.ts('./_dev/js/checkoutPayshopPage.ts', 'public/js/checkoutPayshopPage.js')
mix.ts('./_dev/js/checkoutCcardPage.ts', 'public/js/checkoutCcardPage.js')
mix.ts('./_dev/js/adminOrderInfoPage.ts', 'public/js/adminOrderInfoPage.js')
    .webpackConfig({
        resolve: {
          extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
        },
        plugins: [
            new ImageminPlugin( {
    //            disable: process.env.NODE_ENV !== 'production', // Disable during development
                pngquant: {
                    quality: '95-100',
                },
                test: /\.(jpe?g|png|gif|svg)$/i,
            }),
        ],
      })
    .sass('./_dev/scss/ifthenpayConfig.scss', 'public/css/ifthenpayConfig.css')
    .sass('./_dev/scss/ifthenpayPaymentMethodSetup.scss', 'public/css/ifthenpayPaymentMethodSetup.css')
    .sass('./_dev/scss/ifthenpayConfirmPage.scss', 'public/css/ifthenpayConfirmPage.css')
    .sass('./_dev/scss/paymentOptions.scss', 'public/css/paymentOptions.css')
    .options({
        processCssUrls: false
    });
//mix.version();
mix.babel(['public/js/ifthenpaySuccessPage.js'], 'public/js/ifthenpaySuccessPage.js')
mix.babel(['public/js/adminConfigPage.js'], 'public/js/adminConfigPage.js')
mix.babel(['public/js/adminOrderPage.js'], 'public/js/adminOrderPage.js')
mix.babel(['public/js/adminOrderCreatePage.js'], 'public/js/adminOrderCreatePage.js')
mix.babel(['public/js/checkoutMultibancoPage.js'], 'public/js/checkoutMultibancoPage.js')
mix.babel(['public/js/checkoutMbwayPage.js'], 'public/js/checkoutMbwayPage.js')
mix.babel(['public/js/checkoutPayshopPage.js'], 'public/js/checkoutPayshopPage.js')
mix.babel(['public/js/checkoutCcardPage.js'], 'public/js/checkoutCcardPage.js')
mix.babel(['public/js/adminOrderInfoPage.js'], 'public/js/adminOrderInfoPage.js')
