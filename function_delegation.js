var Rectangle = function(left, top, height, width, options) {
    this.left = left;
    this.top = top;
    this.height = height;
    this.width = width;
    if (options) {
        this.color = options.color;
        this.border = options.border;
        this.opacity = options.opacity;
    }   
}

Rectangle.prototype.overlaps = function(another) {
  var r1x1 = this.left,
      r1x2 = this.left + this.width,
      r1y1 = this.top,
      r1y2 = this.top + this.height,
      r2x1 = another.left,
      r2x2 = another.left + another.width,
      r2y1 = another.top,
      r2y2 = another.top + another.height;        

  return (r1x2 >= r2x1) && (r1y2 >= r2y1) && (r1x1 <= r2x2) && (r1y1 <= r2y2);
}
 
var myRectangle = new Rectangle(10, 10, 30, 20, {color:'#FAFAFA', opacity:0.7});

var myOtherRectangle = new Rectangle(1, 1, 2, 2, {});

console.log(myRectangle.overlaps(myOtherRectangle)); // false

console.log(Rectangle.prototype.overlaps.call(myRectangle, myOtherRectangle)); // false

console.log(Rectangle.prototype.overlaps.call(
  {left: 10, top: 10, width: 12, height: 6},
  {left: 5, top: 5, width: 40, height: 30},
)); // true
