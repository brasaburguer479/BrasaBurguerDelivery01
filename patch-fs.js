const fs = require('fs');

// Fix for Windows FAT32 drives where readlink on regular files returns EISDIR instead of EINVAL
if (process.platform === 'win32') {
  const origReadlink = fs.readlink;
  const origReadlinkSync = fs.readlinkSync;
  const origPromisesReadlink = fs.promises ? fs.promises.readlink : null;

  fs.readlink = function(path, options, callback) {
    const cb = typeof options === 'function' ? options : callback;
    const opts = typeof options === 'function' ? undefined : options;
    return origReadlink.call(fs, path, opts, (err, linkString) => {
      if (err && (err.code === 'EISDIR' || err.code === 'UNKNOWN')) {
        const e = new Error(err.message);
        e.code = 'EINVAL';
        return cb(e);
      }
      return cb(err, linkString);
    });
  };

  fs.readlinkSync = function(path, options) {
    try {
      return origReadlinkSync.call(fs, path, options);
    } catch (err) {
      if (err && (err.code === 'EISDIR' || err.code === 'UNKNOWN')) {
        const e = new Error(err.message);
        e.code = 'EINVAL';
        throw e;
      }
      throw err;
    }
  };

  if (origPromisesReadlink) {
    fs.promises.readlink = async function(path, options) {
      try {
        return await origPromisesReadlink.call(fs.promises, path, options);
      } catch (err) {
        if (err && (err.code === 'EISDIR' || err.code === 'UNKNOWN')) {
          const e = new Error(err.message);
          e.code = 'EINVAL';
          throw e;
        }
        throw err;
      }
    };
  }
}
