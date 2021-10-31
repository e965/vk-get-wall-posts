import { API as VKAPI, createCollectIterator } from 'vk-io'
import onDeath from 'death'

import { getTokenFromVkURL } from './utilities/vk-utilities.js'
import { writeDataToFile } from './utilities/files-utilities.js'

const GROUP_ID = 0
const APP_ID = 6703807

const URL_WITH_TOKEN = ''

const API = new VKAPI({ appId: APP_ID, token: getTokenFromVkURL(URL_WITH_TOKEN) })

const DATABASE = {}

let postsCount = 0
let postsParsed = 0

const writeFile = () => {
	writeDataToFile('./db', GROUP_ID, DATABASE)
}

const printProgress = (progress, end) => {
	process.stdout.clearLine()
	process.stdout.cursorTo(0)
	process.stdout.write(`Обработано записей: ${progress} из ${end}`)
}

const getWallIterator = createCollectIterator({
	api: API,
	method: 'wall.get',
	params: {
		owner_id: -GROUP_ID
	},
	countPerRequest: 200,
})

const fun = async () => {
	try {
		for await (const chunk of getWallIterator) {
			chunk.items.forEach(item => {
				if (!(item.from_id in DATABASE)) {
					DATABASE[Number(item.from_id)] = []
				}

				DATABASE[item.from_id].push(item.id)
			})

			postsCount = chunk.total

			postsParsed += chunk.items.length

			if (chunk.items.length !== 0) {
				printProgress(postsParsed - 1, postsCount)
			}
		}
	} finally {
		writeFile()
	}
}

fun()

onDeath(() => {
	console.log('\nВыполнение скрипта прервано.')
	writeFile()

	process.exit()
})
