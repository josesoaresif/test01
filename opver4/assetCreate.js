const fs = require('fs-extra');
const fsDefault = require('fs');
//set buildFolderPath and githubFolderPath according to your development folder structure
const buildFolderPath = `../../../../opencart_3/opencart_3/`;
const githubFolderPath = `../../github/opencart/opencart versão 3/`;

function createVersionAsset(...args) {
    let assetsList = {};
    const cssPath = './public/css/';
    const jsPath = './public/js/';
    let pathRandom;
    let finalPath;
    let valueForJson;
    args[0].forEach((object) => {
      let randomString = Date.now();
      if (object.path.includes('.css')) {
        pathRandom = `${cssPath}${object.path.replace('.css','')}_${randomString}.css`;
        finalPath = cssPath + object.path;
        valueForJson = `${object.path.replace('.css','')}_${randomString}.css`;
        console.log('css path random strings created');

      } 
      if(object.path.includes('.js')) {
        pathRandom = `${jsPath}${object.path.replace('.js','')}_${randomString}.js`;
        finalPath = jsPath + object.path;
        valueForJson = `${object.path.replace('.js','')}_${randomString}.js`;
        console.log('js path random strings created');
      
      } 
     fsDefault.renameSync(finalPath, pathRandom);
      console.log('webpack files rename');
      assetsList[object.path] = valueForJson;
      if (Array.isArray(object.folder)) {
        object.folder.forEach(folder => {
          fs.copySync(pathRandom, `${buildFolderPath}${folder}${valueForJson}`);
          console.log('array copy renamed files to opencart working build');
          fs.copySync(pathRandom, `${githubFolderPath}${folder}${valueForJson}`);
          console.log('array copy renamed files to github opencart');
        });
      } else {
        fs.copySync(pathRandom, `${buildFolderPath}${object.folder}${valueForJson}`);
        console.log('copy renamed files to opencart working build');
        fs.copySync(pathRandom, `${githubFolderPath}${object.folder}${valueForJson}`);
        console.log('array copy renamed files to github opencart');
      }
      
    });
    let data = JSON.stringify(assetsList);
    fs.writeFileSync('./public/assetversionlist.json', data);
    console.log('assetVersioList write');
    fs.copySync('./public/assetVersionList.json', `${buildFolderPath}system/library/ifthenpay/utility/assetversionlist.json`);
    console.log('assetVersioList copy to opencart working build');
    fs.copySync('./public/assetVersionList.json', `${githubFolderPath}system/library/ifthenpay/utility/assetversionlist.json`);
    console.log('assetVersioList copy to github');
}

module.exports.init = function () {
  try {
    const adminCssFolderOpenCart = 'admin/view/stylesheet/ifthenpay/';
    const catalogCssFolderOpenCart = 'catalog/view/theme/default/stylesheet/ifthenpay/';
    const adminJsFolderOpenCart = 'admin/view/javascript/ifthenpay/';
    const catalogJsFolderOpenCart = 'catalog/view/javascript/ifthenpay/';

    fs.removeSync(`${buildFolderPath}system/library/ifthenpay/utility/assetversionlist.json`);
    console.log('assetVersioList remove from opencart working build');
    fs.removeSync(`${githubFolderPath}system/library/ifthenpay/utility/assetversionlist.json`);
    console.log('assetVersioList remove from github');
    fs.emptyDirSync(`${buildFolderPath}admin/view/stylesheet/ifthenpay/`);
    fs.emptyDirSync(`${buildFolderPath}admin/view/javascript/ifthenpay/`);
    fs.emptyDirSync(`${buildFolderPath}catalog/view/theme/default/stylesheet/ifthenpay/`);
    fs.emptyDirSync(`${buildFolderPath}catalog/view/javascript/ifthenpay/`);
    console.log('empty opencart directory');
    fs.emptyDirSync(`${githubFolderPath}admin/view/stylesheet/ifthenpay/`);
    fs.emptyDirSync(`${githubFolderPath}admin/view/javascript/ifthenpay/`);
    fs.emptyDirSync(`${githubFolderPath}catalog/view/theme/default/stylesheet/ifthenpay/`);
    fs.emptyDirSync(`${githubFolderPath}catalog/view/javascript/ifthenpay/`);
    console.log('empty github opencart directory');
    createVersionAsset([
        {'path': 'ifthenpayConfig.css', 'folder': adminCssFolderOpenCart},
        {'path': 'ifthenpayConfirmPage.css', 'folder': catalogCssFolderOpenCart},
        {'path': 'paymentOptions.css', 'folder': catalogCssFolderOpenCart},
        {'path': 'ifthenpaySuccessPage.js', 'folder': catalogJsFolderOpenCart},
        {'path': 'adminConfigPage.js', 'folder': adminJsFolderOpenCart},
        {'path': 'adminOrderPage.js', 'folder': adminJsFolderOpenCart},
        {'path': 'adminOrderCreatePage.js', 'folder': adminJsFolderOpenCart},
        {'path': 'adminOrderInfoPage.js', 'folder': adminJsFolderOpenCart}, 
        {'path': 'checkoutMultibancoPage.js', 'folder': catalogJsFolderOpenCart},
        {'path': 'checkoutMbwayPage.js', 'folder': catalogJsFolderOpenCart},
        {'path': 'checkoutPayshopPage.js', 'folder': catalogJsFolderOpenCart},
        {'path': 'checkoutCcardPage.js', 'folder': catalogJsFolderOpenCart},
    ]);
  } catch (error) {
    console.log(error);
  }
};