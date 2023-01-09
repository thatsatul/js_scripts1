var book = {
  _year: 2004,
  edition: 1
};
Object.defineProperty(book, "year", {
  get: function(){
    // console.log('****** book.year called ******', book.year);
    return this._year;
  },
  set: function(newValue){
    if (newValue > 2004) {
      console.log('******* book.year ****** reassigned ******', newValue);
      this._year = newValue;
      this.edition = newValue - 2004 + 1;
    }
  }
});
book.year = 2005;
console.log(book.year, book.edition); //2
book.year = 2006;
console.log(book.year, book.edition); //3
