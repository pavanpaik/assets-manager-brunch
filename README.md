assets-manager-brunch
====================

Adds copy of multiple assets folders to build destination support to brunch.

###Install the plugin :
```js
npm install --save assets-manager-brunch
```

###Add assets-manager to brunch config :
Add all assets files you want to copy. This example copy:

* `app/myFolder/include`and `app/css/img` to `myFolder` public directory
* all files in `app/assets/` to `myAssets` public directory


```coffee
assets_manager:
  files: ['app/scripts/**/partials/*']
  base: 'app/scripts/'
```
