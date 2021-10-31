import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'

const getFileName = (dirString, groupID) => {
	const Now = Date.now()
	const DateNow = new Date(Now)

	let dir = dirString

	if (!existsSync(dir)) mkdirSync(dir)

	let fileName = join(
		dir,
		`${groupID}_${DateNow.getFullYear()}-${DateNow.getMonth()}-${DateNow.getDate()}_${Now}.json`
	)

	return fileName
}

export const writeDataToFile = (dirString, groupID, data) => {
	return writeFileSync(
		getFileName(dirString, groupID),
		JSON.stringify(data, null, '\t')
	)
}
