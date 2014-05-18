;(function() {

  var root = this;

  var _old = root._;



  // Init our variable
  var _ = {};

  _.VERSION = '0.1.0';


  // save some local vars
  var arrayProto = Array.prototype;

  var nativeForEach = arrayProto.forEach,
      nativeMap = arrayProto.map,
      nativeFilter = arrayProto.filter;


  /**
   * Each
   * Iterates over a collection using native foreach if applicable.
   * Iteration can be stopped by returning 'false'
   * 
   * @param  {Collection}   collection  Collection to iterate over
   * @param  {Function}     callback    Callback function for each iterated item
   * @param  {Object}       [context]   Optional context to be used in callback function
   */
  _.each = function(collection, callback, context) {
    var i, len;

    if (!collection)
      return collection;

    if (nativeForEach && collection.forEach === nativeForEach) {
      collection.forEach(callback, context);
    } else if(collection.length === +collection.length) {

      for (i = 0, len = collection.length; i < len; ++i) {

        if (callback.call(context, collection[i], i, collection) === false)
          return;

      }

    } else {

      for (i in collection) {
        if (collection.hasOwnProperty(i))
          callback.call(context, collection[i], i);
      }

    }
  };



  /**
   * Map
   * Returns a new array with the callback function applied to each item in the collection.
   * 
   * @param  {Collection}   collection  Collection to iterate over
   * @param  {Function}     callback    Callback function for each iterated item
   * @param  {Object}       [context]   Optional context to be used in callback function
   * @return {Array}                Arary with mapped items
   */
  _.map = function(collection, callback, context) {
    var res = [];

    if (!collection)
      return collection;

    if (nativeMap && collection.map === nativeMap)
      return collection.map(callback, context);

    _.each(collection, function(value, index, list) {
      res.push(callback.call(context, value, index, list));
    });
    return res;
  };



  /**
   * Filter
   * Returns a new array filtered with the callback function
   * All items which returns a 'truthy' value for the callback will exist in the returned array
   * 
   * @param  {Collection}   collection  Collection to iterate over
   * @param  {Function}     callback    Callback function for each iterated item
   * @param  {Object}       [context]   Optional context to be used in callback function
   * @return {Array}                    Filtered array
   */
  _.filter = function(collection, callback, context) {
    var res = [];

    if (!collection)
      return collection;

    if (nativeFilter && collection.filter === nativeFilter)
      return collection.filter(callback, context);

    _.each(function(value, index, list) {
      if (callback.call(context, value, index, list))
        res.push(value);
    });
    return res;
  };




  // expose our variable
  if (typeof define !== 'undefined' && define.amd)
    define(_);
  else if (typeof exports !== 'undefined')
    module.exports = _;
  else
    root._ = _;

}());