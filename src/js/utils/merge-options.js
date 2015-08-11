/**
 * @file merge-options.js
 */
import mergeInto from './merge-into.js';

/**
 * Merge one or more options objects, recursively merging **only**
 * plain object properties.  Previously `deepMerge`.
 *
 * @param  {...Object} source One or more objects to merge
 * @returns {Object}   a new object that is the union of all
 * provided objects
 * @function mergeOptions
 */
export default function mergeOptions() {
  // Add a default empty object to merge into so that we don't mutate
  // what has been passed into us
  return mergeInto
    .bind(null, {})
    .apply(null, arguments);
}
