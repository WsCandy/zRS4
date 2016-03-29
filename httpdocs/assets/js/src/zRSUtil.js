class zRSUtil {

	static log(message, type = `log`) {

		console[type](`[zRS - ${zRS.version()}]: ${message}`);

	}

}

export default zRSUtil;