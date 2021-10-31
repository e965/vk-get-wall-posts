export const getTokenFromVkURL = (urlString) => {
	const VkURL = new URL(urlString)

	const SeachParamsFromVkURL = new URLSearchParams(VkURL.hash.substring(1))

	return SeachParamsFromVkURL.get('access_token')
}
