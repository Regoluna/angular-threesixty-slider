# Angular 360 image slider directive

An angular directive to create  360 degree slider.

Currently only supports basic operations:
* At the start it loads and visualizes the first image.
* Once the first image is loaded it loads the rest of the list asynchronously. When done, spins 360 degress and activates mouse and touch interaction.

## TODO
* Set more configuration parameters using attributes: Direction, Speed, ...
* Give more feedback about loading status and weh its ready to spin.

## Dependencies
Angular JS.

## Install
1. download the files or use Bower:

	add `"angular-threesixty-slider": "latest"` to your `bower.json` file then run `bower install` OR run

	`bower install angular-threesixty-slider --save`

3. include the files in your app
	1. `src/regthreesixty.js`
	2. `src/regthreesixty.css`
4. include the module in angular (i.e. in `app.js`) - `reg.threesixty`


## Basic usage

1. Create a list of images in your scope:
```javascript
    $scope.imageList = [];

    for( i=1; i<50; i++ ){
      $scope.imageList.push( 'images/' + i + '.jpg' );
    }
```
2. Include **threesixty** directive in HTML. Set image list using `images` attribute.
```html
<threesixty images="imageList" >
```
