'use strict'

let fs = require('fs')
let path = require('path')

let { VK } = require('vk-io')
let onDeath = require('death')

let GROUP_ID = 0
let APP_ID = 6703807

let URL_ = new URL('')

let TOKEN = URL_ ?
	new URLSearchParams(URL_.hash.substring(1)).get('access_token')
	: ''

let vk = new VK({ appId: APP_ID, token: TOKEN })

let database = {}

let postsCount = 0
let postsParsed = 0

let getFileName = () => {
	let date = new Date()

	let dir = './db'

	if (!fs.existsSync(dir)) fs.mkdirSync(dir)

	let filePath = path.join(
		dir,
		`${GROUP_ID}_${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${(date / 1000).toFixed(0)}.json`
	)

	return filePath
}

let writeFile = () => fs.writeFileSync(getFileName(), JSON.stringify(database, null, '\t'))

let printProgress = (progress, end) => {
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    process.stdout.write(`Обработано записей: ${progress} из ${end}`)
}

let getWall = async ({ count = 1, offset = 0 }) => {
	return await vk.api.wall.get({
		owner_id: -GROUP_ID,
		count: count,
		offset: offset
	})
}

let fun = ({ count = 100, offset = 0 }) => {
	getWall({ count: count, offset: offset })

		.then(r => {
			r.items.forEach(item => {
				if (!(item.from_id in database)) {
					database[Number(item.from_id)] = []
				}

				database[item.from_id].push(item.id)
			})

			if (offset == 0) {
				postsCount = r.count
			}

			offset += count

			postsParsed += r.items.length

			if (r.items.length != 0) {
				printProgress(postsParsed - 1, postsCount)
				fun({ count: count, offset: offset })
			} else {
				writeFile()
			}
		})

		.catch(e => {
			console.log('\nВыполнение скрипта прервано.')
			writeFile()
		})
}

fun({})

onDeath(() => {
	console.log('\nВыполнение скрипта прервано.')
	writeFile()

	process.exit()
})
