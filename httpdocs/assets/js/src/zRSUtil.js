class zRSUtil {

	static log(message, type = `log`) {

		console[type](`[zRS]: ${message}`);

	}

}

module.exports = zRSUtil;