/**
 * @file merge.js
 */
import merge from 'lodash-compat/object/merge';

function isPlain(obj) {
  return !!obj
    && typeof obj === 'object'
    && obj.toString() === '[object Object]'
    && obj.constructor === Object;
}

/**
 * Merge customizer. video.js simply overwrites non-simple objects
 * (like arrays) instead of attempting to overlay them.
 * @see https://lodash.com/docs#merge
 */
const customizer = function(destination, source) {
  // If we're not working with a plain object, copy the value as is
  // If source is an array, for instance, it will replace destination
  if (!isPlain(source)) {
    return source;
  }

  // If the new value is a plain object but the first object value is not
  // we need to create a new object for the first object to merge with.
  // This makes it consistent with how merge() works by default
  // and also protects from later changes the to first object affecting
  // the second object's values.
  if (!isPlain(destination)) {
    return mergeInto({}, source);
  }
};

/**
 * Merge one or more options objects, recursively merging **only**
 * plain object properties.
 *
 * @param  target      destination to merge into
 * @param  {...Object} source One or more objects to merge
 * @returns {Object}   the target parameter
 * provided objects
 * @function mergeOptions
 */
export default function mergeInto(target) {
  // contruct the call dynamically to handle the variable number of
  // objects to merge
  let args = Array.prototype.slice.call(arguments);

  // customize conflict resolution to match our historical merge behavior
  args.push(customizer);

  merge.apply(null, args);

  // return the mutated result object
  return target;
}
