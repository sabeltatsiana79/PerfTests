class DirectLinks {
	set link(url)     { this.env = url};
	get hostPage()    { return this.env};
}

module.exports = {DirectLinks: DirectLinks};
