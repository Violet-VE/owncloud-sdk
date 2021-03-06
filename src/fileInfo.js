/**
 * @class FileInfo
 * @classdesc FileInfo class, stores information regarding a file/folder
 * @param   {string}    name     name of file/folder
 * @param   {string}    type     "file" => file ; "dir" => folder
 * @param   {string}    attr     attributes of file like size, time added etc.
 */
function FileInfo (name, type, attr) {
  this.name = name
  this.type = type
  this.fileInfo = {}

  for (var key in attr) {
    this.fileInfo[key] = attr[key]
  }
}

/**
 * Gets the name of file/folder
 * @returns {string}    name of file/folder
 */
FileInfo.prototype.getName = function () {
  var name = this.name.split('/')
  name = name.filter(function (n) {
    return n !== ''
  })
  var send = name[name.length - 1]

  return send
}

/**
 * Gets path of file/folder
 * @returns {string}    Path of file/folder
 */
FileInfo.prototype.getPath = function () {
  var name = this.name.split('/')
  name = name.filter(function (n) {
    return n !== ''
  })
  var send = '/'
  for (var i = 0; i < name.length - 1; i++) {
    send += name[i] + '/'
  }

  return send
}

/**
 * Gets size of the file/folder
 * @returns {number}   Size of file/folder
 */
FileInfo.prototype.getSize = function () {
  return parseInt(this.fileInfo['{DAV:}getcontentlength']) || null
}

/**
 * Gets the file id
 * @returns {string}    file id
 */
FileInfo.prototype.getFileId = function () {
  return this.fileInfo['{http://owncloud.org/ns}fileid'] || null
}

/**
 * Gets ETag of file/folder
 * @returns {string}    ETag of file/folder
 */
FileInfo.prototype.getETag = function () {
  return this.fileInfo['{DAV:}getetag'] || null
}

/**
 * Gets content-type of file/folder
 * @returns {string}    content-type of file/folder
 */
FileInfo.prototype.getContentType = function () {
  var type = this.fileInfo['{DAV:}getcontenttype']
  if (this.isDir()) {
    type = 'httpd/unix-directory'
  }
  return type
}

/**
 * Gets last modified time of file/folder
 * @returns {Date}   Last modified time of file/folder
 */
FileInfo.prototype.getLastModified = function () {
  return new Date(this.fileInfo['{DAV:}getlastmodified'])
}

/**
 * Gets arbitrary property
 * @param   {string} property name of the property
 * @returns {string}          Value of the property
 */
FileInfo.prototype.getProperty = function (property) {
  return this.fileInfo[property]
}

/**
 * Checks wether the information is for a folder
 * @returns {boolean}   true if folder
 */
FileInfo.prototype.isDir = function () {
  return this.type === 'dir'
}

module.exports = FileInfo
