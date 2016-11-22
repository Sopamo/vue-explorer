import fs from 'fs'

export default {
  type: 'local',
  list (path) {
    return new Promise((resolve, reject) => {
      fs.readdir(path, (err, files) => {
        if (err) {
          reject(err)
        } else {
          resolve(files.map(function(file) {
            let stats = fs.statSync(path + '/' + file)
            let type = 'file'
            if (stats.isDirectory()) {
              type = 'folder'
            }
            return {
              name: file,
              type: type,
              'Modified': stats.mtime
            }
          }))
        }
      })
    })
  }
}
