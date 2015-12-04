/*
 * Ext JS Library 2.2.1 Copyright(c) 2006-2009, Ext JS, LLC. licensing@extjs.com
 * 
 * http://extjs.com/license
 */

Ext.DomHelper = function() {
	var n = null;
	var g = /^(?:br|frame|hr|img|input|link|meta|range|spacer|wbr|area|param|col)$/i;
	var b = /^table|tbody|tr|td$/i;
	var a = function(w) {
		if (typeof w == "string") {
			return w
		}
		var q = "";
		if (Ext.isArray(w)) {
			for (var u = 0, r = w.length;u < r; u++) {
				q += a(w[u])
			}
			return q
		}
		if (!w.tag) {
			w.tag = "div"
		}
		q += "<" + w.tag;
		for (var p in w) {
			if (p == "tag" || p == "children" || p == "cn" || p == "html"
					|| typeof w[p] == "function") {
				continue
			}
			if (p == "style") {
				var v = w.style;
				if (typeof v == "function") {
					v = v.call()
				}
				if (typeof v == "string") {
					q += ' style="' + v + '"'
				} else {
					if (typeof v == "object") {
						q += ' style="';
						for (var t in v) {
							if (typeof v[t] != "function") {
								q += t + ":" + v[t] + ";"
							}
						}
						q += '"'
					}
				}
			} else {
				if (p == "cls") {
					q += ' class="' + w.cls + '"'
				} else {
					if (p == "htmlFor") {
						q += ' for="' + w.htmlFor + '"'
					} else {
						q += " " + p + '="' + w[p] + '"'
					}
				}
			}
		}
		if (g.test(w.tag)) {
			q += "/>"
		} else {
			q += ">";
			var x = w.children || w.cn;
			if (x) {
				q += a(x)
			} else {
				if (w.html) {
					q += w.html
				}
			}
			q += "</" + w.tag + ">"
		}
		return q
	};
	var o = function(v, q) {
		var u;
		if (Ext.isArray(v)) {
			u = document.createDocumentFragment();
			for (var t = 0, r = v.length;t < r; t++) {
				o(v[t], u)
			}
		} else {
			if (typeof v == "string") {
				u = document.createTextNode(v)
			} else {
				u = document.createElement(v.tag || "div");
				var s = !!u.setAttribute;
				for (var p in v) {
					if (p == "tag" || p == "children" || p == "cn"
							|| p == "html" || p == "style"
							|| typeof v[p] == "function") {
						continue
					}
					if (p == "cls") {
						u.className = v.cls
					} else {
						if (s) {
							u.setAttribute(p, v[p])
						} else {
							u[p] = v[p]
						}
					}
				}
				Ext.DomHelper.applyStyles(u, v.style);
				var w = v.children || v.cn;
				if (w) {
					o(w, u)
				} else {
					if (v.html) {
						u.innerHTML = v.html
					}
				}
			}
		}
		if (q) {
			q.appendChild(u)
		}
		return u
	};
	var k = function(v, t, r, u) {
		n.innerHTML = [t, r, u].join("");
		var p = -1, q = n;
		while (++p < v) {
			q = q.firstChild
		}
		return q
	};
	var l = "<table>", e = "</table>", c = l + "<tbody>", m = "</tbody>" + e, i = c
			+ "<tr>", d = "</tr>" + m;
	var h = function(p, q, s, r) {
		if (!n) {
			n = document.createElement("div")
		}
		var t;
		var u = null;
		if (p == "td") {
			if (q == "afterbegin" || q == "beforeend") {
				return
			}
			if (q == "beforebegin") {
				u = s;
				s = s.parentNode
			} else {
				u = s.nextSibling;
				s = s.parentNode
			}
			t = k(4, i, r, d)
		} else {
			if (p == "tr") {
				if (q == "beforebegin") {
					u = s;
					s = s.parentNode;
					t = k(3, c, r, m)
				} else {
					if (q == "afterend") {
						u = s.nextSibling;
						s = s.parentNode;
						t = k(3, c, r, m)
					} else {
						if (q == "afterbegin") {
							u = s.firstChild
						}
						t = k(4, i, r, d)
					}
				}
			} else {
				if (p == "tbody") {
					if (q == "beforebegin") {
						u = s;
						s = s.parentNode;
						t = k(2, l, r, e)
					} else {
						if (q == "afterend") {
							u = s.nextSibling;
							s = s.parentNode;
							t = k(2, l, r, e)
						} else {
							if (q == "afterbegin") {
								u = s.firstChild
							}
							t = k(3, c, r, m)
						}
					}
				} else {
					if (q == "beforebegin" || q == "afterend") {
						return
					}
					if (q == "afterbegin") {
						u = s.firstChild
					}
					t = k(2, l, r, e)
				}
			}
		}
		s.insertBefore(t, u);
		return t
	};
	return {
		useDom : false,
		markup : function(p) {
			return a(p)
		},
		applyStyles : function(r, s) {
			if (s) {
				r = Ext.fly(r);
				if (typeof s == "string") {
					var q = /\s?([a-z\-]*)\:\s?([^;]*);?/gi;
					var t;
					while ((t = q.exec(s)) != null) {
						r.setStyle(t[1], t[2])
					}
				} else {
					if (typeof s == "object") {
						for (var p in s) {
							r.setStyle(p, s[p])
						}
					} else {
						if (typeof s == "function") {
							Ext.DomHelper.applyStyles(r, s.call())
						}
					}
				}
			}
		},
		insertHtml : function(r, t, s) {
			r = r.toLowerCase();
			if (t.insertAdjacentHTML) {
				if (b.test(t.tagName)) {
					var q;
					if (q = h(t.tagName.toLowerCase(), r, t, s)) {
						return q
					}
				}
				switch (r) {
					case "beforebegin" :
						t.insertAdjacentHTML("BeforeBegin", s);
						return t.previousSibling;
					case "afterbegin" :
						t.insertAdjacentHTML("AfterBegin", s);
						return t.firstChild;
					case "beforeend" :
						t.insertAdjacentHTML("BeforeEnd", s);
						return t.lastChild;
					case "afterend" :
						t.insertAdjacentHTML("AfterEnd", s);
						return t.nextSibling
				}
				throw 'Illegal insertion point -> "' + r + '"'
			}
			var p = t.ownerDocument.createRange();
			var u;
			switch (r) {
				case "beforebegin" :
					p.setStartBefore(t);
					u = p.createContextualFragment(s);
					t.parentNode.insertBefore(u, t);
					return t.previousSibling;
				case "afterbegin" :
					if (t.firstChild) {
						p.setStartBefore(t.firstChild);
						u = p.createContextualFragment(s);
						t.insertBefore(u, t.firstChild);
						return t.firstChild
					} else {
						t.innerHTML = s;
						return t.firstChild
					}
				case "beforeend" :
					if (t.lastChild) {
						p.setStartAfter(t.lastChild);
						u = p.createContextualFragment(s);
						t.appendChild(u);
						return t.lastChild
					} else {
						t.innerHTML = s;
						return t.lastChild
					}
				case "afterend" :
					p.setStartAfter(t);
					u = p.createContextualFragment(s);
					t.parentNode.insertBefore(u, t.nextSibling);
					return t.nextSibling
			}
			throw 'Illegal insertion point -> "' + r + '"'
		},
		insertBefore : function(p, r, q) {
			return this.doInsert(p, r, q, "beforeBegin")
		},
		insertAfter : function(p, r, q) {
			return this.doInsert(p, r, q, "afterEnd", "nextSibling")
		},
		insertFirst : function(p, r, q) {
			return this.doInsert(p, r, q, "afterBegin", "firstChild")
		},
		doInsert : function(s, u, t, v, r) {
			s = Ext.getDom(s);
			var q;
			if (this.useDom) {
				q = o(u, null);
				(r === "firstChild" ? s : s.parentNode).insertBefore(q, r
						? s[r]
						: s)
			} else {
				var p = a(u);
				q = this.insertHtml(v, s, p)
			}
			return t ? Ext.get(q, true) : q
		},
		append : function(r, t, s) {
			r = Ext.getDom(r);
			var q;
			if (this.useDom) {
				q = o(t, null);
				r.appendChild(q)
			} else {
				var p = a(t);
				q = this.insertHtml("beforeEnd", r, p)
			}
			return s ? Ext.get(q, true) : q
		},
		overwrite : function(p, r, q) {
			p = Ext.getDom(p);
			p.innerHTML = a(r);
			return q ? Ext.get(p.firstChild, true) : p.firstChild
		},
		createTemplate : function(q) {
			var p = a(q);
			return new Ext.Template(p)
		}
	}
}();
Ext.Template = function(g) {
	var c = arguments;
	if (Ext.isArray(g)) {
		g = g.join("")
	} else {
		if (c.length > 1) {
			var d = [];
			for (var e = 0, b = c.length;e < b; e++) {
				if (typeof c[e] == "object") {
					Ext.apply(this, c[e])
				} else {
					d[d.length] = c[e]
				}
			}
			g = d.join("")
		}
	}
	this.html = g;
	if (this.compiled) {
		this.compile()
	}
};
Ext.Template.prototype = {
	applyTemplate : function(b) {
		if (this.compiled) {
			return this.compiled(b)
		}
		var a = this.disableFormats !== true;
		var e = Ext.util.Format, c = this;
		var d = function(h, l, p, k) {
			if (p && a) {
				if (p.substr(0, 5) == "this.") {
					return c.call(p.substr(5), b[l], b)
				} else {
					if (k) {
						var o = /^\s*['"](.*)["']\s*$/;
						k = k.split(",");
						for (var n = 0, g = k.length;n < g; n++) {
							k[n] = k[n].replace(o, "$1")
						}
						k = [b[l]].concat(k)
					} else {
						k = [b[l]]
					}
					return e[p].apply(e, k)
				}
			} else {
				return b[l] !== undefined ? b[l] : ""
			}
		};
		return this.html.replace(this.re, d)
	},
	set : function(a, b) {
		this.html = a;
		this.compiled = null;
		if (b) {
			this.compile()
		}
		return this
	},
	disableFormats : false,
	re : /\{([\w-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g,
	compile : function() {
		var fm = Ext.util.Format;
		var useF = this.disableFormats !== true;
		var sep = Ext.isGecko ? "+" : ",";
		var fn = function(m, name, format, args) {
			if (format && useF) {
				args = args ? "," + args : "";
				if (format.substr(0, 5) != "this.") {
					format = "fm." + format + "("
				} else {
					format = 'this.call("' + format.substr(5) + '", ';
					args = ", values"
				}
			} else {
				args = "";
				format = "(values['" + name + "'] == undefined ? '' : "
			}
			return "'" + sep + format + "values['" + name + "']" + args + ")"
					+ sep + "'"
		};
		var body;
		if (Ext.isGecko) {
			body = "this.compiled = function(values){ return '"
					+ this.html.replace(/\\/g, "\\\\").replace(/(\r\n|\n)/g,
							"\\n").replace(/'/g, "\\'").replace(this.re, fn)
					+ "';};"
		} else {
			body = ["this.compiled = function(values){ return ['"];
			body.push(this.html.replace(/\\/g, "\\\\").replace(/(\r\n|\n)/g,
					"\\n").replace(/'/g, "\\'").replace(this.re, fn));
			body.push("'].join('');};");
			body = body.join("")
		}
		eval(body);
		return this
	},
	call : function(c, b, a) {
		return this[c](b, a)
	},
	insertFirst : function(b, a, c) {
		return this.doInsert("afterBegin", b, a, c)
	},
	insertBefore : function(b, a, c) {
		return this.doInsert("beforeBegin", b, a, c)
	},
	insertAfter : function(b, a, c) {
		return this.doInsert("afterEnd", b, a, c)
	},
	append : function(b, a, c) {
		return this.doInsert("beforeEnd", b, a, c)
	},
	doInsert : function(c, e, b, a) {
		e = Ext.getDom(e);
		var d = Ext.DomHelper.insertHtml(c, e, this.applyTemplate(b));
		return a ? Ext.get(d, true) : d
	},
	overwrite : function(b, a, c) {
		b = Ext.getDom(b);
		b.innerHTML = this.applyTemplate(a);
		return c ? Ext.get(b.firstChild, true) : b.firstChild
	}
};
Ext.Template.prototype.apply = Ext.Template.prototype.applyTemplate;
Ext.DomHelper.Template = Ext.Template;
Ext.Template.from = function(b, a) {
	b = Ext.getDom(b);
	return new Ext.Template(b.value || b.innerHTML, a || "")
};
Ext.DomQuery = function() {
	var cache = {}, simpleCache = {}, valueCache = {};
	var nonSpace = /\S/;
	var trimRe = /^\s+|\s+$/g;
	var tplRe = /\{(\d+)\}/g;
	var modeRe = /^(\s?[\/>+~]\s?|\s|$)/;
	var tagTokenRe = /^(#)?([\w-\*]+)/;
	var nthRe = /(\d*)n\+?(\d*)/, nthRe2 = /\D/;
	function child(p, index) {
		var i = 0;
		var n = p.firstChild;
		while (n) {
			if (n.nodeType == 1) {
				if (++i == index) {
					return n
				}
			}
			n = n.nextSibling
		}
		return null
	}
	function next(n) {
		while ((n = n.nextSibling) && n.nodeType != 1) {
		}
		return n
	}
	function prev(n) {
		while ((n = n.previousSibling) && n.nodeType != 1) {
		}
		return n
	}
	function children(d) {
		var n = d.firstChild, ni = -1;
		while (n) {
			var nx = n.nextSibling;
			if (n.nodeType == 3 && !nonSpace.test(n.nodeValue)) {
				d.removeChild(n)
			} else {
				n.nodeIndex = ++ni
			}
			n = nx
		}
		return this
	}
	function byClassName(c, a, v) {
		if (!v) {
			return c
		}
		var r = [], ri = -1, cn;
		for (var i = 0, ci;ci = c[i]; i++) {
			if ((" " + ci.className + " ").indexOf(v) != -1) {
				r[++ri] = ci
			}
		}
		return r
	}
	function attrValue(n, attr) {
		if (!n.tagName && typeof n.length != "undefined") {
			n = n[0]
		}
		if (!n) {
			return null
		}
		if (attr == "for") {
			return n.htmlFor
		}
		if (attr == "class" || attr == "className") {
			return n.className
		}
		return n.getAttribute(attr) || n[attr]
	}
	function getNodes(ns, mode, tagName) {
		var result = [], ri = -1, cs;
		if (!ns) {
			return result
		}
		tagName = tagName || "*";
		if (typeof ns.getElementsByTagName != "undefined") {
			ns = [ns]
		}
		if (!mode) {
			for (var i = 0, ni;ni = ns[i]; i++) {
				cs = ni.getElementsByTagName(tagName);
				for (var j = 0, ci;ci = cs[j]; j++) {
					result[++ri] = ci
				}
			}
		} else {
			if (mode == "/" || mode == ">") {
				var utag = tagName.toUpperCase();
				for (var i = 0, ni, cn;ni = ns[i]; i++) {
					cn = ni.children || ni.childNodes;
					for (var j = 0, cj;cj = cn[j]; j++) {
						if (cj.nodeName == utag || cj.nodeName == tagName
								|| tagName == "*") {
							result[++ri] = cj
						}
					}
				}
			} else {
				if (mode == "+") {
					var utag = tagName.toUpperCase();
					for (var i = 0, n;n = ns[i]; i++) {
						while ((n = n.nextSibling) && n.nodeType != 1) {
						}
						if (n
								&& (n.nodeName == utag || n.nodeName == tagName || tagName == "*")) {
							result[++ri] = n
						}
					}
				} else {
					if (mode == "~") {
						for (var i = 0, n;n = ns[i]; i++) {
							while ((n = n.nextSibling)
									&& (n.nodeType != 1 || (tagName == "*" || n.tagName
											.toLowerCase() != tagName))) {
							}
							if (n) {
								result[++ri] = n
							}
						}
					}
				}
			}
		}
		return result
	}
	function concat(a, b) {
		if (b.slice) {
			return a.concat(b)
		}
		for (var i = 0, l = b.length;i < l; i++) {
			a[a.length] = b[i]
		}
		return a
	}
	function byTag(cs, tagName) {
		if (cs.tagName || cs == document) {
			cs = [cs]
		}
		if (!tagName) {
			return cs
		}
		var r = [], ri = -1;
		tagName = tagName.toLowerCase();
		for (var i = 0, ci;ci = cs[i]; i++) {
			if (ci.nodeType == 1 && ci.tagName.toLowerCase() == tagName) {
				r[++ri] = ci
			}
		}
		return r
	}
	function byId(cs, attr, id) {
		if (cs.tagName || cs == document) {
			cs = [cs]
		}
		if (!id) {
			return cs
		}
		var r = [], ri = -1;
		for (var i = 0, ci;ci = cs[i]; i++) {
			if (ci && ci.id == id) {
				r[++ri] = ci;
				return r
			}
		}
		return r
	}
	function byAttribute(cs, attr, value, op, custom) {
		var r = [], ri = -1, st = custom == "{";
		var f = Ext.DomQuery.operators[op];
		for (var i = 0, ci;ci = cs[i]; i++) {
			var a;
			if (st) {
				a = Ext.DomQuery.getStyle(ci, attr)
			} else {
				if (attr == "class" || attr == "className") {
					a = ci.className
				} else {
					if (attr == "for") {
						a = ci.htmlFor
					} else {
						if (attr == "href") {
							a = ci.getAttribute("href", 2)
						} else {
							a = ci.getAttribute(attr)
						}
					}
				}
			}
			if ((f && f(a, value)) || (!f && a)) {
				r[++ri] = ci
			}
		}
		return r
	}
	function byPseudo(cs, name, value) {
		return Ext.DomQuery.pseudos[name](cs, value)
	}
	var isIE = window.ActiveXObject ? true : false;
	eval("var batch = 30803;");
	var key = 30803;
	function nodupIEXml(cs) {
		var d = ++key;
		cs[0].setAttribute("_nodup", d);
		var r = [cs[0]];
		for (var i = 1, len = cs.length;i < len; i++) {
			var c = cs[i];
			if (!c.getAttribute("_nodup") != d) {
				c.setAttribute("_nodup", d);
				r[r.length] = c
			}
		}
		for (var i = 0, len = cs.length;i < len; i++) {
			cs[i].removeAttribute("_nodup")
		}
		return r
	}
	function nodup(cs) {
		if (!cs) {
			return []
		}
		var len = cs.length, c, i, r = cs, cj, ri = -1;
		if (!len || typeof cs.nodeType != "undefined" || len == 1) {
			return cs
		}
		if (isIE && typeof cs[0].selectSingleNode != "undefined") {
			return nodupIEXml(cs)
		}
		var d = ++key;
		cs[0]._nodup = d;
		for (i = 1;c = cs[i]; i++) {
			if (c._nodup != d) {
				c._nodup = d
			} else {
				r = [];
				for (var j = 0;j < i; j++) {
					r[++ri] = cs[j]
				}
				for (j = i + 1;cj = cs[j]; j++) {
					if (cj._nodup != d) {
						cj._nodup = d;
						r[++ri] = cj
					}
				}
				return r
			}
		}
		return r
	}
	function quickDiffIEXml(c1, c2) {
		var d = ++key;
		for (var i = 0, len = c1.length;i < len; i++) {
			c1[i].setAttribute("_qdiff", d)
		}
		var r = [];
		for (var i = 0, len = c2.length;i < len; i++) {
			if (c2[i].getAttribute("_qdiff") != d) {
				r[r.length] = c2[i]
			}
		}
		for (var i = 0, len = c1.length;i < len; i++) {
			c1[i].removeAttribute("_qdiff")
		}
		return r
	}
	function quickDiff(c1, c2) {
		var len1 = c1.length;
		if (!len1) {
			return c2
		}
		if (isIE && c1[0].selectSingleNode) {
			return quickDiffIEXml(c1, c2)
		}
		var d = ++key;
		for (var i = 0;i < len1; i++) {
			c1[i]._qdiff = d
		}
		var r = [];
		for (var i = 0, len = c2.length;i < len; i++) {
			if (c2[i]._qdiff != d) {
				r[r.length] = c2[i]
			}
		}
		return r
	}
	function quickId(ns, mode, root, id) {
		if (ns == root) {
			var d = root.ownerDocument || root;
			return d.getElementById(id)
		}
		ns = getNodes(ns, mode, "*");
		return byId(ns, null, id)
	}
	return {
		getStyle : function(el, name) {
			return Ext.fly(el).getStyle(name)
		},
		compile : function(path, type) {
			type = type || "select";
			var fn = ["var f = function(root){\n var mode; ++batch; var n = root || document;\n"];
			var q = path, mode, lq;
			var tk = Ext.DomQuery.matchers;
			var tklen = tk.length;
			var mm;
			var lmode = q.match(modeRe);
			if (lmode && lmode[1]) {
				fn[fn.length] = 'mode="' + lmode[1].replace(trimRe, "") + '";';
				q = q.replace(lmode[1], "")
			}
			while (path.substr(0, 1) == "/") {
				path = path.substr(1)
			}
			while (q && lq != q) {
				lq = q;
				var tm = q.match(tagTokenRe);
				if (type == "select") {
					if (tm) {
						if (tm[1] == "#") {
							fn[fn.length] = 'n = quickId(n, mode, root, "'
									+ tm[2] + '");'
						} else {
							fn[fn.length] = 'n = getNodes(n, mode, "' + tm[2]
									+ '");'
						}
						q = q.replace(tm[0], "")
					} else {
						if (q.substr(0, 1) != "@") {
							fn[fn.length] = 'n = getNodes(n, mode, "*");'
						}
					}
				} else {
					if (tm) {
						if (tm[1] == "#") {
							fn[fn.length] = 'n = byId(n, null, "' + tm[2]
									+ '");'
						} else {
							fn[fn.length] = 'n = byTag(n, "' + tm[2] + '");'
						}
						q = q.replace(tm[0], "")
					}
				}
				while (!(mm = q.match(modeRe))) {
					var matched = false;
					for (var j = 0;j < tklen; j++) {
						var t = tk[j];
						var m = q.match(t.re);
						if (m) {
							fn[fn.length] = t.select.replace(tplRe, function(x,
									i) {
								return m[i]
							});
							q = q.replace(m[0], "");
							matched = true;
							break
						}
					}
					if (!matched) {
						throw 'Error parsing selector, parsing failed at "' + q
								+ '"'
					}
				}
				if (mm[1]) {
					fn[fn.length] = 'mode="' + mm[1].replace(trimRe, "") + '";';
					q = q.replace(mm[1], "")
				}
			}
			fn[fn.length] = "return nodup(n);\n}";
			eval(fn.join(""));
			return f
		},
		select : function(path, root, type) {
			if (!root || root == document) {
				root = document
			}
			if (typeof root == "string") {
				root = document.getElementById(root)
			}
			var paths = path.split(",");
			var results = [];
			for (var i = 0, len = paths.length;i < len; i++) {
				var p = paths[i].replace(trimRe, "");
				if (!cache[p]) {
					cache[p] = Ext.DomQuery.compile(p);
					if (!cache[p]) {
						throw p + " is not a valid selector"
					}
				}
				var result = cache[p](root);
				if (result && result != document) {
					results = results.concat(result)
				}
			}
			if (paths.length > 1) {
				return nodup(results)
			}
			return results
		},
		selectNode : function(path, root) {
			return Ext.DomQuery.select(path, root)[0]
		},
		selectValue : function(path, root, defaultValue) {
			path = path.replace(trimRe, "");
			if (!valueCache[path]) {
				valueCache[path] = Ext.DomQuery.compile(path, "select")
			}
			var n = valueCache[path](root);
			n = n[0] ? n[0] : n;
			var v = (n && n.firstChild ? n.firstChild.nodeValue : null);
			return ((v === null || v === undefined || v === "")
					? defaultValue
					: v)
		},
		selectNumber : function(path, root, defaultValue) {
			var v = Ext.DomQuery.selectValue(path, root, defaultValue || 0);
			return parseFloat(v)
		},
		is : function(el, ss) {
			if (typeof el == "string") {
				el = document.getElementById(el)
			}
			var isArray = Ext.isArray(el);
			var result = Ext.DomQuery.filter(isArray ? el : [el], ss);
			return isArray ? (result.length == el.length) : (result.length > 0)
		},
		filter : function(els, ss, nonMatches) {
			ss = ss.replace(trimRe, "");
			if (!simpleCache[ss]) {
				simpleCache[ss] = Ext.DomQuery.compile(ss, "simple")
			}
			var result = simpleCache[ss](els);
			return nonMatches ? quickDiff(result, els) : result
		},
		matchers : [
				{
					re : /^\.([\w-]+)/,
					select : 'n = byClassName(n, null, " {1} ");'
				},
				{
					re : /^\:([\w-]+)(?:\(((?:[^\s>\/]*|.*?))\))?/,
					select : 'n = byPseudo(n, "{1}", "{2}");'
				},
				{
					re : /^(?:([\[\{])(?:@)?([\w-]+)\s?(?:(=|.=)\s?['"]?(.*?)["']?)?[\]\}])/,
					select : 'n = byAttribute(n, "{2}", "{4}", "{3}", "{1}");'
				},
				{
					re : /^#([\w-]+)/,
					select : 'n = byId(n, null, "{1}");'
				},
				{
					re : /^@([\w-]+)/,
					select : 'return {firstChild:{nodeValue:attrValue(n, "{1}")}};'
				}],
		operators : {
			"=" : function(a, v) {
				return a == v
			},
			"!=" : function(a, v) {
				return a != v
			},
			"^=" : function(a, v) {
				return a && a.substr(0, v.length) == v
			},
			"$=" : function(a, v) {
				return a && a.substr(a.length - v.length) == v
			},
			"*=" : function(a, v) {
				return a && a.indexOf(v) !== -1
			},
			"%=" : function(a, v) {
				return (a % v) == 0
			},
			"|=" : function(a, v) {
				return a && (a == v || a.substr(0, v.length + 1) == v + "-")
			},
			"~=" : function(a, v) {
				return a && (" " + a + " ").indexOf(" " + v + " ") != -1
			}
		},
		pseudos : {
			"first-child" : function(c) {
				var r = [], ri = -1, n;
				for (var i = 0, ci;ci = n = c[i]; i++) {
					while ((n = n.previousSibling) && n.nodeType != 1) {
					}
					if (!n) {
						r[++ri] = ci
					}
				}
				return r
			},
			"last-child" : function(c) {
				var r = [], ri = -1, n;
				for (var i = 0, ci;ci = n = c[i]; i++) {
					while ((n = n.nextSibling) && n.nodeType != 1) {
					}
					if (!n) {
						r[++ri] = ci
					}
				}
				return r
			},
			"nth-child" : function(c, a) {
				var r = [], ri = -1;
				var m = nthRe.exec(a == "even" && "2n" || a == "odd" && "2n+1"
						|| !nthRe2.test(a) && "n+" + a || a);
				var f = (m[1] || 1) - 0, l = m[2] - 0;
				for (var i = 0, n;n = c[i]; i++) {
					var pn = n.parentNode;
					if (batch != pn._batch) {
						var j = 0;
						for (var cn = pn.firstChild;cn; cn = cn.nextSibling) {
							if (cn.nodeType == 1) {
								cn.nodeIndex = ++j
							}
						}
						pn._batch = batch
					}
					if (f == 1) {
						if (l == 0 || n.nodeIndex == l) {
							r[++ri] = n
						}
					} else {
						if ((n.nodeIndex + l) % f == 0) {
							r[++ri] = n
						}
					}
				}
				return r
			},
			"only-child" : function(c) {
				var r = [], ri = -1;
				for (var i = 0, ci;ci = c[i]; i++) {
					if (!prev(ci) && !next(ci)) {
						r[++ri] = ci
					}
				}
				return r
			},
			empty : function(c) {
				var r = [], ri = -1;
				for (var i = 0, ci;ci = c[i]; i++) {
					var cns = ci.childNodes, j = 0, cn, empty = true;
					while (cn = cns[j]) {
						++j;
						if (cn.nodeType == 1 || cn.nodeType == 3) {
							empty = false;
							break
						}
					}
					if (empty) {
						r[++ri] = ci
					}
				}
				return r
			},
			contains : function(c, v) {
				var r = [], ri = -1;
				for (var i = 0, ci;ci = c[i]; i++) {
					if ((ci.textContent || ci.innerText || "").indexOf(v) != -1) {
						r[++ri] = ci
					}
				}
				return r
			},
			nodeValue : function(c, v) {
				var r = [], ri = -1;
				for (var i = 0, ci;ci = c[i]; i++) {
					if (ci.firstChild && ci.firstChild.nodeValue == v) {
						r[++ri] = ci
					}
				}
				return r
			},
			checked : function(c) {
				var r = [], ri = -1;
				for (var i = 0, ci;ci = c[i]; i++) {
					if (ci.checked == true) {
						r[++ri] = ci
					}
				}
				return r
			},
			not : function(c, ss) {
				return Ext.DomQuery.filter(c, ss, true)
			},
			any : function(c, selectors) {
				var ss = selectors.split("|");
				var r = [], ri = -1, s;
				for (var i = 0, ci;ci = c[i]; i++) {
					for (var j = 0;s = ss[j]; j++) {
						if (Ext.DomQuery.is(ci, s)) {
							r[++ri] = ci;
							break
						}
					}
				}
				return r
			},
			odd : function(c) {
				return this["nth-child"](c, "odd")
			},
			even : function(c) {
				return this["nth-child"](c, "even")
			},
			nth : function(c, a) {
				return c[a - 1] || []
			},
			first : function(c) {
				return c[0] || []
			},
			last : function(c) {
				return c[c.length - 1] || []
			},
			has : function(c, ss) {
				var s = Ext.DomQuery.select;
				var r = [], ri = -1;
				for (var i = 0, ci;ci = c[i]; i++) {
					if (s(ss, ci).length > 0) {
						r[++ri] = ci
					}
				}
				return r
			},
			next : function(c, ss) {
				var is = Ext.DomQuery.is;
				var r = [], ri = -1;
				for (var i = 0, ci;ci = c[i]; i++) {
					var n = next(ci);
					if (n && is(n, ss)) {
						r[++ri] = ci
					}
				}
				return r
			},
			prev : function(c, ss) {
				var is = Ext.DomQuery.is;
				var r = [], ri = -1;
				for (var i = 0, ci;ci = c[i]; i++) {
					var n = prev(ci);
					if (n && is(n, ss)) {
						r[++ri] = ci
					}
				}
				return r
			}
		}
	}
}();
Ext.query = Ext.DomQuery.select;
Ext.util.Observable = function() {
	if (this.listeners) {
		this.on(this.listeners);
		delete this.listeners
	}
};
Ext.util.Observable.prototype = {
	fireEvent : function() {
		if (this.eventsSuspended !== true) {
			var a = this.events[arguments[0].toLowerCase()];
			if (typeof a == "object") {
				return a.fire
						.apply(a, Array.prototype.slice.call(arguments, 1))
			}
		}
		return true
	},
	filterOptRe : /^(?:scope|delay|buffer|single)$/,
	addListener : function(a, c, b, h) {
		if (typeof a == "object") {
			h = a;
			for (var g in h) {
				if (this.filterOptRe.test(g)) {
					continue
				}
				if (typeof h[g] == "function") {
					this.addListener(g, h[g], h.scope, h)
				} else {
					this.addListener(g, h[g].fn, h[g].scope, h[g])
				}
			}
			return
		}
		h = (!h || typeof h == "boolean") ? {} : h;
		a = a.toLowerCase();
		var d = this.events[a] || true;
		if (typeof d == "boolean") {
			d = new Ext.util.Event(this, a);
			this.events[a] = d
		}
		d.addListener(c, b, h)
	},
	removeListener : function(a, c, b) {
		var d = this.events[a.toLowerCase()];
		if (typeof d == "object") {
			d.removeListener(c, b)
		}
	},
	purgeListeners : function() {
		for (var a in this.events) {
			if (typeof this.events[a] == "object") {
				this.events[a].clearListeners()
			}
		}
	},
	relayEvents : function(g, d) {
		var e = function(h) {
			return function() {
				return this.fireEvent.apply(this, Ext.combine(h,
						Array.prototype.slice.call(arguments, 0)))
			}
		};
		for (var c = 0, a = d.length;c < a; c++) {
			var b = d[c];
			if (!this.events[b]) {
				this.events[b] = true
			}
			g.on(b, e(b), this)
		}
	},
	addEvents : function(e) {
		if (!this.events) {
			this.events = {}
		}
		if (typeof e == "string") {
			for (var d = 0, b = arguments, c;c = b[d]; d++) {
				if (!this.events[b[d]]) {
					this.events[b[d]] = true
				}
			}
		} else {
			Ext.applyIf(this.events, e)
		}
	},
	hasListener : function(a) {
		var b = this.events[a];
		return typeof b == "object" && b.listeners.length > 0
	},
	suspendEvents : function() {
		this.eventsSuspended = true
	},
	resumeEvents : function() {
		this.eventsSuspended = false
	},
	getMethodEvent : function(i) {
		if (!this.methodEvents) {
			this.methodEvents = {}
		}
		var h = this.methodEvents[i];
		if (!h) {
			h = {};
			this.methodEvents[i] = h;
			h.originalFn = this[i];
			h.methodName = i;
			h.before = [];
			h.after = [];
			var c, b, d;
			var g = this;
			var a = function(l, k, e) {
				if ((b = l.apply(k || g, e)) !== undefined) {
					if (typeof b === "object") {
						if (b.returnValue !== undefined) {
							c = b.returnValue
						} else {
							c = b
						}
						if (b.cancel === true) {
							d = true
						}
					} else {
						if (b === false) {
							d = true
						} else {
							c = b
						}
					}
				}
			};
			this[i] = function() {
				c = b = undefined;
				d = false;
				var k = Array.prototype.slice.call(arguments, 0);
				for (var l = 0, e = h.before.length;l < e; l++) {
					a(h.before[l].fn, h.before[l].scope, k);
					if (d) {
						return c
					}
				}
				if ((b = h.originalFn.apply(g, k)) !== undefined) {
					c = b
				}
				for (var l = 0, e = h.after.length;l < e; l++) {
					a(h.after[l].fn, h.after[l].scope, k);
					if (d) {
						return c
					}
				}
				return c
			}
		}
		return h
	},
	beforeMethod : function(d, b, a) {
		var c = this.getMethodEvent(d);
		c.before.push( {
			fn : b,
			scope : a
		})
	},
	afterMethod : function(d, b, a) {
		var c = this.getMethodEvent(d);
		c.after.push( {
			fn : b,
			scope : a
		})
	},
	removeMethodListener : function(h, d, c) {
		var g = this.getMethodEvent(h);
		for (var b = 0, a = g.before.length;b < a; b++) {
			if (g.before[b].fn == d && g.before[b].scope == c) {
				g.before.splice(b, 1);
				return
			}
		}
		for (var b = 0, a = g.after.length;b < a; b++) {
			if (g.after[b].fn == d && g.after[b].scope == c) {
				g.after.splice(b, 1);
				return
			}
		}
	}
};
Ext.util.Observable.prototype.on = Ext.util.Observable.prototype.addListener;
Ext.util.Observable.prototype.un = Ext.util.Observable.prototype.removeListener;
Ext.util.Observable.capture = function(c, b, a) {
	c.fireEvent = c.fireEvent.createInterceptor(b, a)
};
Ext.util.Observable.releaseCapture = function(a) {
	a.fireEvent = Ext.util.Observable.prototype.fireEvent
};
(function() {
	var b = function(g, i, e) {
		var d = new Ext.util.DelayedTask();
		return function() {
			d.delay(i.buffer, g, e, Array.prototype.slice.call(arguments, 0))
		}
	};
	var c = function(i, k, g, d) {
		return function() {
			k.removeListener(g, d);
			return i.apply(d, arguments)
		}
	};
	var a = function(e, g, d) {
		return function() {
			var h = Array.prototype.slice.call(arguments, 0);
			setTimeout(function() {
				e.apply(d, h)
			}, g.delay || 10)
		}
	};
	Ext.util.Event = function(e, d) {
		this.name = d;
		this.obj = e;
		this.listeners = []
	};
	Ext.util.Event.prototype = {
		addListener : function(h, g, e) {
			g = g || this.obj;
			if (!this.isListening(h, g)) {
				var d = this.createListener(h, g, e);
				if (!this.firing) {
					this.listeners.push(d)
				} else {
					this.listeners = this.listeners.slice(0);
					this.listeners.push(d)
				}
			}
		},
		createListener : function(i, g, k) {
			k = k || {};
			g = g || this.obj;
			var d = {
				fn : i,
				scope : g,
				options : k
			};
			var e = i;
			if (k.delay) {
				e = a(e, k, g)
			}
			if (k.single) {
				e = c(e, this, i, g)
			}
			if (k.buffer) {
				e = b(e, k, g)
			}
			d.fireFn = e;
			return d
		},
		findListener : function(m, k) {
			k = k || this.obj;
			var g = this.listeners;
			for (var h = 0, d = g.length;h < d; h++) {
				var e = g[h];
				if (e.fn == m && e.scope == k) {
					return h
				}
			}
			return -1
		},
		isListening : function(e, d) {
			return this.findListener(e, d) != -1
		},
		removeListener : function(g, e) {
			var d;
			if ((d = this.findListener(g, e)) != -1) {
				if (!this.firing) {
					this.listeners.splice(d, 1)
				} else {
					this.listeners = this.listeners.slice(0);
					this.listeners.splice(d, 1)
				}
				return true
			}
			return false
		},
		clearListeners : function() {
			this.listeners = []
		},
		fire : function() {
			var g = this.listeners, m, d = g.length;
			if (d > 0) {
				this.firing = true;
				var h = Array.prototype.slice.call(arguments, 0);
				for (var k = 0;k < d; k++) {
					var e = g[k];
					if (e.fireFn
							.apply(e.scope || this.obj || window, arguments) === false) {
						this.firing = false;
						return false
					}
				}
				this.firing = false
			}
			return true
		}
	}
})();
Ext.EventManager = function() {
	var x, q, m = false;
	var n, w, g, s;
	var p = Ext.lib.Event;
	var r = Ext.lib.Dom;
	var a = "Ext";
	var i = {};
	var o = function(D, z, C, B, A) {
		var F = Ext.id(D);
		if (!i[F]) {
			i[F] = {}
		}
		var E = i[F];
		if (!E[z]) {
			E[z] = []
		}
		var y = E[z];
		y.push( {
			id : F,
			ename : z,
			fn : C,
			wrap : B,
			scope : A
		});
		p.on(D, z, B);
		if (z == "mousewheel" && D.addEventListener) {
			D.addEventListener("DOMMouseScroll", B, false);
			p.on(window, "unload", function() {
				D.removeEventListener("DOMMouseScroll", B, false)
			})
		}
		if (z == "mousedown" && D == document) {
			Ext.EventManager.stoppedMouseDownEvent.addListener(B)
		}
	};
	var h = function(A, C, G, I) {
		A = Ext.getDom(A);
		var y = Ext.id(A), H = i[y], z;
		if (H) {
			var E = H[C], B;
			if (E) {
				for (var D = 0, F = E.length;D < F; D++) {
					B = E[D];
					if (B.fn == G && (!I || B.scope == I)) {
						z = B.wrap;
						p.un(A, C, z);
						E.splice(D, 1);
						break
					}
				}
			}
		}
		if (C == "mousewheel" && A.addEventListener && z) {
			A.removeEventListener("DOMMouseScroll", z, false)
		}
		if (C == "mousedown" && A == document && z) {
			Ext.EventManager.stoppedMouseDownEvent.removeListener(z)
		}
	};
	var d = function(C) {
		C = Ext.getDom(C);
		var E = Ext.id(C), D = i[E], z;
		if (D) {
			for (var B in D) {
				if (D.hasOwnProperty(B)) {
					z = D[B];
					for (var A = 0, y = z.length;A < y; A++) {
						p.un(C, B, z[A].wrap);
						z[A] = null
					}
				}
				D[B] = null
			}
			delete i[E]
		}
	};
	var c = function() {
		if (!m) {
			m = true;
			Ext.isReady = true;
			if (q) {
				clearInterval(q)
			}
			if (Ext.isGecko || Ext.isOpera) {
				document.removeEventListener("DOMContentLoaded", c, false)
			}
			if (Ext.isIE) {
				var y = document.getElementById("ie-deferred-loader");
				if (y) {
					y.onreadystatechange = null;
					y.parentNode.removeChild(y)
				}
			}
			if (x) {
				x.fire();
				x.clearListeners()
			}
		}
	};
	var b = function() {
		x = new Ext.util.Event();
		if (Ext.isGecko || Ext.isOpera) {
			document.addEventListener("DOMContentLoaded", c, false)
		} else {
			if (Ext.isIE) {
				document
						.write('<script id="ie-deferred-loader" defer="defer" src="//:"><\/script>');
				var y = document.getElementById("ie-deferred-loader");
				y.onreadystatechange = function() {
					if (this.readyState == "complete") {
						c()
					}
				}
			} else {
				if (Ext.isSafari) {
					q = setInterval(function() {
						var z = document.readyState;
						if (z == "complete") {
							c()
						}
					}, 10)
				}
			}
		}
		p.on(window, "load", c)
	};
	var v = function(z, A) {
		var y = new Ext.util.DelayedTask(z);
		return function(B) {
			B = new Ext.EventObjectImpl(B);
			y.delay(A.buffer, z, null, [B])
		}
	};
	var t = function(C, B, y, A, z) {
		return function(D) {
			Ext.EventManager.removeListener(B, y, A, z);
			C(D)
		}
	};
	var e = function(y, z) {
		return function(A) {
			A = new Ext.EventObjectImpl(A);
			setTimeout(function() {
				y(A)
			}, z.delay || 10)
		}
	};
	var l = function(A, z, y, E, D) {
		var F = (!y || typeof y == "boolean") ? {} : y;
		E = E || F.fn;
		D = D || F.scope;
		var C = Ext.getDom(A);
		if (!C) {
			throw 'Error listening for "' + z + '". Element "' + A
					+ "\" doesn't exist."
		}
		var B = function(H) {
			if (!window[a]) {
				return
			}
			H = Ext.EventObject.setEvent(H);
			var G;
			if (F.delegate) {
				G = H.getTarget(F.delegate, C);
				if (!G) {
					return
				}
			} else {
				G = H.target
			}
			if (F.stopEvent === true) {
				H.stopEvent()
			}
			if (F.preventDefault === true) {
				H.preventDefault()
			}
			if (F.stopPropagation === true) {
				H.stopPropagation()
			}
			if (F.normalized === false) {
				H = H.browserEvent
			}
			E.call(D || C, H, G, F)
		};
		if (F.delay) {
			B = e(B, F)
		}
		if (F.single) {
			B = t(B, C, z, E, D)
		}
		if (F.buffer) {
			B = v(B, F)
		}
		o(C, z, E, B, D);
		return B
	};
	var k = /^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate)$/;
	var u = {
		addListener : function(A, y, C, B, z) {
			if (typeof y == "object") {
				var E = y;
				for (var D in E) {
					if (k.test(D)) {
						continue
					}
					if (typeof E[D] == "function") {
						l(A, D, E, E[D], E.scope)
					} else {
						l(A, D, E[D])
					}
				}
				return
			}
			return l(A, y, z, C, B)
		},
		removeListener : function(z, y, B, A) {
			return h(z, y, B, A)
		},
		removeAll : function(y) {
			return d(y)
		},
		onDocumentReady : function(A, z, y) {
			if (m) {
				x.addListener(A, z, y);
				x.fire();
				x.clearListeners();
				return
			}
			if (!x) {
				b()
			}
			y = y || {};
			if (!y.delay) {
				y.delay = 1
			}
			x.addListener(A, z, y)
		},
		doResizeEvent : function() {
			n.fire(r.getViewWidth(), r.getViewHeight())
		},
		onWindowResize : function(A, z, y) {
			if (!n) {
				n = new Ext.util.Event();
				w = new Ext.util.DelayedTask(this.doResizeEvent);
				p.on(window, "resize", this.fireWindowResize, this)
			}
			n.addListener(A, z, y)
		},
		fireWindowResize : function() {
			if (n) {
				if ((Ext.isIE || Ext.isAir) && w) {
					w.delay(50)
				} else {
					n.fire(r.getViewWidth(), r.getViewHeight())
				}
			}
		},
		onTextResize : function(B, A, y) {
			if (!g) {
				g = new Ext.util.Event();
				var z = new Ext.Element(document.createElement("div"));
				z.dom.className = "x-text-resize";
				z.dom.innerHTML = "X";
				z.appendTo(document.body);
				s = z.dom.offsetHeight;
				setInterval(function() {
					if (z.dom.offsetHeight != s) {
						g.fire(s, s = z.dom.offsetHeight)
					}
				}, this.textResizeInterval)
			}
			g.addListener(B, A, y)
		},
		removeResizeListener : function(z, y) {
			if (n) {
				n.removeListener(z, y)
			}
		},
		fireResize : function() {
			if (n) {
				n.fire(r.getViewWidth(), r.getViewHeight())
			}
		},
		ieDeferSrc : false,
		textResizeInterval : 50
	};
	u.on = u.addListener;
	u.un = u.removeListener;
	u.stoppedMouseDownEvent = new Ext.util.Event();
	return u
}();
Ext.onReady = Ext.EventManager.onDocumentReady;
(function() {
	var a = function() {
		var c = document.body || document.getElementsByTagName("body")[0];
		if (!c) {
			return false
		}
		var b = [
				" ",
				Ext.isIE ? "ext-ie "
						+ (Ext.isIE6 ? "ext-ie6" : (Ext.isIE7
								? "ext-ie7"
								: "ext-ie8")) : Ext.isGecko
						? "ext-gecko "
								+ (Ext.isGecko2 ? "ext-gecko2" : "ext-gecko3")
						: Ext.isOpera ? "ext-opera" : Ext.isSafari
								? "ext-safari"
								: Ext.isChrome ? "ext-chrome" : ""];
		if (Ext.isMac) {
			b.push("ext-mac")
		}
		if (Ext.isLinux) {
			b.push("ext-linux")
		}
		if (Ext.isBorderBox) {
			b.push("ext-border-box")
		}
		if (Ext.isStrict) {
			var d = c.parentNode;
			if (d) {
				d.className += " ext-strict"
			}
		}
		c.className += b.join(" ");
		return true
	};
	if (!a()) {
		Ext.onReady(a)
	}
})();
Ext.EventObject = function() {
	var b = Ext.lib.Event;
	var a = {
		3 : 13,
		63234 : 37,
		63235 : 39,
		63232 : 38,
		63233 : 40,
		63276 : 33,
		63277 : 34,
		63272 : 46,
		63273 : 36,
		63275 : 35
	};
	var c = Ext.isIE ? {
		1 : 0,
		4 : 1,
		2 : 2
	} : (Ext.isSafari ? {
		1 : 0,
		2 : 1,
		3 : 2
	} : {
		0 : 0,
		1 : 1,
		2 : 2
	});
	Ext.EventObjectImpl = function(d) {
		if (d) {
			this.setEvent(d.browserEvent || d)
		}
	};
	Ext.EventObjectImpl.prototype = {
		browserEvent : null,
		button : -1,
		shiftKey : false,
		ctrlKey : false,
		altKey : false,
		BACKSPACE : 8,
		TAB : 9,
		NUM_CENTER : 12,
		ENTER : 13,
		RETURN : 13,
		SHIFT : 16,
		CTRL : 17,
		CONTROL : 17,
		ALT : 18,
		PAUSE : 19,
		CAPS_LOCK : 20,
		ESC : 27,
		SPACE : 32,
		PAGE_UP : 33,
		PAGEUP : 33,
		PAGE_DOWN : 34,
		PAGEDOWN : 34,
		END : 35,
		HOME : 36,
		LEFT : 37,
		UP : 38,
		RIGHT : 39,
		DOWN : 40,
		PRINT_SCREEN : 44,
		INSERT : 45,
		DELETE : 46,
		ZERO : 48,
		ONE : 49,
		TWO : 50,
		THREE : 51,
		FOUR : 52,
		FIVE : 53,
		SIX : 54,
		SEVEN : 55,
		EIGHT : 56,
		NINE : 57,
		A : 65,
		B : 66,
		C : 67,
		D : 68,
		E : 69,
		F : 70,
		G : 71,
		H : 72,
		I : 73,
		J : 74,
		K : 75,
		L : 76,
		M : 77,
		N : 78,
		O : 79,
		P : 80,
		Q : 81,
		R : 82,
		S : 83,
		T : 84,
		U : 85,
		V : 86,
		W : 87,
		X : 88,
		Y : 89,
		Z : 90,
		CONTEXT_MENU : 93,
		NUM_ZERO : 96,
		NUM_ONE : 97,
		NUM_TWO : 98,
		NUM_THREE : 99,
		NUM_FOUR : 100,
		NUM_FIVE : 101,
		NUM_SIX : 102,
		NUM_SEVEN : 103,
		NUM_EIGHT : 104,
		NUM_NINE : 105,
		NUM_MULTIPLY : 106,
		NUM_PLUS : 107,
		NUM_MINUS : 109,
		NUM_PERIOD : 110,
		NUM_DIVISION : 111,
		F1 : 112,
		F2 : 113,
		F3 : 114,
		F4 : 115,
		F5 : 116,
		F6 : 117,
		F7 : 118,
		F8 : 119,
		F9 : 120,
		F10 : 121,
		F11 : 122,
		F12 : 123,
		setEvent : function(d) {
			if (d == this || (d && d.browserEvent)) {
				return d
			}
			this.browserEvent = d;
			if (d) {
				this.button = d.button ? c[d.button] : (d.which
						? d.which - 1
						: -1);
				if (d.type == "click" && this.button == -1) {
					this.button = 0
				}
				this.type = d.type;
				this.shiftKey = d.shiftKey;
				this.ctrlKey = d.ctrlKey || d.metaKey;
				this.altKey = d.altKey;
				this.keyCode = d.keyCode;
				this.charCode = d.charCode;
				this.target = b.getTarget(d);
				this.xy = b.getXY(d)
			} else {
				this.button = -1;
				this.shiftKey = false;
				this.ctrlKey = false;
				this.altKey = false;
				this.keyCode = 0;
				this.charCode = 0;
				this.target = null;
				this.xy = [0, 0]
			}
			return this
		},
		stopEvent : function() {
			if (this.browserEvent) {
				if (this.browserEvent.type == "mousedown") {
					Ext.EventManager.stoppedMouseDownEvent.fire(this)
				}
				b.stopEvent(this.browserEvent)
			}
		},
		preventDefault : function() {
			if (this.browserEvent) {
				b.preventDefault(this.browserEvent)
			}
		},
		isNavKeyPress : function() {
			var d = this.keyCode;
			d = Ext.isSafari ? (a[d] || d) : d;
			return (d >= 33 && d <= 40) || d == this.RETURN || d == this.TAB
					|| d == this.ESC
		},
		isSpecialKey : function() {
			var d = this.keyCode;
			return (this.type == "keypress" && this.ctrlKey) || d == 9
					|| d == 13 || d == 40 || d == 27 || (d == 16) || (d == 17)
					|| (d >= 18 && d <= 20) || (d >= 33 && d <= 35)
					|| (d >= 36 && d <= 39) || (d >= 44 && d <= 45)
		},
		stopPropagation : function() {
			if (this.browserEvent) {
				if (this.browserEvent.type == "mousedown") {
					Ext.EventManager.stoppedMouseDownEvent.fire(this)
				}
				b.stopPropagation(this.browserEvent)
			}
		},
		getCharCode : function() {
			return this.charCode || this.keyCode
		},
		getKey : function() {
			var d = this.keyCode || this.charCode;
			return Ext.isSafari ? (a[d] || d) : d
		},
		getPageX : function() {
			return this.xy[0]
		},
		getPageY : function() {
			return this.xy[1]
		},
		getTime : function() {
			if (this.browserEvent) {
				return b.getTime(this.browserEvent)
			}
			return null
		},
		getXY : function() {
			return this.xy
		},
		getTarget : function(e, g, d) {
			return e ? Ext.fly(this.target).findParent(e, g, d) : (d ? Ext
					.get(this.target) : this.target)
		},
		getRelatedTarget : function() {
			if (this.browserEvent) {
				return b.getRelatedTarget(this.browserEvent)
			}
			return null
		},
		getWheelDelta : function() {
			var d = this.browserEvent;
			var g = 0;
			if (d.wheelDelta) {
				g = d.wheelDelta / 120
			} else {
				if (d.detail) {
					g = -d.detail / 3
				}
			}
			return g
		},
		hasModifier : function() {
			return ((this.ctrlKey || this.altKey) || this.shiftKey)
					? true
					: false
		},
		within : function(g, h, d) {
			var e = this[h ? "getRelatedTarget" : "getTarget"]();
			return e
					&& ((d ? (e === Ext.getDom(g)) : false) || Ext.fly(g)
							.contains(e))
		},
		getPoint : function() {
			return new Ext.lib.Point(this.xy[0], this.xy[1])
		}
	};
	return new Ext.EventObjectImpl()
}();
(function() {
	var D = Ext.lib.Dom;
	var E = Ext.lib.Event;
	var A = Ext.lib.Anim;
	var propCache = {};
	var camelRe = /(-[a-z])/gi;
	var camelFn = function(m, a) {
		return a.charAt(1).toUpperCase()
	};
	var view = document.defaultView;
	Ext.Element = function(element, forceNew) {
		var dom = typeof element == "string"
				? document.getElementById(element)
				: element;
		if (!dom) {
			return null
		}
		var id = dom.id;
		if (forceNew !== true && id && Ext.Element.cache[id]) {
			return Ext.Element.cache[id]
		}
		this.dom = dom;
		this.id = id || Ext.id(dom)
	};
	var El = Ext.Element;
	El.prototype = {
		originalDisplay : "",
		visibilityMode : 1,
		defaultUnit : "px",
		setVisibilityMode : function(visMode) {
			this.visibilityMode = visMode;
			return this
		},
		enableDisplayMode : function(display) {
			this.setVisibilityMode(El.DISPLAY);
			if (typeof display != "undefined") {
				this.originalDisplay = display
			}
			return this
		},
		findParent : function(simpleSelector, maxDepth, returnEl) {
			var p = this.dom, b = document.body, depth = 0, dq = Ext.DomQuery, stopEl;
			maxDepth = maxDepth || 50;
			if (typeof maxDepth != "number") {
				stopEl = Ext.getDom(maxDepth);
				maxDepth = 10
			}
			while (p && p.nodeType == 1 && depth < maxDepth && p != b
					&& p != stopEl) {
				if (dq.is(p, simpleSelector)) {
					return returnEl ? Ext.get(p) : p
				}
				depth++;
				p = p.parentNode
			}
			return null
		},
		findParentNode : function(simpleSelector, maxDepth, returnEl) {
			var p = Ext.fly(this.dom.parentNode, "_internal");
			return p ? p.findParent(simpleSelector, maxDepth, returnEl) : null
		},
		up : function(simpleSelector, maxDepth) {
			return this.findParentNode(simpleSelector, maxDepth, true)
		},
		is : function(simpleSelector) {
			return Ext.DomQuery.is(this.dom, simpleSelector)
		},
		animate : function(args, duration, onComplete, easing, animType) {
			this.anim(args, {
				duration : duration,
				callback : onComplete,
				easing : easing
			}, animType);
			return this
		},
		anim : function(args, opt, animType, defaultDur, defaultEase, cb) {
			animType = animType || "run";
			opt = opt || {};
			var anim = Ext.lib.Anim[animType](this.dom, args,
					(opt.duration || defaultDur) || 0.35,
					(opt.easing || defaultEase) || "easeOut", function() {
						Ext.callback(cb, this);
						Ext.callback(opt.callback, opt.scope || this, [this,
								opt])
					}, this);
			opt.anim = anim;
			return anim
		},
		preanim : function(a, i) {
			return !a[i] ? false : (typeof a[i] == "object" ? a[i] : {
				duration : a[i + 1],
				callback : a[i + 2],
				easing : a[i + 3]
			})
		},
		clean : function(forceReclean) {
			if (this.isCleaned && forceReclean !== true) {
				return this
			}
			var ns = /\S/;
			var d = this.dom, n = d.firstChild, ni = -1;
			while (n) {
				var nx = n.nextSibling;
				if (n.nodeType == 3 && !ns.test(n.nodeValue)) {
					d.removeChild(n)
				} else {
					n.nodeIndex = ++ni
				}
				n = nx
			}
			this.isCleaned = true;
			return this
		},
		scrollIntoView : function(container, hscroll) {
			var c = Ext.getDom(container) || Ext.getBody().dom;
			var el = this.dom;
			var o = this.getOffsetsTo(c), l = o[0] + c.scrollLeft, t = o[1]
					+ c.scrollTop, b = t + el.offsetHeight, r = l
					+ el.offsetWidth;
			var ch = c.clientHeight;
			var ct = parseInt(c.scrollTop, 10);
			var cl = parseInt(c.scrollLeft, 10);
			var cb = ct + ch;
			var cr = cl + c.clientWidth;
			if (el.offsetHeight > ch || t < ct) {
				c.scrollTop = t
			} else {
				if (b > cb) {
					c.scrollTop = b - ch
				}
			}
			c.scrollTop = c.scrollTop;
			if (hscroll !== false) {
				if (el.offsetWidth > c.clientWidth || l < cl) {
					c.scrollLeft = l
				} else {
					if (r > cr) {
						c.scrollLeft = r - c.clientWidth
					}
				}
				c.scrollLeft = c.scrollLeft
			}
			return this
		},
		scrollChildIntoView : function(child, hscroll) {
			Ext.fly(child, "_scrollChildIntoView")
					.scrollIntoView(this, hscroll)
		},
		autoHeight : function(animate, duration, onComplete, easing) {
			var oldHeight = this.getHeight();
			this.clip();
			this.setHeight(1);
			setTimeout(function() {
				var height = parseInt(this.dom.scrollHeight, 10);
				if (!animate) {
					this.setHeight(height);
					this.unclip();
					if (typeof onComplete == "function") {
						onComplete()
					}
				} else {
					this.setHeight(oldHeight);
					this.setHeight(height, animate, duration, function() {
						this.unclip();
						if (typeof onComplete == "function") {
							onComplete()
						}
					}.createDelegate(this), easing)
				}
			}.createDelegate(this), 0);
			return this
		},
		contains : function(el) {
			if (!el) {
				return false
			}
			return D.isAncestor(this.dom, el.dom ? el.dom : el)
		},
		isVisible : function(deep) {
			var vis = !(this.getStyle("visibility") == "hidden" || this
					.getStyle("display") == "none");
			if (deep !== true || !vis) {
				return vis
			}
			var p = this.dom.parentNode;
			while (p && p.tagName.toLowerCase() != "body") {
				if (!Ext.fly(p, "_isVisible").isVisible()) {
					return false
				}
				p = p.parentNode
			}
			return true
		},
		select : function(selector, unique) {
			return El.select(selector, unique, this.dom)
		},
		query : function(selector) {
			return Ext.DomQuery.select(selector, this.dom)
		},
		child : function(selector, returnDom) {
			var n = Ext.DomQuery.selectNode(selector, this.dom);
			return returnDom ? n : Ext.get(n)
		},
		down : function(selector, returnDom) {
			var n = Ext.DomQuery.selectNode(" > " + selector, this.dom);
			return returnDom ? n : Ext.get(n)
		},
		initDD : function(group, config, overrides) {
			var dd = new Ext.dd.DD(Ext.id(this.dom), group, config);
			return Ext.apply(dd, overrides)
		},
		initDDProxy : function(group, config, overrides) {
			var dd = new Ext.dd.DDProxy(Ext.id(this.dom), group, config);
			return Ext.apply(dd, overrides)
		},
		initDDTarget : function(group, config, overrides) {
			var dd = new Ext.dd.DDTarget(Ext.id(this.dom), group, config);
			return Ext.apply(dd, overrides)
		},
		setVisible : function(visible, animate) {
			if (!animate || !A) {
				if (this.visibilityMode == El.DISPLAY) {
					this.setDisplayed(visible)
				} else {
					this.fixDisplay();
					this.dom.style.visibility = visible ? "visible" : "hidden"
				}
			} else {
				var dom = this.dom;
				var visMode = this.visibilityMode;
				if (visible) {
					this.setOpacity(0.01);
					this.setVisible(true)
				}
				this.anim( {
					opacity : {
						to : (visible ? 1 : 0)
					}
				}, this.preanim(arguments, 1), null, 0.35, "easeIn",
						function() {
							if (!visible) {
								if (visMode == El.DISPLAY) {
									dom.style.display = "none"
								} else {
									dom.style.visibility = "hidden"
								}
								Ext.get(dom).setOpacity(1)
							}
						})
			}
			return this
		},
		isDisplayed : function() {
			return this.getStyle("display") != "none"
		},
		toggle : function(animate) {
			this.setVisible(!this.isVisible(), this.preanim(arguments, 0));
			return this
		},
		setDisplayed : function(value) {
			if (typeof value == "boolean") {
				value = value ? this.originalDisplay : "none"
			}
			this.setStyle("display", value);
			return this
		},
		focus : function() {
			try {
				this.dom.focus()
			} catch (e) {
			}
			return this
		},
		blur : function() {
			try {
				this.dom.blur()
			} catch (e) {
			}
			return this
		},
		addClass : function(className) {
			if (Ext.isArray(className)) {
				for (var i = 0, len = className.length;i < len; i++) {
					this.addClass(className[i])
				}
			} else {
				if (className && !this.hasClass(className)) {
					this.dom.className = this.dom.className + " " + className
				}
			}
			return this
		},
		radioClass : function(className) {
			var siblings = this.dom.parentNode.childNodes;
			for (var i = 0;i < siblings.length; i++) {
				var s = siblings[i];
				if (s.nodeType == 1) {
					Ext.get(s).removeClass(className)
				}
			}
			this.addClass(className);
			return this
		},
		removeClass : function(className) {
			if (!className || !this.dom.className) {
				return this
			}
			if (Ext.isArray(className)) {
				for (var i = 0, len = className.length;i < len; i++) {
					this.removeClass(className[i])
				}
			} else {
				if (this.hasClass(className)) {
					var re = this.classReCache[className];
					if (!re) {
						re = new RegExp(
								"(?:^|\\s+)" + className + "(?:\\s+|$)", "g");
						this.classReCache[className] = re
					}
					this.dom.className = this.dom.className.replace(re, " ")
				}
			}
			return this
		},
		classReCache : {},
		toggleClass : function(className) {
			if (this.hasClass(className)) {
				this.removeClass(className)
			} else {
				this.addClass(className)
			}
			return this
		},
		hasClass : function(className) {
			return className
					&& (" " + this.dom.className + " ").indexOf(" " + className
							+ " ") != -1
		},
		replaceClass : function(oldClassName, newClassName) {
			this.removeClass(oldClassName);
			this.addClass(newClassName);
			return this
		},
		getStyles : function() {
			var a = arguments, len = a.length, r = {};
			for (var i = 0;i < len; i++) {
				r[a[i]] = this.getStyle(a[i])
			}
			return r
		},
		getStyle : function() {
			return view && view.getComputedStyle
					? function(prop) {
						var el = this.dom, v, cs, camel;
						if (prop == "float") {
							prop = "cssFloat"
						}
						if (v = el.style[prop]) {
							return v
						}
						if (cs = view.getComputedStyle(el, "")) {
							if (!(camel = propCache[prop])) {
								camel = propCache[prop] = prop.replace(camelRe,
										camelFn)
							}
							return cs[camel]
						}
						return null
					}
					: function(prop) {
						var el = this.dom, v, cs, camel;
						if (prop == "opacity") {
							if (typeof el.style.filter == "string") {
								var m = el.style.filter
										.match(/alpha\(opacity=(.*)\)/i);
								if (m) {
									var fv = parseFloat(m[1]);
									if (!isNaN(fv)) {
										return fv ? fv / 100 : 0
									}
								}
							}
							return 1
						} else {
							if (prop == "float") {
								prop = "styleFloat"
							}
						}
						if (!(camel = propCache[prop])) {
							camel = propCache[prop] = prop.replace(camelRe,
									camelFn)
						}
						if (v = el.style[camel]) {
							return v
						}
						if (cs = el.currentStyle) {
							return cs[camel]
						}
						return null
					}
		}(),
		setStyle : function(prop, value) {
			if (typeof prop == "string") {
				var camel;
				if (!(camel = propCache[prop])) {
					camel = propCache[prop] = prop.replace(camelRe, camelFn)
				}
				if (camel == "opacity") {
					this.setOpacity(value)
				} else {
					this.dom.style[camel] = value
				}
			} else {
				for (var style in prop) {
					if (typeof prop[style] != "function") {
						this.setStyle(style, prop[style])
					}
				}
			}
			return this
		},
		applyStyles : function(style) {
			Ext.DomHelper.applyStyles(this.dom, style);
			return this
		},
		getX : function() {
			return D.getX(this.dom)
		},
		getY : function() {
			return D.getY(this.dom)
		},
		getXY : function() {
			return D.getXY(this.dom)
		},
		getOffsetsTo : function(el) {
			var o = this.getXY();
			var e = Ext.fly(el, "_internal").getXY();
			return [o[0] - e[0], o[1] - e[1]]
		},
		setX : function(x, animate) {
			if (!animate || !A) {
				D.setX(this.dom, x)
			} else {
				this.setXY([x, this.getY()], this.preanim(arguments, 1))
			}
			return this
		},
		setY : function(y, animate) {
			if (!animate || !A) {
				D.setY(this.dom, y)
			} else {
				this.setXY([this.getX(), y], this.preanim(arguments, 1))
			}
			return this
		},
		setLeft : function(left) {
			this.setStyle("left", this.addUnits(left));
			return this
		},
		setTop : function(top) {
			this.setStyle("top", this.addUnits(top));
			return this
		},
		setRight : function(right) {
			this.setStyle("right", this.addUnits(right));
			return this
		},
		setBottom : function(bottom) {
			this.setStyle("bottom", this.addUnits(bottom));
			return this
		},
		setXY : function(pos, animate) {
			if (!animate || !A) {
				D.setXY(this.dom, pos)
			} else {
				this.anim( {
					points : {
						to : pos
					}
				}, this.preanim(arguments, 1), "motion")
			}
			return this
		},
		setLocation : function(x, y, animate) {
			this.setXY([x, y], this.preanim(arguments, 2));
			return this
		},
		moveTo : function(x, y, animate) {
			this.setXY([x, y], this.preanim(arguments, 2));
			return this
		},
		getRegion : function() {
			return D.getRegion(this.dom)
		},
		getHeight : function(contentHeight) {
			var h = this.dom.offsetHeight || 0;
			h = contentHeight !== true ? h : h - this.getBorderWidth("tb")
					- this.getPadding("tb");
			return h < 0 ? 0 : h
		},
		getWidth : function(contentWidth) {
			var w = this.dom.offsetWidth || 0;
			w = contentWidth !== true ? w : w - this.getBorderWidth("lr")
					- this.getPadding("lr");
			return w < 0 ? 0 : w
		},
		getComputedHeight : function() {
			var h = Math.max(this.dom.offsetHeight, this.dom.clientHeight);
			if (!h) {
				h = parseInt(this.getStyle("height"), 10) || 0;
				if (!this.isBorderBox()) {
					h += this.getFrameWidth("tb")
				}
			}
			return h
		},
		getComputedWidth : function() {
			var w = Math.max(this.dom.offsetWidth, this.dom.clientWidth);
			if (!w) {
				w = parseInt(this.getStyle("width"), 10) || 0;
				if (!this.isBorderBox()) {
					w += this.getFrameWidth("lr")
				}
			}
			return w
		},
		getSize : function(contentSize) {
			return {
				width : this.getWidth(contentSize),
				height : this.getHeight(contentSize)
			}
		},
		getStyleSize : function() {
			var w, h, d = this.dom, s = d.style;
			if (s.width && s.width != "auto") {
				w = parseInt(s.width, 10);
				if (Ext.isBorderBox) {
					w -= this.getFrameWidth("lr")
				}
			}
			if (s.height && s.height != "auto") {
				h = parseInt(s.height, 10);
				if (Ext.isBorderBox) {
					h -= this.getFrameWidth("tb")
				}
			}
			return {
				width : w || this.getWidth(true),
				height : h || this.getHeight(true)
			}
		},
		getViewSize : function() {
			var d = this.dom, doc = document, aw = 0, ah = 0;
			if (d == doc || d == doc.body) {
				return {
					width : D.getViewWidth(),
					height : D.getViewHeight()
				}
			} else {
				return {
					width : d.clientWidth,
					height : d.clientHeight
				}
			}
		},
		getValue : function(asNumber) {
			return asNumber ? parseInt(this.dom.value, 10) : this.dom.value
		},
		adjustWidth : function(width) {
			if (typeof width == "number") {
				if (this.autoBoxAdjust && !this.isBorderBox()) {
					width -= (this.getBorderWidth("lr") + this.getPadding("lr"))
				}
				if (width < 0) {
					width = 0
				}
			}
			return width
		},
		adjustHeight : function(height) {
			if (typeof height == "number") {
				if (this.autoBoxAdjust && !this.isBorderBox()) {
					height -= (this.getBorderWidth("tb") + this
							.getPadding("tb"))
				}
				if (height < 0) {
					height = 0
				}
			}
			return height
		},
		setWidth : function(width, animate) {
			width = this.adjustWidth(width);
			if (!animate || !A) {
				this.dom.style.width = this.addUnits(width)
			} else {
				this.anim( {
					width : {
						to : width
					}
				}, this.preanim(arguments, 1))
			}
			return this
		},
		setHeight : function(height, animate) {
			height = this.adjustHeight(height);
			if (!animate || !A) {
				this.dom.style.height = this.addUnits(height)
			} else {
				this.anim( {
					height : {
						to : height
					}
				}, this.preanim(arguments, 1))
			}
			return this
		},
		setSize : function(width, height, animate) {
			if (typeof width == "object") {
				height = width.height;
				width = width.width
			}
			width = this.adjustWidth(width);
			height = this.adjustHeight(height);
			if (!animate || !A) {
				this.dom.style.width = this.addUnits(width);
				this.dom.style.height = this.addUnits(height)
			} else {
				this.anim( {
					width : {
						to : width
					},
					height : {
						to : height
					}
				}, this.preanim(arguments, 2))
			}
			return this
		},
		setBounds : function(x, y, width, height, animate) {
			if (!animate || !A) {
				this.setSize(width, height);
				this.setLocation(x, y)
			} else {
				width = this.adjustWidth(width);
				height = this.adjustHeight(height);
				this.anim( {
					points : {
						to : [x, y]
					},
					width : {
						to : width
					},
					height : {
						to : height
					}
				}, this.preanim(arguments, 4), "motion")
			}
			return this
		},
		setRegion : function(region, animate) {
			this.setBounds(region.left, region.top, region.right - region.left,
					region.bottom - region.top, this.preanim(arguments, 1));
			return this
		},
		addListener : function(eventName, fn, scope, options) {
			Ext.EventManager
					.on(this.dom, eventName, fn, scope || this, options)
		},
		removeListener : function(eventName, fn, scope) {
			Ext.EventManager.removeListener(this.dom, eventName, fn, scope
					|| this);
			return this
		},
		removeAllListeners : function() {
			Ext.EventManager.removeAll(this.dom);
			return this
		},
		relayEvent : function(eventName, observable) {
			this.on(eventName, function(e) {
				observable.fireEvent(eventName, e)
			})
		},
		setOpacity : function(opacity, animate) {
			if (!animate || !A) {
				var s = this.dom.style;
				if (Ext.isIE) {
					s.zoom = 1;
					s.filter = (s.filter || "")
							.replace(/alpha\([^\)]*\)/gi, "")
							+ (opacity == 1 ? "" : " alpha(opacity=" + opacity
									* 100 + ")")
				} else {
					s.opacity = opacity
				}
			} else {
				this.anim( {
					opacity : {
						to : opacity
					}
				}, this.preanim(arguments, 1), null, 0.35, "easeIn")
			}
			return this
		},
		getLeft : function(local) {
			if (!local) {
				return this.getX()
			} else {
				return parseInt(this.getStyle("left"), 10) || 0
			}
		},
		getRight : function(local) {
			if (!local) {
				return this.getX() + this.getWidth()
			} else {
				return (this.getLeft(true) + this.getWidth()) || 0
			}
		},
		getTop : function(local) {
			if (!local) {
				return this.getY()
			} else {
				return parseInt(this.getStyle("top"), 10) || 0
			}
		},
		getBottom : function(local) {
			if (!local) {
				return this.getY() + this.getHeight()
			} else {
				return (this.getTop(true) + this.getHeight()) || 0
			}
		},
		position : function(pos, zIndex, x, y) {
			if (!pos) {
				if (this.getStyle("position") == "static") {
					this.setStyle("position", "relative")
				}
			} else {
				this.setStyle("position", pos)
			}
			if (zIndex) {
				this.setStyle("z-index", zIndex)
			}
			if (x !== undefined && y !== undefined) {
				this.setXY([x, y])
			} else {
				if (x !== undefined) {
					this.setX(x)
				} else {
					if (y !== undefined) {
						this.setY(y)
					}
				}
			}
		},
		clearPositioning : function(value) {
			value = value || "";
			this.setStyle( {
				left : value,
				right : value,
				top : value,
				bottom : value,
				"z-index" : "",
				position : "static"
			});
			return this
		},
		getPositioning : function() {
			var l = this.getStyle("left");
			var t = this.getStyle("top");
			return {
				position : this.getStyle("position"),
				left : l,
				right : l ? "" : this.getStyle("right"),
				top : t,
				bottom : t ? "" : this.getStyle("bottom"),
				"z-index" : this.getStyle("z-index")
			}
		},
		getBorderWidth : function(side) {
			return this.addStyles(side, El.borders)
		},
		getPadding : function(side) {
			return this.addStyles(side, El.paddings)
		},
		setPositioning : function(pc) {
			this.applyStyles(pc);
			if (pc.right == "auto") {
				this.dom.style.right = ""
			}
			if (pc.bottom == "auto") {
				this.dom.style.bottom = ""
			}
			return this
		},
		fixDisplay : function() {
			if (this.getStyle("display") == "none") {
				this.setStyle("visibility", "hidden");
				this.setStyle("display", this.originalDisplay);
				if (this.getStyle("display") == "none") {
					this.setStyle("display", "block")
				}
			}
		},
		setOverflow : function(v) {
			if (v == "auto" && Ext.isMac && Ext.isGecko2) {
				this.dom.style.overflow = "hidden";
				(function() {
					this.dom.style.overflow = "auto"
				}).defer(1, this)
			} else {
				this.dom.style.overflow = v
			}
		},
		setLeftTop : function(left, top) {
			this.dom.style.left = this.addUnits(left);
			this.dom.style.top = this.addUnits(top);
			return this
		},
		move : function(direction, distance, animate) {
			var xy = this.getXY();
			direction = direction.toLowerCase();
			switch (direction) {
				case "l" :
				case "left" :
					this.moveTo(xy[0] - distance, xy[1], this.preanim(
							arguments, 2));
					break;
				case "r" :
				case "right" :
					this.moveTo(xy[0] + distance, xy[1], this.preanim(
							arguments, 2));
					break;
				case "t" :
				case "top" :
				case "up" :
					this.moveTo(xy[0], xy[1] - distance, this.preanim(
							arguments, 2));
					break;
				case "b" :
				case "bottom" :
				case "down" :
					this.moveTo(xy[0], xy[1] + distance, this.preanim(
							arguments, 2));
					break
			}
			return this
		},
		clip : function() {
			if (!this.isClipped) {
				this.isClipped = true;
				this.originalClip = {
					o : this.getStyle("overflow"),
					x : this.getStyle("overflow-x"),
					y : this.getStyle("overflow-y")
				};
				this.setStyle("overflow", "hidden");
				this.setStyle("overflow-x", "hidden");
				this.setStyle("overflow-y", "hidden")
			}
			return this
		},
		unclip : function() {
			if (this.isClipped) {
				this.isClipped = false;
				var o = this.originalClip;
				if (o.o) {
					this.setStyle("overflow", o.o)
				}
				if (o.x) {
					this.setStyle("overflow-x", o.x)
				}
				if (o.y) {
					this.setStyle("overflow-y", o.y)
				}
			}
			return this
		},
		getAnchorXY : function(anchor, local, s) {
			var w, h, vp = false;
			if (!s) {
				var d = this.dom;
				if (d == document.body || d == document) {
					vp = true;
					w = D.getViewWidth();
					h = D.getViewHeight()
				} else {
					w = this.getWidth();
					h = this.getHeight()
				}
			} else {
				w = s.width;
				h = s.height
			}
			var x = 0, y = 0, r = Math.round;
			switch ((anchor || "tl").toLowerCase()) {
				case "c" :
					x = r(w * 0.5);
					y = r(h * 0.5);
					break;
				case "t" :
					x = r(w * 0.5);
					y = 0;
					break;
				case "l" :
					x = 0;
					y = r(h * 0.5);
					break;
				case "r" :
					x = w;
					y = r(h * 0.5);
					break;
				case "b" :
					x = r(w * 0.5);
					y = h;
					break;
				case "tl" :
					x = 0;
					y = 0;
					break;
				case "bl" :
					x = 0;
					y = h;
					break;
				case "br" :
					x = w;
					y = h;
					break;
				case "tr" :
					x = w;
					y = 0;
					break
			}
			if (local === true) {
				return [x, y]
			}
			if (vp) {
				var sc = this.getScroll();
				return [x + sc.left, y + sc.top]
			}
			var o = this.getXY();
			return [x + o[0], y + o[1]]
		},
		getAlignToXY : function(el, p, o) {
			el = Ext.get(el);
			if (!el || !el.dom) {
				throw "Element.alignToXY with an element that doesn't exist"
			}
			var d = this.dom;
			var c = false;
			var p1 = "", p2 = "";
			o = o || [0, 0];
			if (!p) {
				p = "tl-bl"
			} else {
				if (p == "?") {
					p = "tl-bl?"
				} else {
					if (p.indexOf("-") == -1) {
						p = "tl-" + p
					}
				}
			}
			p = p.toLowerCase();
			var m = p.match(/^([a-z]+)-([a-z]+)(\?)?$/);
			if (!m) {
				throw "Element.alignTo with an invalid alignment " + p
			}
			p1 = m[1];
			p2 = m[2];
			c = !!m[3];
			var a1 = this.getAnchorXY(p1, true);
			var a2 = el.getAnchorXY(p2, false);
			var x = a2[0] - a1[0] + o[0];
			var y = a2[1] - a1[1] + o[1];
			if (c) {
				var w = this.getWidth(), h = this.getHeight(), r = el
						.getRegion();
				var dw = D.getViewWidth() - 5, dh = D.getViewHeight() - 5;
				var p1y = p1.charAt(0), p1x = p1.charAt(p1.length - 1);
				var p2y = p2.charAt(0), p2x = p2.charAt(p2.length - 1);
				var swapY = ((p1y == "t" && p2y == "b") || (p1y == "b" && p2y == "t"));
				var swapX = ((p1x == "r" && p2x == "l") || (p1x == "l" && p2x == "r"));
				var doc = document;
				var scrollX = (doc.documentElement.scrollLeft
						|| doc.body.scrollLeft || 0)
						+ 5;
				var scrollY = (doc.documentElement.scrollTop
						|| doc.body.scrollTop || 0)
						+ 5;
				if ((x + w) > dw + scrollX) {
					x = swapX ? r.left - w : dw + scrollX - w
				}
				if (x < scrollX) {
					x = swapX ? r.right : scrollX
				}
				if ((y + h) > dh + scrollY) {
					y = swapY ? r.top - h : dh + scrollY - h
				}
				if (y < scrollY) {
					y = swapY ? r.bottom : scrollY
				}
			}
			return [x, y]
		},
		getConstrainToXY : function() {
			var os = {
				top : 0,
				left : 0,
				bottom : 0,
				right : 0
			};
			return function(el, local, offsets, proposedXY) {
				el = Ext.get(el);
				offsets = offsets ? Ext.applyIf(offsets, os) : os;
				var vw, vh, vx = 0, vy = 0;
				if (el.dom == document.body || el.dom == document) {
					vw = Ext.lib.Dom.getViewWidth();
					vh = Ext.lib.Dom.getViewHeight()
				} else {
					vw = el.dom.clientWidth;
					vh = el.dom.clientHeight;
					if (!local) {
						var vxy = el.getXY();
						vx = vxy[0];
						vy = vxy[1]
					}
				}
				var s = el.getScroll();
				vx += offsets.left + s.left;
				vy += offsets.top + s.top;
				vw -= offsets.right;
				vh -= offsets.bottom;
				var vr = vx + vw;
				var vb = vy + vh;
				var xy = proposedXY
						|| (!local ? this.getXY() : [this.getLeft(true),
								this.getTop(true)]);
				var x = xy[0], y = xy[1];
				var w = this.dom.offsetWidth, h = this.dom.offsetHeight;
				var moved = false;
				if ((x + w) > vr) {
					x = vr - w;
					moved = true
				}
				if ((y + h) > vb) {
					y = vb - h;
					moved = true
				}
				if (x < vx) {
					x = vx;
					moved = true
				}
				if (y < vy) {
					y = vy;
					moved = true
				}
				return moved ? [x, y] : false
			}
		}(),
		adjustForConstraints : function(xy, parent, offsets) {
			return this
					.getConstrainToXY(parent || document, false, offsets, xy)
					|| xy
		},
		alignTo : function(element, position, offsets, animate) {
			var xy = this.getAlignToXY(element, position, offsets);
			this.setXY(xy, this.preanim(arguments, 3));
			return this
		},
		anchorTo : function(el, alignment, offsets, animate, monitorScroll,
				callback) {
			var action = function() {
				this.alignTo(el, alignment, offsets, animate);
				Ext.callback(callback, this)
			};
			Ext.EventManager.onWindowResize(action, this);
			var tm = typeof monitorScroll;
			if (tm != "undefined") {
				Ext.EventManager.on(window, "scroll", action, this, {
					buffer : tm == "number" ? monitorScroll : 50
				})
			}
			action.call(this);
			return this
		},
		clearOpacity : function() {
			if (window.ActiveXObject) {
				if (typeof this.dom.style.filter == "string"
						&& (/alpha/i).test(this.dom.style.filter)) {
					this.dom.style.filter = ""
				}
			} else {
				this.dom.style.opacity = "";
				this.dom.style["-moz-opacity"] = "";
				this.dom.style["-khtml-opacity"] = ""
			}
			return this
		},
		hide : function(animate) {
			this.setVisible(false, this.preanim(arguments, 0));
			return this
		},
		show : function(animate) {
			this.setVisible(true, this.preanim(arguments, 0));
			return this
		},
		addUnits : function(size) {
			return Ext.Element.addUnits(size, this.defaultUnit)
		},
		update : function(html, loadScripts, callback) {
			if (typeof html == "undefined") {
				html = ""
			}
			if (loadScripts !== true) {
				this.dom.innerHTML = html;
				if (typeof callback == "function") {
					callback()
				}
				return this
			}
			var id = Ext.id();
			var dom = this.dom;
			html += '<span id="' + id + '"></span>';
			E.onAvailable(id, function() {
				var hd = document.getElementsByTagName("head")[0];
				var re = /(?:<script([^>]*)?>)((\n|\r|.)*?)(?:<\/script>)/ig;
				var srcRe = /\ssrc=([\'\"])(.*?)\1/i;
				var typeRe = /\stype=([\'\"])(.*?)\1/i;
				var match;
				while (match = re.exec(html)) {
					var attrs = match[1];
					var srcMatch = attrs ? attrs.match(srcRe) : false;
					if (srcMatch && srcMatch[2]) {
						var s = document.createElement("script");
						s.src = srcMatch[2];
						var typeMatch = attrs.match(typeRe);
						if (typeMatch && typeMatch[2]) {
							s.type = typeMatch[2]
						}
						hd.appendChild(s)
					} else {
						if (match[2] && match[2].length > 0) {
							if (window.execScript) {
								window.execScript(match[2])
							} else {
								window.eval(match[2])
							}
						}
					}
				}
				var el = document.getElementById(id);
				if (el) {
					Ext.removeNode(el)
				}
				if (typeof callback == "function") {
					callback()
				}
			});
			dom.innerHTML = html.replace(
					/(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig, "");
			return this
		},
		load : function() {
			var um = this.getUpdater();
			um.update.apply(um, arguments);
			return this
		},
		getUpdater : function() {
			if (!this.updateManager) {
				this.updateManager = new Ext.Updater(this)
			}
			return this.updateManager
		},
		unselectable : function() {
			this.dom.unselectable = "on";
			this.swallowEvent("selectstart", true);
			this.applyStyles("-moz-user-select:none;-khtml-user-select:none;");
			this.addClass("x-unselectable");
			return this
		},
		getCenterXY : function() {
			return this.getAlignToXY(document, "c-c")
		},
		center : function(centerIn) {
			this.alignTo(centerIn || document, "c-c");
			return this
		},
		isBorderBox : function() {
			return noBoxAdjust[this.dom.tagName.toLowerCase()]
					|| Ext.isBorderBox
		},
		getBox : function(contentBox, local) {
			var xy;
			if (!local) {
				xy = this.getXY()
			} else {
				var left = parseInt(this.getStyle("left"), 10) || 0;
				var top = parseInt(this.getStyle("top"), 10) || 0;
				xy = [left, top]
			}
			var el = this.dom, w = el.offsetWidth, h = el.offsetHeight, bx;
			if (!contentBox) {
				bx = {
					x : xy[0],
					y : xy[1],
					0 : xy[0],
					1 : xy[1],
					width : w,
					height : h
				}
			} else {
				var l = this.getBorderWidth("l") + this.getPadding("l");
				var r = this.getBorderWidth("r") + this.getPadding("r");
				var t = this.getBorderWidth("t") + this.getPadding("t");
				var b = this.getBorderWidth("b") + this.getPadding("b");
				bx = {
					x : xy[0] + l,
					y : xy[1] + t,
					0 : xy[0] + l,
					1 : xy[1] + t,
					width : w - (l + r),
					height : h - (t + b)
				}
			}
			bx.right = bx.x + bx.width;
			bx.bottom = bx.y + bx.height;
			return bx
		},
		getFrameWidth : function(sides, onlyContentBox) {
			return onlyContentBox && Ext.isBorderBox ? 0 : (this
					.getPadding(sides) + this.getBorderWidth(sides))
		},
		setBox : function(box, adjust, animate) {
			var w = box.width, h = box.height;
			if ((adjust && !this.autoBoxAdjust) && !this.isBorderBox()) {
				w -= (this.getBorderWidth("lr") + this.getPadding("lr"));
				h -= (this.getBorderWidth("tb") + this.getPadding("tb"))
			}
			this.setBounds(box.x, box.y, w, h, this.preanim(arguments, 2));
			return this
		},
		repaint : function() {
			var dom = this.dom;
			this.addClass("x-repaint");
			setTimeout(function() {
				Ext.get(dom).removeClass("x-repaint")
			}, 1);
			return this
		},
		getMargins : function(side) {
			if (!side) {
				return {
					top : parseInt(this.getStyle("margin-top"), 10) || 0,
					left : parseInt(this.getStyle("margin-left"), 10) || 0,
					bottom : parseInt(this.getStyle("margin-bottom"), 10) || 0,
					right : parseInt(this.getStyle("margin-right"), 10) || 0
				}
			} else {
				return this.addStyles(side, El.margins)
			}
		},
		addStyles : function(sides, styles) {
			var val = 0, v, w;
			for (var i = 0, len = sides.length;i < len; i++) {
				v = this.getStyle(styles[sides.charAt(i)]);
				if (v) {
					w = parseInt(v, 10);
					if (w) {
						val += (w >= 0 ? w : -1 * w)
					}
				}
			}
			return val
		},
		createProxy : function(config, renderTo, matchBox) {
			config = typeof config == "object" ? config : {
				tag : "div",
				cls : config
			};
			var proxy;
			if (renderTo) {
				proxy = Ext.DomHelper.append(renderTo, config, true)
			} else {
				proxy = Ext.DomHelper.insertBefore(this.dom, config, true)
			}
			if (matchBox) {
				proxy.setBox(this.getBox())
			}
			return proxy
		},
		mask : function(msg, msgCls) {
			if (this.getStyle("position") == "static") {
				this.addClass("x-masked-relative")
			}
			if (this._maskMsg) {
				this._maskMsg.remove()
			}
			if (this._mask) {
				this._mask.remove()
			}
			this._mask = Ext.DomHelper.append(this.dom, {
				cls : "ext-el-mask"
			}, true);
			this.addClass("x-masked");
			this._mask.setDisplayed(true);
			if (typeof msg == "string") {
				this._maskMsg = Ext.DomHelper.append(this.dom, {
					cls : "ext-el-mask-msg",
					cn : {
						tag : "div"
					}
				}, true);
				var mm = this._maskMsg;
				mm.dom.className = msgCls
						? "ext-el-mask-msg " + msgCls
						: "ext-el-mask-msg";
				mm.dom.firstChild.innerHTML = msg;
				mm.setDisplayed(true);
				mm.center(this)
			}
			if (Ext.isIE && !(Ext.isIE7 && Ext.isStrict)
					&& this.getStyle("height") == "auto") {
				this._mask.setSize(this.getWidth(), this.getHeight())
			}
			return this._mask
		},
		unmask : function() {
			if (this._mask) {
				if (this._maskMsg) {
					this._maskMsg.remove();
					delete this._maskMsg
				}
				this._mask.remove();
				delete this._mask
			}
			this.removeClass(["x-masked", "x-masked-relative"])
		},
		isMasked : function() {
			return this._mask && this._mask.isVisible()
		},
		createShim : function() {
			var el = document.createElement("iframe");
			el.frameBorder = "0";
			el.className = "ext-shim";
			if (Ext.isIE && Ext.isSecure) {
				el.src = Ext.SSL_SECURE_URL
			}
			var shim = Ext.get(this.dom.parentNode.insertBefore(el, this.dom));
			shim.autoBoxAdjust = false;
			return shim
		},
		remove : function() {
			Ext.removeNode(this.dom);
			delete El.cache[this.dom.id]
		},
		hover : function(overFn, outFn, scope) {
			var preOverFn = function(e) {
				if (!e.within(this, true)) {
					overFn.apply(scope || this, arguments)
				}
			};
			var preOutFn = function(e) {
				if (!e.within(this, true)) {
					outFn.apply(scope || this, arguments)
				}
			};
			this.on("mouseover", preOverFn, this.dom);
			this.on("mouseout", preOutFn, this.dom);
			return this
		},
		addClassOnOver : function(className) {
			this.hover(function() {
				Ext.fly(this, "_internal").addClass(className)
			}, function() {
				Ext.fly(this, "_internal").removeClass(className)
			});
			return this
		},
		addClassOnFocus : function(className) {
			this.on("focus", function() {
				Ext.fly(this, "_internal").addClass(className)
			}, this.dom);
			this.on("blur", function() {
				Ext.fly(this, "_internal").removeClass(className)
			}, this.dom);
			return this
		},
		addClassOnClick : function(className) {
			var dom = this.dom;
			this.on("mousedown", function() {
				Ext.fly(dom, "_internal").addClass(className);
				var d = Ext.getDoc();
				var fn = function() {
					Ext.fly(dom, "_internal").removeClass(className);
					d.removeListener("mouseup", fn)
				};
				d.on("mouseup", fn)
			});
			return this
		},
		swallowEvent : function(eventName, preventDefault) {
			var fn = function(e) {
				e.stopPropagation();
				if (preventDefault) {
					e.preventDefault()
				}
			};
			if (Ext.isArray(eventName)) {
				for (var i = 0, len = eventName.length;i < len; i++) {
					this.on(eventName[i], fn)
				}
				return this
			}
			this.on(eventName, fn);
			return this
		},
		parent : function(selector, returnDom) {
			return this.matchNode("parentNode", "parentNode", selector,
					returnDom)
		},
		next : function(selector, returnDom) {
			return this.matchNode("nextSibling", "nextSibling", selector,
					returnDom)
		},
		prev : function(selector, returnDom) {
			return this.matchNode("previousSibling", "previousSibling",
					selector, returnDom)
		},
		first : function(selector, returnDom) {
			return this.matchNode("nextSibling", "firstChild", selector,
					returnDom)
		},
		last : function(selector, returnDom) {
			return this.matchNode("previousSibling", "lastChild", selector,
					returnDom)
		},
		matchNode : function(dir, start, selector, returnDom) {
			var n = this.dom[start];
			while (n) {
				if (n.nodeType == 1
						&& (!selector || Ext.DomQuery.is(n, selector))) {
					return !returnDom ? Ext.get(n) : n
				}
				n = n[dir]
			}
			return null
		},
		appendChild : function(el) {
			el = Ext.get(el);
			el.appendTo(this);
			return this
		},
		createChild : function(config, insertBefore, returnDom) {
			config = config || {
				tag : "div"
			};
			if (insertBefore) {
				return Ext.DomHelper.insertBefore(insertBefore, config,
						returnDom !== true)
			}
			return Ext.DomHelper[!this.dom.firstChild ? "overwrite" : "append"](
					this.dom, config, returnDom !== true)
		},
		appendTo : function(el) {
			el = Ext.getDom(el);
			el.appendChild(this.dom);
			return this
		},
		insertBefore : function(el) {
			el = Ext.getDom(el);
			el.parentNode.insertBefore(this.dom, el);
			return this
		},
		insertAfter : function(el) {
			el = Ext.getDom(el);
			el.parentNode.insertBefore(this.dom, el.nextSibling);
			return this
		},
		insertFirst : function(el, returnDom) {
			el = el || {};
			if (typeof el == "object" && !el.nodeType && !el.dom) {
				return this.createChild(el, this.dom.firstChild, returnDom)
			} else {
				el = Ext.getDom(el);
				this.dom.insertBefore(el, this.dom.firstChild);
				return !returnDom ? Ext.get(el) : el
			}
		},
		insertSibling : function(el, where, returnDom) {
			var rt;
			if (Ext.isArray(el)) {
				for (var i = 0, len = el.length;i < len; i++) {
					rt = this.insertSibling(el[i], where, returnDom)
				}
				return rt
			}
			where = where ? where.toLowerCase() : "before";
			el = el || {};
			var refNode = where == "before" ? this.dom : this.dom.nextSibling;
			if (typeof el == "object" && !el.nodeType && !el.dom) {
				if (where == "after" && !this.dom.nextSibling) {
					rt = Ext.DomHelper.append(this.dom.parentNode, el,
							!returnDom)
				} else {
					rt = Ext.DomHelper[where == "after"
							? "insertAfter"
							: "insertBefore"](this.dom, el, !returnDom)
				}
			} else {
				rt = this.dom.parentNode.insertBefore(Ext.getDom(el), refNode);
				if (!returnDom) {
					rt = Ext.get(rt)
				}
			}
			return rt
		},
		wrap : function(config, returnDom) {
			if (!config) {
				config = {
					tag : "div"
				}
			}
			var newEl = Ext.DomHelper
					.insertBefore(this.dom, config, !returnDom);
			newEl.dom ? newEl.dom.appendChild(this.dom) : newEl
					.appendChild(this.dom);
			return newEl
		},
		replace : function(el) {
			el = Ext.get(el);
			this.insertBefore(el);
			el.remove();
			return this
		},
		replaceWith : function(el) {
			if (typeof el == "object" && !el.nodeType && !el.dom) {
				el = this.insertSibling(el, "before")
			} else {
				el = Ext.getDom(el);
				this.dom.parentNode.insertBefore(el, this.dom)
			}
			El.uncache(this.id);
			Ext.removeNode(this.dom);
			this.dom = el;
			this.id = Ext.id(el);
			El.cache[this.id] = this;
			return this
		},
		insertHtml : function(where, html, returnEl) {
			var el = Ext.DomHelper.insertHtml(where, this.dom, html);
			return returnEl ? Ext.get(el) : el
		},
		set : function(o, useSet) {
			var el = this.dom;
			useSet = typeof useSet == "undefined" ? (el.setAttribute
					? true
					: false) : useSet;
			for (var attr in o) {
				if (attr == "style" || typeof o[attr] == "function") {
					continue
				}
				if (attr == "cls") {
					el.className = o.cls
				} else {
					if (o.hasOwnProperty(attr)) {
						if (useSet) {
							el.setAttribute(attr, o[attr])
						} else {
							el[attr] = o[attr]
						}
					}
				}
			}
			if (o.style) {
				Ext.DomHelper.applyStyles(el, o.style)
			}
			return this
		},
		addKeyListener : function(key, fn, scope) {
			var config;
			if (typeof key != "object" || Ext.isArray(key)) {
				config = {
					key : key,
					fn : fn,
					scope : scope
				}
			} else {
				config = {
					key : key.key,
					shift : key.shift,
					ctrl : key.ctrl,
					alt : key.alt,
					fn : fn,
					scope : scope
				}
			}
			return new Ext.KeyMap(this, config)
		},
		addKeyMap : function(config) {
			return new Ext.KeyMap(this, config)
		},
		isScrollable : function() {
			var dom = this.dom;
			return dom.scrollHeight > dom.clientHeight
					|| dom.scrollWidth > dom.clientWidth
		},
		scrollTo : function(side, value, animate) {
			var prop = side.toLowerCase() == "left"
					? "scrollLeft"
					: "scrollTop";
			if (!animate || !A) {
				this.dom[prop] = value
			} else {
				var to = prop == "scrollLeft" ? [value, this.dom.scrollTop] : [
						this.dom.scrollLeft, value];
				this.anim( {
					scroll : {
						to : to
					}
				}, this.preanim(arguments, 2), "scroll")
			}
			return this
		},
		scroll : function(direction, distance, animate) {
			if (!this.isScrollable()) {
				return
			}
			var el = this.dom;
			var l = el.scrollLeft, t = el.scrollTop;
			var w = el.scrollWidth, h = el.scrollHeight;
			var cw = el.clientWidth, ch = el.clientHeight;
			direction = direction.toLowerCase();
			var scrolled = false;
			var a = this.preanim(arguments, 2);
			switch (direction) {
				case "l" :
				case "left" :
					if (w - l > cw) {
						var v = Math.min(l + distance, w - cw);
						this.scrollTo("left", v, a);
						scrolled = true
					}
					break;
				case "r" :
				case "right" :
					if (l > 0) {
						var v = Math.max(l - distance, 0);
						this.scrollTo("left", v, a);
						scrolled = true
					}
					break;
				case "t" :
				case "top" :
				case "up" :
					if (t > 0) {
						var v = Math.max(t - distance, 0);
						this.scrollTo("top", v, a);
						scrolled = true
					}
					break;
				case "b" :
				case "bottom" :
				case "down" :
					if (h - t > ch) {
						var v = Math.min(t + distance, h - ch);
						this.scrollTo("top", v, a);
						scrolled = true
					}
					break
			}
			return scrolled
		},
		translatePoints : function(x, y) {
			if (typeof x == "object" || Ext.isArray(x)) {
				y = x[1];
				x = x[0]
			}
			var p = this.getStyle("position");
			var o = this.getXY();
			var l = parseInt(this.getStyle("left"), 10);
			var t = parseInt(this.getStyle("top"), 10);
			if (isNaN(l)) {
				l = (p == "relative") ? 0 : this.dom.offsetLeft
			}
			if (isNaN(t)) {
				t = (p == "relative") ? 0 : this.dom.offsetTop
			}
			return {
				left : (x - o[0] + l),
				top : (y - o[1] + t)
			}
		},
		getScroll : function() {
			var d = this.dom, doc = document;
			if (d == doc || d == doc.body) {
				var l, t;
				if (Ext.isIE && Ext.isStrict) {
					l = doc.documentElement.scrollLeft
							|| (doc.body.scrollLeft || 0);
					t = doc.documentElement.scrollTop
							|| (doc.body.scrollTop || 0)
				} else {
					l = window.pageXOffset || (doc.body.scrollLeft || 0);
					t = window.pageYOffset || (doc.body.scrollTop || 0)
				}
				return {
					left : l,
					top : t
				}
			} else {
				return {
					left : d.scrollLeft,
					top : d.scrollTop
				}
			}
		},
		getColor : function(attr, defaultValue, prefix) {
			var v = this.getStyle(attr);
			if (!v || v == "transparent" || v == "inherit") {
				return defaultValue
			}
			var color = typeof prefix == "undefined" ? "#" : prefix;
			if (v.substr(0, 4) == "rgb(") {
				var rvs = v.slice(4, v.length - 1).split(",");
				for (var i = 0;i < 3; i++) {
					var h = parseInt(rvs[i]);
					var s = h.toString(16);
					if (h < 16) {
						s = "0" + s
					}
					color += s
				}
			} else {
				if (v.substr(0, 1) == "#") {
					if (v.length == 4) {
						for (var i = 1;i < 4; i++) {
							var c = v.charAt(i);
							color += c + c
						}
					} else {
						if (v.length == 7) {
							color += v.substr(1)
						}
					}
				}
			}
			return (color.length > 5 ? color.toLowerCase() : defaultValue)
		},
		boxWrap : function(cls) {
			cls = cls || "x-box";
			var el = Ext.get(this.insertHtml("beforeBegin", String.format(
					'<div class="{0}">' + El.boxMarkup + "</div>", cls)));
			el.child("." + cls + "-mc").dom.appendChild(this.dom);
			return el
		},
		getAttributeNS : Ext.isIE ? function(ns, name) {
			var d = this.dom;
			var type = typeof d[ns + ":" + name];
			if (type != "undefined" && type != "unknown") {
				return d[ns + ":" + name]
			}
			return d[name]
		} : function(ns, name) {
			var d = this.dom;
			return d.getAttributeNS(ns, name)
					|| d.getAttribute(ns + ":" + name) || d.getAttribute(name)
					|| d[name]
		},
		getTextWidth : function(text, min, max) {
			return (Ext.util.TextMetrics.measure(this.dom, Ext.value(text,
					this.dom.innerHTML, true)).width).constrain(min || 0, max
					|| 1000000)
		}
	};
	var ep = El.prototype;
	ep.on = ep.addListener;
	ep.mon = ep.addListener;
	ep.getUpdateManager = ep.getUpdater;
	ep.un = ep.removeListener;
	ep.autoBoxAdjust = true;
	El.unitPattern = /\d+(px|em|%|en|ex|pt|in|cm|mm|pc)$/i;
	El.addUnits = function(v, defaultUnit) {
		if (v === "" || v == "auto") {
			return v
		}
		if (v === undefined) {
			return ""
		}
		if (typeof v == "number" || !El.unitPattern.test(v)) {
			return v + (defaultUnit || "px")
		}
		return v
	};
	El.boxMarkup = '<div class="{0}-tl"><div class="{0}-tr"><div class="{0}-tc"></div></div></div><div class="{0}-ml"><div class="{0}-mr"><div class="{0}-mc"></div></div></div><div class="{0}-bl"><div class="{0}-br"><div class="{0}-bc"></div></div></div>';
	El.VISIBILITY = 1;
	El.DISPLAY = 2;
	El.borders = {
		l : "border-left-width",
		r : "border-right-width",
		t : "border-top-width",
		b : "border-bottom-width"
	};
	El.paddings = {
		l : "padding-left",
		r : "padding-right",
		t : "padding-top",
		b : "padding-bottom"
	};
	El.margins = {
		l : "margin-left",
		r : "margin-right",
		t : "margin-top",
		b : "margin-bottom"
	};
	El.cache = {};
	var docEl;
	El.get = function(el) {
		var ex, elm, id;
		if (!el) {
			return null
		}
		if (typeof el == "string") {
			if (!(elm = document.getElementById(el))) {
				return null
			}
			if (ex = El.cache[el]) {
				ex.dom = elm
			} else {
				ex = El.cache[el] = new El(elm)
			}
			return ex
		} else {
			if (el.tagName) {
				if (!(id = el.id)) {
					id = Ext.id(el)
				}
				if (ex = El.cache[id]) {
					ex.dom = el
				} else {
					ex = El.cache[id] = new El(el)
				}
				return ex
			} else {
				if (el instanceof El) {
					if (el != docEl) {
						el.dom = document.getElementById(el.id) || el.dom;
						El.cache[el.id] = el
					}
					return el
				} else {
					if (el.isComposite) {
						return el
					} else {
						if (Ext.isArray(el)) {
							return El.select(el)
						} else {
							if (el == document) {
								if (!docEl) {
									var f = function() {
									};
									f.prototype = El.prototype;
									docEl = new f();
									docEl.dom = document
								}
								return docEl
							}
						}
					}
				}
			}
		}
		return null
	};
	El.uncache = function(el) {
		for (var i = 0, a = arguments, len = a.length;i < len; i++) {
			if (a[i]) {
				delete El.cache[a[i].id || a[i]]
			}
		}
	};
	El.garbageCollect = function() {
		if (!Ext.enableGarbageCollector) {
			clearInterval(El.collectorThread);
			return
		}
		for (var eid in El.cache) {
			var el = El.cache[eid], d = el.dom;
			if (!d || !d.parentNode
					|| (!d.offsetParent && !document.getElementById(eid))) {
				delete El.cache[eid];
				if (d && Ext.enableListenerCollection) {
					Ext.EventManager.removeAll(d)
				}
			}
		}
	};
	El.collectorThreadId = setInterval(El.garbageCollect, 30000);
	var flyFn = function() {
	};
	flyFn.prototype = El.prototype;
	var _cls = new flyFn();
	El.Flyweight = function(dom) {
		this.dom = dom
	};
	El.Flyweight.prototype = _cls;
	El.Flyweight.prototype.isFlyweight = true;
	El._flyweights = {};
	El.fly = function(el, named) {
		named = named || "_global";
		el = Ext.getDom(el);
		if (!el) {
			return null
		}
		if (!El._flyweights[named]) {
			El._flyweights[named] = new El.Flyweight()
		}
		El._flyweights[named].dom = el;
		return El._flyweights[named]
	};
	Ext.get = El.get;
	Ext.fly = El.fly;
	var noBoxAdjust = Ext.isStrict ? {
		select : 1
	} : {
		input : 1,
		select : 1,
		textarea : 1
	};
	if (Ext.isIE || Ext.isGecko) {
		noBoxAdjust.button = 1
	}
	Ext.EventManager.on(window, "unload", function() {
		delete El.cache;
		delete El._flyweights
	})
})();
Ext.enableFx = true;
Ext.Fx = {
	slideIn : function(a, c) {
		var b = this.getFxEl();
		c = c || {};
		b.queueFx(c, function() {
			a = a || "t";
			this.fixDisplay();
			var d = this.getFxRestore();
			var k = this.getBox();
			this.setSize(k);
			var g = this.fxWrap(d.pos, c, "hidden");
			var m = this.dom.style;
			m.visibility = "visible";
			m.position = "absolute";
			var e = function() {
				b.fxUnwrap(g, d.pos, c);
				m.width = d.width;
				m.height = d.height;
				b.afterFx(c)
			};
			var l, n = {
				to : [k.x, k.y]
			}, i = {
				to : k.width
			}, h = {
				to : k.height
			};
			switch (a.toLowerCase()) {
				case "t" :
					g.setSize(k.width, 0);
					m.left = m.bottom = "0";
					l = {
						height : h
					};
					break;
				case "l" :
					g.setSize(0, k.height);
					m.right = m.top = "0";
					l = {
						width : i
					};
					break;
				case "r" :
					g.setSize(0, k.height);
					g.setX(k.right);
					m.left = m.top = "0";
					l = {
						width : i,
						points : n
					};
					break;
				case "b" :
					g.setSize(k.width, 0);
					g.setY(k.bottom);
					m.left = m.top = "0";
					l = {
						height : h,
						points : n
					};
					break;
				case "tl" :
					g.setSize(0, 0);
					m.right = m.bottom = "0";
					l = {
						width : i,
						height : h
					};
					break;
				case "bl" :
					g.setSize(0, 0);
					g.setY(k.y + k.height);
					m.right = m.top = "0";
					l = {
						width : i,
						height : h,
						points : n
					};
					break;
				case "br" :
					g.setSize(0, 0);
					g.setXY([k.right, k.bottom]);
					m.left = m.top = "0";
					l = {
						width : i,
						height : h,
						points : n
					};
					break;
				case "tr" :
					g.setSize(0, 0);
					g.setX(k.x + k.width);
					m.left = m.bottom = "0";
					l = {
						width : i,
						height : h,
						points : n
					};
					break
			}
			this.dom.style.visibility = "visible";
			g.show();
			arguments.callee.anim = g.fxanim(l, c, "motion", 0.5, "easeOut", e)
		});
		return this
	},
	slideOut : function(a, c) {
		var b = this.getFxEl();
		c = c || {};
		b.queueFx(c, function() {
			a = a || "t";
			var k = this.getFxRestore();
			var d = this.getBox();
			this.setSize(d);
			var h = this.fxWrap(k.pos, c, "visible");
			var g = this.dom.style;
			g.visibility = "visible";
			g.position = "absolute";
			h.setSize(d);
			var l = function() {
				if (c.useDisplay) {
					b.setDisplayed(false)
				} else {
					b.hide()
				}
				b.fxUnwrap(h, k.pos, c);
				g.width = k.width;
				g.height = k.height;
				b.afterFx(c)
			};
			var e, i = {
				to : 0
			};
			switch (a.toLowerCase()) {
				case "t" :
					g.left = g.bottom = "0";
					e = {
						height : i
					};
					break;
				case "l" :
					g.right = g.top = "0";
					e = {
						width : i
					};
					break;
				case "r" :
					g.left = g.top = "0";
					e = {
						width : i,
						points : {
							to : [d.right, d.y]
						}
					};
					break;
				case "b" :
					g.left = g.top = "0";
					e = {
						height : i,
						points : {
							to : [d.x, d.bottom]
						}
					};
					break;
				case "tl" :
					g.right = g.bottom = "0";
					e = {
						width : i,
						height : i
					};
					break;
				case "bl" :
					g.right = g.top = "0";
					e = {
						width : i,
						height : i,
						points : {
							to : [d.x, d.bottom]
						}
					};
					break;
				case "br" :
					g.left = g.top = "0";
					e = {
						width : i,
						height : i,
						points : {
							to : [d.x + d.width, d.bottom]
						}
					};
					break;
				case "tr" :
					g.left = g.bottom = "0";
					e = {
						width : i,
						height : i,
						points : {
							to : [d.right, d.y]
						}
					};
					break
			}
			arguments.callee.anim = h.fxanim(e, c, "motion", 0.5, "easeOut", l)
		});
		return this
	},
	puff : function(b) {
		var a = this.getFxEl();
		b = b || {};
		a.queueFx(b, function() {
			this.clearOpacity();
			this.show();
			var g = this.getFxRestore();
			var d = this.dom.style;
			var h = function() {
				if (b.useDisplay) {
					a.setDisplayed(false)
				} else {
					a.hide()
				}
				a.clearOpacity();
				a.setPositioning(g.pos);
				d.width = g.width;
				d.height = g.height;
				d.fontSize = "";
				a.afterFx(b)
			};
			var e = this.getWidth();
			var c = this.getHeight();
			arguments.callee.anim = this.fxanim( {
				width : {
					to : this.adjustWidth(e * 2)
				},
				height : {
					to : this.adjustHeight(c * 2)
				},
				points : {
					by : [-(e * 0.5), -(c * 0.5)]
				},
				opacity : {
					to : 0
				},
				fontSize : {
					to : 200,
					unit : "%"
				}
			}, b, "motion", 0.5, "easeOut", h)
		});
		return this
	},
	switchOff : function(b) {
		var a = this.getFxEl();
		b = b || {};
		a.queueFx(b, function() {
			this.clearOpacity();
			this.clip();
			var d = this.getFxRestore();
			var c = this.dom.style;
			var e = function() {
				if (b.useDisplay) {
					a.setDisplayed(false)
				} else {
					a.hide()
				}
				a.clearOpacity();
				a.setPositioning(d.pos);
				c.width = d.width;
				c.height = d.height;
				a.afterFx(b)
			};
			this.fxanim( {
				opacity : {
					to : 0.3
				}
			}, null, null, 0.1, null, function() {
				this.clearOpacity();
				(function() {
					this.fxanim( {
						height : {
							to : 1
						},
						points : {
							by : [0, this.getHeight() * 0.5]
						}
					}, b, "motion", 0.3, "easeIn", e)
				}).defer(100, this)
			})
		});
		return this
	},
	highlight : function(a, c) {
		var b = this.getFxEl();
		c = c || {};
		b.queueFx(c, function() {
			a = a || "ffff9c";
			var d = c.attr || "backgroundColor";
			this.clearOpacity();
			this.show();
			var h = this.getColor(d);
			var i = this.dom.style[d];
			var g = (c.endColor || h) || "ffffff";
			var k = function() {
				b.dom.style[d] = i;
				b.afterFx(c)
			};
			var e = {};
			e[d] = {
				from : a,
				to : g
			};
			arguments.callee.anim = this.fxanim(e, c, "color", 1, "easeIn", k)
		});
		return this
	},
	frame : function(a, c, d) {
		var b = this.getFxEl();
		d = d || {};
		b.queueFx(d, function() {
			a = a || "#C3DAF9";
			if (a.length == 6) {
				a = "#" + a
			}
			c = c || 1;
			var h = d.duration || 1;
			this.show();
			var e = this.getBox();
			var g = function() {
				var i = Ext.getBody().createChild( {
					style : {
						visbility : "hidden",
						position : "absolute",
						"z-index" : "35000",
						border : "0px solid " + a
					}
				});
				var k = Ext.isBorderBox ? 2 : 1;
				i.animate( {
					top : {
						from : e.y,
						to : e.y - 20
					},
					left : {
						from : e.x,
						to : e.x - 20
					},
					borderWidth : {
						from : 0,
						to : 10
					},
					opacity : {
						from : 1,
						to : 0
					},
					height : {
						from : e.height,
						to : (e.height + (20 * k))
					},
					width : {
						from : e.width,
						to : (e.width + (20 * k))
					}
				}, h, function() {
					i.remove();
					if (--c > 0) {
						g()
					} else {
						b.afterFx(d)
					}
				})
			};
			g.call(this)
		});
		return this
	},
	pause : function(c) {
		var a = this.getFxEl();
		var b = {};
		a.queueFx(b, function() {
			setTimeout(function() {
				a.afterFx(b)
			}, c * 1000)
		});
		return this
	},
	fadeIn : function(b) {
		var a = this.getFxEl();
		b = b || {};
		a.queueFx(b, function() {
			this.setOpacity(0);
			this.fixDisplay();
			this.dom.style.visibility = "visible";
			var c = b.endOpacity || 1;
			arguments.callee.anim = this.fxanim( {
				opacity : {
					to : c
				}
			}, b, null, 0.5, "easeOut", function() {
				if (c == 1) {
					this.clearOpacity()
				}
				a.afterFx(b)
			})
		});
		return this
	},
	fadeOut : function(b) {
		var a = this.getFxEl();
		b = b || {};
		a.queueFx(b, function() {
			var c = b.endOpacity || 0;
			arguments.callee.anim = this.fxanim( {
				opacity : {
					to : c
				}
			}, b, null, 0.5, "easeOut", function() {
				if (c === 0) {
					if (this.visibilityMode == Ext.Element.DISPLAY
							|| b.useDisplay) {
						this.dom.style.display = "none"
					} else {
						this.dom.style.visibility = "hidden"
					}
					this.clearOpacity()
				}
				a.afterFx(b)
			})
		});
		return this
	},
	scale : function(a, b, c) {
		this.shift(Ext.apply( {}, c, {
			width : a,
			height : b
		}));
		return this
	},
	shift : function(b) {
		var a = this.getFxEl();
		b = b || {};
		a
				.queueFx(
						b,
						function() {
							var e = {}, d = b.width, g = b.height, c = b.x, k = b.y, i = b.opacity;
							if (d !== undefined) {
								e.width = {
									to : this.adjustWidth(d)
								}
							}
							if (g !== undefined) {
								e.height = {
									to : this.adjustHeight(g)
								}
							}
							if (b.left !== undefined) {
								e.left = {
									to : b.left
								}
							}
							if (b.top !== undefined) {
								e.top = {
									to : b.top
								}
							}
							if (b.right !== undefined) {
								e.right = {
									to : b.right
								}
							}
							if (b.bottom !== undefined) {
								e.bottom = {
									to : b.bottom
								}
							}
							if (c !== undefined || k !== undefined) {
								e.points = {
									to : [c !== undefined ? c : this.getX(),
											k !== undefined ? k : this.getY()]
								}
							}
							if (i !== undefined) {
								e.opacity = {
									to : i
								}
							}
							if (b.xy !== undefined) {
								e.points = {
									to : b.xy
								}
							}
							arguments.callee.anim = this.fxanim(e, b, "motion",
									0.35, "easeOut", function() {
										a.afterFx(b)
									})
						});
		return this
	},
	ghost : function(a, c) {
		var b = this.getFxEl();
		c = c || {};
		b.queueFx(c, function() {
			a = a || "b";
			var k = this.getFxRestore();
			var e = this.getWidth(), i = this.getHeight();
			var g = this.dom.style;
			var m = function() {
				if (c.useDisplay) {
					b.setDisplayed(false)
				} else {
					b.hide()
				}
				b.clearOpacity();
				b.setPositioning(k.pos);
				g.width = k.width;
				g.height = k.height;
				b.afterFx(c)
			};
			var d = {
				opacity : {
					to : 0
				},
				points : {}
			}, l = d.points;
			switch (a.toLowerCase()) {
				case "t" :
					l.by = [0, -i];
					break;
				case "l" :
					l.by = [-e, 0];
					break;
				case "r" :
					l.by = [e, 0];
					break;
				case "b" :
					l.by = [0, i];
					break;
				case "tl" :
					l.by = [-e, -i];
					break;
				case "bl" :
					l.by = [-e, i];
					break;
				case "br" :
					l.by = [e, i];
					break;
				case "tr" :
					l.by = [e, -i];
					break
			}
			arguments.callee.anim = this.fxanim(d, c, "motion", 0.5, "easeOut",
					m)
		});
		return this
	},
	syncFx : function() {
		this.fxDefaults = Ext.apply(this.fxDefaults || {}, {
			block : false,
			concurrent : true,
			stopFx : false
		});
		return this
	},
	sequenceFx : function() {
		this.fxDefaults = Ext.apply(this.fxDefaults || {}, {
			block : false,
			concurrent : false,
			stopFx : false
		});
		return this
	},
	nextFx : function() {
		var a = this.fxQueue[0];
		if (a) {
			a.call(this)
		}
	},
	hasActiveFx : function() {
		return this.fxQueue && this.fxQueue[0]
	},
	stopFx : function() {
		if (this.hasActiveFx()) {
			var a = this.fxQueue[0];
			if (a && a.anim && a.anim.isAnimated()) {
				this.fxQueue = [a];
				a.anim.stop(true)
			}
		}
		return this
	},
	beforeFx : function(a) {
		if (this.hasActiveFx() && !a.concurrent) {
			if (a.stopFx) {
				this.stopFx();
				return true
			}
			return false
		}
		return true
	},
	hasFxBlock : function() {
		var a = this.fxQueue;
		return a && a[0] && a[0].block
	},
	queueFx : function(c, a) {
		if (!this.fxQueue) {
			this.fxQueue = []
		}
		if (!this.hasFxBlock()) {
			Ext.applyIf(c, this.fxDefaults);
			if (!c.concurrent) {
				var b = this.beforeFx(c);
				a.block = c.block;
				this.fxQueue.push(a);
				if (b) {
					this.nextFx()
				}
			} else {
				a.call(this)
			}
		}
		return this
	},
	fxWrap : function(g, d, c) {
		var b;
		if (!d.wrap || !(b = Ext.get(d.wrap))) {
			var a;
			if (d.fixPosition) {
				a = this.getXY()
			}
			var e = document.createElement("div");
			e.style.visibility = c;
			b = Ext.get(this.dom.parentNode.insertBefore(e, this.dom));
			b.setPositioning(g);
			if (b.getStyle("position") == "static") {
				b.position("relative")
			}
			this.clearPositioning("auto");
			b.clip();
			b.dom.appendChild(this.dom);
			if (a) {
				b.setXY(a)
			}
		}
		return b
	},
	fxUnwrap : function(a, c, b) {
		this.clearPositioning();
		this.setPositioning(c);
		if (!b.wrap) {
			a.dom.parentNode.insertBefore(this.dom, a.dom);
			a.remove()
		}
	},
	getFxRestore : function() {
		var a = this.dom.style;
		return {
			pos : this.getPositioning(),
			width : a.width,
			height : a.height
		}
	},
	afterFx : function(a) {
		if (a.afterStyle) {
			this.applyStyles(a.afterStyle)
		}
		if (a.afterCls) {
			this.addClass(a.afterCls)
		}
		if (a.remove === true) {
			this.remove()
		}
		Ext.callback(a.callback, a.scope, [this]);
		if (!a.concurrent) {
			this.fxQueue.shift();
			this.nextFx()
		}
	},
	getFxEl : function() {
		return Ext.get(this.dom)
	},
	fxanim : function(d, e, b, g, c, a) {
		b = b || "run";
		e = e || {};
		var h = Ext.lib.Anim[b](this.dom, d, (e.duration || g) || 0.35,
				(e.easing || c) || "easeOut", function() {
					Ext.callback(a, this)
				}, this);
		e.anim = h;
		return h
	}
};
Ext.Fx.resize = Ext.Fx.scale;
Ext.apply(Ext.Element.prototype, Ext.Fx);
Ext.CompositeElement = function(a) {
	this.elements = [];
	this.addElements(a)
};
Ext.CompositeElement.prototype = {
	isComposite : true,
	addElements : function(e) {
		if (!e) {
			return this
		}
		if (typeof e == "string") {
			e = Ext.Element.selectorFunction(e)
		}
		var d = this.elements;
		var b = d.length - 1;
		for (var c = 0, a = e.length;c < a; c++) {
			d[++b] = Ext.get(e[c])
		}
		return this
	},
	fill : function(a) {
		this.elements = [];
		this.add(a);
		return this
	},
	filter : function(a) {
		var b = [];
		this.each(function(c) {
			if (c.is(a)) {
				b[b.length] = c.dom
			}
		});
		this.fill(b);
		return this
	},
	invoke : function(e, b) {
		var d = this.elements;
		for (var c = 0, a = d.length;c < a; c++) {
			Ext.Element.prototype[e].apply(d[c], b)
		}
		return this
	},
	add : function(a) {
		if (typeof a == "string") {
			this.addElements(Ext.Element.selectorFunction(a))
		} else {
			if (a.length !== undefined) {
				this.addElements(a)
			} else {
				this.addElements([a])
			}
		}
		return this
	},
	each : function(e, d) {
		var c = this.elements;
		for (var b = 0, a = c.length;b < a; b++) {
			if (e.call(d || c[b], c[b], this, b) === false) {
				break
			}
		}
		return this
	},
	item : function(a) {
		return this.elements[a] || null
	},
	first : function() {
		return this.item(0)
	},
	last : function() {
		return this.item(this.elements.length - 1)
	},
	getCount : function() {
		return this.elements.length
	},
	contains : function(a) {
		return this.indexOf(a) !== -1
	},
	indexOf : function(a) {
		return this.elements.indexOf(Ext.get(a))
	},
	removeElement : function(e, h) {
		if (Ext.isArray(e)) {
			for (var c = 0, a = e.length;c < a; c++) {
				this.removeElement(e[c])
			}
			return this
		}
		var b = typeof e == "number" ? e : this.indexOf(e);
		if (b !== -1 && this.elements[b]) {
			if (h) {
				var g = this.elements[b];
				if (g.dom) {
					g.remove()
				} else {
					Ext.removeNode(g)
				}
			}
			this.elements.splice(b, 1)
		}
		return this
	},
	replaceElement : function(d, c, a) {
		var b = typeof d == "number" ? d : this.indexOf(d);
		if (b !== -1) {
			if (a) {
				this.elements[b].replaceWith(c)
			} else {
				this.elements.splice(b, 1, Ext.get(c))
			}
		}
		return this
	},
	clear : function() {
		this.elements = []
	}
};
(function() {
	Ext.CompositeElement.createCall = function(b, c) {
		if (!b[c]) {
			b[c] = function() {
				return this.invoke(c, arguments)
			}
		}
	};
	for (var a in Ext.Element.prototype) {
		if (typeof Ext.Element.prototype[a] == "function") {
			Ext.CompositeElement.createCall(Ext.CompositeElement.prototype, a)
		}
	}
})();
Ext.CompositeElementLite = function(a) {
	Ext.CompositeElementLite.superclass.constructor.call(this, a);
	this.el = new Ext.Element.Flyweight()
};
Ext.extend(Ext.CompositeElementLite, Ext.CompositeElement, {
	addElements : function(e) {
		if (e) {
			if (Ext.isArray(e)) {
				this.elements = this.elements.concat(e)
			} else {
				var d = this.elements;
				var b = d.length - 1;
				for (var c = 0, a = e.length;c < a; c++) {
					d[++b] = e[c]
				}
			}
		}
		return this
	},
	invoke : function(g, b) {
		var d = this.elements;
		var e = this.el;
		for (var c = 0, a = d.length;c < a; c++) {
			e.dom = d[c];
			Ext.Element.prototype[g].apply(e, b)
		}
		return this
	},
	item : function(a) {
		if (!this.elements[a]) {
			return null
		}
		this.el.dom = this.elements[a];
		return this.el
	},
	addListener : function(b, h, g, e) {
		var d = this.elements;
		for (var c = 0, a = d.length;c < a; c++) {
			Ext.EventManager.on(d[c], b, h, g || d[c], e)
		}
		return this
	},
	each : function(g, e) {
		var c = this.elements;
		var d = this.el;
		for (var b = 0, a = c.length;b < a; b++) {
			d.dom = c[b];
			if (g.call(e || d, d, this, b) === false) {
				break
			}
		}
		return this
	},
	indexOf : function(a) {
		return this.elements.indexOf(Ext.getDom(a))
	},
	replaceElement : function(e, c, a) {
		var b = typeof e == "number" ? e : this.indexOf(e);
		if (b !== -1) {
			c = Ext.getDom(c);
			if (a) {
				var g = this.elements[b];
				g.parentNode.insertBefore(c, g);
				Ext.removeNode(g)
			}
			this.elements.splice(b, 1, c)
		}
		return this
	}
});
Ext.CompositeElementLite.prototype.on = Ext.CompositeElementLite.prototype.addListener;
if (Ext.DomQuery) {
	Ext.Element.selectorFunction = Ext.DomQuery.select
}
Ext.Element.select = function(a, d, b) {
	var c;
	if (typeof a == "string") {
		c = Ext.Element.selectorFunction(a, b)
	} else {
		if (a.length !== undefined) {
			c = a
		} else {
			throw "Invalid selector"
		}
	}
	if (d === true) {
		return new Ext.CompositeElement(c)
	} else {
		return new Ext.CompositeElementLite(c)
	}
};
Ext.select = Ext.Element.select;
Ext.data.Connection = function(a) {
	Ext.apply(this, a);
	this.addEvents("beforerequest", "requestcomplete", "requestexception");
	Ext.data.Connection.superclass.constructor.call(this)
};
Ext.extend(Ext.data.Connection, Ext.util.Observable, {
	timeout : 30000,
	autoAbort : false,
	disableCaching : true,
	disableCachingParam : "_dc",
	request : function(e) {
		if (this.fireEvent("beforerequest", this, e) !== false) {
			var c = e.params;
			if (typeof c == "function") {
				c = c.call(e.scope || window, e)
			}
			if (typeof c == "object") {
				c = Ext.urlEncode(c)
			}
			if (this.extraParams) {
				var h = Ext.urlEncode(this.extraParams);
				c = c ? (c + "&" + h) : h
			}
			var b = e.url || this.url;
			if (typeof b == "function") {
				b = b.call(e.scope || window, e)
			}
			if (e.form) {
				var d = Ext.getDom(e.form);
				b = b || d.action;
				var l = d.getAttribute("enctype");
				if (e.isUpload
						|| (l && l.toLowerCase() == "multipart/form-data")) {
					return this.doFormUpload(e, c, b)
				}
				var k = Ext.lib.Ajax.serializeForm(d);
				c = c ? (c + "&" + k) : k
			}
			var m = e.headers;
			if (this.defaultHeaders) {
				m = Ext.apply(m || {}, this.defaultHeaders);
				if (!e.headers) {
					e.headers = m
				}
			}
			var g = {
				success : this.handleResponse,
				failure : this.handleFailure,
				scope : this,
				argument : {
					options : e
				},
				timeout : e.timeout || this.timeout
			};
			var a = e.method || this.method
					|| ((c || e.xmlData || e.jsonData) ? "POST" : "GET");
			if (a == "GET"
					&& (this.disableCaching && e.disableCaching !== false)
					|| e.disableCaching === true) {
				var i = e.disableCachingParam || this.disableCachingParam;
				b += (b.indexOf("?") != -1 ? "&" : "?") + i + "="
						+ (new Date().getTime())
			}
			if (typeof e.autoAbort == "boolean") {
				if (e.autoAbort) {
					this.abort()
				}
			} else {
				if (this.autoAbort !== false) {
					this.abort()
				}
			}
			if ((a == "GET" || e.xmlData || e.jsonData) && c) {
				b += (b.indexOf("?") != -1 ? "&" : "?") + c;
				c = ""
			}
			this.transId = Ext.lib.Ajax.request(a, b, g, c, e);
			return this.transId
		} else {
			Ext.callback(e.callback, e.scope, [e, null, null]);
			return null
		}
	},
	isLoading : function(a) {
		if (a) {
			return Ext.lib.Ajax.isCallInProgress(a)
		} else {
			return this.transId ? true : false
		}
	},
	abort : function(a) {
		if (a || this.isLoading()) {
			Ext.lib.Ajax.abort(a || this.transId)
		}
	},
	handleResponse : function(a) {
		this.transId = false;
		var b = a.argument.options;
		a.argument = b ? b.argument : null;
		this.fireEvent("requestcomplete", this, a, b);
		Ext.callback(b.success, b.scope, [a, b]);
		Ext.callback(b.callback, b.scope, [b, true, a])
	},
	handleFailure : function(a, c) {
		this.transId = false;
		var b = a.argument.options;
		a.argument = b ? b.argument : null;
		this.fireEvent("requestexception", this, a, b, c);
		Ext.callback(b.failure, b.scope, [a, b]);
		Ext.callback(b.callback, b.scope, [b, false, a])
	},
	doFormUpload : function(e, a, b) {
		var c = Ext.id();
		var g = document.createElement("iframe");
		g.id = c;
		g.name = c;
		g.className = "x-hidden";
		if (Ext.isIE) {
			g.src = Ext.SSL_SECURE_URL
		}
		document.body.appendChild(g);
		if (Ext.isIE) {
			document.frames[c].name = c
		}
		var d = Ext.getDom(e.form);
		d.target = c;
		d.method = "POST";
		d.enctype = d.encoding = "multipart/form-data";
		if (b) {
			d.action = b
		}
		var q, n;
		if (a) {
			q = [];
			a = Ext.urlDecode(a, false);
			for (var l in a) {
				if (a.hasOwnProperty(l)) {
					n = document.createElement("input");
					n.type = "hidden";
					n.name = l;
					n.value = a[l];
					d.appendChild(n);
					q.push(n)
				}
			}
		}
		function h() {
			var i = {
				responseText : "",
				responseXML : null
			};
			i.argument = e ? e.argument : null;
			try {
				var o;
				if (Ext.isIE) {
					o = g.contentWindow.document
				} else {
					o = (g.contentDocument || window.frames[c].document)
				}
				if (o && o.body) {
					i.responseText = o.body.innerHTML
				}
				if (o && o.XMLDocument) {
					i.responseXML = o.XMLDocument
				} else {
					i.responseXML = o
				}
			} catch (k) {
			}
			Ext.EventManager.removeListener(g, "load", h, this);
			this.fireEvent("requestcomplete", this, i, e);
			Ext.callback(e.success, e.scope, [i, e]);
			Ext.callback(e.callback, e.scope, [e, true, i]);
			setTimeout(function() {
				Ext.removeNode(g)
			}, 100)
		}
		Ext.EventManager.on(g, "load", h, this);
		d.submit();
		if (q) {
			for (var m = 0, p = q.length;m < p; m++) {
				Ext.removeNode(q[m])
			}
		}
	}
});
Ext.Ajax = new Ext.data.Connection( {
	autoAbort : false,
	serializeForm : function(a) {
		return Ext.lib.Ajax.serializeForm(a)
	}
});
Ext.Updater = Ext.extend(Ext.util.Observable, {
	constructor : function(b, a) {
		b = Ext.get(b);
		if (!a && b.updateManager) {
			return b.updateManager
		}
		this.el = b;
		this.defaultUrl = null;
		this.addEvents("beforeupdate", "update", "failure");
		var c = Ext.Updater.defaults;
		this.sslBlankUrl = c.sslBlankUrl;
		this.disableCaching = c.disableCaching;
		this.indicatorText = c.indicatorText;
		this.showLoadIndicator = c.showLoadIndicator;
		this.timeout = c.timeout;
		this.loadScripts = c.loadScripts;
		this.transaction = null;
		this.refreshDelegate = this.refresh.createDelegate(this);
		this.updateDelegate = this.update.createDelegate(this);
		this.formUpdateDelegate = this.formUpdate.createDelegate(this);
		if (!this.renderer) {
			this.renderer = this.getDefaultRenderer()
		}
		Ext.Updater.superclass.constructor.call(this)
	},
	getDefaultRenderer : function() {
		return new Ext.Updater.BasicRenderer()
	},
	getEl : function() {
		return this.el
	},
	update : function(b, g, h, d) {
		if (this.fireEvent("beforeupdate", this.el, b, g) !== false) {
			var a, c;
			if (typeof b == "object") {
				a = b;
				b = a.url;
				g = g || a.params;
				h = h || a.callback;
				d = d || a.discardUrl;
				c = a.scope;
				if (typeof a.nocache != "undefined") {
					this.disableCaching = a.nocache
				}
				if (typeof a.text != "undefined") {
					this.indicatorText = '<div class="loading-indicator">'
							+ a.text + "</div>"
				}
				if (typeof a.scripts != "undefined") {
					this.loadScripts = a.scripts
				}
				if (typeof a.timeout != "undefined") {
					this.timeout = a.timeout
				}
			}
			this.showLoading();
			if (!d) {
				this.defaultUrl = b
			}
			if (typeof b == "function") {
				b = b.call(this)
			}
			var e = Ext.apply( {}, {
				url : b,
				params : (typeof g == "function" && c)
						? g.createDelegate(c)
						: g,
				success : this.processSuccess,
				failure : this.processFailure,
				scope : this,
				callback : undefined,
				timeout : (this.timeout * 1000),
				disableCaching : this.disableCaching,
				argument : {
					options : a,
					url : b,
					form : null,
					callback : h,
					scope : c || window,
					params : g
				}
			}, a);
			this.transaction = Ext.Ajax.request(e)
		}
	},
	formUpdate : function(c, a, b, d) {
		if (this.fireEvent("beforeupdate", this.el, c, a) !== false) {
			if (typeof a == "function") {
				a = a.call(this)
			}
			c = Ext.getDom(c);
			this.transaction = Ext.Ajax.request( {
				form : c,
				url : a,
				success : this.processSuccess,
				failure : this.processFailure,
				scope : this,
				timeout : (this.timeout * 1000),
				argument : {
					url : a,
					form : c,
					callback : d,
					reset : b
				}
			});
			this.showLoading.defer(1, this)
		}
	},
	refresh : function(a) {
		if (this.defaultUrl == null) {
			return
		}
		this.update(this.defaultUrl, null, a, true)
	},
	startAutoRefresh : function(b, c, d, e, a) {
		if (a) {
			this.update(c || this.defaultUrl, d, e, true)
		}
		if (this.autoRefreshProcId) {
			clearInterval(this.autoRefreshProcId)
		}
		this.autoRefreshProcId = setInterval(this.update.createDelegate(this, [
				c || this.defaultUrl, d, e, true]), b * 1000)
	},
	stopAutoRefresh : function() {
		if (this.autoRefreshProcId) {
			clearInterval(this.autoRefreshProcId);
			delete this.autoRefreshProcId
		}
	},
	isAutoRefreshing : function() {
		return this.autoRefreshProcId ? true : false
	},
	showLoading : function() {
		if (this.showLoadIndicator) {
			this.el.update(this.indicatorText)
		}
	},
	processSuccess : function(a) {
		this.transaction = null;
		if (a.argument.form && a.argument.reset) {
			try {
				a.argument.form.reset()
			} catch (b) {
			}
		}
		if (this.loadScripts) {
			this.renderer.render(this.el, a, this, this.updateComplete
					.createDelegate(this, [a]))
		} else {
			this.renderer.render(this.el, a, this);
			this.updateComplete(a)
		}
	},
	updateComplete : function(a) {
		this.fireEvent("update", this.el, a);
		if (typeof a.argument.callback == "function") {
			a.argument.callback.call(a.argument.scope, this.el, true, a,
					a.argument.options)
		}
	},
	processFailure : function(a) {
		this.transaction = null;
		this.fireEvent("failure", this.el, a);
		if (typeof a.argument.callback == "function") {
			a.argument.callback.call(a.argument.scope, this.el, false, a,
					a.argument.options)
		}
	},
	setRenderer : function(a) {
		this.renderer = a
	},
	getRenderer : function() {
		return this.renderer
	},
	setDefaultUrl : function(a) {
		this.defaultUrl = a
	},
	abort : function() {
		if (this.transaction) {
			Ext.Ajax.abort(this.transaction)
		}
	},
	isUpdating : function() {
		if (this.transaction) {
			return Ext.Ajax.isLoading(this.transaction)
		}
		return false
	}
});
Ext.Updater.defaults = {
	timeout : 30,
	loadScripts : false,
	sslBlankUrl : (Ext.SSL_SECURE_URL || "javascript:false"),
	disableCaching : false,
	showLoadIndicator : true,
	indicatorText : '<div class="loading-indicator">Loading...</div>'
};
Ext.Updater.updateElement = function(d, c, e, b) {
	var a = Ext.get(d).getUpdater();
	Ext.apply(a, b);
	a.update(c, e, b ? b.callback : null)
};
Ext.Updater.BasicRenderer = function() {
};
Ext.Updater.BasicRenderer.prototype = {
	render : function(c, a, b, d) {
		c.update(a.responseText, b.loadScripts, d)
	}
};
Ext.UpdateManager = Ext.Updater;
(function() {
	function xf(format) {
		var args = Array.prototype.slice.call(arguments, 1);
		return format.replace(/\{(\d+)\}/g, function(m, i) {
			return args[i]
		})
	}
	Date.formatCodeToRegex = function(character, currentGroup) {
		var p = Date.parseCodes[character];
		if (p) {
			p = Ext.type(p) == "function" ? p() : p;
			Date.parseCodes[character] = p
		}
		return p ? Ext.applyIf( {
			c : p.c ? xf(p.c, currentGroup || "{0}") : p.c
		}, p) : {
			g : 0,
			c : null,
			s : Ext.escapeRe(character)
		}
	};
	var $f = Date.formatCodeToRegex;
	Ext
			.apply(
					Date,
					{
						parseFunctions : {
							count : 0
						},
						parseRegexes : [],
						formatFunctions : {
							count : 0
						},
						daysInMonth : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31,
								30, 31],
						y2kYear : 50,
						MILLI : "ms",
						SECOND : "s",
						MINUTE : "mi",
						HOUR : "h",
						DAY : "d",
						MONTH : "mo",
						YEAR : "y",
						dayNames : ["Sunday", "Monday", "Tuesday", "Wednesday",
								"Thursday", "Friday", "Saturday"],
						monthNames : ["January", "February", "March", "April",
								"May", "June", "July", "August", "September",
								"October", "November", "December"],
						monthNumbers : {
							Jan : 0,
							Feb : 1,
							Mar : 2,
							Apr : 3,
							May : 4,
							Jun : 5,
							Jul : 6,
							Aug : 7,
							Sep : 8,
							Oct : 9,
							Nov : 10,
							Dec : 11
						},
						getShortMonthName : function(month) {
							return Date.monthNames[month].substring(0, 3)
						},
						getShortDayName : function(day) {
							return Date.dayNames[day].substring(0, 3)
						},
						getMonthNumber : function(name) {
							return Date.monthNumbers[name.substring(0, 1)
									.toUpperCase()
									+ name.substring(1, 3).toLowerCase()]
						},
						formatCodes : {
							d : "String.leftPad(this.getDate(), 2, '0')",
							D : "Date.getShortDayName(this.getDay())",
							j : "this.getDate()",
							l : "Date.dayNames[this.getDay()]",
							N : "(this.getDay() ? this.getDay() : 7)",
							S : "this.getSuffix()",
							w : "this.getDay()",
							z : "this.getDayOfYear()",
							W : "String.leftPad(this.getWeekOfYear(), 2, '0')",
							F : "Date.monthNames[this.getMonth()]",
							m : "String.leftPad(this.getMonth() + 1, 2, '0')",
							M : "Date.getShortMonthName(this.getMonth())",
							n : "(this.getMonth() + 1)",
							t : "this.getDaysInMonth()",
							L : "(this.isLeapYear() ? 1 : 0)",
							o : "(this.getFullYear() + (this.getWeekOfYear() == 1 && this.getMonth() > 0 ? +1 : (this.getWeekOfYear() >= 52 && this.getMonth() < 11 ? -1 : 0)))",
							Y : "this.getFullYear()",
							y : "('' + this.getFullYear()).substring(2, 4)",
							a : "(this.getHours() < 12 ? 'am' : 'pm')",
							A : "(this.getHours() < 12 ? 'AM' : 'PM')",
							g : "((this.getHours() % 12) ? this.getHours() % 12 : 12)",
							G : "this.getHours()",
							h : "String.leftPad((this.getHours() % 12) ? this.getHours() % 12 : 12, 2, '0')",
							H : "String.leftPad(this.getHours(), 2, '0')",
							i : "String.leftPad(this.getMinutes(), 2, '0')",
							s : "String.leftPad(this.getSeconds(), 2, '0')",
							u : "String.leftPad(this.getMilliseconds(), 3, '0')",
							O : "this.getGMTOffset()",
							P : "this.getGMTOffset(true)",
							T : "this.getTimezone()",
							Z : "(this.getTimezoneOffset() * -60)",
							c : function() {
								for (var c = "Y-m-dTH:i:sP", code = [], i = 0, l = c.length;i < l; ++i) {
									var e = c.charAt(i);
									code.push(e == "T" ? "'T'" : Date
											.getFormatCode(e))
								}
								return code.join(" + ")
							},
							U : "Math.round(this.getTime() / 1000)"
						},
						parseDate : function(input, format) {
							var p = Date.parseFunctions;
							if (p[format] == null) {
								Date.createParser(format)
							}
							var func = p[format];
							return Date[func](input)
						},
						getFormatCode : function(character) {
							var f = Date.formatCodes[character];
							if (f) {
								f = Ext.type(f) == "function" ? f() : f;
								Date.formatCodes[character] = f
							}
							return f || ("'" + String.escape(character) + "'")
						},
						createNewFormat : function(format) {
							var funcName = "format"
									+ Date.formatFunctions.count++, code = "Date.prototype."
									+ funcName + " = function(){return ", special = false, ch = "";
							Date.formatFunctions[format] = funcName;
							for (var i = 0;i < format.length; ++i) {
								ch = format.charAt(i);
								if (!special && ch == "\\") {
									special = true
								} else {
									if (special) {
										special = false;
										code += "'" + String.escape(ch)
												+ "' + "
									} else {
										code += Date.getFormatCode(ch) + " + "
									}
								}
							}
							eval(code.substring(0, code.length - 3) + ";}")
						},
						createParser : function() {
							var code = [
									"Date.{0} = function(input){",
									"var y, m, d, h = 0, i = 0, s = 0, ms = 0, o, z, u, v;",
									"input = String(input);",
									"d = new Date();",
									"y = d.getFullYear();",
									"m = d.getMonth();",
									"d = d.getDate();",
									"var results = input.match(Date.parseRegexes[{1}]);",
									"if(results && results.length > 0){",
									"{2}",
									"if(u){",
									"v = new Date(u * 1000);",
									"}else if (y >= 0 && m >= 0 && d > 0 && h >= 0 && i >= 0 && s >= 0 && ms >= 0){",
									"v = new Date(y, m, d, h, i, s, ms);",
									"}else if (y >= 0 && m >= 0 && d > 0 && h >= 0 && i >= 0 && s >= 0){",
									"v = new Date(y, m, d, h, i, s);",
									"}else if (y >= 0 && m >= 0 && d > 0 && h >= 0 && i >= 0){",
									"v = new Date(y, m, d, h, i);",
									"}else if (y >= 0 && m >= 0 && d > 0 && h >= 0){",
									"v = new Date(y, m, d, h);",
									"}else if (y >= 0 && m >= 0 && d > 0){",
									"v = new Date(y, m, d);",
									"}else if (y >= 0 && m >= 0){",
									"v = new Date(y, m);",
									"}else if (y >= 0){",
									"v = new Date(y);",
									"}",
									"}",
									"return (v && (z != null || o != null))? (Ext.type(z) == 'number' ? v.add(Date.SECOND, -v.getTimezoneOffset() * 60 - z) : v.add(Date.MINUTE, -v.getTimezoneOffset() + (sn == '+'? -1 : 1) * (hr * 60 + mn))) : v;",
									"}"].join("\n");
							return function(format) {
								var funcName = "parse"
										+ Date.parseFunctions.count++, regexNum = Date.parseRegexes.length, currentGroup = 1, calc = "", regex = "", special = false, ch = "";
								Date.parseFunctions[format] = funcName;
								for (var i = 0;i < format.length; ++i) {
									ch = format.charAt(i);
									if (!special && ch == "\\") {
										special = true
									} else {
										if (special) {
											special = false;
											regex += String.escape(ch)
										} else {
											var obj = $f(ch, currentGroup);
											currentGroup += obj.g;
											regex += obj.s;
											if (obj.g && obj.c) {
												calc += obj.c
											}
										}
									}
								}
								Date.parseRegexes[regexNum] = new RegExp("^"
										+ regex + "$", "i");
								eval(xf(code, funcName, regexNum, calc))
							}
						}(),
						parseCodes : {
							d : {
								g : 1,
								c : "d = parseInt(results[{0}], 10);\n",
								s : "(\\d{2})"
							},
							j : {
								g : 1,
								c : "d = parseInt(results[{0}], 10);\n",
								s : "(\\d{1,2})"
							},
							D : function() {
								for (var a = [], i = 0;i < 7; a.push(Date
										.getShortDayName(i)), ++i) {
								}
								return {
									g : 0,
									c : null,
									s : "(?:" + a.join("|") + ")"
								}
							},
							l : function() {
								return {
									g : 0,
									c : null,
									s : "(?:" + Date.dayNames.join("|") + ")"
								}
							},
							N : {
								g : 0,
								c : null,
								s : "[1-7]"
							},
							S : {
								g : 0,
								c : null,
								s : "(?:st|nd|rd|th)"
							},
							w : {
								g : 0,
								c : null,
								s : "[0-6]"
							},
							z : {
								g : 0,
								c : null,
								s : "(?:\\d{1,3})"
							},
							W : {
								g : 0,
								c : null,
								s : "(?:\\d{2})"
							},
							F : function() {
								return {
									g : 1,
									c : "m = parseInt(Date.getMonthNumber(results[{0}]), 10);\n",
									s : "(" + Date.monthNames.join("|") + ")"
								}
							},
							M : function() {
								for (var a = [], i = 0;i < 12; a.push(Date
										.getShortMonthName(i)), ++i) {
								}
								return Ext.applyIf( {
									s : "(" + a.join("|") + ")"
								}, $f("F"))
							},
							m : {
								g : 1,
								c : "m = parseInt(results[{0}], 10) - 1;\n",
								s : "(\\d{2})"
							},
							n : {
								g : 1,
								c : "m = parseInt(results[{0}], 10) - 1;\n",
								s : "(\\d{1,2})"
							},
							t : {
								g : 0,
								c : null,
								s : "(?:\\d{2})"
							},
							L : {
								g : 0,
								c : null,
								s : "(?:1|0)"
							},
							o : function() {
								return $f("Y")
							},
							Y : {
								g : 1,
								c : "y = parseInt(results[{0}], 10);\n",
								s : "(\\d{4})"
							},
							y : {
								g : 1,
								c : "var ty = parseInt(results[{0}], 10);\ny = ty > Date.y2kYear ? 1900 + ty : 2000 + ty;\n",
								s : "(\\d{1,2})"
							},
							a : {
								g : 1,
								c : "if (results[{0}] == 'am') {\nif (h == 12) { h = 0; }\n} else { if (h < 12) { h += 12; }}",
								s : "(am|pm)"
							},
							A : {
								g : 1,
								c : "if (results[{0}] == 'AM') {\nif (h == 12) { h = 0; }\n} else { if (h < 12) { h += 12; }}",
								s : "(AM|PM)"
							},
							g : function() {
								return $f("G")
							},
							G : {
								g : 1,
								c : "h = parseInt(results[{0}], 10);\n",
								s : "(\\d{1,2})"
							},
							h : function() {
								return $f("H")
							},
							H : {
								g : 1,
								c : "h = parseInt(results[{0}], 10);\n",
								s : "(\\d{2})"
							},
							i : {
								g : 1,
								c : "i = parseInt(results[{0}], 10);\n",
								s : "(\\d{2})"
							},
							s : {
								g : 1,
								c : "s = parseInt(results[{0}], 10);\n",
								s : "(\\d{2})"
							},
							u : {
								g : 1,
								c : "ms = results[{0}]; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n",
								s : "(\\d+)"
							},
							O : {
								g : 1,
								c : [
										"o = results[{0}];",
										"var sn = o.substring(0,1);",
										"var hr = o.substring(1,3)*1 + Math.floor(o.substring(3,5) / 60);",
										"var mn = o.substring(3,5) % 60;",
										"o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + String.leftPad(hr, 2, '0') + String.leftPad(mn, 2, '0')) : null;\n"]
										.join("\n"),
								s : "([+-]\\d{4})"
							},
							P : {
								g : 1,
								c : [
										"o = results[{0}];",
										"var sn = o.substring(0,1);",
										"var hr = o.substring(1,3)*1 + Math.floor(o.substring(4,6) / 60);",
										"var mn = o.substring(4,6) % 60;",
										"o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + String.leftPad(hr, 2, '0') + String.leftPad(mn, 2, '0')) : null;\n"]
										.join("\n"),
								s : "([+-]\\d{2}:\\d{2})"
							},
							T : {
								g : 0,
								c : null,
								s : "[A-Z]{1,4}"
							},
							Z : {
								g : 1,
								c : "z = results[{0}] * 1;\nz = (-43200 <= z && z <= 50400)? z : null;\n",
								s : "([+-]?\\d{1,5})"
							},
							c : function() {
								var calc = [], arr = [
										$f("Y", 1),
										$f("m", 2),
										$f("d", 3),
										$f("h", 4),
										$f("i", 5),
										$f("s", 6),
										{
											c : "ms = (results[7] || '.0').substring(1); ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n"
										},
										{
											c : ["if(results[9] == 'Z'){",
													"z = 0;", "}else{",
													$f("P", 9).c, "}"]
													.join("\n")
										}];
								for (var i = 0, l = arr.length;i < l; ++i) {
									calc.push(arr[i].c)
								}
								return {
									g : 1,
									c : calc.join(""),
									s : arr[0].s
											+ "-"
											+ arr[1].s
											+ "-"
											+ arr[2].s
											+ "T"
											+ arr[3].s
											+ ":"
											+ arr[4].s
											+ ":"
											+ arr[5].s
											+ "((.|,)\\d+)?(Z|([+-]\\d{2}:\\d{2}))"
								}
							},
							U : {
								g : 1,
								c : "u = parseInt(results[{0}], 10);\n",
								s : "(-?\\d+)"
							}
						}
					})
}());
Ext.apply(Date.prototype, {
	dateFormat : function(b) {
		if (Date.formatFunctions[b] == null) {
			Date.createNewFormat(b)
		}
		var a = Date.formatFunctions[b];
		return this[a]()
	},
	getTimezone : function() {
		return this.toString().replace(
				/^.* (?:\((.*)\)|([A-Z]{1,4})(?:[\-+][0-9]{4})?(?: -?\d+)?)$/,
				"$1$2").replace(/[^A-Z]/g, "")
	},
	getGMTOffset : function(a) {
		return (this.getTimezoneOffset() > 0 ? "-" : "+")
				+ String.leftPad(Math.floor(Math.abs(this.getTimezoneOffset())
						/ 60), 2, "0")
				+ (a ? ":" : "")
				+ String.leftPad(Math.abs(this.getTimezoneOffset() % 60), 2,
						"0")
	},
	getDayOfYear : function() {
		var a = 0;
		Date.daysInMonth[1] = this.isLeapYear() ? 29 : 28;
		for (var b = 0;b < this.getMonth(); ++b) {
			a += Date.daysInMonth[b]
		}
		return a + this.getDate() - 1
	},
	getWeekOfYear : function() {
		var a = 86400000, b = 7 * a;
		return function() {
			var d = Date.UTC(this.getFullYear(), this.getMonth(), this
					.getDate()
					+ 3)
					/ a, c = Math.floor(d / 7), e = new Date(c * b)
					.getUTCFullYear();
			return c - Math.floor(Date.UTC(e, 0, 7) / b) + 1
		}
	}(),
	isLeapYear : function() {
		var a = this.getFullYear();
		return !!((a & 3) == 0 && (a % 100 || (a % 400 == 0 && a)))
	},
	getFirstDayOfMonth : function() {
		var a = (this.getDay() - (this.getDate() - 1)) % 7;
		return (a < 0) ? (a + 7) : a
	},
	getLastDayOfMonth : function() {
		var a = (this.getDay() + (Date.daysInMonth[this.getMonth()] - this
				.getDate()))
				% 7;
		return (a < 0) ? (a + 7) : a
	},
	getFirstDateOfMonth : function() {
		return new Date(this.getFullYear(), this.getMonth(), 1)
	},
	getLastDateOfMonth : function() {
		return new Date(this.getFullYear(), this.getMonth(), this
				.getDaysInMonth())
	},
	getDaysInMonth : function() {
		Date.daysInMonth[1] = this.isLeapYear() ? 29 : 28;
		return Date.daysInMonth[this.getMonth()]
	},
	getSuffix : function() {
		switch (this.getDate()) {
			case 1 :
			case 21 :
			case 31 :
				return "st";
			case 2 :
			case 22 :
				return "nd";
			case 3 :
			case 23 :
				return "rd";
			default :
				return "th"
		}
	},
	clone : function() {
		return new Date(this.getTime())
	},
	clearTime : function(a) {
		if (a) {
			return this.clone().clearTime()
		}
		this.setHours(0);
		this.setMinutes(0);
		this.setSeconds(0);
		this.setMilliseconds(0);
		return this
	},
	add : function(b, c) {
		var e = this.clone();
		if (!b || c === 0) {
			return e
		}
		switch (b.toLowerCase()) {
			case Date.MILLI :
				e.setMilliseconds(this.getMilliseconds() + c);
				break;
			case Date.SECOND :
				e.setSeconds(this.getSeconds() + c);
				break;
			case Date.MINUTE :
				e.setMinutes(this.getMinutes() + c);
				break;
			case Date.HOUR :
				e.setHours(this.getHours() + c);
				break;
			case Date.DAY :
				e.setDate(this.getDate() + c);
				break;
			case Date.MONTH :
				var a = this.getDate();
				if (a > 28) {
					a = Math.min(a, this.getFirstDateOfMonth().add("mo", c)
							.getLastDateOfMonth().getDate())
				}
				e.setDate(a);
				e.setMonth(this.getMonth() + c);
				break;
			case Date.YEAR :
				e.setFullYear(this.getFullYear() + c);
				break
		}
		return e
	},
	between : function(c, a) {
		var b = this.getTime();
		return c.getTime() <= b && b <= a.getTime()
	}
});
Date.prototype.format = Date.prototype.dateFormat;
if (Ext.isSafari) {
	Date.brokenSetMonth = Date.prototype.setMonth;
	Date.prototype.setMonth = function(a) {
		if (a <= -1) {
			var d = Math.ceil(-a);
			var c = Math.ceil(d / 12);
			var b = (d % 12) ? 12 - d % 12 : 0;
			this.setFullYear(this.getFullYear() - c);
			return Date.brokenSetMonth.call(this, b)
		} else {
			return Date.brokenSetMonth.apply(this, arguments)
		}
	}
}
Ext.util.DelayedTask = function(g, e, a) {
	var i = null, h, b;
	var c = function() {
		var d = new Date().getTime();
		if (d - b >= h) {
			clearInterval(i);
			i = null;
			g.apply(e, a || [])
		}
	};
	this.delay = function(k, m, l, d) {
		if (i && k != h) {
			this.cancel()
		}
		h = k;
		b = new Date().getTime();
		g = m || g;
		e = l || e;
		a = d || a;
		if (!i) {
			i = setInterval(c, h)
		}
	};
	this.cancel = function() {
		if (i) {
			clearInterval(i);
			i = null
		}
	}
};
Ext.util.TaskRunner = function(e) {
	e = e || 10;
	var g = [], a = [];
	var b = 0;
	var h = false;
	var d = function() {
		h = false;
		clearInterval(b);
		b = 0
	};
	var i = function() {
		if (!h) {
			h = true;
			b = setInterval(k, e)
		}
	};
	var c = function(l) {
		a.push(l);
		if (l.onStop) {
			l.onStop.apply(l.scope || l)
		}
	};
	var k = function() {
		if (a.length > 0) {
			for (var q = 0, m = a.length;q < m; q++) {
				g.remove(a[q])
			}
			a = [];
			if (g.length < 1) {
				d();
				return
			}
		}
		var o = new Date().getTime();
		for (var q = 0, m = g.length;q < m; ++q) {
			var p = g[q];
			var l = o - p.taskRunTime;
			if (p.interval <= l) {
				var n = p.run.apply(p.scope || p, p.args || [++p.taskRunCount]);
				p.taskRunTime = o;
				if (n === false || p.taskRunCount === p.repeat) {
					c(p);
					return
				}
			}
			if (p.duration && p.duration <= (o - p.taskStartTime)) {
				c(p)
			}
		}
	};
	this.start = function(l) {
		g.push(l);
		l.taskStartTime = new Date().getTime();
		l.taskRunTime = 0;
		l.taskRunCount = 0;
		i();
		return l
	};
	this.stop = function(l) {
		c(l);
		return l
	};
	this.stopAll = function() {
		d();
		for (var m = 0, l = g.length;m < l; m++) {
			if (g[m].onStop) {
				g[m].onStop()
			}
		}
		g = [];
		a = []
	}
};
Ext.TaskMgr = new Ext.util.TaskRunner();
Ext.util.MixedCollection = function(b, a) {
	this.items = [];
	this.map = {};
	this.keys = [];
	this.length = 0;
	this.addEvents("clear", "add", "replace", "remove", "sort");
	this.allowFunctions = b === true;
	if (a) {
		this.getKey = a
	}
	Ext.util.MixedCollection.superclass.constructor.call(this)
};
Ext.extend(Ext.util.MixedCollection, Ext.util.Observable,
		{
			allowFunctions : false,
			add : function(b, c) {
				if (arguments.length == 1) {
					c = arguments[0];
					b = this.getKey(c)
				}
				if (typeof b == "undefined" || b === null) {
					this.length++;
					this.items.push(c);
					this.keys.push(null)
				} else {
					var a = this.map[b];
					if (a) {
						return this.replace(b, c)
					}
					this.length++;
					this.items.push(c);
					this.map[b] = c;
					this.keys.push(b)
				}
				this.fireEvent("add", this.length - 1, c, b);
				return c
			},
			getKey : function(a) {
				return a.id
			},
			replace : function(c, d) {
				if (arguments.length == 1) {
					d = arguments[0];
					c = this.getKey(d)
				}
				var a = this.item(c);
				if (typeof c == "undefined" || c === null
						|| typeof a == "undefined") {
					return this.add(c, d)
				}
				var b = this.indexOfKey(c);
				this.items[b] = d;
				this.map[c] = d;
				this.fireEvent("replace", c, a, d);
				return d
			},
			addAll : function(e) {
				if (arguments.length > 1 || Ext.isArray(e)) {
					var b = arguments.length > 1 ? arguments : e;
					for (var d = 0, a = b.length;d < a; d++) {
						this.add(b[d])
					}
				} else {
					for (var c in e) {
						if (this.allowFunctions || typeof e[c] != "function") {
							this.add(c, e[c])
						}
					}
				}
			},
			each : function(e, d) {
				var b = [].concat(this.items);
				for (var c = 0, a = b.length;c < a; c++) {
					if (e.call(d || b[c], b[c], c, a) === false) {
						break
					}
				}
			},
			eachKey : function(d, c) {
				for (var b = 0, a = this.keys.length;b < a; b++) {
					d.call(c || window, this.keys[b], this.items[b], b, a)
				}
			},
			find : function(d, c) {
				for (var b = 0, a = this.items.length;b < a; b++) {
					if (d.call(c || window, this.items[b], this.keys[b])) {
						return this.items[b]
					}
				}
				return null
			},
			insert : function(a, b, c) {
				if (arguments.length == 2) {
					c = arguments[1];
					b = this.getKey(c)
				}
				if (a >= this.length) {
					return this.add(b, c)
				}
				this.length++;
				this.items.splice(a, 0, c);
				if (typeof b != "undefined" && b != null) {
					this.map[b] = c
				}
				this.keys.splice(a, 0, b);
				this.fireEvent("add", a, c, b);
				return c
			},
			remove : function(a) {
				return this.removeAt(this.indexOf(a))
			},
			removeAt : function(a) {
				if (a < this.length && a >= 0) {
					this.length--;
					var c = this.items[a];
					this.items.splice(a, 1);
					var b = this.keys[a];
					if (typeof b != "undefined") {
						delete this.map[b]
					}
					this.keys.splice(a, 1);
					this.fireEvent("remove", c, b);
					return c
				}
				return false
			},
			removeKey : function(a) {
				return this.removeAt(this.indexOfKey(a))
			},
			getCount : function() {
				return this.length
			},
			indexOf : function(a) {
				return this.items.indexOf(a)
			},
			indexOfKey : function(a) {
				return this.keys.indexOf(a)
			},
			item : function(a) {
				var b = typeof this.map[a] != "undefined"
						? this.map[a]
						: this.items[a];
				return typeof b != "function" || this.allowFunctions ? b : null
			},
			itemAt : function(a) {
				return this.items[a]
			},
			key : function(a) {
				return this.map[a]
			},
			contains : function(a) {
				return this.indexOf(a) != -1
			},
			containsKey : function(a) {
				return typeof this.map[a] != "undefined"
			},
			clear : function() {
				this.length = 0;
				this.items = [];
				this.keys = [];
				this.map = {};
				this.fireEvent("clear")
			},
			first : function() {
				return this.items[0]
			},
			last : function() {
				return this.items[this.length - 1]
			},
			_sort : function(n, a, m) {
				var d = String(a).toUpperCase() == "DESC" ? -1 : 1;
				m = m || function(i, c) {
					return i - c
				};
				var l = [], b = this.keys, h = this.items;
				for (var e = 0, g = h.length;e < g; e++) {
					l[l.length] = {
						key : b[e],
						value : h[e],
						index : e
					}
				}
				l.sort(function(i, c) {
					var k = m(i[n], c[n]) * d;
					if (k == 0) {
						k = (i.index < c.index ? -1 : 1)
					}
					return k
				});
				for (var e = 0, g = l.length;e < g; e++) {
					h[e] = l[e].value;
					b[e] = l[e].key
				}
				this.fireEvent("sort", this)
			},
			sort : function(a, b) {
				this._sort("value", a, b)
			},
			keySort : function(a, b) {
				this._sort("key", a, b
						|| function(d, c) {
							var g = String(d).toUpperCase(), e = String(c)
									.toUpperCase();
							return g > e ? 1 : (g < e ? -1 : 0)
						})
			},
			getRange : function(e, a) {
				var b = this.items;
				if (b.length < 1) {
					return []
				}
				e = e || 0;
				a = Math.min(typeof a == "undefined" ? this.length - 1 : a,
						this.length - 1);
				var d = [];
				if (e <= a) {
					for (var c = e;c <= a; c++) {
						d[d.length] = b[c]
					}
				} else {
					for (var c = e;c >= a; c--) {
						d[d.length] = b[c]
					}
				}
				return d
			},
			filter : function(c, b, d, a) {
				if (Ext.isEmpty(b, false)) {
					return this.clone()
				}
				b = this.createValueMatcher(b, d, a);
				return this.filterBy(function(e) {
					return e && b.test(e[c])
				})
			},
			filterBy : function(g, e) {
				var h = new Ext.util.MixedCollection();
				h.getKey = this.getKey;
				var b = this.keys, d = this.items;
				for (var c = 0, a = d.length;c < a; c++) {
					if (g.call(e || this, d[c], b[c])) {
						h.add(b[c], d[c])
					}
				}
				return h
			},
			findIndex : function(c, b, e, d, a) {
				if (Ext.isEmpty(b, false)) {
					return -1
				}
				b = this.createValueMatcher(b, d, a);
				return this.findIndexBy(function(g) {
					return g && b.test(g[c])
				}, null, e)
			},
			findIndexBy : function(g, e, h) {
				var b = this.keys, d = this.items;
				for (var c = (h || 0), a = d.length;c < a; c++) {
					if (g.call(e || this, d[c], b[c])) {
						return c
					}
				}
				if (typeof h == "number" && h > 0) {
					for (var c = 0;c < h; c++) {
						if (g.call(e || this, d[c], b[c])) {
							return c
						}
					}
				}
				return -1
			},
			createValueMatcher : function(b, c, a) {
				if (!b.exec) {
					b = String(b);
					b = new RegExp((c === true ? "" : "^") + Ext.escapeRe(b), a
							? ""
							: "i")
				}
				return b
			},
			clone : function() {
				var e = new Ext.util.MixedCollection();
				var b = this.keys, d = this.items;
				for (var c = 0, a = d.length;c < a; c++) {
					e.add(b[c], d[c])
				}
				e.getKey = this.getKey;
				return e
			}
		});
Ext.util.MixedCollection.prototype.get = Ext.util.MixedCollection.prototype.item;
Ext.util.JSON = new (function() {
	var useHasOwn = !! {}.hasOwnProperty;
	var pad = function(n) {
		return n < 10 ? "0" + n : n
	};
	var m = {
		"\b" : "\\b",
		"\t" : "\\t",
		"\n" : "\\n",
		"\f" : "\\f",
		"\r" : "\\r",
		'"' : '\\"',
		"\\" : "\\\\"
	};
	var encodeString = function(s) {
		if (/["\\\x00-\x1f]/.test(s)) {
			return '"'
					+ s.replace(/([\x00-\x1f\\"])/g, function(a, b) {
						var c = m[b];
						if (c) {
							return c
						}
						c = b.charCodeAt();
						return "\\u00" + Math.floor(c / 16).toString(16)
								+ (c % 16).toString(16)
					}) + '"'
		}
		return '"' + s + '"'
	};
	var encodeArray = function(o) {
		var a = ["["], b, i, l = o.length, v;
		for (i = 0;i < l; i += 1) {
			v = o[i];
			switch (typeof v) {
				case "undefined" :
				case "function" :
				case "unknown" :
					break;
				default :
					if (b) {
						a.push(",")
					}
					a.push(v === null ? "null" : Ext.util.JSON.encode(v));
					b = true
			}
		}
		a.push("]");
		return a.join("")
	};
	this.encodeDate = function(o) {
		return '"' + o.getFullYear() + "-" + pad(o.getMonth() + 1) + "-"
				+ pad(o.getDate()) + "T" + pad(o.getHours()) + ":"
				+ pad(o.getMinutes()) + ":" + pad(o.getSeconds()) + '"'
	};
	this.encode = function(o) {
		if (typeof o == "undefined" || o === null) {
			return "null"
		} else {
			if (Ext.isArray(o)) {
				return encodeArray(o)
			} else {
				if (Ext.isDate(o)) {
					return Ext.util.JSON.encodeDate(o)
				} else {
					if (typeof o == "string") {
						return encodeString(o)
					} else {
						if (typeof o == "number") {
							return isFinite(o) ? String(o) : "null"
						} else {
							if (typeof o == "boolean") {
								return String(o)
							} else {
								var a = ["{"], b, i, v;
								for (i in o) {
									if (!useHasOwn || o.hasOwnProperty(i)) {
										v = o[i];
										switch (typeof v) {
											case "undefined" :
											case "function" :
											case "unknown" :
												break;
											default :
												if (b) {
													a.push(",")
												}
												a
														.push(
																this.encode(i),
																":",
																v === null
																		? "null"
																		: this
																				.encode(v));
												b = true
										}
									}
								}
								a.push("}");
								return a.join("")
							}
						}
					}
				}
			}
		}
	};
	this.decode = function(json) {
		return eval("(" + json + ")")
	}
})();
Ext.encode = Ext.util.JSON.encode;
Ext.decode = Ext.util.JSON.decode;
Ext.util.Format = function() {
	var trimRe = /^\s+|\s+$/g;
	return {
		ellipsis : function(value, len) {
			if (value && value.length > len) {
				return value.substr(0, len - 3) + "..."
			}
			return value
		},
		undef : function(value) {
			return value !== undefined ? value : ""
		},
		defaultValue : function(value, defaultValue) {
			return value !== undefined && value !== "" ? value : defaultValue
		},
		htmlEncode : function(value) {
			return !value ? value : String(value).replace(/&/g, "&amp;")
					.replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g,
							"&quot;")
		},
		htmlDecode : function(value) {
			return !value ? value : String(value).replace(/&gt;/g, ">")
					.replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(
							/&amp;/g, "&")
		},
		trim : function(value) {
			return String(value).replace(trimRe, "")
		},
		substr : function(value, start, length) {
			return String(value).substr(start, length)
		},
		lowercase : function(value) {
			return String(value).toLowerCase()
		},
		uppercase : function(value) {
			return String(value).toUpperCase()
		},
		capitalize : function(value) {
			return !value ? value : value.charAt(0).toUpperCase()
					+ value.substr(1).toLowerCase()
		},
		call : function(value, fn) {
			if (arguments.length > 2) {
				var args = Array.prototype.slice.call(arguments, 2);
				args.unshift(value);
				return eval(fn).apply(window, args)
			} else {
				return eval(fn).call(window, value)
			}
		},
		usMoney : function(v) {
			v = (Math.round((v - 0) * 100)) / 100;
			v = (v == Math.floor(v)) ? v + ".00" : ((v * 10 == Math.floor(v
					* 10)) ? v + "0" : v);
			v = String(v);
			var ps = v.split(".");
			var whole = ps[0];
			var sub = ps[1] ? "." + ps[1] : ".00";
			var r = /(\d+)(\d{3})/;
			while (r.test(whole)) {
				whole = whole.replace(r, "$1,$2")
			}
			v = whole + sub;
			if (v.charAt(0) == "-") {
				return "-$" + v.substr(1)
			}
			return "$" + v
		},
		date : function(v, format) {
			if (!v) {
				return ""
			}
			if (!Ext.isDate(v)) {
				v = new Date(Date.parse(v))
			}
			return v.dateFormat(format || "m/d/Y")
		},
		dateRenderer : function(format) {
			return function(v) {
				return Ext.util.Format.date(v, format)
			}
		},
		stripTagsRE : /<\/?[^>]+>/gi,
		stripTags : function(v) {
			return !v ? v : String(v).replace(this.stripTagsRE, "")
		},
		stripScriptsRe : /(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig,
		stripScripts : function(v) {
			return !v ? v : String(v).replace(this.stripScriptsRe, "")
		},
		fileSize : function(size) {
			if (size < 1024) {
				return size + " bytes"
			} else {
				if (size < 1048576) {
					return (Math.round(((size * 10) / 1024)) / 10) + " KB"
				} else {
					return (Math.round(((size * 10) / 1048576)) / 10) + " MB"
				}
			}
		},
		math : function() {
			var fns = {};
			return function(v, a) {
				if (!fns[a]) {
					fns[a] = new Function("v", "return v " + a + ";")
				}
				return fns[a](v)
			}
		}(),
		nl2br : function(v) {
			return v === undefined || v === null ? "" : v.replace(/\n/g,
					"<br/>")
		}
	}
}();
Ext.XTemplate = function() {
	Ext.XTemplate.superclass.constructor.apply(this, arguments);
	var u = this.html;
	u = ["<tpl>", u, "</tpl>"].join("");
	var t = /<tpl\b[^>]*>((?:(?=([^<]+))\2|<(?!tpl\b[^>]*>))*?)<\/tpl>/;
	var r = /^<tpl\b[^>]*?for="(.*?)"/;
	var p = /^<tpl\b[^>]*?if="(.*?)"/;
	var n = /^<tpl\b[^>]*?exec="(.*?)"/;
	var c, b = 0;
	var h = [];
	while (c = u.match(t)) {
		var q = c[0].match(r);
		var o = c[0].match(p);
		var l = c[0].match(n);
		var e = null, k = null, d = null;
		var a = q && q[1] ? q[1] : "";
		if (o) {
			e = o && o[1] ? o[1] : null;
			if (e) {
				k = new Function("values", "parent", "xindex", "xcount",
						"with(values){ return "
								+ (Ext.util.Format.htmlDecode(e)) + "; }")
			}
		}
		if (l) {
			e = l && l[1] ? l[1] : null;
			if (e) {
				d = new Function("values", "parent", "xindex", "xcount",
						"with(values){ " + (Ext.util.Format.htmlDecode(e))
								+ "; }")
			}
		}
		if (a) {
			switch (a) {
				case "." :
					a = new Function("values", "parent",
							"with(values){ return values; }");
					break;
				case ".." :
					a = new Function("values", "parent",
							"with(values){ return parent; }");
					break;
				default :
					a = new Function("values", "parent",
							"with(values){ return " + a + "; }")
			}
		}
		h.push( {
			id : b,
			target : a,
			exec : d,
			test : k,
			body : c[1] || ""
		});
		u = u.replace(c[0], "{xtpl" + b + "}");
		++b
	}
	for (var g = h.length - 1;g >= 0; --g) {
		this.compileTpl(h[g])
	}
	this.master = h[h.length - 1];
	this.tpls = h
};
Ext
		.extend(
				Ext.XTemplate,
				Ext.Template,
				{
					re : /\{([\w-\.\#]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?(\s?[\+\-\*\\]\s?[\d\.\+\-\*\\\(\)]+)?\}/g,
					codeRe : /\{\[((?:\\\]|.|\n)*?)\]\}/g,
					applySubTemplate : function(a, k, h, d, c) {
						var m = this.tpls[a];
						if (m.test && !m.test.call(this, k, h, d, c)) {
							return ""
						}
						if (m.exec && m.exec.call(this, k, h, d, c)) {
							return ""
						}
						var l = m.target ? m.target.call(this, k, h) : k;
						h = m.target ? k : h;
						if (m.target && Ext.isArray(l)) {
							var b = [];
							for (var e = 0, g = l.length;e < g; e++) {
								b[b.length] = m.compiled.call(this, l[e], h, e
										+ 1, g)
							}
							return b.join("")
						}
						return m.compiled.call(this, l, h, d, c)
					},
					compileTpl : function(tpl) {
						var fm = Ext.util.Format;
						var useF = this.disableFormats !== true;
						var sep = Ext.isGecko ? "+" : ",";
						var fn = function(m, name, format, args, math) {
							if (name.substr(0, 4) == "xtpl") {
								return "'" + sep + "this.applySubTemplate("
										+ name.substr(4)
										+ ", values, parent, xindex, xcount)"
										+ sep + "'"
							}
							var v;
							if (name === ".") {
								v = "values"
							} else {
								if (name === "#") {
									v = "xindex"
								} else {
									if (name.indexOf(".") != -1) {
										v = name
									} else {
										v = "values['" + name + "']"
									}
								}
							}
							if (math) {
								v = "(" + v + math + ")"
							}
							if (format && useF) {
								args = args ? "," + args : "";
								if (format.substr(0, 5) != "this.") {
									format = "fm." + format + "("
								} else {
									format = 'this.call("' + format.substr(5)
											+ '", ';
									args = ", values"
								}
							} else {
								args = "";
								format = "(" + v + " === undefined ? '' : "
							}
							return "'" + sep + format + v + args + ")" + sep
									+ "'"
						};
						var codeFn = function(m, code) {
							return "'" + sep + "(" + code + ")" + sep + "'"
						};
						var body;
						if (Ext.isGecko) {
							body = "tpl.compiled = function(values, parent, xindex, xcount){ return '"
									+ tpl.body.replace(/(\r\n|\n)/g, "\\n")
											.replace(/'/g, "\\'").replace(
													this.re, fn).replace(
													this.codeRe, codeFn)
									+ "';};"
						} else {
							body = ["tpl.compiled = function(values, parent, xindex, xcount){ return ['"];
							body.push(tpl.body.replace(/(\r\n|\n)/g, "\\n")
									.replace(/'/g, "\\'").replace(this.re, fn)
									.replace(this.codeRe, codeFn));
							body.push("'].join('');};");
							body = body.join("")
						}
						eval(body);
						return this
					},
					applyTemplate : function(a) {
						return this.master.compiled.call(this, a, {}, 1, 1)
					},
					compile : function() {
						return this
					}
				});
Ext.XTemplate.prototype.apply = Ext.XTemplate.prototype.applyTemplate;
Ext.XTemplate.from = function(a) {
	a = Ext.getDom(a);
	return new Ext.XTemplate(a.value || a.innerHTML)
};
Ext.util.CSS = function() {
	var d = null;
	var c = document;
	var b = /(-[a-z])/gi;
	var a = function(e, g) {
		return g.charAt(1).toUpperCase()
	};
	return {
		createStyleSheet : function(i, m) {
			var h;
			var g = c.getElementsByTagName("head")[0];
			var l = c.createElement("style");
			l.setAttribute("type", "text/css");
			if (m) {
				l.setAttribute("id", m)
			}
			if (Ext.isIE) {
				g.appendChild(l);
				h = l.styleSheet;
				h.cssText = i
			} else {
				try {
					l.appendChild(c.createTextNode(i))
				} catch (k) {
					l.cssText = i
				}
				g.appendChild(l);
				h = l.styleSheet
						? l.styleSheet
						: (l.sheet || c.styleSheets[c.styleSheets.length - 1])
			}
			this.cacheStyleSheet(h);
			return h
		},
		removeStyleSheet : function(g) {
			var e = c.getElementById(g);
			if (e) {
				e.parentNode.removeChild(e)
			}
		},
		swapStyleSheet : function(h, e) {
			this.removeStyleSheet(h);
			var g = c.createElement("link");
			g.setAttribute("rel", "stylesheet");
			g.setAttribute("type", "text/css");
			g.setAttribute("id", h);
			g.setAttribute("href", e);
			c.getElementsByTagName("head")[0].appendChild(g)
		},
		refreshCache : function() {
			return this.getRules(true)
		},
		cacheStyleSheet : function(h) {
			if (!d) {
				d = {}
			}
			try {
				var k = h.cssRules || h.rules;
				for (var g = k.length - 1;g >= 0; --g) {
					d[k[g].selectorText] = k[g]
				}
			} catch (i) {
			}
		},
		getRules : function(h) {
			if (d == null || h) {
				d = {};
				var l = c.styleSheets;
				for (var k = 0, g = l.length;k < g; k++) {
					try {
						this.cacheStyleSheet(l[k])
					} catch (m) {
					}
				}
			}
			return d
		},
		getRule : function(e, h) {
			var g = this.getRules(h);
			if (!Ext.isArray(e)) {
				return g[e]
			}
			for (var k = 0;k < e.length; k++) {
				if (g[e[k]]) {
					return g[e[k]]
				}
			}
			return null
		},
		updateRule : function(e, k, h) {
			if (!Ext.isArray(e)) {
				var l = this.getRule(e);
				if (l) {
					l.style[k.replace(b, a)] = h;
					return true
				}
			} else {
				for (var g = 0;g < e.length; g++) {
					if (this.updateRule(e[g], k, h)) {
						return true
					}
				}
			}
			return false
		}
	}
}();
Ext.util.ClickRepeater = function(b, a) {
	this.el = Ext.get(b);
	this.el.unselectable();
	Ext.apply(this, a);
	this.addEvents("mousedown", "click", "mouseup");
	this.el.on("mousedown", this.handleMouseDown, this);
	if (this.preventDefault || this.stopDefault) {
		this.el.on("click", function(c) {
			if (this.preventDefault) {
				c.preventDefault()
			}
			if (this.stopDefault) {
				c.stopEvent()
			}
		}, this)
	}
	if (this.handler) {
		this.on("click", this.handler, this.scope || this)
	}
	Ext.util.ClickRepeater.superclass.constructor.call(this)
};
Ext.extend(Ext.util.ClickRepeater, Ext.util.Observable, {
	interval : 20,
	delay : 250,
	preventDefault : true,
	stopDefault : false,
	timer : 0,
	destroy : function() {
		Ext.destroy(this.el);
		this.purgeListeners()
	},
	handleMouseDown : function() {
		clearTimeout(this.timer);
		this.el.blur();
		if (this.pressClass) {
			this.el.addClass(this.pressClass)
		}
		this.mousedownTime = new Date();
		Ext.getDoc().on("mouseup", this.handleMouseUp, this);
		this.el.on("mouseout", this.handleMouseOut, this);
		this.fireEvent("mousedown", this);
		this.fireEvent("click", this);
		if (this.accelerate) {
			this.delay = 400
		}
		this.timer = this.click.defer(this.delay || this.interval, this)
	},
	click : function() {
		this.fireEvent("click", this);
		this.timer = this.click.defer(this.accelerate
				? this.easeOutExpo(this.mousedownTime.getElapsed(), 400, -390,
						12000)
				: this.interval, this)
	},
	easeOutExpo : function(e, a, h, g) {
		return (e == g) ? a + h : h * (-Math.pow(2, -10 * e / g) + 1) + a
	},
	handleMouseOut : function() {
		clearTimeout(this.timer);
		if (this.pressClass) {
			this.el.removeClass(this.pressClass)
		}
		this.el.on("mouseover", this.handleMouseReturn, this)
	},
	handleMouseReturn : function() {
		this.el.un("mouseover", this.handleMouseReturn, this);
		if (this.pressClass) {
			this.el.addClass(this.pressClass)
		}
		this.click()
	},
	handleMouseUp : function() {
		clearTimeout(this.timer);
		this.el.un("mouseover", this.handleMouseReturn, this);
		this.el.un("mouseout", this.handleMouseOut, this);
		Ext.getDoc().un("mouseup", this.handleMouseUp, this);
		this.el.removeClass(this.pressClass);
		this.fireEvent("mouseup", this)
	}
});
Ext.KeyNav = function(b, a) {
	this.el = Ext.get(b);
	Ext.apply(this, a);
	if (!this.disabled) {
		this.disabled = true;
		this.enable()
	}
};
Ext.KeyNav.prototype = {
	disabled : false,
	defaultEventAction : "stopEvent",
	forceKeyDown : false,
	prepareEvent : function(c) {
		var a = c.getKey();
		var b = this.keyToHandler[a];
		if (Ext.isSafari2 && b && a >= 37 && a <= 40) {
			c.stopEvent()
		}
	},
	relay : function(c) {
		var a = c.getKey();
		var b = this.keyToHandler[a];
		if (b && this[b]) {
			if (this.doRelay(c, this[b], b) !== true) {
				c[this.defaultEventAction]()
			}
		}
	},
	doRelay : function(c, b, a) {
		return b.call(this.scope || this, c)
	},
	enter : false,
	left : false,
	right : false,
	up : false,
	down : false,
	tab : false,
	esc : false,
	pageUp : false,
	pageDown : false,
	del : false,
	home : false,
	end : false,
	keyToHandler : {
		37 : "left",
		39 : "right",
		38 : "up",
		40 : "down",
		33 : "pageUp",
		34 : "pageDown",
		46 : "del",
		36 : "home",
		35 : "end",
		13 : "enter",
		27 : "esc",
		9 : "tab"
	},
	enable : function() {
		if (this.disabled) {
			if (this.forceKeyDown || Ext.isIE || Ext.isSafari3 || Ext.isAir) {
				this.el.on("keydown", this.relay, this)
			} else {
				this.el.on("keydown", this.prepareEvent, this);
				this.el.on("keypress", this.relay, this)
			}
			this.disabled = false
		}
	},
	disable : function() {
		if (!this.disabled) {
			if (this.forceKeyDown || Ext.isIE || Ext.isSafari3 || Ext.isAir) {
				this.el.un("keydown", this.relay, this)
			} else {
				this.el.un("keydown", this.prepareEvent, this);
				this.el.un("keypress", this.relay, this)
			}
			this.disabled = true
		}
	}
};
Ext.KeyMap = function(c, b, a) {
	this.el = Ext.get(c);
	this.eventName = a || "keydown";
	this.bindings = [];
	if (b) {
		this.addBinding(b)
	}
	this.enable()
};
Ext.KeyMap.prototype = {
	stopEvent : false,
	addBinding : function(d) {
		if (Ext.isArray(d)) {
			for (var g = 0, k = d.length;g < k; g++) {
				this.addBinding(d[g])
			}
			return
		}
		var q = d.key, c = d.shift, a = d.ctrl, h = d.alt, m = d.fn
				|| d.handler, p = d.scope;
		if (d.stopEvent) {
			this.stopEvent = d.stopEvent
		}
		if (typeof q == "string") {
			var n = [];
			var l = q.toUpperCase();
			for (var e = 0, k = l.length;e < k; e++) {
				n.push(l.charCodeAt(e))
			}
			q = n
		}
		var b = Ext.isArray(q);
		var o = function(u) {
			if ((!c || u.shiftKey) && (!a || u.ctrlKey) && (!h || u.altKey)) {
				var s = u.getKey();
				if (b) {
					for (var t = 0, r = q.length;t < r; t++) {
						if (q[t] == s) {
							if (this.stopEvent) {
								u.stopEvent()
							}
							m.call(p || window, s, u);
							return
						}
					}
				} else {
					if (s == q) {
						if (this.stopEvent) {
							u.stopEvent()
						}
						m.call(p || window, s, u)
					}
				}
			}
		};
		this.bindings.push(o)
	},
	on : function(b, d, c) {
		var h, a, e, g;
		if (typeof b == "object" && !Ext.isArray(b)) {
			h = b.key;
			a = b.shift;
			e = b.ctrl;
			g = b.alt
		} else {
			h = b
		}
		this.addBinding( {
			key : h,
			shift : a,
			ctrl : e,
			alt : g,
			fn : d,
			scope : c
		})
	},
	handleKeyDown : function(g) {
		if (this.enabled) {
			var c = this.bindings;
			for (var d = 0, a = c.length;d < a; d++) {
				c[d].call(this, g)
			}
		}
	},
	isEnabled : function() {
		return this.enabled
	},
	enable : function() {
		if (!this.enabled) {
			this.el.on(this.eventName, this.handleKeyDown, this);
			this.enabled = true
		}
	},
	disable : function() {
		if (this.enabled) {
			this.el.removeListener(this.eventName, this.handleKeyDown, this);
			this.enabled = false
		}
	}
};
Ext.util.TextMetrics = function() {
	var a;
	return {
		measure : function(b, c, d) {
			if (!a) {
				a = Ext.util.TextMetrics.Instance(b, d)
			}
			a.bind(b);
			a.setFixedWidth(d || "auto");
			return a.getSize(c)
		},
		createInstance : function(b, c) {
			return Ext.util.TextMetrics.Instance(b, c)
		}
	}
}();
Ext.util.TextMetrics.Instance = function(b, d) {
	var c = new Ext.Element(document.createElement("div"));
	document.body.appendChild(c.dom);
	c.position("absolute");
	c.setLeftTop(-1000, -1000);
	c.hide();
	if (d) {
		c.setWidth(d)
	}
	var a = {
		getSize : function(g) {
			c.update(g);
			var e = c.getSize();
			c.update("");
			return e
		},
		bind : function(e) {
			c.setStyle(Ext.fly(e).getStyles("font-size", "font-style",
					"font-weight", "font-family", "line-height",
					"text-transform", "letter-spacing"))
		},
		setFixedWidth : function(e) {
			c.setWidth(e)
		},
		getWidth : function(e) {
			c.dom.style.width = "auto";
			return this.getSize(e).width
		},
		getHeight : function(e) {
			return this.getSize(e).height
		}
	};
	a.bind(b);
	return a
};
Ext.Element.measureText = Ext.util.TextMetrics.measure;
(function() {
	var a = Ext.EventManager;
	var b = Ext.lib.Dom;
	Ext.dd.DragDrop = function(e, c, d) {
		if (e) {
			this.init(e, c, d)
		}
	};
	Ext.dd.DragDrop.prototype = {
		id : null,
		config : null,
		dragElId : null,
		handleElId : null,
		invalidHandleTypes : null,
		invalidHandleIds : null,
		invalidHandleClasses : null,
		startPageX : 0,
		startPageY : 0,
		groups : null,
		locked : false,
		lock : function() {
			this.locked = true
		},
		moveOnly : false,
		unlock : function() {
			this.locked = false
		},
		isTarget : true,
		padding : null,
		_domRef : null,
		__ygDragDrop : true,
		constrainX : false,
		constrainY : false,
		minX : 0,
		maxX : 0,
		minY : 0,
		maxY : 0,
		maintainOffset : false,
		xTicks : null,
		yTicks : null,
		primaryButtonOnly : true,
		available : false,
		hasOuterHandles : false,
		b4StartDrag : function(c, d) {
		},
		startDrag : function(c, d) {
		},
		b4Drag : function(c) {
		},
		onDrag : function(c) {
		},
		onDragEnter : function(c, d) {
		},
		b4DragOver : function(c) {
		},
		onDragOver : function(c, d) {
		},
		b4DragOut : function(c) {
		},
		onDragOut : function(c, d) {
		},
		b4DragDrop : function(c) {
		},
		onDragDrop : function(c, d) {
		},
		onInvalidDrop : function(c) {
		},
		b4EndDrag : function(c) {
		},
		endDrag : function(c) {
		},
		b4MouseDown : function(c) {
		},
		onMouseDown : function(c) {
		},
		onMouseUp : function(c) {
		},
		onAvailable : function() {
		},
		defaultPadding : {
			left : 0,
			right : 0,
			top : 0,
			bottom : 0
		},
		constrainTo : function(k, h, p) {
			if (typeof h == "number") {
				h = {
					left : h,
					right : h,
					top : h,
					bottom : h
				}
			}
			h = h || this.defaultPadding;
			var m = Ext.get(this.getEl()).getBox();
			var d = Ext.get(k);
			var o = d.getScroll();
			var l, e = d.dom;
			if (e == document.body) {
				l = {
					x : o.left,
					y : o.top,
					width : Ext.lib.Dom.getViewWidth(),
					height : Ext.lib.Dom.getViewHeight()
				}
			} else {
				var n = d.getXY();
				l = {
					x : n[0] + o.left,
					y : n[1] + o.top,
					width : e.clientWidth,
					height : e.clientHeight
				}
			}
			var i = m.y - l.y;
			var g = m.x - l.x;
			this.resetConstraints();
			this.setXConstraint(g - (h.left || 0), l.width - g - m.width
					- (h.right || 0), this.xTickSize);
			this.setYConstraint(i - (h.top || 0), l.height - i - m.height
					- (h.bottom || 0), this.yTickSize)
		},
		getEl : function() {
			if (!this._domRef) {
				this._domRef = Ext.getDom(this.id)
			}
			return this._domRef
		},
		getDragEl : function() {
			return Ext.getDom(this.dragElId)
		},
		init : function(e, c, d) {
			this.initTarget(e, c, d);
			a.on(this.id, "mousedown", this.handleMouseDown, this)
		},
		initTarget : function(e, c, d) {
			this.config = d || {};
			this.DDM = Ext.dd.DDM;
			this.groups = {};
			if (typeof e !== "string") {
				e = Ext.id(e)
			}
			this.id = e;
			this.addToGroup((c) ? c : "default");
			this.handleElId = e;
			this.setDragElId(e);
			this.invalidHandleTypes = {
				A : "A"
			};
			this.invalidHandleIds = {};
			this.invalidHandleClasses = [];
			this.applyConfig();
			this.handleOnAvailable()
		},
		applyConfig : function() {
			this.padding = this.config.padding || [0, 0, 0, 0];
			this.isTarget = (this.config.isTarget !== false);
			this.maintainOffset = (this.config.maintainOffset);
			this.primaryButtonOnly = (this.config.primaryButtonOnly !== false)
		},
		handleOnAvailable : function() {
			this.available = true;
			this.resetConstraints();
			this.onAvailable()
		},
		setPadding : function(e, c, g, d) {
			if (!c && 0 !== c) {
				this.padding = [e, e, e, e]
			} else {
				if (!g && 0 !== g) {
					this.padding = [e, c, e, c]
				} else {
					this.padding = [e, c, g, d]
				}
			}
		},
		setInitPosition : function(g, e) {
			var h = this.getEl();
			if (!this.DDM.verifyEl(h)) {
				return
			}
			var d = g || 0;
			var c = e || 0;
			var i = b.getXY(h);
			this.initPageX = i[0] - d;
			this.initPageY = i[1] - c;
			this.lastPageX = i[0];
			this.lastPageY = i[1];
			this.setStartPosition(i)
		},
		setStartPosition : function(d) {
			var c = d || b.getXY(this.getEl());
			this.deltaSetXY = null;
			this.startPageX = c[0];
			this.startPageY = c[1]
		},
		addToGroup : function(c) {
			this.groups[c] = true;
			this.DDM.regDragDrop(this, c)
		},
		removeFromGroup : function(c) {
			if (this.groups[c]) {
				delete this.groups[c]
			}
			this.DDM.removeDDFromGroup(this, c)
		},
		setDragElId : function(c) {
			this.dragElId = c
		},
		setHandleElId : function(c) {
			if (typeof c !== "string") {
				c = Ext.id(c)
			}
			this.handleElId = c;
			this.DDM.regHandle(this.id, c)
		},
		setOuterHandleElId : function(c) {
			if (typeof c !== "string") {
				c = Ext.id(c)
			}
			a.on(c, "mousedown", this.handleMouseDown, this);
			this.setHandleElId(c);
			this.hasOuterHandles = true
		},
		unreg : function() {
			a.un(this.id, "mousedown", this.handleMouseDown);
			this._domRef = null;
			this.DDM._remove(this)
		},
		destroy : function() {
			this.unreg()
		},
		isLocked : function() {
			return (this.DDM.isLocked() || this.locked)
		},
		handleMouseDown : function(g, d) {
			if (this.primaryButtonOnly && g.button != 0) {
				return
			}
			if (this.isLocked()) {
				return
			}
			this.DDM.refreshCache(this.groups);
			var c = new Ext.lib.Point(Ext.lib.Event.getPageX(g), Ext.lib.Event
					.getPageY(g));
			if (!this.hasOuterHandles && !this.DDM.isOverTarget(c, this)) {
			} else {
				if (this.clickValidator(g)) {
					this.setStartPosition();
					this.b4MouseDown(g);
					this.onMouseDown(g);
					this.DDM.handleMouseDown(g, this);
					this.DDM.stopEvent(g)
				} else {
				}
			}
		},
		clickValidator : function(d) {
			var c = d.getTarget();
			return (this.isValidHandleChild(c) && (this.id == this.handleElId || this.DDM
					.handleWasClicked(c, this.id)))
		},
		addInvalidHandleType : function(c) {
			var d = c.toUpperCase();
			this.invalidHandleTypes[d] = d
		},
		addInvalidHandleId : function(c) {
			if (typeof c !== "string") {
				c = Ext.id(c)
			}
			this.invalidHandleIds[c] = c
		},
		addInvalidHandleClass : function(c) {
			this.invalidHandleClasses.push(c)
		},
		removeInvalidHandleType : function(c) {
			var d = c.toUpperCase();
			delete this.invalidHandleTypes[d]
		},
		removeInvalidHandleId : function(c) {
			if (typeof c !== "string") {
				c = Ext.id(c)
			}
			delete this.invalidHandleIds[c]
		},
		removeInvalidHandleClass : function(d) {
			for (var e = 0, c = this.invalidHandleClasses.length;e < c; ++e) {
				if (this.invalidHandleClasses[e] == d) {
					delete this.invalidHandleClasses[e]
				}
			}
		},
		isValidHandleChild : function(h) {
			var g = true;
			var l;
			try {
				l = h.nodeName.toUpperCase()
			} catch (k) {
				l = h.nodeName
			}
			g = g && !this.invalidHandleTypes[l];
			g = g && !this.invalidHandleIds[h.id];
			for (var d = 0, c = this.invalidHandleClasses.length;g && d < c; ++d) {
				g = !Ext.fly(h).hasClass(this.invalidHandleClasses[d])
			}
			return g
		},
		setXTicks : function(g, c) {
			this.xTicks = [];
			this.xTickSize = c;
			var e = {};
			for (var d = this.initPageX;d >= this.minX; d = d - c) {
				if (!e[d]) {
					this.xTicks[this.xTicks.length] = d;
					e[d] = true
				}
			}
			for (d = this.initPageX;d <= this.maxX; d = d + c) {
				if (!e[d]) {
					this.xTicks[this.xTicks.length] = d;
					e[d] = true
				}
			}
			this.xTicks.sort(this.DDM.numericSort)
		},
		setYTicks : function(g, c) {
			this.yTicks = [];
			this.yTickSize = c;
			var e = {};
			for (var d = this.initPageY;d >= this.minY; d = d - c) {
				if (!e[d]) {
					this.yTicks[this.yTicks.length] = d;
					e[d] = true
				}
			}
			for (d = this.initPageY;d <= this.maxY; d = d + c) {
				if (!e[d]) {
					this.yTicks[this.yTicks.length] = d;
					e[d] = true
				}
			}
			this.yTicks.sort(this.DDM.numericSort)
		},
		setXConstraint : function(e, d, c) {
			this.leftConstraint = e;
			this.rightConstraint = d;
			this.minX = this.initPageX - e;
			this.maxX = this.initPageX + d;
			if (c) {
				this.setXTicks(this.initPageX, c)
			}
			this.constrainX = true
		},
		clearConstraints : function() {
			this.constrainX = false;
			this.constrainY = false;
			this.clearTicks()
		},
		clearTicks : function() {
			this.xTicks = null;
			this.yTicks = null;
			this.xTickSize = 0;
			this.yTickSize = 0
		},
		setYConstraint : function(c, e, d) {
			this.topConstraint = c;
			this.bottomConstraint = e;
			this.minY = this.initPageY - c;
			this.maxY = this.initPageY + e;
			if (d) {
				this.setYTicks(this.initPageY, d)
			}
			this.constrainY = true
		},
		resetConstraints : function() {
			if (this.initPageX || this.initPageX === 0) {
				var d = (this.maintainOffset)
						? this.lastPageX - this.initPageX
						: 0;
				var c = (this.maintainOffset)
						? this.lastPageY - this.initPageY
						: 0;
				this.setInitPosition(d, c)
			} else {
				this.setInitPosition()
			}
			if (this.constrainX) {
				this.setXConstraint(this.leftConstraint, this.rightConstraint,
						this.xTickSize)
			}
			if (this.constrainY) {
				this.setYConstraint(this.topConstraint, this.bottomConstraint,
						this.yTickSize)
			}
		},
		getTick : function(l, g) {
			if (!g) {
				return l
			} else {
				if (g[0] >= l) {
					return g[0]
				} else {
					for (var d = 0, c = g.length;d < c; ++d) {
						var e = d + 1;
						if (g[e] && g[e] >= l) {
							var k = l - g[d];
							var h = g[e] - l;
							return (h > k) ? g[d] : g[e]
						}
					}
					return g[g.length - 1]
				}
			}
		},
		toString : function() {
			return ("DragDrop " + this.id)
		}
	}
})();
if (!Ext.dd.DragDropMgr) {
	Ext.dd.DragDropMgr = function() {
		var a = Ext.EventManager;
		return {
			ids : {},
			handleIds : {},
			dragCurrent : null,
			dragOvers : {},
			deltaX : 0,
			deltaY : 0,
			preventDefault : true,
			stopPropagation : true,
			initialized : false,
			locked : false,
			init : function() {
				this.initialized = true
			},
			POINT : 0,
			INTERSECT : 1,
			mode : 0,
			_execOnAll : function(d, c) {
				for (var e in this.ids) {
					for (var b in this.ids[e]) {
						var g = this.ids[e][b];
						if (!this.isTypeOfDD(g)) {
							continue
						}
						g[d].apply(g, c)
					}
				}
			},
			_onLoad : function() {
				this.init();
				a.on(document, "mouseup", this.handleMouseUp, this, true);
				a.on(document, "mousemove", this.handleMouseMove, this, true);
				a.on(window, "unload", this._onUnload, this, true);
				a.on(window, "resize", this._onResize, this, true)
			},
			_onResize : function(b) {
				this._execOnAll("resetConstraints", [])
			},
			lock : function() {
				this.locked = true
			},
			unlock : function() {
				this.locked = false
			},
			isLocked : function() {
				return this.locked
			},
			locationCache : {},
			useCache : true,
			clickPixelThresh : 3,
			clickTimeThresh : 350,
			dragThreshMet : false,
			clickTimeout : null,
			startX : 0,
			startY : 0,
			regDragDrop : function(c, b) {
				if (!this.initialized) {
					this.init()
				}
				if (!this.ids[b]) {
					this.ids[b] = {}
				}
				this.ids[b][c.id] = c
			},
			removeDDFromGroup : function(d, b) {
				if (!this.ids[b]) {
					this.ids[b] = {}
				}
				var c = this.ids[b];
				if (c && c[d.id]) {
					delete c[d.id]
				}
			},
			_remove : function(c) {
				for (var b in c.groups) {
					if (b && this.ids[b] && this.ids[b][c.id]) {
						delete this.ids[b][c.id]
					}
				}
				delete this.handleIds[c.id]
			},
			regHandle : function(c, b) {
				if (!this.handleIds[c]) {
					this.handleIds[c] = {}
				}
				this.handleIds[c][b] = b
			},
			isDragDrop : function(b) {
				return (this.getDDById(b)) ? true : false
			},
			getRelated : function(g, c) {
				var e = [];
				for (var d in g.groups) {
					for (j in this.ids[d]) {
						var b = this.ids[d][j];
						if (!this.isTypeOfDD(b)) {
							continue
						}
						if (!c || b.isTarget) {
							e[e.length] = b
						}
					}
				}
				return e
			},
			isLegalTarget : function(g, e) {
				var c = this.getRelated(g, true);
				for (var d = 0, b = c.length;d < b; ++d) {
					if (c[d].id == e.id) {
						return true
					}
				}
				return false
			},
			isTypeOfDD : function(b) {
				return (b && b.__ygDragDrop)
			},
			isHandle : function(c, b) {
				return (this.handleIds[c] && this.handleIds[c][b])
			},
			getDDById : function(c) {
				for (var b in this.ids) {
					if (this.ids[b][c]) {
						return this.ids[b][c]
					}
				}
				return null
			},
			handleMouseDown : function(d, c) {
				if (Ext.QuickTips) {
					Ext.QuickTips.disable()
				}
				if (this.dragCurrent) {
					this.handleMouseUp(d)
				}
				this.currentTarget = d.getTarget();
				this.dragCurrent = c;
				var b = c.getEl();
				this.startX = d.getPageX();
				this.startY = d.getPageY();
				this.deltaX = this.startX - b.offsetLeft;
				this.deltaY = this.startY - b.offsetTop;
				this.dragThreshMet = false;
				this.clickTimeout = setTimeout(function() {
					var e = Ext.dd.DDM;
					e.startDrag(e.startX, e.startY)
				}, this.clickTimeThresh)
			},
			startDrag : function(b, c) {
				clearTimeout(this.clickTimeout);
				if (this.dragCurrent) {
					this.dragCurrent.b4StartDrag(b, c);
					this.dragCurrent.startDrag(b, c)
				}
				this.dragThreshMet = true
			},
			handleMouseUp : function(b) {
				if (Ext.QuickTips) {
					Ext.QuickTips.enable()
				}
				if (!this.dragCurrent) {
					return
				}
				clearTimeout(this.clickTimeout);
				if (this.dragThreshMet) {
					this.fireEvents(b, true)
				} else {
				}
				this.stopDrag(b);
				this.stopEvent(b)
			},
			stopEvent : function(b) {
				if (this.stopPropagation) {
					b.stopPropagation()
				}
				if (this.preventDefault) {
					b.preventDefault()
				}
			},
			stopDrag : function(b) {
				if (this.dragCurrent) {
					if (this.dragThreshMet) {
						this.dragCurrent.b4EndDrag(b);
						this.dragCurrent.endDrag(b)
					}
					this.dragCurrent.onMouseUp(b)
				}
				this.dragCurrent = null;
				this.dragOvers = {}
			},
			handleMouseMove : function(d) {
				if (!this.dragCurrent) {
					return true
				}
				if (Ext.isIE
						&& (d.button !== 0 && d.button !== 1 && d.button !== 2)) {
					this.stopEvent(d);
					return this.handleMouseUp(d)
				}
				if (!this.dragThreshMet) {
					var c = Math.abs(this.startX - d.getPageX());
					var b = Math.abs(this.startY - d.getPageY());
					if (c > this.clickPixelThresh || b > this.clickPixelThresh) {
						this.startDrag(this.startX, this.startY)
					}
				}
				if (this.dragThreshMet) {
					this.dragCurrent.b4Drag(d);
					this.dragCurrent.onDrag(d);
					if (!this.dragCurrent.moveOnly) {
						this.fireEvents(d, false)
					}
				}
				this.stopEvent(d);
				return true
			},
			fireEvents : function(o, p) {
				var r = this.dragCurrent;
				if (!r || r.isLocked()) {
					return
				}
				var s = o.getPoint();
				var b = [];
				var g = [];
				var m = [];
				var k = [];
				var d = [];
				for (var h in this.dragOvers) {
					var c = this.dragOvers[h];
					if (!this.isTypeOfDD(c)) {
						continue
					}
					if (!this.isOverTarget(s, c, this.mode)) {
						g.push(c)
					}
					b[h] = true;
					delete this.dragOvers[h]
				}
				for (var q in r.groups) {
					if ("string" != typeof q) {
						continue
					}
					for (h in this.ids[q]) {
						var l = this.ids[q][h];
						if (!this.isTypeOfDD(l)) {
							continue
						}
						if (l.isTarget && !l.isLocked() && l != r) {
							if (this.isOverTarget(s, l, this.mode)) {
								if (p) {
									k.push(l)
								} else {
									if (!b[l.id]) {
										d.push(l)
									} else {
										m.push(l)
									}
									this.dragOvers[l.id] = l
								}
							}
						}
					}
				}
				if (this.mode) {
					if (g.length) {
						r.b4DragOut(o, g);
						r.onDragOut(o, g)
					}
					if (d.length) {
						r.onDragEnter(o, d)
					}
					if (m.length) {
						r.b4DragOver(o, m);
						r.onDragOver(o, m)
					}
					if (k.length) {
						r.b4DragDrop(o, k);
						r.onDragDrop(o, k)
					}
				} else {
					var n = 0;
					for (h = 0, n = g.length;h < n; ++h) {
						r.b4DragOut(o, g[h].id);
						r.onDragOut(o, g[h].id)
					}
					for (h = 0, n = d.length;h < n; ++h) {
						r.onDragEnter(o, d[h].id)
					}
					for (h = 0, n = m.length;h < n; ++h) {
						r.b4DragOver(o, m[h].id);
						r.onDragOver(o, m[h].id)
					}
					for (h = 0, n = k.length;h < n; ++h) {
						r.b4DragDrop(o, k[h].id);
						r.onDragDrop(o, k[h].id)
					}
				}
				if (p && !k.length) {
					r.onInvalidDrop(o)
				}
			},
			getBestMatch : function(d) {
				var g = null;
				var c = d.length;
				if (c == 1) {
					g = d[0]
				} else {
					for (var e = 0;e < c; ++e) {
						var b = d[e];
						if (b.cursorIsOver) {
							g = b;
							break
						} else {
							if (!g || g.overlap.getArea() < b.overlap.getArea()) {
								g = b
							}
						}
					}
				}
				return g
			},
			refreshCache : function(c) {
				for (var b in c) {
					if ("string" != typeof b) {
						continue
					}
					for (var d in this.ids[b]) {
						var e = this.ids[b][d];
						if (this.isTypeOfDD(e)) {
							var g = this.getLocation(e);
							if (g) {
								this.locationCache[e.id] = g
							} else {
								delete this.locationCache[e.id]
							}
						}
					}
				}
			},
			verifyEl : function(c) {
				if (c) {
					var b;
					if (Ext.isIE) {
						try {
							b = c.offsetParent
						} catch (d) {
						}
					} else {
						b = c.offsetParent
					}
					if (b) {
						return true
					}
				}
				return false
			},
			getLocation : function(k) {
				if (!this.isTypeOfDD(k)) {
					return null
				}
				var h = k.getEl(), o, g, d, q, p, s, c, n, i;
				try {
					o = Ext.lib.Dom.getXY(h)
				} catch (m) {
				}
				if (!o) {
					return null
				}
				g = o[0];
				d = g + h.offsetWidth;
				q = o[1];
				p = q + h.offsetHeight;
				s = q - k.padding[0];
				c = d + k.padding[1];
				n = p + k.padding[2];
				i = g - k.padding[3];
				return new Ext.lib.Region(s, c, n, i)
			},
			isOverTarget : function(l, b, d) {
				var g = this.locationCache[b.id];
				if (!g || !this.useCache) {
					g = this.getLocation(b);
					this.locationCache[b.id] = g
				}
				if (!g) {
					return false
				}
				b.cursorIsOver = g.contains(l);
				var k = this.dragCurrent;
				if (!k || !k.getTargetCoord
						|| (!d && !k.constrainX && !k.constrainY)) {
					return b.cursorIsOver
				}
				b.overlap = null;
				var h = k.getTargetCoord(l.x, l.y);
				var c = k.getDragEl();
				var e = new Ext.lib.Region(h.y, h.x + c.offsetWidth, h.y
						+ c.offsetHeight, h.x);
				var i = e.intersect(g);
				if (i) {
					b.overlap = i;
					return (d) ? true : b.cursorIsOver
				} else {
					return false
				}
			},
			_onUnload : function(c, b) {
				Ext.dd.DragDropMgr.unregAll()
			},
			unregAll : function() {
				if (this.dragCurrent) {
					this.stopDrag();
					this.dragCurrent = null
				}
				this._execOnAll("unreg", []);
				for (var b in this.elementCache) {
					delete this.elementCache[b]
				}
				this.elementCache = {};
				this.ids = {}
			},
			elementCache : {},
			getElWrapper : function(c) {
				var b = this.elementCache[c];
				if (!b || !b.el) {
					b = this.elementCache[c] = new this.ElementWrapper(Ext
							.getDom(c))
				}
				return b
			},
			getElement : function(b) {
				return Ext.getDom(b)
			},
			getCss : function(c) {
				var b = Ext.getDom(c);
				return (b) ? b.style : null
			},
			ElementWrapper : function(b) {
				this.el = b || null;
				this.id = this.el && b.id;
				this.css = this.el && b.style
			},
			getPosX : function(b) {
				return Ext.lib.Dom.getX(b)
			},
			getPosY : function(b) {
				return Ext.lib.Dom.getY(b)
			},
			swapNode : function(d, b) {
				if (d.swapNode) {
					d.swapNode(b)
				} else {
					var e = b.parentNode;
					var c = b.nextSibling;
					if (c == d) {
						e.insertBefore(d, b)
					} else {
						if (b == d.nextSibling) {
							e.insertBefore(b, d)
						} else {
							d.parentNode.replaceChild(b, d);
							e.insertBefore(d, c)
						}
					}
				}
			},
			getScroll : function() {
				var d, b, e = document.documentElement, c = document.body;
				if (e && (e.scrollTop || e.scrollLeft)) {
					d = e.scrollTop;
					b = e.scrollLeft
				} else {
					if (c) {
						d = c.scrollTop;
						b = c.scrollLeft
					} else {
					}
				}
				return {
					top : d,
					left : b
				}
			},
			getStyle : function(c, b) {
				return Ext.fly(c).getStyle(b)
			},
			getScrollTop : function() {
				return this.getScroll().top
			},
			getScrollLeft : function() {
				return this.getScroll().left
			},
			moveToEl : function(b, d) {
				var c = Ext.lib.Dom.getXY(d);
				Ext.lib.Dom.setXY(b, c)
			},
			numericSort : function(d, c) {
				return (d - c)
			},
			_timeoutCount : 0,
			_addListeners : function() {
				var b = Ext.dd.DDM;
				if (Ext.lib.Event && document) {
					b._onLoad()
				} else {
					if (b._timeoutCount > 2000) {
					} else {
						setTimeout(b._addListeners, 10);
						if (document && document.body) {
							b._timeoutCount += 1
						}
					}
				}
			},
			handleWasClicked : function(b, d) {
				if (this.isHandle(d, b.id)) {
					return true
				} else {
					var c = b.parentNode;
					while (c) {
						if (this.isHandle(d, c.id)) {
							return true
						} else {
							c = c.parentNode
						}
					}
				}
				return false
			}
		}
	}();
	Ext.dd.DDM = Ext.dd.DragDropMgr;
	Ext.dd.DDM._addListeners()
}
Ext.dd.DD = function(c, a, b) {
	if (c) {
		this.init(c, a, b)
	}
};
Ext.extend(Ext.dd.DD, Ext.dd.DragDrop, {
	scroll : true,
	autoOffset : function(c, b) {
		var a = c - this.startPageX;
		var d = b - this.startPageY;
		this.setDelta(a, d)
	},
	setDelta : function(b, a) {
		this.deltaX = b;
		this.deltaY = a
	},
	setDragElPos : function(c, b) {
		var a = this.getDragEl();
		this.alignElWithMouse(a, c, b)
	},
	alignElWithMouse : function(c, h, g) {
		var e = this.getTargetCoord(h, g);
		var b = c.dom ? c : Ext.fly(c, "_dd");
		if (!this.deltaSetXY) {
			var i = [e.x, e.y];
			b.setXY(i);
			var d = b.getLeft(true);
			var a = b.getTop(true);
			this.deltaSetXY = [d - e.x, a - e.y]
		} else {
			b.setLeftTop(e.x + this.deltaSetXY[0], e.y + this.deltaSetXY[1])
		}
		this.cachePosition(e.x, e.y);
		this.autoScroll(e.x, e.y, c.offsetHeight, c.offsetWidth);
		return e
	},
	cachePosition : function(b, a) {
		if (b) {
			this.lastPageX = b;
			this.lastPageY = a
		} else {
			var c = Ext.lib.Dom.getXY(this.getEl());
			this.lastPageX = c[0];
			this.lastPageY = c[1]
		}
	},
	autoScroll : function(m, l, e, n) {
		if (this.scroll) {
			var o = Ext.lib.Dom.getViewHeight();
			var b = Ext.lib.Dom.getViewWidth();
			var q = this.DDM.getScrollTop();
			var d = this.DDM.getScrollLeft();
			var k = e + l;
			var p = n + m;
			var i = (o + q - l - this.deltaY);
			var g = (b + d - m - this.deltaX);
			var c = 40;
			var a = (document.all) ? 80 : 30;
			if (k > o && i < c) {
				window.scrollTo(d, q + a)
			}
			if (l < q && q > 0 && l - q < c) {
				window.scrollTo(d, q - a)
			}
			if (p > b && g < c) {
				window.scrollTo(d + a, q)
			}
			if (m < d && d > 0 && m - d < c) {
				window.scrollTo(d - a, q)
			}
		}
	},
	getTargetCoord : function(c, b) {
		var a = c - this.deltaX;
		var d = b - this.deltaY;
		if (this.constrainX) {
			if (a < this.minX) {
				a = this.minX
			}
			if (a > this.maxX) {
				a = this.maxX
			}
		}
		if (this.constrainY) {
			if (d < this.minY) {
				d = this.minY
			}
			if (d > this.maxY) {
				d = this.maxY
			}
		}
		a = this.getTick(a, this.xTicks);
		d = this.getTick(d, this.yTicks);
		return {
			x : a,
			y : d
		}
	},
	applyConfig : function() {
		Ext.dd.DD.superclass.applyConfig.call(this);
		this.scroll = (this.config.scroll !== false)
	},
	b4MouseDown : function(a) {
		this.autoOffset(a.getPageX(), a.getPageY())
	},
	b4Drag : function(a) {
		this.setDragElPos(a.getPageX(), a.getPageY())
	},
	toString : function() {
		return ("DD " + this.id)
	}
});
Ext.dd.DDProxy = function(c, a, b) {
	if (c) {
		this.init(c, a, b);
		this.initFrame()
	}
};
Ext.dd.DDProxy.dragElId = "ygddfdiv";
Ext.extend(Ext.dd.DDProxy, Ext.dd.DD, {
	resizeFrame : true,
	centerFrame : false,
	createFrame : function() {
		var b = this;
		var a = document.body;
		if (!a || !a.firstChild) {
			setTimeout(function() {
				b.createFrame()
			}, 50);
			return
		}
		var d = this.getDragEl();
		if (!d) {
			d = document.createElement("div");
			d.id = this.dragElId;
			var c = d.style;
			c.position = "absolute";
			c.visibility = "hidden";
			c.cursor = "move";
			c.border = "2px solid #aaa";
			c.zIndex = 999;
			a.insertBefore(d, a.firstChild)
		}
	},
	initFrame : function() {
		this.createFrame()
	},
	applyConfig : function() {
		Ext.dd.DDProxy.superclass.applyConfig.call(this);
		this.resizeFrame = (this.config.resizeFrame !== false);
		this.centerFrame = (this.config.centerFrame);
		this.setDragElId(this.config.dragElId || Ext.dd.DDProxy.dragElId)
	},
	showFrame : function(e, d) {
		var c = this.getEl();
		var a = this.getDragEl();
		var b = a.style;
		this._resizeProxy();
		if (this.centerFrame) {
			this.setDelta(Math.round(parseInt(b.width, 10) / 2), Math
					.round(parseInt(b.height, 10) / 2))
		}
		this.setDragElPos(e, d);
		Ext.fly(a).show()
	},
	_resizeProxy : function() {
		if (this.resizeFrame) {
			var a = this.getEl();
			Ext.fly(this.getDragEl()).setSize(a.offsetWidth, a.offsetHeight)
		}
	},
	b4MouseDown : function(b) {
		var a = b.getPageX();
		var c = b.getPageY();
		this.autoOffset(a, c);
		this.setDragElPos(a, c)
	},
	b4StartDrag : function(a, b) {
		this.showFrame(a, b)
	},
	b4EndDrag : function(a) {
		Ext.fly(this.getDragEl()).hide()
	},
	endDrag : function(c) {
		var b = this.getEl();
		var a = this.getDragEl();
		a.style.visibility = "";
		this.beforeMove();
		b.style.visibility = "hidden";
		Ext.dd.DDM.moveToEl(b, a);
		a.style.visibility = "hidden";
		b.style.visibility = "";
		this.afterDrag()
	},
	beforeMove : function() {
	},
	afterDrag : function() {
	},
	toString : function() {
		return ("DDProxy " + this.id)
	}
});
Ext.dd.DDTarget = function(c, a, b) {
	if (c) {
		this.initTarget(c, a, b)
	}
};
Ext.extend(Ext.dd.DDTarget, Ext.dd.DragDrop, {
	toString : function() {
		return ("DDTarget " + this.id)
	}
});
Ext.dd.DragTracker = function(a) {
	Ext.apply(this, a);
	this.addEvents("mousedown", "mouseup", "mousemove", "dragstart", "dragend",
			"drag");
	this.dragRegion = new Ext.lib.Region(0, 0, 0, 0);
	if (this.el) {
		this.initEl(this.el)
	}
};
Ext.extend(Ext.dd.DragTracker, Ext.util.Observable, {
	active : false,
	tolerance : 5,
	autoStart : false,
	initEl : function(a) {
		this.el = Ext.get(a);
		a.on("mousedown", this.onMouseDown, this, this.delegate ? {
			delegate : this.delegate
		} : undefined)
	},
	destroy : function() {
		this.el.un("mousedown", this.onMouseDown, this)
	},
	onMouseDown : function(c, b) {
		if (this.fireEvent("mousedown", this, c) !== false
				&& this.onBeforeStart(c) !== false) {
			this.startXY = this.lastXY = c.getXY();
			this.dragTarget = this.delegate ? b : this.el.dom;
			c.preventDefault();
			var a = Ext.getDoc();
			a.on("mouseup", this.onMouseUp, this);
			a.on("mousemove", this.onMouseMove, this);
			a.on("selectstart", this.stopSelect, this);
			if (this.autoStart) {
				this.timer = this.triggerStart.defer(this.autoStart === true
						? 1000
						: this.autoStart, this)
			}
		}
	},
	onMouseMove : function(d, c) {
		d.preventDefault();
		var b = d.getXY(), a = this.startXY;
		this.lastXY = b;
		if (!this.active) {
			if (Math.abs(a[0] - b[0]) > this.tolerance
					|| Math.abs(a[1] - b[1]) > this.tolerance) {
				this.triggerStart()
			} else {
				return
			}
		}
		this.fireEvent("mousemove", this, d);
		this.onDrag(d);
		this.fireEvent("drag", this, d)
	},
	onMouseUp : function(b) {
		var a = Ext.getDoc();
		a.un("mousemove", this.onMouseMove, this);
		a.un("mouseup", this.onMouseUp, this);
		a.un("selectstart", this.stopSelect, this);
		b.preventDefault();
		this.clearStart();
		this.active = false;
		delete this.elRegion;
		this.fireEvent("mouseup", this, b);
		this.onEnd(b);
		this.fireEvent("dragend", this, b)
	},
	triggerStart : function(a) {
		this.clearStart();
		this.active = true;
		this.onStart(this.startXY);
		this.fireEvent("dragstart", this, this.startXY)
	},
	clearStart : function() {
		if (this.timer) {
			clearTimeout(this.timer);
			delete this.timer
		}
	},
	stopSelect : function(a) {
		a.stopEvent();
		return false
	},
	onBeforeStart : function(a) {
	},
	onStart : function(a) {
	},
	onDrag : function(a) {
	},
	onEnd : function(a) {
	},
	getDragTarget : function() {
		return this.dragTarget
	},
	getDragCt : function() {
		return this.el
	},
	getXY : function(a) {
		return a ? this.constrainModes[a].call(this, this.lastXY) : this.lastXY
	},
	getOffset : function(c) {
		var b = this.getXY(c);
		var a = this.startXY;
		return [a[0] - b[0], a[1] - b[1]]
	},
	constrainModes : {
		point : function(b) {
			if (!this.elRegion) {
				this.elRegion = this.getDragCt().getRegion()
			}
			var a = this.dragRegion;
			a.left = b[0];
			a.top = b[1];
			a.right = b[0];
			a.bottom = b[1];
			a.constrainTo(this.elRegion);
			return [a.left, a.top]
		}
	}
});
Ext.dd.ScrollManager = function() {
	var c = Ext.dd.DragDropMgr;
	var e = {};
	var b = null;
	var i = {};
	var h = function(m) {
		b = null;
		a()
	};
	var k = function() {
		if (c.dragCurrent) {
			c.refreshCache(c.dragCurrent.groups)
		}
	};
	var d = function() {
		if (c.dragCurrent) {
			var m = Ext.dd.ScrollManager;
			var n = i.el.ddScrollConfig
					? i.el.ddScrollConfig.increment
					: m.increment;
			if (!m.animate) {
				if (i.el.scroll(i.dir, n)) {
					k()
				}
			} else {
				i.el.scroll(i.dir, n, true, m.animDuration, k)
			}
		}
	};
	var a = function() {
		if (i.id) {
			clearInterval(i.id)
		}
		i.id = 0;
		i.el = null;
		i.dir = ""
	};
	var g = function(n, m) {
		a();
		i.el = n;
		i.dir = m;
		var o = (n.ddScrollConfig && n.ddScrollConfig.frequency)
				? n.ddScrollConfig.frequency
				: Ext.dd.ScrollManager.frequency;
		i.id = setInterval(d, o)
	};
	var l = function(p, s) {
		if (s || !c.dragCurrent) {
			return
		}
		var t = Ext.dd.ScrollManager;
		if (!b || b != c.dragCurrent) {
			b = c.dragCurrent;
			t.refreshCache()
		}
		var u = Ext.lib.Event.getXY(p);
		var v = new Ext.lib.Point(u[0], u[1]);
		for (var n in e) {
			var o = e[n], m = o._region;
			var q = o.ddScrollConfig ? o.ddScrollConfig : t;
			if (m && m.contains(v) && o.isScrollable()) {
				if (m.bottom - v.y <= q.vthresh) {
					if (i.el != o) {
						g(o, "down")
					}
					return
				} else {
					if (m.right - v.x <= q.hthresh) {
						if (i.el != o) {
							g(o, "left")
						}
						return
					} else {
						if (v.y - m.top <= q.vthresh) {
							if (i.el != o) {
								g(o, "up")
							}
							return
						} else {
							if (v.x - m.left <= q.hthresh) {
								if (i.el != o) {
									g(o, "right")
								}
								return
							}
						}
					}
				}
			}
		}
		a()
	};
	c.fireEvents = c.fireEvents.createSequence(l, c);
	c.stopDrag = c.stopDrag.createSequence(h, c);
	return {
		register : function(o) {
			if (Ext.isArray(o)) {
				for (var n = 0, m = o.length;n < m; n++) {
					this.register(o[n])
				}
			} else {
				o = Ext.get(o);
				e[o.id] = o
			}
		},
		unregister : function(o) {
			if (Ext.isArray(o)) {
				for (var n = 0, m = o.length;n < m; n++) {
					this.unregister(o[n])
				}
			} else {
				o = Ext.get(o);
				delete e[o.id]
			}
		},
		vthresh : 25,
		hthresh : 25,
		increment : 100,
		frequency : 500,
		animate : true,
		animDuration : 0.4,
		refreshCache : function() {
			for (var m in e) {
				if (typeof e[m] == "object") {
					e[m]._region = e[m].getRegion()
				}
			}
		}
	}
}();
Ext.dd.Registry = function() {
	var d = {};
	var b = {};
	var a = 0;
	var c = function(g, e) {
		if (typeof g == "string") {
			return g
		}
		var h = g.id;
		if (!h && e !== false) {
			h = "extdd-" + (++a);
			g.id = h
		}
		return h
	};
	return {
		register : function(k, l) {
			l = l || {};
			if (typeof k == "string") {
				k = document.getElementById(k)
			}
			l.ddel = k;
			d[c(k)] = l;
			if (l.isHandle !== false) {
				b[l.ddel.id] = l
			}
			if (l.handles) {
				var h = l.handles;
				for (var g = 0, e = h.length;g < e; g++) {
					b[c(h[g])] = l
				}
			}
		},
		unregister : function(k) {
			var m = c(k, false);
			var l = d[m];
			if (l) {
				delete d[m];
				if (l.handles) {
					var h = l.handles;
					for (var g = 0, e = h.length;g < e; g++) {
						delete b[c(h[g], false)]
					}
				}
			}
		},
		getHandle : function(e) {
			if (typeof e != "string") {
				e = e.id
			}
			return b[e]
		},
		getHandleFromEvent : function(h) {
			var g = Ext.lib.Event.getTarget(h);
			return g ? b[g.id] : null
		},
		getTarget : function(e) {
			if (typeof e != "string") {
				e = e.id
			}
			return d[e]
		},
		getTargetFromEvent : function(h) {
			var g = Ext.lib.Event.getTarget(h);
			return g ? d[g.id] || b[g.id] : null
		}
	}
}();
Ext.dd.StatusProxy = function(a) {
	Ext.apply(this, a);
	this.id = this.id || Ext.id();
	this.el = new Ext.Layer( {
		dh : {
			id : this.id,
			tag : "div",
			cls : "x-dd-drag-proxy " + this.dropNotAllowed,
			children : [ {
				tag : "div",
				cls : "x-dd-drop-icon"
			}, {
				tag : "div",
				cls : "x-dd-drag-ghost"
			}]
		},
		shadow : !a || a.shadow !== false
	});
	this.ghost = Ext.get(this.el.dom.childNodes[1]);
	this.dropStatus = this.dropNotAllowed
};
Ext.dd.StatusProxy.prototype = {
	dropAllowed : "x-dd-drop-ok",
	dropNotAllowed : "x-dd-drop-nodrop",
	setStatus : function(a) {
		a = a || this.dropNotAllowed;
		if (this.dropStatus != a) {
			this.el.replaceClass(this.dropStatus, a);
			this.dropStatus = a
		}
	},
	reset : function(a) {
		this.el.dom.className = "x-dd-drag-proxy " + this.dropNotAllowed;
		this.dropStatus = this.dropNotAllowed;
		if (a) {
			this.ghost.update("")
		}
	},
	update : function(a) {
		if (typeof a == "string") {
			this.ghost.update(a)
		} else {
			this.ghost.update("");
			a.style.margin = "0";
			this.ghost.dom.appendChild(a)
		}
		var b = this.ghost.dom.firstChild;
		if (b) {
			Ext.fly(b).setStyle(Ext.isIE ? "styleFloat" : "cssFloat", "none")
		}
	},
	getEl : function() {
		return this.el
	},
	getGhost : function() {
		return this.ghost
	},
	hide : function(a) {
		this.el.hide();
		if (a) {
			this.reset(true)
		}
	},
	stop : function() {
		if (this.anim && this.anim.isAnimated && this.anim.isAnimated()) {
			this.anim.stop()
		}
	},
	show : function() {
		this.el.show()
	},
	sync : function() {
		this.el.sync()
	},
	repair : function(b, c, a) {
		this.callback = c;
		this.scope = a;
		if (b && this.animRepair !== false) {
			this.el.addClass("x-dd-drag-repair");
			this.el.hideUnders(true);
			this.anim = this.el.shift( {
				duration : this.repairDuration || 0.5,
				easing : "easeOut",
				xy : b,
				stopFx : true,
				callback : this.afterRepair,
				scope : this
			})
		} else {
			this.afterRepair()
		}
	},
	afterRepair : function() {
		this.hide(true);
		if (typeof this.callback == "function") {
			this.callback.call(this.scope || this)
		}
		this.callback = null;
		this.scope = null
	}
};
Ext.dd.DragSource = function(b, a) {
	this.el = Ext.get(b);
	if (!this.dragData) {
		this.dragData = {}
	}
	Ext.apply(this, a);
	if (!this.proxy) {
		this.proxy = new Ext.dd.StatusProxy()
	}
	Ext.dd.DragSource.superclass.constructor.call(this, this.el.dom,
			this.ddGroup || this.group, {
				dragElId : this.proxy.id,
				resizeFrame : false,
				isTarget : false,
				scroll : this.scroll === true
			});
	this.dragging = false
};
Ext.extend(Ext.dd.DragSource, Ext.dd.DDProxy, {
	dropAllowed : "x-dd-drop-ok",
	dropNotAllowed : "x-dd-drop-nodrop",
	getDragData : function(a) {
		return this.dragData
	},
	onDragEnter : function(c, d) {
		var b = Ext.dd.DragDropMgr.getDDById(d);
		this.cachedTarget = b;
		if (this.beforeDragEnter(b, c, d) !== false) {
			if (b.isNotifyTarget) {
				var a = b.notifyEnter(this, c, this.dragData);
				this.proxy.setStatus(a)
			} else {
				this.proxy.setStatus(this.dropAllowed)
			}
			if (this.afterDragEnter) {
				this.afterDragEnter(b, c, d)
			}
		}
	},
	beforeDragEnter : function(b, a, c) {
		return true
	},
	alignElWithMouse : function() {
		Ext.dd.DragSource.superclass.alignElWithMouse.apply(this, arguments);
		this.proxy.sync()
	},
	onDragOver : function(c, d) {
		var b = this.cachedTarget || Ext.dd.DragDropMgr.getDDById(d);
		if (this.beforeDragOver(b, c, d) !== false) {
			if (b.isNotifyTarget) {
				var a = b.notifyOver(this, c, this.dragData);
				this.proxy.setStatus(a)
			}
			if (this.afterDragOver) {
				this.afterDragOver(b, c, d)
			}
		}
	},
	beforeDragOver : function(b, a, c) {
		return true
	},
	onDragOut : function(b, c) {
		var a = this.cachedTarget || Ext.dd.DragDropMgr.getDDById(c);
		if (this.beforeDragOut(a, b, c) !== false) {
			if (a.isNotifyTarget) {
				a.notifyOut(this, b, this.dragData)
			}
			this.proxy.reset();
			if (this.afterDragOut) {
				this.afterDragOut(a, b, c)
			}
		}
		this.cachedTarget = null
	},
	beforeDragOut : function(b, a, c) {
		return true
	},
	onDragDrop : function(b, c) {
		var a = this.cachedTarget || Ext.dd.DragDropMgr.getDDById(c);
		if (this.beforeDragDrop(a, b, c) !== false) {
			if (a.isNotifyTarget) {
				if (a.notifyDrop(this, b, this.dragData)) {
					this.onValidDrop(a, b, c)
				} else {
					this.onInvalidDrop(a, b, c)
				}
			} else {
				this.onValidDrop(a, b, c)
			}
			if (this.afterDragDrop) {
				this.afterDragDrop(a, b, c)
			}
		}
		delete this.cachedTarget
	},
	beforeDragDrop : function(b, a, c) {
		return true
	},
	onValidDrop : function(b, a, c) {
		this.hideProxy();
		if (this.afterValidDrop) {
			this.afterValidDrop(b, a, c)
		}
	},
	getRepairXY : function(b, a) {
		return this.el.getXY()
	},
	onInvalidDrop : function(b, a, c) {
		this.beforeInvalidDrop(b, a, c);
		if (this.cachedTarget) {
			if (this.cachedTarget.isNotifyTarget) {
				this.cachedTarget.notifyOut(this, a, this.dragData)
			}
			this.cacheTarget = null
		}
		this.proxy.repair(this.getRepairXY(a, this.dragData), this.afterRepair,
				this);
		if (this.afterInvalidDrop) {
			this.afterInvalidDrop(a, c)
		}
	},
	afterRepair : function() {
		if (Ext.enableFx) {
			this.el.highlight(this.hlColor || "c3daf9")
		}
		this.dragging = false
	},
	beforeInvalidDrop : function(b, a, c) {
		return true
	},
	handleMouseDown : function(b) {
		if (this.dragging) {
			return
		}
		var a = this.getDragData(b);
		if (a && this.onBeforeDrag(a, b) !== false) {
			this.dragData = a;
			this.proxy.stop();
			Ext.dd.DragSource.superclass.handleMouseDown.apply(this, arguments)
		}
	},
	onBeforeDrag : function(a, b) {
		return true
	},
	onStartDrag : Ext.emptyFn,
	startDrag : function(a, b) {
		this.proxy.reset();
		this.dragging = true;
		this.proxy.update("");
		this.onInitDrag(a, b);
		this.proxy.show()
	},
	onInitDrag : function(a, c) {
		var b = this.el.dom.cloneNode(true);
		b.id = Ext.id();
		this.proxy.update(b);
		this.onStartDrag(a, c);
		return true
	},
	getProxy : function() {
		return this.proxy
	},
	hideProxy : function() {
		this.proxy.hide();
		this.proxy.reset(true);
		this.dragging = false
	},
	triggerCacheRefresh : function() {
		Ext.dd.DDM.refreshCache(this.groups)
	},
	b4EndDrag : function(a) {
	},
	endDrag : function(a) {
		this.onEndDrag(this.dragData, a)
	},
	onEndDrag : function(a, b) {
	},
	autoOffset : function(a, b) {
		this.setDelta(-12, -20)
	}
});
Ext.dd.DropTarget = function(b, a) {
	this.el = Ext.get(b);
	Ext.apply(this, a);
	if (this.containerScroll) {
		Ext.dd.ScrollManager.register(this.el)
	}
	Ext.dd.DropTarget.superclass.constructor.call(this, this.el.dom,
			this.ddGroup || this.group, {
				isTarget : true
			})
};
Ext.extend(Ext.dd.DropTarget, Ext.dd.DDTarget, {
	dropAllowed : "x-dd-drop-ok",
	dropNotAllowed : "x-dd-drop-nodrop",
	isTarget : true,
	isNotifyTarget : true,
	notifyEnter : function(a, c, b) {
		if (this.overClass) {
			this.el.addClass(this.overClass)
		}
		return this.dropAllowed
	},
	notifyOver : function(a, c, b) {
		return this.dropAllowed
	},
	notifyOut : function(a, c, b) {
		if (this.overClass) {
			this.el.removeClass(this.overClass)
		}
	},
	notifyDrop : function(a, c, b) {
		return false
	}
});
Ext.dd.DragZone = function(b, a) {
	Ext.dd.DragZone.superclass.constructor.call(this, b, a);
	if (this.containerScroll) {
		Ext.dd.ScrollManager.register(this.el)
	}
};
Ext.extend(Ext.dd.DragZone, Ext.dd.DragSource, {
	getDragData : function(a) {
		return Ext.dd.Registry.getHandleFromEvent(a)
	},
	onInitDrag : function(a, b) {
		this.proxy.update(this.dragData.ddel.cloneNode(true));
		this.onStartDrag(a, b);
		return true
	},
	afterRepair : function() {
		if (Ext.enableFx) {
			Ext.Element.fly(this.dragData.ddel).highlight(this.hlColor
					|| "c3daf9")
		}
		this.dragging = false
	},
	getRepairXY : function(a) {
		return Ext.Element.fly(this.dragData.ddel).getXY()
	}
});
Ext.dd.DropZone = function(b, a) {
	Ext.dd.DropZone.superclass.constructor.call(this, b, a)
};
Ext.extend(Ext.dd.DropZone, Ext.dd.DropTarget, {
	getTargetFromEvent : function(a) {
		return Ext.dd.Registry.getTargetFromEvent(a)
	},
	onNodeEnter : function(d, a, c, b) {
	},
	onNodeOver : function(d, a, c, b) {
		return this.dropAllowed
	},
	onNodeOut : function(d, a, c, b) {
	},
	onNodeDrop : function(d, a, c, b) {
		return false
	},
	onContainerOver : function(a, c, b) {
		return this.dropNotAllowed
	},
	onContainerDrop : function(a, c, b) {
		return false
	},
	notifyEnter : function(a, c, b) {
		return this.dropNotAllowed
	},
	notifyOver : function(a, c, b) {
		var d = this.getTargetFromEvent(c);
		if (!d) {
			if (this.lastOverNode) {
				this.onNodeOut(this.lastOverNode, a, c, b);
				this.lastOverNode = null
			}
			return this.onContainerOver(a, c, b)
		}
		if (this.lastOverNode != d) {
			if (this.lastOverNode) {
				this.onNodeOut(this.lastOverNode, a, c, b)
			}
			this.onNodeEnter(d, a, c, b);
			this.lastOverNode = d
		}
		return this.onNodeOver(d, a, c, b)
	},
	notifyOut : function(a, c, b) {
		if (this.lastOverNode) {
			this.onNodeOut(this.lastOverNode, a, c, b);
			this.lastOverNode = null
		}
	},
	notifyDrop : function(a, c, b) {
		if (this.lastOverNode) {
			this.onNodeOut(this.lastOverNode, a, c, b);
			this.lastOverNode = null
		}
		var d = this.getTargetFromEvent(c);
		return d ? this.onNodeDrop(d, a, c, b) : this.onContainerDrop(a, c, b)
	},
	triggerCacheRefresh : function() {
		Ext.dd.DDM.refreshCache(this.groups)
	}
});
Ext.data.SortTypes = {
	none : function(a) {
		return a
	},
	stripTagsRE : /<\/?[^>]+>/gi,
	asText : function(a) {
		return String(a).replace(this.stripTagsRE, "")
	},
	asUCText : function(a) {
		return String(a).toUpperCase().replace(this.stripTagsRE, "")
	},
	asUCString : function(a) {
		return String(a).toUpperCase()
	},
	asDate : function(a) {
		if (!a) {
			return 0
		}
		if (Ext.isDate(a)) {
			return a.getTime()
		}
		return Date.parse(String(a))
	},
	asFloat : function(a) {
		var b = parseFloat(String(a).replace(/,/g, ""));
		if (isNaN(b)) {
			b = 0
		}
		return b
	},
	asInt : function(a) {
		var b = parseInt(String(a).replace(/,/g, ""));
		if (isNaN(b)) {
			b = 0
		}
		return b
	}
};
Ext.data.Record = function(a, b) {
	this.id = (b || b === 0) ? b : ++Ext.data.Record.AUTO_ID;
	this.data = a
};
Ext.data.Record.create = function(e) {
	var c = Ext.extend(Ext.data.Record, {});
	var d = c.prototype;
	d.fields = new Ext.util.MixedCollection(false, function(g) {
		return g.name
	});
	for (var b = 0, a = e.length;b < a; b++) {
		d.fields.add(new Ext.data.Field(e[b]))
	}
	c.getField = function(g) {
		return d.fields.get(g)
	};
	return c
};
Ext.data.Record.AUTO_ID = 1000;
Ext.data.Record.EDIT = "edit";
Ext.data.Record.REJECT = "reject";
Ext.data.Record.COMMIT = "commit";
Ext.data.Record.prototype = {
	dirty : false,
	editing : false,
	error : null,
	modified : null,
	join : function(a) {
		this.store = a
	},
	set : function(a, b) {
		if (String(this.data[a]) == String(b)) {
			return
		}
		this.dirty = true;
		if (!this.modified) {
			this.modified = {}
		}
		if (typeof this.modified[a] == "undefined") {
			this.modified[a] = this.data[a]
		}
		this.data[a] = b;
		if (!this.editing && this.store) {
			this.store.afterEdit(this)
		}
	},
	get : function(a) {
		return this.data[a]
	},
	beginEdit : function() {
		this.editing = true;
		this.modified = {}
	},
	cancelEdit : function() {
		this.editing = false;
		delete this.modified
	},
	endEdit : function() {
		this.editing = false;
		if (this.dirty && this.store) {
			this.store.afterEdit(this)
		}
	},
	reject : function(b) {
		var a = this.modified;
		for (var c in a) {
			if (typeof a[c] != "function") {
				this.data[c] = a[c]
			}
		}
		this.dirty = false;
		delete this.modified;
		this.editing = false;
		if (this.store && b !== true) {
			this.store.afterReject(this)
		}
	},
	commit : function(a) {
		this.dirty = false;
		delete this.modified;
		this.editing = false;
		if (this.store && a !== true) {
			this.store.afterCommit(this)
		}
	},
	getChanges : function() {
		var a = this.modified, b = {};
		for (var c in a) {
			if (a.hasOwnProperty(c)) {
				b[c] = this.data[c]
			}
		}
		return b
	},
	hasError : function() {
		return this.error != null
	},
	clearError : function() {
		this.error = null
	},
	copy : function(a) {
		return new this.constructor(Ext.apply( {}, this.data), a || this.id)
	},
	isModified : function(a) {
		return !!(this.modified && this.modified.hasOwnProperty(a))
	}
};
Ext.StoreMgr = Ext.apply(new Ext.util.MixedCollection(), {
	register : function() {
		for (var a = 0, b;b = arguments[a]; a++) {
			this.add(b)
		}
	},
	unregister : function() {
		for (var a = 0, b;b = arguments[a]; a++) {
			this.remove(this.lookup(b))
		}
	},
	lookup : function(a) {
		return typeof a == "object" ? a : this.get(a)
	},
	getKey : function(a) {
		return a.storeId || a.id
	}
});
Ext.data.Store = function(a) {
	this.data = new Ext.util.MixedCollection(false);
	this.data.getKey = function(b) {
		return b.id
	};
	this.baseParams = {};
	this.paramNames = {
		start : "start",
		limit : "limit",
		sort : "sort",
		dir : "dir"
	};
	if (a && a.data) {
		this.inlineData = a.data;
		delete a.data
	}
	Ext.apply(this, a);
	if (this.url && !this.proxy) {
		this.proxy = new Ext.data.HttpProxy( {
			url : this.url
		})
	}
	if (this.reader) {
		if (!this.recordType) {
			this.recordType = this.reader.recordType
		}
		if (this.reader.onMetaChange) {
			this.reader.onMetaChange = this.onMetaChange.createDelegate(this)
		}
	}
	if (this.recordType) {
		this.fields = this.recordType.prototype.fields
	}
	this.modified = [];
	this.addEvents("datachanged", "metachange", "add", "remove", "update",
			"clear", "beforeload", "load", "loadexception");
	if (this.proxy) {
		this.relayEvents(this.proxy, ["loadexception"])
	}
	this.sortToggle = {};
	if (this.sortInfo) {
		this.setDefaultSort(this.sortInfo.field, this.sortInfo.direction)
	}
	Ext.data.Store.superclass.constructor.call(this);
	if (this.storeId || this.id) {
		Ext.StoreMgr.register(this)
	}
	if (this.inlineData) {
		this.loadData(this.inlineData);
		delete this.inlineData
	} else {
		if (this.autoLoad) {
			this.load.defer(10, this, [typeof this.autoLoad == "object"
					? this.autoLoad
					: undefined])
		}
	}
};
Ext.extend(Ext.data.Store, Ext.util.Observable, {
	remoteSort : false,
	pruneModifiedRecords : false,
	lastOptions : null,
	destroy : function() {
		if (this.storeId || this.id) {
			Ext.StoreMgr.unregister(this)
		}
		this.data = null;
		this.purgeListeners()
	},
	add : function(b) {
		b = [].concat(b);
		if (b.length < 1) {
			return
		}
		for (var d = 0, a = b.length;d < a; d++) {
			b[d].join(this)
		}
		var c = this.data.length;
		this.data.addAll(b);
		if (this.snapshot) {
			this.snapshot.addAll(b)
		}
		this.fireEvent("add", this, b, c)
	},
	addSorted : function(a) {
		var b = this.findInsertIndex(a);
		this.insert(b, a)
	},
	remove : function(a) {
		var b = this.data.indexOf(a);
		this.data.removeAt(b);
		if (this.pruneModifiedRecords) {
			this.modified.remove(a)
		}
		if (this.snapshot) {
			this.snapshot.remove(a)
		}
		this.fireEvent("remove", this, a, b)
	},
	removeAt : function(a) {
		this.remove(this.getAt(a))
	},
	removeAll : function() {
		this.data.clear();
		if (this.snapshot) {
			this.snapshot.clear()
		}
		if (this.pruneModifiedRecords) {
			this.modified = []
		}
		this.fireEvent("clear", this)
	},
	insert : function(c, b) {
		b = [].concat(b);
		for (var d = 0, a = b.length;d < a; d++) {
			this.data.insert(c, b[d]);
			b[d].join(this)
		}
		this.fireEvent("add", this, b, c)
	},
	indexOf : function(a) {
		return this.data.indexOf(a)
	},
	indexOfId : function(a) {
		return this.data.indexOfKey(a)
	},
	getById : function(a) {
		return this.data.key(a)
	},
	getAt : function(a) {
		return this.data.itemAt(a)
	},
	getRange : function(b, a) {
		return this.data.getRange(b, a)
	},
	storeOptions : function(a) {
		a = Ext.apply( {}, a);
		delete a.callback;
		delete a.scope;
		this.lastOptions = a
	},
	load : function(b) {
		b = b || {};
		if (this.fireEvent("beforeload", this, b) !== false) {
			this.storeOptions(b);
			var c = Ext.apply(b.params || {}, this.baseParams);
			if (this.sortInfo && this.remoteSort) {
				var a = this.paramNames;
				c[a.sort] = this.sortInfo.field;
				c[a.dir] = this.sortInfo.direction
			}
			this.proxy.load(c, this.reader, this.loadRecords, this, b);
			return true
		} else {
			return false
		}
	},
	reload : function(a) {
		this.load(Ext.applyIf(a || {}, this.lastOptions))
	},
	loadRecords : function(h, b, g) {
		if (!h || g === false) {
			if (g !== false) {
				this.fireEvent("load", this, [], b)
			}
			if (b.callback) {
				b.callback.call(b.scope || this, [], b, false)
			}
			return
		}
		var e = h.records, d = h.totalRecords || e.length;
		if (!b || b.add !== true) {
			if (this.pruneModifiedRecords) {
				this.modified = []
			}
			for (var c = 0, a = e.length;c < a; c++) {
				e[c].join(this)
			}
			if (this.snapshot) {
				this.data = this.snapshot;
				delete this.snapshot
			}
			this.data.clear();
			this.data.addAll(e);
			this.totalLength = d;
			this.applySort();
			this.fireEvent("datachanged", this)
		} else {
			this.totalLength = Math.max(d, this.data.length + e.length);
			this.add(e)
		}
		this.fireEvent("load", this, e, b);
		if (b.callback) {
			b.callback.call(b.scope || this, e, b, true)
		}
	},
	loadData : function(c, a) {
		var b = this.reader.readRecords(c);
		this.loadRecords(b, {
			add : a
		}, true)
	},
	getCount : function() {
		return this.data.length || 0
	},
	getTotalCount : function() {
		return this.totalLength || 0
	},
	getSortState : function() {
		return this.sortInfo
	},
	applySort : function() {
		if (this.sortInfo && !this.remoteSort) {
			var a = this.sortInfo, b = a.field;
			this.sortData(b, a.direction)
		}
	},
	sortData : function(c, d) {
		d = d || "ASC";
		var a = this.fields.get(c).sortType;
		var b = function(g, e) {
			var i = a(g.data[c]), h = a(e.data[c]);
			return i > h ? 1 : (i < h ? -1 : 0)
		};
		this.data.sort(d, b);
		if (this.snapshot && this.snapshot != this.data) {
			this.snapshot.sort(d, b)
		}
	},
	setDefaultSort : function(b, a) {
		a = a ? a.toUpperCase() : "ASC";
		this.sortInfo = {
			field : b,
			direction : a
		};
		this.sortToggle[b] = a
	},
	sort : function(e, c) {
		var d = this.fields.get(e);
		if (!d) {
			return false
		}
		if (!c) {
			if (this.sortInfo && this.sortInfo.field == d.name) {
				c = (this.sortToggle[d.name] || "ASC").toggle("ASC", "DESC")
			} else {
				c = d.sortDir
			}
		}
		var b = (this.sortToggle) ? this.sortToggle[d.name] : null;
		var a = (this.sortInfo) ? this.sortInfo : null;
		this.sortToggle[d.name] = c;
		this.sortInfo = {
			field : d.name,
			direction : c
		};
		if (!this.remoteSort) {
			this.applySort();
			this.fireEvent("datachanged", this)
		} else {
			if (!this.load(this.lastOptions)) {
				if (b) {
					this.sortToggle[d.name] = b
				}
				if (a) {
					this.sortInfo = a
				}
			}
		}
	},
	each : function(b, a) {
		this.data.each(b, a)
	},
	getModifiedRecords : function() {
		return this.modified
	},
	createFilterFn : function(c, b, d, a) {
		if (Ext.isEmpty(b, false)) {
			return false
		}
		b = this.data.createValueMatcher(b, d, a);
		return function(e) {
			return b.test(e.data[c])
		}
	},
	sum : function(e, g, a) {
		var c = this.data.items, b = 0;
		g = g || 0;
		a = (a || a === 0) ? a : c.length - 1;
		for (var d = g;d <= a; d++) {
			b += (c[d].data[e] || 0)
		}
		return b
	},
	filter : function(d, c, e, a) {
		var b = this.createFilterFn(d, c, e, a);
		return b ? this.filterBy(b) : this.clearFilter()
	},
	filterBy : function(b, a) {
		this.snapshot = this.snapshot || this.data;
		this.data = this.queryBy(b, a || this);
		this.fireEvent("datachanged", this)
	},
	query : function(d, c, e, a) {
		var b = this.createFilterFn(d, c, e, a);
		return b ? this.queryBy(b) : this.data.clone()
	},
	queryBy : function(b, a) {
		var c = this.snapshot || this.data;
		return c.filterBy(b, a || this)
	},
	find : function(d, c, g, e, a) {
		var b = this.createFilterFn(d, c, e, a);
		return b ? this.data.findIndexBy(b, null, g) : -1
	},
	findBy : function(b, a, c) {
		return this.data.findIndexBy(b, a, c)
	},
	collect : function(k, m, b) {
		var h = (b === true && this.snapshot)
				? this.snapshot.items
				: this.data.items;
		var n, o, a = [], c = {};
		for (var e = 0, g = h.length;e < g; e++) {
			n = h[e].data[k];
			o = String(n);
			if ((m || !Ext.isEmpty(n)) && !c[o]) {
				c[o] = true;
				a[a.length] = n
			}
		}
		return a
	},
	clearFilter : function(a) {
		if (this.isFiltered()) {
			this.data = this.snapshot;
			delete this.snapshot;
			if (a !== true) {
				this.fireEvent("datachanged", this)
			}
		}
	},
	isFiltered : function() {
		return this.snapshot && this.snapshot != this.data
	},
	afterEdit : function(a) {
		if (this.modified.indexOf(a) == -1) {
			this.modified.push(a)
		}
		this.fireEvent("update", this, a, Ext.data.Record.EDIT)
	},
	afterReject : function(a) {
		this.modified.remove(a);
		this.fireEvent("update", this, a, Ext.data.Record.REJECT)
	},
	afterCommit : function(a) {
		this.modified.remove(a);
		this.fireEvent("update", this, a, Ext.data.Record.COMMIT)
	},
	commitChanges : function() {
		var b = this.modified.slice(0);
		this.modified = [];
		for (var c = 0, a = b.length;c < a; c++) {
			b[c].commit()
		}
	},
	rejectChanges : function() {
		var b = this.modified.slice(0);
		this.modified = [];
		for (var c = 0, a = b.length;c < a; c++) {
			b[c].reject()
		}
	},
	onMetaChange : function(b, a, c) {
		this.recordType = a;
		this.fields = a.prototype.fields;
		delete this.snapshot;
		this.sortInfo = b.sortInfo;
		this.modified = [];
		this.fireEvent("metachange", this, this.reader.meta)
	},
	findInsertIndex : function(a) {
		this.suspendEvents();
		var c = this.data.clone();
		this.data.add(a);
		this.applySort();
		var b = this.data.indexOf(a);
		this.data = c;
		this.resumeEvents();
		return b
	}
});
Ext.data.SimpleStore = function(a) {
	Ext.data.SimpleStore.superclass.constructor.call(this, Ext.apply(a, {
		reader : new Ext.data.ArrayReader( {
			id : a.id
		}, Ext.data.Record.create(a.fields))
	}))
};
Ext.extend(Ext.data.SimpleStore, Ext.data.Store, {
	loadData : function(e, b) {
		if (this.expandData === true) {
			var d = [];
			for (var c = 0, a = e.length;c < a; c++) {
				d[d.length] = [e[c]]
			}
			e = d
		}
		Ext.data.SimpleStore.superclass.loadData.call(this, e, b)
	}
});
Ext.data.JsonStore = function(a) {
	Ext.data.JsonStore.superclass.constructor.call(this, Ext.apply(a, {
		proxy : a.proxy || (!a.data ? new Ext.data.HttpProxy( {
			url : a.url
		}) : undefined),
		reader : new Ext.data.JsonReader(a, a.fields)
	}))
};
Ext.extend(Ext.data.JsonStore, Ext.data.Store);
Ext.data.Field = function(d) {
	if (typeof d == "string") {
		d = {
			name : d
		}
	}
	Ext.apply(this, d);
	if (!this.type) {
		this.type = "auto"
	}
	var c = Ext.data.SortTypes;
	if (typeof this.sortType == "string") {
		this.sortType = c[this.sortType]
	}
	if (!this.sortType) {
		switch (this.type) {
			case "string" :
				this.sortType = c.asUCString;
				break;
			case "date" :
				this.sortType = c.asDate;
				break;
			default :
				this.sortType = c.none
		}
	}
	var e = /[\$,%]/g;
	if (!this.convert) {
		var b, a = this.dateFormat;
		switch (this.type) {
			case "" :
			case "auto" :
			case undefined :
				b = function(g) {
					return g
				};
				break;
			case "string" :
				b = function(g) {
					return (g === undefined || g === null) ? "" : String(g)
				};
				break;
			case "int" :
				b = function(g) {
					return g !== undefined && g !== null && g !== ""
							? parseInt(String(g).replace(e, ""), 10)
							: ""
				};
				break;
			case "float" :
				b = function(g) {
					return g !== undefined && g !== null && g !== ""
							? parseFloat(String(g).replace(e, ""), 10)
							: ""
				};
				break;
			case "bool" :
			case "boolean" :
				b = function(g) {
					return g === true || g === "true" || g == 1
				};
				break;
			case "date" :
				b = function(h) {
					if (!h) {
						return ""
					}
					if (Ext.isDate(h)) {
						return h
					}
					if (a) {
						if (a == "timestamp") {
							return new Date(h * 1000)
						}
						if (a == "time") {
							return new Date(parseInt(h, 10))
						}
						return Date.parseDate(h, a)
					}
					var g = Date.parse(h);
					return g ? new Date(g) : null
				};
				break
		}
		this.convert = b
	}
};
Ext.data.Field.prototype = {
	dateFormat : null,
	defaultValue : "",
	mapping : null,
	sortType : null,
	sortDir : "ASC"
};
Ext.data.DataReader = function(a, b) {
	this.meta = a;
	this.recordType = Ext.isArray(b) ? Ext.data.Record.create(b) : b
};
Ext.data.DataReader.prototype = {};
Ext.data.DataProxy = function() {
	this.addEvents("beforeload", "load");
	Ext.data.DataProxy.superclass.constructor.call(this)
};
Ext.extend(Ext.data.DataProxy, Ext.util.Observable);
Ext.data.MemoryProxy = function(a) {
	Ext.data.MemoryProxy.superclass.constructor.call(this);
	this.data = a
};
Ext.extend(Ext.data.MemoryProxy, Ext.data.DataProxy, {
	load : function(h, c, i, d, b) {
		h = h || {};
		var a;
		try {
			a = c.readRecords(this.data)
		} catch (g) {
			this.fireEvent("loadexception", this, b, null, g);
			i.call(d, null, b, false);
			return
		}
		i.call(d, a, b, true)
	},
	update : function(b, a) {
	}
});
Ext.data.HttpProxy = function(a) {
	Ext.data.HttpProxy.superclass.constructor.call(this);
	this.conn = a;
	this.useAjax = !a || !a.events
};
Ext.extend(Ext.data.HttpProxy, Ext.data.DataProxy, {
	getConnection : function() {
		return this.useAjax ? Ext.Ajax : this.conn
	},
	load : function(e, b, g, c, a) {
		if (this.fireEvent("beforeload", this, e) !== false) {
			var d = {
				params : e || {},
				request : {
					callback : g,
					scope : c,
					arg : a
				},
				reader : b,
				callback : this.loadResponse,
				scope : this
			};
			if (this.useAjax) {
				Ext.applyIf(d, this.conn);
				if (this.activeRequest) {
					Ext.Ajax.abort(this.activeRequest)
				}
				this.activeRequest = Ext.Ajax.request(d)
			} else {
				this.conn.request(d)
			}
		} else {
			g.call(c || this, null, a, false)
		}
	},
	loadResponse : function(g, d, b) {
		delete this.activeRequest;
		if (!d) {
			this.fireEvent("loadexception", this, g, b);
			g.request.callback
					.call(g.request.scope, null, g.request.arg, false);
			return
		}
		var a;
		try {
			a = g.reader.read(b)
		} catch (c) {
			this.fireEvent("loadexception", this, g, b, c);
			g.request.callback
					.call(g.request.scope, null, g.request.arg, false);
			return
		}
		this.fireEvent("load", this, g, g.request.arg);
		g.request.callback.call(g.request.scope, a, g.request.arg, true)
	},
	update : function(a) {
	},
	updateResponse : function(a) {
	}
});
Ext.data.ScriptTagProxy = function(a) {
	Ext.data.ScriptTagProxy.superclass.constructor.call(this);
	Ext.apply(this, a);
	this.head = document.getElementsByTagName("head")[0]
};
Ext.data.ScriptTagProxy.TRANS_ID = 1000;
Ext.extend(Ext.data.ScriptTagProxy, Ext.data.DataProxy, {
	timeout : 30000,
	callbackParam : "callback",
	nocache : true,
	load : function(e, g, i, k, l) {
		if (this.fireEvent("beforeload", this, e) !== false) {
			var c = Ext.urlEncode(Ext.apply(e, this.extraParams));
			var b = this.url;
			b += (b.indexOf("?") != -1 ? "&" : "?") + c;
			if (this.nocache) {
				b += "&_dc=" + (new Date().getTime())
			}
			var a = ++Ext.data.ScriptTagProxy.TRANS_ID;
			var m = {
				id : a,
				cb : "stcCallback" + a,
				scriptId : "stcScript" + a,
				params : e,
				arg : l,
				url : b,
				callback : i,
				scope : k,
				reader : g
			};
			var d = this;
			window[m.cb] = function(n) {
				d.handleResponse(n, m)
			};
			b += String.format("&{0}={1}", this.callbackParam, m.cb);
			if (this.autoAbort !== false) {
				this.abort()
			}
			m.timeoutId = this.handleFailure.defer(this.timeout, this, [m]);
			var h = document.createElement("script");
			h.setAttribute("src", b);
			h.setAttribute("type", "text/javascript");
			h.setAttribute("id", m.scriptId);
			this.head.appendChild(h);
			this.trans = m
		} else {
			i.call(k || this, null, l, false)
		}
	},
	isLoading : function() {
		return this.trans ? true : false
	},
	abort : function() {
		if (this.isLoading()) {
			this.destroyTrans(this.trans)
		}
	},
	destroyTrans : function(b, a) {
		this.head.removeChild(document.getElementById(b.scriptId));
		clearTimeout(b.timeoutId);
		if (a) {
			window[b.cb] = undefined;
			try {
				delete window[b.cb]
			} catch (c) {
			}
		} else {
			window[b.cb] = function() {
				window[b.cb] = undefined;
				try {
					delete window[b.cb]
				} catch (d) {
				}
			}
		}
	},
	handleResponse : function(d, b) {
		this.trans = false;
		this.destroyTrans(b, true);
		var a;
		try {
			a = b.reader.readRecords(d)
		} catch (c) {
			this.fireEvent("loadexception", this, d, b.arg, c);
			b.callback.call(b.scope || window, null, b.arg, false);
			return
		}
		this.fireEvent("load", this, d, b.arg);
		b.callback.call(b.scope || window, a, b.arg, true)
	},
	handleFailure : function(a) {
		this.trans = false;
		this.destroyTrans(a, false);
		this.fireEvent("loadexception", this, null, a.arg);
		a.callback.call(a.scope || window, null, a.arg, false)
	}
});
Ext.data.JsonReader = function(a, b) {
	a = a || {};
	Ext.data.JsonReader.superclass.constructor.call(this, a, b || a.fields)
};
Ext
		.extend(
				Ext.data.JsonReader,
				Ext.data.DataReader,
				{
					read : function(response) {
						var json = response.responseText;
						var o = eval("(" + json + ")");
						if (!o) {
							throw {
								message : "JsonReader.read: Json object not found"
							}
						}
						return this.readRecords(o)
					},
					onMetaChange : function(a, c, b) {
					},
					simpleAccess : function(b, a) {
						return b[a]
					},
					getJsonAccessor : function() {
						var a = /[\[\.]/;
						return function(c) {
							try {
								return (a.test(c)) ? new Function("obj",
										"return obj." + c) : function(d) {
									return d[c]
								}
							} catch (b) {
							}
							return Ext.emptyFn
						}
					}(),
					readRecords : function(r) {
						this.jsonData = r;
						if (r.metaData) {
							delete this.ef;
							this.meta = r.metaData;
							this.recordType = Ext.data.Record
									.create(r.metaData.fields);
							this.onMetaChange(this.meta, this.recordType, r)
						}
						var m = this.meta, a = this.recordType, A = a.prototype.fields, k = A.items, h = A.length;
						if (!this.ef) {
							if (m.totalProperty) {
								this.getTotal = this
										.getJsonAccessor(m.totalProperty)
							}
							if (m.successProperty) {
								this.getSuccess = this
										.getJsonAccessor(m.successProperty)
							}
							this.getRoot = m.root ? this
									.getJsonAccessor(m.root) : function(c) {
								return c
							};
							if (m.id) {
								var z = this.getJsonAccessor(m.id);
								this.getId = function(g) {
									var c = z(g);
									return (c === undefined || c === "")
											? null
											: c
								}
							} else {
								this.getId = function() {
									return null
								}
							}
							this.ef = [];
							for (var x = 0;x < h; x++) {
								A = k[x];
								var C = (A.mapping !== undefined && A.mapping !== null)
										? A.mapping
										: A.name;
								this.ef[x] = this.getJsonAccessor(C)
							}
						}
						var u = this.getRoot(r), B = u.length, p = B, e = true;
						if (m.totalProperty) {
							var l = parseInt(this.getTotal(r), 10);
							if (!isNaN(l)) {
								p = l
							}
						}
						if (m.successProperty) {
							var l = this.getSuccess(r);
							if (l === false || l === "false") {
								e = false
							}
						}
						var y = [];
						for (var x = 0;x < B; x++) {
							var t = u[x];
							var b = {};
							var q = this.getId(t);
							for (var w = 0;w < h; w++) {
								A = k[w];
								var l = this.ef[w](t);
								b[A.name] = A.convert((l !== undefined)
										? l
										: A.defaultValue, t)
							}
							var d = new a(b, q);
							d.json = t;
							y[x] = d
						}
						return {
							success : e,
							records : y,
							totalRecords : p
						}
					}
				});
Ext.data.XmlReader = function(a, b) {
	a = a || {};
	Ext.data.XmlReader.superclass.constructor.call(this, a, b || a.fields)
};
Ext.extend(Ext.data.XmlReader, Ext.data.DataReader, {
	read : function(a) {
		var b = a.responseXML;
		if (!b) {
			throw {
				message : "XmlReader.read: XML Document not available"
			}
		}
		return this.readRecords(b)
	},
	readRecords : function(z) {
		this.xmlData = z;
		var s = z.documentElement || z;
		var l = Ext.DomQuery;
		var b = this.recordType, p = b.prototype.fields;
		var d = this.meta.id;
		var h = 0, e = true;
		if (this.meta.totalRecords) {
			h = l.selectNumber(this.meta.totalRecords, s, 0)
		}
		if (this.meta.success) {
			var o = l.selectValue(this.meta.success, s, true);
			e = o !== false && o !== "false"
		}
		var w = [];
		var A = l.select(this.meta.record, s);
		for (var u = 0, x = A.length;u < x; u++) {
			var r = A[u];
			var a = {};
			var m = d ? l.selectValue(d, r) : undefined;
			for (var t = 0, k = p.length;t < k; t++) {
				var y = p.items[t];
				var g = l.selectValue(y.mapping || y.name, r, y.defaultValue);
				g = y.convert(g, r);
				a[y.name] = g
			}
			var c = new b(a, m);
			c.node = r;
			w[w.length] = c
		}
		return {
			success : e,
			records : w,
			totalRecords : h || w.length
		}
	}
});
Ext.data.ArrayReader = Ext.extend(Ext.data.JsonReader, {
	readRecords : function(c) {
		var b = this.meta ? this.meta.id : null;
		var h = this.recordType, q = h.prototype.fields;
		var e = [];
		var s = c;
		for (var m = 0;m < s.length; m++) {
			var d = s[m];
			var u = {};
			var a = ((b || b === 0) && d[b] !== undefined && d[b] !== ""
					? d[b]
					: null);
			for (var l = 0, w = q.length;l < w; l++) {
				var r = q.items[l];
				var g = r.mapping !== undefined && r.mapping !== null
						? r.mapping
						: l;
				var t = d[g] !== undefined ? d[g] : r.defaultValue;
				t = r.convert(t, d);
				u[r.name] = t
			}
			var p = new h(u, a);
			p.json = d;
			e[e.length] = p
		}
		return {
			records : e,
			totalRecords : e.length
		}
	}
});
Ext.data.Tree = function(a) {
	this.nodeHash = {};
	this.root = null;
	if (a) {
		this.setRootNode(a)
	}
	this.addEvents("append", "remove", "move", "insert", "beforeappend",
			"beforeremove", "beforemove", "beforeinsert");
	Ext.data.Tree.superclass.constructor.call(this)
};
Ext.extend(Ext.data.Tree, Ext.util.Observable, {
	pathSeparator : "/",
	proxyNodeEvent : function() {
		return this.fireEvent.apply(this, arguments)
	},
	getRootNode : function() {
		return this.root
	},
	setRootNode : function(a) {
		this.root = a;
		a.ownerTree = this;
		a.isRoot = true;
		this.registerNode(a);
		return a
	},
	getNodeById : function(a) {
		return this.nodeHash[a]
	},
	registerNode : function(a) {
		this.nodeHash[a.id] = a
	},
	unregisterNode : function(a) {
		delete this.nodeHash[a.id]
	},
	toString : function() {
		return "[Tree" + (this.id ? " " + this.id : "") + "]"
	}
});
Ext.data.Node = function(a) {
	this.attributes = a || {};
	this.leaf = this.attributes.leaf;
	this.id = this.attributes.id;
	if (!this.id) {
		this.id = Ext.id(null, "ynode-");
		this.attributes.id = this.id
	}
	this.childNodes = [];
	if (!this.childNodes.indexOf) {
		this.childNodes.indexOf = function(d) {
			for (var c = 0, b = this.length;c < b; c++) {
				if (this[c] == d) {
					return c
				}
			}
			return -1
		}
	}
	this.parentNode = null;
	this.firstChild = null;
	this.lastChild = null;
	this.previousSibling = null;
	this.nextSibling = null;
	this.addEvents( {
		append : true,
		remove : true,
		move : true,
		insert : true,
		beforeappend : true,
		beforeremove : true,
		beforemove : true,
		beforeinsert : true
	});
	this.listeners = this.attributes.listeners;
	Ext.data.Node.superclass.constructor.call(this)
};
Ext
		.extend(
				Ext.data.Node,
				Ext.util.Observable,
				{
					fireEvent : function(b) {
						if (Ext.data.Node.superclass.fireEvent.apply(this,
								arguments) === false) {
							return false
						}
						var a = this.getOwnerTree();
						if (a) {
							if (a.proxyNodeEvent.apply(a, arguments) === false) {
								return false
							}
						}
						return true
					},
					isLeaf : function() {
						return this.leaf === true
					},
					setFirstChild : function(a) {
						this.firstChild = a
					},
					setLastChild : function(a) {
						this.lastChild = a
					},
					isLast : function() {
						return (!this.parentNode
								? true
								: this.parentNode.lastChild == this)
					},
					isFirst : function() {
						return (!this.parentNode
								? true
								: this.parentNode.firstChild == this)
					},
					hasChildNodes : function() {
						return !this.isLeaf() && this.childNodes.length > 0
					},
					isExpandable : function() {
						return this.attributes.expandable
								|| this.hasChildNodes()
					},
					appendChild : function(e) {
						var g = false;
						if (Ext.isArray(e)) {
							g = e
						} else {
							if (arguments.length > 1) {
								g = arguments
							}
						}
						if (g) {
							for (var d = 0, a = g.length;d < a; d++) {
								this.appendChild(g[d])
							}
						} else {
							if (this.fireEvent("beforeappend", this.ownerTree,
									this, e) === false) {
								return false
							}
							var b = this.childNodes.length;
							var c = e.parentNode;
							if (c) {
								if (e.fireEvent("beforemove", e.getOwnerTree(),
										e, c, this, b) === false) {
									return false
								}
								c.removeChild(e)
							}
							b = this.childNodes.length;
							if (b == 0) {
								this.setFirstChild(e)
							}
							this.childNodes.push(e);
							e.parentNode = this;
							var h = this.childNodes[b - 1];
							if (h) {
								e.previousSibling = h;
								h.nextSibling = e
							} else {
								e.previousSibling = null
							}
							e.nextSibling = null;
							this.setLastChild(e);
							e.setOwnerTree(this.getOwnerTree());
							this
									.fireEvent("append", this.ownerTree, this,
											e, b);
							if (c) {
								e.fireEvent("move", this.ownerTree, e, c, this,
										b)
							}
							return e
						}
					},
					removeChild : function(b) {
						var a = this.childNodes.indexOf(b);
						if (a == -1) {
							return false
						}
						if (this.fireEvent("beforeremove", this.ownerTree,
								this, b) === false) {
							return false
						}
						this.childNodes.splice(a, 1);
						if (b.previousSibling) {
							b.previousSibling.nextSibling = b.nextSibling
						}
						if (b.nextSibling) {
							b.nextSibling.previousSibling = b.previousSibling
						}
						if (this.firstChild == b) {
							this.setFirstChild(b.nextSibling)
						}
						if (this.lastChild == b) {
							this.setLastChild(b.previousSibling)
						}
						b.setOwnerTree(null);
						b.parentNode = null;
						b.previousSibling = null;
						b.nextSibling = null;
						this.fireEvent("remove", this.ownerTree, this, b);
						return b
					},
					insertBefore : function(d, a) {
						if (!a) {
							return this.appendChild(d)
						}
						if (d == a) {
							return false
						}
						if (this.fireEvent("beforeinsert", this.ownerTree,
								this, d, a) === false) {
							return false
						}
						var b = this.childNodes.indexOf(a);
						var c = d.parentNode;
						var e = b;
						if (c == this && this.childNodes.indexOf(d) < b) {
							e--
						}
						if (c) {
							if (d.fireEvent("beforemove", d.getOwnerTree(), d,
									c, this, b, a) === false) {
								return false
							}
							c.removeChild(d)
						}
						if (e == 0) {
							this.setFirstChild(d)
						}
						this.childNodes.splice(e, 0, d);
						d.parentNode = this;
						var g = this.childNodes[e - 1];
						if (g) {
							d.previousSibling = g;
							g.nextSibling = d
						} else {
							d.previousSibling = null
						}
						d.nextSibling = a;
						a.previousSibling = d;
						d.setOwnerTree(this.getOwnerTree());
						this.fireEvent("insert", this.ownerTree, this, d, a);
						if (c) {
							d.fireEvent("move", this.ownerTree, d, c, this, e,
									a)
						}
						return d
					},
					remove : function() {
						this.parentNode.removeChild(this);
						return this
					},
					item : function(a) {
						return this.childNodes[a]
					},
					replaceChild : function(a, c) {
						var b = c ? c.nextSibling : null;
						this.removeChild(c);
						this.insertBefore(a, b);
						return c
					},
					indexOf : function(a) {
						return this.childNodes.indexOf(a)
					},
					getOwnerTree : function() {
						if (!this.ownerTree) {
							var a = this;
							while (a) {
								if (a.ownerTree) {
									this.ownerTree = a.ownerTree;
									break
								}
								a = a.parentNode
							}
						}
						return this.ownerTree
					},
					getDepth : function() {
						var b = 0;
						var a = this;
						while (a.parentNode) {
							++b;
							a = a.parentNode
						}
						return b
					},
					setOwnerTree : function(b) {
						if (b != this.ownerTree) {
							if (this.ownerTree) {
								this.ownerTree.unregisterNode(this)
							}
							this.ownerTree = b;
							var d = this.childNodes;
							for (var c = 0, a = d.length;c < a; c++) {
								d[c].setOwnerTree(b)
							}
							if (b) {
								b.registerNode(this)
							}
						}
					},
					getPath : function(c) {
						c = c || "id";
						var e = this.parentNode;
						var a = [this.attributes[c]];
						while (e) {
							a.unshift(e.attributes[c]);
							e = e.parentNode
						}
						var d = this.getOwnerTree().pathSeparator;
						return d + a.join(d)
					},
					bubble : function(c, b, a) {
						var d = this;
						while (d) {
							if (c.apply(b || d, a || [d]) === false) {
								break
							}
							d = d.parentNode
						}
					},
					cascade : function(g, e, b) {
						if (g.apply(e || this, b || [this]) !== false) {
							var d = this.childNodes;
							for (var c = 0, a = d.length;c < a; c++) {
								d[c].cascade(g, e, b)
							}
						}
					},
					eachChild : function(g, e, b) {
						var d = this.childNodes;
						for (var c = 0, a = d.length;c < a; c++) {
							if (g.apply(e || this, b || [d[c]]) === false) {
								break
							}
						}
					},
					findChild : function(d, e) {
						var c = this.childNodes;
						for (var b = 0, a = c.length;b < a; b++) {
							if (c[b].attributes[d] == e) {
								return c[b]
							}
						}
						return null
					},
					findChildBy : function(e, d) {
						var c = this.childNodes;
						for (var b = 0, a = c.length;b < a; b++) {
							if (e.call(d || c[b], c[b]) === true) {
								return c[b]
							}
						}
						return null
					},
					sort : function(e, d) {
						var c = this.childNodes;
						var a = c.length;
						if (a > 0) {
							var g = d ? function() {
								e.apply(d, arguments)
							} : e;
							c.sort(g);
							for (var b = 0;b < a; b++) {
								var h = c[b];
								h.previousSibling = c[b - 1];
								h.nextSibling = c[b + 1];
								if (b == 0) {
									this.setFirstChild(h)
								}
								if (b == a - 1) {
									this.setLastChild(h)
								}
							}
						}
					},
					contains : function(a) {
						return a.isAncestor(this)
					},
					isAncestor : function(a) {
						var b = this.parentNode;
						while (b) {
							if (b == a) {
								return true
							}
							b = b.parentNode
						}
						return false
					},
					toString : function() {
						return "[Node" + (this.id ? " " + this.id : "") + "]"
					}
				});
Ext.data.GroupingStore = Ext.extend(Ext.data.Store, {
	remoteGroup : false,
	groupOnSort : false,
	clearGrouping : function() {
		this.groupField = false;
		if (this.remoteGroup) {
			if (this.baseParams) {
				delete this.baseParams.groupBy
			}
			this.reload()
		} else {
			this.applySort();
			this.fireEvent("datachanged", this)
		}
	},
	groupBy : function(c, b) {
		if (this.groupField == c && !b) {
			return
		}
		this.groupField = c;
		if (this.remoteGroup) {
			if (!this.baseParams) {
				this.baseParams = {}
			}
			this.baseParams.groupBy = c
		}
		if (this.groupOnSort) {
			this.sort(c);
			return
		}
		if (this.remoteGroup) {
			this.reload()
		} else {
			var a = this.sortInfo || {};
			if (a.field != c) {
				this.applySort()
			} else {
				this.sortData(c)
			}
			this.fireEvent("datachanged", this)
		}
	},
	applySort : function() {
		Ext.data.GroupingStore.superclass.applySort.call(this);
		if (!this.groupOnSort && !this.remoteGroup) {
			var a = this.getGroupState();
			if (a && a != this.sortInfo.field) {
				this.sortData(this.groupField)
			}
		}
	},
	applyGrouping : function(a) {
		if (this.groupField !== false) {
			this.groupBy(this.groupField, true);
			return true
		} else {
			if (a === true) {
				this.fireEvent("datachanged", this)
			}
			return false
		}
	},
	getGroupState : function() {
		return this.groupOnSort && this.groupField !== false ? (this.sortInfo
				? this.sortInfo.field
				: undefined) : this.groupField
	}
});
Ext.ComponentMgr = function() {
	var b = new Ext.util.MixedCollection();
	var a = {};
	return {
		register : function(d) {
			b.add(d)
		},
		unregister : function(d) {
			b.remove(d)
		},
		get : function(c) {
			return b.get(c)
		},
		onAvailable : function(e, d, c) {
			b.on("add", function(g, h) {
				if (h.id == e) {
					d.call(c || h, h);
					b.un("add", d, c)
				}
			})
		},
		all : b,
		registerType : function(d, c) {
			a[d] = c;
			c.xtype = d
		},
		create : function(c, d) {
			return new a[c.xtype || d](c)
		}
	}
}();
Ext.reg = Ext.ComponentMgr.registerType;
Ext.Component = function(b) {
	b = b || {};
	if (b.initialConfig) {
		if (b.isAction) {
			this.baseAction = b
		}
		b = b.initialConfig
	} else {
		if (b.tagName || b.dom || typeof b == "string") {
			b = {
				applyTo : b,
				id : b.id || b
			}
		}
	}
	this.initialConfig = b;
	Ext.apply(this, b);
	this.addEvents("disable", "enable", "beforeshow", "show", "beforehide",
			"hide", "beforerender", "render", "beforedestroy", "destroy",
			"beforestaterestore", "staterestore", "beforestatesave",
			"statesave");
	this.getId();
	Ext.ComponentMgr.register(this);
	Ext.Component.superclass.constructor.call(this);
	if (this.baseAction) {
		this.baseAction.addComponent(this)
	}
	this.initComponent();
	if (this.plugins) {
		if (Ext.isArray(this.plugins)) {
			for (var c = 0, a = this.plugins.length;c < a; c++) {
				this.plugins[c] = this.initPlugin(this.plugins[c])
			}
		} else {
			this.plugins = this.initPlugin(this.plugins)
		}
	}
	if (this.stateful !== false) {
		this.initState(b)
	}
	if (this.applyTo) {
		this.applyToMarkup(this.applyTo);
		delete this.applyTo
	} else {
		if (this.renderTo) {
			this.render(this.renderTo);
			delete this.renderTo
		}
	}
};
Ext.Component.AUTO_ID = 1000;
Ext
		.extend(
				Ext.Component,
				Ext.util.Observable,
				{
					disabledClass : "x-item-disabled",
					allowDomMove : true,
					autoShow : false,
					hideMode : "display",
					hideParent : false,
					hidden : false,
					disabled : false,
					rendered : false,
					ctype : "Ext.Component",
					actionMode : "el",
					getActionEl : function() {
						return this[this.actionMode]
					},
					initPlugin : function(a) {
						a.init(this);
						return a
					},
					initComponent : Ext.emptyFn,
					render : function(b, a) {
						if (!this.rendered
								&& this.fireEvent("beforerender", this) !== false) {
							if (!b && this.el) {
								this.el = Ext.get(this.el);
								b = this.el.dom.parentNode;
								this.allowDomMove = false
							}
							this.container = Ext.get(b);
							if (this.ctCls) {
								this.container.addClass(this.ctCls)
							}
							this.rendered = true;
							if (a !== undefined) {
								if (typeof a == "number") {
									a = this.container.dom.childNodes[a]
								} else {
									a = Ext.getDom(a)
								}
							}
							this.onRender(this.container, a || null);
							if (this.autoShow) {
								this.el.removeClass(["x-hidden",
										"x-hide-" + this.hideMode])
							}
							if (this.cls) {
								this.el.addClass(this.cls);
								delete this.cls
							}
							if (this.style) {
								this.el.applyStyles(this.style);
								delete this.style
							}
							if (this.overCls) {
								this.el.addClassOnOver(this.overCls)
							}
							this.fireEvent("render", this);
							this.afterRender(this.container);
							if (this.hidden) {
								this.hide()
							}
							if (this.disabled) {
								this.disable()
							}
							if (this.stateful !== false) {
								this.initStateEvents()
							}
						}
						return this
					},
					initState : function(a) {
						if (Ext.state.Manager) {
							var c = this.getStateId();
							if (c) {
								var b = Ext.state.Manager.get(c);
								if (b) {
									if (this.fireEvent("beforestaterestore",
											this, b) !== false) {
										this.applyState(b);
										this.fireEvent("staterestore", this, b)
									}
								}
							}
						}
					},
					getStateId : function() {
						return this.stateId
								|| ((this.id.indexOf("ext-comp-") == 0 || this.id
										.indexOf("ext-gen") == 0)
										? null
										: this.id)
					},
					initStateEvents : function() {
						if (this.stateEvents) {
							for (var a = 0, b;b = this.stateEvents[a]; a++) {
								this.on(b, this.saveState, this, {
									delay : 100
								})
							}
						}
					},
					applyState : function(b, a) {
						if (b) {
							Ext.apply(this, b)
						}
					},
					getState : function() {
						return null
					},
					saveState : function() {
						if (Ext.state.Manager) {
							var b = this.getStateId();
							if (b) {
								var a = this.getState();
								if (this.fireEvent("beforestatesave", this, a) !== false) {
									Ext.state.Manager.set(b, a);
									this.fireEvent("statesave", this, a)
								}
							}
						}
					},
					applyToMarkup : function(a) {
						this.allowDomMove = false;
						this.el = Ext.get(a);
						this.render(this.el.dom.parentNode)
					},
					addClass : function(a) {
						if (this.el) {
							this.el.addClass(a)
						} else {
							this.cls = this.cls ? this.cls + " " + a : a
						}
					},
					removeClass : function(a) {
						if (this.el) {
							this.el.removeClass(a)
						} else {
							if (this.cls) {
								this.cls = this.cls.split(" ").remove(a)
										.join(" ")
							}
						}
					},
					onRender : function(b, a) {
						if (this.autoEl) {
							if (typeof this.autoEl == "string") {
								this.el = document.createElement(this.autoEl)
							} else {
								var c = document.createElement("div");
								Ext.DomHelper.overwrite(c, this.autoEl);
								this.el = c.firstChild
							}
							if (!this.el.id) {
								this.el.id = this.getId()
							}
						}
						if (this.el) {
							this.el = Ext.get(this.el);
							if (this.allowDomMove !== false) {
								b.dom.insertBefore(this.el.dom, a)
							}
						}
					},
					getAutoCreate : function() {
						var a = typeof this.autoCreate == "object"
								? this.autoCreate
								: Ext.apply( {}, this.defaultAutoCreate);
						if (this.id && !a.id) {
							a.id = this.id
						}
						return a
					},
					afterRender : Ext.emptyFn,
					destroy : function() {
						if (this.fireEvent("beforedestroy", this) !== false) {
							this.beforeDestroy();
							if (this.rendered) {
								this.el.removeAllListeners();
								this.el.remove();
								if (this.actionMode == "container") {
									this.container.remove()
								}
							}
							this.onDestroy();
							Ext.ComponentMgr.unregister(this);
							this.fireEvent("destroy", this);
							this.purgeListeners()
						}
					},
					beforeDestroy : Ext.emptyFn,
					onDestroy : Ext.emptyFn,
					getEl : function() {
						return this.el
					},
					getId : function() {
						return this.id
								|| (this.id = "ext-comp-"
										+ (++Ext.Component.AUTO_ID))
					},
					getItemId : function() {
						return this.itemId || this.getId()
					},
					focus : function(b, a) {
						if (a) {
							this.focus.defer(typeof a == "number" ? a : 10,
									this, [b, false]);
							return
						}
						if (this.rendered) {
							this.el.focus();
							if (b === true) {
								this.el.dom.select()
							}
						}
						return this
					},
					blur : function() {
						if (this.rendered) {
							this.el.blur()
						}
						return this
					},
					disable : function() {
						if (this.rendered) {
							this.onDisable()
						}
						this.disabled = true;
						this.fireEvent("disable", this);
						return this
					},
					onDisable : function() {
						this.getActionEl().addClass(this.disabledClass);
						this.el.dom.disabled = true
					},
					enable : function() {
						if (this.rendered) {
							this.onEnable()
						}
						this.disabled = false;
						this.fireEvent("enable", this);
						return this
					},
					onEnable : function() {
						this.getActionEl().removeClass(this.disabledClass);
						this.el.dom.disabled = false
					},
					setDisabled : function(a) {
						this[a ? "disable" : "enable"]()
					},
					show : function() {
						if (this.fireEvent("beforeshow", this) !== false) {
							this.hidden = false;
							if (this.autoRender) {
								this.render(typeof this.autoRender == "boolean"
										? Ext.getBody()
										: this.autoRender)
							}
							if (this.rendered) {
								this.onShow()
							}
							this.fireEvent("show", this)
						}
						return this
					},
					onShow : function() {
						if (this.hideParent) {
							this.container.removeClass("x-hide-"
									+ this.hideMode)
						} else {
							this.getActionEl().removeClass("x-hide-"
									+ this.hideMode)
						}
					},
					hide : function() {
						if (this.fireEvent("beforehide", this) !== false) {
							this.hidden = true;
							if (this.rendered) {
								this.onHide()
							}
							this.fireEvent("hide", this)
						}
						return this
					},
					onHide : function() {
						if (this.hideParent) {
							this.container.addClass("x-hide-" + this.hideMode)
						} else {
							this.getActionEl().addClass("x-hide-"
									+ this.hideMode)
						}
					},
					setVisible : function(a) {
						if (a) {
							this.show()
						} else {
							this.hide()
						}
						return this
					},
					isVisible : function() {
						return this.rendered && this.getActionEl().isVisible()
					},
					cloneConfig : function(b) {
						b = b || {};
						var c = b.id || Ext.id();
						var a = Ext.applyIf(b, this.initialConfig);
						a.id = c;
						return new this.constructor(a)
					},
					getXType : function() {
						return this.constructor.xtype
					},
					isXType : function(b, a) {
						if (typeof b == "function") {
							b = b.xtype
						} else {
							if (typeof b == "object") {
								b = b.constructor.xtype
							}
						}
						return !a ? ("/" + this.getXTypes() + "/").indexOf("/"
								+ b + "/") != -1 : this.constructor.xtype == b
					},
					getXTypes : function() {
						var a = this.constructor;
						if (!a.xtypes) {
							var d = [], b = this;
							while (b && b.constructor.xtype) {
								d.unshift(b.constructor.xtype);
								b = b.constructor.superclass
							}
							a.xtypeChain = d;
							a.xtypes = d.join("/")
						}
						return a.xtypes
					},
					findParentBy : function(a) {
						for (var b = this.ownerCt;(b != null) && !a(b, this); b = b.ownerCt) {
						}
						return b || null
					},
					findParentByType : function(a) {
						return typeof a == "function" ? this
								.findParentBy(function(b) {
									return b.constructor === a
								}) : this.findParentBy(function(b) {
							return b.constructor.xtype === a
						})
					},
					mon : function(e, b, d, c, a) {
						if (!this.mons) {
							this.mons = [];
							this
									.on(
											"beforedestroy",
											function() {
												for (var k = 0, h = this.mons.length;k < h; k++) {
													var g = this.mons[k];
													g.item.un(g.ename, g.fn,
															g.scope)
												}
											}, this)
						}
						this.mons.push( {
							item : e,
							ename : b,
							fn : d,
							scope : c
						});
						e.on(b, d, c, a)
					}
				});
Ext.reg("component", Ext.Component);
Ext.Action = function(a) {
	this.initialConfig = a;
	this.items = []
};
Ext.Action.prototype = {
	isAction : true,
	setText : function(a) {
		this.initialConfig.text = a;
		this.callEach("setText", [a])
	},
	getText : function() {
		return this.initialConfig.text
	},
	setIconClass : function(a) {
		this.initialConfig.iconCls = a;
		this.callEach("setIconClass", [a])
	},
	getIconClass : function() {
		return this.initialConfig.iconCls
	},
	setDisabled : function(a) {
		this.initialConfig.disabled = a;
		this.callEach("setDisabled", [a])
	},
	enable : function() {
		this.setDisabled(false)
	},
	disable : function() {
		this.setDisabled(true)
	},
	isDisabled : function() {
		return this.initialConfig.disabled
	},
	setHidden : function(a) {
		this.initialConfig.hidden = a;
		this.callEach("setVisible", [!a])
	},
	show : function() {
		this.setHidden(false)
	},
	hide : function() {
		this.setHidden(true)
	},
	isHidden : function() {
		return this.initialConfig.hidden
	},
	setHandler : function(b, a) {
		this.initialConfig.handler = b;
		this.initialConfig.scope = a;
		this.callEach("setHandler", [b, a])
	},
	each : function(b, a) {
		Ext.each(this.items, b, a)
	},
	callEach : function(e, b) {
		var d = this.items;
		for (var c = 0, a = d.length;c < a; c++) {
			d[c][e].apply(d[c], b)
		}
	},
	addComponent : function(a) {
		this.items.push(a);
		a.on("destroy", this.removeComponent, this)
	},
	removeComponent : function(a) {
		this.items.remove(a)
	},
	execute : function() {
		this.initialConfig.handler.apply(this.initialConfig.scope || window,
				arguments)
	}
};
(function() {
	Ext.Layer = function(d, c) {
		d = d || {};
		var e = Ext.DomHelper;
		var h = d.parentEl, g = h ? Ext.getDom(h) : document.body;
		if (c) {
			this.dom = Ext.getDom(c)
		}
		if (!this.dom) {
			var i = d.dh || {
				tag : "div",
				cls : "x-layer"
			};
			this.dom = e.append(g, i)
		}
		if (d.cls) {
			this.addClass(d.cls)
		}
		this.constrain = d.constrain !== false;
		this.visibilityMode = Ext.Element.VISIBILITY;
		if (d.id) {
			this.id = this.dom.id = d.id
		} else {
			this.id = Ext.id(this.dom)
		}
		this.zindex = d.zindex || this.getZIndex();
		this.position("absolute", this.zindex);
		if (d.shadow) {
			this.shadowOffset = d.shadowOffset || 4;
			this.shadow = new Ext.Shadow( {
				offset : this.shadowOffset,
				mode : d.shadow
			})
		} else {
			this.shadowOffset = 0
		}
		this.useShim = d.shim !== false && Ext.useShims;
		this.useDisplay = d.useDisplay;
		this.hide()
	};
	var a = Ext.Element.prototype;
	var b = [];
	Ext
			.extend(
					Ext.Layer,
					Ext.Element,
					{
						getZIndex : function() {
							return this.zindex
									|| parseInt(this.getStyle("z-index"), 10)
									|| 11000
						},
						getShim : function() {
							if (!this.useShim) {
								return null
							}
							if (this.shim) {
								return this.shim
							}
							var d = b.shift();
							if (!d) {
								d = this.createShim();
								d.enableDisplayMode("block");
								d.dom.style.display = "none";
								d.dom.style.visibility = "visible"
							}
							var c = this.dom.parentNode;
							if (d.dom.parentNode != c) {
								c.insertBefore(d.dom, this.dom)
							}
							d.setStyle("z-index", this.getZIndex() - 2);
							this.shim = d;
							return d
						},
						hideShim : function() {
							if (this.shim) {
								this.shim.setDisplayed(false);
								b.push(this.shim);
								delete this.shim
							}
						},
						disableShadow : function() {
							if (this.shadow) {
								this.shadowDisabled = true;
								this.shadow.hide();
								this.lastShadowOffset = this.shadowOffset;
								this.shadowOffset = 0
							}
						},
						enableShadow : function(c) {
							if (this.shadow) {
								this.shadowDisabled = false;
								this.shadowOffset = this.lastShadowOffset;
								delete this.lastShadowOffset;
								if (c) {
									this.sync(true)
								}
							}
						},
						sync : function(c) {
							var m = this.shadow;
							if (!this.updating && this.isVisible()
									&& (m || this.useShim)) {
								var g = this.getShim();
								var k = this.getWidth(), e = this.getHeight();
								var d = this.getLeft(true), n = this
										.getTop(true);
								if (m && !this.shadowDisabled) {
									if (c && !m.isVisible()) {
										m.show(this)
									} else {
										m.realign(d, n, k, e)
									}
									if (g) {
										if (c) {
											g.show()
										}
										var i = m.adjusts, o = g.dom.style;
										o.left = (Math.min(d, d + i.l)) + "px";
										o.top = (Math.min(n, n + i.t)) + "px";
										o.width = (k + i.w) + "px";
										o.height = (e + i.h) + "px"
									}
								} else {
									if (g) {
										if (c) {
											g.show()
										}
										g.setSize(k, e);
										g.setLeftTop(d, n)
									}
								}
							}
						},
						destroy : function() {
							this.hideShim();
							if (this.shadow) {
								this.shadow.hide()
							}
							this.removeAllListeners();
							Ext.removeNode(this.dom);
							Ext.Element.uncache(this.id)
						},
						remove : function() {
							this.destroy()
						},
						beginUpdate : function() {
							this.updating = true
						},
						endUpdate : function() {
							this.updating = false;
							this.sync(true)
						},
						hideUnders : function(c) {
							if (this.shadow) {
								this.shadow.hide()
							}
							this.hideShim()
						},
						constrainXY : function() {
							if (this.constrain) {
								var i = Ext.lib.Dom.getViewWidth(), c = Ext.lib.Dom
										.getViewHeight();
								var o = Ext.getDoc().getScroll();
								var n = this.getXY();
								var k = n[0], g = n[1];
								var l = this.dom.offsetWidth
										+ this.shadowOffset, d = this.dom.offsetHeight
										+ this.shadowOffset;
								var e = false;
								if ((k + l) > i + o.left) {
									k = i - l - this.shadowOffset;
									e = true
								}
								if ((g + d) > c + o.top) {
									g = c - d - this.shadowOffset;
									e = true
								}
								if (k < o.left) {
									k = o.left;
									e = true
								}
								if (g < o.top) {
									g = o.top;
									e = true
								}
								if (e) {
									if (this.avoidY) {
										var m = this.avoidY;
										if (g <= m && (g + d) >= m) {
											g = m - d - 5
										}
									}
									n = [k, g];
									this.storeXY(n);
									a.setXY.call(this, n);
									this.sync()
								}
							}
						},
						isVisible : function() {
							return this.visible
						},
						showAction : function() {
							this.visible = true;
							if (this.useDisplay === true) {
								this.setDisplayed("")
							} else {
								if (this.lastXY) {
									a.setXY.call(this, this.lastXY)
								} else {
									if (this.lastLT) {
										a.setLeftTop.call(this, this.lastLT[0],
												this.lastLT[1])
									}
								}
							}
						},
						hideAction : function() {
							this.visible = false;
							if (this.useDisplay === true) {
								this.setDisplayed(false)
							} else {
								this.setLeftTop(-10000, -10000)
							}
						},
						setVisible : function(i, h, l, m, k) {
							if (i) {
								this.showAction()
							}
							if (h && i) {
								var g = function() {
									this.sync(true);
									if (m) {
										m()
									}
								}.createDelegate(this);
								a.setVisible.call(this, true, true, l, g, k)
							} else {
								if (!i) {
									this.hideUnders(true)
								}
								var g = m;
								if (h) {
									g = function() {
										this.hideAction();
										if (m) {
											m()
										}
									}.createDelegate(this)
								}
								a.setVisible.call(this, i, h, l, g, k);
								if (i) {
									this.sync(true)
								} else {
									if (!h) {
										this.hideAction()
									}
								}
							}
						},
						storeXY : function(c) {
							delete this.lastLT;
							this.lastXY = c
						},
						storeLeftTop : function(d, c) {
							delete this.lastXY;
							this.lastLT = [d, c]
						},
						beforeFx : function() {
							this.beforeAction();
							return Ext.Layer.superclass.beforeFx.apply(this,
									arguments)
						},
						afterFx : function() {
							Ext.Layer.superclass.afterFx.apply(this, arguments);
							this.sync(this.isVisible())
						},
						beforeAction : function() {
							if (!this.updating && this.shadow) {
								this.shadow.hide()
							}
						},
						setLeft : function(c) {
							this.storeLeftTop(c, this.getTop(true));
							a.setLeft.apply(this, arguments);
							this.sync()
						},
						setTop : function(c) {
							this.storeLeftTop(this.getLeft(true), c);
							a.setTop.apply(this, arguments);
							this.sync()
						},
						setLeftTop : function(d, c) {
							this.storeLeftTop(d, c);
							a.setLeftTop.apply(this, arguments);
							this.sync()
						},
						setXY : function(k, h, l, m, i) {
							this.fixDisplay();
							this.beforeAction();
							this.storeXY(k);
							var g = this.createCB(m);
							a.setXY.call(this, k, h, l, g, i);
							if (!h) {
								g()
							}
						},
						createCB : function(e) {
							var d = this;
							return function() {
								d.constrainXY();
								d.sync(true);
								if (e) {
									e()
								}
							}
						},
						setX : function(g, h, k, l, i) {
							this.setXY([g, this.getY()], h, k, l, i)
						},
						setY : function(l, g, i, k, h) {
							this.setXY([this.getX(), l], g, i, k, h)
						},
						setSize : function(k, l, i, n, o, m) {
							this.beforeAction();
							var g = this.createCB(o);
							a.setSize.call(this, k, l, i, n, g, m);
							if (!i) {
								g()
							}
						},
						setWidth : function(i, h, l, m, k) {
							this.beforeAction();
							var g = this.createCB(m);
							a.setWidth.call(this, i, h, l, g, k);
							if (!h) {
								g()
							}
						},
						setHeight : function(k, i, m, n, l) {
							this.beforeAction();
							var g = this.createCB(n);
							a.setHeight.call(this, k, i, m, g, l);
							if (!i) {
								g()
							}
						},
						setBounds : function(p, n, q, i, o, l, m, k) {
							this.beforeAction();
							var g = this.createCB(m);
							if (!o) {
								this.storeXY([p, n]);
								a.setXY.call(this, [p, n]);
								a.setSize.call(this, q, i, o, l, g, k);
								g()
							} else {
								a.setBounds.call(this, p, n, q, i, o, l, g, k)
							}
							return this
						},
						setZIndex : function(c) {
							this.zindex = c;
							this.setStyle("z-index", c + 2);
							if (this.shadow) {
								this.shadow.setZIndex(c + 1)
							}
							if (this.shim) {
								this.shim.setStyle("z-index", c)
							}
						}
					})
})();
Ext.Shadow = function(d) {
	Ext.apply(this, d);
	if (typeof this.mode != "string") {
		this.mode = this.defaultMode
	}
	var e = this.offset, c = {
		h : 0
	};
	var b = Math.floor(this.offset / 2);
	switch (this.mode.toLowerCase()) {
		case "drop" :
			c.w = 0;
			c.l = c.t = e;
			c.t -= 1;
			if (Ext.isIE) {
				c.l -= this.offset + b;
				c.t -= this.offset + b;
				c.w -= b;
				c.h -= b;
				c.t += 1
			}
			break;
		case "sides" :
			c.w = (e * 2);
			c.l = -e;
			c.t = e - 1;
			if (Ext.isIE) {
				c.l -= (this.offset - b);
				c.t -= this.offset + b;
				c.l += 1;
				c.w -= (this.offset - b) * 2;
				c.w -= b + 1;
				c.h -= 1
			}
			break;
		case "frame" :
			c.w = c.h = (e * 2);
			c.l = c.t = -e;
			c.t += 1;
			c.h -= 2;
			if (Ext.isIE) {
				c.l -= (this.offset - b);
				c.t -= (this.offset - b);
				c.l += 1;
				c.w -= (this.offset + b + 1);
				c.h -= (this.offset + b);
				c.h += 1
			}
			break
	}
	this.adjusts = c
};
Ext.Shadow.prototype = {
	offset : 4,
	defaultMode : "drop",
	show : function(a) {
		a = Ext.get(a);
		if (!this.el) {
			this.el = Ext.Shadow.Pool.pull();
			if (this.el.dom.nextSibling != a.dom) {
				this.el.insertBefore(a)
			}
		}
		this.el.setStyle("z-index", this.zIndex
				|| parseInt(a.getStyle("z-index"), 10) - 1);
		if (Ext.isIE) {
			this.el.dom.style.filter = "progid:DXImageTransform.Microsoft.alpha(opacity=50) progid:DXImageTransform.Microsoft.Blur(pixelradius="
					+ (this.offset) + ")"
		}
		this.realign(a.getLeft(true), a.getTop(true), a.getWidth(), a
				.getHeight());
		this.el.dom.style.display = "block"
	},
	isVisible : function() {
		return this.el ? true : false
	},
	realign : function(b, u, r, g) {
		if (!this.el) {
			return
		}
		var o = this.adjusts, m = this.el.dom, v = m.style;
		var i = 0;
		v.left = (b + o.l) + "px";
		v.top = (u + o.t) + "px";
		var q = (r + o.w), e = (g + o.h), k = q + "px", p = e + "px";
		if (v.width != k || v.height != p) {
			v.width = k;
			v.height = p;
			if (!Ext.isIE) {
				var n = m.childNodes;
				var c = Math.max(0, (q - 12)) + "px";
				n[0].childNodes[1].style.width = c;
				n[1].childNodes[1].style.width = c;
				n[2].childNodes[1].style.width = c;
				n[1].style.height = Math.max(0, (e - 12)) + "px"
			}
		}
	},
	hide : function() {
		if (this.el) {
			this.el.dom.style.display = "none";
			Ext.Shadow.Pool.push(this.el);
			delete this.el
		}
	},
	setZIndex : function(a) {
		this.zIndex = a;
		if (this.el) {
			this.el.setStyle("z-index", a)
		}
	}
};
Ext.Shadow.Pool = function() {
	var b = [];
	var a = Ext.isIE
			? '<div class="x-ie-shadow"></div>'
			: '<div class="x-shadow"><div class="xst"><div class="xstl"></div><div class="xstc"></div><div class="xstr"></div></div><div class="xsc"><div class="xsml"></div><div class="xsmc"></div><div class="xsmr"></div></div><div class="xsb"><div class="xsbl"></div><div class="xsbc"></div><div class="xsbr"></div></div></div>';
	return {
		pull : function() {
			var c = b.shift();
			if (!c) {
				c = Ext.get(Ext.DomHelper.insertHtml("beforeBegin",
						document.body.firstChild, a));
				c.autoBoxAdjust = false
			}
			return c
		},
		push : function(c) {
			b.push(c)
		}
	}
}();
Ext.BoxComponent = Ext.extend(Ext.Component, {
	initComponent : function() {
		Ext.BoxComponent.superclass.initComponent.call(this);
		this.addEvents("resize", "move")
	},
	boxReady : false,
	deferHeight : false,
	setSize : function(b, d) {
		if (typeof b == "object") {
			d = b.height;
			b = b.width
		}
		if (!this.boxReady) {
			this.width = b;
			this.height = d;
			return this
		}
		if (this.lastSize && this.lastSize.width == b
				&& this.lastSize.height == d) {
			return this
		}
		this.lastSize = {
			width : b,
			height : d
		};
		var c = this.adjustSize(b, d);
		var g = c.width, a = c.height;
		if (g !== undefined || a !== undefined) {
			var e = this.getResizeEl();
			if (!this.deferHeight && g !== undefined && a !== undefined) {
				e.setSize(g, a)
			} else {
				if (!this.deferHeight && a !== undefined) {
					e.setHeight(a)
				} else {
					if (g !== undefined) {
						e.setWidth(g)
					}
				}
			}
			this.onResize(g, a, b, d);
			this.fireEvent("resize", this, g, a, b, d)
		}
		return this
	},
	setWidth : function(a) {
		return this.setSize(a)
	},
	setHeight : function(a) {
		return this.setSize(undefined, a)
	},
	getSize : function() {
		return this.el.getSize()
	},
	getPosition : function(a) {
		if (a === true) {
			return [this.el.getLeft(true), this.el.getTop(true)]
		}
		return this.xy || this.el.getXY()
	},
	getBox : function(a) {
		var b = this.el.getSize();
		if (a === true) {
			b.x = this.el.getLeft(true);
			b.y = this.el.getTop(true)
		} else {
			var c = this.xy || this.el.getXY();
			b.x = c[0];
			b.y = c[1]
		}
		return b
	},
	updateBox : function(a) {
		this.setSize(a.width, a.height);
		this.setPagePosition(a.x, a.y);
		return this
	},
	getResizeEl : function() {
		return this.resizeEl || this.el
	},
	getPositionEl : function() {
		return this.positionEl || this.el
	},
	setPosition : function(a, g) {
		if (a && typeof a[1] == "number") {
			g = a[1];
			a = a[0]
		}
		this.x = a;
		this.y = g;
		if (!this.boxReady) {
			return this
		}
		var b = this.adjustPosition(a, g);
		var e = b.x, d = b.y;
		var c = this.getPositionEl();
		if (e !== undefined || d !== undefined) {
			if (e !== undefined && d !== undefined) {
				c.setLeftTop(e, d)
			} else {
				if (e !== undefined) {
					c.setLeft(e)
				} else {
					if (d !== undefined) {
						c.setTop(d)
					}
				}
			}
			this.onPosition(e, d);
			this.fireEvent("move", this, e, d)
		}
		return this
	},
	setPagePosition : function(a, c) {
		if (a && typeof a[1] == "number") {
			c = a[1];
			a = a[0]
		}
		this.pageX = a;
		this.pageY = c;
		if (!this.boxReady) {
			return
		}
		if (a === undefined || c === undefined) {
			return
		}
		var b = this.el.translatePoints(a, c);
		this.setPosition(b.left, b.top);
		return this
	},
	onRender : function(b, a) {
		Ext.BoxComponent.superclass.onRender.call(this, b, a);
		if (this.resizeEl) {
			this.resizeEl = Ext.get(this.resizeEl)
		}
		if (this.positionEl) {
			this.positionEl = Ext.get(this.positionEl)
		}
	},
	afterRender : function() {
		Ext.BoxComponent.superclass.afterRender.call(this);
		this.boxReady = true;
		this.setSize(this.width, this.height);
		if (this.x || this.y) {
			this.setPosition(this.x, this.y)
		} else {
			if (this.pageX || this.pageY) {
				this.setPagePosition(this.pageX, this.pageY)
			}
		}
	},
	syncSize : function() {
		delete this.lastSize;
		this.setSize(this.autoWidth ? undefined : this.el.getWidth(),
				this.autoHeight ? undefined : this.el.getHeight());
		return this
	},
	onResize : function(d, b, a, c) {
	},
	onPosition : function(a, b) {
	},
	adjustSize : function(a, b) {
		if (this.autoWidth) {
			a = "auto"
		}
		if (this.autoHeight) {
			b = "auto"
		}
		return {
			width : a,
			height : b
		}
	},
	adjustPosition : function(a, b) {
		return {
			x : a,
			y : b
		}
	}
});
Ext.reg("box", Ext.BoxComponent);
Ext.SplitBar = function(c, e, b, d, a) {
	this.el = Ext.get(c, true);
	this.el.dom.unselectable = "on";
	this.resizingEl = Ext.get(e, true);
	this.orientation = b || Ext.SplitBar.HORIZONTAL;
	this.minSize = 0;
	this.maxSize = 2000;
	this.animate = false;
	this.useShim = false;
	this.shim = null;
	if (!a) {
		this.proxy = Ext.SplitBar.createProxy(this.orientation)
	} else {
		this.proxy = Ext.get(a).dom
	}
	this.dd = new Ext.dd.DDProxy(this.el.dom.id, "XSplitBars", {
		dragElId : this.proxy.id
	});
	this.dd.b4StartDrag = this.onStartProxyDrag.createDelegate(this);
	this.dd.endDrag = this.onEndProxyDrag.createDelegate(this);
	this.dragSpecs = {};
	this.adapter = new Ext.SplitBar.BasicLayoutAdapter();
	this.adapter.init(this);
	if (this.orientation == Ext.SplitBar.HORIZONTAL) {
		this.placement = d
				|| (this.el.getX() > this.resizingEl.getX()
						? Ext.SplitBar.LEFT
						: Ext.SplitBar.RIGHT);
		this.el.addClass("x-splitbar-h")
	} else {
		this.placement = d
				|| (this.el.getY() > this.resizingEl.getY()
						? Ext.SplitBar.TOP
						: Ext.SplitBar.BOTTOM);
		this.el.addClass("x-splitbar-v")
	}
	this.addEvents("resize", "moved", "beforeresize", "beforeapply");
	Ext.SplitBar.superclass.constructor.call(this)
};
Ext.extend(Ext.SplitBar, Ext.util.Observable, {
	onStartProxyDrag : function(a, e) {
		this.fireEvent("beforeresize", this);
		this.overlay = Ext.DomHelper.append(document.body, {
			cls : "x-drag-overlay",
			html : "&#160;"
		}, true);
		this.overlay.unselectable();
		this.overlay.setSize(Ext.lib.Dom.getViewWidth(true), Ext.lib.Dom
				.getViewHeight(true));
		this.overlay.show();
		Ext.get(this.proxy).setDisplayed("block");
		var c = this.adapter.getElementSize(this);
		this.activeMinSize = this.getMinimumSize();
		this.activeMaxSize = this.getMaximumSize();
		var d = c - this.activeMinSize;
		var b = Math.max(this.activeMaxSize - c, 0);
		if (this.orientation == Ext.SplitBar.HORIZONTAL) {
			this.dd.resetConstraints();
			this.dd.setXConstraint(this.placement == Ext.SplitBar.LEFT ? d : b,
					this.placement == Ext.SplitBar.LEFT ? b : d);
			this.dd.setYConstraint(0, 0)
		} else {
			this.dd.resetConstraints();
			this.dd.setXConstraint(0, 0);
			this.dd.setYConstraint(this.placement == Ext.SplitBar.TOP ? d : b,
					this.placement == Ext.SplitBar.TOP ? b : d)
		}
		this.dragSpecs.startSize = c;
		this.dragSpecs.startPoint = [a, e];
		Ext.dd.DDProxy.prototype.b4StartDrag.call(this.dd, a, e)
	},
	onEndProxyDrag : function(c) {
		Ext.get(this.proxy).setDisplayed(false);
		var b = Ext.lib.Event.getXY(c);
		if (this.overlay) {
			Ext.destroy(this.overlay);
			delete this.overlay
		}
		var a;
		if (this.orientation == Ext.SplitBar.HORIZONTAL) {
			a = this.dragSpecs.startSize
					+ (this.placement == Ext.SplitBar.LEFT
							? b[0] - this.dragSpecs.startPoint[0]
							: this.dragSpecs.startPoint[0] - b[0])
		} else {
			a = this.dragSpecs.startSize
					+ (this.placement == Ext.SplitBar.TOP
							? b[1] - this.dragSpecs.startPoint[1]
							: this.dragSpecs.startPoint[1] - b[1])
		}
		a = Math.min(Math.max(a, this.activeMinSize), this.activeMaxSize);
		if (a != this.dragSpecs.startSize) {
			if (this.fireEvent("beforeapply", this, a) !== false) {
				this.adapter.setElementSize(this, a);
				this.fireEvent("moved", this, a);
				this.fireEvent("resize", this, a)
			}
		}
	},
	getAdapter : function() {
		return this.adapter
	},
	setAdapter : function(a) {
		this.adapter = a;
		this.adapter.init(this)
	},
	getMinimumSize : function() {
		return this.minSize
	},
	setMinimumSize : function(a) {
		this.minSize = a
	},
	getMaximumSize : function() {
		return this.maxSize
	},
	setMaximumSize : function(a) {
		this.maxSize = a
	},
	setCurrentSize : function(b) {
		var a = this.animate;
		this.animate = false;
		this.adapter.setElementSize(this, b);
		this.animate = a
	},
	destroy : function(a) {
		if (this.shim) {
			this.shim.remove()
		}
		this.dd.unreg();
		Ext.destroy(Ext.get(this.proxy));
		if (a) {
			this.el.remove()
		}
	}
});
Ext.SplitBar.createProxy = function(b) {
	var c = new Ext.Element(document.createElement("div"));
	c.unselectable();
	var a = "x-splitbar-proxy";
	c.addClass(a + " " + (b == Ext.SplitBar.HORIZONTAL ? a + "-h" : a + "-v"));
	document.body.appendChild(c.dom);
	return c.dom
};
Ext.SplitBar.BasicLayoutAdapter = function() {
};
Ext.SplitBar.BasicLayoutAdapter.prototype = {
	init : function(a) {
	},
	getElementSize : function(a) {
		if (a.orientation == Ext.SplitBar.HORIZONTAL) {
			return a.resizingEl.getWidth()
		} else {
			return a.resizingEl.getHeight()
		}
	},
	setElementSize : function(b, a, c) {
		if (b.orientation == Ext.SplitBar.HORIZONTAL) {
			if (!b.animate) {
				b.resizingEl.setWidth(a);
				if (c) {
					c(b, a)
				}
			} else {
				b.resizingEl.setWidth(a, true, 0.1, c, "easeOut")
			}
		} else {
			if (!b.animate) {
				b.resizingEl.setHeight(a);
				if (c) {
					c(b, a)
				}
			} else {
				b.resizingEl.setHeight(a, true, 0.1, c, "easeOut")
			}
		}
	}
};
Ext.SplitBar.AbsoluteLayoutAdapter = function(a) {
	this.basic = new Ext.SplitBar.BasicLayoutAdapter();
	this.container = Ext.get(a)
};
Ext.SplitBar.AbsoluteLayoutAdapter.prototype = {
	init : function(a) {
		this.basic.init(a)
	},
	getElementSize : function(a) {
		return this.basic.getElementSize(a)
	},
	setElementSize : function(b, a, c) {
		this.basic.setElementSize(b, a, this.moveSplitter.createDelegate(this,
				[b]))
	},
	moveSplitter : function(a) {
		var b = Ext.SplitBar;
		switch (a.placement) {
			case b.LEFT :
				a.el.setX(a.resizingEl.getRight());
				break;
			case b.RIGHT :
				a.el.setStyle("right",
						(this.container.getWidth() - a.resizingEl.getLeft())
								+ "px");
				break;
			case b.TOP :
				a.el.setY(a.resizingEl.getBottom());
				break;
			case b.BOTTOM :
				a.el.setY(a.resizingEl.getTop() - a.el.getHeight());
				break
		}
	}
};
Ext.SplitBar.VERTICAL = 1;
Ext.SplitBar.HORIZONTAL = 2;
Ext.SplitBar.LEFT = 1;
Ext.SplitBar.RIGHT = 2;
Ext.SplitBar.TOP = 3;
Ext.SplitBar.BOTTOM = 4;
Ext.Container = Ext.extend(Ext.BoxComponent, {
	autoDestroy : true,
	defaultType : "panel",
	initComponent : function() {
		Ext.Container.superclass.initComponent.call(this);
		this.addEvents("afterlayout", "beforeadd", "beforeremove", "add",
				"remove");
		var a = this.items;
		if (a) {
			delete this.items;
			if (Ext.isArray(a) && a.length > 0) {
				this.add.apply(this, a)
			} else {
				this.add(a)
			}
		}
	},
	initItems : function() {
		if (!this.items) {
			this.items = new Ext.util.MixedCollection(false,
					this.getComponentId);
			this.getLayout()
		}
	},
	setLayout : function(a) {
		if (this.layout && this.layout != a) {
			this.layout.setContainer(null)
		}
		this.initItems();
		this.layout = a;
		a.setContainer(this)
	},
	render : function() {
		Ext.Container.superclass.render.apply(this, arguments);
		if (this.layout) {
			if (typeof this.layout == "string") {
				this.layout = new Ext.Container.LAYOUTS[this.layout
						.toLowerCase()](this.layoutConfig)
			}
			this.setLayout(this.layout);
			if (this.activeItem !== undefined) {
				var a = this.activeItem;
				delete this.activeItem;
				this.layout.setActiveItem(a);
				return
			}
		}
		if (!this.ownerCt) {
			this.doLayout()
		}
		if (this.monitorResize === true) {
			Ext.EventManager.onWindowResize(this.doLayout, this, [false])
		}
	},
	getLayoutTarget : function() {
		return this.el
	},
	getComponentId : function(a) {
		return a.itemId || a.id
	},
	add : function(e) {
		if (!this.items) {
			this.initItems()
		}
		var d = arguments, b = d.length;
		if (b > 1) {
			for (var g = 0;g < b; g++) {
				this.add(d[g])
			}
			return
		}
		var k = this.lookupComponent(this.applyDefaults(e));
		var h = this.items.length;
		if (this.fireEvent("beforeadd", this, k, h) !== false
				&& this.onBeforeAdd(k) !== false) {
			this.items.add(k);
			k.ownerCt = this;
			this.fireEvent("add", this, k, h)
		}
		return k
	},
	insert : function(g, e) {
		if (!this.items) {
			this.initItems()
		}
		var d = arguments, b = d.length;
		if (b > 2) {
			for (var h = b - 1;h >= 1; --h) {
				this.insert(g, d[h])
			}
			return
		}
		var k = this.lookupComponent(this.applyDefaults(e));
		if (k.ownerCt == this && this.items.indexOf(k) < g) {
			--g
		}
		if (this.fireEvent("beforeadd", this, k, g) !== false
				&& this.onBeforeAdd(k) !== false) {
			this.items.insert(g, k);
			k.ownerCt = this;
			this.fireEvent("add", this, k, g)
		}
		return k
	},
	applyDefaults : function(a) {
		if (this.defaults) {
			if (typeof a == "string") {
				a = Ext.ComponentMgr.get(a);
				Ext.apply(a, this.defaults)
			} else {
				if (!a.events) {
					Ext.applyIf(a, this.defaults)
				} else {
					Ext.apply(a, this.defaults)
				}
			}
		}
		return a
	},
	onBeforeAdd : function(a) {
		if (a.ownerCt) {
			a.ownerCt.remove(a, false)
		}
		if (this.hideBorders === true) {
			a.border = (a.border === true)
		}
	},
	remove : function(a, b) {
		var d = this.getComponent(a);
		if (d && this.fireEvent("beforeremove", this, d) !== false) {
			this.items.remove(d);
			delete d.ownerCt;
			if (b === true || (b !== false && this.autoDestroy)) {
				d.destroy()
			}
			if (this.layout && this.layout.activeItem == d) {
				delete this.layout.activeItem
			}
			this.fireEvent("remove", this, d)
		}
		return d
	},
	removeAll : function(b) {
		var c, a = [];
		while ((c = this.items.last())) {
			a.unshift(this.remove(c, b))
		}
		return a
	},
	getComponent : function(a) {
		if (typeof a == "object") {
			return a
		}
		return this.items.get(a)
	},
	lookupComponent : function(a) {
		if (typeof a == "string") {
			return Ext.ComponentMgr.get(a)
		} else {
			if (!a.events) {
				return this.createComponent(a)
			}
		}
		return a
	},
	createComponent : function(a) {
		return Ext.ComponentMgr.create(a, this.defaultType)
	},
	doLayout : function(e) {
		if (this.rendered && this.layout) {
			this.layout.layout()
		}
		if (e !== false && this.items) {
			var d = this.items.items;
			for (var b = 0, a = d.length;b < a; b++) {
				var g = d[b];
				if (g.doLayout) {
					g.doLayout()
				}
			}
		}
	},
	getLayout : function() {
		if (!this.layout) {
			var a = new Ext.layout.ContainerLayout(this.layoutConfig);
			this.setLayout(a)
		}
		return this.layout
	},
	beforeDestroy : function() {
		if (this.items) {
			Ext.destroy.apply(Ext, this.items.items)
		}
		if (this.monitorResize) {
			Ext.EventManager.removeResizeListener(this.doLayout, this)
		}
		if (this.layout && this.layout.destroy) {
			this.layout.destroy()
		}
		Ext.Container.superclass.beforeDestroy.call(this)
	},
	bubble : function(c, b, a) {
		var d = this;
		while (d) {
			if (c.apply(b || d, a || [d]) === false) {
				break
			}
			d = d.ownerCt
		}
	},
	cascade : function(g, e, b) {
		if (g.apply(e || this, b || [this]) !== false) {
			if (this.items) {
				var d = this.items.items;
				for (var c = 0, a = d.length;c < a; c++) {
					if (d[c].cascade) {
						d[c].cascade(g, e, b)
					} else {
						g.apply(e || d[c], b || [d[c]])
					}
				}
			}
		}
	},
	findById : function(c) {
		var a, b = this;
		this.cascade(function(d) {
			if (b != d && d.id === c) {
				a = d;
				return false
			}
		});
		return a || null
	},
	findByType : function(b, a) {
		return this.findBy(function(d) {
			return d.isXType(b, a)
		})
	},
	find : function(b, a) {
		return this.findBy(function(d) {
			return d[b] === a
		})
	},
	findBy : function(d, c) {
		var a = [], b = this;
		this.cascade(function(e) {
			if (b != e && d.call(c || e, e, b) === true) {
				a.push(e)
			}
		});
		return a
	}
});
Ext.Container.LAYOUTS = {};
Ext.reg("container", Ext.Container);
Ext.layout.ContainerLayout = function(a) {
	Ext.apply(this, a)
};
Ext.layout.ContainerLayout.prototype = {
	monitorResize : false,
	activeItem : null,
	layout : function() {
		var a = this.container.getLayoutTarget();
		this.onLayout(this.container, a);
		this.container.fireEvent("afterlayout", this.container, this)
	},
	onLayout : function(a, b) {
		this.renderAll(a, b)
	},
	isValidParent : function(d, b) {
		var a = d.getPositionEl ? d.getPositionEl() : d.getEl();
		return a.dom.parentNode == b.dom
	},
	renderAll : function(e, g) {
		var b = e.items.items;
		for (var d = 0, a = b.length;d < a; d++) {
			var h = b[d];
			if (h && (!h.rendered || !this.isValidParent(h, g))) {
				this.renderItem(h, d, g)
			}
		}
	},
	renderItem : function(e, a, d) {
		if (e && !e.rendered) {
			e.render(d, a);
			if (this.extraCls) {
				var b = e.getPositionEl ? e.getPositionEl() : e;
				b.addClass(this.extraCls)
			}
			if (this.renderHidden && e != this.activeItem) {
				e.hide()
			}
		} else {
			if (e && !this.isValidParent(e, d)) {
				if (this.extraCls) {
					var b = e.getPositionEl ? e.getPositionEl() : e;
					b.addClass(this.extraCls)
				}
				if (typeof a == "number") {
					a = d.dom.childNodes[a]
				}
				d.dom.insertBefore(e.getEl().dom, a || null);
				if (this.renderHidden && e != this.activeItem) {
					e.hide()
				}
			}
		}
	},
	onResize : function() {
		if (this.container.collapsed) {
			return
		}
		var a = this.container.bufferResize;
		if (a) {
			if (!this.resizeTask) {
				this.resizeTask = new Ext.util.DelayedTask(this.layout, this);
				this.resizeBuffer = typeof a == "number" ? a : 100
			}
			this.resizeTask.delay(this.resizeBuffer)
		} else {
			this.layout()
		}
	},
	setContainer : function(a) {
		if (this.monitorResize && a != this.container) {
			if (this.container) {
				this.container.un("resize", this.onResize, this)
			}
			if (a) {
				a.on("resize", this.onResize, this)
			}
		}
		this.container = a
	},
	parseMargins : function(b) {
		var c = b.split(" ");
		var a = c.length;
		if (a == 1) {
			c[1] = c[0];
			c[2] = c[0];
			c[3] = c[0]
		}
		if (a == 2) {
			c[2] = c[0];
			c[3] = c[1]
		}
		return {
			top : parseInt(c[0], 10) || 0,
			right : parseInt(c[1], 10) || 0,
			bottom : parseInt(c[2], 10) || 0,
			left : parseInt(c[3], 10) || 0
		}
	},
	destroy : Ext.emptyFn
};
Ext.Container.LAYOUTS.auto = Ext.layout.ContainerLayout;
Ext.layout.FitLayout = Ext.extend(Ext.layout.ContainerLayout, {
	monitorResize : true,
	onLayout : function(a, b) {
		Ext.layout.FitLayout.superclass.onLayout.call(this, a, b);
		if (!this.container.collapsed) {
			this.setItemSize(this.activeItem || a.items.itemAt(0), b
					.getStyleSize())
		}
	},
	setItemSize : function(b, a) {
		if (b && a.height > 0) {
			b.setSize(a)
		}
	}
});
Ext.Container.LAYOUTS.fit = Ext.layout.FitLayout;
Ext.layout.CardLayout = Ext.extend(Ext.layout.FitLayout, {
	deferredRender : false,
	renderHidden : true,
	setActiveItem : function(a) {
		a = this.container.getComponent(a);
		if (this.activeItem != a) {
			if (this.activeItem) {
				this.activeItem.hide()
			}
			this.activeItem = a;
			a.show();
			this.layout()
		}
	},
	renderAll : function(a, b) {
		if (this.deferredRender) {
			this.renderItem(this.activeItem, undefined, b)
		} else {
			Ext.layout.CardLayout.superclass.renderAll.call(this, a, b)
		}
	}
});
Ext.Container.LAYOUTS.card = Ext.layout.CardLayout;
Ext.layout.AnchorLayout = Ext.extend(Ext.layout.ContainerLayout,
		{
			monitorResize : true,
			getAnchorViewSize : function(a, b) {
				return b.dom == document.body ? b.getViewSize() : b
						.getStyleSize()
			},
			onLayout : function(l, o) {
				Ext.layout.AnchorLayout.superclass.onLayout.call(this, l, o);
				var u = this.getAnchorViewSize(l, o);
				var s = u.width, k = u.height;
				if (s < 20 || k < 20) {
					return
				}
				var d, q;
				if (l.anchorSize) {
					if (typeof l.anchorSize == "number") {
						d = l.anchorSize
					} else {
						d = l.anchorSize.width;
						q = l.anchorSize.height
					}
				} else {
					d = l.initialConfig.width;
					q = l.initialConfig.height
				}
				var n = l.items.items, m = n.length, g, p, r, e, b;
				for (g = 0;g < m; g++) {
					p = n[g];
					if (p.anchor) {
						r = p.anchorSpec;
						if (!r) {
							var t = p.anchor.split(" ");
							p.anchorSpec = r = {
								right : this.parseAnchor(t[0],
										p.initialConfig.width, d),
								bottom : this.parseAnchor(t[1],
										p.initialConfig.height, q)
							}
						}
						e = r.right
								? this.adjustWidthAnchor(r.right(s), p)
								: undefined;
						b = r.bottom
								? this.adjustHeightAnchor(r.bottom(k), p)
								: undefined;
						if (e || b) {
							p.setSize(e || undefined, b || undefined)
						}
					}
				}
			},
			parseAnchor : function(c, h, b) {
				if (c && c != "none") {
					var e;
					if (/^(r|right|b|bottom)$/i.test(c)) {
						var g = b - h;
						return function(a) {
							if (a !== e) {
								e = a;
								return a - g
							}
						}
					} else {
						if (c.indexOf("%") != -1) {
							var d = parseFloat(c.replace("%", "")) * 0.01;
							return function(a) {
								if (a !== e) {
									e = a;
									return Math.floor(a * d)
								}
							}
						} else {
							c = parseInt(c, 10);
							if (!isNaN(c)) {
								return function(a) {
									if (a !== e) {
										e = a;
										return a + c
									}
								}
							}
						}
					}
				}
				return false
			},
			adjustWidthAnchor : function(b, a) {
				return b
			},
			adjustHeightAnchor : function(b, a) {
				return b
			}
		});
Ext.Container.LAYOUTS.anchor = Ext.layout.AnchorLayout;
Ext.layout.ColumnLayout = Ext
		.extend(
				Ext.layout.ContainerLayout,
				{
					monitorResize : true,
					extraCls : "x-column",
					scrollOffset : 0,
					isValidParent : function(b, a) {
						return (b.getPositionEl ? b.getPositionEl() : b.getEl()).dom.parentNode == this.innerCt.dom
					},
					onLayout : function(d, k) {
						var e = d.items.items, g = e.length, l, a;
						if (!this.innerCt) {
							k.addClass("x-column-layout-ct");
							this.innerCt = k.createChild( {
								cls : "x-column-inner"
							});
							this.innerCt.createChild( {
								cls : "x-clear"
							})
						}
						this.renderAll(d, this.innerCt);
						var o = Ext.isIE && k.dom != Ext.getBody().dom ? k
								.getStyleSize() : k.getViewSize();
						if (o.width < 1 && o.height < 1) {
							return
						}
						var m = o.width - k.getPadding("lr")
								- this.scrollOffset, b = o.height
								- k.getPadding("tb"), n = m;
						this.innerCt.setWidth(m);
						for (a = 0;a < g; a++) {
							l = e[a];
							if (!l.columnWidth) {
								n -= (l.getSize().width + l.getEl()
										.getMargins("lr"))
							}
						}
						n = n < 0 ? 0 : n;
						for (a = 0;a < g; a++) {
							l = e[a];
							if (l.columnWidth) {
								l.setSize(Math.floor(l.columnWidth * n)
										- l.getEl().getMargins("lr"))
							}
						}
					}
				});
Ext.Container.LAYOUTS.column = Ext.layout.ColumnLayout;
Ext.layout.BorderLayout = Ext
		.extend(
				Ext.layout.ContainerLayout,
				{
					monitorResize : true,
					rendered : false,
					onLayout : function(d, I) {
						var g;
						if (!this.rendered) {
							I.position();
							I.addClass("x-border-layout-ct");
							var x = d.items.items;
							g = [];
							for (var B = 0, C = x.length;B < C; B++) {
								var F = x[B];
								var o = F.region;
								if (F.collapsed) {
									g.push(F)
								}
								F.collapsed = false;
								if (!F.rendered) {
									F.cls = F.cls
											? F.cls + " x-border-panel"
											: "x-border-panel";
									F.render(I, B)
								}
								this[o] = o != "center" && F.split
										? new Ext.layout.BorderLayout.SplitRegion(
												this, F.initialConfig, o)
										: new Ext.layout.BorderLayout.Region(
												this, F.initialConfig, o);
								this[o].render(I, F)
							}
							this.rendered = true
						}
						var v = I.getViewSize();
						if (v.width < 20 || v.height < 20) {
							if (g) {
								this.restoreCollapsed = g
							}
							return
						} else {
							if (this.restoreCollapsed) {
								g = this.restoreCollapsed;
								delete this.restoreCollapsed
							}
						}
						var t = v.width, D = v.height;
						var r = t, A = D, p = 0, q = 0;
						var y = this.north, u = this.south, l = this.west, E = this.east, F = this.center;
						if (!F && Ext.layout.BorderLayout.WARN !== false) {
							throw "No center region defined in BorderLayout "
									+ d.id
						}
						if (y && y.isVisible()) {
							var H = y.getSize();
							var z = y.getMargins();
							H.width = t - (z.left + z.right);
							H.x = z.left;
							H.y = z.top;
							p = H.height + H.y + z.bottom;
							A -= p;
							y.applyLayout(H)
						}
						if (u && u.isVisible()) {
							var H = u.getSize();
							var z = u.getMargins();
							H.width = t - (z.left + z.right);
							H.x = z.left;
							var G = (H.height + z.top + z.bottom);
							H.y = D - G + z.top;
							A -= G;
							u.applyLayout(H)
						}
						if (l && l.isVisible()) {
							var H = l.getSize();
							var z = l.getMargins();
							H.height = A - (z.top + z.bottom);
							H.x = z.left;
							H.y = p + z.top;
							var a = (H.width + z.left + z.right);
							q += a;
							r -= a;
							l.applyLayout(H)
						}
						if (E && E.isVisible()) {
							var H = E.getSize();
							var z = E.getMargins();
							H.height = A - (z.top + z.bottom);
							var a = (H.width + z.left + z.right);
							H.x = t - a + z.left;
							H.y = p + z.top;
							r -= a;
							E.applyLayout(H)
						}
						if (F) {
							var z = F.getMargins();
							var k = {
								x : q + z.left,
								y : p + z.top,
								width : r - (z.left + z.right),
								height : A - (z.top + z.bottom)
							};
							F.applyLayout(k)
						}
						if (g) {
							for (var B = 0, C = g.length;B < C; B++) {
								g[B].collapse(false)
							}
						}
						if (Ext.isIE && Ext.isStrict) {
							I.repaint()
						}
					},
					destroy : function() {
						var b = ["north", "south", "east", "west"];
						for (var a = 0;a < b.length; a++) {
							var c = this[b[a]];
							if (c) {
								if (c.destroy) {
									c.destroy()
								} else {
									if (c.split) {
										c.split.destroy(true)
									}
								}
							}
						}
						Ext.layout.BorderLayout.superclass.destroy.call(this)
					}
				});
Ext.layout.BorderLayout.Region = function(b, a, c) {
	Ext.apply(this, a);
	this.layout = b;
	this.position = c;
	this.state = {};
	if (typeof this.margins == "string") {
		this.margins = this.layout.parseMargins(this.margins)
	}
	this.margins = Ext.applyIf(this.margins || {}, this.defaultMargins);
	if (this.collapsible) {
		if (typeof this.cmargins == "string") {
			this.cmargins = this.layout.parseMargins(this.cmargins)
		}
		if (this.collapseMode == "mini" && !this.cmargins) {
			this.cmargins = {
				left : 0,
				top : 0,
				right : 0,
				bottom : 0
			}
		} else {
			this.cmargins = Ext.applyIf(this.cmargins || {}, c == "north"
					|| c == "south"
					? this.defaultNSCMargins
					: this.defaultEWCMargins)
		}
	}
};
Ext.layout.BorderLayout.Region.prototype = {
	collapsible : false,
	split : false,
	floatable : true,
	minWidth : 50,
	minHeight : 50,
	defaultMargins : {
		left : 0,
		top : 0,
		right : 0,
		bottom : 0
	},
	defaultNSCMargins : {
		left : 5,
		top : 5,
		right : 5,
		bottom : 5
	},
	defaultEWCMargins : {
		left : 5,
		top : 0,
		right : 5,
		bottom : 0
	},
	isCollapsed : false,
	render : function(b, c) {
		this.panel = c;
		c.el.enableDisplayMode();
		this.targetEl = b;
		this.el = c.el;
		var a = c.getState, d = this.position;
		c.getState = function() {
			return Ext.apply(a.call(c) || {}, this.state)
		}.createDelegate(this);
		if (d != "center") {
			c.allowQueuedExpand = false;
			c.on( {
				beforecollapse : this.beforeCollapse,
				collapse : this.onCollapse,
				beforeexpand : this.beforeExpand,
				expand : this.onExpand,
				hide : this.onHide,
				show : this.onShow,
				scope : this
			});
			if (this.collapsible) {
				c.collapseEl = "el";
				c.slideAnchor = this.getSlideAnchor()
			}
			if (c.tools && c.tools.toggle) {
				c.tools.toggle.addClass("x-tool-collapse-" + d);
				c.tools.toggle.addClassOnOver("x-tool-collapse-" + d + "-over")
			}
		}
	},
	getCollapsedEl : function() {
		if (!this.collapsedEl) {
			if (!this.toolTemplate) {
				var b = new Ext.Template('<div class="x-tool x-tool-{id}">&#160;</div>');
				b.disableFormats = true;
				b.compile();
				Ext.layout.BorderLayout.Region.prototype.toolTemplate = b
			}
			this.collapsedEl = this.targetEl.createChild( {
				cls : "x-layout-collapsed x-layout-collapsed-" + this.position,
				id : this.panel.id + "-xcollapsed"
			});
			this.collapsedEl.enableDisplayMode("block");
			if (this.collapseMode == "mini") {
				this.collapsedEl.addClass("x-layout-cmini-" + this.position);
				this.miniCollapsedEl = this.collapsedEl.createChild( {
					cls : "x-layout-mini x-layout-mini-" + this.position,
					html : "&#160;"
				});
				this.miniCollapsedEl.addClassOnOver("x-layout-mini-over");
				this.collapsedEl.addClassOnOver("x-layout-collapsed-over");
				this.collapsedEl.on("click", this.onExpandClick, this, {
					stopEvent : true
				})
			} else {
				var a = this.toolTemplate.append(this.collapsedEl.dom, {
					id : "expand-" + this.position
				}, true);
				a.addClassOnOver("x-tool-expand-" + this.position + "-over");
				a.on("click", this.onExpandClick, this, {
					stopEvent : true
				});
				if (this.floatable !== false) {
					this.collapsedEl.addClassOnOver("x-layout-collapsed-over");
					this.collapsedEl.on("click", this.collapseClick, this)
				}
			}
		}
		return this.collapsedEl
	},
	onExpandClick : function(a) {
		if (this.isSlid) {
			this.afterSlideIn();
			this.panel.expand(false)
		} else {
			this.panel.expand()
		}
	},
	onCollapseClick : function(a) {
		this.panel.collapse()
	},
	beforeCollapse : function(b, a) {
		this.lastAnim = a;
		if (this.splitEl) {
			this.splitEl.hide()
		}
		this.getCollapsedEl().show();
		this.panel.el.setStyle("z-index", 100);
		this.isCollapsed = true;
		this.layout.layout()
	},
	onCollapse : function(a) {
		this.panel.el.setStyle("z-index", 1);
		if (this.lastAnim === false || this.panel.animCollapse === false) {
			this.getCollapsedEl().dom.style.visibility = "visible"
		} else {
			this.getCollapsedEl().slideIn(this.panel.slideAnchor, {
				duration : 0.2
			})
		}
		this.state.collapsed = true;
		this.panel.saveState()
	},
	beforeExpand : function(a) {
		var b = this.getCollapsedEl();
		this.el.show();
		if (this.position == "east" || this.position == "west") {
			this.panel.setSize(undefined, b.getHeight())
		} else {
			this.panel.setSize(b.getWidth(), undefined)
		}
		b.hide();
		b.dom.style.visibility = "hidden";
		this.panel.el.setStyle("z-index", 100)
	},
	onExpand : function() {
		this.isCollapsed = false;
		if (this.splitEl) {
			this.splitEl.show()
		}
		this.layout.layout();
		this.panel.el.setStyle("z-index", 1);
		this.state.collapsed = false;
		this.panel.saveState()
	},
	collapseClick : function(a) {
		if (this.isSlid) {
			a.stopPropagation();
			this.slideIn()
		} else {
			a.stopPropagation();
			this.slideOut()
		}
	},
	onHide : function() {
		if (this.isCollapsed) {
			this.getCollapsedEl().hide()
		} else {
			if (this.splitEl) {
				this.splitEl.hide()
			}
		}
	},
	onShow : function() {
		if (this.isCollapsed) {
			this.getCollapsedEl().show()
		} else {
			if (this.splitEl) {
				this.splitEl.show()
			}
		}
	},
	isVisible : function() {
		return !this.panel.hidden
	},
	getMargins : function() {
		return this.isCollapsed && this.cmargins ? this.cmargins : this.margins
	},
	getSize : function() {
		return this.isCollapsed ? this.getCollapsedEl().getSize() : this.panel
				.getSize()
	},
	setPanel : function(a) {
		this.panel = a
	},
	getMinWidth : function() {
		return this.minWidth
	},
	getMinHeight : function() {
		return this.minHeight
	},
	applyLayoutCollapsed : function(a) {
		var b = this.getCollapsedEl();
		b.setLeftTop(a.x, a.y);
		b.setSize(a.width, a.height)
	},
	applyLayout : function(a) {
		if (this.isCollapsed) {
			this.applyLayoutCollapsed(a)
		} else {
			this.panel.setPosition(a.x, a.y);
			this.panel.setSize(a.width, a.height)
		}
	},
	beforeSlide : function() {
		this.panel.beforeEffect()
	},
	afterSlide : function() {
		this.panel.afterEffect()
	},
	initAutoHide : function() {
		if (this.autoHide !== false) {
			if (!this.autoHideHd) {
				var a = new Ext.util.DelayedTask(this.slideIn, this);
				this.autoHideHd = {
					mouseout : function(b) {
						if (!b.within(this.el, true)) {
							a.delay(500)
						}
					},
					mouseover : function(b) {
						a.cancel()
					},
					scope : this
				}
			}
			this.el.on(this.autoHideHd)
		}
	},
	clearAutoHide : function() {
		if (this.autoHide !== false) {
			this.el.un("mouseout", this.autoHideHd.mouseout);
			this.el.un("mouseover", this.autoHideHd.mouseover)
		}
	},
	clearMonitor : function() {
		Ext.getDoc().un("click", this.slideInIf, this)
	},
	slideOut : function() {
		if (this.isSlid || this.el.hasActiveFx()) {
			return
		}
		this.isSlid = true;
		var a = this.panel.tools;
		if (a && a.toggle) {
			a.toggle.hide()
		}
		this.el.show();
		if (this.position == "east" || this.position == "west") {
			this.panel.setSize(undefined, this.collapsedEl.getHeight())
		} else {
			this.panel.setSize(this.collapsedEl.getWidth(), undefined)
		}
		this.restoreLT = [this.el.dom.style.left, this.el.dom.style.top];
		this.el.alignTo(this.collapsedEl, this.getCollapseAnchor());
		this.el.setStyle("z-index", 102);
		this.panel.el.replaceClass("x-panel-collapsed", "x-panel-floating");
		if (this.animFloat !== false) {
			this.beforeSlide();
			this.el.slideIn(this.getSlideAnchor(), {
				callback : function() {
					this.afterSlide();
					this.initAutoHide();
					Ext.getDoc().on("click", this.slideInIf, this)
				},
				scope : this,
				block : true
			})
		} else {
			this.initAutoHide();
			Ext.getDoc().on("click", this.slideInIf, this)
		}
	},
	afterSlideIn : function() {
		this.clearAutoHide();
		this.isSlid = false;
		this.clearMonitor();
		this.el.setStyle("z-index", "");
		this.panel.el.replaceClass("x-panel-floating", "x-panel-collapsed");
		this.el.dom.style.left = this.restoreLT[0];
		this.el.dom.style.top = this.restoreLT[1];
		var a = this.panel.tools;
		if (a && a.toggle) {
			a.toggle.show()
		}
	},
	slideIn : function(a) {
		if (!this.isSlid || this.el.hasActiveFx()) {
			Ext.callback(a);
			return
		}
		this.isSlid = false;
		if (this.animFloat !== false) {
			this.beforeSlide();
			this.el.slideOut(this.getSlideAnchor(), {
				callback : function() {
					this.el.hide();
					this.afterSlide();
					this.afterSlideIn();
					Ext.callback(a)
				},
				scope : this,
				block : true
			})
		} else {
			this.el.hide();
			this.afterSlideIn()
		}
	},
	slideInIf : function(a) {
		if (!a.within(this.el)) {
			this.slideIn()
		}
	},
	anchors : {
		west : "left",
		east : "right",
		north : "top",
		south : "bottom"
	},
	sanchors : {
		west : "l",
		east : "r",
		north : "t",
		south : "b"
	},
	canchors : {
		west : "tl-tr",
		east : "tr-tl",
		north : "tl-bl",
		south : "bl-tl"
	},
	getAnchor : function() {
		return this.anchors[this.position]
	},
	getCollapseAnchor : function() {
		return this.canchors[this.position]
	},
	getSlideAnchor : function() {
		return this.sanchors[this.position]
	},
	getAlignAdj : function() {
		var a = this.cmargins;
		switch (this.position) {
			case "west" :
				return [0, 0];
				break;
			case "east" :
				return [0, 0];
				break;
			case "north" :
				return [0, 0];
				break;
			case "south" :
				return [0, 0];
				break
		}
	},
	getExpandAdj : function() {
		var b = this.collapsedEl, a = this.cmargins;
		switch (this.position) {
			case "west" :
				return [-(a.right + b.getWidth() + a.left), 0];
				break;
			case "east" :
				return [a.right + b.getWidth() + a.left, 0];
				break;
			case "north" :
				return [0, -(a.top + a.bottom + b.getHeight())];
				break;
			case "south" :
				return [0, a.top + a.bottom + b.getHeight()];
				break
		}
	}
};
Ext.layout.BorderLayout.SplitRegion = function(b, a, c) {
	Ext.layout.BorderLayout.SplitRegion.superclass.constructor.call(this, b, a,
			c);
	this.applyLayout = this.applyFns[c]
};
Ext.extend(Ext.layout.BorderLayout.SplitRegion, Ext.layout.BorderLayout.Region,
		{
			splitTip : "Drag to resize.",
			collapsibleSplitTip : "Drag to resize. Double click to hide.",
			useSplitTips : false,
			splitSettings : {
				north : {
					orientation : Ext.SplitBar.VERTICAL,
					placement : Ext.SplitBar.TOP,
					maxFn : "getVMaxSize",
					minProp : "minHeight",
					maxProp : "maxHeight"
				},
				south : {
					orientation : Ext.SplitBar.VERTICAL,
					placement : Ext.SplitBar.BOTTOM,
					maxFn : "getVMaxSize",
					minProp : "minHeight",
					maxProp : "maxHeight"
				},
				east : {
					orientation : Ext.SplitBar.HORIZONTAL,
					placement : Ext.SplitBar.RIGHT,
					maxFn : "getHMaxSize",
					minProp : "minWidth",
					maxProp : "maxWidth"
				},
				west : {
					orientation : Ext.SplitBar.HORIZONTAL,
					placement : Ext.SplitBar.LEFT,
					maxFn : "getHMaxSize",
					minProp : "minWidth",
					maxProp : "maxWidth"
				}
			},
			applyFns : {
				west : function(c) {
					if (this.isCollapsed) {
						return this.applyLayoutCollapsed(c)
					}
					var d = this.splitEl.dom, b = d.style;
					this.panel.setPosition(c.x, c.y);
					var a = d.offsetWidth;
					b.left = (c.x + c.width - a) + "px";
					b.top = (c.y) + "px";
					b.height = Math.max(0, c.height) + "px";
					this.panel.setSize(c.width - a, c.height)
				},
				east : function(c) {
					if (this.isCollapsed) {
						return this.applyLayoutCollapsed(c)
					}
					var d = this.splitEl.dom, b = d.style;
					var a = d.offsetWidth;
					this.panel.setPosition(c.x + a, c.y);
					b.left = (c.x) + "px";
					b.top = (c.y) + "px";
					b.height = Math.max(0, c.height) + "px";
					this.panel.setSize(c.width - a, c.height)
				},
				north : function(c) {
					if (this.isCollapsed) {
						return this.applyLayoutCollapsed(c)
					}
					var d = this.splitEl.dom, b = d.style;
					var a = d.offsetHeight;
					this.panel.setPosition(c.x, c.y);
					b.left = (c.x) + "px";
					b.top = (c.y + c.height - a) + "px";
					b.width = Math.max(0, c.width) + "px";
					this.panel.setSize(c.width, c.height - a)
				},
				south : function(c) {
					if (this.isCollapsed) {
						return this.applyLayoutCollapsed(c)
					}
					var d = this.splitEl.dom, b = d.style;
					var a = d.offsetHeight;
					this.panel.setPosition(c.x, c.y + a);
					b.left = (c.x) + "px";
					b.top = (c.y) + "px";
					b.width = Math.max(0, c.width) + "px";
					this.panel.setSize(c.width, c.height - a)
				}
			},
			render : function(a, c) {
				Ext.layout.BorderLayout.SplitRegion.superclass.render.call(
						this, a, c);
				var d = this.position;
				this.splitEl = a.createChild( {
					cls : "x-layout-split x-layout-split-" + d,
					html : "&#160;",
					id : this.panel.id + "-xsplit"
				});
				if (this.collapseMode == "mini") {
					this.miniSplitEl = this.splitEl.createChild( {
						cls : "x-layout-mini x-layout-mini-" + d,
						html : "&#160;"
					});
					this.miniSplitEl.addClassOnOver("x-layout-mini-over");
					this.miniSplitEl.on("click", this.onCollapseClick, this, {
						stopEvent : true
					})
				}
				var b = this.splitSettings[d];
				this.split = new Ext.SplitBar(this.splitEl.dom, c.el,
						b.orientation);
				this.split.placement = b.placement;
				this.split.getMaximumSize = this[b.maxFn].createDelegate(this);
				this.split.minSize = this.minSize || this[b.minProp];
				this.split.on("beforeapply", this.onSplitMove, this);
				this.split.useShim = this.useShim === true;
				this.maxSize = this.maxSize || this[b.maxProp];
				if (c.hidden) {
					this.splitEl.hide()
				}
				if (this.useSplitTips) {
					this.splitEl.dom.title = this.collapsible
							? this.collapsibleSplitTip
							: this.splitTip
				}
				if (this.collapsible) {
					this.splitEl.on("dblclick", this.onCollapseClick, this)
				}
			},
			getSize : function() {
				if (this.isCollapsed) {
					return this.collapsedEl.getSize()
				}
				var a = this.panel.getSize();
				if (this.position == "north" || this.position == "south") {
					a.height += this.splitEl.dom.offsetHeight
				} else {
					a.width += this.splitEl.dom.offsetWidth
				}
				return a
			},
			getHMaxSize : function() {
				var b = this.maxSize || 10000;
				var a = this.layout.center;
				return Math.min(b, (this.el.getWidth() + a.el.getWidth())
						- a.getMinWidth())
			},
			getVMaxSize : function() {
				var b = this.maxSize || 10000;
				var a = this.layout.center;
				return Math.min(b, (this.el.getHeight() + a.el.getHeight())
						- a.getMinHeight())
			},
			onSplitMove : function(b, a) {
				var c = this.panel.getSize();
				this.lastSplitSize = a;
				if (this.position == "north" || this.position == "south") {
					this.panel.setSize(c.width, a);
					this.state.height = a
				} else {
					this.panel.setSize(a, c.height);
					this.state.width = a
				}
				this.layout.layout();
				this.panel.saveState();
				return false
			},
			getSplitBar : function() {
				return this.split
			},
			destroy : function() {
				Ext.destroy(this.miniSplitEl, this.split, this.splitEl)
			}
		});
Ext.Container.LAYOUTS.border = Ext.layout.BorderLayout;
Ext.layout.FormLayout = Ext
		.extend(
				Ext.layout.AnchorLayout,
				{
					labelSeparator : ":",
					getAnchorViewSize : function(a, b) {
						return (a.body || a.el).getStyleSize()
					},
					setContainer : function(b) {
						Ext.layout.FormLayout.superclass.setContainer.call(
								this, b);
						if (b.labelAlign) {
							b.addClass("x-form-label-" + b.labelAlign)
						}
						if (b.hideLabels) {
							this.labelStyle = "display:none";
							this.elementStyle = "padding-left:0;";
							this.labelAdjust = 0
						} else {
							this.labelSeparator = b.labelSeparator
									|| this.labelSeparator;
							b.labelWidth = b.labelWidth || 100;
							if (typeof b.labelWidth == "number") {
								var c = (typeof b.labelPad == "number"
										? b.labelPad
										: 5);
								this.labelAdjust = b.labelWidth + c;
								this.labelStyle = "width:" + b.labelWidth
										+ "px;";
								this.elementStyle = "padding-left:"
										+ (b.labelWidth + c) + "px"
							}
							if (b.labelAlign == "top") {
								this.labelStyle = "width:auto;";
								this.labelAdjust = 0;
								this.elementStyle = "padding-left:0;"
							}
						}
						if (!this.fieldTpl) {
							var a = new Ext.Template(
									'<div class="x-form-item {5}" tabIndex="-1">',
									'<label for="{0}" style="{2}" class="x-form-item-label">{1}{4}</label>',
									'<div class="x-form-element" id="x-form-el-{0}" style="{3}">',
									'</div><div class="{6}"></div>', "</div>");
							a.disableFormats = true;
							a.compile();
							Ext.layout.FormLayout.prototype.fieldTpl = a
						}
					},
					getLabelStyle : function(e) {
						var b = "", c = [this.labelStyle, e];
						for (var d = 0, a = c.length;d < a; ++d) {
							if (c[d]) {
								b += c[d];
								if (b.substr(-1, 1) != ";") {
									b += ";"
								}
							}
						}
						return b
					},
					renderItem : function(e, a, d) {
						if (e && !e.rendered && e.isFormField
								&& e.inputType != "hidden") {
							var b = [
									e.id,
									e.fieldLabel,
									this.getLabelStyle(e.labelStyle),
									this.elementStyle || "",
									typeof e.labelSeparator == "undefined"
											? this.labelSeparator
											: e.labelSeparator,
									(e.itemCls || this.container.itemCls || "")
											+ (e.hideLabel
													? " x-hide-label"
													: ""),
									e.clearCls || "x-form-clear-left"];
							if (typeof a == "number") {
								a = d.dom.childNodes[a] || null
							}
							if (a) {
								this.fieldTpl.insertBefore(a, b)
							} else {
								this.fieldTpl.append(d, b)
							}
							e.render("x-form-el-" + e.id)
						} else {
							Ext.layout.FormLayout.superclass.renderItem.apply(
									this, arguments)
						}
					},
					adjustWidthAnchor : function(b, a) {
						return b
								- (a.isFormField ? (a.hideLabel
										? 0
										: this.labelAdjust) : 0)
					},
					isValidParent : function(b, a) {
						return true
					}
				});
Ext.Container.LAYOUTS.form = Ext.layout.FormLayout;
Ext.layout.Accordion = Ext.extend(Ext.layout.FitLayout, {
	fill : true,
	autoWidth : true,
	titleCollapse : true,
	hideCollapseTool : false,
	collapseFirst : false,
	animate : false,
	sequence : false,
	activeOnTop : false,
	renderItem : function(a) {
		if (this.animate === false) {
			a.animCollapse = false
		}
		a.collapsible = true;
		if (this.autoWidth) {
			a.autoWidth = true
		}
		if (this.titleCollapse) {
			a.titleCollapse = true
		}
		if (this.hideCollapseTool) {
			a.hideCollapseTool = true
		}
		if (this.collapseFirst !== undefined) {
			a.collapseFirst = this.collapseFirst
		}
		if (!this.activeItem && !a.collapsed) {
			this.activeItem = a
		} else {
			if (this.activeItem) {
				a.collapsed = true
			}
		}
		Ext.layout.Accordion.superclass.renderItem.apply(this, arguments);
		a.header.addClass("x-accordion-hd");
		a.on("beforeexpand", this.beforeExpand, this)
	},
	beforeExpand : function(c, b) {
		var a = this.activeItem;
		if (a) {
			if (this.sequence) {
				delete this.activeItem;
				if (!a.collapsed) {
					a.collapse( {
						callback : function() {
							c.expand(b || true)
						},
						scope : this
					});
					return false
				}
			} else {
				a.collapse(this.animate)
			}
		}
		this.activeItem = c;
		if (this.activeOnTop) {
			c.el.dom.parentNode.insertBefore(c.el.dom,
					c.el.dom.parentNode.firstChild)
		}
		this.layout()
	},
	setItemSize : function(g, e) {
		if (this.fill && g) {
			var b = this.container.items.items;
			var d = 0;
			for (var c = 0, a = b.length;c < a; c++) {
				var h = b[c];
				if (h != g) {
					d += (h.getSize().height - h.bwrap.getHeight())
				}
			}
			e.height -= d;
			g.setSize(e)
		}
	}
});
Ext.Container.LAYOUTS.accordion = Ext.layout.Accordion;
Ext.layout.TableLayout = Ext.extend(Ext.layout.ContainerLayout, {
	monitorResize : false,
	setContainer : function(a) {
		Ext.layout.TableLayout.superclass.setContainer.call(this, a);
		this.currentRow = 0;
		this.currentColumn = 0;
		this.cells = []
	},
	onLayout : function(d, g) {
		var e = d.items.items, a = e.length, h, b;
		if (!this.table) {
			g.addClass("x-table-layout-ct");
			this.table = g.createChild( {
				tag : "table",
				cls : "x-table-layout",
				cellspacing : 0,
				cn : {
					tag : "tbody"
				}
			}, null, true);
			this.renderAll(d, g)
		}
	},
	getRow : function(a) {
		var b = this.table.tBodies[0].childNodes[a];
		if (!b) {
			b = document.createElement("tr");
			this.table.tBodies[0].appendChild(b)
		}
		return b
	},
	getNextCell : function(k) {
		var a = this.getNextNonSpan(this.currentColumn, this.currentRow);
		var g = this.currentColumn = a[0], e = this.currentRow = a[1];
		for (var i = e;i < e + (k.rowspan || 1); i++) {
			if (!this.cells[i]) {
				this.cells[i] = []
			}
			for (var d = g;d < g + (k.colspan || 1); d++) {
				this.cells[i][d] = true
			}
		}
		var h = document.createElement("td");
		if (k.cellId) {
			h.id = k.cellId
		}
		var b = "x-table-layout-cell";
		if (k.cellCls) {
			b += " " + k.cellCls
		}
		h.className = b;
		if (k.colspan) {
			h.colSpan = k.colspan
		}
		if (k.rowspan) {
			h.rowSpan = k.rowspan
		}
		this.getRow(e).appendChild(h);
		return h
	},
	getNextNonSpan : function(a, c) {
		var b = this.columns;
		while ((b && a >= b) || (this.cells[c] && this.cells[c][a])) {
			if (b && a >= b) {
				c++;
				a = 0
			} else {
				a++
			}
		}
		return [a, c]
	},
	renderItem : function(e, a, d) {
		if (e && !e.rendered) {
			e.render(this.getNextCell(e));
			if (this.extraCls) {
				var b = e.getPositionEl ? e.getPositionEl() : e;
				b.addClass(this.extraCls)
			}
		}
	},
	isValidParent : function(b, a) {
		return true
	}
});
Ext.Container.LAYOUTS.table = Ext.layout.TableLayout;
Ext.layout.AbsoluteLayout = Ext.extend(Ext.layout.AnchorLayout, {
	extraCls : "x-abs-layout-item",
	isForm : false,
	setContainer : function(a) {
		Ext.layout.AbsoluteLayout.superclass.setContainer.call(this, a);
		if (a.isXType("form")) {
			this.isForm = true
		}
	},
	onLayout : function(a, b) {
		if (this.isForm) {
			a.body.position()
		} else {
			b.position()
		}
		Ext.layout.AbsoluteLayout.superclass.onLayout.call(this, a, b)
	},
	getAnchorViewSize : function(a, b) {
		return this.isForm
				? a.body.getStyleSize()
				: Ext.layout.AbsoluteLayout.superclass.getAnchorViewSize.call(
						this, a, b)
	},
	isValidParent : function(b, a) {
		return this.isForm
				? true
				: Ext.layout.AbsoluteLayout.superclass.isValidParent.call(this,
						b, a)
	},
	adjustWidthAnchor : function(b, a) {
		return b ? b - a.getPosition(true)[0] : b
	},
	adjustHeightAnchor : function(b, a) {
		return b ? b - a.getPosition(true)[1] : b
	}
});
Ext.Container.LAYOUTS.absolute = Ext.layout.AbsoluteLayout;
Ext.Viewport = Ext.extend(Ext.Container, {
	initComponent : function() {
		Ext.Viewport.superclass.initComponent.call(this);
		document.getElementsByTagName("html")[0].className += " x-viewport";
		this.el = Ext.getBody();
		this.el.setHeight = Ext.emptyFn;
		this.el.setWidth = Ext.emptyFn;
		this.el.setSize = Ext.emptyFn;
		this.el.dom.scroll = "no";
		this.allowDomMove = false;
		this.autoWidth = true;
		this.autoHeight = true;
		Ext.EventManager.onWindowResize(this.fireResize, this);
		this.renderTo = this.el
	},
	fireResize : function(a, b) {
		this.fireEvent("resize", this, a, b, a, b)
	}
});
Ext.reg("viewport", Ext.Viewport);
Ext.Panel = Ext
		.extend(
				Ext.Container,
				{
					baseCls : "x-panel",
					collapsedCls : "x-panel-collapsed",
					maskDisabled : true,
					animCollapse : Ext.enableFx,
					headerAsText : true,
					buttonAlign : "right",
					collapsed : false,
					collapseFirst : true,
					minButtonWidth : 75,
					elements : "body",
					toolTarget : "header",
					collapseEl : "bwrap",
					slideAnchor : "t",
					disabledClass : "",
					deferHeight : true,
					expandDefaults : {
						duration : 0.25
					},
					collapseDefaults : {
						duration : 0.25
					},
					initComponent : function() {
						Ext.Panel.superclass.initComponent.call(this);
						this.addEvents("bodyresize", "titlechange",
								"iconchange", "collapse", "expand",
								"beforecollapse", "beforeexpand",
								"beforeclose", "close", "activate",
								"deactivate");
						if (this.tbar) {
							this.elements += ",tbar";
							if (typeof this.tbar == "object") {
								this.topToolbar = this.tbar
							}
							delete this.tbar
						}
						if (this.bbar) {
							this.elements += ",bbar";
							if (typeof this.bbar == "object") {
								this.bottomToolbar = this.bbar
							}
							delete this.bbar
						}
						if (this.header === true) {
							this.elements += ",header";
							delete this.header
						} else {
							if (this.title && this.header !== false) {
								this.elements += ",header"
							}
						}
						if (this.footer === true) {
							this.elements += ",footer";
							delete this.footer
						}
						if (this.buttons) {
							var c = this.buttons;
							this.buttons = [];
							for (var b = 0, a = c.length;b < a; b++) {
								if (c[b].render) {
									c[b].ownerCt = this;
									this.buttons.push(c[b])
								} else {
									this.addButton(c[b])
								}
							}
						}
						if (this.autoLoad) {
							this.on("render", this.doAutoLoad, this, {
								delay : 10
							})
						}
					},
					createElement : function(a, c) {
						if (this[a]) {
							c.appendChild(this[a].dom);
							return
						}
						if (a === "bwrap" || this.elements.indexOf(a) != -1) {
							if (this[a + "Cfg"]) {
								this[a] = Ext.fly(c)
										.createChild(this[a + "Cfg"])
							} else {
								var b = document.createElement("div");
								b.className = this[a + "Cls"];
								this[a] = Ext.get(c.appendChild(b))
							}
							if (this[a + "CssClass"]) {
								this[a].addClass(this[a + "CssClass"])
							}
							if (this[a + "Style"]) {
								this[a].applyStyles(this[a + "Style"])
							}
						}
					},
					onRender : function(m, l) {
						Ext.Panel.superclass.onRender.call(this, m, l);
						this.createClasses();
						if (this.el) {
							this.el.addClass(this.baseCls);
							this.header = this.el.down("." + this.headerCls);
							this.bwrap = this.el.down("." + this.bwrapCls);
							var r = this.bwrap ? this.bwrap : this.el;
							this.tbar = r.down("." + this.tbarCls);
							this.body = r.down("." + this.bodyCls);
							this.bbar = r.down("." + this.bbarCls);
							this.footer = r.down("." + this.footerCls);
							this.fromMarkup = true
						} else {
							this.el = m.createChild( {
								id : this.id,
								cls : this.baseCls
							}, l)
						}
						var a = this.el, p = a.dom;
						if (this.cls) {
							this.el.addClass(this.cls)
						}
						if (this.buttons) {
							this.elements += ",footer"
						}
						if (this.frame) {
							a.insertHtml("afterBegin", String.format(
									Ext.Element.boxMarkup, this.baseCls));
							this.createElement("header",
									p.firstChild.firstChild.firstChild);
							this.createElement("bwrap", p);
							var t = this.bwrap.dom;
							var h = p.childNodes[1], c = p.childNodes[2];
							t.appendChild(h);
							t.appendChild(c);
							var u = t.firstChild.firstChild.firstChild;
							this.createElement("tbar", u);
							this.createElement("body", u);
							this.createElement("bbar", u);
							this.createElement("footer",
									t.lastChild.firstChild.firstChild);
							if (!this.footer) {
								this.bwrap.dom.lastChild.className += " x-panel-nofooter"
							}
						} else {
							this.createElement("header", p);
							this.createElement("bwrap", p);
							var t = this.bwrap.dom;
							this.createElement("tbar", t);
							this.createElement("body", t);
							this.createElement("bbar", t);
							this.createElement("footer", t);
							if (!this.header) {
								this.body.addClass(this.bodyCls + "-noheader");
								if (this.tbar) {
									this.tbar.addClass(this.tbarCls
											+ "-noheader")
								}
							}
						}
						if (this.border === false) {
							this.el.addClass(this.baseCls + "-noborder");
							this.body.addClass(this.bodyCls + "-noborder");
							if (this.header) {
								this.header.addClass(this.headerCls
										+ "-noborder")
							}
							if (this.footer) {
								this.footer.addClass(this.footerCls
										+ "-noborder")
							}
							if (this.tbar) {
								this.tbar.addClass(this.tbarCls + "-noborder")
							}
							if (this.bbar) {
								this.bbar.addClass(this.bbarCls + "-noborder")
							}
						}
						if (this.bodyBorder === false) {
							this.body.addClass(this.bodyCls + "-noborder")
						}
						this.bwrap.enableDisplayMode("block");
						if (this.header) {
							this.header.unselectable();
							if (this.headerAsText) {
								this.header.dom.innerHTML = '<span class="'
										+ this.headerTextCls + '">'
										+ this.header.dom.innerHTML + "</span>";
								if (this.iconCls) {
									this.setIconClass(this.iconCls)
								}
							}
						}
						if (this.floating) {
							this.makeFloating(this.floating)
						}
						if (this.collapsible) {
							this.tools = this.tools ? this.tools.slice(0) : [];
							if (!this.hideCollapseTool) {
								this.tools[this.collapseFirst
										? "unshift"
										: "push"]( {
									id : "toggle",
									handler : this.toggleCollapse,
									scope : this
								})
							}
							if (this.titleCollapse && this.header) {
								this.header.on("click", this.toggleCollapse,
										this);
								this.header.setStyle("cursor", "pointer")
							}
						}
						if (this.tools) {
							var o = this.tools;
							this.tools = {};
							this.addTool.apply(this, o)
						} else {
							this.tools = {}
						}
						if (this.buttons && this.buttons.length > 0) {
							var g = this.footer
									.createChild(
											{
												cls : "x-panel-btns-ct",
												cn : {
													cls : "x-panel-btns x-panel-btns-"
															+ this.buttonAlign,
													html : '<table cellspacing="0"><tbody><tr></tr></tbody></table><div class="x-clear"></div>'
												}
											}, null, true);
							var q = g.getElementsByTagName("tr")[0];
							for (var k = 0, n = this.buttons.length;k < n; k++) {
								var s = this.buttons[k];
								var e = document.createElement("td");
								e.className = "x-panel-btn-td";
								s.render(q.appendChild(e))
							}
						}
						if (this.tbar && this.topToolbar) {
							if (Ext.isArray(this.topToolbar)) {
								this.topToolbar = new Ext.Toolbar(this.topToolbar)
							}
							this.topToolbar.render(this.tbar);
							this.topToolbar.ownerCt = this
						}
						if (this.bbar && this.bottomToolbar) {
							if (Ext.isArray(this.bottomToolbar)) {
								this.bottomToolbar = new Ext.Toolbar(this.bottomToolbar)
							}
							this.bottomToolbar.render(this.bbar);
							this.bottomToolbar.ownerCt = this
						}
					},
					setIconClass : function(b) {
						var a = this.iconCls;
						this.iconCls = b;
						if (this.rendered && this.header) {
							if (this.frame) {
								this.header.addClass("x-panel-icon");
								this.header.replaceClass(a, this.iconCls)
							} else {
								var d = this.header.dom;
								var c = d.firstChild
										&& String(d.firstChild.tagName)
												.toLowerCase() == "img"
										? d.firstChild
										: null;
								if (c) {
									Ext.fly(c).replaceClass(a, this.iconCls)
								} else {
									Ext.DomHelper.insertBefore(d.firstChild, {
										tag : "img",
										src : Ext.BLANK_IMAGE_URL,
										cls : "x-panel-inline-icon "
												+ this.iconCls
									})
								}
							}
						}
						this.fireEvent("iconchange", this, b, a)
					},
					makeFloating : function(a) {
						this.floating = true;
						this.el = new Ext.Layer(typeof a == "object" ? a : {
							shadow : this.shadow !== undefined
									? this.shadow
									: "sides",
							shadowOffset : this.shadowOffset,
							constrain : false,
							shim : this.shim === false ? false : undefined
						}, this.el)
					},
					getTopToolbar : function() {
						return this.topToolbar
					},
					getBottomToolbar : function() {
						return this.bottomToolbar
					},
					addButton : function(a, d, c) {
						var e = {
							handler : d,
							scope : c,
							minWidth : this.minButtonWidth,
							hideParent : true
						};
						if (typeof a == "string") {
							e.text = a
						} else {
							Ext.apply(e, a)
						}
						var b = new Ext.Button(e);
						b.ownerCt = this;
						if (!this.buttons) {
							this.buttons = []
						}
						this.buttons.push(b);
						return b
					},
					addTool : function() {
						if (!this[this.toolTarget]) {
							return
						}
						if (!this.toolTemplate) {
							var h = new Ext.Template('<div class="x-tool x-tool-{id}">&#160;</div>');
							h.disableFormats = true;
							h.compile();
							Ext.Panel.prototype.toolTemplate = h
						}
						for (var g = 0, d = arguments, c = d.length;g < c; g++) {
							var b = d[g];
							if (!this.tools[b.id]) {
								var k = "x-tool-" + b.id + "-over";
								var e = this.toolTemplate
										.insertFirst((b.align !== "left")
												? this[this.toolTarget]
												: this[this.toolTarget]
														.child("span"), b, true);
								this.tools[b.id] = e;
								e.enableDisplayMode("block");
								e.on("click", this.createToolHandler(e, b, k,
										this));
								if (b.on) {
									e.on(b.on)
								}
								if (b.hidden) {
									e.hide()
								}
								if (b.qtip) {
									if (typeof b.qtip == "object") {
										Ext.QuickTips.register(Ext.apply( {
											target : e.id
										}, b.qtip))
									} else {
										e.dom.qtip = b.qtip
									}
								}
								e.addClassOnOver(k)
							}
						}
					},
					onShow : function() {
						if (this.floating) {
							return this.el.show()
						}
						Ext.Panel.superclass.onShow.call(this)
					},
					onHide : function() {
						if (this.floating) {
							return this.el.hide()
						}
						Ext.Panel.superclass.onHide.call(this)
					},
					createToolHandler : function(c, a, d, b) {
						return function(g) {
							c.removeClass(d);
							g.stopEvent();
							if (a.handler) {
								a.handler.call(a.scope || c, g, c, b)
							}
						}
					},
					afterRender : function() {
						if (this.fromMarkup && this.height === undefined
								&& !this.autoHeight) {
							this.height = this.el.getHeight()
						}
						if (this.floating && !this.hidden && !this.initHidden) {
							this.el.show()
						}
						if (this.title) {
							this.setTitle(this.title)
						}
						this.setAutoScroll();
						if (this.html) {
							this.body.update(typeof this.html == "object"
									? Ext.DomHelper.markup(this.html)
									: this.html);
							delete this.html
						}
						if (this.contentEl) {
							var a = Ext.getDom(this.contentEl);
							Ext.fly(a).removeClass(["x-hidden",
									"x-hide-display"]);
							this.body.dom.appendChild(a)
						}
						if (this.collapsed) {
							this.collapsed = false;
							this.collapse(false)
						}
						Ext.Panel.superclass.afterRender.call(this);
						this.initEvents()
					},
					setAutoScroll : function() {
						if (this.rendered && this.autoScroll) {
							var a = this.body || this.el;
							if (a) {
								a.setOverflow("auto")
							}
						}
					},
					getKeyMap : function() {
						if (!this.keyMap) {
							this.keyMap = new Ext.KeyMap(this.el, this.keys)
						}
						return this.keyMap
					},
					initEvents : function() {
						if (this.keys) {
							this.getKeyMap()
						}
						if (this.draggable) {
							this.initDraggable()
						}
					},
					initDraggable : function() {
						this.dd = new Ext.Panel.DD(this,
								typeof this.draggable == "boolean"
										? null
										: this.draggable)
					},
					beforeEffect : function() {
						if (this.floating) {
							this.el.beforeAction()
						}
						this.el.addClass("x-panel-animated")
					},
					afterEffect : function() {
						this.syncShadow();
						this.el.removeClass("x-panel-animated")
					},
					createEffect : function(c, b, d) {
						var e = {
							scope : d,
							block : true
						};
						if (c === true) {
							e.callback = b;
							return e
						} else {
							if (!c.callback) {
								e.callback = b
							} else {
								e.callback = function() {
									b.call(d);
									Ext.callback(c.callback, c.scope)
								}
							}
						}
						return Ext.applyIf(e, c)
					},
					collapse : function(b) {
						if (this.collapsed
								|| this.el.hasFxBlock()
								|| this.fireEvent("beforecollapse", this, b) === false) {
							return
						}
						var a = b === true
								|| (b !== false && this.animCollapse);
						this.beforeEffect();
						this.onCollapse(a, b);
						return this
					},
					onCollapse : function(a, b) {
						if (a) {
							this[this.collapseEl].slideOut(this.slideAnchor,
									Ext.apply(this.createEffect(b || true,
											this.afterCollapse, this),
											this.collapseDefaults))
						} else {
							this[this.collapseEl].hide();
							this.afterCollapse()
						}
					},
					afterCollapse : function() {
						this.collapsed = true;
						this.el.addClass(this.collapsedCls);
						this.afterEffect();
						this.fireEvent("collapse", this)
					},
					expand : function(b) {
						if (!this.collapsed
								|| this.el.hasFxBlock()
								|| this.fireEvent("beforeexpand", this, b) === false) {
							return
						}
						var a = b === true
								|| (b !== false && this.animCollapse);
						this.el.removeClass(this.collapsedCls);
						this.beforeEffect();
						this.onExpand(a, b);
						return this
					},
					onExpand : function(a, b) {
						if (a) {
							this[this.collapseEl].slideIn(this.slideAnchor, Ext
									.apply(this.createEffect(b || true,
											this.afterExpand, this),
											this.expandDefaults))
						} else {
							this[this.collapseEl].show();
							this.afterExpand()
						}
					},
					afterExpand : function() {
						this.collapsed = false;
						this.afterEffect();
						this.fireEvent("expand", this)
					},
					toggleCollapse : function(a) {
						this[this.collapsed ? "expand" : "collapse"](a);
						return this
					},
					onDisable : function() {
						if (this.rendered && this.maskDisabled) {
							this.el.mask()
						}
						Ext.Panel.superclass.onDisable.call(this)
					},
					onEnable : function() {
						if (this.rendered && this.maskDisabled) {
							this.el.unmask()
						}
						Ext.Panel.superclass.onEnable.call(this)
					},
					onResize : function(a, b) {
						if (a !== undefined || b !== undefined) {
							if (!this.collapsed) {
								if (typeof a == "number") {
									this.body.setWidth(this.adjustBodyWidth(a
											- this.getFrameWidth()))
								} else {
									if (a == "auto") {
										this.body.setWidth(a)
									}
								}
								if (typeof b == "number") {
									this.body.setHeight(this.adjustBodyHeight(b
											- this.getFrameHeight()))
								} else {
									if (b == "auto") {
										this.body.setHeight(b)
									}
								}
								if (this.disabled && this.el._mask) {
									this.el._mask.setSize(
											this.el.dom.clientWidth, this.el
													.getHeight())
								}
							} else {
								this.queuedBodySize = {
									width : a,
									height : b
								};
								if (!this.queuedExpand
										&& this.allowQueuedExpand !== false) {
									this.queuedExpand = true;
									this.on("expand", function() {
										delete this.queuedExpand;
										this.onResize(
												this.queuedBodySize.width,
												this.queuedBodySize.height);
										this.doLayout()
									}, this, {
										single : true
									})
								}
							}
							this.fireEvent("bodyresize", this, a, b)
						}
						this.syncShadow()
					},
					adjustBodyHeight : function(a) {
						return a
					},
					adjustBodyWidth : function(a) {
						return a
					},
					onPosition : function() {
						this.syncShadow()
					},
					getFrameWidth : function() {
						var b = this.el.getFrameWidth("lr");
						if (this.frame) {
							var a = this.bwrap.dom.firstChild;
							b += (Ext.fly(a).getFrameWidth("l") + Ext
									.fly(a.firstChild).getFrameWidth("r"));
							var c = this.bwrap.dom.firstChild.firstChild.firstChild;
							b += Ext.fly(c).getFrameWidth("lr")
						}
						return b
					},
					getFrameHeight : function() {
						var a = this.el.getFrameWidth("tb");
						a += (this.tbar ? this.tbar.getHeight() : 0)
								+ (this.bbar ? this.bbar.getHeight() : 0);
						if (this.frame) {
							var c = this.el.dom.firstChild;
							var d = this.bwrap.dom.lastChild;
							a += (c.offsetHeight + d.offsetHeight);
							var b = this.bwrap.dom.firstChild.firstChild.firstChild;
							a += Ext.fly(b).getFrameWidth("tb")
						} else {
							a += (this.header ? this.header.getHeight() : 0)
									+ (this.footer
											? this.footer.getHeight()
											: 0)
						}
						return a
					},
					getInnerWidth : function() {
						return this.getSize().width - this.getFrameWidth()
					},
					getInnerHeight : function() {
						return this.getSize().height - this.getFrameHeight()
					},
					syncShadow : function() {
						if (this.floating) {
							this.el.sync(true)
						}
					},
					getLayoutTarget : function() {
						return this.body
					},
					setTitle : function(b, a) {
						this.title = b;
						if (this.header && this.headerAsText) {
							this.header.child("span").update(b)
						}
						if (a) {
							this.setIconClass(a)
						}
						this.fireEvent("titlechange", this, b);
						return this
					},
					getUpdater : function() {
						return this.body.getUpdater()
					},
					load : function() {
						var a = this.body.getUpdater();
						a.update.apply(a, arguments);
						return this
					},
					beforeDestroy : function() {
						if (this.header) {
							this.header.removeAllListeners();
							if (this.headerAsText) {
								Ext.Element.uncache(this.header.child("span"))
							}
						}
						Ext.Element.uncache(this.header, this.tbar, this.bbar,
								this.footer, this.body, this.bwrap);
						if (this.tools) {
							for (var c in this.tools) {
								Ext.destroy(this.tools[c])
							}
						}
						if (this.buttons) {
							for (var a in this.buttons) {
								Ext.destroy(this.buttons[a])
							}
						}
						Ext.destroy(this.topToolbar, this.bottomToolbar);
						Ext.Panel.superclass.beforeDestroy.call(this)
					},
					createClasses : function() {
						this.headerCls = this.baseCls + "-header";
						this.headerTextCls = this.baseCls + "-header-text";
						this.bwrapCls = this.baseCls + "-bwrap";
						this.tbarCls = this.baseCls + "-tbar";
						this.bodyCls = this.baseCls + "-body";
						this.bbarCls = this.baseCls + "-bbar";
						this.footerCls = this.baseCls + "-footer"
					},
					createGhost : function(a, e, b) {
						var d = document.createElement("div");
						d.className = "x-panel-ghost " + (a ? a : "");
						if (this.header) {
							d.appendChild(this.el.dom.firstChild
									.cloneNode(true))
						}
						Ext.fly(d.appendChild(document.createElement("ul")))
								.setHeight(this.bwrap.getHeight());
						d.style.width = this.el.dom.offsetWidth + "px";
						if (!b) {
							this.container.dom.appendChild(d)
						} else {
							Ext.getDom(b).appendChild(d)
						}
						if (e !== false && this.el.useShim !== false) {
							var c = new Ext.Layer( {
								shadow : false,
								useDisplay : true,
								constrain : false
							}, d);
							c.show();
							return c
						} else {
							return new Ext.Element(d)
						}
					},
					doAutoLoad : function() {
						this.body.load(typeof this.autoLoad == "object"
								? this.autoLoad
								: {
									url : this.autoLoad
								})
					},
					getTool : function(a) {
						return this.tools[a]
					}
				});
Ext.reg("panel", Ext.Panel);
Ext.Window = Ext
		.extend(
				Ext.Panel,
				{
					baseCls : "x-window",
					resizable : true,
					draggable : true,
					closable : true,
					constrain : false,
					constrainHeader : false,
					plain : false,
					minimizable : false,
					maximizable : false,
					minHeight : 100,
					minWidth : 200,
					expandOnShow : true,
					closeAction : "close",
					elements : "header,body",
					collapsible : false,
					initHidden : true,
					monitorResize : true,
					frame : true,
					floating : true,
					initComponent : function() {
						Ext.Window.superclass.initComponent.call(this);
						this.addEvents("resize", "maximize", "minimize",
								"restore")
					},
					getState : function() {
						return Ext.apply(Ext.Window.superclass.getState
								.call(this)
								|| {}, this.getBox())
					},
					onRender : function(b, a) {
						Ext.Window.superclass.onRender.call(this, b, a);
						if (this.plain) {
							this.el.addClass("x-window-plain")
						}
						this.focusEl = this.el.createChild( {
							tag : "a",
							href : "#",
							cls : "x-dlg-focus",
							tabIndex : "-1",
							html : "&#160;"
						});
						this.focusEl.swallowEvent("click", true);
						this.proxy = this.el.createProxy("x-window-proxy");
						this.proxy.enableDisplayMode("block");
						if (this.modal) {
							this.mask = this.container.createChild( {
								cls : "ext-el-mask"
							}, this.el.dom);
							this.mask.enableDisplayMode("block");
							this.mask.hide();
							this.mask.on("click", this.focus, this)
						}
					},
					initEvents : function() {
						Ext.Window.superclass.initEvents.call(this);
						if (this.animateTarget) {
							this.setAnimateTarget(this.animateTarget)
						}
						if (this.resizable) {
							this.resizer = new Ext.Resizable(this.el, {
								minWidth : this.minWidth,
								minHeight : this.minHeight,
								handles : this.resizeHandles || "all",
								pinned : true,
								resizeElement : this.resizerAction
							});
							this.resizer.window = this;
							this.resizer.on("beforeresize", this.beforeResize,
									this)
						}
						if (this.draggable) {
							this.header.addClass("x-window-draggable")
						}
						this.initTools();
						this.el.on("mousedown", this.toFront, this);
						this.manager = this.manager || Ext.WindowMgr;
						this.manager.register(this);
						this.hidden = true;
						if (this.maximized) {
							this.maximized = false;
							this.maximize()
						}
						if (this.closable) {
							var a = this.getKeyMap();
							a.on(27, this.onEsc, this);
							a.disable()
						}
					},
					initDraggable : function() {
						this.dd = new Ext.Window.DD(this)
					},
					onEsc : function() {
						this[this.closeAction]()
					},
					beforeDestroy : function() {
						this.hide();
						if (this.doAnchor) {
							Ext.EventManager.removeResizeListener(
									this.doAnchor, this);
							Ext.EventManager.un(window, "scroll",
									this.doAnchor, this)
						}
						Ext.destroy(this.focusEl, this.resizer, this.dd,
								this.proxy, this.mask);
						Ext.Window.superclass.beforeDestroy.call(this)
					},
					onDestroy : function() {
						if (this.manager) {
							this.manager.unregister(this)
						}
						Ext.Window.superclass.onDestroy.call(this)
					},
					initTools : function() {
						if (this.minimizable) {
							this.addTool( {
								id : "minimize",
								handler : this.minimize
										.createDelegate(this, [])
							})
						}
						if (this.maximizable) {
							this.addTool( {
								id : "maximize",
								handler : this.maximize
										.createDelegate(this, [])
							});
							this
									.addTool( {
										id : "restore",
										handler : this.restore.createDelegate(
												this, []),
										hidden : true
									});
							this.header.on("dblclick", this.toggleMaximize,
									this)
						}
						if (this.closable) {
							this.addTool( {
								id : "close",
								handler : this[this.closeAction]
										.createDelegate(this, [])
							})
						}
					},
					resizerAction : function() {
						var a = this.proxy.getBox();
						this.proxy.hide();
						this.window.handleResize(a);
						return a
					},
					beforeResize : function() {
						this.resizer.minHeight = Math.max(this.minHeight, this
								.getFrameHeight()
								+ 40);
						this.resizer.minWidth = Math.max(this.minWidth, this
								.getFrameWidth()
								+ 40);
						this.resizeBox = this.el.getBox()
					},
					updateHandles : function() {
						if (Ext.isIE && this.resizer) {
							this.resizer.syncHandleHeight();
							this.el.repaint()
						}
					},
					handleResize : function(b) {
						var a = this.resizeBox;
						if (a.x != b.x || a.y != b.y) {
							this.updateBox(b)
						} else {
							this.setSize(b)
						}
						this.focus();
						this.updateHandles();
						this.saveState();
						if (this.layout) {
							this.doLayout()
						}
						this.fireEvent("resize", this, b.width, b.height)
					},
					focus : function() {
						var c = this.focusEl, a = this.defaultButton, b = typeof a;
						if (b != "undefined") {
							if (b == "number") {
								c = this.buttons[a]
							} else {
								if (b == "string") {
									c = Ext.getCmp(a)
								} else {
									c = a
								}
							}
						}
						c.focus.defer(10, c)
					},
					setAnimateTarget : function(a) {
						a = Ext.get(a);
						this.animateTarget = a
					},
					beforeShow : function() {
						delete this.el.lastXY;
						delete this.el.lastLT;
						if (this.x === undefined || this.y === undefined) {
							var a = this.el.getAlignToXY(this.container, "c-c");
							var b = this.el.translatePoints(a[0], a[1]);
							this.x = this.x === undefined ? b.left : this.x;
							this.y = this.y === undefined ? b.top : this.y
						}
						this.el.setLeftTop(this.x, this.y);
						if (this.expandOnShow) {
							this.expand(false)
						}
						if (this.modal) {
							Ext.getBody().addClass("x-body-masked");
							this.mask.setSize(Ext.lib.Dom.getViewWidth(true),
									Ext.lib.Dom.getViewHeight(true));
							this.mask.show()
						}
					},
					show : function(c, a, b) {
						if (!this.rendered) {
							this.render(Ext.getBody())
						}
						if (this.hidden === false) {
							this.toFront();
							return
						}
						if (this.fireEvent("beforeshow", this) === false) {
							return
						}
						if (a) {
							this.on("show", a, b, {
								single : true
							})
						}
						this.hidden = false;
						if (c !== undefined) {
							this.setAnimateTarget(c)
						}
						this.beforeShow();
						if (this.animateTarget) {
							this.animShow()
						} else {
							this.afterShow()
						}
					},
					afterShow : function() {
						this.proxy.hide();
						this.el.setStyle("display", "block");
						this.el.show();
						if (this.maximized) {
							this.fitContainer()
						}
						if (Ext.isMac && Ext.isGecko) {
							this.cascade(this.setAutoScroll)
						}
						if (this.monitorResize || this.modal || this.constrain
								|| this.constrainHeader) {
							Ext.EventManager.onWindowResize(
									this.onWindowResize, this)
						}
						this.doConstrain();
						if (this.layout) {
							this.doLayout()
						}
						if (this.keyMap) {
							this.keyMap.enable()
						}
						this.toFront();
						this.updateHandles();
						this.fireEvent("show", this)
					},
					animShow : function() {
						this.proxy.show();
						this.proxy.setBox(this.animateTarget.getBox());
						this.proxy.setOpacity(0);
						var a = this.getBox(false);
						a.callback = this.afterShow;
						a.scope = this;
						a.duration = 0.25;
						a.easing = "easeNone";
						a.opacity = 0.5;
						a.block = true;
						this.el.setStyle("display", "none");
						this.proxy.shift(a)
					},
					hide : function(c, a, b) {
						if (this.activeGhost) {
							this.hide.defer(100, this, [c, a, b]);
							return
						}
						if (this.hidden
								|| this.fireEvent("beforehide", this) === false) {
							return
						}
						if (a) {
							this.on("hide", a, b, {
								single : true
							})
						}
						this.hidden = true;
						if (c !== undefined) {
							this.setAnimateTarget(c)
						}
						if (this.animateTarget) {
							this.animHide()
						} else {
							this.el.hide();
							this.afterHide()
						}
					},
					afterHide : function() {
						this.proxy.hide();
						if (this.monitorResize || this.modal || this.constrain
								|| this.constrainHeader) {
							Ext.EventManager.removeResizeListener(
									this.onWindowResize, this)
						}
						if (this.modal) {
							this.mask.hide();
							Ext.getBody().removeClass("x-body-masked")
						}
						if (this.keyMap) {
							this.keyMap.disable()
						}
						this.fireEvent("hide", this)
					},
					animHide : function() {
						this.proxy.setOpacity(0.5);
						this.proxy.show();
						var c = this.getBox(false);
						this.proxy.setBox(c);
						this.el.hide();
						var a = this.animateTarget.getBox();
						a.callback = this.afterHide;
						a.scope = this;
						a.duration = 0.25;
						a.easing = "easeNone";
						a.block = true;
						a.opacity = 0;
						this.proxy.shift(a)
					},
					onWindowResize : function() {
						if (this.maximized) {
							this.fitContainer()
						}
						if (this.modal) {
							this.mask.setSize("100%", "100%");
							var a = this.mask.dom.offsetHeight;
							this.mask.setSize(Ext.lib.Dom.getViewWidth(true),
									Ext.lib.Dom.getViewHeight(true))
						}
						this.doConstrain()
					},
					doConstrain : function() {
						if (this.constrain || this.constrainHeader) {
							var b;
							if (this.constrain) {
								b = {
									right : this.el.shadowOffset,
									left : this.el.shadowOffset,
									bottom : this.el.shadowOffset
								}
							} else {
								var a = this.getSize();
								b = {
									right : -(a.width - 100),
									bottom : -(a.height - 25)
								}
							}
							var c = this.el.getConstrainToXY(this.container,
									true, b);
							if (c) {
								this.setPosition(c[0], c[1])
							}
						}
					},
					ghost : function(a) {
						var c = this.createGhost(a);
						var b = this.getBox(true);
						c.setLeftTop(b.x, b.y);
						c.setWidth(b.width);
						this.el.hide();
						this.activeGhost = c;
						return c
					},
					unghost : function(b, a) {
						if (b !== false) {
							this.el.show();
							this.focus();
							if (Ext.isMac && Ext.isGecko) {
								this.cascade(this.setAutoScroll)
							}
						}
						if (a !== false) {
							this.setPosition(this.activeGhost.getLeft(true),
									this.activeGhost.getTop(true))
						}
						this.activeGhost.hide();
						this.activeGhost.remove();
						delete this.activeGhost
					},
					minimize : function() {
						this.fireEvent("minimize", this)
					},
					close : function() {
						if (this.fireEvent("beforeclose", this) !== false) {
							this.hide(null, function() {
								this.fireEvent("close", this);
								this.destroy()
							}, this)
						}
					},
					maximize : function() {
						if (!this.maximized) {
							this.expand(false);
							this.restoreSize = this.getSize();
							this.restorePos = this.getPosition(true);
							if (this.maximizable) {
								this.tools.maximize.hide();
								this.tools.restore.show()
							}
							this.maximized = true;
							this.el.disableShadow();
							if (this.dd) {
								this.dd.lock()
							}
							if (this.collapsible) {
								this.tools.toggle.hide()
							}
							this.el.addClass("x-window-maximized");
							this.container.addClass("x-window-maximized-ct");
							this.setPosition(0, 0);
							this.fitContainer();
							this.fireEvent("maximize", this)
						}
					},
					restore : function() {
						if (this.maximized) {
							this.el.removeClass("x-window-maximized");
							this.tools.restore.hide();
							this.tools.maximize.show();
							this.setPosition(this.restorePos[0],
									this.restorePos[1]);
							this.setSize(this.restoreSize.width,
									this.restoreSize.height);
							delete this.restorePos;
							delete this.restoreSize;
							this.maximized = false;
							this.el.enableShadow(true);
							if (this.dd) {
								this.dd.unlock()
							}
							if (this.collapsible) {
								this.tools.toggle.show()
							}
							this.container.removeClass("x-window-maximized-ct");
							this.doConstrain();
							this.fireEvent("restore", this)
						}
					},
					toggleMaximize : function() {
						this[this.maximized ? "restore" : "maximize"]()
					},
					fitContainer : function() {
						var a = this.container.getViewSize();
						this.setSize(a.width, a.height)
					},
					setZIndex : function(a) {
						if (this.modal) {
							this.mask.setStyle("z-index", a)
						}
						this.el.setZIndex(++a);
						a += 5;
						if (this.resizer) {
							this.resizer.proxy.setStyle("z-index", ++a)
						}
						this.lastZIndex = a
					},
					alignTo : function(b, a, c) {
						var d = this.el.getAlignToXY(b, a, c);
						this.setPagePosition(d[0], d[1]);
						return this
					},
					anchorTo : function(c, e, d, b) {
						if (this.doAnchor) {
							Ext.EventManager.removeResizeListener(
									this.doAnchor, this);
							Ext.EventManager.un(window, "scroll",
									this.doAnchor, this)
						}
						this.doAnchor = function() {
							this.alignTo(c, e, d)
						};
						Ext.EventManager.onWindowResize(this.doAnchor, this);
						var a = typeof b;
						if (a != "undefined") {
							Ext.EventManager.on(window, "scroll",
									this.doAnchor, this, {
										buffer : a == "number" ? b : 50
									})
						}
						this.doAnchor();
						return this
					},
					toFront : function(a) {
						if (this.manager.bringToFront(this)) {
							if (!a || !a.getTarget().focus) {
								this.focus()
							}
						}
						return this
					},
					setActive : function(a) {
						if (a) {
							if (!this.maximized) {
								this.el.enableShadow(true)
							}
							this.fireEvent("activate", this)
						} else {
							this.el.disableShadow();
							this.fireEvent("deactivate", this)
						}
					},
					toBack : function() {
						this.manager.sendToBack(this);
						return this
					},
					center : function() {
						var a = this.el.getAlignToXY(this.container, "c-c");
						this.setPagePosition(a[0], a[1]);
						return this
					}
				});
Ext.reg("window", Ext.Window);
Ext.Window.DD = function(a) {
	this.win = a;
	Ext.Window.DD.superclass.constructor
			.call(this, a.el.id, "WindowDD-" + a.id);
	this.setHandleElId(a.header.id);
	this.scroll = false
};
Ext.extend(Ext.Window.DD, Ext.dd.DD, {
	moveOnly : true,
	headerOffsets : [100, 25],
	startDrag : function() {
		var a = this.win;
		this.proxy = a.ghost();
		if (a.constrain !== false) {
			var c = a.el.shadowOffset;
			this.constrainTo(a.container, {
				right : c,
				left : c,
				bottom : c
			})
		} else {
			if (a.constrainHeader !== false) {
				var b = this.proxy.getSize();
				this.constrainTo(a.container, {
					right : -(b.width - this.headerOffsets[0]),
					bottom : -(b.height - this.headerOffsets[1])
				})
			}
		}
	},
	b4Drag : Ext.emptyFn,
	onDrag : function(a) {
		this.alignElWithMouse(this.proxy, a.getPageX(), a.getPageY())
	},
	endDrag : function(a) {
		this.win.unghost();
		this.win.saveState()
	}
});
Ext.WindowGroup = function() {
	var g = {};
	var d = [];
	var e = null;
	var c = function(k, i) {
		return (!k._lastAccess || k._lastAccess < i._lastAccess) ? -1 : 1
	};
	var h = function() {
		var m = d, k = m.length;
		if (k > 0) {
			m.sort(c);
			var l = m[0].manager.zseed;
			for (var n = 0;n < k; n++) {
				var o = m[n];
				if (o && !o.hidden) {
					o.setZIndex(l + (n * 10))
				}
			}
		}
		a()
	};
	var b = function(i) {
		if (i != e) {
			if (e) {
				e.setActive(false)
			}
			e = i;
			if (i) {
				i.setActive(true)
			}
		}
	};
	var a = function() {
		for (var k = d.length - 1;k >= 0; --k) {
			if (!d[k].hidden) {
				b(d[k]);
				return
			}
		}
		b(null)
	};
	return {
		zseed : 9000,
		register : function(i) {
			g[i.id] = i;
			d.push(i);
			i.on("hide", a)
		},
		unregister : function(i) {
			delete g[i.id];
			i.un("hide", a);
			d.remove(i)
		},
		get : function(i) {
			return typeof i == "object" ? i : g[i]
		},
		bringToFront : function(i) {
			i = this.get(i);
			if (i != e) {
				i._lastAccess = new Date().getTime();
				h();
				return true
			}
			return false
		},
		sendToBack : function(i) {
			i = this.get(i);
			i._lastAccess = -(new Date().getTime());
			h();
			return i
		},
		hideAll : function() {
			for (var i in g) {
				if (g[i] && typeof g[i] != "function" && g[i].isVisible()) {
					g[i].hide()
				}
			}
		},
		getActive : function() {
			return e
		},
		getBy : function(m, l) {
			var n = [];
			for (var k = d.length - 1;k >= 0; --k) {
				var o = d[k];
				if (m.call(l || o, o) !== false) {
					n.push(o)
				}
			}
			return n
		},
		each : function(k, i) {
			for (var l in g) {
				if (g[l] && typeof g[l] != "function") {
					if (k.call(i || g[l], g[l]) === false) {
						return
					}
				}
			}
		}
	}
};
Ext.WindowMgr = new Ext.WindowGroup();
Ext.dd.PanelProxy = function(a, b) {
	this.panel = a;
	this.id = this.panel.id + "-ddproxy";
	Ext.apply(this, b)
};
Ext.dd.PanelProxy.prototype = {
	insertProxy : true,
	setStatus : Ext.emptyFn,
	reset : Ext.emptyFn,
	update : Ext.emptyFn,
	stop : Ext.emptyFn,
	sync : Ext.emptyFn,
	getEl : function() {
		return this.ghost
	},
	getGhost : function() {
		return this.ghost
	},
	getProxy : function() {
		return this.proxy
	},
	hide : function() {
		if (this.ghost) {
			if (this.proxy) {
				this.proxy.remove();
				delete this.proxy
			}
			this.panel.el.dom.style.display = "";
			this.ghost.remove();
			delete this.ghost
		}
	},
	show : function() {
		if (!this.ghost) {
			this.ghost = this.panel.createGhost(undefined, undefined, Ext
					.getBody());
			this.ghost.setXY(this.panel.el.getXY());
			if (this.insertProxy) {
				this.proxy = this.panel.el.insertSibling( {
					cls : "x-panel-dd-spacer"
				});
				this.proxy.setSize(this.panel.getSize())
			}
			this.panel.el.dom.style.display = "none"
		}
	},
	repair : function(b, c, a) {
		this.hide();
		if (typeof c == "function") {
			c.call(a || this)
		}
	},
	moveProxy : function(a, b) {
		if (this.proxy) {
			a.insertBefore(this.proxy.dom, b)
		}
	}
};
Ext.Panel.DD = function(b, a) {
	this.panel = b;
	this.dragData = {
		panel : b
	};
	this.proxy = new Ext.dd.PanelProxy(b, a);
	Ext.Panel.DD.superclass.constructor.call(this, b.el, a);
	var c = b.header;
	if (c) {
		this.setHandleElId(c.id)
	}
	(c ? c : this.panel.body).setStyle("cursor", "move");
	this.scroll = false
};
Ext.extend(Ext.Panel.DD, Ext.dd.DragSource, {
	showFrame : Ext.emptyFn,
	startDrag : Ext.emptyFn,
	b4StartDrag : function(a, b) {
		this.proxy.show()
	},
	b4MouseDown : function(b) {
		var a = b.getPageX();
		var c = b.getPageY();
		this.autoOffset(a, c)
	},
	onInitDrag : function(a, b) {
		this.onStartDrag(a, b);
		return true
	},
	createFrame : Ext.emptyFn,
	getDragEl : function(a) {
		return this.proxy.ghost.dom
	},
	endDrag : function(a) {
		this.proxy.hide();
		this.panel.saveState()
	},
	autoOffset : function(a, b) {
		a -= this.startPageX;
		b -= this.startPageY;
		this.setDelta(a, b)
	}
});
Ext.state.Provider = function() {
	this.addEvents("statechange");
	this.state = {};
	Ext.state.Provider.superclass.constructor.call(this)
};
Ext.extend(Ext.state.Provider, Ext.util.Observable, {
	get : function(b, a) {
		return typeof this.state[b] == "undefined" ? a : this.state[b]
	},
	clear : function(a) {
		delete this.state[a];
		this.fireEvent("statechange", this, a, null)
	},
	set : function(a, b) {
		this.state[a] = b;
		this.fireEvent("statechange", this, a, b)
	},
	decodeValue : function(a) {
		var m = /^(a|n|d|b|s|o)\:(.*)$/;
		var c = m.exec(unescape(a));
		if (!c || !c[1]) {
			return
		}
		var g = c[1];
		var k = c[2];
		switch (g) {
			case "n" :
				return parseFloat(k);
			case "d" :
				return new Date(Date.parse(k));
			case "b" :
				return (k == "1");
			case "a" :
				var h = [];
				var l = k.split("^");
				for (var b = 0, d = l.length;b < d; b++) {
					h.push(this.decodeValue(l[b]))
				}
				return h;
			case "o" :
				var h = {};
				var l = k.split("^");
				for (var b = 0, d = l.length;b < d; b++) {
					var e = l[b].split("=");
					h[e[0]] = this.decodeValue(e[1])
				}
				return h;
			default :
				return k
		}
	},
	encodeValue : function(c) {
		var b;
		if (typeof c == "number") {
			b = "n:" + c
		} else {
			if (typeof c == "boolean") {
				b = "b:" + (c ? "1" : "0")
			} else {
				if (Ext.isDate(c)) {
					b = "d:" + c.toGMTString()
				} else {
					if (Ext.isArray(c)) {
						var g = "";
						for (var e = 0, a = c.length;e < a; e++) {
							g += this.encodeValue(c[e]);
							if (e != a - 1) {
								g += "^"
							}
						}
						b = "a:" + g
					} else {
						if (typeof c == "object") {
							var g = "";
							for (var d in c) {
								if (typeof c[d] != "function"
										&& c[d] !== undefined) {
									g += d + "=" + this.encodeValue(c[d]) + "^"
								}
							}
							b = "o:" + g.substring(0, g.length - 1)
						} else {
							b = "s:" + c
						}
					}
				}
			}
		}
		return escape(b)
	}
});
Ext.state.Manager = function() {
	var a = new Ext.state.Provider();
	return {
		setProvider : function(b) {
			a = b
		},
		get : function(c, b) {
			return a.get(c, b)
		},
		set : function(b, c) {
			a.set(b, c)
		},
		clear : function(b) {
			a.clear(b)
		},
		getProvider : function() {
			return a
		}
	}
}();
Ext.state.CookieProvider = function(a) {
	Ext.state.CookieProvider.superclass.constructor.call(this);
	this.path = "/";
	this.expires = new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 7));
	this.domain = null;
	this.secure = false;
	Ext.apply(this, a);
	this.state = this.readCookies()
};
Ext.extend(Ext.state.CookieProvider, Ext.state.Provider, {
	set : function(a, b) {
		if (typeof b == "undefined" || b === null) {
			this.clear(a);
			return
		}
		this.setCookie(a, b);
		Ext.state.CookieProvider.superclass.set.call(this, a, b)
	},
	clear : function(a) {
		this.clearCookie(a);
		Ext.state.CookieProvider.superclass.clear.call(this, a)
	},
	readCookies : function() {
		var d = {};
		var h = document.cookie + ";";
		var b = /\s?(.*?)=(.*?);/g;
		var g;
		while ((g = b.exec(h)) != null) {
			var a = g[1];
			var e = g[2];
			if (a && a.substring(0, 3) == "ys-") {
				d[a.substr(3)] = this.decodeValue(e)
			}
		}
		return d
	},
	setCookie : function(a, b) {
		document.cookie = "ys-"
				+ a
				+ "="
				+ this.encodeValue(b)
				+ ((this.expires == null) ? "" : ("; expires=" + this.expires
						.toGMTString()))
				+ ((this.path == null) ? "" : ("; path=" + this.path))
				+ ((this.domain == null) ? "" : ("; domain=" + this.domain))
				+ ((this.secure == true) ? "; secure" : "")
	},
	clearCookie : function(a) {
		document.cookie = "ys-" + a
				+ "=null; expires=Thu, 01-Jan-70 00:00:01 GMT"
				+ ((this.path == null) ? "" : ("; path=" + this.path))
				+ ((this.domain == null) ? "" : ("; domain=" + this.domain))
				+ ((this.secure == true) ? "; secure" : "")
	}
});
Ext.DataView = Ext.extend(Ext.BoxComponent, {
	selectedClass : "x-view-selected",
	emptyText : "",
	deferEmptyText : true,
	trackOver : false,
	last : false,
	initComponent : function() {
		Ext.DataView.superclass.initComponent.call(this);
		if (typeof this.tpl == "string") {
			this.tpl = new Ext.XTemplate(this.tpl)
		}
		this.addEvents("beforeclick", "click", "mouseenter", "mouseleave",
				"containerclick", "dblclick", "contextmenu", "selectionchange",
				"beforeselect");
		this.all = new Ext.CompositeElementLite();
		this.selected = new Ext.CompositeElementLite()
	},
	onRender : function() {
		if (!this.el) {
			this.el = document.createElement("div");
			this.el.id = this.id
		}
		Ext.DataView.superclass.onRender.apply(this, arguments)
	},
	afterRender : function() {
		Ext.DataView.superclass.afterRender.call(this);
		this.el.on( {
			click : this.onClick,
			dblclick : this.onDblClick,
			contextmenu : this.onContextMenu,
			scope : this
		});
		if (this.overClass || this.trackOver) {
			this.el.on( {
				mouseover : this.onMouseOver,
				mouseout : this.onMouseOut,
				scope : this
			})
		}
		if (this.store) {
			this.setStore(this.store, true)
		}
	},
	refresh : function() {
		this.clearSelections(false, true);
		this.el.update("");
		var a = this.store.getRange();
		if (a.length < 1) {
			if (!this.deferEmptyText || this.hasSkippedEmptyText) {
				this.el.update(this.emptyText)
			}
			this.hasSkippedEmptyText = true;
			this.all.clear();
			return
		}
		this.tpl.overwrite(this.el, this.collectData(a, 0));
		this.all.fill(Ext.query(this.itemSelector, this.el.dom));
		this.updateIndexes(0)
	},
	prepareData : function(a) {
		return a
	},
	collectData : function(b, e) {
		var d = [];
		for (var c = 0, a = b.length;c < a; c++) {
			d[d.length] = this.prepareData(b[c].data, e + c, b[c])
		}
		return d
	},
	bufferRender : function(a) {
		var b = document.createElement("div");
		this.tpl.overwrite(b, this.collectData(a));
		return Ext.query(this.itemSelector, b)
	},
	onUpdate : function(g, a) {
		var b = this.store.indexOf(a);
		var e = this.isSelected(b);
		var c = this.all.elements[b];
		var d = this.bufferRender([a], b)[0];
		this.all.replaceElement(b, d, true);
		if (e) {
			this.selected.replaceElement(c, d);
			this.all.item(b).addClass(this.selectedClass)
		}
		this.updateIndexes(b, b)
	},
	onAdd : function(g, d, e) {
		if (this.all.getCount() == 0) {
			this.refresh();
			return
		}
		var c = this.bufferRender(d, e), h, b = this.all.elements;
		if (e < this.all.getCount()) {
			h = this.all.item(e).insertSibling(c, "before", true);
			b.splice.apply(b, [e, 0].concat(c))
		} else {
			h = this.all.last().insertSibling(c, "after", true);
			b.push.apply(b, c)
		}
		this.updateIndexes(e)
	},
	onRemove : function(c, a, b) {
		this.deselect(b);
		this.all.removeElement(b, true);
		this.updateIndexes(b)
	},
	refreshNode : function(a) {
		this.onUpdate(this.store, this.store.getAt(a))
	},
	updateIndexes : function(d, c) {
		var b = this.all.elements;
		d = d || 0;
		c = c || ((c === 0) ? 0 : (b.length - 1));
		for (var a = d;a <= c; a++) {
			b[a].viewIndex = a
		}
	},
	getStore : function() {
		return this.store
	},
	setStore : function(a, b) {
		if (!b && this.store) {
			this.store.un("beforeload", this.onBeforeLoad, this);
			this.store.un("datachanged", this.refresh, this);
			this.store.un("add", this.onAdd, this);
			this.store.un("remove", this.onRemove, this);
			this.store.un("update", this.onUpdate, this);
			this.store.un("clear", this.refresh, this)
		}
		if (a) {
			a = Ext.StoreMgr.lookup(a);
			a.on("beforeload", this.onBeforeLoad, this);
			a.on("datachanged", this.refresh, this);
			a.on("add", this.onAdd, this);
			a.on("remove", this.onRemove, this);
			a.on("update", this.onUpdate, this);
			a.on("clear", this.refresh, this)
		}
		this.store = a;
		if (a) {
			this.refresh()
		}
	},
	findItemFromChild : function(a) {
		return Ext.fly(a).findParent(this.itemSelector, this.el)
	},
	onClick : function(c) {
		var b = c.getTarget(this.itemSelector, this.el);
		if (b) {
			var a = this.indexOf(b);
			if (this.onItemClick(b, a, c) !== false) {
				this.fireEvent("click", this, a, b, c)
			}
		} else {
			if (this.fireEvent("containerclick", this, c) !== false) {
				this.clearSelections()
			}
		}
	},
	onContextMenu : function(b) {
		var a = b.getTarget(this.itemSelector, this.el);
		if (a) {
			this.fireEvent("contextmenu", this, this.indexOf(a), a, b)
		}
	},
	onDblClick : function(b) {
		var a = b.getTarget(this.itemSelector, this.el);
		if (a) {
			this.fireEvent("dblclick", this, this.indexOf(a), a, b)
		}
	},
	onMouseOver : function(b) {
		var a = b.getTarget(this.itemSelector, this.el);
		if (a && a !== this.lastItem) {
			this.lastItem = a;
			Ext.fly(a).addClass(this.overClass);
			this.fireEvent("mouseenter", this, this.indexOf(a), a, b)
		}
	},
	onMouseOut : function(a) {
		if (this.lastItem) {
			if (!a.within(this.lastItem, true, true)) {
				Ext.fly(this.lastItem).removeClass(this.overClass);
				this.fireEvent("mouseleave", this, this.indexOf(this.lastItem),
						this.lastItem, a);
				delete this.lastItem
			}
		}
	},
	onItemClick : function(b, a, c) {
		if (this.fireEvent("beforeclick", this, a, b, c) === false) {
			return false
		}
		if (this.multiSelect) {
			this.doMultiSelection(b, a, c);
			c.preventDefault()
		} else {
			if (this.singleSelect) {
				this.doSingleSelection(b, a, c);
				c.preventDefault()
			}
		}
		return true
	},
	doSingleSelection : function(b, a, c) {
		if (c.ctrlKey && this.isSelected(a)) {
			this.deselect(a)
		} else {
			this.select(a, false)
		}
	},
	doMultiSelection : function(c, a, d) {
		if (d.shiftKey && this.last !== false) {
			var b = this.last;
			this.selectRange(b, a, d.ctrlKey);
			this.last = b
		} else {
			if ((d.ctrlKey || this.simpleSelect) && this.isSelected(a)) {
				this.deselect(a)
			} else {
				this.select(a, d.ctrlKey || d.shiftKey || this.simpleSelect)
			}
		}
	},
	getSelectionCount : function() {
		return this.selected.getCount()
	},
	getSelectedNodes : function() {
		return this.selected.elements
	},
	getSelectedIndexes : function() {
		var b = [], d = this.selected.elements;
		for (var c = 0, a = d.length;c < a; c++) {
			b.push(d[c].viewIndex)
		}
		return b
	},
	getSelectedRecords : function() {
		var d = [], c = this.selected.elements;
		for (var b = 0, a = c.length;b < a; b++) {
			d[d.length] = this.store.getAt(c[b].viewIndex)
		}
		return d
	},
	getRecords : function(b) {
		var e = [], d = b;
		for (var c = 0, a = d.length;c < a; c++) {
			e[e.length] = this.store.getAt(d[c].viewIndex)
		}
		return e
	},
	getRecord : function(a) {
		return this.store.getAt(a.viewIndex)
	},
	clearSelections : function(a, b) {
		if ((this.multiSelect || this.singleSelect)
				&& this.selected.getCount() > 0) {
			if (!b) {
				this.selected.removeClass(this.selectedClass)
			}
			this.selected.clear();
			this.last = false;
			if (!a) {
				this.fireEvent("selectionchange", this, this.selected.elements)
			}
		}
	},
	isSelected : function(a) {
		return this.selected.contains(this.getNode(a))
	},
	deselect : function(a) {
		if (this.isSelected(a)) {
			a = this.getNode(a);
			this.selected.removeElement(a);
			if (this.last == a.viewIndex) {
				this.last = false
			}
			Ext.fly(a).removeClass(this.selectedClass);
			this.fireEvent("selectionchange", this, this.selected.elements)
		}
	},
	select : function(d, g, b) {
		if (Ext.isArray(d)) {
			if (!g) {
				this.clearSelections(true)
			}
			for (var c = 0, a = d.length;c < a; c++) {
				this.select(d[c], true, true)
			}
			if (!b) {
				this.fireEvent("selectionchange", this, this.selected.elements)
			}
		} else {
			var e = this.getNode(d);
			if (!g) {
				this.clearSelections(true)
			}
			if (e && !this.isSelected(e)) {
				if (this.fireEvent("beforeselect", this, e,
						this.selected.elements) !== false) {
					Ext.fly(e).addClass(this.selectedClass);
					this.selected.add(e);
					this.last = e.viewIndex;
					if (!b) {
						this.fireEvent("selectionchange", this,
								this.selected.elements)
					}
				}
			}
		}
	},
	selectRange : function(c, a, b) {
		if (!b) {
			this.clearSelections(true)
		}
		this.select(this.getNodes(c, a), true)
	},
	getNode : function(a) {
		if (typeof a == "string") {
			return document.getElementById(a)
		} else {
			if (typeof a == "number") {
				return this.all.elements[a]
			}
		}
		return a
	},
	getNodes : function(e, a) {
		var d = this.all.elements;
		e = e || 0;
		a = typeof a == "undefined" ? Math.max(d.length - 1, 0) : a;
		var b = [], c;
		if (e <= a) {
			for (c = e;c <= a && d[c]; c++) {
				b.push(d[c])
			}
		} else {
			for (c = e;c >= a && d[c]; c--) {
				b.push(d[c])
			}
		}
		return b
	},
	indexOf : function(a) {
		a = this.getNode(a);
		if (typeof a.viewIndex == "number") {
			return a.viewIndex
		}
		return this.all.indexOf(a)
	},
	onBeforeLoad : function() {
		if (this.loadingText) {
			this.clearSelections(false, true);
			this.el.update('<div class="loading-indicator">' + this.loadingText
					+ "</div>");
			this.all.clear()
		}
	},
	onDestroy : function() {
		Ext.DataView.superclass.onDestroy.call(this);
		this.setStore(null)
	}
});
Ext.reg("dataview", Ext.DataView);
Ext.ColorPalette = function(a) {
	Ext.ColorPalette.superclass.constructor.call(this, a);
	this.addEvents("select");
	if (this.handler) {
		this.on("select", this.handler, this.scope, true)
	}
};
Ext
		.extend(
				Ext.ColorPalette,
				Ext.Component,
				{
					itemCls : "x-color-palette",
					value : null,
					clickEvent : "click",
					ctype : "Ext.ColorPalette",
					allowReselect : false,
					colors : ["000000", "993300", "333300", "003300", "003366",
							"000080", "333399", "333333", "800000", "FF6600",
							"808000", "008000", "008080", "0000FF", "666699",
							"808080", "FF0000", "FF9900", "99CC00", "339966",
							"33CCCC", "3366FF", "800080", "969696", "FF00FF",
							"FFCC00", "FFFF00", "00FF00", "00FFFF", "00CCFF",
							"993366", "C0C0C0", "FF99CC", "FFCC99", "FFFF99",
							"CCFFCC", "CCFFFF", "99CCFF", "CC99FF", "FFFFFF"],
					onRender : function(b, a) {
						var c = this.tpl
								|| new Ext.XTemplate('<tpl for="."><a href="#" class="color-{.}" hidefocus="on"><em><span style="background:#{.}" unselectable="on">&#160;</span></em></a></tpl>');
						var d = document.createElement("div");
						d.id = this.getId();
						d.className = this.itemCls;
						c.overwrite(d, this.colors);
						b.dom.insertBefore(d, a);
						this.el = Ext.get(d);
						this.el.on(this.clickEvent, this.handleClick, this, {
							delegate : "a"
						});
						if (this.clickEvent != "click") {
							this.el.on("click", Ext.emptyFn, this, {
								delegate : "a",
								preventDefault : true
							})
						}
					},
					afterRender : function() {
						Ext.ColorPalette.superclass.afterRender.call(this);
						if (this.value) {
							var a = this.value;
							this.value = null;
							this.select(a)
						}
					},
					handleClick : function(b, a) {
						b.preventDefault();
						if (!this.disabled) {
							var d = a.className
									.match(/(?:^|\s)color-(.{6})(?:\s|$)/)[1];
							this.select(d.toUpperCase())
						}
					},
					select : function(a) {
						a = a.replace("#", "");
						if (a != this.value || this.allowReselect) {
							var b = this.el;
							if (this.value) {
								b.child("a.color-" + this.value)
										.removeClass("x-color-palette-sel")
							}
							b.child("a.color-" + a)
									.addClass("x-color-palette-sel");
							this.value = a;
							this.fireEvent("select", this, a)
						}
					}
				});
Ext.reg("colorpalette", Ext.ColorPalette);
Ext.DatePicker = Ext
		.extend(
				Ext.Component,
				{
					todayText : "Today",
					okText : "&#160;OK&#160;",
					cancelText : "Cancel",
					todayTip : "{0} (Spacebar)",
					minText : "This date is before the minimum date",
					maxText : "This date is after the maximum date",
					format : "m/d/y",
					disabledDaysText : "Disabled",
					disabledDatesText : "Disabled",
					constrainToViewport : true,
					monthNames : Date.monthNames,
					dayNames : Date.dayNames,
					nextText : "Next Month (Control+Right)",
					prevText : "Previous Month (Control+Left)",
					monthYearText : "Choose a month (Control+Up/Down to move years)",
					startDay : 0,
					showToday : true,
					initComponent : function() {
						Ext.DatePicker.superclass.initComponent.call(this);
						this.value = this.value
								? this.value.clearTime()
								: new Date().clearTime();
						this.addEvents("select");
						if (this.handler) {
							this.on("select", this.handler, this.scope || this)
						}
						this.initDisabledDays()
					},
					initDisabledDays : function() {
						if (!this.disabledDatesRE && this.disabledDates) {
							var a = this.disabledDates;
							var c = "(?:";
							for (var b = 0;b < a.length; b++) {
								c += a[b];
								if (b != a.length - 1) {
									c += "|"
								}
							}
							this.disabledDatesRE = new RegExp(c + ")")
						}
					},
					setDisabledDates : function(a) {
						if (Ext.isArray(a)) {
							this.disabledDates = a;
							this.disabledDatesRE = null
						} else {
							this.disabledDatesRE = a
						}
						this.initDisabledDays();
						this.update(this.value, true)
					},
					setDisabledDays : function(a) {
						this.disabledDays = a;
						this.update(this.value, true)
					},
					setMinDate : function(a) {
						this.minDate = a;
						this.update(this.value, true)
					},
					setMaxDate : function(a) {
						this.maxDate = a;
						this.update(this.value, true)
					},
					setValue : function(b) {
						var a = this.value;
						this.value = b.clearTime(true);
						if (this.el) {
							this.update(this.value)
						}
					},
					getValue : function() {
						return this.value
					},
					focus : function() {
						if (this.el) {
							this.update(this.activeDate)
						}
					},
					onRender : function(a, h) {
						var c = [
								'<table cellspacing="0">',
								'<tr><td class="x-date-left"><a href="#" title="',
								this.prevText,
								'">&#160;</a></td><td class="x-date-middle" align="center"></td><td class="x-date-right"><a href="#" title="',
								this.nextText, '">&#160;</a></td></tr>',
								'<tr><td colspan="3"><table class="x-date-inner" cellspacing="0"><thead><tr>'];
						var g = this.dayNames;
						for (var e = 0;e < 7; e++) {
							var k = this.startDay + e;
							if (k > 6) {
								k = k - 7
							}
							c.push("<th><span>", g[k].substr(0, 1),
									"</span></th>")
						}
						c[c.length] = "</tr></thead><tbody><tr>";
						for (var e = 0;e < 42; e++) {
							if (e % 7 == 0 && e != 0) {
								c[c.length] = "</tr><tr>"
							}
							c[c.length] = '<td><a href="#" hidefocus="on" class="x-date-date" tabIndex="1"><em><span></span></em></a></td>'
						}
						c
								.push(
										"</tr></tbody></table></td></tr>",
										this.showToday
												? '<tr><td colspan="3" class="x-date-bottom" align="center"></td></tr>'
												: "",
										'</table><div class="x-date-mp"></div>');
						var b = document.createElement("div");
						b.className = "x-date-picker";
						b.innerHTML = c.join("");
						a.dom.insertBefore(b, h);
						this.el = Ext.get(b);
						this.eventEl = Ext.get(b.firstChild);
						this.leftClickRpt = new Ext.util.ClickRepeater(this.el
								.child("td.x-date-left a"), {
							handler : this.showPrevMonth,
							scope : this,
							preventDefault : true,
							stopDefault : true
						});
						this.rightClickRpt = new Ext.util.ClickRepeater(this.el
								.child("td.x-date-right a"), {
							handler : this.showNextMonth,
							scope : this,
							preventDefault : true,
							stopDefault : true
						});
						this.eventEl.on("mousewheel", this.handleMouseWheel,
								this);
						this.monthPicker = this.el.down("div.x-date-mp");
						this.monthPicker.enableDisplayMode("block");
						var n = new Ext.KeyNav(this.eventEl, {
							left : function(d) {
								d.ctrlKey ? this.showPrevMonth() : this
										.update(this.activeDate.add("d", -1))
							},
							right : function(d) {
								d.ctrlKey ? this.showNextMonth() : this
										.update(this.activeDate.add("d", 1))
							},
							up : function(d) {
								d.ctrlKey ? this.showNextYear() : this
										.update(this.activeDate.add("d", -7))
							},
							down : function(d) {
								d.ctrlKey ? this.showPrevYear() : this
										.update(this.activeDate.add("d", 7))
							},
							pageUp : function(d) {
								this.showNextMonth()
							},
							pageDown : function(d) {
								this.showPrevMonth()
							},
							enter : function(d) {
								d.stopPropagation();
								return true
							},
							scope : this
						});
						this.eventEl.on("click", this.handleDateClick, this, {
							delegate : "a.x-date-date"
						});
						this.el.unselectable();
						this.cells = this.el
								.select("table.x-date-inner tbody td");
						this.textNodes = this.el
								.query("table.x-date-inner tbody span");
						this.mbtn = new Ext.Button( {
							text : "&#160;",
							tooltip : this.monthYearText,
							renderTo : this.el.child("td.x-date-middle", true)
						});
						this.mbtn.on("click", this.showMonthPicker, this);
						this.mbtn.el.child(this.mbtn.menuClassTarget)
								.addClass("x-btn-with-menu");
						if (this.showToday) {
							this.todayKeyListener = this.eventEl
									.addKeyListener(Ext.EventObject.SPACE,
											this.selectToday, this);
							var l = (new Date()).dateFormat(this.format);
							this.todayBtn = new Ext.Button( {
								renderTo : this.el.child("td.x-date-bottom",
										true),
								text : String.format(this.todayText, l),
								tooltip : String.format(this.todayTip, l),
								handler : this.selectToday,
								scope : this
							})
						}
						if (Ext.isIE) {
							this.el.repaint()
						}
						this.update(this.value)
					},
					createMonthPicker : function() {
						if (!this.monthPicker.dom.firstChild) {
							var a = ['<table border="0" cellspacing="0">'];
							for (var b = 0;b < 6; b++) {
								a
										.push(
												'<tr><td class="x-date-mp-month"><a href="#">',
												this.monthNames[b].substr(0, 3),
												"</a></td>",
												'<td class="x-date-mp-month x-date-mp-sep"><a href="#">',
												this.monthNames[b + 6].substr(
														0, 3),
												"</a></td>",
												b == 0
														? '<td class="x-date-mp-ybtn" align="center"><a class="x-date-mp-prev"></a></td><td class="x-date-mp-ybtn" align="center"><a class="x-date-mp-next"></a></td></tr>'
														: '<td class="x-date-mp-year"><a href="#"></a></td><td class="x-date-mp-year"><a href="#"></a></td></tr>')
							}
							a
									.push(
											'<tr class="x-date-mp-btns"><td colspan="4"><button type="button" class="x-date-mp-ok">',
											this.okText,
											'</button><button type="button" class="x-date-mp-cancel">',
											this.cancelText,
											"</button></td></tr>", "</table>");
							this.monthPicker.update(a.join(""));
							this.monthPicker.on("click", this.onMonthClick,
									this);
							this.monthPicker.on("dblclick",
									this.onMonthDblClick, this);
							this.mpMonths = this.monthPicker
									.select("td.x-date-mp-month");
							this.mpYears = this.monthPicker
									.select("td.x-date-mp-year");
							this.mpMonths.each(function(c, d, e) {
								e += 1;
								if ((e % 2) == 0) {
									c.dom.xmonth = 5 + Math.round(e * 0.5)
								} else {
									c.dom.xmonth = Math.round((e - 1) * 0.5)
								}
							})
						}
					},
					showMonthPicker : function() {
						this.createMonthPicker();
						var a = this.el.getSize();
						this.monthPicker.setSize(a);
						this.monthPicker.child("table").setSize(a);
						this.mpSelMonth = (this.activeDate || this.value)
								.getMonth();
						this.updateMPMonth(this.mpSelMonth);
						this.mpSelYear = (this.activeDate || this.value)
								.getFullYear();
						this.updateMPYear(this.mpSelYear);
						this.monthPicker.slideIn("t", {
							duration : 0.2
						})
					},
					updateMPYear : function(e) {
						this.mpyear = e;
						var c = this.mpYears.elements;
						for (var b = 1;b <= 10; b++) {
							var d = c[b - 1], a;
							if ((b % 2) == 0) {
								a = e + Math.round(b * 0.5);
								d.firstChild.innerHTML = a;
								d.xyear = a
							} else {
								a = e - (5 - Math.round(b * 0.5));
								d.firstChild.innerHTML = a;
								d.xyear = a
							}
							this.mpYears.item(b - 1)[a == this.mpSelYear
									? "addClass"
									: "removeClass"]("x-date-mp-sel")
						}
					},
					updateMPMonth : function(a) {
						this.mpMonths
								.each(function(b, c, d) {
									b[b.dom.xmonth == a
											? "addClass"
											: "removeClass"]("x-date-mp-sel")
								})
					},
					selectMPMonth : function(a) {
					},
					onMonthClick : function(g, b) {
						g.stopEvent();
						var c = new Ext.Element(b), a;
						if (c.is("button.x-date-mp-cancel")) {
							this.hideMonthPicker()
						} else {
							if (c.is("button.x-date-mp-ok")) {
								var h = new Date(this.mpSelYear,
										this.mpSelMonth,
										(this.activeDate || this.value)
												.getDate());
								if (h.getMonth() != this.mpSelMonth) {
									h = new Date(this.mpSelYear,
											this.mpSelMonth, 1)
											.getLastDateOfMonth()
								}
								this.update(h);
								this.hideMonthPicker()
							} else {
								if (a = c.up("td.x-date-mp-month", 2)) {
									this.mpMonths.removeClass("x-date-mp-sel");
									a.addClass("x-date-mp-sel");
									this.mpSelMonth = a.dom.xmonth
								} else {
									if (a = c.up("td.x-date-mp-year", 2)) {
										this.mpYears
												.removeClass("x-date-mp-sel");
										a.addClass("x-date-mp-sel");
										this.mpSelYear = a.dom.xyear
									} else {
										if (c.is("a.x-date-mp-prev")) {
											this.updateMPYear(this.mpyear - 10)
										} else {
											if (c.is("a.x-date-mp-next")) {
												this.updateMPYear(this.mpyear
														+ 10)
											}
										}
									}
								}
							}
						}
					},
					onMonthDblClick : function(d, b) {
						d.stopEvent();
						var c = new Ext.Element(b), a;
						if (a = c.up("td.x-date-mp-month", 2)) {
							this.update(new Date(this.mpSelYear, a.dom.xmonth,
									(this.activeDate || this.value).getDate()));
							this.hideMonthPicker()
						} else {
							if (a = c.up("td.x-date-mp-year", 2)) {
								this.update(new Date(a.dom.xyear,
										this.mpSelMonth,
										(this.activeDate || this.value)
												.getDate()));
								this.hideMonthPicker()
							}
						}
					},
					hideMonthPicker : function(a) {
						if (this.monthPicker) {
							if (a === true) {
								this.monthPicker.hide()
							} else {
								this.monthPicker.slideOut("t", {
									duration : 0.2
								})
							}
						}
					},
					showPrevMonth : function(a) {
						this.update(this.activeDate.add("mo", -1))
					},
					showNextMonth : function(a) {
						this.update(this.activeDate.add("mo", 1))
					},
					showPrevYear : function() {
						this.update(this.activeDate.add("y", -1))
					},
					showNextYear : function() {
						this.update(this.activeDate.add("y", 1))
					},
					handleMouseWheel : function(a) {
						var b = a.getWheelDelta();
						if (b > 0) {
							this.showPrevMonth();
							a.stopEvent()
						} else {
							if (b < 0) {
								this.showNextMonth();
								a.stopEvent()
							}
						}
					},
					handleDateClick : function(b, a) {
						b.stopEvent();
						if (a.dateValue
								&& !Ext.fly(a.parentNode)
										.hasClass("x-date-disabled")) {
							this.setValue(new Date(a.dateValue));
							this.fireEvent("select", this, this.value)
						}
					},
					selectToday : function() {
						if (this.todayBtn && !this.todayBtn.disabled) {
							this.setValue(new Date().clearTime());
							this.fireEvent("select", this, this.value)
						}
					},
					update : function(H, B) {
						var a = this.activeDate;
						this.activeDate = H;
						if (!B && a && this.el) {
							var p = H.getTime();
							if (a.getMonth() == H.getMonth()
									&& a.getFullYear() == H.getFullYear()) {
								this.cells.removeClass("x-date-selected");
								this.cells.each(function(d) {
									if (d.dom.firstChild.dateValue == p) {
										d.addClass("x-date-selected");
										setTimeout(function() {
											try {
												d.dom.firstChild.focus()
											} catch (i) {
											}
										}, 50);
										return false
									}
								});
								return
							}
						}
						var l = H.getDaysInMonth();
						var q = H.getFirstDateOfMonth();
						var g = q.getDay() - this.startDay;
						if (g <= this.startDay) {
							g += 7
						}
						var C = H.add("mo", -1);
						var h = C.getDaysInMonth() - g;
						var e = this.cells.elements;
						var r = this.textNodes;
						l += g;
						var y = 86400000;
						var E = (new Date(C.getFullYear(), C.getMonth(), h))
								.clearTime();
						var D = new Date().clearTime().getTime();
						var v = H.clearTime().getTime();
						var u = this.minDate
								? this.minDate.clearTime()
								: Number.NEGATIVE_INFINITY;
						var z = this.maxDate
								? this.maxDate.clearTime()
								: Number.POSITIVE_INFINITY;
						var G = this.disabledDatesRE;
						var s = this.disabledDatesText;
						var J = this.disabledDays
								? this.disabledDays.join("")
								: false;
						var F = this.disabledDaysText;
						var A = this.format;
						if (this.showToday) {
							var n = new Date().clearTime();
							var c = (n < u || n > z
									|| (G && A && G.test(n.dateFormat(A))) || (J && J
									.indexOf(n.getDay()) != -1));
							this.todayBtn.setDisabled(c);
							this.todayKeyListener[c ? "disable" : "enable"]()
						}
						var m = function(K, d) {
							d.title = "";
							var i = E.getTime();
							d.firstChild.dateValue = i;
							if (i == D) {
								d.className += " x-date-today";
								d.title = K.todayText
							}
							if (i == v) {
								d.className += " x-date-selected";
								setTimeout(function() {
									try {
										d.firstChild.focus()
									} catch (t) {
									}
								}, 50)
							}
							if (i < u) {
								d.className = " x-date-disabled";
								d.title = K.minText;
								return
							}
							if (i > z) {
								d.className = " x-date-disabled";
								d.title = K.maxText;
								return
							}
							if (J) {
								if (J.indexOf(E.getDay()) != -1) {
									d.title = F;
									d.className = " x-date-disabled"
								}
							}
							if (G && A) {
								var w = E.dateFormat(A);
								if (G.test(w)) {
									d.title = s.replace("%0", w);
									d.className = " x-date-disabled"
								}
							}
						};
						var x = 0;
						for (;x < g; x++) {
							r[x].innerHTML = (++h);
							E.setDate(E.getDate() + 1);
							e[x].className = "x-date-prevday";
							m(this, e[x])
						}
						for (;x < l; x++) {
							var b = x - g + 1;
							r[x].innerHTML = (b);
							E.setDate(E.getDate() + 1);
							e[x].className = "x-date-active";
							m(this, e[x])
						}
						var I = 0;
						for (;x < 42; x++) {
							r[x].innerHTML = (++I);
							E.setDate(E.getDate() + 1);
							e[x].className = "x-date-nextday";
							m(this, e[x])
						}
						this.mbtn.setText(this.monthNames[H.getMonth()] + " "
								+ H.getFullYear());
						if (!this.internalRender) {
							var k = this.el.dom.firstChild;
							var o = k.offsetWidth;
							this.el.setWidth(o + this.el.getBorderWidth("lr"));
							Ext.fly(k).setWidth(o);
							this.internalRender = true;
							if (Ext.isOpera && !this.secondPass) {
								k.rows[0].cells[1].style.width = (o - (k.rows[0].cells[0].offsetWidth + k.rows[0].cells[2].offsetWidth))
										+ "px";
								this.secondPass = true;
								this.update.defer(10, this, [H])
							}
						}
					},
					beforeDestroy : function() {
						if (this.rendered) {
							Ext.destroy(this.leftClickRpt, this.rightClickRpt,
									this.monthPicker, this.eventEl, this.mbtn,
									this.todayBtn)
						}
					}
				});
Ext.reg("datepicker", Ext.DatePicker);
Ext.TabPanel = Ext
		.extend(
				Ext.Panel,
				{
					monitorResize : true,
					deferredRender : true,
					tabWidth : 120,
					minTabWidth : 30,
					resizeTabs : false,
					enableTabScroll : false,
					scrollIncrement : 0,
					scrollRepeatInterval : 400,
					scrollDuration : 0.35,
					animScroll : true,
					tabPosition : "top",
					baseCls : "x-tab-panel",
					autoTabs : false,
					autoTabSelector : "div.x-tab",
					activeTab : null,
					tabMargin : 2,
					plain : false,
					wheelIncrement : 20,
					idDelimiter : "__",
					itemCls : "x-tab-item",
					elements : "body",
					headerAsText : false,
					frame : false,
					hideBorders : true,
					initComponent : function() {
						this.frame = false;
						Ext.TabPanel.superclass.initComponent.call(this);
						this.addEvents("beforetabchange", "tabchange",
								"contextmenu");
						this.setLayout(new Ext.layout.CardLayout( {
							deferredRender : this.deferredRender
						}));
						if (this.tabPosition == "top") {
							this.elements += ",header";
							this.stripTarget = "header"
						} else {
							this.elements += ",footer";
							this.stripTarget = "footer"
						}
						if (!this.stack) {
							this.stack = Ext.TabPanel.AccessStack()
						}
						this.initItems()
					},
					render : function() {
						Ext.TabPanel.superclass.render.apply(this, arguments);
						if (this.activeTab !== undefined) {
							var a = this.activeTab;
							delete this.activeTab;
							this.setActiveTab(a)
						}
					},
					onRender : function(c, a) {
						Ext.TabPanel.superclass.onRender.call(this, c, a);
						if (this.plain) {
							var g = this.tabPosition == "top"
									? "header"
									: "footer";
							this[g].addClass("x-tab-panel-" + g + "-plain")
						}
						var b = this[this.stripTarget];
						this.stripWrap = b.createChild( {
							cls : "x-tab-strip-wrap",
							cn : {
								tag : "ul",
								cls : "x-tab-strip x-tab-strip-"
										+ this.tabPosition
							}
						});
						var e = (this.tabPosition == "bottom"
								? this.stripWrap
								: null);
						this.stripSpacer = b.createChild( {
							cls : "x-tab-strip-spacer"
						}, e);
						this.strip = new Ext.Element(this.stripWrap.dom.firstChild);
						this.edge = this.strip.createChild( {
							tag : "li",
							cls : "x-tab-edge"
						});
						this.strip.createChild( {
							cls : "x-clear"
						});
						this.body.addClass("x-tab-panel-body-"
								+ this.tabPosition);
						if (!this.itemTpl) {
							var d = new Ext.Template(
									'<li class="{cls}" id="{id}"><a class="x-tab-strip-close" onclick="return false;"></a>',
									'<a class="x-tab-right" href="#" onclick="return false;"><em class="x-tab-left">',
									'<span class="x-tab-strip-inner"><span class="x-tab-strip-text {iconCls}">{text}</span></span>',
									"</em></a></li>");
							d.disableFormats = true;
							d.compile();
							Ext.TabPanel.prototype.itemTpl = d
						}
						this.items.each(this.initTab, this)
					},
					afterRender : function() {
						Ext.TabPanel.superclass.afterRender.call(this);
						if (this.autoTabs) {
							this.readTabs(false)
						}
					},
					initEvents : function() {
						Ext.TabPanel.superclass.initEvents.call(this);
						this.on("add", this.onAdd, this);
						this.on("remove", this.onRemove, this);
						this.strip.on("mousedown", this.onStripMouseDown, this);
						this.strip.on("contextmenu", this.onStripContextMenu,
								this);
						if (this.enableTabScroll) {
							this.strip.on("mousewheel", this.onWheel, this)
						}
					},
					findTargets : function(c) {
						var b = null;
						var a = c.getTarget("li", this.strip);
						if (a) {
							b = this
									.getComponent(a.id.split(this.idDelimiter)[1]);
							if (b.disabled) {
								return {
									close : null,
									item : null,
									el : null
								}
							}
						}
						return {
							close : c.getTarget(".x-tab-strip-close",
									this.strip),
							item : b,
							el : a
						}
					},
					onStripMouseDown : function(b) {
						if (b.button != 0) {
							return
						}
						b.preventDefault();
						var a = this.findTargets(b);
						if (a.close) {
							this.remove(a.item);
							return
						}
						if (a.item && a.item != this.activeTab) {
							this.setActiveTab(a.item)
						}
					},
					onStripContextMenu : function(b) {
						b.preventDefault();
						var a = this.findTargets(b);
						if (a.item) {
							this.fireEvent("contextmenu", this, a.item, b)
						}
					},
					readTabs : function(d) {
						if (d === true) {
							this.items.each(function(h) {
								this.remove(h)
							}, this)
						}
						var c = this.el.query(this.autoTabSelector);
						for (var b = 0, a = c.length;b < a; b++) {
							var e = c[b];
							var g = e.getAttribute("title");
							e.removeAttribute("title");
							this.add( {
								title : g,
								el : e
							})
						}
					},
					initTab : function(d, b) {
						var e = this.strip.dom.childNodes[b];
						var a = d.closable ? "x-tab-strip-closable" : "";
						if (d.disabled) {
							a += " x-item-disabled"
						}
						if (d.iconCls) {
							a += " x-tab-with-icon"
						}
						if (d.tabCls) {
							a += " " + d.tabCls
						}
						var g = {
							id : this.id + this.idDelimiter + d.getItemId(),
							text : d.title,
							cls : a,
							iconCls : d.iconCls || ""
						};
						var c = e
								? this.itemTpl.insertBefore(e, g)
								: this.itemTpl.append(this.strip, g);
						Ext.fly(c).addClassOnOver("x-tab-strip-over");
						if (d.tabTip) {
							Ext.fly(c).child("span.x-tab-strip-text", true).qtip = d.tabTip
						}
						d.tabEl = c;
						d.on("disable", this.onItemDisabled, this);
						d.on("enable", this.onItemEnabled, this);
						d.on("titlechange", this.onItemTitleChanged, this);
						d.on("iconchange", this.onItemIconChanged, this);
						d.on("beforeshow", this.onBeforeShowItem, this)
					},
					onAdd : function(c, b, a) {
						this.initTab(b, a);
						if (this.items.getCount() == 1) {
							this.syncSize()
						}
						this.delegateUpdates()
					},
					onBeforeAdd : function(b) {
						var a = b.events ? (this.items.containsKey(b
								.getItemId()) ? b : null) : this.items.get(b);
						if (a) {
							this.setActiveTab(b);
							return false
						}
						Ext.TabPanel.superclass.onBeforeAdd.apply(this,
								arguments);
						var c = b.elements;
						b.elements = c ? c.replace(",header", "") : c;
						b.border = (b.border === true)
					},
					onRemove : function(c, b) {
						Ext.destroy(Ext.get(this.getTabEl(b)));
						this.stack.remove(b);
						b.un("disable", this.onItemDisabled, this);
						b.un("enable", this.onItemEnabled, this);
						b.un("titlechange", this.onItemTitleChanged, this);
						b.un("iconchange", this.onItemIconChanged, this);
						b.un("beforeshow", this.onBeforeShowItem, this);
						if (b == this.activeTab) {
							var a = this.stack.next();
							if (a) {
								this.setActiveTab(a)
							} else {
								if (this.items.getCount() > 0) {
									this.setActiveTab(0)
								} else {
									this.activeTab = null
								}
							}
						}
						this.delegateUpdates()
					},
					onBeforeShowItem : function(a) {
						if (a != this.activeTab) {
							this.setActiveTab(a);
							return false
						}
					},
					onItemDisabled : function(b) {
						var a = this.getTabEl(b);
						if (a) {
							Ext.fly(a).addClass("x-item-disabled")
						}
						this.stack.remove(b)
					},
					onItemEnabled : function(b) {
						var a = this.getTabEl(b);
						if (a) {
							Ext.fly(a).removeClass("x-item-disabled")
						}
					},
					onItemTitleChanged : function(b) {
						var a = this.getTabEl(b);
						if (a) {
							Ext.fly(a).child("span.x-tab-strip-text", true).innerHTML = b.title
						}
					},
					onItemIconChanged : function(d, a, c) {
						var b = this.getTabEl(d);
						if (b) {
							Ext.fly(b).child("span.x-tab-strip-text")
									.replaceClass(c, a)
						}
					},
					getTabEl : function(a) {
						var b = (typeof a === "number") ? this.items.items[a]
								.getItemId() : a.getItemId();
						return document.getElementById(this.id
								+ this.idDelimiter + b)
					},
					onResize : function() {
						Ext.TabPanel.superclass.onResize.apply(this, arguments);
						this.delegateUpdates()
					},
					beginUpdate : function() {
						this.suspendUpdates = true
					},
					endUpdate : function() {
						this.suspendUpdates = false;
						this.delegateUpdates()
					},
					hideTabStripItem : function(b) {
						b = this.getComponent(b);
						var a = this.getTabEl(b);
						if (a) {
							a.style.display = "none";
							this.delegateUpdates()
						}
						this.stack.remove(b)
					},
					unhideTabStripItem : function(b) {
						b = this.getComponent(b);
						var a = this.getTabEl(b);
						if (a) {
							a.style.display = "";
							this.delegateUpdates()
						}
					},
					delegateUpdates : function() {
						if (this.suspendUpdates) {
							return
						}
						if (this.resizeTabs && this.rendered) {
							this.autoSizeTabs()
						}
						if (this.enableTabScroll && this.rendered) {
							this.autoScrollTabs()
						}
					},
					autoSizeTabs : function() {
						var h = this.items.length;
						var b = this.tabPosition != "bottom"
								? "header"
								: "footer";
						var c = this[b].dom.offsetWidth;
						var a = this[b].dom.clientWidth;
						if (!this.resizeTabs || h < 1 || !a) {
							return
						}
						var l = Math.max(Math.min(Math.floor((a - 4) / h)
								- this.tabMargin, this.tabWidth),
								this.minTabWidth);
						this.lastTabWidth = l;
						var n = this.stripWrap.dom.getElementsByTagName("li");
						for (var e = 0, k = n.length - 1;e < k; e++) {
							var m = n[e];
							var o = m.childNodes[1].firstChild.firstChild;
							var g = m.offsetWidth;
							var d = o.offsetWidth;
							o.style.width = (l - (g - d)) + "px"
						}
					},
					adjustBodyWidth : function(a) {
						if (this.header) {
							this.header.setWidth(a)
						}
						if (this.footer) {
							this.footer.setWidth(a)
						}
						return a
					},
					setActiveTab : function(c) {
						c = this.getComponent(c);
						if (!c
								|| this.fireEvent("beforetabchange", this, c,
										this.activeTab) === false) {
							return
						}
						if (!this.rendered) {
							this.activeTab = c;
							return
						}
						if (this.activeTab != c) {
							if (this.activeTab) {
								var a = this.getTabEl(this.activeTab);
								if (a) {
									Ext.fly(a)
											.removeClass("x-tab-strip-active")
								}
								this.activeTab.fireEvent("deactivate",
										this.activeTab)
							}
							var b = this.getTabEl(c);
							Ext.fly(b).addClass("x-tab-strip-active");
							this.activeTab = c;
							this.stack.add(c);
							this.layout.setActiveItem(c);
							if (this.layoutOnTabChange && c.doLayout) {
								c.doLayout()
							}
							if (this.scrolling) {
								this.scrollToTab(c, this.animScroll)
							}
							c.fireEvent("activate", c);
							this.fireEvent("tabchange", this, c)
						}
					},
					getActiveTab : function() {
						return this.activeTab || null
					},
					getItem : function(a) {
						return this.getComponent(a)
					},
					autoScrollTabs : function() {
						this.pos = this.tabPosition == "bottom"
								? this.footer
								: this.header;
						var h = this.items.length;
						var d = this.pos.dom.offsetWidth;
						var c = this.pos.dom.clientWidth;
						var g = this.stripWrap;
						var e = g.dom;
						var b = e.offsetWidth;
						var i = this.getScrollPos();
						var a = this.edge.getOffsetsTo(this.stripWrap)[0] + i;
						if (!this.enableTabScroll || h < 1 || b < 20) {
							return
						}
						if (a <= c) {
							e.scrollLeft = 0;
							g.setWidth(c);
							if (this.scrolling) {
								this.scrolling = false;
								this.pos.removeClass("x-tab-scrolling");
								this.scrollLeft.hide();
								this.scrollRight.hide();
								if (Ext.isAir || Ext.isSafari) {
									e.style.marginLeft = "";
									e.style.marginRight = ""
								}
							}
						} else {
							if (!this.scrolling) {
								this.pos.addClass("x-tab-scrolling");
								if (Ext.isAir || Ext.isSafari) {
									e.style.marginLeft = "18px";
									e.style.marginRight = "18px"
								}
							}
							c -= g.getMargins("lr");
							g.setWidth(c > 20 ? c : 20);
							if (!this.scrolling) {
								if (!this.scrollLeft) {
									this.createScrollers()
								} else {
									this.scrollLeft.show();
									this.scrollRight.show()
								}
							}
							this.scrolling = true;
							if (i > (a - c)) {
								e.scrollLeft = a - c
							} else {
								this.scrollToTab(this.activeTab, false)
							}
							this.updateScrollButtons()
						}
					},
					createScrollers : function() {
						this.pos
								.addClass("x-tab-scrolling-" + this.tabPosition);
						var c = this.stripWrap.dom.offsetHeight;
						var a = this.pos.insertFirst( {
							cls : "x-tab-scroller-left"
						});
						a.setHeight(c);
						a.addClassOnOver("x-tab-scroller-left-over");
						this.leftRepeater = new Ext.util.ClickRepeater(a, {
							interval : this.scrollRepeatInterval,
							handler : this.onScrollLeft,
							scope : this
						});
						this.scrollLeft = a;
						var b = this.pos.insertFirst( {
							cls : "x-tab-scroller-right"
						});
						b.setHeight(c);
						b.addClassOnOver("x-tab-scroller-right-over");
						this.rightRepeater = new Ext.util.ClickRepeater(b, {
							interval : this.scrollRepeatInterval,
							handler : this.onScrollRight,
							scope : this
						});
						this.scrollRight = b
					},
					getScrollWidth : function() {
						return this.edge.getOffsetsTo(this.stripWrap)[0]
								+ this.getScrollPos()
					},
					getScrollPos : function() {
						return parseInt(this.stripWrap.dom.scrollLeft, 10) || 0
					},
					getScrollArea : function() {
						return parseInt(this.stripWrap.dom.clientWidth, 10)
								|| 0
					},
					getScrollAnim : function() {
						return {
							duration : this.scrollDuration,
							callback : this.updateScrollButtons,
							scope : this
						}
					},
					getScrollIncrement : function() {
						return this.scrollIncrement
								|| (this.resizeTabs
										? this.lastTabWidth + 2
										: 100)
					},
					scrollToTab : function(e, a) {
						if (!e) {
							return
						}
						var c = this.getTabEl(e);
						var h = this.getScrollPos(), d = this.getScrollArea();
						var g = Ext.fly(c).getOffsetsTo(this.stripWrap)[0] + h;
						var b = g + c.offsetWidth;
						if (g < h) {
							this.scrollTo(g, a)
						} else {
							if (b > (h + d)) {
								this.scrollTo(b - d, a)
							}
						}
					},
					scrollTo : function(b, a) {
						this.stripWrap.scrollTo("left", b, a ? this
								.getScrollAnim() : false);
						if (!a) {
							this.updateScrollButtons()
						}
					},
					onWheel : function(g) {
						var h = g.getWheelDelta() * this.wheelIncrement * -1;
						g.stopEvent();
						var i = this.getScrollPos();
						var c = i + h;
						var a = this.getScrollWidth() - this.getScrollArea();
						var b = Math.max(0, Math.min(a, c));
						if (b != i) {
							this.scrollTo(b, false)
						}
					},
					onScrollRight : function() {
						var a = this.getScrollWidth() - this.getScrollArea();
						var c = this.getScrollPos();
						var b = Math.min(a, c + this.getScrollIncrement());
						if (b != c) {
							this.scrollTo(b, this.animScroll)
						}
					},
					onScrollLeft : function() {
						var b = this.getScrollPos();
						var a = Math.max(0, b - this.getScrollIncrement());
						if (a != b) {
							this.scrollTo(a, this.animScroll)
						}
					},
					updateScrollButtons : function() {
						var a = this.getScrollPos();
						this.scrollLeft[a == 0 ? "addClass" : "removeClass"]("x-tab-scroller-left-disabled");
						this.scrollRight[a >= (this.getScrollWidth() - this
								.getScrollArea()) ? "addClass" : "removeClass"]("x-tab-scroller-right-disabled")
					},
					beforeDestroy : function() {
						if (this.items) {
							this.items.each(function(a) {
								if (a && a.tabEl) {
									Ext.get(a.tabEl).removeAllListeners();
									a.tabEl = null
								}
							}, this)
						}
						if (this.strip) {
							this.strip.removeAllListeners()
						}
						Ext.TabPanel.superclass.beforeDestroy.apply(this)
					}
				});
Ext.reg("tabpanel", Ext.TabPanel);
Ext.TabPanel.prototype.activate = Ext.TabPanel.prototype.setActiveTab;
Ext.TabPanel.AccessStack = function() {
	var a = [];
	return {
		add : function(b) {
			a.push(b);
			if (a.length > 10) {
				a.shift()
			}
		},
		remove : function(e) {
			var d = [];
			for (var c = 0, b = a.length;c < b; c++) {
				if (a[c] != e) {
					d.push(a[c])
				}
			}
			a = d
		},
		next : function() {
			return a.pop()
		}
	}
};
Ext.Button = Ext
		.extend(
				Ext.Component,
				{
					hidden : false,
					disabled : false,
					pressed : false,
					enableToggle : false,
					menuAlign : "tl-bl?",
					type : "button",
					menuClassTarget : "tr",
					clickEvent : "click",
					handleMouseEvents : true,
					tooltipType : "qtip",
					buttonSelector : "button:first-child",
					initComponent : function() {
						Ext.Button.superclass.initComponent.call(this);
						this.addEvents("click", "toggle", "mouseover",
								"mouseout", "menushow", "menuhide",
								"menutriggerover", "menutriggerout");
						if (this.menu) {
							this.menu = Ext.menu.MenuMgr.get(this.menu)
						}
						if (typeof this.toggleGroup === "string") {
							this.enableToggle = true
						}
					},
					onRender : function(c, a) {
						if (!this.template) {
							if (!Ext.Button.buttonTemplate) {
								Ext.Button.buttonTemplate = new Ext.Template(
										'<table border="0" cellpadding="0" cellspacing="0" class="x-btn-wrap"><tbody><tr>',
										'<td class="x-btn-left"><i>&#160;</i></td><td class="x-btn-center"><em unselectable="on"><button class="x-btn-text" type="{1}">{0}</button></em></td><td class="x-btn-right"><i>&#160;</i></td>',
										"</tr></tbody></table>")
							}
							this.template = Ext.Button.buttonTemplate
						}
						var b, e = [this.text || "&#160;", this.type];
						if (a) {
							b = this.template.insertBefore(a, e, true)
						} else {
							b = this.template.append(c, e, true)
						}
						var d = b.child(this.buttonSelector);
						d.on("focus", this.onFocus, this);
						d.on("blur", this.onBlur, this);
						this.initButtonEl(b, d);
						if (this.menu) {
							this.el.child(this.menuClassTarget)
									.addClass("x-btn-with-menu")
						}
						Ext.ButtonToggleMgr.register(this)
					},
					initButtonEl : function(b, c) {
						this.el = b;
						b.addClass("x-btn");
						if (this.id) {
							this.el.dom.id = this.el.id = this.id
						}
						if (this.icon) {
							c.setStyle("background-image", "url(" + this.icon
									+ ")")
						}
						if (this.iconCls) {
							c.addClass(this.iconCls);
							if (!this.cls) {
								b.addClass(this.text
										? "x-btn-text-icon"
										: "x-btn-icon")
							}
						}
						if (this.tabIndex !== undefined) {
							c.dom.tabIndex = this.tabIndex
						}
						if (this.tooltip) {
							if (typeof this.tooltip == "object") {
								Ext.QuickTips.register(Ext.apply( {
									target : c.id
								}, this.tooltip))
							} else {
								c.dom[this.tooltipType] = this.tooltip
							}
						}
						if (this.pressed) {
							this.el.addClass("x-btn-pressed")
						}
						if (this.handleMouseEvents) {
							b.on("mouseover", this.onMouseOver, this);
							b.on("mousedown", this.onMouseDown, this)
						}
						if (this.menu) {
							this.menu.on("show", this.onMenuShow, this);
							this.menu.on("hide", this.onMenuHide, this)
						}
						if (this.repeat) {
							var a = new Ext.util.ClickRepeater(b,
									typeof this.repeat == "object"
											? this.repeat
											: {});
							a.on("click", this.onClick, this)
						}
						b.on(this.clickEvent, this.onClick, this)
					},
					afterRender : function() {
						Ext.Button.superclass.afterRender.call(this);
						if (Ext.isIE6) {
							this.autoWidth.defer(1, this)
						} else {
							this.autoWidth()
						}
					},
					setIconClass : function(a) {
						if (this.el) {
							this.el.child(this.buttonSelector).replaceClass(
									this.iconCls, a)
						}
						this.iconCls = a
					},
					beforeDestroy : function() {
						if (this.rendered) {
							var a = this.el.child(this.buttonSelector);
							if (a) {
								if (this.tooltip) {
									Ext.QuickTips.unregister(a)
								}
								a.removeAllListeners()
							}
						}
						if (this.menu) {
							Ext.destroy(this.menu)
						}
					},
					onDestroy : function() {
						if (this.rendered) {
							Ext.ButtonToggleMgr.unregister(this)
						}
					},
					autoWidth : function() {
						if (this.el) {
							this.el.setWidth("auto");
							if (Ext.isIE7 && Ext.isStrict) {
								var a = this.el.child(this.buttonSelector);
								if (a && a.getWidth() > 20) {
									a.clip();
									a.setWidth(Ext.util.TextMetrics.measure(a,
											this.text).width
											+ a.getFrameWidth("lr"))
								}
							}
							if (this.minWidth) {
								if (this.el.getWidth() < this.minWidth) {
									this.el.setWidth(this.minWidth)
								}
							}
						}
					},
					setHandler : function(b, a) {
						this.handler = b;
						this.scope = a
					},
					setText : function(a) {
						this.text = a;
						if (this.el) {
							this.el.child("td.x-btn-center "
									+ this.buttonSelector).update(a)
						}
						this.autoWidth()
					},
					getText : function() {
						return this.text
					},
					toggle : function(a) {
						a = a === undefined ? !this.pressed : a;
						if (a != this.pressed) {
							if (a) {
								this.el.addClass("x-btn-pressed");
								this.pressed = true;
								this.fireEvent("toggle", this, true)
							} else {
								this.el.removeClass("x-btn-pressed");
								this.pressed = false;
								this.fireEvent("toggle", this, false)
							}
							if (this.toggleHandler) {
								this.toggleHandler.call(this.scope || this,
										this, a)
							}
						}
					},
					focus : function() {
						this.el.child(this.buttonSelector).focus()
					},
					onDisable : function() {
						if (this.el) {
							if (!Ext.isIE6 || !this.text) {
								this.el.addClass(this.disabledClass)
							}
							this.el.dom.disabled = true
						}
						this.disabled = true
					},
					onEnable : function() {
						if (this.el) {
							if (!Ext.isIE6 || !this.text) {
								this.el.removeClass(this.disabledClass)
							}
							this.el.dom.disabled = false
						}
						this.disabled = false
					},
					showMenu : function() {
						if (this.menu) {
							this.menu.show(this.el, this.menuAlign)
						}
						return this
					},
					hideMenu : function() {
						if (this.menu) {
							this.menu.hide()
						}
						return this
					},
					hasVisibleMenu : function() {
						return this.menu && this.menu.isVisible()
					},
					onClick : function(a) {
						if (a) {
							a.preventDefault()
						}
						if (a.button != 0) {
							return
						}
						if (!this.disabled) {
							if (this.enableToggle
									&& (this.allowDepress !== false || !this.pressed)) {
								this.toggle()
							}
							if (this.menu && !this.menu.isVisible()
									&& !this.ignoreNextClick) {
								this.showMenu()
							}
							this.fireEvent("click", this, a);
							if (this.handler) {
								this.handler.call(this.scope || this, this, a)
							}
						}
					},
					isMenuTriggerOver : function(b, a) {
						return this.menu && !a
					},
					isMenuTriggerOut : function(b, a) {
						return this.menu && !a
					},
					onMouseOver : function(b) {
						if (!this.disabled) {
							var a = b.within(this.el, true);
							if (!a) {
								this.el.addClass("x-btn-over");
								if (!this.monitoringMouseOver) {
									Ext.getDoc().on("mouseover",
											this.monitorMouseOver, this);
									this.monitoringMouseOver = true
								}
								this.fireEvent("mouseover", this, b)
							}
							if (this.isMenuTriggerOver(b, a)) {
								this.fireEvent("menutriggerover", this,
										this.menu, b)
							}
						}
					},
					monitorMouseOver : function(a) {
						if (a.target != this.el.dom && !a.within(this.el)) {
							if (this.monitoringMouseOver) {
								Ext.getDoc().un("mouseover",
										this.monitorMouseOver, this);
								this.monitoringMouseOver = false
							}
							this.onMouseOut(a)
						}
					},
					onMouseOut : function(b) {
						var a = b.within(this.el) && b.target != this.el.dom;
						this.el.removeClass("x-btn-over");
						this.fireEvent("mouseout", this, b);
						if (this.isMenuTriggerOut(b, a)) {
							this
									.fireEvent("menutriggerout", this,
											this.menu, b)
						}
					},
					onFocus : function(a) {
						if (!this.disabled) {
							this.el.addClass("x-btn-focus")
						}
					},
					onBlur : function(a) {
						this.el.removeClass("x-btn-focus")
					},
					getClickEl : function(b, a) {
						return this.el
					},
					onMouseDown : function(a) {
						if (!this.disabled && a.button == 0) {
							this.getClickEl(a).addClass("x-btn-click");
							Ext.getDoc().on("mouseup", this.onMouseUp, this)
						}
					},
					onMouseUp : function(a) {
						if (a.button == 0) {
							this.getClickEl(a, true).removeClass("x-btn-click");
							Ext.getDoc().un("mouseup", this.onMouseUp, this)
						}
					},
					onMenuShow : function(a) {
						this.ignoreNextClick = 0;
						this.el.addClass("x-btn-menu-active");
						this.fireEvent("menushow", this, this.menu)
					},
					onMenuHide : function(a) {
						this.el.removeClass("x-btn-menu-active");
						this.ignoreNextClick = this.restoreClick.defer(250,
								this);
						this.fireEvent("menuhide", this, this.menu)
					},
					restoreClick : function() {
						this.ignoreNextClick = 0
					}
				});
Ext.reg("button", Ext.Button);
Ext.ButtonToggleMgr = function() {
	var a = {};
	function b(e, k) {
		if (k) {
			var h = a[e.toggleGroup];
			for (var d = 0, c = h.length;d < c; d++) {
				if (h[d] != e) {
					h[d].toggle(false)
				}
			}
		}
	}
	return {
		register : function(c) {
			if (!c.toggleGroup) {
				return
			}
			var d = a[c.toggleGroup];
			if (!d) {
				d = a[c.toggleGroup] = []
			}
			d.push(c);
			c.on("toggle", b)
		},
		unregister : function(c) {
			if (!c.toggleGroup) {
				return
			}
			var d = a[c.toggleGroup];
			if (d) {
				d.remove(c);
				c.un("toggle", b)
			}
		}
	}
}();
Ext.SplitButton = Ext
		.extend(
				Ext.Button,
				{
					arrowSelector : "button:last",
					initComponent : function() {
						Ext.SplitButton.superclass.initComponent.call(this);
						this.addEvents("arrowclick")
					},
					onRender : function(d, a) {
						var b = new Ext.Template(
								'<table cellspacing="0" class="x-btn-menu-wrap x-btn"><tr><td>',
								'<table cellspacing="0" class="x-btn-wrap x-btn-menu-text-wrap"><tbody>',
								'<tr><td class="x-btn-left"><i>&#160;</i></td><td class="x-btn-center"><button class="x-btn-text" type="{1}">{0}</button></td></tr>',
								"</tbody></table></td><td>",
								'<table cellspacing="0" class="x-btn-wrap x-btn-menu-arrow-wrap"><tbody>',
								'<tr><td class="x-btn-center"><button class="x-btn-menu-arrow-el" type="button">&#160;</button></td><td class="x-btn-right"><i>&#160;</i></td></tr>',
								"</tbody></table></td></tr></table>");
						var c, g = [this.text || "&#160;", this.type];
						if (a) {
							c = b.insertBefore(a, g, true)
						} else {
							c = b.append(d, g, true)
						}
						var e = c.child(this.buttonSelector);
						this.initButtonEl(c, e);
						this.arrowBtnTable = c.child("table:last");
						if (this.arrowTooltip) {
							c.child(this.arrowSelector).dom[this.tooltipType] = this.arrowTooltip
						}
					},
					autoWidth : function() {
						if (this.el) {
							var c = this.el.child("table:first");
							var b = this.el.child("table:last");
							this.el.setWidth("auto");
							c.setWidth("auto");
							if (Ext.isIE7 && Ext.isStrict) {
								var a = this.el.child(this.buttonSelector);
								if (a && a.getWidth() > 20) {
									a.clip();
									a.setWidth(Ext.util.TextMetrics.measure(a,
											this.text).width
											+ a.getFrameWidth("lr"))
								}
							}
							if (this.minWidth) {
								if ((c.getWidth() + b.getWidth()) < this.minWidth) {
									c.setWidth(this.minWidth - b.getWidth())
								}
							}
							this.el.setWidth(c.getWidth() + b.getWidth())
						}
					},
					setArrowHandler : function(b, a) {
						this.arrowHandler = b;
						this.scope = a
					},
					onClick : function(a) {
						a.preventDefault();
						if (!this.disabled) {
							if (a.getTarget(".x-btn-menu-arrow-wrap")) {
								if (this.menu && !this.menu.isVisible()
										&& !this.ignoreNextClick) {
									this.showMenu()
								}
								this.fireEvent("arrowclick", this, a);
								if (this.arrowHandler) {
									this.arrowHandler.call(this.scope || this,
											this, a)
								}
							} else {
								if (this.enableToggle) {
									this.toggle()
								}
								this.fireEvent("click", this, a);
								if (this.handler) {
									this.handler.call(this.scope || this, this,
											a)
								}
							}
						}
					},
					getClickEl : function(b, a) {
						if (!a) {
							return (this.lastClickEl = b.getTarget("table", 10,
									true))
						}
						return this.lastClickEl
					},
					onDisable : function() {
						if (this.el) {
							if (!Ext.isIE6) {
								this.el.addClass("x-item-disabled")
							}
							this.el.child(this.buttonSelector).dom.disabled = true;
							this.el.child(this.arrowSelector).dom.disabled = true
						}
						this.disabled = true
					},
					onEnable : function() {
						if (this.el) {
							if (!Ext.isIE6) {
								this.el.removeClass("x-item-disabled")
							}
							this.el.child(this.buttonSelector).dom.disabled = false;
							this.el.child(this.arrowSelector).dom.disabled = false
						}
						this.disabled = false
					},
					isMenuTriggerOver : function(a) {
						return this.menu && a.within(this.arrowBtnTable)
								&& !a.within(this.arrowBtnTable, true)
					},
					isMenuTriggerOut : function(b, a) {
						return this.menu && !b.within(this.arrowBtnTable)
					},
					onDestroy : function() {
						Ext.destroy(this.arrowBtnTable);
						Ext.SplitButton.superclass.onDestroy.call(this)
					}
				});
Ext.MenuButton = Ext.SplitButton;
Ext.reg("splitbutton", Ext.SplitButton);
Ext.CycleButton = Ext.extend(Ext.SplitButton, {
	getItemText : function(a) {
		if (a && this.showText === true) {
			var b = "";
			if (this.prependText) {
				b += this.prependText
			}
			b += a.text;
			return b
		}
		return undefined
	},
	setActiveItem : function(c, a) {
		if (typeof c != "object") {
			c = this.menu.items.get(c)
		}
		if (c) {
			if (!this.rendered) {
				this.text = this.getItemText(c);
				this.iconCls = c.iconCls
			} else {
				var b = this.getItemText(c);
				if (b) {
					this.setText(b)
				}
				this.setIconClass(c.iconCls)
			}
			this.activeItem = c;
			if (!c.checked) {
				c.setChecked(true, true)
			}
			if (this.forceIcon) {
				this.setIconClass(this.forceIcon)
			}
			if (!a) {
				this.fireEvent("change", this, c)
			}
		}
	},
	getActiveItem : function() {
		return this.activeItem
	},
	initComponent : function() {
		this.addEvents("change");
		if (this.changeHandler) {
			this.on("change", this.changeHandler, this.scope || this);
			delete this.changeHandler
		}
		this.itemCount = this.items.length;
		this.menu = {
			cls : "x-cycle-menu",
			items : []
		};
		var d;
		for (var b = 0, a = this.itemCount;b < a; b++) {
			var c = this.items[b];
			c.group = c.group || this.id;
			c.itemIndex = b;
			c.checkHandler = this.checkHandler;
			c.scope = this;
			c.checked = c.checked || false;
			this.menu.items.push(c);
			if (c.checked) {
				d = c
			}
		}
		this.setActiveItem(d, true);
		Ext.CycleButton.superclass.initComponent.call(this);
		this.on("click", this.toggleSelected, this)
	},
	checkHandler : function(a, b) {
		if (b) {
			this.setActiveItem(a)
		}
	},
	toggleSelected : function() {
		this.menu.render();
		var c, a;
		for (var b = 1;b < this.itemCount; b++) {
			c = (this.activeItem.itemIndex + b) % this.itemCount;
			a = this.menu.items.itemAt(c);
			if (!a.disabled) {
				a.setChecked(true);
				break
			}
		}
	}
});
Ext.reg("cycle", Ext.CycleButton);
Ext.Toolbar = function(a) {
	if (Ext.isArray(a)) {
		a = {
			buttons : a
		}
	}
	Ext.Toolbar.superclass.constructor.call(this, a)
};
(function() {
	var a = Ext.Toolbar;
	Ext.extend(a, Ext.BoxComponent, {
		trackMenus : true,
		initComponent : function() {
			a.superclass.initComponent.call(this);
			if (this.items) {
				this.buttons = this.items
			}
			this.items = new Ext.util.MixedCollection(false, function(b) {
				return b.itemId || b.id || Ext.id()
			})
		},
		autoCreate : {
			cls : "x-toolbar x-small-editor",
			html : '<table cellspacing="0"><tr></tr></table>'
		},
		onRender : function(c, b) {
			this.el = c.createChild(Ext.apply( {
				id : this.id
			}, this.autoCreate), b);
			this.tr = this.el.child("tr", true)
		},
		afterRender : function() {
			a.superclass.afterRender.call(this);
			if (this.buttons) {
				this.add.apply(this, this.buttons);
				delete this.buttons
			}
		},
		add : function() {
			var c = arguments, b = c.length;
			for (var d = 0;d < b; d++) {
				var e = c[d];
				if (e.isFormField) {
					this.addField(e)
				} else {
					if (e.render) {
						this.addItem(e)
					} else {
						if (typeof e == "string") {
							if (e == "separator" || e == "-") {
								this.addSeparator()
							} else {
								if (e == " ") {
									this.addSpacer()
								} else {
									if (e == "->") {
										this.addFill()
									} else {
										this.addText(e)
									}
								}
							}
						} else {
							if (e.tagName) {
								this.addElement(e)
							} else {
								if (typeof e == "object") {
									if (e.xtype) {
										this.addField(Ext.ComponentMgr.create(
												e, "button"))
									} else {
										this.addButton(e)
									}
								}
							}
						}
					}
				}
			}
		},
		addSeparator : function() {
			return this.addItem(new a.Separator())
		},
		addSpacer : function() {
			return this.addItem(new a.Spacer())
		},
		addFill : function() {
			return this.addItem(new a.Fill())
		},
		addElement : function(b) {
			return this.addItem(new a.Item(b))
		},
		addItem : function(b) {
			var c = this.nextBlock();
			this.initMenuTracking(b);
			b.render(c);
			this.items.add(b);
			return b
		},
		addButton : function(e) {
			if (Ext.isArray(e)) {
				var h = [];
				for (var g = 0, d = e.length;g < d; g++) {
					h.push(this.addButton(e[g]))
				}
				return h
			}
			var c = e;
			if (!(e instanceof a.Button)) {
				c = e.split ? new a.SplitButton(e) : new a.Button(e)
			}
			var k = this.nextBlock();
			this.initMenuTracking(c);
			c.render(k);
			this.items.add(c);
			return c
		},
		initMenuTracking : function(b) {
			if (this.trackMenus && b.menu) {
				b.on( {
					menutriggerover : this.onButtonTriggerOver,
					menushow : this.onButtonMenuShow,
					menuhide : this.onButtonMenuHide,
					scope : this
				})
			}
		},
		addText : function(b) {
			return this.addItem(new a.TextItem(b))
		},
		insertButton : function(c, g) {
			if (Ext.isArray(g)) {
				var e = [];
				for (var d = 0, b = g.length;d < b; d++) {
					e.push(this.insertButton(c + d, g[d]))
				}
				return e
			}
			if (!(g instanceof a.Button)) {
				g = new a.Button(g)
			}
			var h = document.createElement("td");
			this.tr.insertBefore(h, this.tr.childNodes[c]);
			this.initMenuTracking(g);
			g.render(h);
			this.items.insert(c, g);
			return g
		},
		addDom : function(c, b) {
			var e = this.nextBlock();
			Ext.DomHelper.overwrite(e, c);
			var d = new a.Item(e.firstChild);
			d.render(e);
			this.items.add(d);
			return d
		},
		addField : function(c) {
			var d = this.nextBlock();
			c.render(d);
			var b = new a.Item(d.firstChild);
			b.render(d);
			this.items.add(c);
			return b
		},
		nextBlock : function() {
			var b = document.createElement("td");
			this.tr.appendChild(b);
			return b
		},
		onDestroy : function() {
			Ext.Toolbar.superclass.onDestroy.call(this);
			if (this.rendered) {
				if (this.items) {
					Ext.destroy.apply(Ext, this.items.items)
				}
				Ext.Element.uncache(this.tr)
			}
		},
		onDisable : function() {
			this.items.each(function(b) {
				if (b.disable) {
					b.disable()
				}
			})
		},
		onEnable : function() {
			this.items.each(function(b) {
				if (b.enable) {
					b.enable()
				}
			})
		},
		onButtonTriggerOver : function(b) {
			if (this.activeMenuBtn && this.activeMenuBtn != b) {
				this.activeMenuBtn.hideMenu();
				b.showMenu();
				this.activeMenuBtn = b
			}
		},
		onButtonMenuShow : function(b) {
			this.activeMenuBtn = b
		},
		onButtonMenuHide : function(b) {
			delete this.activeMenuBtn
		}
	});
	Ext.reg("toolbar", Ext.Toolbar);
	a.Item = function(b) {
		this.el = Ext.getDom(b);
		this.id = Ext.id(this.el);
		this.hidden = false
	};
	a.Item.prototype = {
		getEl : function() {
			return this.el
		},
		render : function(b) {
			this.td = b;
			b.appendChild(this.el)
		},
		destroy : function() {
			if (this.el) {
				var b = Ext.get(this.el);
				Ext.destroy(b)
			}
			Ext.removeNode(this.td)
		},
		show : function() {
			this.hidden = false;
			this.td.style.display = ""
		},
		hide : function() {
			this.hidden = true;
			this.td.style.display = "none"
		},
		setVisible : function(b) {
			if (b) {
				this.show()
			} else {
				this.hide()
			}
		},
		focus : function() {
			Ext.fly(this.el).focus()
		},
		disable : function() {
			Ext.fly(this.td).addClass("x-item-disabled");
			this.disabled = true;
			this.el.disabled = true
		},
		enable : function() {
			Ext.fly(this.td).removeClass("x-item-disabled");
			this.disabled = false;
			this.el.disabled = false
		}
	};
	Ext.reg("tbitem", a.Item);
	a.Separator = function() {
		var b = document.createElement("span");
		b.className = "ytb-sep";
		a.Separator.superclass.constructor.call(this, b)
	};
	Ext.extend(a.Separator, a.Item, {
		enable : Ext.emptyFn,
		disable : Ext.emptyFn,
		focus : Ext.emptyFn
	});
	Ext.reg("tbseparator", a.Separator);
	a.Spacer = function() {
		var b = document.createElement("div");
		b.className = "ytb-spacer";
		a.Spacer.superclass.constructor.call(this, b)
	};
	Ext.extend(a.Spacer, a.Item, {
		enable : Ext.emptyFn,
		disable : Ext.emptyFn,
		focus : Ext.emptyFn
	});
	Ext.reg("tbspacer", a.Spacer);
	a.Fill = Ext.extend(a.Spacer, {
		render : function(b) {
			b.style.width = "100%";
			a.Fill.superclass.render.call(this, b)
		}
	});
	Ext.reg("tbfill", a.Fill);
	a.TextItem = function(b) {
		var c = document.createElement("span");
		c.className = "ytb-text";
		c.innerHTML = b.text ? b.text : b;
		a.TextItem.superclass.constructor.call(this, c)
	};
	Ext.extend(a.TextItem, a.Item, {
		enable : Ext.emptyFn,
		disable : Ext.emptyFn,
		focus : Ext.emptyFn
	});
	Ext.reg("tbtext", a.TextItem);
	a.Button = Ext.extend(Ext.Button, {
		hideParent : true,
		onDestroy : function() {
			a.Button.superclass.onDestroy.call(this);
			if (this.container) {
				this.container.remove()
			}
		}
	});
	Ext.reg("tbbutton", a.Button);
	a.SplitButton = Ext.extend(Ext.SplitButton, {
		hideParent : true,
		onDestroy : function() {
			a.SplitButton.superclass.onDestroy.call(this);
			if (this.container) {
				this.container.remove()
			}
		}
	});
	Ext.reg("tbsplit", a.SplitButton);
	a.MenuButton = a.SplitButton
})();
Ext.PagingToolbar = Ext.extend(Ext.Toolbar, {
	pageSize : 20,
	displayMsg : "Displaying {0} - {1} of {2}",
	emptyMsg : "No data to display",
	beforePageText : "Page",
	afterPageText : "of {0}",
	firstText : "First Page",
	prevText : "Previous Page",
	nextText : "Next Page",
	lastText : "Last Page",
	refreshText : "Refresh",
	paramNames : {
		start : "start",
		limit : "limit"
	},
	initComponent : function() {
		this.addEvents("change", "beforechange");
		Ext.PagingToolbar.superclass.initComponent.call(this);
		this.cursor = 0;
		this.bind(this.store)
	},
	onRender : function(b, a) {
		Ext.PagingToolbar.superclass.onRender.call(this, b, a);
		this.first = this.addButton( {
			tooltip : this.firstText,
			iconCls : "x-tbar-page-first",
			disabled : true,
			handler : this.onClick.createDelegate(this, ["first"])
		});
		this.prev = this.addButton( {
			tooltip : this.prevText,
			iconCls : "x-tbar-page-prev",
			disabled : true,
			handler : this.onClick.createDelegate(this, ["prev"])
		});
		this.addSeparator();
		this.add(this.beforePageText);
		this.field = Ext.get(this.addDom( {
			tag : "input",
			type : "text",
			size : "3",
			value : "1",
			cls : "x-tbar-page-number"
		}).el);
		this.field.on("keydown", this.onPagingKeydown, this);
		this.field.on("focus", function() {
			this.dom.select()
		});
		this.field.on("blur", this.onPagingBlur, this);
		this.afterTextEl = this.addText(String.format(this.afterPageText, 1));
		this.field.setHeight(18);
		this.addSeparator();
		this.next = this.addButton( {
			tooltip : this.nextText,
			iconCls : "x-tbar-page-next",
			disabled : true,
			handler : this.onClick.createDelegate(this, ["next"])
		});
		this.last = this.addButton( {
			tooltip : this.lastText,
			iconCls : "x-tbar-page-last",
			disabled : true,
			handler : this.onClick.createDelegate(this, ["last"])
		});
		this.addSeparator();
		this.loading = this.addButton( {
			tooltip : this.refreshText,
			iconCls : "x-tbar-loading",
			handler : this.onClick.createDelegate(this, ["refresh"])
		});
		if (this.displayInfo) {
			this.displayEl = Ext.fly(this.el.dom).createChild( {
				cls : "x-paging-info"
			})
		}
		if (this.dsLoaded) {
			this.onLoad.apply(this, this.dsLoaded)
		}
	},
	updateInfo : function() {
		if (this.displayEl) {
			var a = this.store.getCount();
			var b = a == 0 ? this.emptyMsg : String.format(this.displayMsg,
					this.cursor + 1, this.cursor + a, this.store
							.getTotalCount());
			this.displayEl.update(b)
		}
	},
	onLoad : function(a, c, h) {
		if (!this.rendered) {
			this.dsLoaded = [a, c, h];
			return
		}
		this.cursor = h.params ? h.params[this.paramNames.start] : 0;
		var g = this.getPageData(), b = g.activePage, e = g.pages;
		this.afterTextEl.el.innerHTML = String.format(this.afterPageText,
				g.pages);
		this.field.dom.value = b;
		this.first.setDisabled(b == 1);
		this.prev.setDisabled(b == 1);
		this.next.setDisabled(b == e);
		this.last.setDisabled(b == e);
		this.loading.enable();
		this.updateInfo();
		this.fireEvent("change", this, g)
	},
	getPageData : function() {
		var a = this.store.getTotalCount();
		return {
			total : a,
			activePage : Math.ceil((this.cursor + this.pageSize)
					/ this.pageSize),
			pages : a < this.pageSize ? 1 : Math.ceil(a / this.pageSize)
		}
	},
	onLoadError : function() {
		if (!this.rendered) {
			return
		}
		this.loading.enable()
	},
	readPage : function(c) {
		var a = this.field.dom.value, b;
		if (!a || isNaN(b = parseInt(a, 10))) {
			this.field.dom.value = c.activePage;
			return false
		}
		return b
	},
	onPagingBlur : function(a) {
		this.field.dom.value = this.getPageData().activePage
	},
	onPagingKeydown : function(g) {
		var b = g.getKey(), h = this.getPageData(), c;
		if (b == g.RETURN) {
			g.stopEvent();
			c = this.readPage(h);
			if (c !== false) {
				c = Math.min(Math.max(1, c), h.pages) - 1;
				this.doLoad(c * this.pageSize)
			}
		} else {
			if (b == g.HOME || b == g.END) {
				g.stopEvent();
				c = b == g.HOME ? 1 : h.pages;
				this.field.dom.value = c
			} else {
				if (b == g.UP || b == g.PAGEUP || b == g.DOWN
						|| b == g.PAGEDOWN) {
					g.stopEvent();
					if (c = this.readPage(h)) {
						var a = g.shiftKey ? 10 : 1;
						if (b == g.DOWN || b == g.PAGEDOWN) {
							a *= -1
						}
						c += a;
						if (c >= 1 & c <= h.pages) {
							this.field.dom.value = c
						}
					}
				}
			}
		}
	},
	beforeLoad : function() {
		if (this.rendered && this.loading) {
			this.loading.disable()
		}
	},
	doLoad : function(c) {
		var b = {}, a = this.paramNames;
		b[a.start] = c;
		b[a.limit] = this.pageSize;
		if (this.fireEvent("beforechange", this, b) !== false) {
			this.store.load( {
				params : b
			})
		}
	},
	changePage : function(a) {
		this.doLoad(((a - 1) * this.pageSize).constrain(0, this.store
				.getTotalCount()))
	},
	onClick : function(e) {
		var b = this.store;
		switch (e) {
			case "first" :
				this.doLoad(0);
				break;
			case "prev" :
				this.doLoad(Math.max(0, this.cursor - this.pageSize));
				break;
			case "next" :
				this.doLoad(this.cursor + this.pageSize);
				break;
			case "last" :
				var d = b.getTotalCount();
				var a = d % this.pageSize;
				var c = a ? (d - a) : d - this.pageSize;
				this.doLoad(c);
				break;
			case "refresh" :
				this.doLoad(this.cursor);
				break
		}
	},
	unbind : function(a) {
		a = Ext.StoreMgr.lookup(a);
		a.un("beforeload", this.beforeLoad, this);
		a.un("load", this.onLoad, this);
		a.un("loadexception", this.onLoadError, this);
		this.store = undefined
	},
	bind : function(a) {
		a = Ext.StoreMgr.lookup(a);
		a.on("beforeload", this.beforeLoad, this);
		a.on("load", this.onLoad, this);
		a.on("loadexception", this.onLoadError, this);
		this.store = a
	},
	onDestroy : function() {
		if (this.store) {
			this.unbind(this.store)
		}
		Ext.PagingToolbar.superclass.onDestroy.call(this)
	}
});
Ext.reg("paging", Ext.PagingToolbar);
Ext.Resizable = function(d, e) {
	this.el = Ext.get(d);
	if (e && e.wrap) {
		e.resizeChild = this.el;
		this.el = this.el.wrap(typeof e.wrap == "object" ? e.wrap : {
			cls : "xresizable-wrap"
		});
		this.el.id = this.el.dom.id = e.resizeChild.id + "-rzwrap";
		this.el.setStyle("overflow", "hidden");
		this.el.setPositioning(e.resizeChild.getPositioning());
		e.resizeChild.clearPositioning();
		if (!e.width || !e.height) {
			var g = e.resizeChild.getSize();
			this.el.setSize(g.width, g.height)
		}
		if (e.pinned && !e.adjustments) {
			e.adjustments = "auto"
		}
	}
	this.proxy = this.el.createProxy( {
		tag : "div",
		cls : "x-resizable-proxy",
		id : this.el.id + "-rzproxy"
	}, Ext.getBody());
	this.proxy.unselectable();
	this.proxy.enableDisplayMode("block");
	Ext.apply(this, e);
	if (this.pinned) {
		this.disableTrackOver = true;
		this.el.addClass("x-resizable-pinned")
	}
	var l = this.el.getStyle("position");
	if (l != "absolute" && l != "fixed") {
		this.el.setStyle("position", "relative")
	}
	if (!this.handles) {
		this.handles = "s,e,se";
		if (this.multiDirectional) {
			this.handles += ",n,w"
		}
	}
	if (this.handles == "all") {
		this.handles = "n s e w ne nw se sw"
	}
	var p = this.handles.split(/\s*?[,;]\s*?| /);
	var c = Ext.Resizable.positions;
	for (var k = 0, m = p.length;k < m; k++) {
		if (p[k] && c[p[k]]) {
			var o = c[p[k]];
			this[o] = new Ext.Resizable.Handle(this, o, this.disableTrackOver,
					this.transparent)
		}
	}
	this.corner = this.southeast;
	if (this.handles.indexOf("n") != -1 || this.handles.indexOf("w") != -1) {
		this.updateBox = true
	}
	this.activeHandle = null;
	if (this.resizeChild) {
		if (typeof this.resizeChild == "boolean") {
			this.resizeChild = Ext.get(this.el.dom.firstChild, true)
		} else {
			this.resizeChild = Ext.get(this.resizeChild, true)
		}
	}
	if (this.adjustments == "auto") {
		var b = this.resizeChild;
		var n = this.west, h = this.east, a = this.north, p = this.south;
		if (b && (n || a)) {
			b.position("relative");
			b.setLeft(n ? n.el.getWidth() : 0);
			b.setTop(a ? a.el.getHeight() : 0)
		}
		this.adjustments = [
				(h ? -h.el.getWidth() : 0) + (n ? -n.el.getWidth() : 0),
				(a ? -a.el.getHeight() : 0) + (p ? -p.el.getHeight() : 0) - 1]
	}
	if (this.draggable) {
		this.dd = this.dynamic ? this.el.initDD(null) : this.el.initDDProxy(
				null, {
					dragElId : this.proxy.id
				});
		this.dd.setHandleElId(this.resizeChild
				? this.resizeChild.id
				: this.el.id)
	}
	this.addEvents("beforeresize", "resize");
	if (this.width !== null && this.height !== null) {
		this.resizeTo(this.width, this.height)
	} else {
		this.updateChildSize()
	}
	if (Ext.isIE) {
		this.el.dom.style.zoom = 1
	}
	Ext.Resizable.superclass.constructor.call(this)
};
Ext.extend(Ext.Resizable, Ext.util.Observable, {
	resizeChild : false,
	adjustments : [0, 0],
	minWidth : 5,
	minHeight : 5,
	maxWidth : 10000,
	maxHeight : 10000,
	enabled : true,
	animate : false,
	duration : 0.35,
	dynamic : false,
	handles : false,
	multiDirectional : false,
	disableTrackOver : false,
	easing : "easeOutStrong",
	widthIncrement : 0,
	heightIncrement : 0,
	pinned : false,
	width : null,
	height : null,
	preserveRatio : false,
	transparent : false,
	minX : 0,
	minY : 0,
	draggable : false,
	resizeTo : function(b, a) {
		this.el.setSize(b, a);
		this.updateChildSize();
		this.fireEvent("resize", this, b, a, null)
	},
	startSizing : function(c, b) {
		this.fireEvent("beforeresize", this, c);
		if (this.enabled) {
			if (!this.overlay) {
				this.overlay = this.el.createProxy( {
					tag : "div",
					cls : "x-resizable-overlay",
					html : "&#160;"
				}, Ext.getBody());
				this.overlay.unselectable();
				this.overlay.enableDisplayMode("block");
				this.overlay.on("mousemove", this.onMouseMove, this);
				this.overlay.on("mouseup", this.onMouseUp, this)
			}
			this.overlay.setStyle("cursor", b.el.getStyle("cursor"));
			this.resizing = true;
			this.startBox = this.el.getBox();
			this.startPoint = c.getXY();
			this.offsets = [
					(this.startBox.x + this.startBox.width)
							- this.startPoint[0],
					(this.startBox.y + this.startBox.height)
							- this.startPoint[1]];
			this.overlay.setSize(Ext.lib.Dom.getViewWidth(true), Ext.lib.Dom
					.getViewHeight(true));
			this.overlay.show();
			if (this.constrainTo) {
				var a = Ext.get(this.constrainTo);
				this.resizeRegion = a.getRegion().adjust(a.getFrameWidth("t"),
						a.getFrameWidth("l"), -a.getFrameWidth("b"),
						-a.getFrameWidth("r"))
			}
			this.proxy.setStyle("visibility", "hidden");
			this.proxy.show();
			this.proxy.setBox(this.startBox);
			if (!this.dynamic) {
				this.proxy.setStyle("visibility", "visible")
			}
		}
	},
	onMouseDown : function(a, b) {
		if (this.enabled) {
			b.stopEvent();
			this.activeHandle = a;
			this.startSizing(b, a)
		}
	},
	onMouseUp : function(b) {
		var a = this.resizeElement();
		this.resizing = false;
		this.handleOut();
		this.overlay.hide();
		this.proxy.hide();
		this.fireEvent("resize", this, a.width, a.height, b)
	},
	updateChildSize : function() {
		if (this.resizeChild) {
			var d = this.el;
			var e = this.resizeChild;
			var c = this.adjustments;
			if (d.dom.offsetWidth) {
				var a = d.getSize(true);
				e.setSize(a.width + c[0], a.height + c[1])
			}
			if (Ext.isIE) {
				setTimeout(function() {
					if (d.dom.offsetWidth) {
						var g = d.getSize(true);
						e.setSize(g.width + c[0], g.height + c[1])
					}
				}, 10)
			}
		}
	},
	snap : function(c, e, b) {
		if (!e || !c) {
			return c
		}
		var d = c;
		var a = c % e;
		if (a > 0) {
			if (a > (e / 2)) {
				d = c + (e - a)
			} else {
				d = c - a
			}
		}
		return Math.max(b, d)
	},
	resizeElement : function() {
		var a = this.proxy.getBox();
		if (this.updateBox) {
			this.el.setBox(a, false, this.animate, this.duration, null,
					this.easing)
		} else {
			this.el.setSize(a.width, a.height, this.animate, this.duration,
					null, this.easing)
		}
		this.updateChildSize();
		if (!this.dynamic) {
			this.proxy.hide()
		}
		return a
	},
	constrain : function(b, c, a, d) {
		if (b - c < a) {
			c = b - a
		} else {
			if (b - c > d) {
				c = d - b
			}
		}
		return c
	},
	onMouseMove : function(z) {
		if (this.enabled) {
			try {
				if (this.resizeRegion
						&& !this.resizeRegion.contains(z.getPoint())) {
					return
				}
				var u = this.curSize || this.startBox;
				var m = this.startBox.x, l = this.startBox.y;
				var c = m, b = l;
				var n = u.width, v = u.height;
				var d = n, p = v;
				var o = this.minWidth, A = this.minHeight;
				var t = this.maxWidth, D = this.maxHeight;
				var i = this.widthIncrement;
				var a = this.heightIncrement;
				var B = z.getXY();
				var s = -(this.startPoint[0] - Math.max(this.minX, B[0]));
				var q = -(this.startPoint[1] - Math.max(this.minY, B[1]));
				var k = this.activeHandle.position;
				switch (k) {
					case "east" :
						n += s;
						n = Math.min(Math.max(o, n), t);
						break;
					case "south" :
						v += q;
						v = Math.min(Math.max(A, v), D);
						break;
					case "southeast" :
						n += s;
						v += q;
						n = Math.min(Math.max(o, n), t);
						v = Math.min(Math.max(A, v), D);
						break;
					case "north" :
						q = this.constrain(v, q, A, D);
						l += q;
						v -= q;
						break;
					case "west" :
						s = this.constrain(n, s, o, t);
						m += s;
						n -= s;
						break;
					case "northeast" :
						n += s;
						n = Math.min(Math.max(o, n), t);
						q = this.constrain(v, q, A, D);
						l += q;
						v -= q;
						break;
					case "northwest" :
						s = this.constrain(n, s, o, t);
						q = this.constrain(v, q, A, D);
						l += q;
						v -= q;
						m += s;
						n -= s;
						break;
					case "southwest" :
						s = this.constrain(n, s, o, t);
						v += q;
						v = Math.min(Math.max(A, v), D);
						m += s;
						n -= s;
						break
				}
				var r = this.snap(n, i, o);
				var C = this.snap(v, a, A);
				if (r != n || C != v) {
					switch (k) {
						case "northeast" :
							l -= C - v;
							break;
						case "north" :
							l -= C - v;
							break;
						case "southwest" :
							m -= r - n;
							break;
						case "west" :
							m -= r - n;
							break;
						case "northwest" :
							m -= r - n;
							l -= C - v;
							break
					}
					n = r;
					v = C
				}
				if (this.preserveRatio) {
					switch (k) {
						case "southeast" :
						case "east" :
							v = p * (n / d);
							v = Math.min(Math.max(A, v), D);
							n = d * (v / p);
							break;
						case "south" :
							n = d * (v / p);
							n = Math.min(Math.max(o, n), t);
							v = p * (n / d);
							break;
						case "northeast" :
							n = d * (v / p);
							n = Math.min(Math.max(o, n), t);
							v = p * (n / d);
							break;
						case "north" :
							var E = n;
							n = d * (v / p);
							n = Math.min(Math.max(o, n), t);
							v = p * (n / d);
							m += (E - n) / 2;
							break;
						case "southwest" :
							v = p * (n / d);
							v = Math.min(Math.max(A, v), D);
							var E = n;
							n = d * (v / p);
							m += E - n;
							break;
						case "west" :
							var g = v;
							v = p * (n / d);
							v = Math.min(Math.max(A, v), D);
							l += (g - v) / 2;
							var E = n;
							n = d * (v / p);
							m += E - n;
							break;
						case "northwest" :
							var E = n;
							var g = v;
							v = p * (n / d);
							v = Math.min(Math.max(A, v), D);
							n = d * (v / p);
							l += g - v;
							m += E - n;
							break
					}
				}
				this.proxy.setBounds(m, l, n, v);
				if (this.dynamic) {
					this.resizeElement()
				}
			} catch (z) {
			}
		}
	},
	handleOver : function() {
		if (this.enabled) {
			this.el.addClass("x-resizable-over")
		}
	},
	handleOut : function() {
		if (!this.resizing) {
			this.el.removeClass("x-resizable-over")
		}
	},
	getEl : function() {
		return this.el
	},
	getResizeChild : function() {
		return this.resizeChild
	},
	destroy : function(b) {
		if (this.dd) {
			this.dd.destroy()
		}
		if (this.overlay) {
			Ext.destroy(this.overlay);
			this.overlay = null
		}
		Ext.destroy(this.proxy);
		this.proxy = null;
		var c = Ext.Resizable.positions;
		for (var a in c) {
			if (typeof c[a] != "function" && this[c[a]]) {
				this[c[a]].destroy()
			}
		}
		if (b) {
			this.el.update("");
			Ext.destroy(this.el);
			this.el = null
		}
	},
	syncHandleHeight : function() {
		var a = this.el.getHeight(true);
		if (this.west) {
			this.west.el.setHeight(a)
		}
		if (this.east) {
			this.east.el.setHeight(a)
		}
	}
});
Ext.Resizable.positions = {
	n : "north",
	s : "south",
	e : "east",
	w : "west",
	se : "southeast",
	sw : "southwest",
	nw : "northwest",
	ne : "northeast"
};
Ext.Resizable.Handle = function(c, e, b, d) {
	if (!this.tpl) {
		var a = Ext.DomHelper.createTemplate( {
			tag : "div",
			cls : "x-resizable-handle x-resizable-handle-{0}"
		});
		a.compile();
		Ext.Resizable.Handle.prototype.tpl = a
	}
	this.position = e;
	this.rz = c;
	this.el = this.tpl.append(c.el.dom, [this.position], true);
	this.el.unselectable();
	if (d) {
		this.el.setOpacity(0)
	}
	this.el.on("mousedown", this.onMouseDown, this);
	if (!b) {
		this.el.on("mouseover", this.onMouseOver, this);
		this.el.on("mouseout", this.onMouseOut, this)
	}
};
Ext.Resizable.Handle.prototype = {
	afterResize : function(a) {
	},
	onMouseDown : function(a) {
		this.rz.onMouseDown(this, a)
	},
	onMouseOver : function(a) {
		this.rz.handleOver(this, a)
	},
	onMouseOut : function(a) {
		this.rz.handleOut(this, a)
	},
	destroy : function() {
		Ext.destroy(this.el);
		this.el = null
	}
};
Ext.Editor = function(b, a) {
	this.field = b;
	Ext.Editor.superclass.constructor.call(this, a)
};
Ext
		.extend(Ext.Editor, Ext.Component,
				{
					value : "",
					alignment : "c-c?",
					shadow : "frame",
					constrain : false,
					swallowKeys : true,
					completeOnEnter : false,
					cancelOnEsc : false,
					updateEl : false,
					initComponent : function() {
						Ext.Editor.superclass.initComponent.call(this);
						this.addEvents("beforestartedit", "startedit",
								"beforecomplete", "complete", "canceledit",
								"specialkey")
					},
					onRender : function(b, a) {
						this.el = new Ext.Layer( {
							shadow : this.shadow,
							cls : "x-editor",
							parentEl : b,
							shim : this.shim,
							shadowOffset : 4,
							id : this.id,
							constrain : this.constrain
						});
						this.el.setStyle("overflow", Ext.isGecko
								? "auto"
								: "hidden");
						if (this.field.msgTarget != "title") {
							this.field.msgTarget = "qtip"
						}
						this.field.inEditor = true;
						this.field.render(this.el);
						if (Ext.isGecko) {
							this.field.el.dom.setAttribute("autocomplete",
									"off")
						}
						this.field.on("specialkey", this.onSpecialKey, this);
						if (this.swallowKeys) {
							this.field.el.swallowEvent(["keydown", "keypress"])
						}
						this.field.show();
						this.field.on("blur", this.onBlur, this);
						if (this.field.grow) {
							this.field.on("autosize", this.el.sync, this.el, {
								delay : 1
							})
						}
					},
					onSpecialKey : function(c, b) {
						var a = b.getKey();
						if (this.completeOnEnter && a == b.ENTER) {
							b.stopEvent();
							this.completeEdit()
						} else {
							if (this.cancelOnEsc && a == b.ESC) {
								this.cancelEdit()
							} else {
								this.fireEvent("specialkey", c, b)
							}
						}
						if (this.field.triggerBlur
								&& (a == b.ENTER || a == b.ESC || a == b.TAB)) {
							this.field.triggerBlur()
						}
					},
					startEdit : function(b, c) {
						if (this.editing) {
							this.completeEdit()
						}
						this.boundEl = Ext.get(b);
						var a = c !== undefined
								? c
								: this.boundEl.dom.innerHTML;
						if (!this.rendered) {
							this.render(this.parentEl || document.body)
						}
						if (this.fireEvent("beforestartedit", this,
								this.boundEl, a) === false) {
							return
						}
						this.startValue = a;
						this.field.setValue(a);
						this.doAutoSize();
						this.el.alignTo(this.boundEl, this.alignment);
						this.editing = true;
						this.show()
					},
					doAutoSize : function() {
						if (this.autoSize) {
							var a = this.boundEl.getSize();
							switch (this.autoSize) {
								case "width" :
									this.setSize(a.width, "");
									break;
								case "height" :
									this.setSize("", a.height);
									break;
								default :
									this.setSize(a.width, a.height)
							}
						}
					},
					setSize : function(a, b) {
						delete this.field.lastSize;
						this.field.setSize(a, b);
						if (this.el) {
							if (Ext.isGecko2 || Ext.isOpera) {
								this.el.setSize(a, b)
							}
							this.el.sync()
						}
					},
					realign : function() {
						this.el.alignTo(this.boundEl, this.alignment)
					},
					completeEdit : function(a) {
						if (!this.editing) {
							return
						}
						var b = this.getValue();
						if (this.revertInvalid !== false
								&& !this.field.isValid()) {
							b = this.startValue;
							this.cancelEdit(true)
						}
						if (String(b) === String(this.startValue)
								&& this.ignoreNoChange) {
							this.editing = false;
							this.hide();
							return
						}
						if (this.fireEvent("beforecomplete", this, b,
								this.startValue) !== false) {
							this.editing = false;
							if (this.updateEl && this.boundEl) {
								this.boundEl.update(b)
							}
							if (a !== true) {
								this.hide()
							}
							this
									.fireEvent("complete", this, b,
											this.startValue)
						}
					},
					onShow : function() {
						this.el.show();
						if (this.hideEl !== false) {
							this.boundEl.hide()
						}
						this.field.show();
						if (Ext.isIE && !this.fixIEFocus) {
							this.fixIEFocus = true;
							this.deferredFocus.defer(50, this)
						} else {
							this.field.focus()
						}
						this.fireEvent("startedit", this.boundEl,
								this.startValue)
					},
					deferredFocus : function() {
						if (this.editing) {
							this.field.focus()
						}
					},
					cancelEdit : function(a) {
						if (this.editing) {
							var b = this.getValue();
							this.setValue(this.startValue);
							if (a !== true) {
								this.hide()
							}
							this.fireEvent("canceledit", this, b,
									this.startValue)
						}
					},
					onBlur : function() {
						if (this.allowBlur !== true && this.editing) {
							this.completeEdit()
						}
					},
					onHide : function() {
						if (this.editing) {
							this.completeEdit();
							return
						}
						this.field.blur();
						if (this.field.collapse) {
							this.field.collapse()
						}
						this.el.hide();
						if (this.hideEl !== false) {
							this.boundEl.show()
						}
					},
					setValue : function(a) {
						this.field.setValue(a)
					},
					getValue : function() {
						return this.field.getValue()
					},
					beforeDestroy : function() {
						Ext.destroy(this.field);
						this.field = null
					}
				});
Ext.reg("editor", Ext.Editor);
Ext.MessageBox = function() {
	var t, b, p, s;
	var h, l, r, a, m, o, i, g;
	var q, u, n, c = "";
	var d = function(w) {
		if (t.isVisible()) {
			t.hide();
			Ext.callback(b.fn, b.scope || window, [w, u.dom.value, b], 1)
		}
	};
	var v = function() {
		if (b && b.cls) {
			t.el.removeClass(b.cls)
		}
		m.reset()
	};
	var e = function(y, w, x) {
		if (b && b.closable !== false) {
			t.hide()
		}
		if (x) {
			x.stopEvent()
		}
	};
	var k = function(w) {
		var y = 0;
		if (!w) {
			q.ok.hide();
			q.cancel.hide();
			q.yes.hide();
			q.no.hide();
			return y
		}
		t.footer.dom.style.display = "";
		for (var x in q) {
			if (typeof q[x] != "function") {
				if (w[x]) {
					q[x].show();
					q[x].setText(typeof w[x] == "string"
							? w[x]
							: Ext.MessageBox.buttonText[x]);
					y += q[x].el.getWidth() + 15
				} else {
					q[x].hide()
				}
			}
		}
		return y
	};
	return {
		getDialog : function(w) {
			if (!t) {
				t = new Ext.Window( {
					autoCreate : true,
					title : w,
					resizable : false,
					constrain : true,
					constrainHeader : true,
					minimizable : false,
					maximizable : false,
					stateful : false,
					modal : true,
					shim : true,
					buttonAlign : "center",
					width : 400,
					height : 100,
					minHeight : 80,
					plain : true,
					footer : true,
					closable : true,
					close : function() {
						if (b && b.buttons && b.buttons.no && !b.buttons.cancel) {
							d("no")
						} else {
							d("cancel")
						}
					}
				});
				q = {};
				var x = this.buttonText;
				q.ok = t.addButton(x.ok, d.createCallback("ok"));
				q.yes = t.addButton(x.yes, d.createCallback("yes"));
				q.no = t.addButton(x.no, d.createCallback("no"));
				q.cancel = t.addButton(x.cancel, d.createCallback("cancel"));
				q.ok.hideMode = q.yes.hideMode = q.no.hideMode = q.cancel.hideMode = "offsets";
				t.render(document.body);
				t.getEl().addClass("x-window-dlg");
				p = t.mask;
				h = t.body
						.createChild( {
							html : '<div class="ext-mb-icon"></div><div class="ext-mb-content"><span class="ext-mb-text"></span><br /><div class="ext-mb-fix-cursor"><input type="text" class="ext-mb-input" /><textarea class="ext-mb-textarea"></textarea></div></div>'
						});
				i = Ext.get(h.dom.firstChild);
				var y = h.dom.childNodes[1];
				l = Ext.get(y.firstChild);
				r = Ext.get(y.childNodes[2].firstChild);
				r.enableDisplayMode();
				r.addKeyListener([10, 13], function() {
					if (t.isVisible() && b && b.buttons) {
						if (b.buttons.ok) {
							d("ok")
						} else {
							if (b.buttons.yes) {
								d("yes")
							}
						}
					}
				});
				a = Ext.get(y.childNodes[2].childNodes[1]);
				a.enableDisplayMode();
				m = new Ext.ProgressBar( {
					renderTo : h
				});
				h.createChild( {
					cls : "x-clear"
				})
			}
			return t
		},
		updateText : function(A) {
			if (!t.isVisible() && !b.width) {
				t.setSize(this.maxWidth, 100)
			}
			l.update(A || "&#160;");
			var y = c != "" ? (i.getWidth() + i.getMargins("lr")) : 0;
			var C = l.getWidth() + l.getMargins("lr");
			var z = t.getFrameWidth("lr");
			var B = t.body.getFrameWidth("lr");
			if (Ext.isIE && y > 0) {
				y += 3
			}
			var x = Math.max(Math.min(b.width || y + C + z + B, this.maxWidth),
					Math.max(b.minWidth || this.minWidth, n || 0));
			if (b.prompt === true) {
				u.setWidth(x - y - z - B)
			}
			if (b.progress === true || b.wait === true) {
				m.setSize(x - y - z - B)
			}
			if (Ext.isIE && x == n) {
				x += 4
			}
			t.setSize(x, "auto").center();
			return this
		},
		updateProgress : function(x, w, y) {
			m.updateProgress(x, w);
			if (y) {
				this.updateText(y)
			}
			return this
		},
		isVisible : function() {
			return t && t.isVisible()
		},
		hide : function() {
			var w = t.activeGhost;
			if (this.isVisible() || w) {
				t.hide();
				v();
				if (w) {
					w.hide()
				}
			}
			return this
		},
		show : function(z) {
			if (this.isVisible()) {
				this.hide()
			}
			b = z;
			var A = this.getDialog(b.title || "&#160;");
			A.setTitle(b.title || "&#160;");
			var w = (b.closable !== false && b.progress !== true && b.wait !== true);
			A.tools.close.setDisplayed(w);
			u = r;
			b.prompt = b.prompt || (b.multiline ? true : false);
			if (b.prompt) {
				if (b.multiline) {
					r.hide();
					a.show();
					a.setHeight(typeof b.multiline == "number"
							? b.multiline
							: this.defaultTextHeight);
					u = a
				} else {
					r.show();
					a.hide()
				}
			} else {
				r.hide();
				a.hide()
			}
			u.dom.value = b.value || "";
			if (b.prompt) {
				A.focusEl = u
			} else {
				var y = b.buttons;
				var x = null;
				if (y && y.ok) {
					x = q.ok
				} else {
					if (y && y.yes) {
						x = q.yes
					}
				}
				if (x) {
					A.focusEl = x
				}
			}
			if (b.iconCls) {
				A.setIconClass(b.iconCls)
			}
			this.setIcon(b.icon);
			n = k(b.buttons);
			m.setVisible(b.progress === true || b.wait === true);
			this.updateProgress(0, b.progressText);
			this.updateText(b.msg);
			if (b.cls) {
				A.el.addClass(b.cls)
			}
			A.proxyDrag = b.proxyDrag === true;
			A.modal = b.modal !== false;
			A.mask = b.modal !== false ? p : false;
			if (!A.isVisible()) {
				document.body.appendChild(t.el.dom);
				A.setAnimateTarget(b.animEl);
				A.show(b.animEl)
			}
			A.on("show", function() {
				if (w === true) {
					A.keyMap.enable()
				} else {
					A.keyMap.disable()
				}
			}, this, {
				single : true
			});
			if (b.wait === true) {
				m.wait(b.waitConfig)
			}
			return this
		},
		setIcon : function(w) {
			if (w && w != "") {
				i.removeClass("x-hidden");
				i.replaceClass(c, w);
				c = w
			} else {
				i.replaceClass(c, "x-hidden");
				c = ""
			}
			return this
		},
		progress : function(y, x, w) {
			this.show( {
				title : y,
				msg : x,
				buttons : false,
				progress : true,
				closable : false,
				minWidth : this.minProgressWidth,
				progressText : w
			});
			return this
		},
		wait : function(y, x, w) {
			this.show( {
				title : x,
				msg : y,
				buttons : false,
				closable : false,
				wait : true,
				modal : true,
				minWidth : this.minProgressWidth,
				waitConfig : w
			});
			return this
		},
		alert : function(z, y, x, w) {
			this.show( {
				title : z,
				msg : y,
				buttons : this.OK,
				fn : x,
				scope : w
			});
			return this
		},
		confirm : function(z, y, x, w) {
			this.show( {
				title : z,
				msg : y,
				buttons : this.YESNO,
				fn : x,
				scope : w,
				icon : this.QUESTION
			});
			return this
		},
		prompt : function(B, A, y, x, w, z) {
			this.show( {
				title : B,
				msg : A,
				buttons : this.OKCANCEL,
				fn : y,
				minWidth : 250,
				scope : x,
				prompt : true,
				multiline : w,
				value : z
			});
			return this
		},
		OK : {
			ok : true
		},
		CANCEL : {
			cancel : true
		},
		OKCANCEL : {
			ok : true,
			cancel : true
		},
		YESNO : {
			yes : true,
			no : true
		},
		YESNOCANCEL : {
			yes : true,
			no : true,
			cancel : true
		},
		INFO : "ext-mb-info",
		WARNING : "ext-mb-warning",
		QUESTION : "ext-mb-question",
		ERROR : "ext-mb-error",
		defaultTextHeight : 75,
		maxWidth : 600,
		minWidth : 100,
		minProgressWidth : 250,
		buttonText : {
			ok : "OK",
			cancel : "Cancel",
			yes : "Yes",
			no : "No"
		}
	}
}();
Ext.Msg = Ext.MessageBox;
Ext.Tip = Ext
		.extend(
				Ext.Panel,
				{
					minWidth : 40,
					maxWidth : 300,
					shadow : "sides",
					defaultAlign : "tl-bl?",
					autoRender : true,
					quickShowInterval : 250,
					frame : true,
					hidden : true,
					baseCls : "x-tip",
					floating : {
						shadow : true,
						shim : true,
						useDisplay : true,
						constrain : false
					},
					autoHeight : true,
					initComponent : function() {
						Ext.Tip.superclass.initComponent.call(this);
						if (this.closable && !this.title) {
							this.elements += ",header"
						}
					},
					afterRender : function() {
						Ext.Tip.superclass.afterRender.call(this);
						if (this.closable) {
							this.addTool( {
								id : "close",
								handler : this.hide,
								scope : this
							})
						}
					},
					showAt : function(a) {
						Ext.Tip.superclass.show.call(this);
						if (this.measureWidth !== false
								&& (!this.initialConfig || typeof this.initialConfig.width != "number")) {
							this.doAutoWidth()
						}
						if (this.constrainPosition) {
							a = this.el.adjustForConstraints(a)
						}
						this.setPagePosition(a[0], a[1])
					},
					doAutoWidth : function() {
						var a = this.body.getTextWidth();
						if (this.title) {
							a = Math.max(a, this.header.child("span")
									.getTextWidth(this.title))
						}
						a += this.getFrameWidth() + (this.closable ? 20 : 0)
								+ this.body.getPadding("lr");
						this
								.setWidth(a.constrain(this.minWidth,
										this.maxWidth));
						if (Ext.isIE7 && !this.repainted) {
							this.el.repaint();
							this.repainted = true
						}
					},
					showBy : function(a, b) {
						if (!this.rendered) {
							this.render(Ext.getBody())
						}
						this.showAt(this.el.getAlignToXY(a, b
								|| this.defaultAlign))
					},
					initDraggable : function() {
						this.dd = new Ext.Tip.DD(this,
								typeof this.draggable == "boolean"
										? null
										: this.draggable);
						this.header.addClass("x-tip-draggable")
					}
				});
Ext.Tip.DD = function(b, a) {
	Ext.apply(this, a);
	this.tip = b;
	Ext.Tip.DD.superclass.constructor.call(this, b.el.id, "WindowDD-" + b.id);
	this.setHandleElId(b.header.id);
	this.scroll = false
};
Ext.extend(Ext.Tip.DD, Ext.dd.DD, {
	moveOnly : true,
	scroll : false,
	headerOffsets : [100, 25],
	startDrag : function() {
		this.tip.el.disableShadow()
	},
	endDrag : function(a) {
		this.tip.el.enableShadow(true)
	}
});
Ext.ToolTip = Ext.extend(Ext.Tip, {
	showDelay : 500,
	hideDelay : 200,
	dismissDelay : 5000,
	mouseOffset : [15, 18],
	trackMouse : false,
	constrainPosition : true,
	initComponent : function() {
		Ext.ToolTip.superclass.initComponent.call(this);
		this.lastActive = new Date();
		this.initTarget()
	},
	initTarget : function() {
		if (this.target) {
			this.target = Ext.get(this.target);
			this.target.on("mouseover", this.onTargetOver, this);
			this.target.on("mouseout", this.onTargetOut, this);
			this.target.on("mousemove", this.onMouseMove, this)
		}
	},
	onMouseMove : function(a) {
		this.targetXY = a.getXY();
		if (!this.hidden && this.trackMouse) {
			this.setPagePosition(this.getTargetXY())
		}
	},
	getTargetXY : function() {
		return [this.targetXY[0] + this.mouseOffset[0],
				this.targetXY[1] + this.mouseOffset[1]]
	},
	onTargetOver : function(a) {
		if (this.disabled || a.within(this.target.dom, true)) {
			return
		}
		this.clearTimer("hide");
		this.targetXY = a.getXY();
		this.delayShow()
	},
	delayShow : function() {
		if (this.hidden && !this.showTimer) {
			if (this.lastActive.getElapsed() < this.quickShowInterval) {
				this.show()
			} else {
				this.showTimer = this.show.defer(this.showDelay, this)
			}
		} else {
			if (!this.hidden && this.autoHide !== false) {
				this.show()
			}
		}
	},
	onTargetOut : function(a) {
		if (this.disabled || a.within(this.target.dom, true)) {
			return
		}
		this.clearTimer("show");
		if (this.autoHide !== false) {
			this.delayHide()
		}
	},
	delayHide : function() {
		if (!this.hidden && !this.hideTimer) {
			this.hideTimer = this.hide.defer(this.hideDelay, this)
		}
	},
	hide : function() {
		this.clearTimer("dismiss");
		this.lastActive = new Date();
		Ext.ToolTip.superclass.hide.call(this)
	},
	show : function() {
		this.showAt(this.getTargetXY())
	},
	showAt : function(a) {
		this.lastActive = new Date();
		this.clearTimers();
		Ext.ToolTip.superclass.showAt.call(this, a);
		if (this.dismissDelay && this.autoHide !== false) {
			this.dismissTimer = this.hide.defer(this.dismissDelay, this)
		}
	},
	clearTimer : function(a) {
		a = a + "Timer";
		clearTimeout(this[a]);
		delete this[a]
	},
	clearTimers : function() {
		this.clearTimer("show");
		this.clearTimer("dismiss");
		this.clearTimer("hide")
	},
	onShow : function() {
		Ext.ToolTip.superclass.onShow.call(this);
		Ext.getDoc().on("mousedown", this.onDocMouseDown, this)
	},
	onHide : function() {
		Ext.ToolTip.superclass.onHide.call(this);
		Ext.getDoc().un("mousedown", this.onDocMouseDown, this)
	},
	onDocMouseDown : function(a) {
		if (this.autoHide !== false && !a.within(this.el.dom)) {
			this.disable();
			this.enable.defer(100, this)
		}
	},
	onDisable : function() {
		this.clearTimers();
		this.hide()
	},
	adjustPosition : function(a, d) {
		var c = this.targetXY[1], b = this.getSize().height;
		if (this.constrainPosition && d <= c && (d + b) >= c) {
			d = c - b - 5
		}
		return {
			x : a,
			y : d
		}
	},
	onDestroy : function() {
		Ext.ToolTip.superclass.onDestroy.call(this);
		if (this.target) {
			this.target.un("mouseover", this.onTargetOver, this);
			this.target.un("mouseout", this.onTargetOut, this);
			this.target.un("mousemove", this.onMouseMove, this)
		}
	}
});
Ext.QuickTip = Ext.extend(Ext.ToolTip, {
	interceptTitles : false,
	tagConfig : {
		namespace : "ext",
		attribute : "qtip",
		width : "qwidth",
		target : "target",
		title : "qtitle",
		hide : "hide",
		cls : "qclass",
		align : "qalign"
	},
	initComponent : function() {
		this.target = this.target || Ext.getDoc();
		this.targets = this.targets || {};
		Ext.QuickTip.superclass.initComponent.call(this)
	},
	register : function(e) {
		var h = Ext.isArray(e) ? e : arguments;
		for (var g = 0, a = h.length;g < a; g++) {
			var l = h[g];
			var k = l.target;
			if (k) {
				if (Ext.isArray(k)) {
					for (var d = 0, b = k.length;d < b; d++) {
						this.targets[Ext.id(k[d])] = l
					}
				} else {
					this.targets[Ext.id(k)] = l
				}
			}
		}
	},
	unregister : function(a) {
		delete this.targets[Ext.id(a)]
	},
	onTargetOver : function(i) {
		if (this.disabled) {
			return
		}
		this.targetXY = i.getXY();
		var c = i.getTarget();
		if (!c || c.nodeType !== 1 || c == document || c == document.body) {
			return
		}
		if (this.activeTarget && c == this.activeTarget.el) {
			this.clearTimer("hide");
			this.show();
			return
		}
		if (c && this.targets[c.id]) {
			this.activeTarget = this.targets[c.id];
			this.activeTarget.el = c;
			this.delayShow();
			return
		}
		var g, h = Ext.fly(c), b = this.tagConfig;
		var d = b.namespace;
		if (this.interceptTitles && c.title) {
			g = c.title;
			c.qtip = g;
			c.removeAttribute("title");
			i.preventDefault()
		} else {
			g = c.qtip || h.getAttributeNS(d, b.attribute)
		}
		if (g) {
			var a = h.getAttributeNS(d, b.hide);
			this.activeTarget = {
				el : c,
				text : g,
				width : h.getAttributeNS(d, b.width),
				autoHide : a != "user" && a !== "false",
				title : h.getAttributeNS(d, b.title),
				cls : h.getAttributeNS(d, b.cls),
				align : h.getAttributeNS(d, b.align)
			};
			this.delayShow()
		}
	},
	onTargetOut : function(a) {
		this.clearTimer("show");
		if (this.autoHide !== false) {
			this.delayHide()
		}
	},
	showAt : function(b) {
		var a = this.activeTarget;
		if (a) {
			if (!this.rendered) {
				this.render(Ext.getBody());
				this.activeTarget = a
			}
			if (a.width) {
				this.setWidth(a.width);
				this.body.setWidth(this.adjustBodyWidth(a.width
						- this.getFrameWidth()));
				this.measureWidth = false
			} else {
				this.measureWidth = true
			}
			this.setTitle(a.title || "");
			this.body.update(a.text);
			this.autoHide = a.autoHide;
			this.dismissDelay = a.dismissDelay || this.dismissDelay;
			if (this.lastCls) {
				this.el.removeClass(this.lastCls);
				delete this.lastCls
			}
			if (a.cls) {
				this.el.addClass(a.cls);
				this.lastCls = a.cls
			}
			if (a.align) {
				b = this.el.getAlignToXY(a.el, a.align);
				this.constrainPosition = false
			} else {
				this.constrainPosition = true
			}
		}
		Ext.QuickTip.superclass.showAt.call(this, b)
	},
	hide : function() {
		delete this.activeTarget;
		Ext.QuickTip.superclass.hide.call(this)
	}
});
Ext.QuickTips = function() {
	var b, a = [];
	return {
		init : function(c) {
			if (!b) {
				if (!Ext.isReady) {
					Ext.onReady(function() {
						Ext.QuickTips.init(c)
					});
					return
				}
				b = new Ext.QuickTip( {
					elements : "header,body"
				});
				if (c !== false) {
					b.render(Ext.getBody())
				}
			}
		},
		enable : function() {
			if (b) {
				a.pop();
				if (a.length < 1) {
					b.enable()
				}
			}
		},
		disable : function() {
			if (b) {
				b.disable()
			}
			a.push(1)
		},
		isEnabled : function() {
			return b !== undefined && !b.disabled
		},
		getQuickTip : function() {
			return b
		},
		register : function() {
			b.register.apply(b, arguments)
		},
		unregister : function() {
			b.unregister.apply(b, arguments)
		},
		tips : function() {
			b.register.apply(b, arguments)
		}
	}
}();
Ext.tree.TreePanel = Ext.extend(Ext.Panel, {
	rootVisible : true,
	animate : Ext.enableFx,
	lines : true,
	enableDD : false,
	hlDrop : Ext.enableFx,
	pathSeparator : "/",
	initComponent : function() {
		Ext.tree.TreePanel.superclass.initComponent.call(this);
		if (!this.eventModel) {
			this.eventModel = new Ext.tree.TreeEventModel(this)
		}
		var a = this.loader;
		if (!a) {
			a = new Ext.tree.TreeLoader( {
				dataUrl : this.dataUrl
			})
		} else {
			if (typeof a == "object" && !a.load) {
				a = new Ext.tree.TreeLoader(a)
			}
		}
		this.loader = a;
		this.nodeHash = {};
		if (this.root) {
			this.setRootNode(this.root)
		}
		this.addEvents("append", "remove", "movenode", "insert",
				"beforeappend", "beforeremove", "beforemovenode",
				"beforeinsert", "beforeload", "load", "textchange",
				"beforeexpandnode", "beforecollapsenode", "expandnode",
				"disabledchange", "collapsenode", "beforeclick", "click",
				"checkchange", "dblclick", "contextmenu",
				"beforechildrenrendered", "startdrag", "enddrag", "dragdrop",
				"beforenodedrop", "nodedrop", "nodedragover");
		if (this.singleExpand) {
			this.on("beforeexpandnode", this.restrictExpand, this)
		}
	},
	proxyNodeEvent : function(c, b, a, h, g, e, d) {
		if (c == "collapse" || c == "expand" || c == "beforecollapse"
				|| c == "beforeexpand" || c == "move" || c == "beforemove") {
			c = c + "node"
		}
		return this.fireEvent(c, b, a, h, g, e, d)
	},
	getRootNode : function() {
		return this.root
	},
	setRootNode : function(b) {
		if (!b.render) {
			b = this.loader.createNode(b)
		}
		this.root = b;
		b.ownerTree = this;
		b.isRoot = true;
		this.registerNode(b);
		if (!this.rootVisible) {
			var a = b.attributes.uiProvider;
			b.ui = a ? new a(b) : new Ext.tree.RootTreeNodeUI(b)
		}
		return b
	},
	getNodeById : function(a) {
		return this.nodeHash[a]
	},
	registerNode : function(a) {
		this.nodeHash[a.id] = a
	},
	unregisterNode : function(a) {
		delete this.nodeHash[a.id]
	},
	toString : function() {
		return "[Tree" + (this.id ? " " + this.id : "") + "]"
	},
	restrictExpand : function(a) {
		var b = a.parentNode;
		if (b) {
			if (b.expandedChild && b.expandedChild.parentNode == b) {
				b.expandedChild.collapse()
			}
			b.expandedChild = a
		}
	},
	getChecked : function(b, c) {
		c = c || this.root;
		var d = [];
		var e = function() {
			if (this.attributes.checked) {
				d.push(!b ? this : (b == "id" ? this.id : this.attributes[b]))
			}
		};
		c.cascade(e);
		return d
	},
	getEl : function() {
		return this.el
	},
	getLoader : function() {
		return this.loader
	},
	expandAll : function() {
		this.root.expand(true)
	},
	collapseAll : function() {
		this.root.collapse(true)
	},
	getSelectionModel : function() {
		if (!this.selModel) {
			this.selModel = new Ext.tree.DefaultSelectionModel()
		}
		return this.selModel
	},
	expandPath : function(g, a, h) {
		a = a || "id";
		var d = g.split(this.pathSeparator);
		var c = this.root;
		if (c.attributes[a] != d[1]) {
			if (h) {
				h(false, null)
			}
			return
		}
		var b = 1;
		var e = function() {
			if (++b == d.length) {
				if (h) {
					h(true, c)
				}
				return
			}
			var i = c.findChild(a, d[b]);
			if (!i) {
				if (h) {
					h(false, c)
				}
				return
			}
			c = i;
			i.expand(false, false, e)
		};
		c.expand(false, false, e)
	},
	selectPath : function(e, a, g) {
		a = a || "id";
		var c = e.split(this.pathSeparator);
		var b = c.pop();
		if (c.length > 0) {
			var d = function(i, h) {
				if (i && h) {
					var k = h.findChild(a, b);
					if (k) {
						k.select();
						if (g) {
							g(true, k)
						}
					} else {
						if (g) {
							g(false, k)
						}
					}
				} else {
					if (g) {
						g(false, k)
					}
				}
			};
			this.expandPath(c.join(this.pathSeparator), a, d)
		} else {
			this.root.select();
			if (g) {
				g(true, this.root)
			}
		}
	},
	getTreeEl : function() {
		return this.body
	},
	onRender : function(b, a) {
		Ext.tree.TreePanel.superclass.onRender.call(this, b, a);
		this.el.addClass("x-tree");
		this.innerCt = this.body.createChild( {
			tag : "ul",
			cls : "x-tree-root-ct "
					+ (this.useArrows ? "x-tree-arrows" : this.lines
							? "x-tree-lines"
							: "x-tree-no-lines")
		})
	},
	initEvents : function() {
		Ext.tree.TreePanel.superclass.initEvents.call(this);
		if (this.containerScroll) {
			Ext.dd.ScrollManager.register(this.body)
		}
		if ((this.enableDD || this.enableDrop) && !this.dropZone) {
			this.dropZone = new Ext.tree.TreeDropZone(this, this.dropConfig
					|| {
						ddGroup : this.ddGroup || "TreeDD",
						appendOnly : this.ddAppendOnly === true
					})
		}
		if ((this.enableDD || this.enableDrag) && !this.dragZone) {
			this.dragZone = new Ext.tree.TreeDragZone(this, this.dragConfig
					|| {
						ddGroup : this.ddGroup || "TreeDD",
						scroll : this.ddScroll
					})
		}
		this.getSelectionModel().init(this)
	},
	afterRender : function() {
		Ext.tree.TreePanel.superclass.afterRender.call(this);
		this.root.render();
		if (!this.rootVisible) {
			this.root.renderChildren()
		}
	},
	onDestroy : function() {
		if (this.rendered) {
			this.body.removeAllListeners();
			Ext.dd.ScrollManager.unregister(this.body);
			if (this.dropZone) {
				this.dropZone.unreg()
			}
			if (this.dragZone) {
				this.dragZone.unreg()
			}
		}
		this.root.destroy();
		this.nodeHash = null;
		Ext.tree.TreePanel.superclass.onDestroy.call(this)
	}
});
Ext.tree.TreePanel.nodeTypes = {};
Ext.reg("treepanel", Ext.tree.TreePanel);
Ext.tree.TreeEventModel = function(a) {
	this.tree = a;
	this.tree.on("render", this.initEvents, this)
};
Ext.tree.TreeEventModel.prototype = {
	initEvents : function() {
		var a = this.tree.getTreeEl();
		a.on("click", this.delegateClick, this);
		if (this.tree.trackMouseOver !== false) {
			a.on("mouseover", this.delegateOver, this);
			a.on("mouseout", this.delegateOut, this)
		}
		a.on("dblclick", this.delegateDblClick, this);
		a.on("contextmenu", this.delegateContextMenu, this)
	},
	getNode : function(b) {
		var a;
		if (a = b.getTarget(".x-tree-node-el", 10)) {
			var c = Ext.fly(a, "_treeEvents").getAttributeNS("ext",
					"tree-node-id");
			if (c) {
				return this.tree.getNodeById(c)
			}
		}
		return null
	},
	getNodeTarget : function(b) {
		var a = b.getTarget(".x-tree-node-icon", 1);
		if (!a) {
			a = b.getTarget(".x-tree-node-el", 6)
		}
		return a
	},
	delegateOut : function(b, a) {
		if (!this.beforeEvent(b)) {
			return
		}
		if (b.getTarget(".x-tree-ec-icon", 1)) {
			var c = this.getNode(b);
			this.onIconOut(b, c);
			if (c == this.lastEcOver) {
				delete this.lastEcOver
			}
		}
		if ((a = this.getNodeTarget(b)) && !b.within(a, true)) {
			this.onNodeOut(b, this.getNode(b))
		}
	},
	delegateOver : function(b, a) {
		if (!this.beforeEvent(b)) {
			return
		}
		if (this.lastEcOver) {
			this.onIconOut(b, this.lastEcOver);
			delete this.lastEcOver
		}
		if (b.getTarget(".x-tree-ec-icon", 1)) {
			this.lastEcOver = this.getNode(b);
			this.onIconOver(b, this.lastEcOver)
		}
		if (a = this.getNodeTarget(b)) {
			this.onNodeOver(b, this.getNode(b))
		}
	},
	delegateClick : function(b, a) {
		if (!this.beforeEvent(b)) {
			return
		}
		if (b.getTarget("input[type=checkbox]", 1)) {
			this.onCheckboxClick(b, this.getNode(b))
		} else {
			if (b.getTarget(".x-tree-ec-icon", 1)) {
				this.onIconClick(b, this.getNode(b))
			} else {
				if (this.getNodeTarget(b)) {
					this.onNodeClick(b, this.getNode(b))
				}
			}
		}
	},
	delegateDblClick : function(b, a) {
		if (this.beforeEvent(b) && this.getNodeTarget(b)) {
			this.onNodeDblClick(b, this.getNode(b))
		}
	},
	delegateContextMenu : function(b, a) {
		if (this.beforeEvent(b) && this.getNodeTarget(b)) {
			this.onNodeContextMenu(b, this.getNode(b))
		}
	},
	onNodeClick : function(b, a) {
		a.ui.onClick(b)
	},
	onNodeOver : function(b, a) {
		a.ui.onOver(b)
	},
	onNodeOut : function(b, a) {
		a.ui.onOut(b)
	},
	onIconOver : function(b, a) {
		a.ui.addClass("x-tree-ec-over")
	},
	onIconOut : function(b, a) {
		a.ui.removeClass("x-tree-ec-over")
	},
	onIconClick : function(b, a) {
		a.ui.ecClick(b)
	},
	onCheckboxClick : function(b, a) {
		a.ui.onCheckChange(b)
	},
	onNodeDblClick : function(b, a) {
		a.ui.onDblClick(b)
	},
	onNodeContextMenu : function(b, a) {
		a.ui.onContextMenu(b)
	},
	beforeEvent : function(a) {
		if (this.disabled) {
			a.stopEvent();
			return false
		}
		return true
	},
	disable : function() {
		this.disabled = true
	},
	enable : function() {
		this.disabled = false
	}
};
Ext.tree.DefaultSelectionModel = function(a) {
	this.selNode = null;
	this.addEvents("selectionchange", "beforeselect");
	Ext.apply(this, a);
	Ext.tree.DefaultSelectionModel.superclass.constructor.call(this)
};
Ext
		.extend(
				Ext.tree.DefaultSelectionModel,
				Ext.util.Observable,
				{
					init : function(a) {
						this.tree = a;
						a.getTreeEl().on("keydown", this.onKeyDown, this);
						a.on("click", this.onNodeClick, this)
					},
					onNodeClick : function(a, b) {
						this.select(a)
					},
					select : function(b) {
						var a = this.selNode;
						if (a != b
								&& this.fireEvent("beforeselect", this, b, a) !== false) {
							if (a) {
								a.ui.onSelectedChange(false)
							}
							this.selNode = b;
							b.ui.onSelectedChange(true);
							this.fireEvent("selectionchange", this, b, a)
						}
						return b
					},
					unselect : function(a) {
						if (this.selNode == a) {
							this.clearSelections()
						}
					},
					clearSelections : function() {
						var a = this.selNode;
						if (a) {
							a.ui.onSelectedChange(false);
							this.selNode = null;
							this.fireEvent("selectionchange", this, null)
						}
						return a
					},
					getSelectedNode : function() {
						return this.selNode
					},
					isSelected : function(a) {
						return this.selNode == a
					},
					selectPrevious : function() {
						var a = this.selNode || this.lastSelNode;
						if (!a) {
							return null
						}
						var c = a.previousSibling;
						if (c) {
							if (!c.isExpanded() || c.childNodes.length < 1) {
								return this.select(c)
							} else {
								var b = c.lastChild;
								while (b && b.isExpanded()
										&& b.childNodes.length > 0) {
									b = b.lastChild
								}
								return this.select(b)
							}
						} else {
							if (a.parentNode
									&& (this.tree.rootVisible || !a.parentNode.isRoot)) {
								return this.select(a.parentNode)
							}
						}
						return null
					},
					selectNext : function() {
						var b = this.selNode || this.lastSelNode;
						if (!b) {
							return null
						}
						if (b.firstChild && b.isExpanded()) {
							return this.select(b.firstChild)
						} else {
							if (b.nextSibling) {
								return this.select(b.nextSibling)
							} else {
								if (b.parentNode) {
									var a = null;
									b.parentNode.bubble(function() {
										if (this.nextSibling) {
											a = this.getOwnerTree().selModel
													.select(this.nextSibling);
											return false
										}
									});
									return a
								}
							}
						}
						return null
					},
					onKeyDown : function(c) {
						var b = this.selNode || this.lastSelNode;
						var d = this;
						if (!b) {
							return
						}
						var a = c.getKey();
						switch (a) {
							case c.DOWN :
								c.stopEvent();
								this.selectNext();
								break;
							case c.UP :
								c.stopEvent();
								this.selectPrevious();
								break;
							case c.RIGHT :
								c.preventDefault();
								if (b.hasChildNodes()) {
									if (!b.isExpanded()) {
										b.expand()
									} else {
										if (b.firstChild) {
											this.select(b.firstChild, c)
										}
									}
								}
								break;
							case c.LEFT :
								c.preventDefault();
								if (b.hasChildNodes() && b.isExpanded()) {
									b.collapse()
								} else {
									if (b.parentNode
											&& (this.tree.rootVisible || b.parentNode != this.tree
													.getRootNode())) {
										this.select(b.parentNode, c)
									}
								}
								break
						}
					}
				});
Ext.tree.MultiSelectionModel = function(a) {
	this.selNodes = [];
	this.selMap = {};
	this.addEvents("selectionchange");
	Ext.apply(this, a);
	Ext.tree.MultiSelectionModel.superclass.constructor.call(this)
};
Ext.extend(Ext.tree.MultiSelectionModel, Ext.util.Observable, {
	init : function(a) {
		this.tree = a;
		a.getTreeEl().on("keydown", this.onKeyDown, this);
		a.on("click", this.onNodeClick, this)
	},
	onNodeClick : function(a, b) {
		this.select(a, b, b.ctrlKey)
	},
	select : function(a, c, b) {
		if (b !== true) {
			this.clearSelections(true)
		}
		if (this.isSelected(a)) {
			this.lastSelNode = a;
			return a
		}
		this.selNodes.push(a);
		this.selMap[a.id] = a;
		this.lastSelNode = a;
		a.ui.onSelectedChange(true);
		this.fireEvent("selectionchange", this, this.selNodes);
		return a
	},
	unselect : function(b) {
		if (this.selMap[b.id]) {
			b.ui.onSelectedChange(false);
			var c = this.selNodes;
			var a = c.indexOf(b);
			if (a != -1) {
				this.selNodes.splice(a, 1)
			}
			delete this.selMap[b.id];
			this.fireEvent("selectionchange", this, this.selNodes)
		}
	},
	clearSelections : function(b) {
		var d = this.selNodes;
		if (d.length > 0) {
			for (var c = 0, a = d.length;c < a; c++) {
				d[c].ui.onSelectedChange(false)
			}
			this.selNodes = [];
			this.selMap = {};
			if (b !== true) {
				this.fireEvent("selectionchange", this, this.selNodes)
			}
		}
	},
	isSelected : function(a) {
		return this.selMap[a.id] ? true : false
	},
	getSelectedNodes : function() {
		return this.selNodes
	},
	onKeyDown : Ext.tree.DefaultSelectionModel.prototype.onKeyDown,
	selectNext : Ext.tree.DefaultSelectionModel.prototype.selectNext,
	selectPrevious : Ext.tree.DefaultSelectionModel.prototype.selectPrevious
});
Ext.tree.TreeNode = function(a) {
	a = a || {};
	if (typeof a == "string") {
		a = {
			text : a
		}
	}
	this.childrenRendered = false;
	this.rendered = false;
	Ext.tree.TreeNode.superclass.constructor.call(this, a);
	this.expanded = a.expanded === true;
	this.isTarget = a.isTarget !== false;
	this.draggable = a.draggable !== false && a.allowDrag !== false;
	this.allowChildren = a.allowChildren !== false && a.allowDrop !== false;
	this.text = a.text;
	this.disabled = a.disabled === true;
	this.addEvents("textchange", "beforeexpand", "beforecollapse", "expand",
			"disabledchange", "collapse", "beforeclick", "click",
			"checkchange", "dblclick", "contextmenu", "beforechildrenrendered");
	var b = this.attributes.uiProvider || this.defaultUI || Ext.tree.TreeNodeUI;
	this.ui = new b(this)
};
Ext.extend(Ext.tree.TreeNode, Ext.data.Node, {
	preventHScroll : true,
	isExpanded : function() {
		return this.expanded
	},
	getUI : function() {
		return this.ui
	},
	getLoader : function() {
		var a;
		return this.loader
				|| ((a = this.getOwnerTree()) && a.loader
						? a.loader
						: new Ext.tree.TreeLoader())
	},
	setFirstChild : function(a) {
		var b = this.firstChild;
		Ext.tree.TreeNode.superclass.setFirstChild.call(this, a);
		if (this.childrenRendered && b && a != b) {
			b.renderIndent(true, true)
		}
		if (this.rendered) {
			this.renderIndent(true, true)
		}
	},
	setLastChild : function(b) {
		var a = this.lastChild;
		Ext.tree.TreeNode.superclass.setLastChild.call(this, b);
		if (this.childrenRendered && a && b != a) {
			a.renderIndent(true, true)
		}
		if (this.rendered) {
			this.renderIndent(true, true)
		}
	},
	appendChild : function(b) {
		if (!b.render && !Ext.isArray(b)) {
			b = this.getLoader().createNode(b)
		}
		var a = Ext.tree.TreeNode.superclass.appendChild.call(this, b);
		if (a && this.childrenRendered) {
			a.render()
		}
		this.ui.updateExpandIcon();
		return a
	},
	removeChild : function(a) {
		this.ownerTree.getSelectionModel().unselect(a);
		Ext.tree.TreeNode.superclass.removeChild.apply(this, arguments);
		if (this.childrenRendered) {
			a.ui.remove()
		}
		if (this.childNodes.length < 1) {
			this.collapse(false, false)
		} else {
			this.ui.updateExpandIcon()
		}
		if (!this.firstChild && !this.isHiddenRoot()) {
			this.childrenRendered = false
		}
		return a
	},
	insertBefore : function(c, a) {
		if (!c.render) {
			c = this.getLoader().createNode(c)
		}
		var b = Ext.tree.TreeNode.superclass.insertBefore
				.apply(this, arguments);
		if (b && a && this.childrenRendered) {
			c.render()
		}
		this.ui.updateExpandIcon();
		return b
	},
	setText : function(b) {
		var a = this.text;
		this.text = b;
		this.attributes.text = b;
		if (this.rendered) {
			this.ui.onTextChange(this, b, a)
		}
		this.fireEvent("textchange", this, b, a)
	},
	select : function() {
		this.getOwnerTree().getSelectionModel().select(this)
	},
	unselect : function() {
		this.getOwnerTree().getSelectionModel().unselect(this)
	},
	isSelected : function() {
		return this.getOwnerTree().getSelectionModel().isSelected(this)
	},
	expand : function(a, b, c) {
		if (!this.expanded) {
			if (this.fireEvent("beforeexpand", this, a, b) === false) {
				return
			}
			if (!this.childrenRendered) {
				this.renderChildren()
			}
			this.expanded = true;
			if (!this.isHiddenRoot()
					&& (this.getOwnerTree().animate && b !== false) || b) {
				this.ui.animExpand(function() {
					this.fireEvent("expand", this);
					if (typeof c == "function") {
						c(this)
					}
					if (a === true) {
						this.expandChildNodes(true)
					}
				}.createDelegate(this));
				return
			} else {
				this.ui.expand();
				this.fireEvent("expand", this);
				if (typeof c == "function") {
					c(this)
				}
			}
		} else {
			if (typeof c == "function") {
				c(this)
			}
		}
		if (a === true) {
			this.expandChildNodes(true)
		}
	},
	isHiddenRoot : function() {
		return this.isRoot && !this.getOwnerTree().rootVisible
	},
	collapse : function(b, e) {
		if (this.expanded && !this.isHiddenRoot()) {
			if (this.fireEvent("beforecollapse", this, b, e) === false) {
				return
			}
			this.expanded = false;
			if ((this.getOwnerTree().animate && e !== false) || e) {
				this.ui.animCollapse(function() {
					this.fireEvent("collapse", this);
					if (b === true) {
						this.collapseChildNodes(true)
					}
				}.createDelegate(this));
				return
			} else {
				this.ui.collapse();
				this.fireEvent("collapse", this)
			}
		}
		if (b === true) {
			var d = this.childNodes;
			for (var c = 0, a = d.length;c < a; c++) {
				d[c].collapse(true, false)
			}
		}
	},
	delayedExpand : function(a) {
		if (!this.expandProcId) {
			this.expandProcId = this.expand.defer(a, this)
		}
	},
	cancelExpand : function() {
		if (this.expandProcId) {
			clearTimeout(this.expandProcId)
		}
		this.expandProcId = false
	},
	toggle : function() {
		if (this.expanded) {
			this.collapse()
		} else {
			this.expand()
		}
	},
	ensureVisible : function(b) {
		var a = this.getOwnerTree();
		a.expandPath(this.parentNode ? this.parentNode.getPath() : this
				.getPath(), false, function() {
			var c = a.getNodeById(this.id);
			a.getTreeEl().scrollChildIntoView(c.ui.anchor);
			Ext.callback(b)
		}.createDelegate(this))
	},
	expandChildNodes : function(b) {
		var d = this.childNodes;
		for (var c = 0, a = d.length;c < a; c++) {
			d[c].expand(b)
		}
	},
	collapseChildNodes : function(b) {
		var d = this.childNodes;
		for (var c = 0, a = d.length;c < a; c++) {
			d[c].collapse(b)
		}
	},
	disable : function() {
		this.disabled = true;
		this.unselect();
		if (this.rendered && this.ui.onDisableChange) {
			this.ui.onDisableChange(this, true)
		}
		this.fireEvent("disabledchange", this, true)
	},
	enable : function() {
		this.disabled = false;
		if (this.rendered && this.ui.onDisableChange) {
			this.ui.onDisableChange(this, false)
		}
		this.fireEvent("disabledchange", this, false)
	},
	renderChildren : function(b) {
		if (b !== false) {
			this.fireEvent("beforechildrenrendered", this)
		}
		var d = this.childNodes;
		for (var c = 0, a = d.length;c < a; c++) {
			d[c].render(true)
		}
		this.childrenRendered = true
	},
	sort : function(e, d) {
		Ext.tree.TreeNode.superclass.sort.apply(this, arguments);
		if (this.childrenRendered) {
			var c = this.childNodes;
			for (var b = 0, a = c.length;b < a; b++) {
				c[b].render(true)
			}
		}
	},
	render : function(a) {
		this.ui.render(a);
		if (!this.rendered) {
			this.getOwnerTree().registerNode(this);
			this.rendered = true;
			if (this.expanded) {
				this.expanded = false;
				this.expand(false, false)
			}
		}
	},
	renderIndent : function(b, e) {
		if (e) {
			this.ui.childIndent = null
		}
		this.ui.renderIndent();
		if (b === true && this.childrenRendered) {
			var d = this.childNodes;
			for (var c = 0, a = d.length;c < a; c++) {
				d[c].renderIndent(true, e)
			}
		}
	},
	beginUpdate : function() {
		this.childrenRendered = false
	},
	endUpdate : function() {
		if (this.expanded && this.rendered) {
			this.renderChildren()
		}
	},
	destroy : function() {
		if (this.childNodes) {
			for (var b = 0, a = this.childNodes.length;b < a; b++) {
				this.childNodes[b].destroy()
			}
			this.childNodes = null
		}
		if (this.ui.destroy) {
			this.ui.destroy()
		}
	}
});
Ext.tree.TreePanel.nodeTypes.node = Ext.tree.TreeNode;
Ext.tree.AsyncTreeNode = function(a) {
	this.loaded = a && a.loaded === true;
	this.loading = false;
	Ext.tree.AsyncTreeNode.superclass.constructor.apply(this, arguments);
	this.addEvents("beforeload", "load")
};
Ext.extend(Ext.tree.AsyncTreeNode, Ext.tree.TreeNode,
		{
			expand : function(b, d, g) {
				if (this.loading) {
					var e;
					var c = function() {
						if (!this.loading) {
							clearInterval(e);
							this.expand(b, d, g)
						}
					}.createDelegate(this);
					e = setInterval(c, 200);
					return
				}
				if (!this.loaded) {
					if (this.fireEvent("beforeload", this) === false) {
						return
					}
					this.loading = true;
					this.ui.beforeLoad(this);
					var a = this.loader || this.attributes.loader
							|| this.getOwnerTree().getLoader();
					if (a) {
						a.load(this, this.loadComplete.createDelegate(this, [b,
								d, g]));
						return
					}
				}
				Ext.tree.AsyncTreeNode.superclass.expand.call(this, b, d, g)
			},
			isLoading : function() {
				return this.loading
			},
			loadComplete : function(a, b, c) {
				this.loading = false;
				this.loaded = true;
				this.ui.afterLoad(this);
				this.fireEvent("load", this);
				this.expand(a, b, c)
			},
			isLoaded : function() {
				return this.loaded
			},
			hasChildNodes : function() {
				if (!this.isLeaf() && !this.loaded) {
					return true
				} else {
					return Ext.tree.AsyncTreeNode.superclass.hasChildNodes
							.call(this)
				}
			},
			reload : function(a) {
				this.collapse(false, false);
				while (this.firstChild) {
					this.removeChild(this.firstChild).destroy()
				}
				this.childrenRendered = false;
				this.loaded = false;
				if (this.isHiddenRoot()) {
					this.expanded = false
				}
				this.expand(false, false, a)
			}
		});
Ext.tree.TreePanel.nodeTypes.async = Ext.tree.AsyncTreeNode;
Ext.tree.TreeNodeUI = function(a) {
	this.node = a;
	this.rendered = false;
	this.animating = false;
	this.wasLeaf = true;
	this.ecc = "x-tree-ec-icon x-tree-elbow";
	this.emptyIcon = Ext.BLANK_IMAGE_URL
};
Ext.tree.TreeNodeUI.prototype = {
	removeChild : function(a) {
		if (this.rendered) {
			this.ctNode.removeChild(a.ui.getEl())
		}
	},
	beforeLoad : function() {
		this.addClass("x-tree-node-loading")
	},
	afterLoad : function() {
		this.removeClass("x-tree-node-loading")
	},
	onTextChange : function(b, c, a) {
		if (this.rendered) {
			this.textNode.innerHTML = c
		}
	},
	onDisableChange : function(a, b) {
		this.disabled = b;
		if (this.checkbox) {
			this.checkbox.disabled = b
		}
		if (b) {
			this.addClass("x-tree-node-disabled")
		} else {
			this.removeClass("x-tree-node-disabled")
		}
	},
	onSelectedChange : function(a) {
		if (a) {
			this.focus();
			this.addClass("x-tree-selected")
		} else {
			this.removeClass("x-tree-selected")
		}
	},
	onMove : function(a, h, e, g, d, b) {
		this.childIndent = null;
		if (this.rendered) {
			var i = g.ui.getContainer();
			if (!i) {
				this.holder = document.createElement("div");
				this.holder.appendChild(this.wrap);
				return
			}
			var c = b ? b.ui.getEl() : null;
			if (c) {
				i.insertBefore(this.wrap, c)
			} else {
				i.appendChild(this.wrap)
			}
			this.node.renderIndent(true)
		}
	},
	addClass : function(a) {
		if (this.elNode) {
			Ext.fly(this.elNode).addClass(a)
		}
	},
	removeClass : function(a) {
		if (this.elNode) {
			Ext.fly(this.elNode).removeClass(a)
		}
	},
	remove : function() {
		if (this.rendered) {
			this.holder = document.createElement("div");
			this.holder.appendChild(this.wrap)
		}
	},
	fireEvent : function() {
		return this.node.fireEvent.apply(this.node, arguments)
	},
	initEvents : function() {
		this.node.on("move", this.onMove, this);
		if (this.node.disabled) {
			this.addClass("x-tree-node-disabled");
			if (this.checkbox) {
				this.checkbox.disabled = true
			}
		}
		if (this.node.hidden) {
			this.hide()
		}
		var b = this.node.getOwnerTree();
		var a = b.enableDD || b.enableDrag || b.enableDrop;
		if (a && (!this.node.isRoot || b.rootVisible)) {
			Ext.dd.Registry.register(this.elNode, {
				node : this.node,
				handles : this.getDDHandles(),
				isHandle : false
			})
		}
	},
	getDDHandles : function() {
		return [this.iconNode, this.textNode, this.elNode]
	},
	hide : function() {
		this.node.hidden = true;
		if (this.wrap) {
			this.wrap.style.display = "none"
		}
	},
	show : function() {
		this.node.hidden = false;
		if (this.wrap) {
			this.wrap.style.display = ""
		}
	},
	onContextMenu : function(a) {
		if (this.node.hasListener("contextmenu")
				|| this.node.getOwnerTree().hasListener("contextmenu")) {
			a.preventDefault();
			this.focus();
			this.fireEvent("contextmenu", this.node, a)
		}
	},
	onClick : function(c) {
		if (this.dropping) {
			c.stopEvent();
			return
		}
		if (this.fireEvent("beforeclick", this.node, c) !== false) {
			var b = c.getTarget("a");
			if (!this.disabled && this.node.attributes.href && b) {
				this.fireEvent("click", this.node, c);
				return
			} else {
				if (b && c.ctrlKey) {
					c.stopEvent()
				}
			}
			c.preventDefault();
			if (this.disabled) {
				return
			}
			if (this.node.attributes.singleClickExpand && !this.animating
					&& this.node.isExpandable()) {
				this.node.toggle()
			}
			this.fireEvent("click", this.node, c)
		} else {
			c.stopEvent()
		}
	},
	onDblClick : function(a) {
		a.preventDefault();
		if (this.disabled) {
			return
		}
		if (this.checkbox) {
			this.toggleCheck()
		}
		if (!this.animating && this.node.isExpandable()) {
			this.node.toggle()
		}
		this.fireEvent("dblclick", this.node, a)
	},
	onOver : function(a) {
		this.addClass("x-tree-node-over")
	},
	onOut : function(a) {
		this.removeClass("x-tree-node-over")
	},
	onCheckChange : function() {
		var a = this.checkbox.checked;
		this.checkbox.defaultChecked = a;
		this.node.attributes.checked = a;
		this.fireEvent("checkchange", this.node, a)
	},
	ecClick : function(a) {
		if (!this.animating && this.node.isExpandable()) {
			this.node.toggle()
		}
	},
	startDrop : function() {
		this.dropping = true
	},
	endDrop : function() {
		setTimeout(function() {
			this.dropping = false
		}.createDelegate(this), 50)
	},
	expand : function() {
		this.updateExpandIcon();
		this.ctNode.style.display = ""
	},
	focus : function() {
		if (!this.node.preventHScroll) {
			try {
				this.anchor.focus()
			} catch (c) {
			}
		} else {
			try {
				var b = this.node.getOwnerTree().getTreeEl().dom;
				var a = b.scrollLeft;
				this.anchor.focus();
				b.scrollLeft = a
			} catch (c) {
			}
		}
	},
	toggleCheck : function(b) {
		var a = this.checkbox;
		if (a) {
			a.checked = (b === undefined ? !a.checked : b);
			this.onCheckChange()
		}
	},
	blur : function() {
		try {
			this.anchor.blur()
		} catch (a) {
		}
	},
	animExpand : function(b) {
		var a = Ext.get(this.ctNode);
		a.stopFx();
		if (!this.node.isExpandable()) {
			this.updateExpandIcon();
			this.ctNode.style.display = "";
			Ext.callback(b);
			return
		}
		this.animating = true;
		this.updateExpandIcon();
		a.slideIn("t", {
			callback : function() {
				this.animating = false;
				Ext.callback(b)
			},
			scope : this,
			duration : this.node.ownerTree.duration || 0.25
		})
	},
	highlight : function() {
		var a = this.node.getOwnerTree();
		Ext.fly(this.wrap).highlight(a.hlColor || "C3DAF9", {
			endColor : a.hlBaseColor
		})
	},
	collapse : function() {
		this.updateExpandIcon();
		this.ctNode.style.display = "none"
	},
	animCollapse : function(b) {
		var a = Ext.get(this.ctNode);
		a.enableDisplayMode("block");
		a.stopFx();
		this.animating = true;
		this.updateExpandIcon();
		a.slideOut("t", {
			callback : function() {
				this.animating = false;
				Ext.callback(b)
			},
			scope : this,
			duration : this.node.ownerTree.duration || 0.25
		})
	},
	getContainer : function() {
		return this.ctNode
	},
	getEl : function() {
		return this.wrap
	},
	appendDDGhost : function(a) {
		a.appendChild(this.elNode.cloneNode(true))
	},
	getDDRepairXY : function() {
		return Ext.lib.Dom.getXY(this.iconNode)
	},
	onRender : function() {
		this.render()
	},
	render : function(c) {
		var e = this.node, b = e.attributes;
		var d = e.parentNode
				? e.parentNode.ui.getContainer()
				: e.ownerTree.innerCt.dom;
		if (!this.rendered) {
			this.rendered = true;
			this.renderElements(e, b, d, c);
			if (b.qtip) {
				if (this.textNode.setAttributeNS) {
					this.textNode.setAttributeNS("ext", "qtip", b.qtip);
					if (b.qtipTitle) {
						this.textNode.setAttributeNS("ext", "qtitle",
								b.qtipTitle)
					}
				} else {
					this.textNode.setAttribute("ext:qtip", b.qtip);
					if (b.qtipTitle) {
						this.textNode.setAttribute("ext:qtitle", b.qtipTitle)
					}
				}
			} else {
				if (b.qtipCfg) {
					b.qtipCfg.target = Ext.id(this.textNode);
					Ext.QuickTips.register(b.qtipCfg)
				}
			}
			this.initEvents();
			if (!this.node.expanded) {
				this.updateExpandIcon(true)
			}
		} else {
			if (c === true) {
				d.appendChild(this.wrap)
			}
		}
	},
	renderElements : function(e, l, k, m) {
		this.indentMarkup = e.parentNode
				? e.parentNode.ui.getChildIndent()
				: "";
		var g = typeof l.checked == "boolean";
		var c = l.href ? l.href : Ext.isGecko ? "" : "#";
		var d = [
				'<li class="x-tree-node"><div ext:tree-node-id="',
				e.id,
				'" class="x-tree-node-el x-tree-node-leaf x-unselectable ',
				l.cls,
				'" unselectable="on">',
				'<span class="x-tree-node-indent">',
				this.indentMarkup,
				"</span>",
				'<img src="',
				this.emptyIcon,
				'" class="x-tree-ec-icon x-tree-elbow" />',
				'<img src="',
				l.icon || this.emptyIcon,
				'" class="x-tree-node-icon',
				(l.icon ? " x-tree-node-inline-icon" : ""),
				(l.iconCls ? " " + l.iconCls : ""),
				'" unselectable="on" />',
				g
						? ('<input class="x-tree-node-cb" type="checkbox" ' + (l.checked
								? 'checked="checked" />'
								: "/>"))
						: "",
				'<a hidefocus="on" class="x-tree-node-anchor" href="', c,
				'" tabIndex="1" ',
				l.hrefTarget ? ' target="' + l.hrefTarget + '"' : "",
				'><span unselectable="on">', e.text, "</span></a></div>",
				'<ul class="x-tree-node-ct" style="display:none;"></ul>',
				"</li>"].join("");
		var b;
		if (m !== true && e.nextSibling && (b = e.nextSibling.ui.getEl())) {
			this.wrap = Ext.DomHelper.insertHtml("beforeBegin", b, d)
		} else {
			this.wrap = Ext.DomHelper.insertHtml("beforeEnd", k, d)
		}
		this.elNode = this.wrap.childNodes[0];
		this.ctNode = this.wrap.childNodes[1];
		var i = this.elNode.childNodes;
		this.indentNode = i[0];
		this.ecNode = i[1];
		this.iconNode = i[2];
		var h = 3;
		if (g) {
			this.checkbox = i[3];
			this.checkbox.defaultChecked = this.checkbox.checked;
			h++
		}
		this.anchor = i[h];
		this.textNode = i[h].firstChild
	},
	getAnchor : function() {
		return this.anchor
	},
	getTextEl : function() {
		return this.textNode
	},
	getIconEl : function() {
		return this.iconNode
	},
	isChecked : function() {
		return this.checkbox ? this.checkbox.checked : false
	},
	updateExpandIcon : function() {
		if (this.rendered) {
			var e = this.node, d, c;
			var a = e.isLast() ? "x-tree-elbow-end" : "x-tree-elbow";
			if (e.isExpandable()) {
				if (e.expanded) {
					a += "-minus";
					d = "x-tree-node-collapsed";
					c = "x-tree-node-expanded"
				} else {
					a += "-plus";
					d = "x-tree-node-expanded";
					c = "x-tree-node-collapsed"
				}
				if (this.wasLeaf) {
					this.removeClass("x-tree-node-leaf");
					this.wasLeaf = false
				}
				if (this.c1 != d || this.c2 != c) {
					Ext.fly(this.elNode).replaceClass(d, c);
					this.c1 = d;
					this.c2 = c
				}
			} else {
				if (!this.wasLeaf) {
					Ext.fly(this.elNode).replaceClass("x-tree-node-expanded",
							"x-tree-node-leaf");
					delete this.c1;
					delete this.c2;
					this.wasLeaf = true
				}
			}
			var b = "x-tree-ec-icon " + a;
			if (this.ecc != b) {
				this.ecNode.className = b;
				this.ecc = b
			}
		}
	},
	getChildIndent : function() {
		if (!this.childIndent) {
			var a = [];
			var b = this.node;
			while (b) {
				if (!b.isRoot || (b.isRoot && b.ownerTree.rootVisible)) {
					if (!b.isLast()) {
						a.unshift('<img src="' + this.emptyIcon
								+ '" class="x-tree-elbow-line" />')
					} else {
						a.unshift('<img src="' + this.emptyIcon
								+ '" class="x-tree-icon" />')
					}
				}
				b = b.parentNode
			}
			this.childIndent = a.join("")
		}
		return this.childIndent
	},
	renderIndent : function() {
		if (this.rendered) {
			var a = "";
			var b = this.node.parentNode;
			if (b) {
				a = b.ui.getChildIndent()
			}
			if (this.indentMarkup != a) {
				this.indentNode.innerHTML = a;
				this.indentMarkup = a
			}
			this.updateExpandIcon()
		}
	},
	destroy : function() {
		if (this.elNode) {
			Ext.dd.Registry.unregister(this.elNode.id)
		}
		delete this.elNode;
		delete this.ctNode;
		delete this.indentNode;
		delete this.ecNode;
		delete this.iconNode;
		delete this.checkbox;
		delete this.anchor;
		delete this.textNode;
		if (this.holder) {
			delete this.wrap;
			Ext.removeNode(this.holder);
			delete this.holder
		} else {
			Ext.removeNode(this.wrap);
			delete this.wrap
		}
	}
};
Ext.tree.RootTreeNodeUI = Ext.extend(Ext.tree.TreeNodeUI, {
	render : function() {
		if (!this.rendered) {
			var a = this.node.ownerTree.innerCt.dom;
			this.node.expanded = true;
			a.innerHTML = '<div class="x-tree-root-node"></div>';
			this.wrap = this.ctNode = a.firstChild
		}
	},
	collapse : Ext.emptyFn,
	expand : Ext.emptyFn
});
Ext.tree.TreeLoader = function(a) {
	this.baseParams = {};
	Ext.apply(this, a);
	this.addEvents("beforeload", "load", "loadexception");
	Ext.tree.TreeLoader.superclass.constructor.call(this)
};
Ext.extend(Ext.tree.TreeLoader, Ext.util.Observable, {
	uiProviders : {},
	clearOnLoad : true,
	load : function(a, b) {
		if (this.clearOnLoad) {
			while (a.firstChild) {
				a.removeChild(a.firstChild)
			}
		}
		if (this.doPreload(a)) {
			if (typeof b == "function") {
				b()
			}
		} else {
			if (this.dataUrl || this.url) {
				this.requestData(a, b)
			}
		}
	},
	doPreload : function(d) {
		if (d.attributes.children) {
			if (d.childNodes.length < 1) {
				var c = d.attributes.children;
				d.beginUpdate();
				for (var b = 0, a = c.length;b < a; b++) {
					var e = d.appendChild(this.createNode(c[b]));
					if (this.preloadChildren) {
						this.doPreload(e)
					}
				}
				d.endUpdate()
			}
			return true
		} else {
			return false
		}
	},
	getParams : function(d) {
		var a = [], c = this.baseParams;
		for (var b in c) {
			if (typeof c[b] != "function") {
				a.push(encodeURIComponent(b), "=", encodeURIComponent(c[b]),
						"&")
			}
		}
		a.push("node=", encodeURIComponent(d.id));
		return a.join("")
	},
	requestData : function(a, b) {
		if (this.fireEvent("beforeload", this, a, b) !== false) {
			this.transId = Ext.Ajax.request( {
				method : this.requestMethod,
				url : this.dataUrl || this.url,
				success : this.handleResponse,
				failure : this.handleFailure,
				scope : this,
				argument : {
					callback : b,
					node : a
				},
				params : this.getParams(a)
			})
		} else {
			if (typeof b == "function") {
				b()
			}
		}
	},
	isLoading : function() {
		return !!this.transId
	},
	abort : function() {
		if (this.isLoading()) {
			Ext.Ajax.abort(this.transId)
		}
	},
	createNode : function(attr) {
		if (this.baseAttrs) {
			Ext.applyIf(attr, this.baseAttrs)
		}
		if (this.applyLoader !== false) {
			attr.loader = this
		}
		if (typeof attr.uiProvider == "string") {
			attr.uiProvider = this.uiProviders[attr.uiProvider]
					|| eval(attr.uiProvider)
		}
		if (attr.nodeType) {
			return new Ext.tree.TreePanel.nodeTypes[attr.nodeType](attr)
		} else {
			return attr.leaf
					? new Ext.tree.TreeNode(attr)
					: new Ext.tree.AsyncTreeNode(attr)
		}
	},
	processResponse : function(response, node, callback) {
		var json = response.responseText;
		try {
			var o = eval("(" + json + ")");
			node.beginUpdate();
			for (var i = 0, len = o.length;i < len; i++) {
				var n = this.createNode(o[i]);
				if (n) {
					node.appendChild(n)
				}
			}
			node.endUpdate();
			if (typeof callback == "function") {
				callback(this, node)
			}
		} catch (e) {
			this.handleFailure(response)
		}
	},
	handleResponse : function(c) {
		this.transId = false;
		var b = c.argument;
		this.processResponse(c, b.node, b.callback);
		this.fireEvent("load", this, b.node, c)
	},
	handleFailure : function(c) {
		this.transId = false;
		var b = c.argument;
		this.fireEvent("loadexception", this, b.node, c);
		if (typeof b.callback == "function") {
			b.callback(this, b.node)
		}
	}
});
Ext.tree.TreeFilter = function(a, b) {
	this.tree = a;
	this.filtered = {};
	Ext.apply(this, b)
};
Ext.tree.TreeFilter.prototype = {
	clearBlank : false,
	reverse : false,
	autoClear : false,
	remove : false,
	filter : function(d, a, b) {
		a = a || "text";
		var c;
		if (typeof d == "string") {
			var e = d.length;
			if (e == 0 && this.clearBlank) {
				this.clear();
				return
			}
			d = d.toLowerCase();
			c = function(g) {
				return g.attributes[a].substr(0, e).toLowerCase() == d
			}
		} else {
			if (d.exec) {
				c = function(g) {
					return d.test(g.attributes[a])
				}
			} else {
				throw "Illegal filter type, must be string or regex"
			}
		}
		this.filterBy(c, null, b)
	},
	filterBy : function(d, c, b) {
		b = b || this.tree.root;
		if (this.autoClear) {
			this.clear()
		}
		var a = this.filtered, i = this.reverse;
		var e = function(l) {
			if (l == b) {
				return true
			}
			if (a[l.id]) {
				return false
			}
			var k = d.call(c || l, l);
			if (!k || i) {
				a[l.id] = l;
				l.ui.hide();
				return false
			}
			return true
		};
		b.cascade(e);
		if (this.remove) {
			for (var h in a) {
				if (typeof h != "function") {
					var g = a[h];
					if (g && g.parentNode) {
						g.parentNode.removeChild(g)
					}
				}
			}
		}
	},
	clear : function() {
		var b = this.tree;
		var a = this.filtered;
		for (var d in a) {
			if (typeof d != "function") {
				var c = a[d];
				if (c) {
					c.ui.show()
				}
			}
		}
		this.filtered = {}
	}
};
Ext.tree.TreeSorter = function(b, c) {
	Ext.apply(this, c);
	b.on("beforechildrenrendered", this.doSort, this);
	b.on("append", this.updateSort, this);
	b.on("insert", this.updateSort, this);
	b.on("textchange", this.updateSortParent, this);
	var e = this.dir && this.dir.toLowerCase() == "desc";
	var g = this.property || "text";
	var h = this.sortType;
	var a = this.folderSort;
	var d = this.caseSensitive === true;
	var i = this.leafAttr || "leaf";
	this.sortFn = function(l, k) {
		if (a) {
			if (l.attributes[i] && !k.attributes[i]) {
				return 1
			}
			if (!l.attributes[i] && k.attributes[i]) {
				return -1
			}
		}
		var n = h
				? h(l)
				: (d ? l.attributes[g] : l.attributes[g].toUpperCase());
		var m = h
				? h(k)
				: (d ? k.attributes[g] : k.attributes[g].toUpperCase());
		if (n < m) {
			return e ? +1 : -1
		} else {
			if (n > m) {
				return e ? -1 : +1
			} else {
				return 0
			}
		}
	}
};
Ext.tree.TreeSorter.prototype = {
	doSort : function(a) {
		a.sort(this.sortFn)
	},
	compareNodes : function(b, a) {
		return (b.text.toUpperCase() > a.text.toUpperCase() ? 1 : -1)
	},
	updateSort : function(a, b) {
		if (b.childrenRendered) {
			this.doSort.defer(1, this, [b])
		}
	},
	updateSortParent : function(a) {
		var b = a.parentNode;
		if (b && b.childrenRendered) {
			this.doSort.defer(1, this, [b])
		}
	}
};
if (Ext.dd.DropZone) {
	Ext.tree.TreeDropZone = function(a, b) {
		this.allowParentInsert = false;
		this.allowContainerDrop = false;
		this.appendOnly = false;
		Ext.tree.TreeDropZone.superclass.constructor.call(this, a.innerCt, b);
		this.tree = a;
		this.dragOverData = {};
		this.lastInsertClass = "x-tree-no-status"
	};
	Ext.extend(Ext.tree.TreeDropZone, Ext.dd.DropZone, {
		ddGroup : "TreeDD",
		expandDelay : 1000,
		expandNode : function(a) {
			if (a.hasChildNodes() && !a.isExpanded()) {
				a.expand(false, null, this.triggerCacheRefresh
						.createDelegate(this))
			}
		},
		queueExpand : function(a) {
			this.expandProcId = this.expandNode.defer(this.expandDelay, this,
					[a])
		},
		cancelExpand : function() {
			if (this.expandProcId) {
				clearTimeout(this.expandProcId);
				this.expandProcId = false
			}
		},
		isValidDropPoint : function(a, l, i, d, c) {
			if (!a || !c) {
				return false
			}
			var g = a.node;
			var h = c.node;
			if (!(g && g.isTarget && l)) {
				return false
			}
			if (l == "append" && g.allowChildren === false) {
				return false
			}
			if ((l == "above" || l == "below")
					&& (g.parentNode && g.parentNode.allowChildren === false)) {
				return false
			}
			if (h && (g == h || h.contains(g))) {
				return false
			}
			var b = this.dragOverData;
			b.tree = this.tree;
			b.target = g;
			b.data = c;
			b.point = l;
			b.source = i;
			b.rawEvent = d;
			b.dropNode = h;
			b.cancel = false;
			var k = this.tree.fireEvent("nodedragover", b);
			return b.cancel === false && k !== false
		},
		getDropPoint : function(h, g, m) {
			var o = g.node;
			if (o.isRoot) {
				return o.allowChildren !== false ? "append" : false
			}
			var c = g.ddel;
			var p = Ext.lib.Dom.getY(c), k = p + c.offsetHeight;
			var i = Ext.lib.Event.getPageY(h);
			var l = o.allowChildren === false || o.isLeaf();
			if (this.appendOnly || o.parentNode.allowChildren === false) {
				return l ? false : "append"
			}
			var d = false;
			if (!this.allowParentInsert) {
				d = o.hasChildNodes() && o.isExpanded()
			}
			var a = (k - p) / (l ? 2 : 3);
			if (i >= p && i < (p + a)) {
				return "above"
			} else {
				if (!d && (l || i >= k - a && i <= k)) {
					return "below"
				} else {
					return "append"
				}
			}
		},
		onNodeEnter : function(d, a, c, b) {
			this.cancelExpand()
		},
		onNodeOver : function(b, i, h, g) {
			var l = this.getDropPoint(h, b, i);
			var c = b.node;
			if (!this.expandProcId && l == "append" && c.hasChildNodes()
					&& !b.node.isExpanded()) {
				this.queueExpand(c)
			} else {
				if (l != "append") {
					this.cancelExpand()
				}
			}
			var d = this.dropNotAllowed;
			if (this.isValidDropPoint(b, l, i, h, g)) {
				if (l) {
					var a = b.ddel;
					var k;
					if (l == "above") {
						d = b.node.isFirst()
								? "x-tree-drop-ok-above"
								: "x-tree-drop-ok-between";
						k = "x-tree-drag-insert-above"
					} else {
						if (l == "below") {
							d = b.node.isLast()
									? "x-tree-drop-ok-below"
									: "x-tree-drop-ok-between";
							k = "x-tree-drag-insert-below"
						} else {
							d = "x-tree-drop-ok-append";
							k = "x-tree-drag-append"
						}
					}
					if (this.lastInsertClass != k) {
						Ext.fly(a).replaceClass(this.lastInsertClass, k);
						this.lastInsertClass = k
					}
				}
			}
			return d
		},
		onNodeOut : function(d, a, c, b) {
			this.cancelExpand();
			this.removeDropIndicators(d)
		},
		onNodeDrop : function(c, l, g, d) {
			var k = this.getDropPoint(g, c, l);
			var h = c.node;
			h.ui.startDrop();
			if (!this.isValidDropPoint(c, k, l, g, d)) {
				h.ui.endDrop();
				return false
			}
			var i = d.node
					|| (l.getTreeNode ? l.getTreeNode(d, h, k, g) : null);
			var b = {
				tree : this.tree,
				target : h,
				data : d,
				point : k,
				source : l,
				rawEvent : g,
				dropNode : i,
				cancel : !i,
				dropStatus : false
			};
			var a = this.tree.fireEvent("beforenodedrop", b);
			if (a === false || b.cancel === true || !b.dropNode) {
				h.ui.endDrop();
				return b.dropStatus
			}
			h = b.target;
			if (k == "append" && !h.isExpanded()) {
				h.expand(false, null, function() {
					this.completeDrop(b)
				}.createDelegate(this))
			} else {
				this.completeDrop(b)
			}
			return true
		},
		completeDrop : function(h) {
			var d = h.dropNode, e = h.point, c = h.target;
			if (!Ext.isArray(d)) {
				d = [d]
			}
			var g;
			for (var b = 0, a = d.length;b < a; b++) {
				g = d[b];
				if (e == "above") {
					c.parentNode.insertBefore(g, c)
				} else {
					if (e == "below") {
						c.parentNode.insertBefore(g, c.nextSibling)
					} else {
						c.appendChild(g)
					}
				}
			}
			g.ui.focus();
			if (Ext.enableFx && this.tree.hlDrop) {
				g.ui.highlight()
			}
			c.ui.endDrop();
			this.tree.fireEvent("nodedrop", h)
		},
		afterNodeMoved : function(a, c, g, d, b) {
			if (Ext.enableFx && this.tree.hlDrop) {
				b.ui.focus();
				b.ui.highlight()
			}
			this.tree.fireEvent("nodedrop", this.tree, d, c, a, g)
		},
		getTree : function() {
			return this.tree
		},
		removeDropIndicators : function(b) {
			if (b && b.ddel) {
				var a = b.ddel;
				Ext.fly(a).removeClass(["x-tree-drag-insert-above",
						"x-tree-drag-insert-below", "x-tree-drag-append"]);
				this.lastInsertClass = "_noclass"
			}
		},
		beforeDragDrop : function(b, a, c) {
			this.cancelExpand();
			return true
		},
		afterRepair : function(a) {
			if (a && Ext.enableFx) {
				a.node.ui.highlight()
			}
			this.hideProxy()
		}
	})
}
if (Ext.dd.DragZone) {
	Ext.tree.TreeDragZone = function(a, b) {
		Ext.tree.TreeDragZone.superclass.constructor.call(this, a.getTreeEl(),
				b);
		this.tree = a
	};
	Ext.extend(Ext.tree.TreeDragZone, Ext.dd.DragZone,
			{
				ddGroup : "TreeDD",
				onBeforeDrag : function(a, b) {
					var c = a.node;
					return c && c.draggable && !c.disabled
				},
				onInitDrag : function(b) {
					var a = this.dragData;
					this.tree.getSelectionModel().select(a.node);
					this.tree.eventModel.disable();
					this.proxy.update("");
					a.node.ui.appendDDGhost(this.proxy.ghost.dom);
					this.tree.fireEvent("startdrag", this.tree, a.node, b)
				},
				getRepairXY : function(b, a) {
					return a.node.ui.getDDRepairXY()
				},
				onEndDrag : function(a, b) {
					this.tree.eventModel.enable
							.defer(100, this.tree.eventModel);
					this.tree.fireEvent("enddrag", this.tree, a.node, b)
				},
				onValidDrop : function(a, b, c) {
					this.tree.fireEvent("dragdrop", this.tree,
							this.dragData.node, a, b);
					this.hideProxy()
				},
				beforeInvalidDrop : function(a, c) {
					var b = this.tree.getSelectionModel();
					b.clearSelections();
					b.select(this.dragData.node)
				},
				afterRepair : function() {
					if (Ext.enableFx && this.tree.hlDrop) {
						Ext.Element.fly(this.dragData.ddel)
								.highlight(this.hlColor || "c3daf9")
					}
					this.dragging = false
				}
			})
}
Ext.tree.TreeEditor = function(a, c, b) {
	c = c || {};
	var d = c.events ? c : new Ext.form.TextField(c);
	Ext.tree.TreeEditor.superclass.constructor.call(this, d, b);
	this.tree = a;
	if (!a.rendered) {
		a.on("render", this.initEditor, this)
	} else {
		this.initEditor(a)
	}
};
Ext.extend(Ext.tree.TreeEditor, Ext.Editor, {
	alignment : "l-l",
	autoSize : false,
	hideEl : false,
	cls : "x-small-editor x-tree-editor",
	shim : false,
	shadow : "frame",
	maxWidth : 250,
	editDelay : 350,
	initEditor : function(a) {
		a.on("beforeclick", this.beforeNodeClick, this);
		a.on("dblclick", this.onNodeDblClick, this);
		this.on("complete", this.updateNode, this);
		this.on("beforestartedit", this.fitToTree, this);
		this.on("startedit", this.bindScroll, this, {
			delay : 10
		});
		this.on("specialkey", this.onSpecialKey, this)
	},
	fitToTree : function(b, c) {
		var e = this.tree.getTreeEl().dom, d = c.dom;
		if (e.scrollLeft > d.offsetLeft) {
			e.scrollLeft = d.offsetLeft
		}
		var a = Math.min(this.maxWidth, (e.clientWidth > 20
				? e.clientWidth
				: e.offsetWidth)
				- Math.max(0, d.offsetLeft - e.scrollLeft) - 5);
		this.setSize(a, "")
	},
	triggerEdit : function(a, b) {
		this.completeEdit();
		if (a.attributes.editable !== false) {
			this.editNode = a;
			if (this.tree.autoScroll) {
				a.ui.getEl().scrollIntoView(this.tree.body)
			}
			this.autoEditTimer = this.startEdit.defer(this.editDelay, this, [
					a.ui.textNode, a.text]);
			return false
		}
	},
	bindScroll : function() {
		this.tree.getTreeEl().on("scroll", this.cancelEdit, this)
	},
	beforeNodeClick : function(a, b) {
		clearTimeout(this.autoEditTimer);
		if (this.tree.getSelectionModel().isSelected(a)) {
			b.stopEvent();
			return this.triggerEdit(a)
		}
	},
	onNodeDblClick : function(a, b) {
		clearTimeout(this.autoEditTimer)
	},
	updateNode : function(a, b) {
		this.tree.getTreeEl().un("scroll", this.cancelEdit, this);
		this.editNode.setText(b)
	},
	onHide : function() {
		Ext.tree.TreeEditor.superclass.onHide.call(this);
		if (this.editNode) {
			this.editNode.ui.focus.defer(50, this.editNode.ui)
		}
	},
	onSpecialKey : function(c, b) {
		var a = b.getKey();
		if (a == b.ESC) {
			b.stopEvent();
			this.cancelEdit()
		} else {
			if (a == b.ENTER && !b.hasModifier()) {
				b.stopEvent();
				this.completeEdit()
			}
		}
	}
});
Ext.menu.Menu = function(a) {
	if (Ext.isArray(a)) {
		a = {
			items : a
		}
	}
	Ext.apply(this, a);
	this.id = this.id || Ext.id();
	this.addEvents("beforeshow", "beforehide", "show", "hide", "click",
			"mouseover", "mouseout", "itemclick");
	Ext.menu.MenuMgr.register(this);
	Ext.menu.Menu.superclass.constructor.call(this);
	var b = this.items;
	this.items = new Ext.util.MixedCollection();
	if (b) {
		this.add.apply(this, b)
	}
};
Ext.extend(Ext.menu.Menu, Ext.util.Observable, {
	minWidth : 120,
	shadow : "sides",
	subMenuAlign : "tl-tr?",
	defaultAlign : "tl-bl?",
	allowOtherMenus : false,
	ignoreParentClicks : false,
	hidden : true,
	createEl : function() {
		return new Ext.Layer( {
			cls : "x-menu",
			shadow : this.shadow,
			constrain : false,
			parentEl : this.parentEl || document.body,
			zindex : 15000
		})
	},
	render : function() {
		if (this.el) {
			return
		}
		var b = this.el = this.createEl();
		if (!this.keyNav) {
			this.keyNav = new Ext.menu.MenuNav(this)
		}
		if (this.plain) {
			b.addClass("x-menu-plain")
		}
		if (this.cls) {
			b.addClass(this.cls)
		}
		this.focusEl = b.createChild( {
			tag : "a",
			cls : "x-menu-focus",
			href : "#",
			onclick : "return false;",
			tabIndex : "-1"
		});
		var a = b.createChild( {
			tag : "ul",
			cls : "x-menu-list"
		});
		a.on("click", this.onClick, this);
		a.on("mouseover", this.onMouseOver, this);
		a.on("mouseout", this.onMouseOut, this);
		this.items.each(function(d) {
			var c = document.createElement("li");
			c.className = "x-menu-list-item";
			a.dom.appendChild(c);
			d.render(c, this)
		}, this);
		this.ul = a;
		this.autoWidth()
	},
	autoWidth : function() {
		var d = this.el, c = this.ul;
		if (!d) {
			return
		}
		var a = this.width;
		if (a) {
			d.setWidth(a)
		} else {
			if (Ext.isIE) {
				d.setWidth(this.minWidth);
				var b = d.dom.offsetWidth;
				d.setWidth(c.getWidth() + d.getFrameWidth("lr"))
			}
		}
	},
	delayAutoWidth : function() {
		if (this.el) {
			if (!this.awTask) {
				this.awTask = new Ext.util.DelayedTask(this.autoWidth, this)
			}
			this.awTask.delay(20)
		}
	},
	findTargetItem : function(b) {
		var a = b.getTarget(".x-menu-list-item", this.ul, true);
		if (a && a.menuItemId) {
			return this.items.get(a.menuItemId)
		}
	},
	onClick : function(b) {
		var a;
		if (a = this.findTargetItem(b)) {
			if (a.menu && this.ignoreParentClicks) {
				a.expandMenu()
			} else {
				a.onClick(b);
				this.fireEvent("click", this, a, b)
			}
		}
	},
	setActiveItem : function(a, b) {
		if (a != this.activeItem) {
			if (this.activeItem) {
				this.activeItem.deactivate()
			}
			this.activeItem = a;
			a.activate(b)
		} else {
			if (b) {
				a.expandMenu()
			}
		}
	},
	tryActivate : function(g, e) {
		var b = this.items;
		for (var c = g, a = b.length;c >= 0 && c < a; c += e) {
			var d = b.get(c);
			if (!d.disabled && d.canActivate) {
				this.setActiveItem(d, false);
				return d
			}
		}
		return false
	},
	onMouseOver : function(b) {
		var a;
		if (a = this.findTargetItem(b)) {
			if (a.canActivate && !a.disabled) {
				this.setActiveItem(a, true)
			}
		}
		this.over = true;
		this.fireEvent("mouseover", this, b, a)
	},
	onMouseOut : function(b) {
		var a;
		if (a = this.findTargetItem(b)) {
			if (a == this.activeItem && a.shouldDeactivate(b)) {
				this.activeItem.deactivate();
				delete this.activeItem
			}
		}
		this.over = false;
		this.fireEvent("mouseout", this, b, a)
	},
	isVisible : function() {
		return this.el && !this.hidden
	},
	show : function(b, c, a) {
		this.parentMenu = a;
		if (!this.el) {
			this.render()
		}
		this.fireEvent("beforeshow", this);
		this.showAt(this.el.getAlignToXY(b, c || this.defaultAlign), a, false)
	},
	showAt : function(c, b, a) {
		this.parentMenu = b;
		if (!this.el) {
			this.render()
		}
		if (a !== false) {
			this.fireEvent("beforeshow", this);
			c = this.el.adjustForConstraints(c)
		}
		this.el.setXY(c);
		this.el.show();
		this.hidden = false;
		this.focus();
		this.fireEvent("show", this)
	},
	focus : function() {
		if (!this.hidden) {
			this.doFocus.defer(50, this)
		}
	},
	doFocus : function() {
		if (!this.hidden) {
			this.focusEl.focus()
		}
	},
	hide : function(a) {
		if (this.el && this.isVisible()) {
			this.fireEvent("beforehide", this);
			if (this.activeItem) {
				this.activeItem.deactivate();
				this.activeItem = null
			}
			this.el.hide();
			this.hidden = true;
			this.fireEvent("hide", this)
		}
		if (a === true && this.parentMenu) {
			this.parentMenu.hide(true)
		}
	},
	add : function() {
		var c = arguments, b = c.length, g;
		for (var d = 0;d < b; d++) {
			var e = c[d];
			if (e.render) {
				g = this.addItem(e)
			} else {
				if (typeof e == "string") {
					if (e == "separator" || e == "-") {
						g = this.addSeparator()
					} else {
						g = this.addText(e)
					}
				} else {
					if (e.tagName || e.el) {
						g = this.addElement(e)
					} else {
						if (typeof e == "object") {
							Ext.applyIf(e, this.defaults);
							g = this.addMenuItem(e)
						}
					}
				}
			}
		}
		return g
	},
	getEl : function() {
		if (!this.el) {
			this.render()
		}
		return this.el
	},
	addSeparator : function() {
		return this.addItem(new Ext.menu.Separator())
	},
	addElement : function(a) {
		return this.addItem(new Ext.menu.BaseItem(a))
	},
	addItem : function(b) {
		this.items.add(b);
		if (this.ul) {
			var a = document.createElement("li");
			a.className = "x-menu-list-item";
			this.ul.dom.appendChild(a);
			b.render(a, this);
			this.delayAutoWidth()
		}
		return b
	},
	addMenuItem : function(a) {
		if (!(a instanceof Ext.menu.Item)) {
			if (typeof a.checked == "boolean") {
				a = new Ext.menu.CheckItem(a)
			} else {
				a = new Ext.menu.Item(a)
			}
		}
		return this.addItem(a)
	},
	addText : function(a) {
		return this.addItem(new Ext.menu.TextItem(a))
	},
	insert : function(b, c) {
		this.items.insert(b, c);
		if (this.ul) {
			var a = document.createElement("li");
			a.className = "x-menu-list-item";
			this.ul.dom.insertBefore(a, this.ul.dom.childNodes[b]);
			c.render(a, this);
			this.delayAutoWidth()
		}
		return c
	},
	remove : function(a) {
		this.items.removeKey(a.id);
		a.destroy()
	},
	removeAll : function() {
		if (this.items) {
			var a;
			while (a = this.items.first()) {
				this.remove(a)
			}
		}
	},
	destroy : function() {
		this.beforeDestroy();
		Ext.menu.MenuMgr.unregister(this);
		if (this.keyNav) {
			this.keyNav.disable()
		}
		this.removeAll();
		if (this.ul) {
			this.ul.removeAllListeners()
		}
		if (this.el) {
			this.el.destroy()
		}
	},
	beforeDestroy : Ext.emptyFn
});
Ext.menu.MenuNav = function(a) {
	Ext.menu.MenuNav.superclass.constructor.call(this, a.el);
	this.scope = this.menu = a
};
Ext.extend(Ext.menu.MenuNav, Ext.KeyNav, {
	doRelay : function(c, b) {
		var a = c.getKey();
		if (!this.menu.activeItem && c.isNavKeyPress() && a != c.SPACE
				&& a != c.RETURN) {
			this.menu.tryActivate(0, 1);
			return false
		}
		return b.call(this.scope || this, c, this.menu)
	},
	up : function(b, a) {
		if (!a.tryActivate(a.items.indexOf(a.activeItem) - 1, -1)) {
			a.tryActivate(a.items.length - 1, -1)
		}
	},
	down : function(b, a) {
		if (!a.tryActivate(a.items.indexOf(a.activeItem) + 1, 1)) {
			a.tryActivate(0, 1)
		}
	},
	right : function(b, a) {
		if (a.activeItem) {
			a.activeItem.expandMenu(true)
		}
	},
	left : function(b, a) {
		a.hide();
		if (a.parentMenu && a.parentMenu.activeItem) {
			a.parentMenu.activeItem.activate()
		}
	},
	enter : function(b, a) {
		if (a.activeItem) {
			b.stopPropagation();
			a.activeItem.onClick(b);
			a.fireEvent("click", this, a.activeItem);
			return true
		}
	}
});
Ext.menu.MenuMgr = function() {
	var g, d, c = {}, a = false, m = new Date();
	function o() {
		g = {};
		d = new Ext.util.MixedCollection();
		Ext.getDoc().addKeyListener(27, function() {
			if (d.length > 0) {
				i()
			}
		})
	}
	function i() {
		if (d && d.length > 0) {
			var p = d.clone();
			p.each(function(q) {
				q.hide()
			})
		}
	}
	function e(p) {
		d.remove(p);
		if (d.length < 1) {
			Ext.getDoc().un("mousedown", n);
			a = false
		}
	}
	function l(p) {
		var q = d.last();
		m = new Date();
		d.add(p);
		if (!a) {
			Ext.getDoc().on("mousedown", n);
			a = true
		}
		if (p.parentMenu) {
			p.getEl().setZIndex(parseInt(p.parentMenu.getEl()
					.getStyle("z-index"), 10)
					+ 3);
			p.parentMenu.activeChild = p
		} else {
			if (q && q.isVisible()) {
				p.getEl().setZIndex(parseInt(q.getEl().getStyle("z-index"), 10)
						+ 3)
			}
		}
	}
	function b(p) {
		if (p.activeChild) {
			p.activeChild.hide()
		}
		if (p.autoHideTimer) {
			clearTimeout(p.autoHideTimer);
			delete p.autoHideTimer
		}
	}
	function h(p) {
		var q = p.parentMenu;
		if (!q && !p.allowOtherMenus) {
			i()
		} else {
			if (q && q.activeChild) {
				q.activeChild.hide()
			}
		}
	}
	function n(p) {
		if (m.getElapsed() > 50 && d.length > 0 && !p.getTarget(".x-menu")) {
			i()
		}
	}
	function k(q, t) {
		if (t) {
			var s = c[q.group];
			for (var r = 0, p = s.length;r < p; r++) {
				if (s[r] != q) {
					s[r].setChecked(false)
				}
			}
		}
	}
	return {
		hideAll : function() {
			i()
		},
		register : function(q) {
			if (!g) {
				o()
			}
			g[q.id] = q;
			q.on("beforehide", b);
			q.on("hide", e);
			q.on("beforeshow", h);
			q.on("show", l);
			var p = q.group;
			if (p && q.events.checkchange) {
				if (!c[p]) {
					c[p] = []
				}
				c[p].push(q);
				q.on("checkchange", onCheck)
			}
		},
		get : function(p) {
			if (typeof p == "string") {
				if (!g) {
					return null
				}
				return g[p]
			} else {
				if (p.events) {
					return p
				} else {
					if (typeof p.length == "number") {
						return new Ext.menu.Menu( {
							items : p
						})
					} else {
						return new Ext.menu.Menu(p)
					}
				}
			}
		},
		unregister : function(q) {
			delete g[q.id];
			q.un("beforehide", b);
			q.un("hide", e);
			q.un("beforeshow", h);
			q.un("show", l);
			var p = q.group;
			if (p && q.events.checkchange) {
				c[p].remove(q);
				q.un("checkchange", onCheck)
			}
		},
		registerCheckable : function(p) {
			var q = p.group;
			if (q) {
				if (!c[q]) {
					c[q] = []
				}
				c[q].push(p);
				p.on("beforecheckchange", k)
			}
		},
		unregisterCheckable : function(p) {
			var q = p.group;
			if (q) {
				c[q].remove(p);
				p.un("beforecheckchange", k)
			}
		},
		getCheckedItem : function(r) {
			var s = c[r];
			if (s) {
				for (var q = 0, p = s.length;q < p; q++) {
					if (s[q].checked) {
						return s[q]
					}
				}
			}
			return null
		},
		setCheckedItem : function(r, t) {
			var s = c[r];
			if (s) {
				for (var q = 0, p = s.length;q < p; q++) {
					if (s[q].id == t) {
						s[q].setChecked(true)
					}
				}
			}
			return null
		}
	}
}();
Ext.menu.BaseItem = function(a) {
	Ext.menu.BaseItem.superclass.constructor.call(this, a);
	this.addEvents("click", "activate", "deactivate");
	if (this.handler) {
		this.on("click", this.handler, this.scope)
	}
};
Ext.extend(Ext.menu.BaseItem, Ext.Component, {
	canActivate : false,
	activeClass : "x-menu-item-active",
	hideOnClick : true,
	hideDelay : 100,
	ctype : "Ext.menu.BaseItem",
	actionMode : "container",
	render : function(a, b) {
		this.parentMenu = b;
		Ext.menu.BaseItem.superclass.render.call(this, a);
		this.container.menuItemId = this.id
	},
	onRender : function(b, a) {
		this.el = Ext.get(this.el);
		if (this.id) {
			this.el.id = this.id
		}
		b.dom.appendChild(this.el.dom)
	},
	setHandler : function(b, a) {
		if (this.handler) {
			this.un("click", this.handler, this.scope)
		}
		this.on("click", this.handler = b, this.scope = a)
	},
	onClick : function(a) {
		if (!this.disabled && this.fireEvent("click", this, a) !== false
				&& this.parentMenu.fireEvent("itemclick", this, a) !== false) {
			this.handleClick(a)
		} else {
			a.stopEvent()
		}
	},
	activate : function() {
		if (this.disabled) {
			return false
		}
		var a = this.container;
		a.addClass(this.activeClass);
		this.region = a.getRegion().adjust(2, 2, -2, -2);
		this.fireEvent("activate", this);
		return true
	},
	deactivate : function() {
		this.container.removeClass(this.activeClass);
		this.fireEvent("deactivate", this)
	},
	shouldDeactivate : function(a) {
		return !this.region || !this.region.contains(a.getPoint())
	},
	handleClick : function(a) {
		if (this.hideOnClick) {
			this.parentMenu.hide.defer(this.hideDelay, this.parentMenu, [true])
		}
	},
	expandMenu : function(a) {
	},
	hideMenu : function() {
	}
});
Ext.menu.TextItem = function(a) {
	if (typeof a == "string") {
		a = {
			text : a
		}
	}
	Ext.menu.TextItem.superclass.constructor.call(this, a)
};
Ext.extend(Ext.menu.TextItem, Ext.menu.BaseItem, {
	hideOnClick : false,
	itemCls : "x-menu-text",
	onRender : function() {
		var a = document.createElement("span");
		a.className = this.itemCls;
		a.innerHTML = this.text;
		this.el = a;
		Ext.menu.TextItem.superclass.onRender.apply(this, arguments)
	}
});
Ext.menu.Separator = function(a) {
	Ext.menu.Separator.superclass.constructor.call(this, a)
};
Ext.extend(Ext.menu.Separator, Ext.menu.BaseItem, {
	itemCls : "x-menu-sep",
	hideOnClick : false,
	onRender : function(a) {
		var b = document.createElement("span");
		b.className = this.itemCls;
		b.innerHTML = "&#160;";
		this.el = b;
		a.addClass("x-menu-sep-li");
		Ext.menu.Separator.superclass.onRender.apply(this, arguments)
	}
});
Ext.menu.Item = function(a) {
	Ext.menu.Item.superclass.constructor.call(this, a);
	if (this.menu) {
		this.menu = Ext.menu.MenuMgr.get(this.menu)
	}
};
Ext.extend(Ext.menu.Item, Ext.menu.BaseItem, {
	itemCls : "x-menu-item",
	canActivate : true,
	showDelay : 200,
	hideDelay : 200,
	ctype : "Ext.menu.Item",
	onRender : function(b, a) {
		var c = document.createElement("a");
		c.hideFocus = true;
		c.unselectable = "on";
		c.href = this.href || "#";
		if (this.hrefTarget) {
			c.target = this.hrefTarget
		}
		c.className = this.itemCls + (this.menu ? " x-menu-item-arrow" : "")
				+ (this.cls ? " " + this.cls : "");
		c.innerHTML = String.format(
				'<img src="{0}" class="x-menu-item-icon {2}" />{1}', this.icon
						|| Ext.BLANK_IMAGE_URL, this.itemText || this.text,
				this.iconCls || "");
		this.el = c;
		Ext.menu.Item.superclass.onRender.call(this, b, a)
	},
	setText : function(a) {
		this.text = a;
		if (this.rendered) {
			this.el.update(String.format(
					'<img src="{0}" class="x-menu-item-icon {2}">{1}',
					this.icon || Ext.BLANK_IMAGE_URL, this.text, this.iconCls
							|| ""));
			this.parentMenu.autoWidth()
		}
	},
	setIconClass : function(a) {
		var b = this.iconCls;
		this.iconCls = a;
		if (this.rendered) {
			this.el.child("img.x-menu-item-icon").replaceClass(b, this.iconCls)
		}
	},
	beforeDestroy : function() {
		if (this.menu) {
			this.menu.destroy()
		}
		Ext.menu.Item.superclass.beforeDestroy.call(this)
	},
	handleClick : function(a) {
		if (!this.href) {
			a.stopEvent()
		}
		Ext.menu.Item.superclass.handleClick.apply(this, arguments)
	},
	activate : function(a) {
		if (Ext.menu.Item.superclass.activate.apply(this, arguments)) {
			this.focus();
			if (a) {
				this.expandMenu()
			}
		}
		return true
	},
	shouldDeactivate : function(a) {
		if (Ext.menu.Item.superclass.shouldDeactivate.call(this, a)) {
			if (this.menu && this.menu.isVisible()) {
				return !this.menu.getEl().getRegion().contains(a.getPoint())
			}
			return true
		}
		return false
	},
	deactivate : function() {
		Ext.menu.Item.superclass.deactivate.apply(this, arguments);
		this.hideMenu()
	},
	expandMenu : function(a) {
		if (!this.disabled && this.menu) {
			clearTimeout(this.hideTimer);
			delete this.hideTimer;
			if (!this.menu.isVisible() && !this.showTimer) {
				this.showTimer = this.deferExpand.defer(this.showDelay, this,
						[a])
			} else {
				if (this.menu.isVisible() && a) {
					this.menu.tryActivate(0, 1)
				}
			}
		}
	},
	deferExpand : function(a) {
		delete this.showTimer;
		this.menu.show(this.container,
				this.parentMenu.subMenuAlign || "tl-tr?", this.parentMenu);
		if (a) {
			this.menu.tryActivate(0, 1)
		}
	},
	hideMenu : function() {
		clearTimeout(this.showTimer);
		delete this.showTimer;
		if (!this.hideTimer && this.menu && this.menu.isVisible()) {
			this.hideTimer = this.deferHide.defer(this.hideDelay, this)
		}
	},
	deferHide : function() {
		delete this.hideTimer;
		if (this.menu.over) {
			this.parentMenu.setActiveItem(this, false)
		} else {
			this.menu.hide()
		}
	}
});
Ext.menu.CheckItem = function(a) {
	Ext.menu.CheckItem.superclass.constructor.call(this, a);
	this.addEvents("beforecheckchange", "checkchange");
	if (this.checkHandler) {
		this.on("checkchange", this.checkHandler, this.scope)
	}
	Ext.menu.MenuMgr.registerCheckable(this)
};
Ext
		.extend(
				Ext.menu.CheckItem,
				Ext.menu.Item,
				{
					itemCls : "x-menu-item x-menu-check-item",
					groupClass : "x-menu-group-item",
					checked : false,
					ctype : "Ext.menu.CheckItem",
					onRender : function(a) {
						Ext.menu.CheckItem.superclass.onRender.apply(this,
								arguments);
						if (this.group) {
							this.el.addClass(this.groupClass)
						}
						if (this.checked) {
							this.checked = false;
							this.setChecked(true, true)
						}
					},
					destroy : function() {
						Ext.menu.MenuMgr.unregisterCheckable(this);
						Ext.menu.CheckItem.superclass.destroy.apply(this,
								arguments)
					},
					setChecked : function(b, a) {
						if (this.checked != b
								&& this.fireEvent("beforecheckchange", this, b) !== false) {
							if (this.container) {
								this.container[b ? "addClass" : "removeClass"]("x-menu-item-checked")
							}
							this.checked = b;
							if (a !== true) {
								this.fireEvent("checkchange", this, b)
							}
						}
					},
					handleClick : function(a) {
						if (!this.disabled && !(this.checked && this.group)) {
							this.setChecked(!this.checked)
						}
						Ext.menu.CheckItem.superclass.handleClick.apply(this,
								arguments)
					}
				});
Ext.menu.Adapter = function(b, a) {
	Ext.menu.Adapter.superclass.constructor.call(this, a);
	this.component = b
};
Ext.extend(Ext.menu.Adapter, Ext.menu.BaseItem, {
	canActivate : true,
	onRender : function(b, a) {
		this.component.render(b);
		this.el = this.component.getEl()
	},
	activate : function() {
		if (this.disabled) {
			return false
		}
		this.component.focus();
		this.fireEvent("activate", this);
		return true
	},
	deactivate : function() {
		this.fireEvent("deactivate", this)
	},
	disable : function() {
		this.component.disable();
		Ext.menu.Adapter.superclass.disable.call(this)
	},
	enable : function() {
		this.component.enable();
		Ext.menu.Adapter.superclass.enable.call(this)
	}
});
Ext.menu.DateItem = function(a) {
	Ext.menu.DateItem.superclass.constructor.call(this, new Ext.DatePicker(a),
			a);
	this.picker = this.component;
	this.addEvents("select");
	this.picker.on("render", function(b) {
		b.getEl().swallowEvent("click");
		b.container.addClass("x-menu-date-item")
	});
	this.picker.on("select", this.onSelect, this)
};
Ext.extend(Ext.menu.DateItem, Ext.menu.Adapter, {
	onSelect : function(b, a) {
		this.fireEvent("select", this, a, b);
		Ext.menu.DateItem.superclass.handleClick.call(this)
	}
});
Ext.menu.ColorItem = function(a) {
	Ext.menu.ColorItem.superclass.constructor.call(this,
			new Ext.ColorPalette(a), a);
	this.palette = this.component;
	this.relayEvents(this.palette, ["select"]);
	if (this.selectHandler) {
		this.on("select", this.selectHandler, this.scope)
	}
};
Ext.extend(Ext.menu.ColorItem, Ext.menu.Adapter);
Ext.menu.DateMenu = function(a) {
	Ext.menu.DateMenu.superclass.constructor.call(this, a);
	this.plain = true;
	var b = new Ext.menu.DateItem(a);
	this.add(b);
	this.picker = b.picker;
	this.relayEvents(b, ["select"]);
	this.on("beforeshow", function() {
		if (this.picker) {
			this.picker.hideMonthPicker(true)
		}
	}, this)
};
Ext.extend(Ext.menu.DateMenu, Ext.menu.Menu, {
	cls : "x-date-menu",
	beforeDestroy : function() {
		this.picker.destroy()
	}
});
Ext.menu.ColorMenu = function(a) {
	Ext.menu.ColorMenu.superclass.constructor.call(this, a);
	this.plain = true;
	var b = new Ext.menu.ColorItem(a);
	this.add(b);
	this.palette = b.palette;
	this.relayEvents(b, ["select"])
};
Ext.extend(Ext.menu.ColorMenu, Ext.menu.Menu, {
	beforeDestroy : function() {
		this.palette.destroy()
	}
});
Ext.form.Field = Ext.extend(Ext.BoxComponent, {
	invalidClass : "x-form-invalid",
	invalidText : "The value in this field is invalid",
	focusClass : "x-form-focus",
	validationEvent : "keyup",
	validateOnBlur : true,
	validationDelay : 250,
	defaultAutoCreate : {
		tag : "input",
		type : "text",
		size : "20",
		autocomplete : "off"
	},
	fieldClass : "x-form-field",
	msgTarget : "qtip",
	msgFx : "normal",
	readOnly : false,
	disabled : false,
	isFormField : true,
	hasFocus : false,
	initComponent : function() {
		Ext.form.Field.superclass.initComponent.call(this);
		this.addEvents("focus", "blur", "specialkey", "change", "invalid",
				"valid")
	},
	getName : function() {
		return this.rendered && this.el.dom.name
				? this.el.dom.name
				: (this.hiddenName || "")
	},
	onRender : function(c, a) {
		Ext.form.Field.superclass.onRender.call(this, c, a);
		if (!this.el) {
			var b = this.getAutoCreate();
			if (!b.name) {
				b.name = this.name || this.id
			}
			if (this.inputType) {
				b.type = this.inputType
			}
			this.el = c.createChild(b, a)
		}
		var d = this.el.dom.type;
		if (d) {
			if (d == "password") {
				d = "text"
			}
			this.el.addClass("x-form-" + d)
		}
		if (this.readOnly) {
			this.el.dom.readOnly = true
		}
		if (this.tabIndex !== undefined) {
			this.el.dom.setAttribute("tabIndex", this.tabIndex)
		}
		this.el.addClass([this.fieldClass, this.cls])
	},
	initValue : function() {
		if (this.value !== undefined) {
			this.setValue(this.value)
		} else {
			if (this.el.dom.value.length > 0
					&& this.el.dom.value != this.emptyText) {
				this.setValue(this.el.dom.value)
			}
		}
		this.originalValue = this.getValue()
	},
	isDirty : function() {
		if (this.disabled) {
			return false
		}
		return String(this.getValue()) !== String(this.originalValue)
	},
	afterRender : function() {
		Ext.form.Field.superclass.afterRender.call(this);
		this.initEvents();
		this.initValue()
	},
	fireKey : function(a) {
		if (a.isSpecialKey()) {
			this.fireEvent("specialkey", this, a)
		}
	},
	reset : function() {
		this.setValue(this.originalValue);
		this.clearInvalid()
	},
	initEvents : function() {
		this.el.on(Ext.isIE || Ext.isSafari3 ? "keydown" : "keypress",
				this.fireKey, this);
		this.el.on("focus", this.onFocus, this);
		var a = this.inEditor && Ext.isWindows && Ext.isGecko ? {
			buffer : 10
		} : null;
		this.el.on("blur", this.onBlur, this, a)
	},
	onFocus : function() {
		if (this.focusClass) {
			this.el.addClass(this.focusClass)
		}
		if (!this.hasFocus) {
			this.hasFocus = true;
			this.startValue = this.getValue();
			this.fireEvent("focus", this)
		}
	},
	beforeBlur : Ext.emptyFn,
	onBlur : function() {
		this.beforeBlur();
		if (this.focusClass) {
			this.el.removeClass(this.focusClass)
		}
		this.hasFocus = false;
		if (this.validationEvent !== false && this.validateOnBlur
				&& this.validationEvent != "blur") {
			this.validate()
		}
		var a = this.getValue();
		if (String(a) !== String(this.startValue)) {
			this.fireEvent("change", this, a, this.startValue)
		}
		this.fireEvent("blur", this)
	},
	isValid : function(a) {
		if (this.disabled) {
			return true
		}
		var c = this.preventMark;
		this.preventMark = a === true;
		var b = this.validateValue(this.processValue(this.getRawValue()));
		this.preventMark = c;
		return b
	},
	validate : function() {
		if (this.disabled
				|| this.validateValue(this.processValue(this.getRawValue()))) {
			this.clearInvalid();
			return true
		}
		return false
	},
	processValue : function(a) {
		return a
	},
	validateValue : function(a) {
		return true
	},
	markInvalid : function(c) {
		if (!this.rendered || this.preventMark) {
			return
		}
		this.el.addClass(this.invalidClass);
		c = c || this.invalidText;
		switch (this.msgTarget) {
			case "qtip" :
				this.el.dom.qtip = c;
				this.el.dom.qclass = "x-form-invalid-tip";
				if (Ext.QuickTips) {
					Ext.QuickTips.enable()
				}
				break;
			case "title" :
				this.el.dom.title = c;
				break;
			case "under" :
				if (!this.errorEl) {
					var b = this.getErrorCt();
					if (!b) {
						this.el.dom.title = c;
						break
					}
					this.errorEl = b.createChild( {
						cls : "x-form-invalid-msg"
					});
					this.errorEl.setWidth(b.getWidth(true) - 20)
				}
				this.errorEl.update(c);
				Ext.form.Field.msgFx[this.msgFx].show(this.errorEl, this);
				break;
			case "side" :
				if (!this.errorIcon) {
					var b = this.getErrorCt();
					if (!b) {
						this.el.dom.title = c;
						break
					}
					this.errorIcon = b.createChild( {
						cls : "x-form-invalid-icon"
					})
				}
				this.alignErrorIcon();
				this.errorIcon.dom.qtip = c;
				this.errorIcon.dom.qclass = "x-form-invalid-tip";
				this.errorIcon.show();
				this.on("resize", this.alignErrorIcon, this);
				break;
			default :
				var a = Ext.getDom(this.msgTarget);
				a.innerHTML = c;
				a.style.display = this.msgDisplay;
				break
		}
		this.fireEvent("invalid", this, c)
	},
	getErrorCt : function() {
		return this.el.findParent(".x-form-element", 5, true)
				|| this.el.findParent(".x-form-field-wrap", 5, true)
	},
	alignErrorIcon : function() {
		this.errorIcon.alignTo(this.el, "tl-tr", [2, 0])
	},
	clearInvalid : function() {
		if (!this.rendered || this.preventMark) {
			return
		}
		this.el.removeClass(this.invalidClass);
		switch (this.msgTarget) {
			case "qtip" :
				this.el.dom.qtip = "";
				break;
			case "title" :
				this.el.dom.title = "";
				break;
			case "under" :
				if (this.errorEl) {
					Ext.form.Field.msgFx[this.msgFx].hide(this.errorEl, this)
				}
				break;
			case "side" :
				if (this.errorIcon) {
					this.errorIcon.dom.qtip = "";
					this.errorIcon.hide();
					this.un("resize", this.alignErrorIcon, this)
				}
				break;
			default :
				var a = Ext.getDom(this.msgTarget);
				a.innerHTML = "";
				a.style.display = "none";
				break
		}
		this.fireEvent("valid", this)
	},
	getRawValue : function() {
		var a = this.rendered ? this.el.getValue() : Ext.value(this.value, "");
		if (a === this.emptyText) {
			a = ""
		}
		return a
	},
	getValue : function() {
		if (!this.rendered) {
			return this.value
		}
		var a = this.el.getValue();
		if (a === this.emptyText || a === undefined) {
			a = ""
		}
		return a
	},
	setRawValue : function(a) {
		return this.el.dom.value = (a === null || a === undefined ? "" : a)
	},
	setValue : function(a) {
		this.value = a;
		if (this.rendered) {
			this.el.dom.value = (a === null || a === undefined ? "" : a);
			this.validate()
		}
	},
	adjustSize : function(a, c) {
		var b = Ext.form.Field.superclass.adjustSize.call(this, a, c);
		b.width = this.adjustWidth(this.el.dom.tagName, b.width);
		return b
	},
	adjustWidth : function(a, b) {
		a = a.toLowerCase();
		if (typeof b == "number" && !Ext.isSafari) {
			if (Ext.isIE && (a == "input" || a == "textarea")) {
				if (a == "input" && !Ext.isStrict) {
					return this.inEditor ? b : b - 3
				}
				if (a == "input" && Ext.isStrict) {
					return b - (Ext.isIE6 ? 4 : 1)
				}
				if (a == "textarea" && Ext.isStrict) {
					return b - 2
				}
			} else {
				if (Ext.isOpera && Ext.isStrict) {
					if (a == "input") {
						return b + 2
					}
					if (a == "textarea") {
						return b - 2
					}
				}
			}
		}
		return b
	}
});
Ext.form.MessageTargets = {
	qtip : {
		mark : function(a) {
			this.el.dom.qtip = msg;
			this.el.dom.qclass = "x-form-invalid-tip";
			if (Ext.QuickTips) {
				Ext.QuickTips.enable()
			}
		},
		clear : function(a) {
			this.el.dom.qtip = ""
		}
	},
	title : {
		mark : function(a) {
			this.el.dom.title = msg
		},
		clear : function(a) {
			this.el.dom.title = ""
		}
	},
	under : {
		mark : function(b) {
			if (!this.errorEl) {
				var a = this.getErrorCt();
				if (!a) {
					this.el.dom.title = msg;
					return
				}
				this.errorEl = a.createChild( {
					cls : "x-form-invalid-msg"
				});
				this.errorEl.setWidth(a.getWidth(true) - 20)
			}
			this.errorEl.update(msg);
			Ext.form.Field.msgFx[this.msgFx].show(this.errorEl, this)
		},
		clear : function(a) {
			if (this.errorEl) {
				Ext.form.Field.msgFx[this.msgFx].hide(this.errorEl, this)
			} else {
				this.el.dom.title = ""
			}
		}
	},
	side : {
		mark : function(b) {
			if (!this.errorIcon) {
				var a = this.getErrorCt();
				if (!a) {
					this.el.dom.title = msg;
					return
				}
				this.errorIcon = a.createChild( {
					cls : "x-form-invalid-icon"
				})
			}
			this.alignErrorIcon();
			this.errorIcon.dom.qtip = msg;
			this.errorIcon.dom.qclass = "x-form-invalid-tip";
			this.errorIcon.show();
			this.on("resize", this.alignErrorIcon, this)
		},
		clear : function(a) {
			if (this.errorIcon) {
				this.errorIcon.dom.qtip = "";
				this.errorIcon.hide();
				this.un("resize", this.alignErrorIcon, this)
			} else {
				this.el.dom.title = ""
			}
		}
	},
	around : {
		mark : function(a) {
		},
		clear : function(a) {
		}
	}
};
Ext.form.Field.msgFx = {
	normal : {
		show : function(a, b) {
			a.setDisplayed("block")
		},
		hide : function(a, b) {
			a.setDisplayed(false).update("")
		}
	},
	slide : {
		show : function(a, b) {
			a.slideIn("t", {
				stopFx : true
			})
		},
		hide : function(a, b) {
			a.slideOut("t", {
				stopFx : true,
				useDisplay : true
			})
		}
	},
	slideRight : {
		show : function(a, b) {
			a.fixDisplay();
			a.alignTo(b.el, "tl-tr");
			a.slideIn("l", {
				stopFx : true
			})
		},
		hide : function(a, b) {
			a.slideOut("l", {
				stopFx : true,
				useDisplay : true
			})
		}
	}
};
Ext.reg("field", Ext.form.Field);
Ext.form.TextField = Ext
		.extend(
				Ext.form.Field,
				{
					grow : false,
					growMin : 30,
					growMax : 800,
					vtype : null,
					maskRe : null,
					disableKeyFilter : false,
					allowBlank : true,
					minLength : 0,
					maxLength : Number.MAX_VALUE,
					minLengthText : "The minimum length for this field is {0}",
					maxLengthText : "The maximum length for this field is {0}",
					selectOnFocus : false,
					blankText : "This field is required",
					validator : null,
					regex : null,
					regexText : "",
					emptyText : null,
					emptyClass : "x-form-empty-field",
					initComponent : function() {
						Ext.form.TextField.superclass.initComponent.call(this);
						this.addEvents("autosize", "keydown", "keyup",
								"keypress")
					},
					initEvents : function() {
						Ext.form.TextField.superclass.initEvents.call(this);
						if (this.validationEvent == "keyup") {
							this.validationTask = new Ext.util.DelayedTask(
									this.validate, this);
							this.el.on("keyup", this.filterValidation, this)
						} else {
							if (this.validationEvent !== false) {
								this.el.on(this.validationEvent, this.validate,
										this, {
											buffer : this.validationDelay
										})
							}
						}
						if (this.selectOnFocus || this.emptyText) {
							this.on("focus", this.preFocus, this);
							this.el.on("mousedown", function() {
								if (!this.hasFocus) {
									this.el.on("mouseup", function(a) {
										a.preventDefault()
									}, this, {
										single : true
									})
								}
							}, this);
							if (this.emptyText) {
								this.on("blur", this.postBlur, this);
								this.applyEmptyText()
							}
						}
						if (this.maskRe
								|| (this.vtype
										&& this.disableKeyFilter !== true && (this.maskRe = Ext.form.VTypes[this.vtype
										+ "Mask"]))) {
							this.el.on("keypress", this.filterKeys, this)
						}
						if (this.grow) {
							this.el.on("keyup", this.onKeyUpBuffered, this, {
								buffer : 50
							});
							this.el.on("click", this.autoSize, this)
						}
						if (this.enableKeyEvents) {
							this.el.on("keyup", this.onKeyUp, this);
							this.el.on("keydown", this.onKeyDown, this);
							this.el.on("keypress", this.onKeyPress, this)
						}
					},
					processValue : function(a) {
						if (this.stripCharsRe) {
							var b = a.replace(this.stripCharsRe, "");
							if (b !== a) {
								this.setRawValue(b);
								return b
							}
						}
						return a
					},
					filterValidation : function(a) {
						if (!a.isNavKeyPress()) {
							this.validationTask.delay(this.validationDelay)
						}
					},
					onDisable : function() {
						Ext.form.TextField.superclass.onDisable.call(this);
						if (Ext.isIE) {
							this.el.dom.unselectable = "on"
						}
					},
					onEnable : function() {
						Ext.form.TextField.superclass.onEnable.call(this);
						if (Ext.isIE) {
							this.el.dom.unselectable = ""
						}
					},
					onKeyUpBuffered : function(a) {
						if (!a.isNavKeyPress()) {
							this.autoSize()
						}
					},
					onKeyUp : function(a) {
						this.fireEvent("keyup", this, a)
					},
					onKeyDown : function(a) {
						this.fireEvent("keydown", this, a)
					},
					onKeyPress : function(a) {
						this.fireEvent("keypress", this, a)
					},
					reset : function() {
						Ext.form.TextField.superclass.reset.call(this);
						this.applyEmptyText()
					},
					applyEmptyText : function() {
						if (this.rendered && this.emptyText
								&& this.getRawValue().length < 1
								&& !this.hasFocus) {
							this.setRawValue(this.emptyText);
							this.el.addClass(this.emptyClass)
						}
					},
					preFocus : function() {
						if (this.emptyText) {
							if (this.el.dom.value == this.emptyText) {
								this.setRawValue("")
							}
							this.el.removeClass(this.emptyClass)
						}
						if (this.selectOnFocus) {
							this.el.dom.select()
						}
					},
					postBlur : function() {
						this.applyEmptyText()
					},
					filterKeys : function(b) {
						if (b.ctrlKey) {
							return
						}
						var a = b.getKey();
						if (Ext.isGecko
								&& (b.isNavKeyPress() || a == b.BACKSPACE || (a == b.DELETE && b.button == -1))) {
							return
						}
						var g = b.getCharCode(), d = String.fromCharCode(g);
						if (!Ext.isGecko && b.isSpecialKey() && !d) {
							return
						}
						if (!this.maskRe.test(d)) {
							b.stopEvent()
						}
					},
					setValue : function(a) {
						if (this.emptyText && this.el && a !== undefined
								&& a !== null && a !== "") {
							this.el.removeClass(this.emptyClass)
						}
						Ext.form.TextField.superclass.setValue.apply(this,
								arguments);
						this.applyEmptyText();
						this.autoSize()
					},
					validateValue : function(a) {
						if (a.length < 1 || a === this.emptyText) {
							if (this.allowBlank) {
								this.clearInvalid();
								return true
							} else {
								this.markInvalid(this.blankText);
								return false
							}
						}
						if (a.length < this.minLength) {
							this.markInvalid(String.format(this.minLengthText,
									this.minLength));
							return false
						}
						if (a.length > this.maxLength) {
							this.markInvalid(String.format(this.maxLengthText,
									this.maxLength));
							return false
						}
						if (this.vtype) {
							var c = Ext.form.VTypes;
							if (!c[this.vtype](a, this)) {
								this.markInvalid(this.vtypeText
										|| c[this.vtype + "Text"]);
								return false
							}
						}
						if (typeof this.validator == "function") {
							var b = this.validator(a);
							if (b !== true) {
								this.markInvalid(b);
								return false
							}
						}
						if (this.regex && !this.regex.test(a)) {
							this.markInvalid(this.regexText);
							return false
						}
						return true
					},
					selectText : function(h, a) {
						var c = this.getRawValue();
						var e = false;
						if (c.length > 0) {
							h = h === undefined ? 0 : h;
							a = a === undefined ? c.length : a;
							var g = this.el.dom;
							if (g.setSelectionRange) {
								g.setSelectionRange(h, a)
							} else {
								if (g.createTextRange) {
									var b = g.createTextRange();
									b.moveStart("character", h);
									b.moveEnd("character", a - c.length);
									b.select()
								}
							}
							e = Ext.isGecko || Ext.isOpera
						} else {
							e = true
						}
						if (e) {
							this.focus()
						}
					},
					autoSize : function() {
						if (!this.grow || !this.rendered) {
							return
						}
						if (!this.metrics) {
							this.metrics = Ext.util.TextMetrics
									.createInstance(this.el)
						}
						var c = this.el;
						var b = c.dom.value;
						var e = document.createElement("div");
						e.appendChild(document.createTextNode(b));
						b = e.innerHTML;
						Ext.removeNode(e);
						e = null;
						b += "&#160;";
						var a = Math.min(this.growMax, Math.max(this.metrics
								.getWidth(b)
								+ 10, this.growMin));
						this.el.setWidth(a);
						this.fireEvent("autosize", this, a)
					}
				});
Ext.reg("textfield", Ext.form.TextField);
Ext.form.TriggerField = Ext.extend(Ext.form.TextField, {
	defaultAutoCreate : {
		tag : "input",
		type : "text",
		size : "16",
		autocomplete : "off"
	},
	hideTrigger : false,
	autoSize : Ext.emptyFn,
	monitorTab : true,
	deferHeight : true,
	mimicing : false,
	onResize : function(a, b) {
		Ext.form.TriggerField.superclass.onResize.call(this, a, b);
		if (typeof a == "number") {
			this.el.setWidth(this.adjustWidth("input", a
					- this.trigger.getWidth()))
		}
		this.wrap.setWidth(this.el.getWidth() + this.trigger.getWidth())
	},
	adjustSize : Ext.BoxComponent.prototype.adjustSize,
	getResizeEl : function() {
		return this.wrap
	},
	getPositionEl : function() {
		return this.wrap
	},
	alignErrorIcon : function() {
		if (this.wrap) {
			this.errorIcon.alignTo(this.wrap, "tl-tr", [2, 0])
		}
	},
	onRender : function(b, a) {
		Ext.form.TriggerField.superclass.onRender.call(this, b, a);
		this.wrap = this.el.wrap( {
			cls : "x-form-field-wrap"
		});
		this.trigger = this.wrap.createChild(this.triggerConfig || {
			tag : "img",
			src : Ext.BLANK_IMAGE_URL,
			cls : "x-form-trigger " + this.triggerClass
		});
		if (this.hideTrigger) {
			this.trigger.setDisplayed(false)
		}
		this.initTrigger();
		if (!this.width) {
			this.wrap.setWidth(this.el.getWidth() + this.trigger.getWidth())
		}
	},
	afterRender : function() {
		Ext.form.TriggerField.superclass.afterRender.call(this);
		var a;
		if (Ext.isIE && !this.hideTrigger
				&& this.el.getY() != (a = this.trigger.getY())) {
			this.el.position();
			this.el.setY(a)
		}
	},
	initTrigger : function() {
		this.trigger.on("click", this.onTriggerClick, this, {
			preventDefault : true
		});
		this.trigger.addClassOnOver("x-form-trigger-over");
		this.trigger.addClassOnClick("x-form-trigger-click")
	},
	onDestroy : function() {
		if (this.trigger) {
			this.trigger.removeAllListeners();
			this.trigger.remove()
		}
		if (this.wrap) {
			this.wrap.remove()
		}
		Ext.form.TriggerField.superclass.onDestroy.call(this)
	},
	onFocus : function() {
		Ext.form.TriggerField.superclass.onFocus.call(this);
		if (!this.mimicing) {
			this.wrap.addClass("x-trigger-wrap-focus");
			this.mimicing = true;
			Ext.get(Ext.isIE ? document.body : document).on("mousedown",
					this.mimicBlur, this, {
						delay : 10
					});
			if (this.monitorTab) {
				this.el.on("keydown", this.checkTab, this)
			}
		}
	},
	checkTab : function(a) {
		if (a.getKey() == a.TAB) {
			this.triggerBlur()
		}
	},
	onBlur : function() {
	},
	mimicBlur : function(a) {
		if (!this.wrap.contains(a.target) && this.validateBlur(a)) {
			this.triggerBlur()
		}
	},
	triggerBlur : function() {
		this.mimicing = false;
		Ext.get(Ext.isIE ? document.body : document).un("mousedown",
				this.mimicBlur, this);
		if (this.monitorTab && this.el) {
			this.el.un("keydown", this.checkTab, this)
		}
		this.beforeBlur();
		if (this.wrap) {
			this.wrap.removeClass("x-trigger-wrap-focus")
		}
		Ext.form.TriggerField.superclass.onBlur.call(this)
	},
	beforeBlur : Ext.emptyFn,
	validateBlur : function(a) {
		return true
	},
	onDisable : function() {
		Ext.form.TriggerField.superclass.onDisable.call(this);
		if (this.wrap) {
			this.wrap.addClass(this.disabledClass);
			this.el.removeClass(this.disabledClass)
		}
	},
	onEnable : function() {
		Ext.form.TriggerField.superclass.onEnable.call(this);
		if (this.wrap) {
			this.wrap.removeClass(this.disabledClass)
		}
	},
	onShow : function() {
		if (this.wrap) {
			this.wrap.dom.style.display = "";
			this.wrap.dom.style.visibility = "visible"
		}
	},
	onHide : function() {
		this.wrap.dom.style.display = "none"
	},
	onTriggerClick : Ext.emptyFn
});
Ext.form.TwinTriggerField = Ext.extend(Ext.form.TriggerField, {
	initComponent : function() {
		Ext.form.TwinTriggerField.superclass.initComponent.call(this);
		this.triggerConfig = {
			tag : "span",
			cls : "x-form-twin-triggers",
			cn : [ {
				tag : "img",
				src : Ext.BLANK_IMAGE_URL,
				cls : "x-form-trigger " + this.trigger1Class
			}, {
				tag : "img",
				src : Ext.BLANK_IMAGE_URL,
				cls : "x-form-trigger " + this.trigger2Class
			}]
		}
	},
	getTrigger : function(a) {
		return this.triggers[a]
	},
	initTrigger : function() {
		var a = this.trigger.select(".x-form-trigger", true);
		this.wrap.setStyle("overflow", "hidden");
		var b = this;
		a.each(function(d, g, c) {
			d.hide = function() {
				var h = b.wrap.getWidth();
				this.dom.style.display = "none";
				b.el.setWidth(h - b.trigger.getWidth())
			};
			d.show = function() {
				var h = b.wrap.getWidth();
				this.dom.style.display = "";
				b.el.setWidth(h - b.trigger.getWidth())
			};
			var e = "Trigger" + (c + 1);
			if (this["hide" + e]) {
				d.dom.style.display = "none"
			}
			d.on("click", this["on" + e + "Click"], this, {
				preventDefault : true
			});
			d.addClassOnOver("x-form-trigger-over");
			d.addClassOnClick("x-form-trigger-click")
		}, this);
		this.triggers = a.elements
	},
	onTrigger1Click : Ext.emptyFn,
	onTrigger2Click : Ext.emptyFn
});
Ext.reg("trigger", Ext.form.TriggerField);
Ext.form.TextArea = Ext.extend(Ext.form.TextField, {
	growMin : 60,
	growMax : 1000,
	growAppend : "&#160;\n&#160;",
	growPad : 0,
	enterIsSpecial : false,
	preventScrollbars : false,
	onRender : function(b, a) {
		if (!this.el) {
			this.defaultAutoCreate = {
				tag : "textarea",
				style : "width:100px;height:60px;",
				autocomplete : "off"
			}
		}
		Ext.form.TextArea.superclass.onRender.call(this, b, a);
		if (this.grow) {
			this.textSizeEl = Ext.DomHelper.append(document.body, {
				tag : "pre",
				cls : "x-form-grow-sizer"
			});
			if (this.preventScrollbars) {
				this.el.setStyle("overflow", "hidden")
			}
			this.el.setHeight(this.growMin)
		}
	},
	onDestroy : function() {
		if (this.textSizeEl) {
			Ext.removeNode(this.textSizeEl)
		}
		Ext.form.TextArea.superclass.onDestroy.call(this)
	},
	fireKey : function(a) {
		if (a.isSpecialKey()
				&& (this.enterIsSpecial || (a.getKey() != a.ENTER || a
						.hasModifier()))) {
			this.fireEvent("specialkey", this, a)
		}
	},
	onKeyUp : function(a) {
		if (!a.isNavKeyPress() || a.getKey() == a.ENTER) {
			this.autoSize()
		}
		Ext.form.TextArea.superclass.onKeyUp.call(this, a)
	},
	autoSize : function() {
		if (!this.grow || !this.textSizeEl) {
			return
		}
		var c = this.el;
		var a = c.dom.value;
		var d = this.textSizeEl;
		d.innerHTML = "";
		d.appendChild(document.createTextNode(a));
		a = d.innerHTML;
		Ext.fly(d).setWidth(this.el.getWidth());
		if (a.length < 1) {
			a = "&#160;&#160;"
		} else {
			if (Ext.isIE) {
				a = a.replace(/\n/g, "<p>&#160;</p>")
			}
			a += this.growAppend
		}
		d.innerHTML = a;
		var b = Math.min(this.growMax, Math.max(d.offsetHeight, this.growMin)
				+ this.growPad);
		if (b != this.lastHeight) {
			this.lastHeight = b;
			this.el.setHeight(b);
			this.fireEvent("autosize", this, b)
		}
	}
});
Ext.reg("textarea", Ext.form.TextArea);
Ext.form.NumberField = Ext
		.extend(
				Ext.form.TextField,
				{
					fieldClass : "x-form-field x-form-num-field",
					allowDecimals : true,
					decimalSeparator : ".",
					decimalPrecision : 2,
					allowNegative : true,
					minValue : Number.NEGATIVE_INFINITY,
					maxValue : Number.MAX_VALUE,
					minText : "The minimum value for this field is {0}",
					maxText : "The maximum value for this field is {0}",
					nanText : "{0} is not a valid number",
					baseChars : "0123456789",
					initEvents : function() {
						Ext.form.NumberField.superclass.initEvents.call(this);
						var b = this.baseChars + "";
						if (this.allowDecimals) {
							b += this.decimalSeparator
						}
						if (this.allowNegative) {
							b += "-"
						}
						this.stripCharsRe = new RegExp("[^" + b + "]", "gi");
						var a = function(g) {
							var d = g.getKey();
							if (!Ext.isIE
									&& (g.isSpecialKey() || d == g.BACKSPACE || d == g.DELETE)) {
								return
							}
							var h = g.getCharCode();
							if (b.indexOf(String.fromCharCode(h)) === -1) {
								g.stopEvent()
							}
						};
						this.el.on("keypress", a, this)
					},
					validateValue : function(b) {
						if (!Ext.form.NumberField.superclass.validateValue
								.call(this, b)) {
							return false
						}
						if (b.length < 1) {
							return true
						}
						b = String(b).replace(this.decimalSeparator, ".");
						if (isNaN(b)) {
							this.markInvalid(String.format(this.nanText, b));
							return false
						}
						var a = this.parseValue(b);
						if (a < this.minValue) {
							this.markInvalid(String.format(this.minText,
									this.minValue));
							return false
						}
						if (a > this.maxValue) {
							this.markInvalid(String.format(this.maxText,
									this.maxValue));
							return false
						}
						return true
					},
					getValue : function() {
						return this
								.fixPrecision(this
										.parseValue(Ext.form.NumberField.superclass.getValue
												.call(this)))
					},
					setValue : function(a) {
						a = typeof a == "number" ? a : parseFloat(String(a)
								.replace(this.decimalSeparator, "."));
						a = isNaN(a) ? "" : String(a).replace(".",
								this.decimalSeparator);
						Ext.form.NumberField.superclass.setValue.call(this, a)
					},
					parseValue : function(a) {
						a = parseFloat(String(a).replace(this.decimalSeparator,
								"."));
						return isNaN(a) ? "" : a
					},
					fixPrecision : function(b) {
						var a = isNaN(b);
						if (!this.allowDecimals || this.decimalPrecision == -1
								|| a || !b) {
							return a ? "" : b
						}
						return parseFloat(parseFloat(b)
								.toFixed(this.decimalPrecision))
					},
					beforeBlur : function() {
						var a = this.parseValue(this.getRawValue());
						if (a || a === 0) {
							this.setValue(this.fixPrecision(a))
						}
					}
				});
Ext.reg("numberfield", Ext.form.NumberField);
Ext.form.DateField = Ext
		.extend(
				Ext.form.TriggerField,
				{
					format : "m/d/Y",
					altFormats : "m/d/Y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d",
					disabledDaysText : "Disabled",
					disabledDatesText : "Disabled",
					minText : "The date in this field must be equal to or after {0}",
					maxText : "The date in this field must be equal to or before {0}",
					invalidText : "{0} is not a valid date - it must be in the format {1}",
					triggerClass : "x-form-date-trigger",
					showToday : true,
					defaultAutoCreate : {
						tag : "input",
						type : "text",
						size : "10",
						autocomplete : "off"
					},
					initComponent : function() {
						Ext.form.DateField.superclass.initComponent.call(this);
						this.addEvents("select");
						if (typeof this.minValue == "string") {
							this.minValue = this.parseDate(this.minValue)
						}
						if (typeof this.maxValue == "string") {
							this.maxValue = this.parseDate(this.maxValue)
						}
						this.disabledDatesRE = null;
						this.initDisabledDays()
					},
					initDisabledDays : function() {
						if (this.disabledDates) {
							var a = this.disabledDates;
							var c = "(?:";
							for (var b = 0;b < a.length; b++) {
								c += a[b];
								if (b != a.length - 1) {
									c += "|"
								}
							}
							this.disabledDatesRE = new RegExp(c + ")")
						}
					},
					setDisabledDates : function(a) {
						this.disabledDates = a;
						this.initDisabledDays();
						if (this.menu) {
							this.menu.picker
									.setDisabledDates(this.disabledDatesRE)
						}
					},
					setDisabledDays : function(a) {
						this.disabledDays = a;
						if (this.menu) {
							this.menu.picker.setDisabledDays(a)
						}
					},
					setMinValue : function(a) {
						this.minValue = (typeof a == "string" ? this
								.parseDate(a) : a);
						if (this.menu) {
							this.menu.picker.setMinDate(this.minValue)
						}
					},
					setMaxValue : function(a) {
						this.maxValue = (typeof a == "string" ? this
								.parseDate(a) : a);
						if (this.menu) {
							this.menu.picker.setMaxDate(this.maxValue)
						}
					},
					validateValue : function(e) {
						e = this.formatDate(e);
						if (!Ext.form.DateField.superclass.validateValue.call(
								this, e)) {
							return false
						}
						if (e.length < 1) {
							return true
						}
						var c = e;
						e = this.parseDate(e);
						if (!e) {
							this.markInvalid(String.format(this.invalidText, c,
									this.format));
							return false
						}
						var g = e.getTime();
						if (this.minValue && g < this.minValue.getTime()) {
							this.markInvalid(String.format(this.minText, this
									.formatDate(this.minValue)));
							return false
						}
						if (this.maxValue && g > this.maxValue.getTime()) {
							this.markInvalid(String.format(this.maxText, this
									.formatDate(this.maxValue)));
							return false
						}
						if (this.disabledDays) {
							var a = e.getDay();
							for (var b = 0;b < this.disabledDays.length; b++) {
								if (a === this.disabledDays[b]) {
									this.markInvalid(this.disabledDaysText);
									return false
								}
							}
						}
						var d = this.formatDate(e);
						if (this.disabledDatesRE
								&& this.disabledDatesRE.test(d)) {
							this.markInvalid(String.format(
									this.disabledDatesText, d));
							return false
						}
						return true
					},
					validateBlur : function() {
						return !this.menu || !this.menu.isVisible()
					},
					getValue : function() {
						return this
								.parseDate(Ext.form.DateField.superclass.getValue
										.call(this))
								|| ""
					},
					setValue : function(a) {
						Ext.form.DateField.superclass.setValue.call(this, this
								.formatDate(this.parseDate(a)))
					},
					parseDate : function(d) {
						if (!d || Ext.isDate(d)) {
							return d
						}
						var b = Date.parseDate(d, this.format);
						if (!b && this.altFormats) {
							if (!this.altFormatsArray) {
								this.altFormatsArray = this.altFormats
										.split("|")
							}
							for (var c = 0, a = this.altFormatsArray.length;c < a
									&& !b; c++) {
								b = Date.parseDate(d, this.altFormatsArray[c])
							}
						}
						return b
					},
					onDestroy : function() {
						if (this.menu) {
							this.menu.destroy()
						}
						if (this.wrap) {
							this.wrap.remove()
						}
						Ext.form.DateField.superclass.onDestroy.call(this)
					},
					formatDate : function(a) {
						return Ext.isDate(a) ? a.dateFormat(this.format) : a
					},
					menuListeners : {
						select : function(a, b) {
							this.setValue(b);
							this.fireEvent("select", this, b)
						},
						show : function() {
							this.onFocus()
						},
						hide : function() {
							this.focus.defer(10, this);
							var a = this.menuListeners;
							this.menu.un("select", a.select, this);
							this.menu.un("show", a.show, this);
							this.menu.un("hide", a.hide, this)
						}
					},
					onTriggerClick : function() {
						if (this.disabled) {
							return
						}
						if (this.menu == null) {
							this.menu = new Ext.menu.DateMenu()
						}
						Ext.apply(this.menu.picker, {
							minDate : this.minValue,
							maxDate : this.maxValue,
							disabledDatesRE : this.disabledDatesRE,
							disabledDatesText : this.disabledDatesText,
							disabledDays : this.disabledDays,
							disabledDaysText : this.disabledDaysText,
							format : this.format,
							showToday : this.showToday,
							minText : String.format(this.minText, this
									.formatDate(this.minValue)),
							maxText : String.format(this.maxText, this
									.formatDate(this.maxValue))
						});
						this.menu.on(Ext.apply( {}, this.menuListeners, {
							scope : this
						}));
						this.menu.picker
								.setValue(this.getValue() || new Date());
						this.menu.show(this.el, "tl-bl?")
					},
					beforeBlur : function() {
						var a = this.parseDate(this.getRawValue());
						if (a) {
							this.setValue(a)
						}
					}
				});
Ext.reg("datefield", Ext.form.DateField);
Ext.form.ComboBox = Ext.extend(Ext.form.TriggerField, {
	defaultAutoCreate : {
		tag : "input",
		type : "text",
		size : "24",
		autocomplete : "off"
	},
	listClass : "",
	selectedClass : "x-combo-selected",
	triggerClass : "x-form-arrow-trigger",
	shadow : "sides",
	listAlign : "tl-bl?",
	maxHeight : 300,
	minHeight : 90,
	triggerAction : "query",
	minChars : 4,
	typeAhead : false,
	queryDelay : 500,
	pageSize : 0,
	selectOnFocus : false,
	queryParam : "query",
	loadingText : "Loading...",
	resizable : false,
	handleHeight : 8,
	editable : true,
	allQuery : "",
	mode : "remote",
	minListWidth : 70,
	forceSelection : false,
	typeAheadDelay : 250,
	lazyInit : true,
	initComponent : function() {
		Ext.form.ComboBox.superclass.initComponent.call(this);
		this.addEvents("expand", "collapse", "beforeselect", "select",
				"beforequery");
		if (this.transform) {
			this.allowDomMove = false;
			var c = Ext.getDom(this.transform);
			if (!this.hiddenName) {
				this.hiddenName = c.name
			}
			if (!this.store) {
				this.mode = "local";
				var k = [], e = c.options;
				for (var b = 0, a = e.length;b < a; b++) {
					var h = e[b];
					var g = (Ext.isIE
							? h.getAttributeNode("value").specified
							: h.hasAttribute("value")) ? h.value : h.text;
					if (h.selected) {
						this.value = g
					}
					k.push([g, h.text])
				}
				this.store = new Ext.data.SimpleStore( {
					id : 0,
					fields : ["value", "text"],
					data : k
				});
				this.valueField = "value";
				this.displayField = "text"
			}
			c.name = Ext.id();
			if (!this.lazyRender) {
				this.target = true;
				this.el = Ext.DomHelper.insertBefore(c, this.autoCreate
						|| this.defaultAutoCreate);
				Ext.removeNode(c);
				this.render(this.el.parentNode)
			} else {
				Ext.removeNode(c)
			}
		} else {
			if (Ext.isArray(this.store)) {
				if (Ext.isArray(this.store[0])) {
					this.store = new Ext.data.SimpleStore( {
						fields : ["value", "text"],
						data : this.store
					});
					this.valueField = "value"
				} else {
					this.store = new Ext.data.SimpleStore( {
						fields : ["text"],
						data : this.store,
						expandData : true
					});
					this.valueField = "text"
				}
				this.displayField = "text";
				this.mode = "local"
			}
		}
		this.selectedIndex = -1;
		if (this.mode == "local") {
			if (this.initialConfig.queryDelay === undefined) {
				this.queryDelay = 10
			}
			if (this.initialConfig.minChars === undefined) {
				this.minChars = 0
			}
		}
	},
	onRender : function(b, a) {
		Ext.form.ComboBox.superclass.onRender.call(this, b, a);
		if (this.hiddenName) {
			this.hiddenField = this.el.insertSibling( {
				tag : "input",
				type : "hidden",
				name : this.hiddenName,
				id : (this.hiddenId || this.hiddenName)
			}, "before", true);
			this.el.dom.removeAttribute("name")
		}
		if (Ext.isGecko) {
			this.el.dom.setAttribute("autocomplete", "off")
		}
		if (!this.lazyInit) {
			this.initList()
		} else {
			this.on("focus", this.initList, this, {
				single : true
			})
		}
		if (!this.editable) {
			this.editable = true;
			this.setEditable(false)
		}
	},
	initValue : function() {
		Ext.form.ComboBox.superclass.initValue.call(this);
		if (this.hiddenField) {
			this.hiddenField.value = this.hiddenValue !== undefined
					? this.hiddenValue
					: this.value !== undefined ? this.value : ""
		}
	},
	initList : function() {
		if (!this.list) {
			var a = "x-combo-list";
			this.list = new Ext.Layer( {
				shadow : this.shadow,
				cls : [a, this.listClass].join(" "),
				constrain : false
			});
			var b = this.listWidth
					|| Math.max(this.wrap.getWidth(), this.minListWidth);
			this.list.setWidth(b);
			this.list.swallowEvent("mousewheel");
			this.assetHeight = 0;
			if (this.title) {
				this.header = this.list.createChild( {
					cls : a + "-hd",
					html : this.title
				});
				this.assetHeight += this.header.getHeight()
			}
			this.innerList = this.list.createChild( {
				cls : a + "-inner"
			});
			this.innerList.on("mouseover", this.onViewOver, this);
			this.innerList.on("mousemove", this.onViewMove, this);
			this.innerList.setWidth(b - this.list.getFrameWidth("lr"));
			if (this.pageSize) {
				this.footer = this.list.createChild( {
					cls : a + "-ft"
				});
				this.pageTb = new Ext.PagingToolbar( {
					store : this.store,
					pageSize : this.pageSize,
					renderTo : this.footer
				});
				this.assetHeight += this.footer.getHeight()
			}
			if (!this.tpl) {
				this.tpl = '<tpl for="."><div class="' + a + '-item">{'
						+ this.displayField + "}</div></tpl>"
			}
			this.view = new Ext.DataView( {
				applyTo : this.innerList,
				tpl : this.tpl,
				singleSelect : true,
				selectedClass : this.selectedClass,
				itemSelector : this.itemSelector || "." + a + "-item"
			});
			this.view.on("click", this.onViewClick, this);
			this.bindStore(this.store, true);
			if (this.resizable) {
				this.resizer = new Ext.Resizable(this.list, {
					pinned : true,
					handles : "se"
				});
				this.resizer.on("resize", function(e, c, d) {
					this.maxHeight = d - this.handleHeight
							- this.list.getFrameWidth("tb") - this.assetHeight;
					this.listWidth = c;
					this.innerList.setWidth(c - this.list.getFrameWidth("lr"));
					this.restrictHeight()
				}, this);
				this[this.pageSize ? "footer" : "innerList"].setStyle(
						"margin-bottom", this.handleHeight + "px")
			}
		}
	},
	getStore : function() {
		return this.store
	},
	bindStore : function(a, b) {
		if (this.store && !b) {
			this.store.un("beforeload", this.onBeforeLoad, this);
			this.store.un("load", this.onLoad, this);
			this.store.un("loadexception", this.collapse, this);
			if (!a) {
				this.store = null;
				if (this.view) {
					this.view.setStore(null)
				}
			}
		}
		if (a) {
			this.store = Ext.StoreMgr.lookup(a);
			this.store.on("beforeload", this.onBeforeLoad, this);
			this.store.on("load", this.onLoad, this);
			this.store.on("loadexception", this.collapse, this);
			if (this.view) {
				this.view.setStore(a)
			}
		}
	},
	initEvents : function() {
		Ext.form.ComboBox.superclass.initEvents.call(this);
		this.keyNav = new Ext.KeyNav(this.el, {
			up : function(a) {
				this.inKeyMode = true;
				this.selectPrev()
			},
			down : function(a) {
				if (!this.isExpanded()) {
					this.onTriggerClick()
				} else {
					this.inKeyMode = true;
					this.selectNext()
				}
			},
			enter : function(a) {
				this.onViewClick();
				this.delayedCheck = true;
				this.unsetDelayCheck.defer(10, this)
			},
			esc : function(a) {
				this.collapse()
			},
			tab : function(a) {
				this.onViewClick(false);
				return true
			},
			scope : this,
			doRelay : function(c, b, a) {
				if (a == "down" || this.scope.isExpanded()) {
					return Ext.KeyNav.prototype.doRelay.apply(this, arguments)
				}
				return true
			},
			forceKeyDown : true
		});
		this.queryDelay = Math.max(this.queryDelay || 10, this.mode == "local"
				? 10
				: 250);
		this.dqTask = new Ext.util.DelayedTask(this.initQuery, this);
		if (this.typeAhead) {
			this.taTask = new Ext.util.DelayedTask(this.onTypeAhead, this)
		}
		if (this.editable !== false) {
			this.el.on("keyup", this.onKeyUp, this)
		}
		if (this.forceSelection) {
			this.on("blur", this.doForce, this)
		}
	},
	onDestroy : function() {
		if (this.view) {
			Ext.destroy(this.view)
		}
		if (this.list) {
			if (this.innerList) {
				this.innerList.un("mouseover", this.onViewOver, this);
				this.innerList.un("mousemove", this.onViewMove, this)
			}
			this.list.destroy()
		}
		if (this.dqTask) {
			this.dqTask.cancel();
			this.dqTask = null
		}
		this.bindStore(null);
		Ext.form.ComboBox.superclass.onDestroy.call(this)
	},
	unsetDelayCheck : function() {
		delete this.delayedCheck
	},
	fireKey : function(a) {
		if (a.isNavKeyPress() && !this.isExpanded() && !this.delayedCheck) {
			this.fireEvent("specialkey", this, a)
		}
	},
	onResize : function(a, b) {
		Ext.form.ComboBox.superclass.onResize.apply(this, arguments);
		if (this.list && this.listWidth === undefined) {
			var c = Math.max(a, this.minListWidth);
			this.list.setWidth(c);
			this.innerList.setWidth(c - this.list.getFrameWidth("lr"))
		}
	},
	onEnable : function() {
		Ext.form.ComboBox.superclass.onEnable.apply(this, arguments);
		if (this.hiddenField) {
			this.hiddenField.disabled = false
		}
	},
	onDisable : function() {
		Ext.form.ComboBox.superclass.onDisable.apply(this, arguments);
		if (this.hiddenField) {
			this.hiddenField.disabled = true
		}
	},
	setEditable : function(a) {
		if (a == this.editable) {
			return
		}
		this.editable = a;
		if (!a) {
			this.el.dom.setAttribute("readOnly", true);
			this.el.on("mousedown", this.onTriggerClick, this);
			this.el.addClass("x-combo-noedit")
		} else {
			this.el.dom.removeAttribute("readOnly");
			this.el.un("mousedown", this.onTriggerClick, this);
			this.el.removeClass("x-combo-noedit")
		}
	},
	onBeforeLoad : function() {
		if (!this.hasFocus) {
			return
		}
		this.innerList.update(this.loadingText
				? '<div class="loading-indicator">' + this.loadingText
						+ "</div>"
				: "");
		this.restrictHeight();
		this.selectedIndex = -1
	},
	onLoad : function() {
		if (!this.hasFocus) {
			return
		}
		if (this.store.getCount() > 0) {
			this.expand();
			this.restrictHeight();
			if (this.lastQuery == this.allQuery) {
				if (this.editable) {
					this.el.dom.select()
				}
				if (!this.selectByValue(this.value, true)) {
					this.select(0, true)
				}
			} else {
				this.selectNext();
				if (this.typeAhead && this.lastKey != Ext.EventObject.BACKSPACE
						&& this.lastKey != Ext.EventObject.DELETE) {
					this.taTask.delay(this.typeAheadDelay)
				}
			}
		} else {
			this.onEmptyResults()
		}
	},
	onTypeAhead : function() {
		if (this.store.getCount() > 0) {
			var b = this.store.getAt(0);
			var c = b.data[this.displayField];
			var a = c.length;
			var d = this.getRawValue().length;
			if (d != a) {
				this.setRawValue(c);
				this.selectText(d, c.length)
			}
		}
	},
	onSelect : function(a, b) {
		if (this.fireEvent("beforeselect", this, a, b) !== false) {
			this.setValue(a.data[this.valueField || this.displayField]);
			this.collapse();
			this.fireEvent("select", this, a, b)
		}
	},
	getValue : function() {
		if (this.valueField) {
			return typeof this.value != "undefined" ? this.value : ""
		} else {
			return Ext.form.ComboBox.superclass.getValue.call(this)
		}
	},
	clearValue : function() {
		if (this.hiddenField) {
			this.hiddenField.value = ""
		}
		this.setRawValue("");
		this.lastSelectionText = "";
		this.applyEmptyText();
		this.value = ""
	},
	setValue : function(a) {
		var c = a;
		if (this.valueField) {
			var b = this.findRecord(this.valueField, a);
			if (b) {
				c = b.data[this.displayField]
			} else {
				if (this.valueNotFoundText !== undefined) {
					c = this.valueNotFoundText
				}
			}
		}
		this.lastSelectionText = c;
		if (this.hiddenField) {
			this.hiddenField.value = a
		}
		Ext.form.ComboBox.superclass.setValue.call(this, c);
		this.value = a
	},
	findRecord : function(c, b) {
		var a;
		if (this.store.getCount() > 0) {
			this.store.each(function(d) {
				if (d.data[c] == b) {
					a = d;
					return false
				}
			})
		}
		return a
	},
	onViewMove : function(b, a) {
		this.inKeyMode = false
	},
	onViewOver : function(d, b) {
		if (this.inKeyMode) {
			return
		}
		var c = this.view.findItemFromChild(b);
		if (c) {
			var a = this.view.indexOf(c);
			this.select(a, false)
		}
	},
	onViewClick : function(b) {
		var a = this.view.getSelectedIndexes()[0];
		var c = this.store.getAt(a);
		if (c) {
			this.onSelect(c, a)
		}
		if (b !== false) {
			this.el.focus()
		}
	},
	restrictHeight : function() {
		this.innerList.dom.style.height = "";
		var b = this.innerList.dom;
		var e = this.list.getFrameWidth("tb")
				+ (this.resizable ? this.handleHeight : 0) + this.assetHeight;
		var c = Math.max(b.clientHeight, b.offsetHeight, b.scrollHeight);
		var a = this.getPosition()[1] - Ext.getBody().getScroll().top;
		var g = Ext.lib.Dom.getViewHeight() - a - this.getSize().height;
		var d = Math.max(a, g, this.minHeight || 0) - this.list.shadowOffset
				- e - 5;
		c = Math.min(c, d, this.maxHeight);
		this.innerList.setHeight(c);
		this.list.beginUpdate();
		this.list.setHeight(c + e);
		this.list.alignTo(this.wrap, this.listAlign);
		this.list.endUpdate()
	},
	onEmptyResults : function() {
		this.collapse()
	},
	isExpanded : function() {
		return this.list && this.list.isVisible()
	},
	selectByValue : function(a, c) {
		if (a !== undefined && a !== null) {
			var b = this.findRecord(this.valueField || this.displayField, a);
			if (b) {
				this.select(this.store.indexOf(b), c);
				return true
			}
		}
		return false
	},
	select : function(a, c) {
		this.selectedIndex = a;
		this.view.select(a);
		if (c !== false) {
			var b = this.view.getNode(a);
			if (b) {
				this.innerList.scrollChildIntoView(b, false)
			}
		}
	},
	selectNext : function() {
		var a = this.store.getCount();
		if (a > 0) {
			if (this.selectedIndex == -1) {
				this.select(0)
			} else {
				if (this.selectedIndex < a - 1) {
					this.select(this.selectedIndex + 1)
				}
			}
		}
	},
	selectPrev : function() {
		var a = this.store.getCount();
		if (a > 0) {
			if (this.selectedIndex == -1) {
				this.select(0)
			} else {
				if (this.selectedIndex != 0) {
					this.select(this.selectedIndex - 1)
				}
			}
		}
	},
	onKeyUp : function(a) {
		if (this.editable !== false && !a.isSpecialKey()) {
			this.lastKey = a.getKey();
			this.dqTask.delay(this.queryDelay)
		}
	},
	validateBlur : function() {
		return !this.list || !this.list.isVisible()
	},
	initQuery : function() {
		this.doQuery(this.getRawValue())
	},
	doForce : function() {
		if (this.el.dom.value.length > 0) {
			this.el.dom.value = this.lastSelectionText === undefined
					? ""
					: this.lastSelectionText;
			this.applyEmptyText()
		}
	},
	doQuery : function(c, b) {
		if (c === undefined || c === null) {
			c = ""
		}
		var a = {
			query : c,
			forceAll : b,
			combo : this,
			cancel : false
		};
		if (this.fireEvent("beforequery", a) === false || a.cancel) {
			return false
		}
		c = a.query;
		b = a.forceAll;
		if (b === true || (c.length >= this.minChars)) {
			if (this.lastQuery !== c) {
				this.lastQuery = c;
				if (this.mode == "local") {
					this.selectedIndex = -1;
					if (b) {
						this.store.clearFilter()
					} else {
						this.store.filter(this.displayField, c)
					}
					this.onLoad()
				} else {
					this.store.baseParams[this.queryParam] = c;
					this.store.load( {
						params : this.getParams(c)
					});
					this.expand()
				}
			} else {
				this.selectedIndex = -1;
				this.onLoad()
			}
		}
	},
	getParams : function(a) {
		var b = {};
		if (this.pageSize) {
			b.start = 0;
			b.limit = this.pageSize
		}
		return b
	},
	collapse : function() {
		if (!this.isExpanded()) {
			return
		}
		this.list.hide();
		Ext.getDoc().un("mousewheel", this.collapseIf, this);
		Ext.getDoc().un("mousedown", this.collapseIf, this);
		this.fireEvent("collapse", this)
	},
	collapseIf : function(a) {
		if (!a.within(this.wrap) && !a.within(this.list)) {
			this.collapse()
		}
	},
	expand : function() {
		if (this.isExpanded() || !this.hasFocus) {
			return
		}
		this.list.alignTo(this.wrap, this.listAlign);
		this.list.show();
		this.innerList.setOverflow("auto");
		Ext.getDoc().on("mousewheel", this.collapseIf, this);
		Ext.getDoc().on("mousedown", this.collapseIf, this);
		this.fireEvent("expand", this)
	},
	onTriggerClick : function() {
		if (this.disabled) {
			return
		}
		if (this.isExpanded()) {
			this.collapse();
			this.el.focus()
		} else {
			this.onFocus( {});
			if (this.triggerAction == "all") {
				this.doQuery(this.allQuery, true)
			} else {
				this.doQuery(this.getRawValue())
			}
			this.el.focus()
		}
	}
});
Ext.reg("combo", Ext.form.ComboBox);
Ext.form.Checkbox = Ext
		.extend(
				Ext.form.Field,
				{
					checkedCls : "x-form-check-checked",
					focusCls : "x-form-check-focus",
					overCls : "x-form-check-over",
					mouseDownCls : "x-form-check-down",
					tabIndex : 0,
					checked : false,
					defaultAutoCreate : {
						tag : "input",
						type : "checkbox",
						autocomplete : "off"
					},
					baseCls : "x-form-check",
					initComponent : function() {
						Ext.form.Checkbox.superclass.initComponent.call(this);
						this.addEvents("check")
					},
					initEvents : function() {
						Ext.form.Checkbox.superclass.initEvents.call(this);
						this.initCheckEvents()
					},
					initCheckEvents : function() {
						this.innerWrap.removeAllListeners();
						this.innerWrap.addClassOnOver(this.overCls);
						this.innerWrap.addClassOnClick(this.mouseDownCls);
						this.innerWrap.on("click", this.onClick, this);
						this.innerWrap.on("keyup", this.onKeyUp, this)
					},
					onRender : function(b, a) {
						Ext.form.Checkbox.superclass.onRender.call(this, b, a);
						if (this.inputValue !== undefined) {
							this.el.dom.value = this.inputValue
						}
						this.el.addClass("x-hidden");
						this.innerWrap = this.el.wrap( {
							tabIndex : this.tabIndex,
							cls : this.baseCls + "-wrap-inner"
						});
						this.wrap = this.innerWrap.wrap( {
							cls : this.baseCls + "-wrap"
						});
						if (this.boxLabel) {
							this.labelEl = this.innerWrap.createChild( {
								tag : "label",
								htmlFor : this.el.id,
								cls : "x-form-cb-label",
								html : this.boxLabel
							})
						}
						this.imageEl = this.innerWrap.createChild( {
							tag : "img",
							src : Ext.BLANK_IMAGE_URL,
							cls : this.baseCls
						}, this.el);
						if (this.checked) {
							this.setValue(true)
						} else {
							this.checked = this.el.dom.checked
						}
						this.originalValue = this.checked
					},
					afterRender : function() {
						Ext.form.Checkbox.superclass.afterRender.call(this);
						this.wrap[this.checked ? "addClass" : "removeClass"](this.checkedCls)
					},
					onDestroy : function() {
						if (this.rendered) {
							Ext.destroy(this.imageEl, this.labelEl,
									this.innerWrap, this.wrap)
						}
						Ext.form.Checkbox.superclass.onDestroy.call(this)
					},
					onFocus : function(a) {
						Ext.form.Checkbox.superclass.onFocus.call(this, a);
						this.el.addClass(this.focusCls)
					},
					onBlur : function(a) {
						Ext.form.Checkbox.superclass.onBlur.call(this, a);
						this.el.removeClass(this.focusCls)
					},
					onResize : function() {
						Ext.form.Checkbox.superclass.onResize.apply(this,
								arguments);
						if (!this.boxLabel && !this.fieldLabel) {
							this.el.alignTo(this.wrap, "c-c")
						}
					},
					onKeyUp : function(a) {
						if (a.getKey() == Ext.EventObject.SPACE) {
							this.onClick(a)
						}
					},
					onClick : function(a) {
						if (!this.disabled && !this.readOnly) {
							this.toggleValue()
						}
						a.stopEvent()
					},
					onEnable : function() {
						Ext.form.Checkbox.superclass.onEnable.call(this);
						this.initCheckEvents()
					},
					onDisable : function() {
						Ext.form.Checkbox.superclass.onDisable.call(this);
						this.innerWrap.removeAllListeners()
					},
					toggleValue : function() {
						this.setValue(!this.checked)
					},
					getResizeEl : function() {
						if (!this.resizeEl) {
							this.resizeEl = Ext.isSafari
									? this.wrap
									: (this.wrap.up(".x-form-element", 5) || this.wrap)
						}
						return this.resizeEl
					},
					getPositionEl : function() {
						return this.wrap
					},
					getActionEl : function() {
						return this.wrap
					},
					markInvalid : Ext.emptyFn,
					clearInvalid : Ext.emptyFn,
					initValue : Ext.emptyFn,
					getValue : function() {
						if (this.rendered) {
							return this.el.dom.checked
						}
						return this.checked
					},
					setValue : function(a) {
						var b = this.checked;
						this.checked = (a === true || a === "true" || a == "1" || String(a)
								.toLowerCase() == "on");
						if (this.rendered) {
							this.el.dom.checked = this.checked;
							this.el.dom.defaultChecked = this.checked;
							this.wrap[this.checked ? "addClass" : "removeClass"](this.checkedCls)
						}
						if (b != this.checked) {
							this.fireEvent("check", this, this.checked);
							if (this.handler) {
								this.handler.call(this.scope || this, this,
										this.checked)
							}
						}
					}
				});
Ext.reg("checkbox", Ext.form.Checkbox);
Ext.form.CheckboxGroup = Ext
		.extend(
				Ext.form.Field,
				{
					columns : "auto",
					vertical : false,
					allowBlank : true,
					blankText : "You must select at least one item in this group",
					defaultType : "checkbox",
					groupCls : "x-form-check-group",
					onRender : function(k, g) {
						if (!this.el) {
							var q = {
								cls : this.groupCls,
								layout : "column",
								border : false,
								renderTo : k
							};
							var a = {
								defaultType : this.defaultType,
								layout : "form",
								border : false,
								defaults : {
									hideLabel : true,
									anchor : "100%"
								}
							};
							if (this.items[0].items) {
								Ext.apply(q, {
									layoutConfig : {
										columns : this.items.length
									},
									defaults : this.defaults,
									items : this.items
								});
								for (var e = 0, n = this.items.length;e < n; e++) {
									Ext.applyIf(this.items[e], a)
								}
							} else {
								var d, o = [];
								if (typeof this.columns == "string") {
									this.columns = this.items.length
								}
								if (!Ext.isArray(this.columns)) {
									var m = [];
									for (var e = 0;e < this.columns; e++) {
										m.push((100 / this.columns) * 0.01)
									}
									this.columns = m
								}
								d = this.columns.length;
								for (var e = 0;e < d; e++) {
									var b = Ext.apply( {
										items : []
									}, a);
									b[this.columns[e] <= 1
											? "columnWidth"
											: "width"] = this.columns[e];
									if (this.defaults) {
										b.defaults = Ext
												.apply(b.defaults || {},
														this.defaults)
									}
									o.push(b)
								}
								if (this.vertical) {
									var s = Math.ceil(this.items.length / d), p = 0;
									for (var e = 0, n = this.items.length;e < n; e++) {
										if (e > 0 && e % s == 0) {
											p++
										}
										if (this.items[e].fieldLabel) {
											this.items[e].hideLabel = false
										}
										o[p].items.push(this.items[e])
									}
								} else {
									for (var e = 0, n = this.items.length;e < n; e++) {
										var r = e % d;
										if (this.items[e].fieldLabel) {
											this.items[e].hideLabel = false
										}
										o[r].items.push(this.items[e])
									}
								}
								Ext.apply(q, {
									layoutConfig : {
										columns : d
									},
									items : o
								})
							}
							this.panel = new Ext.Panel(q);
							this.el = this.panel.getEl();
							if (this.forId && this.itemCls) {
								var c = this.el.up(this.itemCls).child("label",
										true);
								if (c) {
									c.setAttribute("htmlFor", this.forId)
								}
							}
							var h = this.panel.findBy(function(i) {
								return i.isFormField
							}, this);
							this.items = new Ext.util.MixedCollection();
							this.items.addAll(h)
						}
						Ext.form.CheckboxGroup.superclass.onRender.call(this,
								k, g)
					},
					validateValue : function(a) {
						if (!this.allowBlank) {
							var b = true;
							this.items.each(function(c) {
								if (c.checked) {
									return b = false
								}
							}, this);
							if (b) {
								this.markInvalid(this.blankText);
								return false
							}
						}
						return true
					},
					onDisable : function() {
						this.items.each(function(a) {
							a.disable()
						})
					},
					onEnable : function() {
						this.items.each(function(a) {
							a.enable()
						})
					},
					onResize : function(a, b) {
						this.panel.setSize(a, b);
						this.panel.doLayout()
					},
					reset : function() {
						Ext.form.CheckboxGroup.superclass.reset.call(this);
						this.items.each(function(a) {
							if (a.reset) {
								a.reset()
							}
						}, this)
					},
					initValue : Ext.emptyFn,
					getValue : Ext.emptyFn,
					getRawValue : Ext.emptyFn,
					setValue : Ext.emptyFn,
					setRawValue : Ext.emptyFn
				});
Ext.reg("checkboxgroup", Ext.form.CheckboxGroup);
Ext.form.Radio = Ext.extend(Ext.form.Checkbox, {
	inputType : "radio",
	baseCls : "x-form-radio",
	getGroupValue : function() {
		var a = this.getParent().child(
				"input[name=" + this.el.dom.name + "]:checked", true);
		return a ? a.value : null
	},
	getParent : function() {
		return this.el.up("form") || Ext.getBody()
	},
	toggleValue : function() {
		if (!this.checked) {
			var a = this.getParent().select("input[name=" + this.el.dom.name
					+ "]");
			a.each(function(b) {
				if (b.dom.id == this.id) {
					this.setValue(true)
				} else {
					Ext.getCmp(b.dom.id).setValue(false)
				}
			}, this)
		}
	},
	setValue : function(a) {
		if (typeof a == "boolean") {
			Ext.form.Radio.superclass.setValue.call(this, a)
		} else {
			var b = this.getParent().child(
					"input[name=" + this.el.dom.name + "][value=" + a + "]",
					true);
			if (b && !b.checked) {
				Ext.getCmp(b.id).toggleValue()
			}
		}
	},
	markInvalid : Ext.emptyFn,
	clearInvalid : Ext.emptyFn
});
Ext.reg("radio", Ext.form.Radio);
Ext.form.RadioGroup = Ext.extend(Ext.form.CheckboxGroup, {
	allowBlank : true,
	blankText : "You must select one item in this group",
	defaultType : "radio",
	groupCls : "x-form-radio-group"
});
Ext.reg("radiogroup", Ext.form.RadioGroup);
Ext.form.Hidden = Ext.extend(Ext.form.Field, {
	inputType : "hidden",
	onRender : function() {
		Ext.form.Hidden.superclass.onRender.apply(this, arguments)
	},
	initEvents : function() {
		this.originalValue = this.getValue()
	},
	setSize : Ext.emptyFn,
	setWidth : Ext.emptyFn,
	setHeight : Ext.emptyFn,
	setPosition : Ext.emptyFn,
	setPagePosition : Ext.emptyFn,
	markInvalid : Ext.emptyFn,
	clearInvalid : Ext.emptyFn
});
Ext.reg("hidden", Ext.form.Hidden);
Ext.form.BasicForm = function(b, a) {
	Ext.apply(this, a);
	this.items = new Ext.util.MixedCollection(false, function(c) {
		return c.id || (c.id = Ext.id())
	});
	this.addEvents("beforeaction", "actionfailed", "actioncomplete");
	if (b) {
		this.initEl(b)
	}
	Ext.form.BasicForm.superclass.constructor.call(this)
};
Ext.extend(Ext.form.BasicForm, Ext.util.Observable, {
	timeout : 30,
	activeAction : null,
	trackResetOnLoad : false,
	initEl : function(a) {
		this.el = Ext.get(a);
		this.id = this.el.id || Ext.id();
		if (!this.standardSubmit) {
			this.el.on("submit", this.onSubmit, this)
		}
		this.el.addClass("x-form")
	},
	getEl : function() {
		return this.el
	},
	onSubmit : function(a) {
		a.stopEvent()
	},
	destroy : function() {
		this.items.each(function(a) {
			Ext.destroy(a)
		});
		if (this.el) {
			this.el.removeAllListeners();
			this.el.remove()
		}
		this.purgeListeners()
	},
	isValid : function() {
		var a = true;
		this.items.each(function(b) {
			if (!b.validate()) {
				a = false
			}
		});
		return a
	},
	isDirty : function() {
		var a = false;
		this.items.each(function(b) {
			if (b.isDirty()) {
				a = true;
				return false
			}
		});
		return a
	},
	doAction : function(b, a) {
		if (typeof b == "string") {
			b = new Ext.form.Action.ACTION_TYPES[b](this, a)
		}
		if (this.fireEvent("beforeaction", this, b) !== false) {
			this.beforeAction(b);
			b.run.defer(100, b)
		}
		return this
	},
	submit : function(b) {
		if (this.standardSubmit) {
			var a = this.isValid();
			if (a) {
				this.el.dom.submit()
			}
			return a
		}
		this.doAction("submit", b);
		return this
	},
	load : function(a) {
		this.doAction("load", a);
		return this
	},
	updateRecord : function(b) {
		b.beginEdit();
		var a = b.fields;
		a.each(function(c) {
			var d = this.findField(c.name);
			if (d) {
				b.set(c.name, d.getValue())
			}
		}, this);
		b.endEdit();
		return this
	},
	loadRecord : function(a) {
		this.setValues(a.data);
		return this
	},
	beforeAction : function(a) {
		var b = a.options;
		if (b.waitMsg) {
			if (this.waitMsgTarget === true) {
				this.el.mask(b.waitMsg, "x-mask-loading")
			} else {
				if (this.waitMsgTarget) {
					this.waitMsgTarget = Ext.get(this.waitMsgTarget);
					this.waitMsgTarget.mask(b.waitMsg, "x-mask-loading")
				} else {
					Ext.MessageBox.wait(b.waitMsg, b.waitTitle
							|| this.waitTitle || "Please Wait...")
				}
			}
		}
	},
	afterAction : function(a, c) {
		this.activeAction = null;
		var b = a.options;
		if (b.waitMsg) {
			if (this.waitMsgTarget === true) {
				this.el.unmask()
			} else {
				if (this.waitMsgTarget) {
					this.waitMsgTarget.unmask()
				} else {
					Ext.MessageBox.updateProgress(1);
					Ext.MessageBox.hide()
				}
			}
		}
		if (c) {
			if (b.reset) {
				this.reset()
			}
			Ext.callback(b.success, b.scope, [this, a]);
			this.fireEvent("actioncomplete", this, a)
		} else {
			Ext.callback(b.failure, b.scope, [this, a]);
			this.fireEvent("actionfailed", this, a)
		}
	},
	findField : function(b) {
		var a = this.items.get(b);
		if (!a) {
			this.items
					.each(function(c) {
						if (c.isFormField
								&& (c.dataIndex == b || c.id == b || c
										.getName() == b)) {
							a = c;
							return false
						}
					})
		}
		return a || null
	},
	markInvalid : function(h) {
		if (Ext.isArray(h)) {
			for (var c = 0, a = h.length;c < a; c++) {
				var b = h[c];
				var d = this.findField(b.id);
				if (d) {
					d.markInvalid(b.msg)
				}
			}
		} else {
			var e, g;
			for (g in h) {
				if (typeof h[g] != "function" && (e = this.findField(g))) {
					e.markInvalid(h[g])
				}
			}
		}
		return this
	},
	setValues : function(c) {
		if (Ext.isArray(c)) {
			for (var d = 0, a = c.length;d < a; d++) {
				var b = c[d];
				var e = this.findField(b.id);
				if (e) {
					e.setValue(b.value);
					if (this.trackResetOnLoad) {
						e.originalValue = e.getValue()
					}
				}
			}
		} else {
			var g, h;
			for (h in c) {
				if (typeof c[h] != "function" && (g = this.findField(h))) {
					g.setValue(c[h]);
					if (this.trackResetOnLoad) {
						g.originalValue = g.getValue()
					}
				}
			}
		}
		return this
	},
	getValues : function(b) {
		var a = Ext.lib.Ajax.serializeForm(this.el.dom);
		if (b === true) {
			return a
		}
		return Ext.urlDecode(a)
	},
	clearInvalid : function() {
		this.items.each(function(a) {
			a.clearInvalid()
		});
		return this
	},
	reset : function() {
		this.items.each(function(a) {
			a.reset()
		});
		return this
	},
	add : function() {
		this.items.addAll(Array.prototype.slice.call(arguments, 0));
		return this
	},
	remove : function(a) {
		this.items.remove(a);
		return this
	},
	render : function() {
		this.items.each(function(a) {
			if (a.isFormField && !a.rendered && document.getElementById(a.id)) {
				a.applyToMarkup(a.id)
			}
		});
		return this
	},
	applyToFields : function(a) {
		this.items.each(function(b) {
			Ext.apply(b, a)
		});
		return this
	},
	applyIfToFields : function(a) {
		this.items.each(function(b) {
			Ext.applyIf(b, a)
		});
		return this
	}
});
Ext.BasicForm = Ext.form.BasicForm;
Ext.FormPanel = Ext.extend(Ext.Panel, {
	buttonAlign : "center",
	minButtonWidth : 75,
	labelAlign : "left",
	monitorValid : false,
	monitorPoll : 200,
	layout : "form",
	initComponent : function() {
		this.form = this.createForm();
		this.bodyCfg = {
			tag : "form",
			cls : this.baseCls + "-body",
			method : this.method || "POST",
			id : this.formId || Ext.id()
		};
		if (this.fileUpload) {
			this.bodyCfg.enctype = "multipart/form-data"
		}
		Ext.FormPanel.superclass.initComponent.call(this);
		this.initItems();
		this.addEvents("clientvalidation");
		this.relayEvents(this.form, ["beforeaction", "actionfailed",
				"actioncomplete"])
	},
	createForm : function() {
		delete this.initialConfig.listeners;
		return new Ext.form.BasicForm(null, this.initialConfig)
	},
	initFields : function() {
		var c = this.form;
		var a = this;
		var b = function(d) {
			if (d.isFormField) {
				c.add(d)
			} else {
				if (d.doLayout && d != a) {
					Ext.applyIf(d, {
						labelAlign : d.ownerCt.labelAlign,
						labelWidth : d.ownerCt.labelWidth,
						itemCls : d.ownerCt.itemCls
					});
					if (d.items) {
						d.items.each(b)
					}
				}
			}
		};
		this.items.each(b)
	},
	getLayoutTarget : function() {
		return this.form.el
	},
	getForm : function() {
		return this.form
	},
	onRender : function(b, a) {
		this.initFields();
		Ext.FormPanel.superclass.onRender.call(this, b, a);
		this.form.initEl(this.body)
	},
	beforeDestroy : function() {
		Ext.FormPanel.superclass.beforeDestroy.call(this);
		this.stopMonitoring();
		Ext.destroy(this.form)
	},
	initEvents : function() {
		Ext.FormPanel.superclass.initEvents.call(this);
		this.items.on("remove", this.onRemove, this);
		this.items.on("add", this.onAdd, this);
		if (this.monitorValid) {
			this.startMonitoring()
		}
	},
	onAdd : function(a, b) {
		if (b.isFormField) {
			this.form.add(b)
		}
	},
	onRemove : function(a) {
		if (a.isFormField) {
			Ext.destroy(a.container.up(".x-form-item"));
			this.form.remove(a)
		}
	},
	startMonitoring : function() {
		if (!this.bound) {
			this.bound = true;
			Ext.TaskMgr.start( {
				run : this.bindHandler,
				interval : this.monitorPoll || 200,
				scope : this
			})
		}
	},
	stopMonitoring : function() {
		this.bound = false
	},
	load : function() {
		this.form.load.apply(this.form, arguments)
	},
	onDisable : function() {
		Ext.FormPanel.superclass.onDisable.call(this);
		if (this.form) {
			this.form.items.each(function() {
				this.disable()
			})
		}
	},
	onEnable : function() {
		Ext.FormPanel.superclass.onEnable.call(this);
		if (this.form) {
			this.form.items.each(function() {
				this.enable()
			})
		}
	},
	bindHandler : function() {
		if (!this.bound) {
			return false
		}
		var d = true;
		this.form.items.each(function(e) {
			if (!e.isValid(true)) {
				d = false;
				return false
			}
		});
		if (this.buttons) {
			for (var c = 0, a = this.buttons.length;c < a; c++) {
				var b = this.buttons[c];
				if (b.formBind === true && b.disabled === d) {
					b.setDisabled(!d)
				}
			}
		}
		this.fireEvent("clientvalidation", this, d)
	}
});
Ext.reg("form", Ext.FormPanel);
Ext.form.FormPanel = Ext.FormPanel;
Ext.form.FieldSet = Ext
		.extend(
				Ext.Panel,
				{
					baseCls : "x-fieldset",
					layout : "form",
					animCollapse : false,
					onRender : function(b, a) {
						if (!this.el) {
							this.el = document.createElement("fieldset");
							this.el.id = this.id;
							if (this.title || this.header
									|| this.checkboxToggle) {
								this.el.appendChild(document
										.createElement("legend")).className = "x-fieldset-header"
							}
						}
						Ext.form.FieldSet.superclass.onRender.call(this, b, a);
						if (this.checkboxToggle) {
							var c = typeof this.checkboxToggle == "object"
									? this.checkboxToggle
									: {
										tag : "input",
										type : "checkbox",
										name : this.checkboxName || this.id
												+ "-checkbox"
									};
							this.checkbox = this.header.insertFirst(c);
							this.checkbox.dom.checked = !this.collapsed;
							this.checkbox.on("click", this.onCheckClick, this)
						}
					},
					onCollapse : function(a, b) {
						if (this.checkbox) {
							this.checkbox.dom.checked = false
						}
						Ext.form.FieldSet.superclass.onCollapse
								.call(this, a, b)
					},
					onExpand : function(a, b) {
						if (this.checkbox) {
							this.checkbox.dom.checked = true
						}
						Ext.form.FieldSet.superclass.onExpand.call(this, a, b)
					},
					onCheckClick : function() {
						this[this.checkbox.dom.checked ? "expand" : "collapse"]()
					},
					beforeDestroy : function() {
						if (this.checkbox) {
							this.checkbox.un("click", this.onCheckClick, this)
						}
						Ext.form.FieldSet.superclass.beforeDestroy.call(this)
					}
				});
Ext.reg("fieldset", Ext.form.FieldSet);
Ext.form.HtmlEditor = Ext
		.extend(
				Ext.form.Field,
				{
					enableFormat : true,
					enableFontSize : true,
					enableColors : true,
					enableAlignments : true,
					enableLists : true,
					enableSourceEdit : true,
					enableLinks : true,
					enableFont : true,
					createLinkText : "Please enter the URL for the link:",
					defaultLinkValue : "http://",
					fontFamilies : ["Arial", "Courier New", "Tahoma",
							"Times New Roman", "Verdana"],
					defaultFont : "tahoma",
					validationEvent : false,
					deferHeight : true,
					initialized : false,
					activated : false,
					sourceEditMode : false,
					onFocus : Ext.emptyFn,
					iframePad : 3,
					hideMode : "offsets",
					defaultAutoCreate : {
						tag : "textarea",
						style : "width:500px;height:300px;",
						autocomplete : "off"
					},
					initComponent : function() {
						this.addEvents("initialize", "activate", "beforesync",
								"beforepush", "sync", "push", "editmodechange")
					},
					createFontOptions : function() {
						var d = [], b = this.fontFamilies, c, g;
						for (var e = 0, a = b.length;e < a; e++) {
							c = b[e];
							g = c.toLowerCase();
							d.push('<option value="', g,
									'" style="font-family:', c, ';"',
									(this.defaultFont == g
											? ' selected="true">'
											: ">"), c, "</option>")
						}
						return d.join("")
					},
					createToolbar : function(d) {
						var a = Ext.QuickTips && Ext.QuickTips.isEnabled();
						function c(h, e, g) {
							return {
								itemId : h,
								cls : "x-btn-icon x-edit-" + h,
								enableToggle : e !== false,
								scope : d,
								handler : g || d.relayBtnCmd,
								clickEvent : "mousedown",
								tooltip : a
										? d.buttonTips[h] || undefined
										: undefined,
								tabIndex : -1
							}
						}
						var b = new Ext.Toolbar( {
							renderTo : this.wrap.dom.firstChild
						});
						b.el.on("click", function(g) {
							g.preventDefault()
						});
						if (this.enableFont && !Ext.isSafari2) {
							this.fontSelect = b.el.createChild( {
								tag : "select",
								cls : "x-font-select",
								html : this.createFontOptions()
							});
							this.fontSelect.on("change", function() {
								var e = this.fontSelect.dom.value;
								this.relayCmd("fontname", e);
								this.deferFocus()
							}, this);
							b.add(this.fontSelect.dom, "-")
						}
						if (this.enableFormat) {
							b.add(c("bold"), c("italic"), c("underline"))
						}
						if (this.enableFontSize) {
							b.add("-", c("increasefontsize", false,
									this.adjustFont), c("decreasefontsize",
									false, this.adjustFont))
						}
						if (this.enableColors) {
							b.add("-", {
								itemId : "forecolor",
								cls : "x-btn-icon x-edit-forecolor",
								clickEvent : "mousedown",
								tooltip : a ? d.buttonTips.forecolor
										|| undefined : undefined,
								tabIndex : -1,
								menu : new Ext.menu.ColorMenu( {
									allowReselect : true,
									focus : Ext.emptyFn,
									value : "000000",
									plain : true,
									selectHandler : function(g, e) {
										this.execCmd("forecolor", Ext.isSafari
												|| Ext.isIE ? "#" + e : e);
										this.deferFocus()
									},
									scope : this,
									clickEvent : "mousedown"
								})
							}, {
								itemId : "backcolor",
								cls : "x-btn-icon x-edit-backcolor",
								clickEvent : "mousedown",
								tooltip : a ? d.buttonTips.backcolor
										|| undefined : undefined,
								tabIndex : -1,
								menu : new Ext.menu.ColorMenu( {
									focus : Ext.emptyFn,
									value : "FFFFFF",
									plain : true,
									allowReselect : true,
									selectHandler : function(g, e) {
										if (Ext.isGecko) {
											this.execCmd("useCSS", false);
											this.execCmd("hilitecolor", e);
											this.execCmd("useCSS", true);
											this.deferFocus()
										} else {
											this.execCmd(Ext.isOpera
													? "hilitecolor"
													: "backcolor", Ext.isSafari
													|| Ext.isIE ? "#" + e : e);
											this.deferFocus()
										}
									},
									scope : this,
									clickEvent : "mousedown"
								})
							})
						}
						if (this.enableAlignments) {
							b.add("-", c("justifyleft"), c("justifycenter"),
									c("justifyright"))
						}
						if (!Ext.isSafari2) {
							if (this.enableLinks) {
								b.add("-", c("createlink", false,
										this.createLink))
							}
							if (this.enableLists) {
								b.add("-", c("insertorderedlist"),
										c("insertunorderedlist"))
							}
							if (this.enableSourceEdit) {
								b.add("-", c("sourceedit", true, function(e) {
									this.toggleSourceEdit(e.pressed)
								}))
							}
						}
						this.tb = b
					},
					getDocMarkup : function() {
						return '<html><head><style type="text/css">body{border:0;margin:0;padding:3px;height:98%;cursor:text;}</style></head><body></body></html>'
					},
					getEditorBody : function() {
						return this.doc.body || this.doc.documentElement
					},
					getDoc : function() {
						return Ext.isIE
								? this.getWin().document
								: (this.iframe.contentDocument || this.getWin().document)
					},
					getWin : function() {
						return Ext.isIE
								? this.iframe.contentWindow
								: window.frames[this.iframe.name]
					},
					onRender : function(b, a) {
						Ext.form.HtmlEditor.superclass.onRender
								.call(this, b, a);
						this.el.dom.style.border = "0 none";
						this.el.dom.setAttribute("tabIndex", -1);
						this.el.addClass("x-hidden");
						if (Ext.isIE) {
							this.el
									.applyStyles("margin-top:-1px;margin-bottom:-1px;")
						}
						this.wrap = this.el.wrap( {
							cls : "x-html-editor-wrap",
							cn : {
								cls : "x-html-editor-tb"
							}
						});
						this.createToolbar(this);
						this.tb.items.each(function(e) {
							if (e.itemId != "sourceedit") {
								e.disable()
							}
						});
						var c = document.createElement("iframe");
						c.name = Ext.id();
						c.frameBorder = "0";
						c.src = Ext.isIE ? Ext.SSL_SECURE_URL : "javascript:;";
						this.wrap.dom.appendChild(c);
						this.iframe = c;
						this.initFrame();
						if (this.autoMonitorDesignMode !== false) {
							this.monitorTask = Ext.TaskMgr.start( {
								run : this.checkDesignMode,
								scope : this,
								interval : 100
							})
						}
						if (!this.width) {
							var d = this.el.getSize();
							this.setSize(d.width, this.height || d.height)
						}
					},
					initFrame : function() {
						this.doc = this.getDoc();
						this.win = this.getWin();
						this.doc.open();
						this.doc.write(this.getDocMarkup());
						this.doc.close();
						var a = {
							run : function() {
								if (this.doc.body
										|| this.doc.readyState == "complete") {
									Ext.TaskMgr.stop(a);
									this.doc.designMode = "on";
									this.initEditor.defer(10, this)
								}
							},
							interval : 10,
							duration : 10000,
							scope : this
						};
						Ext.TaskMgr.start(a)
					},
					checkDesignMode : function() {
						if (this.wrap && this.wrap.dom.offsetWidth) {
							var a = this.getDoc();
							if (!a) {
								return
							}
							if (!a.editorInitialized
									|| String(a.designMode).toLowerCase() != "on") {
								this.initFrame()
							}
						}
					},
					onResize : function(b, c) {
						Ext.form.HtmlEditor.superclass.onResize.apply(this,
								arguments);
						if (this.el && this.iframe) {
							if (typeof b == "number") {
								var d = b - this.wrap.getFrameWidth("lr");
								this.el.setWidth(this
										.adjustWidth("textarea", d));
								this.iframe.style.width = Math.max(d, 0) + "px"
							}
							if (typeof c == "number") {
								var a = c - this.wrap.getFrameWidth("tb")
										- this.tb.el.getHeight();
								this.el.setHeight(this.adjustWidth("textarea",
										a));
								this.iframe.style.height = Math.max(a, 0)
										+ "px";
								if (this.doc) {
									this.getEditorBody().style.height = Math
											.max((a - (this.iframePad * 2)), 0)
											+ "px"
								}
							}
						}
					},
					toggleSourceEdit : function(a) {
						if (a === undefined) {
							a = !this.sourceEditMode
						}
						this.sourceEditMode = a === true;
						var c = this.tb.items.get("sourceedit");
						if (c.pressed !== this.sourceEditMode) {
							c.toggle(this.sourceEditMode);
							return
						}
						if (this.sourceEditMode) {
							this.tb.items.each(function(d) {
								if (d.itemId != "sourceedit") {
									d.disable()
								}
							});
							this.syncValue();
							this.iframe.className = "x-hidden";
							this.el.removeClass("x-hidden");
							this.el.dom.removeAttribute("tabIndex");
							this.el.focus()
						} else {
							if (this.initialized) {
								this.tb.items.each(function(d) {
									d.enable()
								})
							}
							this.pushValue();
							this.iframe.className = "";
							this.el.addClass("x-hidden");
							this.el.dom.setAttribute("tabIndex", -1);
							this.deferFocus()
						}
						var b = this.lastSize;
						if (b) {
							delete this.lastSize;
							this.setSize(b)
						}
						this.fireEvent("editmodechange", this,
								this.sourceEditMode)
					},
					createLink : function() {
						var a = prompt(this.createLinkText,
								this.defaultLinkValue);
						if (a && a != "http://") {
							this.relayCmd("createlink", a)
						}
					},
					adjustSize : Ext.BoxComponent.prototype.adjustSize,
					getResizeEl : function() {
						return this.wrap
					},
					getPositionEl : function() {
						return this.wrap
					},
					initEvents : function() {
						this.originalValue = this.getValue()
					},
					markInvalid : Ext.emptyFn,
					clearInvalid : Ext.emptyFn,
					setValue : function(a) {
						Ext.form.HtmlEditor.superclass.setValue.call(this, a);
						this.pushValue()
					},
					cleanHtml : function(a) {
						a = String(a);
						if (a.length > 5) {
							if (Ext.isSafari) {
								a = a
										.replace(
												/\sclass="(?:Apple-style-span|khtml-block-placeholder)"/gi,
												"")
							}
						}
						if (a == "&nbsp;") {
							a = ""
						}
						return a
					},
					syncValue : function() {
						if (this.initialized) {
							var d = this.getEditorBody();
							var c = d.innerHTML;
							if (Ext.isSafari) {
								var b = d.getAttribute("style");
								var a = b.match(/text-align:(.*?);/i);
								if (a && a[1]) {
									c = '<div style="' + a[0] + '">' + c
											+ "</div>"
								}
							}
							c = this.cleanHtml(c);
							if (this.fireEvent("beforesync", this, c) !== false) {
								this.el.dom.value = c;
								this.fireEvent("sync", this, c)
							}
						}
					},
					getValue : function() {
						this.syncValue();
						return Ext.form.HtmlEditor.superclass.getValue
								.call(this)
					},
					pushValue : function() {
						if (this.initialized) {
							var a = this.el.dom.value;
							if (!this.activated && a.length < 1) {
								a = "&nbsp;"
							}
							if (this.fireEvent("beforepush", this, a) !== false) {
								this.getEditorBody().innerHTML = a;
								this.fireEvent("push", this, a)
							}
						}
					},
					deferFocus : function() {
						this.focus.defer(10, this)
					},
					focus : function() {
						if (this.win && !this.sourceEditMode) {
							this.win.focus()
						} else {
							this.el.focus()
						}
					},
					initEditor : function() {
						var b = this.getEditorBody();
						var a = this.el.getStyles("font-size", "font-family",
								"background-image", "background-repeat");
						a["background-attachment"] = "fixed";
						b.bgProperties = "fixed";
						Ext.DomHelper.applyStyles(b, a);
						if (this.doc) {
							try {
								Ext.EventManager.removeAll(this.doc)
							} catch (c) {
							}
						}
						this.doc = this.getDoc();
						Ext.EventManager.on(this.doc, {
							mousedown : this.onEditorEvent,
							dblclick : this.onEditorEvent,
							click : this.onEditorEvent,
							keyup : this.onEditorEvent,
							buffer : 100,
							scope : this
						});
						if (Ext.isGecko) {
							Ext.EventManager.on(this.doc, "keypress",
									this.applyCommand, this)
						}
						if (Ext.isIE || Ext.isSafari || Ext.isOpera) {
							Ext.EventManager.on(this.doc, "keydown",
									this.fixKeys, this)
						}
						this.initialized = true;
						this.fireEvent("initialize", this);
						this.doc.editorInitialized = true;
						this.pushValue()
					},
					onDestroy : function() {
						if (this.monitorTask) {
							Ext.TaskMgr.stop(this.monitorTask)
						}
						if (this.rendered) {
							this.tb.items.each(function(a) {
								if (a.menu) {
									a.menu.removeAll();
									if (a.menu.el) {
										a.menu.el.destroy()
									}
								}
								a.destroy()
							});
							this.wrap.dom.innerHTML = "";
							this.wrap.remove()
						}
					},
					onFirstFocus : function() {
						this.activated = true;
						this.tb.items.each(function(d) {
							d.enable()
						});
						if (Ext.isGecko) {
							this.win.focus();
							var a = this.win.getSelection();
							if (!a.focusNode || a.focusNode.nodeType != 3) {
								var b = a.getRangeAt(0);
								b.selectNodeContents(this.getEditorBody());
								b.collapse(true);
								this.deferFocus()
							}
							try {
								this.execCmd("useCSS", true);
								this.execCmd("styleWithCSS", false)
							} catch (c) {
							}
						}
						this.fireEvent("activate", this)
					},
					adjustFont : function(b) {
						var c = b.itemId == "increasefontsize" ? 1 : -1;
						var a = parseInt(this.doc.queryCommandValue("FontSize")
								|| 2, 10);
						if (Ext.isSafari3 || Ext.isAir) {
							if (a <= 10) {
								a = 1 + c
							} else {
								if (a <= 13) {
									a = 2 + c
								} else {
									if (a <= 16) {
										a = 3 + c
									} else {
										if (a <= 18) {
											a = 4 + c
										} else {
											if (a <= 24) {
												a = 5 + c
											} else {
												a = 6 + c
											}
										}
									}
								}
							}
							a = a.constrain(1, 6)
						} else {
							if (Ext.isSafari) {
								c *= 2
							}
							a = Math.max(1, a + c) + (Ext.isSafari ? "px" : 0)
						}
						this.execCmd("FontSize", a)
					},
					onEditorEvent : function(a) {
						this.updateToolbar()
					},
					updateToolbar : function() {
						if (!this.activated) {
							this.onFirstFocus();
							return
						}
						var b = this.tb.items.map, c = this.doc;
						if (this.enableFont && !Ext.isSafari2) {
							var a = (this.doc.queryCommandValue("FontName") || this.defaultFont)
									.toLowerCase();
							if (a != this.fontSelect.dom.value) {
								this.fontSelect.dom.value = a
							}
						}
						if (this.enableFormat) {
							b.bold.toggle(c.queryCommandState("bold"));
							b.italic.toggle(c.queryCommandState("italic"));
							b.underline
									.toggle(c.queryCommandState("underline"))
						}
						if (this.enableAlignments) {
							b.justifyleft.toggle(c
									.queryCommandState("justifyleft"));
							b.justifycenter.toggle(c
									.queryCommandState("justifycenter"));
							b.justifyright.toggle(c
									.queryCommandState("justifyright"))
						}
						if (!Ext.isSafari2 && this.enableLists) {
							b.insertorderedlist.toggle(c
									.queryCommandState("insertorderedlist"));
							b.insertunorderedlist.toggle(c
									.queryCommandState("insertunorderedlist"))
						}
						Ext.menu.MenuMgr.hideAll();
						this.syncValue()
					},
					relayBtnCmd : function(a) {
						this.relayCmd(a.itemId)
					},
					relayCmd : function(b, a) {
						(function() {
							this.focus();
							this.execCmd(b, a);
							this.updateToolbar()
						}).defer(10, this)
					},
					execCmd : function(b, a) {
						this.doc.execCommand(b, false, a === undefined
								? null
								: a);
						this.syncValue()
					},
					applyCommand : function(b) {
						if (b.ctrlKey) {
							var d = b.getCharCode(), a;
							if (d > 0) {
								d = String.fromCharCode(d);
								switch (d) {
									case "b" :
										a = "bold";
										break;
									case "i" :
										a = "italic";
										break;
									case "u" :
										a = "underline";
										break
								}
								if (a) {
									this.win.focus();
									this.execCmd(a);
									this.deferFocus();
									b.preventDefault()
								}
							}
						}
					},
					insertAtCursor : function(b) {
						if (!this.activated) {
							return
						}
						if (Ext.isIE) {
							this.win.focus();
							var a = this.doc.selection.createRange();
							if (a) {
								a.collapse(true);
								a.pasteHTML(b);
								this.syncValue();
								this.deferFocus()
							}
						} else {
							if (Ext.isGecko || Ext.isOpera) {
								this.win.focus();
								this.execCmd("InsertHTML", b);
								this.deferFocus()
							} else {
								if (Ext.isSafari) {
									this.execCmd("InsertText", b);
									this.deferFocus()
								}
							}
						}
					},
					fixKeys : function() {
						if (Ext.isIE) {
							return function(d) {
								var a = d.getKey(), b;
								if (a == d.TAB) {
									d.stopEvent();
									b = this.doc.selection.createRange();
									if (b) {
										b.collapse(true);
										b.pasteHTML("&nbsp;&nbsp;&nbsp;&nbsp;");
										this.deferFocus()
									}
								} else {
									if (a == d.ENTER) {
										b = this.doc.selection.createRange();
										if (b) {
											var c = b.parentElement();
											if (!c
													|| c.tagName.toLowerCase() != "li") {
												d.stopEvent();
												b.pasteHTML("<br />");
												b.collapse(false);
												b.select()
											}
										}
									}
								}
							}
						} else {
							if (Ext.isOpera) {
								return function(b) {
									var a = b.getKey();
									if (a == b.TAB) {
										b.stopEvent();
										this.win.focus();
										this.execCmd("InsertHTML",
												"&nbsp;&nbsp;&nbsp;&nbsp;");
										this.deferFocus()
									}
								}
							} else {
								if (Ext.isSafari) {
									return function(b) {
										var a = b.getKey();
										if (a == b.TAB) {
											b.stopEvent();
											this.execCmd("InsertText", "\t");
											this.deferFocus()
										}
									}
								}
							}
						}
					}(),
					getToolbar : function() {
						return this.tb
					},
					buttonTips : {
						bold : {
							title : "Bold (Ctrl+B)",
							text : "Make the selected text bold.",
							cls : "x-html-editor-tip"
						},
						italic : {
							title : "Italic (Ctrl+I)",
							text : "Make the selected text italic.",
							cls : "x-html-editor-tip"
						},
						underline : {
							title : "Underline (Ctrl+U)",
							text : "Underline the selected text.",
							cls : "x-html-editor-tip"
						},
						increasefontsize : {
							title : "Grow Text",
							text : "Increase the font size.",
							cls : "x-html-editor-tip"
						},
						decreasefontsize : {
							title : "Shrink Text",
							text : "Decrease the font size.",
							cls : "x-html-editor-tip"
						},
						backcolor : {
							title : "Text Highlight Color",
							text : "Change the background color of the selected text.",
							cls : "x-html-editor-tip"
						},
						forecolor : {
							title : "Font Color",
							text : "Change the color of the selected text.",
							cls : "x-html-editor-tip"
						},
						justifyleft : {
							title : "Align Text Left",
							text : "Align text to the left.",
							cls : "x-html-editor-tip"
						},
						justifycenter : {
							title : "Center Text",
							text : "Center text in the editor.",
							cls : "x-html-editor-tip"
						},
						justifyright : {
							title : "Align Text Right",
							text : "Align text to the right.",
							cls : "x-html-editor-tip"
						},
						insertunorderedlist : {
							title : "Bullet List",
							text : "Start a bulleted list.",
							cls : "x-html-editor-tip"
						},
						insertorderedlist : {
							title : "Numbered List",
							text : "Start a numbered list.",
							cls : "x-html-editor-tip"
						},
						createlink : {
							title : "Hyperlink",
							text : "Make the selected text a hyperlink.",
							cls : "x-html-editor-tip"
						},
						sourceedit : {
							title : "Source Edit",
							text : "Switch to source editing mode.",
							cls : "x-html-editor-tip"
						}
					}
				});
Ext.reg("htmleditor", Ext.form.HtmlEditor);
Ext.form.TimeField = Ext
		.extend(
				Ext.form.ComboBox,
				{
					minValue : null,
					maxValue : null,
					minText : "The time in this field must be equal to or after {0}",
					maxText : "The time in this field must be equal to or before {0}",
					invalidText : "{0} is not a valid time",
					format : "g:i A",
					altFormats : "g:ia|g:iA|g:i a|g:i A|h:i|g:i|H:i|ga|ha|gA|h a|g a|g A|gi|hi|gia|hia|g|H",
					increment : 15,
					mode : "local",
					triggerAction : "all",
					typeAhead : false,
					initDate : "1/1/2008",
					initComponent : function() {
						Ext.form.TimeField.superclass.initComponent.call(this);
						if (typeof this.minValue == "string") {
							this.minValue = this.parseDate(this.minValue)
						}
						if (typeof this.maxValue == "string") {
							this.maxValue = this.parseDate(this.maxValue)
						}
						if (!this.store) {
							var b = this.parseDate(this.minValue);
							if (!b) {
								b = new Date(this.initDate).clearTime()
							}
							var a = this.parseDate(this.maxValue);
							if (!a) {
								a = new Date(this.initDate).clearTime().add(
										"mi", (24 * 60) - 1)
							}
							var c = [];
							while (b <= a) {
								c.push([b.dateFormat(this.format)]);
								b = b.add("mi", this.increment)
							}
							this.store = new Ext.data.SimpleStore( {
								fields : ["text"],
								data : c
							});
							this.displayField = "text"
						}
					},
					getValue : function() {
						var a = Ext.form.TimeField.superclass.getValue
								.call(this);
						return this.formatDate(this.parseDate(a)) || ""
					},
					setValue : function(a) {
						Ext.form.TimeField.superclass.setValue.call(this, this
								.formatDate(this.parseDate(a)))
					},
					validateValue : Ext.form.DateField.prototype.validateValue,
					parseDate : Ext.form.DateField.prototype.parseDate,
					formatDate : Ext.form.DateField.prototype.formatDate,
					beforeBlur : function() {
						var a = this.parseDate(this.getRawValue());
						if (a) {
							this.setValue(a.dateFormat(this.format))
						}
					}
				});
Ext.reg("timefield", Ext.form.TimeField);
Ext.form.Label = Ext.extend(Ext.BoxComponent, {
	onRender : function(b, a) {
		if (!this.el) {
			this.el = document.createElement("label");
			this.el.id = this.getId();
			this.el.innerHTML = this.text ? Ext.util.Format
					.htmlEncode(this.text) : (this.html || "");
			if (this.forId) {
				this.el.setAttribute("for", this.forId)
			}
		}
		Ext.form.Label.superclass.onRender.call(this, b, a)
	},
	setText : function(a, b) {
		this.text = a;
		if (this.rendered) {
			this.el.dom.innerHTML = b !== false
					? Ext.util.Format.htmlEncode(a)
					: a
		}
		return this
	}
});
Ext.reg("label", Ext.form.Label);
Ext.form.Action = function(b, a) {
	this.form = b;
	this.options = a || {}
};
Ext.form.Action.CLIENT_INVALID = "client";
Ext.form.Action.SERVER_INVALID = "server";
Ext.form.Action.CONNECT_FAILURE = "connect";
Ext.form.Action.LOAD_FAILURE = "load";
Ext.form.Action.prototype = {
	type : "default",
	run : function(a) {
	},
	success : function(a) {
	},
	handleResponse : function(a) {
	},
	failure : function(a) {
		this.response = a;
		this.failureType = Ext.form.Action.CONNECT_FAILURE;
		this.form.afterAction(this, false)
	},
	processResponse : function(a) {
		this.response = a;
		if (!a.responseText) {
			return true
		}
		this.result = this.handleResponse(a);
		return this.result
	},
	getUrl : function(c) {
		var a = this.options.url || this.form.url || this.form.el.dom.action;
		if (c) {
			var b = this.getParams();
			if (b) {
				a += (a.indexOf("?") != -1 ? "&" : "?") + b
			}
		}
		return a
	},
	getMethod : function() {
		return (this.options.method || this.form.method
				|| this.form.el.dom.method || "POST").toUpperCase()
	},
	getParams : function() {
		var a = this.form.baseParams;
		var b = this.options.params;
		if (b) {
			if (typeof b == "object") {
				b = Ext.urlEncode(Ext.applyIf(b, a))
			} else {
				if (typeof b == "string" && a) {
					b += "&" + Ext.urlEncode(a)
				}
			}
		} else {
			if (a) {
				b = Ext.urlEncode(a)
			}
		}
		return b
	},
	createCallback : function(a) {
		var a = a || {};
		return {
			success : this.success,
			failure : this.failure,
			scope : this,
			timeout : (a.timeout * 1000) || (this.form.timeout * 1000),
			upload : this.form.fileUpload ? this.success : undefined
		}
	}
};
Ext.form.Action.Submit = function(b, a) {
	Ext.form.Action.Submit.superclass.constructor.call(this, b, a)
};
Ext.extend(Ext.form.Action.Submit, Ext.form.Action, {
	type : "submit",
	run : function() {
		var b = this.options;
		var c = this.getMethod();
		var a = c == "GET";
		if (b.clientValidation === false || this.form.isValid()) {
			Ext.Ajax.request(Ext.apply(this.createCallback(b), {
				form : this.form.el.dom,
				url : this.getUrl(a),
				method : c,
				headers : b.headers,
				params : !a ? this.getParams() : null,
				isUpload : this.form.fileUpload
			}))
		} else {
			if (b.clientValidation !== false) {
				this.failureType = Ext.form.Action.CLIENT_INVALID;
				this.form.afterAction(this, false)
			}
		}
	},
	success : function(b) {
		var a = this.processResponse(b);
		if (a === true || a.success) {
			this.form.afterAction(this, true);
			return
		}
		if (a.errors) {
			this.form.markInvalid(a.errors);
			this.failureType = Ext.form.Action.SERVER_INVALID
		}
		this.form.afterAction(this, false)
	},
	handleResponse : function(c) {
		if (this.form.errorReader) {
			var b = this.form.errorReader.read(c);
			var g = [];
			if (b.records) {
				for (var d = 0, a = b.records.length;d < a; d++) {
					var e = b.records[d];
					g[d] = e.data
				}
			}
			if (g.length < 1) {
				g = null
			}
			return {
				success : b.success,
				errors : g
			}
		}
		return Ext.decode(c.responseText)
	}
});
Ext.form.Action.Load = function(b, a) {
	Ext.form.Action.Load.superclass.constructor.call(this, b, a);
	this.reader = this.form.reader
};
Ext.extend(Ext.form.Action.Load, Ext.form.Action, {
	type : "load",
	run : function() {
		Ext.Ajax.request(Ext.apply(this.createCallback(this.options), {
			method : this.getMethod(),
			url : this.getUrl(false),
			headers : this.options.headers,
			params : this.getParams()
		}))
	},
	success : function(b) {
		var a = this.processResponse(b);
		if (a === true || !a.success || !a.data) {
			this.failureType = Ext.form.Action.LOAD_FAILURE;
			this.form.afterAction(this, false);
			return
		}
		this.form.clearInvalid();
		this.form.setValues(a.data);
		this.form.afterAction(this, true)
	},
	handleResponse : function(b) {
		if (this.form.reader) {
			var a = this.form.reader.read(b);
			var c = a.records && a.records[0] ? a.records[0].data : null;
			return {
				success : a.success,
				data : c
			}
		}
		return Ext.decode(b.responseText)
	}
});
Ext.form.Action.ACTION_TYPES = {
	load : Ext.form.Action.Load,
	submit : Ext.form.Action.Submit
};
Ext.form.VTypes = function() {
	var c = /^[a-zA-Z_]+$/;
	var d = /^[a-zA-Z0-9_]+$/;
	var b = /^([\w]+)(\.[\w]+)*@([\w\-]+\.){1,5}([A-Za-z]){2,4}$/;
	var a = /(((https?)|(ftp)):\/\/([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*\/?)/i;
	return {
		email : function(e) {
			return b.test(e)
		},
		emailText : 'This field should be an e-mail address in the format "user@domain.com"',
		emailMask : /[a-z0-9_\.\-@]/i,
		url : function(e) {
			return a.test(e)
		},
		urlText : 'This field should be a URL in the format "http://www.domain.com"',
		alpha : function(e) {
			return c.test(e)
		},
		alphaText : "This field should only contain letters and _",
		alphaMask : /[a-z_]/i,
		alphanum : function(e) {
			return d.test(e)
		},
		alphanumText : "This field should only contain letters, numbers and _",
		alphanumMask : /[a-z0-9_]/i
	}
}();
Ext.grid.GridPanel = Ext
		.extend(
				Ext.Panel,
				{
					ddText : "{0} selected row{1}",
					minColumnWidth : 25,
					trackMouseOver : true,
					enableDragDrop : false,
					enableColumnMove : true,
					enableColumnHide : true,
					enableHdMenu : true,
					stripeRows : false,
					autoExpandColumn : false,
					autoExpandMin : 50,
					autoExpandMax : 1000,
					view : null,
					loadMask : false,
					deferRowRender : true,
					rendered : false,
					viewReady : false,
					stateEvents : ["columnmove", "columnresize", "sortchange"],
					initComponent : function() {
						Ext.grid.GridPanel.superclass.initComponent.call(this);
						this.autoScroll = false;
						this.autoWidth = false;
						if (Ext.isArray(this.columns)) {
							this.colModel = new Ext.grid.ColumnModel(this.columns);
							delete this.columns
						}
						if (this.ds) {
							this.store = this.ds;
							delete this.ds
						}
						if (this.cm) {
							this.colModel = this.cm;
							delete this.cm
						}
						if (this.sm) {
							this.selModel = this.sm;
							delete this.sm
						}
						this.store = Ext.StoreMgr.lookup(this.store);
						this.addEvents("click", "dblclick", "contextmenu",
								"mousedown", "mouseup", "mouseover",
								"mouseout", "keypress", "keydown",
								"cellmousedown", "rowmousedown",
								"headermousedown", "cellclick", "celldblclick",
								"rowclick", "rowdblclick", "headerclick",
								"headerdblclick", "rowcontextmenu",
								"cellcontextmenu", "headercontextmenu",
								"bodyscroll", "columnresize", "columnmove",
								"sortchange")
					},
					onRender : function(d, a) {
						Ext.grid.GridPanel.superclass.onRender.apply(this,
								arguments);
						var e = this.body;
						this.el.addClass("x-grid-panel");
						var b = this.getView();
						b.init(this);
						e.on("mousedown", this.onMouseDown, this);
						e.on("click", this.onClick, this);
						e.on("dblclick", this.onDblClick, this);
						e.on("contextmenu", this.onContextMenu, this);
						e.on("keydown", this.onKeyDown, this);
						this.relayEvents(e, ["mousedown", "mouseup",
								"mouseover", "mouseout", "keypress"]);
						this.getSelectionModel().init(this);
						this.view.render()
					},
					initEvents : function() {
						Ext.grid.GridPanel.superclass.initEvents.call(this);
						if (this.loadMask) {
							this.loadMask = new Ext.LoadMask(this.bwrap, Ext
									.apply( {
										store : this.store
									}, this.loadMask))
						}
					},
					initStateEvents : function() {
						Ext.grid.GridPanel.superclass.initStateEvents
								.call(this);
						this.colModel.on("hiddenchange", this.saveState, this,
								{
									delay : 100
								})
					},
					applyState : function(h) {
						var b = this.colModel;
						var g = h.columns;
						if (g) {
							for (var d = 0, a = g.length;d < a; d++) {
								var e = g[d];
								var l = b.getColumnById(e.id);
								if (l) {
									l.hidden = e.hidden;
									l.width = e.width;
									var k = b.getIndexById(e.id);
									if (k != d) {
										b.moveColumn(k, d)
									}
								}
							}
						}
						if (h.sort) {
							this.store[this.store.remoteSort
									? "setDefaultSort"
									: "sort"](h.sort.field, h.sort.direction)
						}
					},
					getState : function() {
						var d = {
							columns : []
						};
						for (var b = 0, e;e = this.colModel.config[b]; b++) {
							d.columns[b] = {
								id : e.id,
								width : e.width
							};
							if (e.hidden) {
								d.columns[b].hidden = true
							}
						}
						var a = this.store.getSortState();
						if (a) {
							d.sort = a
						}
						return d
					},
					afterRender : function() {
						Ext.grid.GridPanel.superclass.afterRender.call(this);
						this.view.layout();
						if (this.deferRowRender) {
							this.view.afterRender.defer(10, this.view)
						} else {
							this.view.afterRender()
						}
						this.viewReady = true
					},
					reconfigure : function(a, b) {
						if (this.loadMask) {
							this.loadMask.destroy();
							this.loadMask = new Ext.LoadMask(this.bwrap, Ext
									.apply( {
										store : a
									}, this.initialConfig.loadMask))
						}
						this.view.bind(a, b);
						this.store = a;
						this.colModel = b;
						if (this.rendered) {
							this.view.refresh(true)
						}
					},
					onKeyDown : function(a) {
						this.fireEvent("keydown", a)
					},
					onDestroy : function() {
						if (this.rendered) {
							if (this.loadMask) {
								this.loadMask.destroy()
							}
							var a = this.body;
							a.removeAllListeners();
							this.view.destroy();
							a.update("")
						}
						this.colModel.purgeListeners();
						Ext.grid.GridPanel.superclass.onDestroy.call(this)
					},
					processEvent : function(c, g) {
						this.fireEvent(c, g);
						var d = g.getTarget();
						var b = this.view;
						var i = b.findHeaderIndex(d);
						if (i !== false) {
							this.fireEvent("header" + c, this, i, g)
						} else {
							var h = b.findRowIndex(d);
							var a = b.findCellIndex(d);
							if (h !== false) {
								this.fireEvent("row" + c, this, h, g);
								if (a !== false) {
									this.fireEvent("cell" + c, this, h, a, g)
								}
							}
						}
					},
					onClick : function(a) {
						this.processEvent("click", a)
					},
					onMouseDown : function(a) {
						this.processEvent("mousedown", a)
					},
					onContextMenu : function(b, a) {
						this.processEvent("contextmenu", b)
					},
					onDblClick : function(a) {
						this.processEvent("dblclick", a)
					},
					walkCells : function(l, c, b, e, k) {
						var i = this.colModel, g = i.getColumnCount();
						var a = this.store, h = a.getCount(), d = true;
						if (b < 0) {
							if (c < 0) {
								l--;
								d = false
							}
							while (l >= 0) {
								if (!d) {
									c = g - 1
								}
								d = false;
								while (c >= 0) {
									if (e.call(k || this, l, c, i) === true) {
										return [l, c]
									}
									c--
								}
								l--
							}
						} else {
							if (c >= g) {
								l++;
								d = false
							}
							while (l < h) {
								if (!d) {
									c = 0
								}
								d = false;
								while (c < g) {
									if (e.call(k || this, l, c, i) === true) {
										return [l, c]
									}
									c++
								}
								l++
							}
						}
						return null
					},
					getSelections : function() {
						return this.selModel.getSelections()
					},
					onResize : function() {
						Ext.grid.GridPanel.superclass.onResize.apply(this,
								arguments);
						if (this.viewReady) {
							this.view.layout()
						}
					},
					getGridEl : function() {
						return this.body
					},
					stopEditing : Ext.emptyFn,
					getSelectionModel : function() {
						if (!this.selModel) {
							this.selModel = new Ext.grid.RowSelectionModel(this.disableSelection
									? {
										selectRow : Ext.emptyFn
									}
									: null)
						}
						return this.selModel
					},
					getStore : function() {
						return this.store
					},
					getColumnModel : function() {
						return this.colModel
					},
					getView : function() {
						if (!this.view) {
							this.view = new Ext.grid.GridView(this.viewConfig)
						}
						return this.view
					},
					getDragDropText : function() {
						var a = this.selModel.getCount();
						return String.format(this.ddText, a, a == 1 ? "" : "s")
					}
				});
Ext.reg("grid", Ext.grid.GridPanel);
Ext.grid.GridView = function(a) {
	Ext.apply(this, a);
	this.addEvents("beforerowremoved", "beforerowsinserted", "beforerefresh",
			"rowremoved", "rowsinserted", "rowupdated", "refresh");
	Ext.grid.GridView.superclass.constructor.call(this)
};
Ext
		.extend(
				Ext.grid.GridView,
				Ext.util.Observable,
				{
					deferEmptyText : true,
					scrollOffset : 19,
					autoFill : false,
					forceFit : false,
					sortClasses : ["sort-asc", "sort-desc"],
					sortAscText : "Sort Ascending",
					sortDescText : "Sort Descending",
					columnsText : "Columns",
					borderWidth : 2,
					tdClass : "x-grid3-cell",
					hdCls : "x-grid3-hd",
					cellSelectorDepth : 4,
					rowSelectorDepth : 10,
					cellSelector : "td.x-grid3-cell",
					rowSelector : "div.x-grid3-row",
					initTemplates : function() {
						var c = this.templates || {};
						if (!c.master) {
							c.master = new Ext.Template(
									'<div class="x-grid3" hidefocus="true">',
									'<div class="x-grid3-viewport">',
									'<div class="x-grid3-header"><div class="x-grid3-header-inner"><div class="x-grid3-header-offset">{header}</div></div><div class="x-clear"></div></div>',
									'<div class="x-grid3-scroller"><div class="x-grid3-body">{body}</div><a href="#" class="x-grid3-focus" tabIndex="-1"></a></div>',
									"</div>",
									'<div class="x-grid3-resize-marker">&#160;</div>',
									'<div class="x-grid3-resize-proxy">&#160;</div>',
									"</div>")
						}
						if (!c.header) {
							c.header = new Ext.Template(
									'<table border="0" cellspacing="0" cellpadding="0" style="{tstyle}">',
									'<thead><tr class="x-grid3-hd-row">{cells}</tr></thead>',
									"</table>")
						}
						if (!c.hcell) {
							c.hcell = new Ext.Template(
									'<td class="x-grid3-hd x-grid3-cell x-grid3-td-{id} {css}" style="{style}"><div {tooltip} {attr} class="x-grid3-hd-inner x-grid3-hd-{id}" unselectable="on" style="{istyle}">',
									this.grid.enableHdMenu
											? '<a class="x-grid3-hd-btn" href="#"></a>'
											: "",
									'{value}<img class="x-grid3-sort-icon" src="',
									Ext.BLANK_IMAGE_URL, '" />', "</div></td>")
						}
						if (!c.body) {
							c.body = new Ext.Template("{rows}")
						}
						if (!c.row) {
							c.row = new Ext.Template(
									'<div class="x-grid3-row {alt}" style="{tstyle}"><table class="x-grid3-row-table" border="0" cellspacing="0" cellpadding="0" style="{tstyle}">',
									"<tbody><tr>{cells}</tr>",
									(this.enableRowBody
											? '<tr class="x-grid3-row-body-tr" style="{bodyStyle}"><td colspan="{cols}" class="x-grid3-body-cell" tabIndex="0" hidefocus="on"><div class="x-grid3-row-body">{body}</div></td></tr>'
											: ""), "</tbody></table></div>")
						}
						if (!c.cell) {
							c.cell = new Ext.Template(
									'<td class="x-grid3-col x-grid3-cell x-grid3-td-{id} {css}" style="{style}" tabIndex="0" {cellAttr}>',
									'<div class="x-grid3-cell-inner x-grid3-col-{id}" unselectable="on" {attr}>{value}</div>',
									"</td>")
						}
						for (var a in c) {
							var b = c[a];
							if (b && typeof b.compile == "function"
									&& !b.compiled) {
								b.disableFormats = true;
								b.compile()
							}
						}
						this.templates = c;
						this.colRe = new RegExp("x-grid3-td-([^\\s]+)", "")
					},
					fly : function(a) {
						if (!this._flyweight) {
							this._flyweight = new Ext.Element.Flyweight(document.body)
						}
						this._flyweight.dom = a;
						return this._flyweight
					},
					getEditorParent : function() {
						return this.scroller.dom
					},
					initElements : function() {
						var c = Ext.Element;
						var b = this.grid.getGridEl().dom.firstChild;
						var a = b.childNodes;
						this.el = new c(b);
						this.mainWrap = new c(a[0]);
						this.mainHd = new c(this.mainWrap.dom.firstChild);
						if (this.grid.hideHeaders) {
							this.mainHd.setDisplayed(false)
						}
						this.innerHd = this.mainHd.dom.firstChild;
						this.scroller = new c(this.mainWrap.dom.childNodes[1]);
						if (this.forceFit) {
							this.scroller.setStyle("overflow-x", "hidden")
						}
						this.mainBody = new c(this.scroller.dom.firstChild);
						this.focusEl = new c(this.scroller.dom.childNodes[1]);
						this.focusEl.swallowEvent("click", true);
						this.resizeMarker = new c(a[1]);
						this.resizeProxy = new c(a[2])
					},
					getRows : function() {
						return this.hasRows()
								? this.mainBody.dom.childNodes
								: []
					},
					findCell : function(a) {
						if (!a) {
							return false
						}
						return this.fly(a).findParent(this.cellSelector,
								this.cellSelectorDepth)
					},
					findCellIndex : function(c, b) {
						var a = this.findCell(c);
						if (a && (!b || this.fly(a).hasClass(b))) {
							return this.getCellIndex(a)
						}
						return false
					},
					getCellIndex : function(b) {
						if (b) {
							var a = b.className.match(this.colRe);
							if (a && a[1]) {
								return this.cm.getIndexById(a[1])
							}
						}
						return false
					},
					findHeaderCell : function(b) {
						var a = this.findCell(b);
						return a && this.fly(a).hasClass(this.hdCls) ? a : null
					},
					findHeaderIndex : function(a) {
						return this.findCellIndex(a, this.hdCls)
					},
					findRow : function(a) {
						if (!a) {
							return false
						}
						return this.fly(a).findParent(this.rowSelector,
								this.rowSelectorDepth)
					},
					findRowIndex : function(a) {
						var b = this.findRow(a);
						return b ? b.rowIndex : false
					},
					getRow : function(a) {
						return this.getRows()[a]
					},
					getCell : function(b, a) {
						return this.getRow(b).getElementsByTagName("td")[a]
					},
					getHeaderCell : function(a) {
						return this.mainHd.dom.getElementsByTagName("td")[a]
					},
					addRowClass : function(c, a) {
						var b = this.getRow(c);
						if (b) {
							this.fly(b).addClass(a)
						}
					},
					removeRowClass : function(c, a) {
						var b = this.getRow(c);
						if (b) {
							this.fly(b).removeClass(a)
						}
					},
					removeRow : function(a) {
						Ext.removeNode(this.getRow(a));
						this.syncFocusEl(a)
					},
					removeRows : function(c, a) {
						var b = this.mainBody.dom;
						for (var d = c;d <= a; d++) {
							Ext.removeNode(b.childNodes[c])
						}
						this.syncFocusEl(c)
					},
					getScrollState : function() {
						var a = this.scroller.dom;
						return {
							left : a.scrollLeft,
							top : a.scrollTop
						}
					},
					restoreScroll : function(a) {
						var b = this.scroller.dom;
						b.scrollLeft = a.left;
						b.scrollTop = a.top
					},
					scrollToTop : function() {
						this.scroller.dom.scrollTop = 0;
						this.scroller.dom.scrollLeft = 0
					},
					syncScroll : function() {
						this.syncHeaderScroll();
						var a = this.scroller.dom;
						this.grid.fireEvent("bodyscroll", a.scrollLeft,
								a.scrollTop)
					},
					syncHeaderScroll : function() {
						var a = this.scroller.dom;
						this.innerHd.scrollLeft = a.scrollLeft;
						this.innerHd.scrollLeft = a.scrollLeft
					},
					updateSortIcon : function(b, a) {
						var d = this.sortClasses;
						var c = this.mainHd.select("td").removeClass(d);
						c.item(b).addClass(d[a == "DESC" ? 1 : 0])
					},
					updateAllColumnWidths : function() {
						var d = this.getTotalWidth();
						var l = this.cm.getColumnCount();
						var g = [];
						for (var b = 0;b < l; b++) {
							g[b] = this.getColumnWidth(b)
						}
						this.innerHd.firstChild.firstChild.style.width = d;
						for (var b = 0;b < l; b++) {
							var c = this.getHeaderCell(b);
							c.style.width = g[b]
						}
						var h = this.getRows(), m, k;
						for (var b = 0, e = h.length;b < e; b++) {
							m = h[b];
							m.style.width = d;
							if (m.firstChild) {
								m.firstChild.style.width = d;
								k = m.firstChild.rows[0];
								for (var a = 0;a < l; a++) {
									k.childNodes[a].style.width = g[a]
								}
							}
						}
						this.onAllColumnWidthsUpdated(g, d)
					},
					updateColumnWidth : function(b, a) {
						var k = this.getColumnWidth(b);
						var e = this.getTotalWidth();
						this.innerHd.firstChild.firstChild.style.width = e;
						var d = this.getHeaderCell(b);
						d.style.width = k;
						var h = this.getRows(), l;
						for (var c = 0, g = h.length;c < g; c++) {
							l = h[c];
							l.style.width = e;
							if (l.firstChild) {
								l.firstChild.style.width = e;
								l.firstChild.rows[0].childNodes[b].style.width = k
							}
						}
						this.onColumnWidthUpdated(b, k, e)
					},
					updateColumnHidden : function(a, e) {
						var d = this.getTotalWidth();
						this.innerHd.firstChild.firstChild.style.width = d;
						var h = e ? "none" : "";
						var c = this.getHeaderCell(a);
						c.style.display = h;
						var k = this.getRows(), l;
						for (var b = 0, g = k.length;b < g; b++) {
							l = k[b];
							l.style.width = d;
							if (l.firstChild) {
								l.firstChild.style.width = d;
								l.firstChild.rows[0].childNodes[a].style.display = h
							}
						}
						this.onColumnHiddenUpdated(a, e, d);
						delete this.lastViewWidth;
						this.layout()
					},
					doRender : function(g, k, s, a, q, w) {
						var b = this.templates, e = b.cell, h = b.row, l = q
								- 1;
						var d = "width:" + this.getTotalWidth() + ";";
						var z = [], t, A, u = {}, m = {
							tstyle : d
						}, o;
						for (var v = 0, y = k.length;v < y; v++) {
							o = k[v];
							t = [];
							var n = (v + a);
							for (var x = 0;x < q; x++) {
								A = g[x];
								u.id = A.id;
								u.css = x == 0
										? "x-grid3-cell-first "
										: (x == l ? "x-grid3-cell-last " : "");
								u.attr = u.cellAttr = "";
								u.value = A.renderer(o.data[A.name], u, o, n,
										x, s);
								u.style = A.style;
								if (u.value == undefined || u.value === "") {
									u.value = "&#160;"
								}
								if (o.dirty
										&& typeof o.modified[A.name] !== "undefined") {
									u.css += " x-grid3-dirty-cell"
								}
								t[t.length] = e.apply(u)
							}
							var B = [];
							if (w && ((n + 1) % 2 == 0)) {
								B[0] = "x-grid3-row-alt"
							}
							if (o.dirty) {
								B[1] = " x-grid3-dirty-row"
							}
							m.cols = q;
							if (this.getRowClass) {
								B[2] = this.getRowClass(o, n, m, s)
							}
							m.alt = B.join(" ");
							m.cells = t.join("");
							z[z.length] = h.apply(m)
						}
						return z.join("")
					},
					processRows : function(e, d) {
						if (this.ds.getCount() < 1) {
							return
						}
						d = d || !this.grid.stripeRows;
						e = e || 0;
						var l = this.getRows();
						var g = " x-grid3-row-alt ";
						l[0].className += " x-grid3-row-first";
						l[l.length - 1].className += " x-grid3-row-last";
						for (var b = e, c = l.length;b < c; b++) {
							var k = l[b];
							k.rowIndex = b;
							if (!d) {
								var a = ((b + 1) % 2 == 0);
								var h = (" " + k.className + " ").indexOf(g) != -1;
								if (a == h) {
									continue
								}
								if (a) {
									k.className += " x-grid3-row-alt"
								} else {
									k.className = k.className.replace(
											"x-grid3-row-alt", "")
								}
							}
						}
					},
					afterRender : function() {
						this.mainBody.dom.innerHTML = this.renderRows();
						this.processRows(0, true);
						if (this.deferEmptyText !== true) {
							this.applyEmptyText()
						}
					},
					renderUI : function() {
						var d = this.renderHeaders();
						var a = this.templates.body.apply( {
							rows : ""
						});
						var b = this.templates.master.apply( {
							body : a,
							header : d
						});
						var c = this.grid;
						c.getGridEl().dom.innerHTML = b;
						this.initElements();
						Ext.fly(this.innerHd).on("click", this.handleHdDown,
								this);
						this.mainHd.on("mouseover", this.handleHdOver, this);
						this.mainHd.on("mouseout", this.handleHdOut, this);
						this.mainHd.on("mousemove", this.handleHdMove, this);
						this.scroller.on("scroll", this.syncScroll, this);
						if (c.enableColumnResize !== false) {
							this.splitZone = new Ext.grid.GridView.SplitDragZone(
									c, this.mainHd.dom)
						}
						if (c.enableColumnMove) {
							this.columnDrag = new Ext.grid.GridView.ColumnDragZone(
									c, this.innerHd);
							this.columnDrop = new Ext.grid.HeaderDropZone(c,
									this.mainHd.dom)
						}
						if (c.enableHdMenu !== false) {
							if (c.enableColumnHide !== false) {
								this.colMenu = new Ext.menu.Menu( {
									id : c.id + "-hcols-menu"
								});
								this.colMenu.on("beforeshow",
										this.beforeColMenuShow, this);
								this.colMenu.on("itemclick",
										this.handleHdMenuClick, this)
							}
							this.hmenu = new Ext.menu.Menu( {
								id : c.id + "-hctx"
							});
							this.hmenu.add( {
								id : "asc",
								text : this.sortAscText,
								cls : "xg-hmenu-sort-asc"
							}, {
								id : "desc",
								text : this.sortDescText,
								cls : "xg-hmenu-sort-desc"
							});
							if (c.enableColumnHide !== false) {
								this.hmenu.add("-", {
									id : "columns",
									text : this.columnsText,
									menu : this.colMenu,
									iconCls : "x-cols-icon"
								})
							}
							this.hmenu.on("itemclick", this.handleHdMenuClick,
									this)
						}
						if (c.trackMouseOver) {
							this.mainBody.on("mouseover", this.onRowOver, this);
							this.mainBody.on("mouseout", this.onRowOut, this)
						}
						if (c.enableDragDrop || c.enableDrag) {
							this.dragZone = new Ext.grid.GridDragZone(c, {
								ddGroup : c.ddGroup || "GridDD"
							})
						}
						this.updateHeaderSortState()
					},
					layout : function() {
						if (!this.mainBody) {
							return
						}
						var d = this.grid;
						var i = d.getGridEl();
						var a = i.getSize(true);
						var b = a.width;
						if (b < 20 || a.height < 20) {
							return
						}
						if (d.autoHeight) {
							this.scroller.dom.style.overflow = "visible";
							if (Ext.isSafari) {
								this.scroller.dom.style.position = "static"
							}
						} else {
							this.el.setSize(a.width, a.height);
							var h = this.mainHd.getHeight();
							var e = a.height - (h);
							this.scroller.setSize(b, e);
							if (this.innerHd) {
								this.innerHd.style.width = (b) + "px"
							}
						}
						if (this.forceFit) {
							if (this.lastViewWidth != b) {
								this.fitColumns(false, false);
								this.lastViewWidth = b
							}
						} else {
							this.autoExpand();
							this.syncHeaderScroll()
						}
						this.onLayout(b, e)
					},
					onLayout : function(a, b) {
					},
					onColumnWidthUpdated : function(c, a, b) {
						this.focusEl.setWidth(b)
					},
					onAllColumnWidthsUpdated : function(a, b) {
						this.focusEl.setWidth(b)
					},
					onColumnHiddenUpdated : function(b, c, a) {
						this.focusEl.setWidth(a)
					},
					updateColumnText : function(a, b) {
					},
					afterMove : function(a) {
					},
					init : function(a) {
						this.grid = a;
						this.initTemplates();
						this.initData(a.store, a.colModel);
						this.initUI(a)
					},
					getColumnId : function(a) {
						return this.cm.getColumnId(a)
					},
					renderHeaders : function() {
						var k = this.cm, g = this.templates;
						var d = g.hcell;
						var b = [], h = [], a = {};
						var e = k.getColumnCount();
						var l = e - 1;
						for (var c = 0;c < e; c++) {
							a.id = k.getColumnId(c);
							a.value = k.getColumnHeader(c) || "";
							a.style = this.getColumnStyle(c, true);
							a.tooltip = this.getColumnTooltip(c);
							a.css = c == 0 ? "x-grid3-cell-first " : (c == l
									? "x-grid3-cell-last "
									: "");
							if (k.config[c].align == "right") {
								a.istyle = "padding-right:16px"
							} else {
								delete a.istyle
							}
							b[b.length] = d.apply(a)
						}
						return g.header.apply( {
							cells : b.join(""),
							tstyle : "width:" + this.getTotalWidth() + ";"
						})
					},
					getColumnTooltip : function(a) {
						var b = this.cm.getColumnTooltip(a);
						if (b) {
							if (Ext.QuickTips.isEnabled()) {
								return 'ext:qtip="' + b + '"'
							} else {
								return 'title="' + b + '"'
							}
						}
						return ""
					},
					beforeUpdate : function() {
						this.grid.stopEditing(true)
					},
					updateHeaders : function() {
						this.innerHd.firstChild.innerHTML = this
								.renderHeaders()
					},
					focusRow : function(a) {
						this.focusCell(a, 0, false)
					},
					focusCell : function(c, a, b) {
						this.syncFocusEl(this.ensureVisible(c, a, b));
						if (Ext.isGecko) {
							this.focusEl.focus()
						} else {
							this.focusEl.focus.defer(1, this.focusEl)
						}
					},
					resolveCell : function(e, c, d) {
						if (typeof e != "number") {
							e = e.rowIndex
						}
						if (!this.ds) {
							return null
						}
						if (e < 0 || e >= this.ds.getCount()) {
							return null
						}
						c = (c !== undefined ? c : 0);
						var b = this.getRow(e), a;
						if (!(d === false && c === 0)) {
							while (this.cm.isHidden(c)) {
								c++
							}
							a = this.getCell(e, c)
						}
						return {
							row : b,
							cell : a
						}
					},
					getResolvedXY : function(a) {
						if (!a) {
							return null
						}
						var b = this.scroller.dom, e = a.cell, d = a.row;
						return e ? Ext.fly(e).getXY() : [this.el.getX(),
								Ext.fly(d).getY()]
					},
					syncFocusEl : function(d, a, c) {
						var b = d;
						if (!Ext.isArray(b)) {
							d = Math.min(d, Math.max(0, this.getRows().length
									- 1));
							b = this.getResolvedXY(this.resolveCell(d, a, c))
						}
						this.focusEl.setXY(b || this.scroller.getXY())
					},
					ensureVisible : function(u, g, e) {
						var s = this.resolveCell(u, g, e);
						if (!s || !s.row) {
							return
						}
						var l = s.row, h = s.cell;
						var o = this.scroller.dom;
						var t = 0;
						var d = l, q = this.el.dom;
						while (d && d != q) {
							t += d.offsetTop;
							d = d.offsetParent
						}
						t -= this.mainHd.dom.offsetHeight;
						var r = t + l.offsetHeight;
						var a = o.clientHeight;
						var q = parseInt(o.scrollTop, 10);
						var n = q + a;
						if (t < q) {
							o.scrollTop = t
						} else {
							if (r > n) {
								o.scrollTop = r - a
							}
						}
						if (e !== false) {
							var m = parseInt(h.offsetLeft, 10);
							var k = m + h.offsetWidth;
							var i = parseInt(o.scrollLeft, 10);
							var b = i + o.clientWidth;
							if (m < i) {
								o.scrollLeft = m
							} else {
								if (k > b) {
									o.scrollLeft = k - o.clientWidth
								}
							}
						}
						return this.getResolvedXY(s)
					},
					insertRows : function(a, g, c, e) {
						if (!e && g === 0 && c >= a.getCount() - 1) {
							this.refresh()
						} else {
							if (!e) {
								this
										.fireEvent("beforerowsinserted", this,
												g, c)
							}
							var b = this.renderRows(g, c);
							var d = this.getRow(g);
							if (d) {
								Ext.DomHelper.insertHtml("beforeBegin", d, b)
							} else {
								Ext.DomHelper.insertHtml("beforeEnd",
										this.mainBody.dom, b)
							}
							if (!e) {
								this.fireEvent("rowsinserted", this, g, c);
								this.processRows(g)
							}
						}
						this.syncFocusEl(g)
					},
					deleteRows : function(a, c, b) {
						if (a.getRowCount() < 1) {
							this.refresh()
						} else {
							this.fireEvent("beforerowsdeleted", this, c, b);
							this.removeRows(c, b);
							this.processRows(c);
							this.fireEvent("rowsdeleted", this, c, b)
						}
					},
					getColumnStyle : function(a, c) {
						var b = !c ? (this.cm.config[a].css || "") : "";
						b += "width:" + this.getColumnWidth(a) + ";";
						if (this.cm.isHidden(a)) {
							b += "display:none;"
						}
						var d = this.cm.config[a].align;
						if (d) {
							b += "text-align:" + d + ";"
						}
						return b
					},
					getColumnWidth : function(b) {
						var a = this.cm.getColumnWidth(b);
						if (typeof a == "number") {
							return (Ext.isBorderBox
									? a
									: (a - this.borderWidth > 0 ? a
											- this.borderWidth : 0))
									+ "px"
						}
						return a
					},
					getTotalWidth : function() {
						return this.cm.getTotalWidth() + "px"
					},
					fitColumns : function(d, h, e) {
						var g = this.cm, v, o, r;
						var u = g.getTotalWidth(false);
						var m = this.grid.getGridEl().getWidth(true)
								- this.scrollOffset;
						if (m < 20) {
							return
						}
						var b = m - u;
						if (b === 0) {
							return false
						}
						var a = g.getColumnCount(true);
						var s = a - (typeof e == "number" ? 1 : 0);
						if (s === 0) {
							s = 1;
							e = undefined
						}
						var n = g.getColumnCount();
						var l = [];
						var q = 0;
						var p = 0;
						var k;
						for (r = 0;r < n; r++) {
							if (!g.isHidden(r) && !g.isFixed(r) && r !== e) {
								k = g.getColumnWidth(r);
								l.push(r);
								q = r;
								l.push(k);
								p += k
							}
						}
						var c = (m - g.getTotalWidth()) / p;
						while (l.length) {
							k = l.pop();
							r = l.pop();
							g.setColumnWidth(r, Math.max(
									this.grid.minColumnWidth, Math.floor(k + k
											* c)), true)
						}
						if ((u = g.getTotalWidth(false)) > m) {
							var t = s != a ? e : q;
							g.setColumnWidth(t, Math.max(1, g.getColumnWidth(t)
									- (u - m)), true)
						}
						if (d !== true) {
							this.updateAllColumnWidths()
						}
						return true
					},
					autoExpand : function(b) {
						var i = this.grid, a = this.cm;
						if (!this.userResized && i.autoExpandColumn) {
							var d = a.getTotalWidth(false);
							var k = this.grid.getGridEl().getWidth(true)
									- this.scrollOffset;
							if (d != k) {
								var h = a.getIndexById(i.autoExpandColumn);
								var e = a.getColumnWidth(h);
								var c = Math.min(Math.max(((k - d) + e),
										i.autoExpandMin), i.autoExpandMax);
								if (c != e) {
									a.setColumnWidth(h, c, true);
									if (b !== true) {
										this.updateColumnWidth(h, c)
									}
								}
							}
						}
					},
					getColumnData : function() {
						var d = [], a = this.cm, e = a.getColumnCount();
						for (var c = 0;c < e; c++) {
							var b = a.getDataIndex(c);
							d[c] = {
								name : (typeof b == "undefined"
										? this.ds.fields.get(c).name
										: b),
								renderer : a.getRenderer(c),
								id : a.getColumnId(c),
								style : this.getColumnStyle(c)
							}
						}
						return d
					},
					renderRows : function(k, c) {
						var d = this.grid, h = d.colModel, a = d.store, l = d.stripeRows;
						var i = h.getColumnCount();
						if (a.getCount() < 1) {
							return ""
						}
						var e = this.getColumnData();
						k = k || 0;
						c = typeof c == "undefined" ? a.getCount() - 1 : c;
						var b = a.getRange(k, c);
						return this.doRender(e, b, a, k, i, l)
					},
					renderBody : function() {
						var a = this.renderRows();
						return this.templates.body.apply( {
							rows : a
						})
					},
					refreshRow : function(b) {
						var d = this.ds, c;
						if (typeof b == "number") {
							c = b;
							b = d.getAt(c)
						} else {
							c = d.indexOf(b)
						}
						var a = [];
						this.insertRows(d, c, c, true);
						this.getRow(c).rowIndex = c;
						this.onRemove(d, b, c + 1, true);
						this.fireEvent("rowupdated", this, c, b)
					},
					refresh : function(b) {
						this.fireEvent("beforerefresh", this);
						this.grid.stopEditing(true);
						var a = this.renderBody();
						this.mainBody.update(a);
						if (b === true) {
							this.updateHeaders();
							this.updateHeaderSortState()
						}
						this.processRows(0, true);
						this.layout();
						this.applyEmptyText();
						this.fireEvent("refresh", this)
					},
					applyEmptyText : function() {
						if (this.emptyText && !this.hasRows()) {
							this.mainBody.update('<div class="x-grid-empty">'
									+ this.emptyText + "</div>")
						}
					},
					updateHeaderSortState : function() {
						var b = this.ds.getSortState();
						if (!b) {
							return
						}
						if (!this.sortState
								|| (this.sortState.field != b.field || this.sortState.direction != b.direction)) {
							this.grid.fireEvent("sortchange", this.grid, b)
						}
						this.sortState = b;
						var c = this.cm.findColumnIndex(b.field);
						if (c != -1) {
							var a = b.direction;
							this.updateSortIcon(c, a)
						}
					},
					destroy : function() {
						if (this.colMenu) {
							Ext.menu.MenuMgr.unregister(this.colMenu);
							this.colMenu.destroy();
							delete this.colMenu
						}
						if (this.hmenu) {
							Ext.menu.MenuMgr.unregister(this.hmenu);
							this.hmenu.destroy();
							delete this.hmenu
						}
						if (this.grid.enableColumnMove) {
							var c = Ext.dd.DDM.ids["gridHeader"
									+ this.grid.getGridEl().id];
							if (c) {
								for (var a in c) {
									if (!c[a].config.isTarget && c[a].dragElId) {
										var b = c[a].dragElId;
										c[a].unreg();
										Ext.get(b).remove()
									} else {
										if (c[a].config.isTarget) {
											c[a].proxyTop.remove();
											c[a].proxyBottom.remove();
											c[a].unreg()
										}
									}
									if (Ext.dd.DDM.locationCache[a]) {
										delete Ext.dd.DDM.locationCache[a]
									}
								}
								delete Ext.dd.DDM.ids["gridHeader"
										+ this.grid.getGridEl().id]
							}
						}
						if (this.dragZone) {
							this.dragZone.unreg()
						}
						Ext.fly(this.innerHd).removeAllListeners();
						Ext.removeNode(this.innerHd);
						Ext.destroy(this.resizeMarker, this.resizeProxy,
								this.focusEl, this.mainBody, this.scroller,
								this.mainHd, this.mainWrap, this.dragZone,
								this.splitZone, this.columnDrag,
								this.columnDrop);
						this.initData(null, null);
						Ext.EventManager.removeResizeListener(
								this.onWindowResize, this);
						this.purgeListeners()
					},
					onDenyColumnHide : function() {
					},
					render : function() {
						if (this.autoFill) {
							var a = this.grid.ownerCt;
							if (a && a.getLayout()) {
								a.on("afterlayout", function() {
									this.fitColumns(true, true);
									this.updateHeaders()
								}, this, {
									single : true
								})
							} else {
								this.fitColumns(true, true)
							}
						} else {
							if (this.forceFit) {
								this.fitColumns(true, false)
							} else {
								if (this.grid.autoExpandColumn) {
									this.autoExpand(true)
								}
							}
						}
						this.renderUI()
					},
					initData : function(b, a) {
						if (this.ds) {
							this.ds.un("load", this.onLoad, this);
							this.ds.un("datachanged", this.onDataChange, this);
							this.ds.un("add", this.onAdd, this);
							this.ds.un("remove", this.onRemove, this);
							this.ds.un("update", this.onUpdate, this);
							this.ds.un("clear", this.onClear, this)
						}
						if (b) {
							b.on("load", this.onLoad, this);
							b.on("datachanged", this.onDataChange, this);
							b.on("add", this.onAdd, this);
							b.on("remove", this.onRemove, this);
							b.on("update", this.onUpdate, this);
							b.on("clear", this.onClear, this)
						}
						this.ds = b;
						if (this.cm) {
							this.cm.un("configchange", this.onColConfigChange,
									this);
							this.cm.un("widthchange", this.onColWidthChange,
									this);
							this.cm.un("headerchange", this.onHeaderChange,
									this);
							this.cm.un("hiddenchange", this.onHiddenChange,
									this);
							this.cm.un("columnmoved", this.onColumnMove, this);
							this.cm.un("columnlockchange", this.onColumnLock,
									this)
						}
						if (a) {
							delete this.lastViewWidth;
							a.on("configchange", this.onColConfigChange, this);
							a.on("widthchange", this.onColWidthChange, this);
							a.on("headerchange", this.onHeaderChange, this);
							a.on("hiddenchange", this.onHiddenChange, this);
							a.on("columnmoved", this.onColumnMove, this);
							a.on("columnlockchange", this.onColumnLock, this)
						}
						this.cm = a
					},
					onDataChange : function() {
						this.refresh();
						this.updateHeaderSortState();
						this.syncFocusEl(0)
					},
					onClear : function() {
						this.refresh();
						this.syncFocusEl(0)
					},
					onUpdate : function(b, a) {
						this.refreshRow(a)
					},
					onAdd : function(c, a, b) {
						this.insertRows(c, b, b + (a.length - 1))
					},
					onRemove : function(d, a, b, c) {
						if (c !== true) {
							this.fireEvent("beforerowremoved", this, b, a)
						}
						this.removeRow(b);
						if (c !== true) {
							this.processRows(b);
							this.applyEmptyText();
							this.fireEvent("rowremoved", this, b, a)
						}
					},
					onLoad : function() {
						this.scrollToTop()
					},
					onColWidthChange : function(a, b, c) {
						this.updateColumnWidth(b, c)
					},
					onHeaderChange : function(a, b, c) {
						this.updateHeaders()
					},
					onHiddenChange : function(a, b, c) {
						this.updateColumnHidden(b, c)
					},
					onColumnMove : function(a, d, b) {
						this.indexMap = null;
						var c = this.getScrollState();
						this.refresh(true);
						this.restoreScroll(c);
						this.afterMove(b)
					},
					onColConfigChange : function() {
						delete this.lastViewWidth;
						this.indexMap = null;
						this.refresh(true)
					},
					initUI : function(a) {
						a.on("headerclick", this.onHeaderClick, this)
					},
					initEvents : function() {
					},
					onHeaderClick : function(b, a) {
						if (this.headersDisabled || !this.cm.isSortable(a)) {
							return
						}
						b.stopEditing(true);
						b.store.sort(this.cm.getDataIndex(a))
					},
					onRowOver : function(b, a) {
						var c;
						if ((c = this.findRowIndex(a)) !== false) {
							this.addRowClass(c, "x-grid3-row-over")
						}
					},
					onRowOut : function(b, a) {
						var c;
						if ((c = this.findRowIndex(a)) !== false
								&& !b.within(this.getRow(c), true)) {
							this.removeRowClass(c, "x-grid3-row-over")
						}
					},
					handleWheel : function(a) {
						a.stopPropagation()
					},
					onRowSelect : function(a) {
						this.addRowClass(a, "x-grid3-row-selected")
					},
					onRowDeselect : function(a) {
						this.removeRowClass(a, "x-grid3-row-selected")
					},
					onCellSelect : function(c, b) {
						var a = this.getCell(c, b);
						if (a) {
							this.fly(a).addClass("x-grid3-cell-selected")
						}
					},
					onCellDeselect : function(c, b) {
						var a = this.getCell(c, b);
						if (a) {
							this.fly(a).removeClass("x-grid3-cell-selected")
						}
					},
					onColumnSplitterMoved : function(c, b) {
						this.userResized = true;
						var a = this.grid.colModel;
						a.setColumnWidth(c, b, true);
						if (this.forceFit) {
							this.fitColumns(true, false, c);
							this.updateAllColumnWidths()
						} else {
							this.updateColumnWidth(c, b);
							this.syncHeaderScroll()
						}
						this.grid.fireEvent("columnresize", c, b)
					},
					handleHdMenuClick : function(c) {
						var b = this.hdCtxIndex;
						var a = this.cm, d = this.ds;
						switch (c.id) {
							case "asc" :
								d.sort(a.getDataIndex(b), "ASC");
								break;
							case "desc" :
								d.sort(a.getDataIndex(b), "DESC");
								break;
							default :
								b = a.getIndexById(c.id.substr(4));
								if (b != -1) {
									if (c.checked
											&& a
													.getColumnsBy(
															this.isHideableColumn,
															this).length <= 1) {
										this.onDenyColumnHide();
										return false
									}
									a.setHidden(b, c.checked)
								}
						}
						return true
					},
					isHideableColumn : function(a) {
						return !a.hidden && !a.fixed
					},
					beforeColMenuShow : function() {
						var a = this.cm, c = a.getColumnCount();
						this.colMenu.removeAll();
						for (var b = 0;b < c; b++) {
							if (a.config[b].fixed !== true
									&& a.config[b].hideable !== false) {
								this.colMenu.add(new Ext.menu.CheckItem( {
									id : "col-" + a.getColumnId(b),
									text : a.getColumnHeader(b),
									checked : !a.isHidden(b),
									hideOnClick : false,
									disabled : a.config[b].hideable === false
								}))
							}
						}
					},
					handleHdDown : function(h, d) {
						if (Ext.fly(d).hasClass("x-grid3-hd-btn")) {
							h.stopEvent();
							var g = this.findHeaderCell(d);
							Ext.fly(g).addClass("x-grid3-hd-menu-open");
							var c = this.getCellIndex(g);
							this.hdCtxIndex = c;
							var b = this.hmenu.items, a = this.cm;
							b.get("asc").setDisabled(!a.isSortable(c));
							b.get("desc").setDisabled(!a.isSortable(c));
							this.hmenu.on("hide", function() {
								Ext.fly(g).removeClass("x-grid3-hd-menu-open")
							}, this, {
								single : true
							});
							this.hmenu.show(d, "tl-bl?")
						}
					},
					handleHdOver : function(d, a) {
						var c = this.findHeaderCell(a);
						if (c && !this.headersDisabled) {
							this.activeHd = c;
							this.activeHdIndex = this.getCellIndex(c);
							var b = this.fly(c);
							this.activeHdRegion = b.getRegion();
							if (!this.cm.isMenuDisabled(this.activeHdIndex)) {
								b.addClass("x-grid3-hd-over");
								this.activeHdBtn = b.child(".x-grid3-hd-btn");
								if (this.activeHdBtn) {
									this.activeHdBtn.dom.style.height = (c.firstChild.offsetHeight - 1)
											+ "px"
								}
							}
						}
					},
					handleHdMove : function(h, d) {
						if (this.activeHd && !this.headersDisabled) {
							var b = this.splitHandleWidth || 5;
							var g = this.activeHdRegion;
							var a = h.getPageX();
							var c = this.activeHd.style;
							if (a - g.left <= b
									&& this.cm.isResizable(this.activeHdIndex
											- 1)) {
								c.cursor = Ext.isAir ? "move" : Ext.isSafari
										? "e-resize"
										: "col-resize"
							} else {
								if (g.right - a <= (!this.activeHdBtn ? b : 2)
										&& this.cm
												.isResizable(this.activeHdIndex)) {
									c.cursor = Ext.isAir
											? "move"
											: Ext.isSafari
													? "w-resize"
													: "col-resize"
								} else {
									c.cursor = ""
								}
							}
						}
					},
					handleHdOut : function(c, a) {
						var b = this.findHeaderCell(a);
						if (b && (!Ext.isIE || !c.within(b, true))) {
							this.activeHd = null;
							this.fly(b).removeClass("x-grid3-hd-over");
							b.style.cursor = ""
						}
					},
					hasRows : function() {
						var a = this.mainBody.dom.firstChild;
						return a && a.className != "x-grid-empty"
					},
					bind : function(a, b) {
						this.initData(a, b)
					}
				});
Ext.grid.GridView.SplitDragZone = function(a, b) {
	this.grid = a;
	this.view = a.getView();
	this.marker = this.view.resizeMarker;
	this.proxy = this.view.resizeProxy;
	Ext.grid.GridView.SplitDragZone.superclass.constructor.call(this, b,
			"gridSplitters" + this.grid.getGridEl().id, {
				dragElId : Ext.id(this.proxy.dom),
				resizeFrame : false
			});
	this.scroll = false;
	this.hw = this.view.splitHandleWidth || 5
};
Ext.extend(Ext.grid.GridView.SplitDragZone, Ext.dd.DDProxy, {
	b4StartDrag : function(a, e) {
		this.view.headersDisabled = true;
		var d = this.view.mainWrap.getHeight();
		this.marker.setHeight(d);
		this.marker.show();
		this.marker.alignTo(this.view.getHeaderCell(this.cellIndex), "tl-tl", [
				-2, 0]);
		this.proxy.setHeight(d);
		var b = this.cm.getColumnWidth(this.cellIndex);
		var c = Math.max(b - this.grid.minColumnWidth, 0);
		this.resetConstraints();
		this.setXConstraint(c, 1000);
		this.setYConstraint(0, 0);
		this.minX = a - c;
		this.maxX = a + 1000;
		this.startPos = a;
		Ext.dd.DDProxy.prototype.b4StartDrag.call(this, a, e)
	},
	handleMouseDown : function(a) {
		var k = this.view.findHeaderCell(a.getTarget());
		if (k) {
			var n = this.view.fly(k).getXY(), g = n[0], d = n[1];
			var l = a.getXY(), c = l[0], b = l[1];
			var i = k.offsetWidth, h = false;
			if ((c - g) <= this.hw) {
				h = -1
			} else {
				if ((g + i) - c <= this.hw) {
					h = 0
				}
			}
			if (h !== false) {
				this.cm = this.grid.colModel;
				var m = this.view.getCellIndex(k);
				if (h == -1) {
					if (m + h < 0) {
						return
					}
					while (this.cm.isHidden(m + h)) {
						--h;
						if (m + h < 0) {
							return
						}
					}
				}
				this.cellIndex = m + h;
				this.split = k.dom;
				if (this.cm.isResizable(this.cellIndex)
						&& !this.cm.isFixed(this.cellIndex)) {
					Ext.grid.GridView.SplitDragZone.superclass.handleMouseDown
							.apply(this, arguments)
				}
			} else {
				if (this.view.columnDrag) {
					this.view.columnDrag.callHandleMouseDown(a)
				}
			}
		}
	},
	endDrag : function(d) {
		this.marker.hide();
		var a = this.view;
		var b = Math.max(this.minX, d.getPageX());
		var c = b - this.startPos;
		a.onColumnSplitterMoved(this.cellIndex, this.cm
				.getColumnWidth(this.cellIndex)
				+ c);
		setTimeout(function() {
			a.headersDisabled = false
		}, 50)
	},
	autoOffset : function() {
		this.setDelta(0, 0)
	}
});
Ext.grid.GroupingView = Ext
		.extend(
				Ext.grid.GridView,
				{
					hideGroupedColumn : false,
					showGroupName : true,
					startCollapsed : false,
					enableGrouping : true,
					enableGroupingMenu : true,
					enableNoGroups : true,
					emptyGroupText : "(None)",
					ignoreAdd : false,
					groupTextTpl : "{text}",
					gidSeed : 1000,
					initTemplates : function() {
						Ext.grid.GroupingView.superclass.initTemplates
								.call(this);
						this.state = {};
						var a = this.grid.getSelectionModel();
						a.on(a.selectRow
								? "beforerowselect"
								: "beforecellselect", this.onBeforeRowSelect,
								this);
						if (!this.startGroup) {
							this.startGroup = new Ext.XTemplate(
									'<div id="{groupId}" class="x-grid-group {cls}">',
									'<div id="{groupId}-hd" class="x-grid-group-hd" style="{style}"><div>',
									this.groupTextTpl, "</div></div>",
									'<div id="{groupId}-bd" class="x-grid-group-body">')
						}
						this.startGroup.compile();
						this.endGroup = "</div></div>"
					},
					findGroup : function(a) {
						return Ext.fly(a)
								.up(".x-grid-group", this.mainBody.dom)
					},
					getGroups : function() {
						return this.hasRows()
								? this.mainBody.dom.childNodes
								: []
					},
					onAdd : function() {
						if (this.enableGrouping && !this.ignoreAdd) {
							var a = this.getScrollState();
							this.refresh();
							this.restoreScroll(a)
						} else {
							if (!this.enableGrouping) {
								Ext.grid.GroupingView.superclass.onAdd.apply(
										this, arguments)
							}
						}
					},
					onRemove : function(e, a, b, d) {
						Ext.grid.GroupingView.superclass.onRemove.apply(this,
								arguments);
						var c = document.getElementById(a._groupId);
						if (c && c.childNodes[1].childNodes.length < 1) {
							Ext.removeNode(c)
						}
						this.applyEmptyText()
					},
					refreshRow : function(a) {
						if (this.ds.getCount() == 1) {
							this.refresh()
						} else {
							this.isUpdating = true;
							Ext.grid.GroupingView.superclass.refreshRow.apply(
									this, arguments);
							this.isUpdating = false
						}
					},
					beforeMenuShow : function() {
						var c = this.getGroupField();
						var b = this.hmenu.items.get("groupBy");
						if (b) {
							b
									.setDisabled(this.cm.config[this.hdCtxIndex].groupable === false)
						}
						var a = this.hmenu.items.get("showGroups");
						if (a) {
							a
									.setDisabled(!c
											&& this.cm.config[this.hdCtxIndex].groupable === false);
							a.setChecked(!!c, true)
						}
					},
					renderUI : function() {
						Ext.grid.GroupingView.superclass.renderUI.call(this);
						this.mainBody
								.on("mousedown", this.interceptMouse, this);
						if (this.enableGroupingMenu && this.hmenu) {
							this.hmenu.add("-", {
								id : "groupBy",
								text : this.groupByText,
								handler : this.onGroupByClick,
								scope : this,
								iconCls : "x-group-by-icon"
							});
							if (this.enableNoGroups) {
								this.hmenu.add( {
									id : "showGroups",
									text : this.showGroupsText,
									checked : true,
									checkHandler : this.onShowGroupsClick,
									scope : this
								})
							}
							this.hmenu.on("beforeshow", this.beforeMenuShow,
									this)
						}
					},
					onGroupByClick : function() {
						this.grid.store.groupBy(this.cm
								.getDataIndex(this.hdCtxIndex));
						this.beforeMenuShow()
					},
					onShowGroupsClick : function(a, b) {
						if (b) {
							this.onGroupByClick()
						} else {
							this.grid.store.clearGrouping()
						}
					},
					toggleGroup : function(c, b) {
						this.grid.stopEditing(true);
						c = Ext.getDom(c);
						var a = Ext.fly(c);
						b = b !== undefined ? b : a
								.hasClass("x-grid-group-collapsed");
						this.state[a.dom.id] = b;
						a[b ? "removeClass" : "addClass"]("x-grid-group-collapsed")
					},
					toggleAllGroups : function(c) {
						var b = this.getGroups();
						for (var d = 0, a = b.length;d < a; d++) {
							this.toggleGroup(b[d], c)
						}
					},
					expandAllGroups : function() {
						this.toggleAllGroups(true)
					},
					collapseAllGroups : function() {
						this.toggleAllGroups(false)
					},
					interceptMouse : function(b) {
						var a = b.getTarget(".x-grid-group-hd", this.mainBody);
						if (a) {
							b.stopEvent();
							this.toggleGroup(a.parentNode)
						}
					},
					getGroup : function(a, d, h, i, b, e) {
						var c = h ? h(a, {}, d, i, b, e) : String(a);
						if (c === "") {
							c = this.cm.config[b].emptyGroupText
									|| this.emptyGroupText
						}
						return c
					},
					getGroupField : function() {
						return this.grid.store.getGroupState()
					},
					renderRows : function() {
						var a = this.getGroupField();
						var d = !!a;
						if (this.hideGroupedColumn) {
							var b = this.cm.findColumnIndex(a);
							if (!d && this.lastGroupField !== undefined) {
								this.mainBody.update("");
								this.cm.setHidden(this.cm
										.findColumnIndex(this.lastGroupField),
										false);
								delete this.lastGroupField
							} else {
								if (d && this.lastGroupField === undefined) {
									this.lastGroupField = a;
									this.cm.setHidden(b, true)
								} else {
									if (d && this.lastGroupField !== undefined
											&& a !== this.lastGroupField) {
										this.mainBody.update("");
										var c = this.cm
												.findColumnIndex(this.lastGroupField);
										this.cm.setHidden(c, false);
										this.lastGroupField = a;
										this.cm.setHidden(b, true)
									}
								}
							}
						}
						return Ext.grid.GroupingView.superclass.renderRows
								.apply(this, arguments)
					},
					doRender : function(d, k, u, a, t, w) {
						if (k.length < 1) {
							return ""
						}
						var D = this.getGroupField();
						var s = this.cm.findColumnIndex(D);
						this.enableGrouping = !!D;
						if (!this.enableGrouping || this.isUpdating) {
							return Ext.grid.GroupingView.superclass.doRender
									.apply(this, arguments)
						}
						var l = "width:" + this.getTotalWidth() + ";";
						var v = this.grid.getGridEl().id;
						var h = this.cm.config[s];
						var b = h.groupRenderer || h.renderer;
						var x = this.showGroupName ? (h.groupName || h.header)
								+ ": " : "";
						var C = [], o, y, z, q;
						for (y = 0, z = k.length;y < z; y++) {
							var n = a + y;
							var p = k[y], e = p.data[D], A = this.getGroup(e,
									p, b, n, s, u);
							if (!o || o.group != A) {
								q = v + "-gp-" + D + "-"
										+ Ext.util.Format.htmlEncode(A);
								var c = typeof this.state[q] !== "undefined"
										? !this.state[q]
										: this.startCollapsed;
								var m = c ? "x-grid-group-collapsed" : "";
								o = {
									group : A,
									gvalue : e,
									text : x + A,
									groupId : q,
									startRow : n,
									rs : [p],
									cls : m,
									style : l
								};
								C.push(o)
							} else {
								o.rs.push(p)
							}
							p._groupId = q
						}
						var B = [];
						for (y = 0, z = C.length;y < z; y++) {
							var A = C[y];
							this.doGroupStart(B, A, d, u, t);
							B[B.length] = Ext.grid.GroupingView.superclass.doRender
									.call(this, d, A.rs, u, A.startRow, t, w);
							this.doGroupEnd(B, A, d, u, t)
						}
						return B.join("")
					},
					getGroupId : function(g) {
						var d = this.grid.getGridEl().id;
						var c = this.getGroupField();
						var e = this.cm.findColumnIndex(c);
						var b = this.cm.config[e];
						var h = b.groupRenderer || b.renderer;
						var a = this.getGroup(g, {
							data : {}
						}, h, 0, e, this.ds);
						return d + "-gp-" + c + "-"
								+ Ext.util.Format.htmlEncode(g)
					},
					doGroupStart : function(a, d, b, e, c) {
						a[a.length] = this.startGroup.apply(d)
					},
					doGroupEnd : function(a, d, b, e, c) {
						a[a.length] = this.endGroup
					},
					getRows : function() {
						if (!this.enableGrouping) {
							return Ext.grid.GroupingView.superclass.getRows
									.call(this)
						}
						var k = [];
						var h, c = this.getGroups();
						for (var e = 0, a = c.length;e < a; e++) {
							h = c[e].childNodes[1].childNodes;
							for (var d = 0, b = h.length;d < b; d++) {
								k[k.length] = h[d]
							}
						}
						return k
					},
					updateGroupWidths : function() {
						if (!this.enableGrouping || !this.hasRows()) {
							return
						}
						var c = Math.max(this.cm.getTotalWidth(),
								this.el.dom.offsetWidth - this.scrollOffset)
								+ "px";
						var b = this.getGroups();
						for (var d = 0, a = b.length;d < a; d++) {
							b[d].firstChild.style.width = c
						}
					},
					onColumnWidthUpdated : function(c, a, b) {
						Ext.grid.GroupingView.superclass.onColumnWidthUpdated
								.call(this, c, a, b);
						this.updateGroupWidths()
					},
					onAllColumnWidthsUpdated : function(a, b) {
						Ext.grid.GroupingView.superclass.onAllColumnWidthsUpdated
								.call(this, a, b);
						this.updateGroupWidths()
					},
					onColumnHiddenUpdated : function(b, c, a) {
						Ext.grid.GroupingView.superclass.onColumnHiddenUpdated
								.call(this, b, c, a);
						this.updateGroupWidths()
					},
					onLayout : function() {
						this.updateGroupWidths()
					},
					onBeforeRowSelect : function(d, c) {
						if (!this.enableGrouping) {
							return
						}
						var b = this.getRow(c);
						if (b && !b.offsetParent) {
							var a = this.findGroup(b);
							this.toggleGroup(a, true)
						}
					},
					groupByText : "Group By This Field",
					showGroupsText : "Show in Groups"
				});
Ext.grid.GroupingView.GROUP_ID = 1000;
Ext.grid.HeaderDragZone = function(a, c, b) {
	this.grid = a;
	this.view = a.getView();
	this.ddGroup = "gridHeader" + this.grid.getGridEl().id;
	Ext.grid.HeaderDragZone.superclass.constructor.call(this, c);
	if (b) {
		this.setHandleElId(Ext.id(c));
		this.setOuterHandleElId(Ext.id(b))
	}
	this.scroll = false
};
Ext.extend(Ext.grid.HeaderDragZone, Ext.dd.DragZone, {
	maxDragWidth : 120,
	getDragData : function(c) {
		var a = Ext.lib.Event.getTarget(c);
		var b = this.view.findHeaderCell(a);
		if (b) {
			return {
				ddel : b.firstChild,
				header : b
			}
		}
		return false
	},
	onInitDrag : function(a) {
		this.view.headersDisabled = true;
		var b = this.dragData.ddel.cloneNode(true);
		b.id = Ext.id();
		b.style.width = Math.min(this.dragData.header.offsetWidth,
				this.maxDragWidth)
				+ "px";
		this.proxy.update(b);
		return true
	},
	afterValidDrop : function() {
		var a = this.view;
		setTimeout(function() {
			a.headersDisabled = false
		}, 50)
	},
	afterInvalidDrop : function() {
		var a = this.view;
		setTimeout(function() {
			a.headersDisabled = false
		}, 50)
	}
});
Ext.grid.HeaderDropZone = function(a, c, b) {
	this.grid = a;
	this.view = a.getView();
	this.proxyTop = Ext.DomHelper.append(document.body, {
		cls : "col-move-top",
		html : "&#160;"
	}, true);
	this.proxyBottom = Ext.DomHelper.append(document.body, {
		cls : "col-move-bottom",
		html : "&#160;"
	}, true);
	this.proxyTop.hide = this.proxyBottom.hide = function() {
		this.setLeftTop(-100, -100);
		this.setStyle("visibility", "hidden")
	};
	this.ddGroup = "gridHeader" + this.grid.getGridEl().id;
	Ext.grid.HeaderDropZone.superclass.constructor
			.call(this, a.getGridEl().dom)
};
Ext.extend(Ext.grid.HeaderDropZone, Ext.dd.DropZone, {
	proxyOffsets : [-4, -9],
	fly : Ext.Element.fly,
	getTargetFromEvent : function(c) {
		var a = Ext.lib.Event.getTarget(c);
		var b = this.view.findCellIndex(a);
		if (b !== false) {
			return this.view.getHeaderCell(b)
		}
	},
	nextVisible : function(c) {
		var b = this.view, a = this.grid.colModel;
		c = c.nextSibling;
		while (c) {
			if (!a.isHidden(b.getCellIndex(c))) {
				return c
			}
			c = c.nextSibling
		}
		return null
	},
	prevVisible : function(c) {
		var b = this.view, a = this.grid.colModel;
		c = c.prevSibling;
		while (c) {
			if (!a.isHidden(b.getCellIndex(c))) {
				return c
			}
			c = c.prevSibling
		}
		return null
	},
	positionIndicator : function(d, b, g) {
		var l = Ext.lib.Event.getPageX(g);
		var a = Ext.lib.Dom.getRegion(b.firstChild);
		var m, p, k = a.top + this.proxyOffsets[1];
		if ((a.right - l) <= (a.right - a.left) / 2) {
			m = a.right + this.view.borderWidth;
			p = "after"
		} else {
			m = a.left;
			p = "before"
		}
		var i = this.view.getCellIndex(d);
		var o = this.view.getCellIndex(b);
		if (this.grid.colModel.isFixed(o)) {
			return false
		}
		var c = this.grid.colModel.isLocked(o);
		if (p == "after") {
			o++
		}
		if (i < o) {
			o--
		}
		if (i == o && (c == this.grid.colModel.isLocked(i))) {
			return false
		}
		m += this.proxyOffsets[0];
		this.proxyTop.setLeftTop(m, k);
		this.proxyTop.show();
		if (!this.bottomOffset) {
			this.bottomOffset = this.view.mainHd.getHeight()
		}
		this.proxyBottom.setLeftTop(m, k + this.proxyTop.dom.offsetHeight
				+ this.bottomOffset);
		this.proxyBottom.show();
		return p
	},
	onNodeEnter : function(d, a, c, b) {
		if (b.header != d) {
			this.positionIndicator(b.header, d, c)
		}
	},
	onNodeOver : function(g, b, d, c) {
		var a = false;
		if (c.header != g) {
			a = this.positionIndicator(c.header, g, d)
		}
		if (!a) {
			this.proxyTop.hide();
			this.proxyBottom.hide()
		}
		return a ? this.dropAllowed : this.dropNotAllowed
	},
	onNodeOut : function(d, a, c, b) {
		this.proxyTop.hide();
		this.proxyBottom.hide()
	},
	onNodeDrop : function(b, p, i, d) {
		var g = d.header;
		if (g != b) {
			var m = this.grid.colModel;
			var l = Ext.lib.Event.getPageX(i);
			var a = Ext.lib.Dom.getRegion(b.firstChild);
			var q = (a.right - l) <= ((a.right - a.left) / 2)
					? "after"
					: "before";
			var k = this.view.getCellIndex(g);
			var o = this.view.getCellIndex(b);
			var c = m.isLocked(o);
			if (q == "after") {
				o++
			}
			if (k < o) {
				o--
			}
			if (k == o && (c == m.isLocked(k))) {
				return false
			}
			m.setLocked(k, c, true);
			m.moveColumn(k, o);
			this.grid.fireEvent("columnmove", k, o);
			return true
		}
		return false
	}
});
Ext.grid.GridView.ColumnDragZone = function(a, b) {
	Ext.grid.GridView.ColumnDragZone.superclass.constructor.call(this, a, b,
			null);
	this.proxy.el.addClass("x-grid3-col-dd")
};
Ext.extend(Ext.grid.GridView.ColumnDragZone, Ext.grid.HeaderDragZone, {
	handleMouseDown : function(a) {
	},
	callHandleMouseDown : function(a) {
		Ext.grid.GridView.ColumnDragZone.superclass.handleMouseDown.call(this,
				a)
	}
});
Ext.grid.SplitDragZone = function(a, c, b) {
	this.grid = a;
	this.view = a.getView();
	this.proxy = this.view.resizeProxy;
	Ext.grid.SplitDragZone.superclass.constructor.call(this, c, "gridSplitters"
			+ this.grid.getGridEl().id, {
		dragElId : Ext.id(this.proxy.dom),
		resizeFrame : false
	});
	this.setHandleElId(Ext.id(c));
	this.setOuterHandleElId(Ext.id(b));
	this.scroll = false
};
Ext.extend(Ext.grid.SplitDragZone, Ext.dd.DDProxy, {
	fly : Ext.Element.fly,
	b4StartDrag : function(a, d) {
		this.view.headersDisabled = true;
		this.proxy.setHeight(this.view.mainWrap.getHeight());
		var b = this.cm.getColumnWidth(this.cellIndex);
		var c = Math.max(b - this.grid.minColumnWidth, 0);
		this.resetConstraints();
		this.setXConstraint(c, 1000);
		this.setYConstraint(0, 0);
		this.minX = a - c;
		this.maxX = a + 1000;
		this.startPos = a;
		Ext.dd.DDProxy.prototype.b4StartDrag.call(this, a, d)
	},
	handleMouseDown : function(b) {
		ev = Ext.EventObject.setEvent(b);
		var a = this.fly(ev.getTarget());
		if (a.hasClass("x-grid-split")) {
			this.cellIndex = this.view.getCellIndex(a.dom);
			this.split = a.dom;
			this.cm = this.grid.colModel;
			if (this.cm.isResizable(this.cellIndex)
					&& !this.cm.isFixed(this.cellIndex)) {
				Ext.grid.SplitDragZone.superclass.handleMouseDown.apply(this,
						arguments)
			}
		}
	},
	endDrag : function(c) {
		this.view.headersDisabled = false;
		var a = Math.max(this.minX, Ext.lib.Event.getPageX(c));
		var b = a - this.startPos;
		this.view.onColumnSplitterMoved(this.cellIndex, this.cm
				.getColumnWidth(this.cellIndex)
				+ b)
	},
	autoOffset : function() {
		this.setDelta(0, 0)
	}
});
Ext.grid.GridDragZone = function(b, a) {
	this.view = b.getView();
	Ext.grid.GridDragZone.superclass.constructor.call(this,
			this.view.mainBody.dom, a);
	if (this.view.lockedBody) {
		this.setHandleElId(Ext.id(this.view.mainBody.dom));
		this.setOuterHandleElId(Ext.id(this.view.lockedBody.dom))
	}
	this.scroll = false;
	this.grid = b;
	this.ddel = document.createElement("div");
	this.ddel.className = "x-grid-dd-wrap"
};
Ext.extend(Ext.grid.GridDragZone, Ext.dd.DragZone, {
	ddGroup : "GridDD",
	getDragData : function(b) {
		var a = Ext.lib.Event.getTarget(b);
		var d = this.view.findRowIndex(a);
		if (d !== false) {
			var c = this.grid.selModel;
			if (!c.isSelected(d) || b.hasModifier()) {
				c.handleMouseDown(this.grid, d, b)
			}
			return {
				grid : this.grid,
				ddel : this.ddel,
				rowIndex : d,
				selections : c.getSelections()
			}
		}
		return false
	},
	onInitDrag : function(b) {
		var a = this.dragData;
		this.ddel.innerHTML = this.grid.getDragDropText();
		this.proxy.update(this.ddel)
	},
	afterRepair : function() {
		this.dragging = false
	},
	getRepairXY : function(b, a) {
		return false
	},
	onEndDrag : function(a, b) {
	},
	onValidDrop : function(a, b, c) {
		this.hideProxy()
	},
	beforeInvalidDrop : function(a, b) {
	}
});
Ext.grid.ColumnModel = function(a) {
	this.defaultWidth = 100;
	this.defaultSortable = false;
	if (a.columns) {
		Ext.apply(this, a);
		this.setConfig(a.columns, true)
	} else {
		this.setConfig(a, true)
	}
	this.addEvents("widthchange", "headerchange", "hiddenchange",
			"columnmoved", "columnlockchange", "configchange");
	Ext.grid.ColumnModel.superclass.constructor.call(this)
};
Ext
		.extend(
				Ext.grid.ColumnModel,
				Ext.util.Observable,
				{
					getColumnId : function(a) {
						return this.config[a].id
					},
					setConfig : function(d, b) {
						if (!b) {
							delete this.totalWidth;
							for (var e = 0, a = this.config.length;e < a; e++) {
								var g = this.config[e];
								if (g.editor) {
									g.editor.destroy()
								}
							}
						}
						this.config = d;
						this.lookup = {};
						for (var e = 0, a = d.length;e < a; e++) {
							var g = d[e];
							if (typeof g.renderer == "string") {
								g.renderer = Ext.util.Format[g.renderer]
							}
							if (typeof g.id == "undefined") {
								g.id = e
							}
							if (g.editor && g.editor.isFormField) {
								g.editor = new Ext.grid.GridEditor(g.editor)
							}
							this.lookup[g.id] = g
						}
						if (!b) {
							this.fireEvent("configchange", this)
						}
					},
					getColumnById : function(a) {
						return this.lookup[a]
					},
					getIndexById : function(c) {
						for (var b = 0, a = this.config.length;b < a; b++) {
							if (this.config[b].id == c) {
								return b
							}
						}
						return -1
					},
					moveColumn : function(d, a) {
						var b = this.config[d];
						this.config.splice(d, 1);
						this.config.splice(a, 0, b);
						this.dataMap = null;
						this.fireEvent("columnmoved", this, d, a)
					},
					isLocked : function(a) {
						return this.config[a].locked === true
					},
					setLocked : function(b, c, a) {
						if (this.isLocked(b) == c) {
							return
						}
						this.config[b].locked = c;
						if (!a) {
							this.fireEvent("columnlockchange", this, b, c)
						}
					},
					getTotalLockedWidth : function() {
						var a = 0;
						for (var b = 0;b < this.config.length; b++) {
							if (this.isLocked(b) && !this.isHidden(b)) {
								this.totalWidth += this.getColumnWidth(b)
							}
						}
						return a
					},
					getLockedCount : function() {
						for (var b = 0, a = this.config.length;b < a; b++) {
							if (!this.isLocked(b)) {
								return b
							}
						}
					},
					getColumnCount : function(d) {
						if (d === true) {
							var e = 0;
							for (var b = 0, a = this.config.length;b < a; b++) {
								if (!this.isHidden(b)) {
									e++
								}
							}
							return e
						}
						return this.config.length
					},
					getColumnsBy : function(e, d) {
						var g = [];
						for (var b = 0, a = this.config.length;b < a; b++) {
							var h = this.config[b];
							if (e.call(d || this, h, b) === true) {
								g[g.length] = h
							}
						}
						return g
					},
					isSortable : function(a) {
						if (typeof this.config[a].sortable == "undefined") {
							return this.defaultSortable
						}
						return this.config[a].sortable
					},
					isMenuDisabled : function(a) {
						return !!this.config[a].menuDisabled
					},
					getRenderer : function(a) {
						if (!this.config[a].renderer) {
							return Ext.grid.ColumnModel.defaultRenderer
						}
						return this.config[a].renderer
					},
					setRenderer : function(a, b) {
						this.config[a].renderer = b
					},
					getColumnWidth : function(a) {
						return this.config[a].width || this.defaultWidth
					},
					setColumnWidth : function(b, c, a) {
						this.config[b].width = c;
						this.totalWidth = null;
						if (!a) {
							this.fireEvent("widthchange", this, b, c)
						}
					},
					getTotalWidth : function(b) {
						if (!this.totalWidth) {
							this.totalWidth = 0;
							for (var c = 0, a = this.config.length;c < a; c++) {
								if (b || !this.isHidden(c)) {
									this.totalWidth += this.getColumnWidth(c)
								}
							}
						}
						return this.totalWidth
					},
					getColumnHeader : function(a) {
						return this.config[a].header
					},
					setColumnHeader : function(a, b) {
						this.config[a].header = b;
						this.fireEvent("headerchange", this, a, b)
					},
					getColumnTooltip : function(a) {
						return this.config[a].tooltip
					},
					setColumnTooltip : function(a, b) {
						this.config[a].tooltip = b
					},
					getDataIndex : function(a) {
						return this.config[a].dataIndex
					},
					setDataIndex : function(a, b) {
						this.config[a].dataIndex = b
					},
					findColumnIndex : function(d) {
						var e = this.config;
						for (var b = 0, a = e.length;b < a; b++) {
							if (e[b].dataIndex == d) {
								return b
							}
						}
						return -1
					},
					isCellEditable : function(a, b) {
						return (this.config[a].editable || (typeof this.config[a].editable == "undefined" && this.config[a].editor))
								? true
								: false
					},
					getCellEditor : function(a, b) {
						return this.config[a].editor
					},
					setEditable : function(a, b) {
						this.config[a].editable = b
					},
					isHidden : function(a) {
						return this.config[a].hidden
					},
					isFixed : function(a) {
						return this.config[a].fixed
					},
					isResizable : function(a) {
						return a >= 0 && this.config[a].resizable !== false
								&& this.config[a].fixed !== true
					},
					setHidden : function(a, b) {
						var d = this.config[a];
						if (d.hidden !== b) {
							d.hidden = b;
							this.totalWidth = null;
							this.fireEvent("hiddenchange", this, a, b)
						}
					},
					setEditor : function(a, b) {
						this.config[a].editor = b
					}
				});
Ext.grid.ColumnModel.defaultRenderer = function(a) {
	if (typeof a == "string" && a.length < 1) {
		return "&#160;"
	}
	return a
};
Ext.grid.DefaultColumnModel = Ext.grid.ColumnModel;
Ext.grid.AbstractSelectionModel = function() {
	this.locked = false;
	Ext.grid.AbstractSelectionModel.superclass.constructor.call(this)
};
Ext.extend(Ext.grid.AbstractSelectionModel, Ext.util.Observable, {
	init : function(a) {
		this.grid = a;
		this.initEvents()
	},
	lock : function() {
		this.locked = true
	},
	unlock : function() {
		this.locked = false
	},
	isLocked : function() {
		return this.locked
	}
});
Ext.grid.RowSelectionModel = function(a) {
	Ext.apply(this, a);
	this.selections = new Ext.util.MixedCollection(false, function(b) {
		return b.id
	});
	this.last = false;
	this.lastActive = false;
	this.addEvents("selectionchange", "beforerowselect", "rowselect",
			"rowdeselect");
	Ext.grid.RowSelectionModel.superclass.constructor.call(this)
};
Ext.extend(Ext.grid.RowSelectionModel, Ext.grid.AbstractSelectionModel, {
	singleSelect : false,
	initEvents : function() {
		if (!this.grid.enableDragDrop && !this.grid.enableDrag) {
			this.grid.on("rowmousedown", this.handleMouseDown, this)
		} else {
			this.grid.on("rowclick", function(b, d, c) {
				if (c.button === 0 && !c.shiftKey && !c.ctrlKey) {
					this.selectRow(d, false);
					b.view.focusRow(d)
				}
			}, this)
		}
		this.rowNav = new Ext.KeyNav(this.grid.getGridEl(), {
			up : function(c) {
				if (!c.shiftKey || this.singleSelect) {
					this.selectPrevious(false)
				} else {
					if (this.last !== false && this.lastActive !== false) {
						var b = this.last;
						this.selectRange(this.last, this.lastActive - 1);
						this.grid.getView().focusRow(this.lastActive);
						if (b !== false) {
							this.last = b
						}
					} else {
						this.selectFirstRow()
					}
				}
			},
			down : function(c) {
				if (!c.shiftKey || this.singleSelect) {
					this.selectNext(false)
				} else {
					if (this.last !== false && this.lastActive !== false) {
						var b = this.last;
						this.selectRange(this.last, this.lastActive + 1);
						this.grid.getView().focusRow(this.lastActive);
						if (b !== false) {
							this.last = b
						}
					} else {
						this.selectFirstRow()
					}
				}
			},
			scope : this
		});
		var a = this.grid.view;
		a.on("refresh", this.onRefresh, this);
		a.on("rowupdated", this.onRowUpdated, this);
		a.on("rowremoved", this.onRemove, this)
	},
	onRefresh : function() {
		var g = this.grid.store, b;
		var d = this.getSelections();
		this.clearSelections(true);
		for (var c = 0, a = d.length;c < a; c++) {
			var e = d[c];
			if ((b = g.indexOfId(e.id)) != -1) {
				this.selectRow(b, true)
			}
		}
		if (d.length != this.selections.getCount()) {
			this.fireEvent("selectionchange", this)
		}
	},
	onRemove : function(a, b, c) {
		if (this.selections.remove(c) !== false) {
			this.fireEvent("selectionchange", this)
		}
	},
	onRowUpdated : function(a, b, c) {
		if (this.isSelected(c)) {
			a.onRowSelect(b)
		}
	},
	selectRecords : function(b, e) {
		if (!e) {
			this.clearSelections()
		}
		var d = this.grid.store;
		for (var c = 0, a = b.length;c < a; c++) {
			this.selectRow(d.indexOf(b[c]), true)
		}
	},
	getCount : function() {
		return this.selections.length
	},
	selectFirstRow : function() {
		this.selectRow(0)
	},
	selectLastRow : function(a) {
		this.selectRow(this.grid.store.getCount() - 1, a)
	},
	selectNext : function(a) {
		if (this.hasNext()) {
			this.selectRow(this.last + 1, a);
			this.grid.getView().focusRow(this.last);
			return true
		}
		return false
	},
	selectPrevious : function(a) {
		if (this.hasPrevious()) {
			this.selectRow(this.last - 1, a);
			this.grid.getView().focusRow(this.last);
			return true
		}
		return false
	},
	hasNext : function() {
		return this.last !== false
				&& (this.last + 1) < this.grid.store.getCount()
	},
	hasPrevious : function() {
		return !!this.last
	},
	getSelections : function() {
		return [].concat(this.selections.items)
	},
	getSelected : function() {
		return this.selections.itemAt(0)
	},
	each : function(e, d) {
		var c = this.getSelections();
		for (var b = 0, a = c.length;b < a; b++) {
			if (e.call(d || this, c[b], b) === false) {
				return false
			}
		}
		return true
	},
	clearSelections : function(a) {
		if (this.isLocked()) {
			return
		}
		if (a !== true) {
			var c = this.grid.store;
			var b = this.selections;
			b.each(function(d) {
				this.deselectRow(c.indexOfId(d.id))
			}, this);
			b.clear()
		} else {
			this.selections.clear()
		}
		this.last = false
	},
	selectAll : function() {
		if (this.isLocked()) {
			return
		}
		this.selections.clear();
		for (var b = 0, a = this.grid.store.getCount();b < a; b++) {
			this.selectRow(b, true)
		}
	},
	hasSelection : function() {
		return this.selections.length > 0
	},
	isSelected : function(a) {
		var b = typeof a == "number" ? this.grid.store.getAt(a) : a;
		return (b && this.selections.key(b.id) ? true : false)
	},
	isIdSelected : function(a) {
		return (this.selections.key(a) ? true : false)
	},
	handleMouseDown : function(d, i, h) {
		if (h.button !== 0 || this.isLocked()) {
			return
		}
		var a = this.grid.getView();
		if (h.shiftKey && !this.singleSelect && this.last !== false) {
			var c = this.last;
			this.selectRange(c, i, h.ctrlKey);
			this.last = c;
			a.focusRow(i)
		} else {
			var b = this.isSelected(i);
			if (h.ctrlKey && b) {
				this.deselectRow(i)
			} else {
				if (!b || this.getCount() > 1) {
					this.selectRow(i, h.ctrlKey || h.shiftKey);
					a.focusRow(i)
				}
			}
		}
	},
	selectRows : function(c, d) {
		if (!d) {
			this.clearSelections()
		}
		for (var b = 0, a = c.length;b < a; b++) {
			this.selectRow(c[b], true)
		}
	},
	selectRange : function(b, a, d) {
		if (this.isLocked()) {
			return
		}
		if (!d) {
			this.clearSelections()
		}
		if (b <= a) {
			for (var c = b;c <= a; c++) {
				this.selectRow(c, true)
			}
		} else {
			for (var c = b;c >= a; c--) {
				this.selectRow(c, true)
			}
		}
	},
	deselectRange : function(c, b, a) {
		if (this.isLocked()) {
			return
		}
		for (var d = c;d <= b; d++) {
			this.deselectRow(d, a)
		}
	},
	selectRow : function(b, d, a) {
		if (this.isLocked() || (b < 0 || b >= this.grid.store.getCount())
				|| this.isSelected(b)) {
			return
		}
		var c = this.grid.store.getAt(b);
		if (c && this.fireEvent("beforerowselect", this, b, d, c) !== false) {
			if (!d || this.singleSelect) {
				this.clearSelections()
			}
			this.selections.add(c);
			this.last = this.lastActive = b;
			if (!a) {
				this.grid.getView().onRowSelect(b)
			}
			this.fireEvent("rowselect", this, b, c);
			this.fireEvent("selectionchange", this)
		}
	},
	deselectRow : function(b, a) {
		if (this.isLocked()) {
			return
		}
		if (this.last == b) {
			this.last = false
		}
		if (this.lastActive == b) {
			this.lastActive = false
		}
		var c = this.grid.store.getAt(b);
		if (c) {
			this.selections.remove(c);
			if (!a) {
				this.grid.getView().onRowDeselect(b)
			}
			this.fireEvent("rowdeselect", this, b, c);
			this.fireEvent("selectionchange", this)
		}
	},
	restoreLast : function() {
		if (this._last) {
			this.last = this._last
		}
	},
	acceptsNav : function(c, b, a) {
		return !a.isHidden(b) && a.isCellEditable(b, c)
	},
	onEditorKey : function(i, h) {
		var c = h.getKey(), l, d = this.grid, b = d.activeEditor;
		var a = h.shiftKey;
		if (c == h.TAB) {
			h.stopEvent();
			b.completeEdit();
			if (a) {
				l = d.walkCells(b.row, b.col - 1, -1, this.acceptsNav, this)
			} else {
				l = d.walkCells(b.row, b.col + 1, 1, this.acceptsNav, this)
			}
		} else {
			if (c == h.ENTER) {
				h.stopEvent();
				b.completeEdit();
				if (this.moveEditorOnEnter !== false) {
					if (a) {
						l = d.walkCells(b.row - 1, b.col, -1, this.acceptsNav,
								this)
					} else {
						l = d.walkCells(b.row + 1, b.col, 1, this.acceptsNav,
								this)
					}
				}
			} else {
				if (c == h.ESC) {
					b.cancelEdit()
				}
			}
		}
		if (l) {
			d.startEditing(l[0], l[1])
		}
	}
});
Ext.grid.CellSelectionModel = function(a) {
	Ext.apply(this, a);
	this.selection = null;
	this.addEvents("beforecellselect", "cellselect", "selectionchange");
	Ext.grid.CellSelectionModel.superclass.constructor.call(this)
};
Ext.extend(Ext.grid.CellSelectionModel, Ext.grid.AbstractSelectionModel, {
	initEvents : function() {
		this.grid.on("cellmousedown", this.handleMouseDown, this);
		this.grid.getGridEl().on(
				Ext.isIE || Ext.isSafari3 ? "keydown" : "keypress",
				this.handleKeyDown, this);
		var a = this.grid.view;
		a.on("refresh", this.onViewChange, this);
		a.on("rowupdated", this.onRowUpdated, this);
		a.on("beforerowremoved", this.clearSelections, this);
		a.on("beforerowsinserted", this.clearSelections, this);
		if (this.grid.isEditor) {
			this.grid.on("beforeedit", this.beforeEdit, this)
		}
	},
	beforeEdit : function(a) {
		this.select(a.row, a.column, false, true, a.record)
	},
	onRowUpdated : function(a, b, c) {
		if (this.selection && this.selection.record == c) {
			a.onCellSelect(b, this.selection.cell[1])
		}
	},
	onViewChange : function() {
		this.clearSelections(true)
	},
	getSelectedCell : function() {
		return this.selection ? this.selection.cell : null
	},
	clearSelections : function(b) {
		var a = this.selection;
		if (a) {
			if (b !== true) {
				this.grid.view.onCellDeselect(a.cell[0], a.cell[1])
			}
			this.selection = null;
			this.fireEvent("selectionchange", this, null)
		}
	},
	hasSelection : function() {
		return this.selection ? true : false
	},
	handleMouseDown : function(b, d, a, c) {
		if (c.button !== 0 || this.isLocked()) {
			return
		}
		this.select(d, a)
	},
	select : function(g, c, b, e, d) {
		if (this.fireEvent("beforecellselect", this, g, c) !== false) {
			this.clearSelections();
			d = d || this.grid.store.getAt(g);
			this.selection = {
				record : d,
				cell : [g, c]
			};
			if (!b) {
				var a = this.grid.getView();
				a.onCellSelect(g, c);
				if (e !== true) {
					a.focusCell(g, c)
				}
			}
			this.fireEvent("cellselect", this, g, c);
			this.fireEvent("selectionchange", this, this.selection)
		}
	},
	isSelectable : function(c, b, a) {
		return !a.isHidden(b)
	},
	handleKeyDown : function(l) {
		if (!l.isNavKeyPress()) {
			return
		}
		var i = this.grid, p = this.selection;
		if (!p) {
			l.stopEvent();
			var o = i.walkCells(0, 0, 1, this.isSelectable, this);
			if (o) {
				this.select(o[0], o[1])
			}
			return
		}
		var b = this;
		var n = function(g, c, e) {
			return i.walkCells(g, c, e, b.isSelectable, b)
		};
		var d = l.getKey(), a = p.cell[0], m = p.cell[1];
		var h;
		switch (d) {
			case l.TAB :
				if (l.shiftKey) {
					h = n(a, m - 1, -1)
				} else {
					h = n(a, m + 1, 1)
				}
				break;
			case l.DOWN :
				h = n(a + 1, m, 1);
				break;
			case l.UP :
				h = n(a - 1, m, -1);
				break;
			case l.RIGHT :
				h = n(a, m + 1, 1);
				break;
			case l.LEFT :
				h = n(a, m - 1, -1);
				break;
			case l.ENTER :
				if (i.isEditor && !i.editing) {
					i.startEditing(a, m);
					l.stopEvent();
					return
				}
				break
		}
		if (h) {
			this.select(h[0], h[1]);
			l.stopEvent()
		}
	},
	acceptsNav : function(c, b, a) {
		return !a.isHidden(b) && a.isCellEditable(b, c)
	},
	onEditorKey : function(h, d) {
		var b = d.getKey(), i, c = this.grid, a = c.activeEditor;
		if (b == d.TAB) {
			if (d.shiftKey) {
				i = c.walkCells(a.row, a.col - 1, -1, this.acceptsNav, this)
			} else {
				i = c.walkCells(a.row, a.col + 1, 1, this.acceptsNav, this)
			}
			d.stopEvent()
		} else {
			if (b == d.ENTER) {
				a.completeEdit();
				d.stopEvent()
			} else {
				if (b == d.ESC) {
					d.stopEvent();
					a.cancelEdit()
				}
			}
		}
		if (i) {
			c.startEditing(i[0], i[1])
		}
	}
});
Ext.grid.EditorGridPanel = Ext.extend(Ext.grid.GridPanel, {
	clicksToEdit : 2,
	isEditor : true,
	detectEdit : false,
	autoEncode : false,
	trackMouseOver : false,
	initComponent : function() {
		Ext.grid.EditorGridPanel.superclass.initComponent.call(this);
		if (!this.selModel) {
			this.selModel = new Ext.grid.CellSelectionModel()
		}
		this.activeEditor = null;
		this.addEvents("beforeedit", "afteredit", "validateedit")
	},
	initEvents : function() {
		Ext.grid.EditorGridPanel.superclass.initEvents.call(this);
		this.on("bodyscroll", this.stopEditing, this, [true]);
		this.on("columnresize", this.stopEditing, this, [true]);
		if (this.clicksToEdit == 1) {
			this.on("cellclick", this.onCellDblClick, this)
		} else {
			if (this.clicksToEdit == "auto" && this.view.mainBody) {
				this.view.mainBody.on("mousedown", this.onAutoEditClick, this)
			}
			this.on("celldblclick", this.onCellDblClick, this)
		}
	},
	onCellDblClick : function(b, c, a) {
		this.startEditing(c, a)
	},
	onAutoEditClick : function(c, b) {
		if (c.button !== 0) {
			return
		}
		var g = this.view.findRowIndex(b);
		var a = this.view.findCellIndex(b);
		if (g !== false && a !== false) {
			this.stopEditing();
			if (this.selModel.getSelectedCell) {
				var d = this.selModel.getSelectedCell();
				if (d && d.cell[0] === g && d.cell[1] === a) {
					this.startEditing(g, a)
				}
			} else {
				if (this.selModel.isSelected(g)) {
					this.startEditing(g, a)
				}
			}
		}
	},
	onEditComplete : function(b, d, a) {
		this.editing = false;
		this.activeEditor = null;
		b.un("specialkey", this.selModel.onEditorKey, this.selModel);
		var c = b.record;
		var h = this.colModel.getDataIndex(b.col);
		d = this.postEditValue(d, a, c, h);
		if (String(d) !== String(a)) {
			var g = {
				grid : this,
				record : c,
				field : h,
				originalValue : a,
				value : d,
				row : b.row,
				column : b.col,
				cancel : false
			};
			if (this.fireEvent("validateedit", g) !== false && !g.cancel) {
				c.set(h, g.value);
				delete g.cancel;
				this.fireEvent("afteredit", g)
			}
		}
		this.view.focusCell(b.row, b.col)
	},
	startEditing : function(h, b) {
		this.stopEditing();
		if (this.colModel.isCellEditable(b, h)) {
			this.view.ensureVisible(h, b, true);
			var c = this.store.getAt(h);
			var g = this.colModel.getDataIndex(b);
			var d = {
				grid : this,
				record : c,
				field : g,
				value : c.data[g],
				row : h,
				column : b,
				cancel : false
			};
			if (this.fireEvent("beforeedit", d) !== false && !d.cancel) {
				this.editing = true;
				var a = this.colModel.getCellEditor(b, h);
				if (!a.rendered) {
					a.render(this.view.getEditorParent(a))
				}
				(function() {
					a.row = h;
					a.col = b;
					a.record = c;
					a.on("complete", this.onEditComplete, this, {
						single : true
					});
					a
							.on("specialkey", this.selModel.onEditorKey,
									this.selModel);
					this.activeEditor = a;
					var e = this.preEditValue(c, g);
					a.startEdit(this.view.getCell(h, b).firstChild,
							e === undefined ? "" : e)
				}).defer(50, this)
			}
		}
	},
	preEditValue : function(a, c) {
		var b = a.data[c];
		return this.autoEncode && typeof b == "string" ? Ext.util.Format
				.htmlDecode(b) : b
	},
	postEditValue : function(c, a, b, d) {
		return this.autoEncode && typeof c == "string" ? Ext.util.Format
				.htmlEncode(c) : c
	},
	stopEditing : function(a) {
		if (this.activeEditor) {
			this.activeEditor[a === true ? "cancelEdit" : "completeEdit"]()
		}
		this.activeEditor = null
	},
	onDestroy : function() {
		if (this.rendered) {
			var d = this.colModel.config;
			for (var b = 0, a = d.length;b < a; b++) {
				var e = d[b];
				Ext.destroy(e.editor)
			}
		}
		Ext.grid.EditorGridPanel.superclass.onDestroy.call(this)
	}
});
Ext.reg("editorgrid", Ext.grid.EditorGridPanel);
Ext.grid.GridEditor = function(b, a) {
	Ext.grid.GridEditor.superclass.constructor.call(this, b, a);
	b.monitorTab = false
};
Ext.extend(Ext.grid.GridEditor, Ext.Editor, {
	alignment : "tl-tl",
	autoSize : "width",
	hideEl : false,
	cls : "x-small-editor x-grid-editor",
	shim : false,
	shadow : false
});
Ext.grid.PropertyRecord = Ext.data.Record.create([ {
	name : "name",
	type : "string"
}, "value"]);
Ext.grid.PropertyStore = function(a, b) {
	this.grid = a;
	this.store = new Ext.data.Store( {
		recordType : Ext.grid.PropertyRecord
	});
	this.store.on("update", this.onUpdate, this);
	if (b) {
		this.setSource(b)
	}
	Ext.grid.PropertyStore.superclass.constructor.call(this)
};
Ext.extend(Ext.grid.PropertyStore, Ext.util.Observable, {
	setSource : function(c) {
		this.source = c;
		this.store.removeAll();
		var b = [];
		for (var a in c) {
			if (this.isEditableValue(c[a])) {
				b.push(new Ext.grid.PropertyRecord( {
					name : a,
					value : c[a]
				}, a))
			}
		}
		this.store.loadRecords( {
			records : b
		}, {}, true)
	},
	onUpdate : function(e, a, d) {
		if (d == Ext.data.Record.EDIT) {
			var b = a.data.value;
			var c = a.modified.value;
			if (this.grid.fireEvent("beforepropertychange", this.source, a.id,
					b, c) !== false) {
				this.source[a.id] = b;
				a.commit();
				this.grid.fireEvent("propertychange", this.source, a.id, b, c)
			} else {
				a.reject()
			}
		}
	},
	getProperty : function(a) {
		return this.store.getAt(a)
	},
	isEditableValue : function(a) {
		if (Ext.isDate(a)) {
			return true
		} else {
			if (typeof a == "object" || typeof a == "function") {
				return false
			}
		}
		return true
	},
	setValue : function(b, a) {
		this.source[b] = a;
		this.store.getById(b).set("value", a)
	},
	getSource : function() {
		return this.source
	}
});
Ext.grid.PropertyColumnModel = function(c, b) {
	this.grid = c;
	var d = Ext.grid;
	d.PropertyColumnModel.superclass.constructor.call(this, [ {
		header : this.nameText,
		width : 50,
		sortable : true,
		dataIndex : "name",
		id : "name",
		menuDisabled : true
	}, {
		header : this.valueText,
		width : 50,
		resizable : false,
		dataIndex : "value",
		id : "value",
		menuDisabled : true
	}]);
	this.store = b;
	this.bselect = Ext.DomHelper.append(document.body, {
		tag : "select",
		cls : "x-grid-editor x-hide-display",
		children : [ {
			tag : "option",
			value : "true",
			html : "true"
		}, {
			tag : "option",
			value : "false",
			html : "false"
		}]
	});
	var e = Ext.form;
	var a = new e.Field( {
		el : this.bselect,
		bselect : this.bselect,
		autoShow : true,
		getValue : function() {
			return this.bselect.value == "true"
		}
	});
	this.editors = {
		date : new d.GridEditor(new e.DateField( {
			selectOnFocus : true
		})),
		string : new d.GridEditor(new e.TextField( {
			selectOnFocus : true
		})),
		number : new d.GridEditor(new e.NumberField( {
			selectOnFocus : true,
			style : "text-align:left;"
		})),
		"boolean" : new d.GridEditor(a)
	};
	this.renderCellDelegate = this.renderCell.createDelegate(this);
	this.renderPropDelegate = this.renderProp.createDelegate(this)
};
Ext.extend(Ext.grid.PropertyColumnModel, Ext.grid.ColumnModel, {
	nameText : "Name",
	valueText : "Value",
	dateFormat : "m/j/Y",
	renderDate : function(a) {
		return a.dateFormat(this.dateFormat)
	},
	renderBool : function(a) {
		return a ? "true" : "false"
	},
	isCellEditable : function(a, b) {
		return a == 1
	},
	getRenderer : function(a) {
		return a == 1 ? this.renderCellDelegate : this.renderPropDelegate
	},
	renderProp : function(a) {
		return this.getPropertyName(a)
	},
	renderCell : function(a) {
		var b = a;
		if (Ext.isDate(a)) {
			b = this.renderDate(a)
		} else {
			if (typeof a == "boolean") {
				b = this.renderBool(a)
			}
		}
		return Ext.util.Format.htmlEncode(b)
	},
	getPropertyName : function(b) {
		var a = this.grid.propertyNames;
		return a && a[b] ? a[b] : b
	},
	getCellEditor : function(a, e) {
		var b = this.store.getProperty(e);
		var d = b.data.name, c = b.data.value;
		if (this.grid.customEditors[d]) {
			return this.grid.customEditors[d]
		}
		if (Ext.isDate(c)) {
			return this.editors.date
		} else {
			if (typeof c == "number") {
				return this.editors.number
			} else {
				if (typeof c == "boolean") {
					return this.editors["boolean"]
				} else {
					return this.editors.string
				}
			}
		}
	}
});
Ext.grid.PropertyGrid = Ext.extend(Ext.grid.EditorGridPanel, {
	enableColumnMove : false,
	stripeRows : false,
	trackMouseOver : false,
	clicksToEdit : 1,
	enableHdMenu : false,
	viewConfig : {
		forceFit : true
	},
	initComponent : function() {
		this.customEditors = this.customEditors || {};
		this.lastEditRow = null;
		var b = new Ext.grid.PropertyStore(this);
		this.propStore = b;
		var a = new Ext.grid.PropertyColumnModel(this, b);
		b.store.sort("name", "ASC");
		this.addEvents("beforepropertychange", "propertychange");
		this.cm = a;
		this.ds = b.store;
		Ext.grid.PropertyGrid.superclass.initComponent.call(this);
		this.selModel.on("beforecellselect", function(e, d, c) {
			if (c === 0) {
				this.startEditing.defer(200, this, [d, 1]);
				return false
			}
		}, this)
	},
	onRender : function() {
		Ext.grid.PropertyGrid.superclass.onRender.apply(this, arguments);
		this.getGridEl().addClass("x-props-grid")
	},
	afterRender : function() {
		Ext.grid.PropertyGrid.superclass.afterRender.apply(this, arguments);
		if (this.source) {
			this.setSource(this.source)
		}
	},
	setSource : function(a) {
		this.propStore.setSource(a)
	},
	getSource : function() {
		return this.propStore.getSource()
	}
});
Ext.reg("propertygrid", Ext.grid.PropertyGrid);
Ext.grid.RowNumberer = function(a) {
	Ext.apply(this, a);
	if (this.rowspan) {
		this.renderer = this.renderer.createDelegate(this)
	}
};
Ext.grid.RowNumberer.prototype = {
	header : "",
	width : 23,
	sortable : false,
	fixed : true,
	menuDisabled : true,
	dataIndex : "",
	id : "numberer",
	rowspan : undefined,
	renderer : function(b, c, a, d) {
		if (this.rowspan) {
			c.cellAttr = 'rowspan="' + this.rowspan + '"'
		}
		return d + 1
	}
};
Ext.grid.CheckboxSelectionModel = Ext.extend(Ext.grid.RowSelectionModel, {
	header : '<div class="x-grid3-hd-checker">&#160;</div>',
	width : 20,
	sortable : false,
	menuDisabled : true,
	fixed : true,
	dataIndex : "",
	id : "checker",
	initEvents : function() {
		Ext.grid.CheckboxSelectionModel.superclass.initEvents.call(this);
		this.grid.on("render", function() {
			var a = this.grid.getView();
			a.mainBody.on("mousedown", this.onMouseDown, this);
			Ext.fly(a.innerHd).on("mousedown", this.onHdMouseDown, this)
		}, this)
	},
	onMouseDown : function(c, b) {
		if (c.button === 0 && b.className == "x-grid3-row-checker") {
			c.stopEvent();
			var d = c.getTarget(".x-grid3-row");
			if (d) {
				var a = d.rowIndex;
				if (this.isSelected(a)) {
					this.deselectRow(a)
				} else {
					this.selectRow(a, true)
				}
			}
		}
	},
	onHdMouseDown : function(c, a) {
		if (a.className == "x-grid3-hd-checker") {
			c.stopEvent();
			var b = Ext.fly(a.parentNode);
			var d = b.hasClass("x-grid3-hd-checker-on");
			if (d) {
				b.removeClass("x-grid3-hd-checker-on");
				this.clearSelections()
			} else {
				b.addClass("x-grid3-hd-checker-on");
				this.selectAll()
			}
		}
	},
	renderer : function(b, c, a) {
		return '<div class="x-grid3-row-checker">&#160;</div>'
	}
});
Ext.LoadMask = function(c, b) {
	this.el = Ext.get(c);
	Ext.apply(this, b);
	if (this.store) {
		this.store.on("beforeload", this.onBeforeLoad, this);
		this.store.on("load", this.onLoad, this);
		this.store.on("loadexception", this.onLoad, this);
		this.removeMask = Ext.value(this.removeMask, false)
	} else {
		var a = this.el.getUpdater();
		a.showLoadIndicator = false;
		a.on("beforeupdate", this.onBeforeLoad, this);
		a.on("update", this.onLoad, this);
		a.on("failure", this.onLoad, this);
		this.removeMask = Ext.value(this.removeMask, true)
	}
};
Ext.LoadMask.prototype = {
	msg : "Loading...",
	msgCls : "x-mask-loading",
	disabled : false,
	disable : function() {
		this.disabled = true
	},
	enable : function() {
		this.disabled = false
	},
	onLoad : function() {
		this.el.unmask(this.removeMask)
	},
	onBeforeLoad : function() {
		if (!this.disabled) {
			this.el.mask(this.msg, this.msgCls)
		}
	},
	show : function() {
		this.onBeforeLoad()
	},
	hide : function() {
		this.onLoad()
	},
	destroy : function() {
		if (this.store) {
			this.store.un("beforeload", this.onBeforeLoad, this);
			this.store.un("load", this.onLoad, this);
			this.store.un("loadexception", this.onLoad, this)
		} else {
			var a = this.el.getUpdater();
			a.un("beforeupdate", this.onBeforeLoad, this);
			a.un("update", this.onLoad, this);
			a.un("failure", this.onLoad, this)
		}
	}
};
Ext.ProgressBar = Ext.extend(Ext.BoxComponent, {
	baseCls : "x-progress",
	animate : false,
	waitTimer : null,
	initComponent : function() {
		Ext.ProgressBar.superclass.initComponent.call(this);
		this.addEvents("update")
	},
	onRender : function(d, a) {
		Ext.ProgressBar.superclass.onRender.call(this, d, a);
		var c = new Ext.Template('<div class="{cls}-wrap">',
				'<div class="{cls}-inner">', '<div class="{cls}-bar">',
				'<div class="{cls}-text">', "<div>&#160;</div>", "</div>",
				"</div>", '<div class="{cls}-text {cls}-text-back">',
				"<div>&#160;</div>", "</div>", "</div>", "</div>");
		if (a) {
			this.el = c.insertBefore(a, {
				cls : this.baseCls
			}, true)
		} else {
			this.el = c.append(d, {
				cls : this.baseCls
			}, true)
		}
		if (this.id) {
			this.el.dom.id = this.id
		}
		var b = this.el.dom.firstChild;
		this.progressBar = Ext.get(b.firstChild);
		if (this.textEl) {
			this.textEl = Ext.get(this.textEl);
			delete this.textTopEl
		} else {
			this.textTopEl = Ext.get(this.progressBar.dom.firstChild);
			var e = Ext.get(b.childNodes[1]);
			this.textTopEl.setStyle("z-index", 99).addClass("x-hidden");
			this.textEl = new Ext.CompositeElement([
					this.textTopEl.dom.firstChild, e.dom.firstChild]);
			this.textEl.setWidth(b.offsetWidth)
		}
		this.progressBar.setHeight(b.offsetHeight)
	},
	afterRender : function() {
		Ext.ProgressBar.superclass.afterRender.call(this);
		if (this.value) {
			this.updateProgress(this.value, this.text)
		} else {
			this.updateText(this.text)
		}
	},
	updateProgress : function(c, d, b) {
		this.value = c || 0;
		if (d) {
			this.updateText(d)
		}
		if (this.rendered) {
			var a = Math.floor(c * this.el.dom.firstChild.offsetWidth);
			this.progressBar.setWidth(a, b === true
					|| (b !== false && this.animate));
			if (this.textTopEl) {
				this.textTopEl.removeClass("x-hidden").setWidth(a)
			}
		}
		this.fireEvent("update", this, c, d);
		return this
	},
	wait : function(b) {
		if (!this.waitTimer) {
			var a = this;
			b = b || {};
			this.updateText(b.text);
			this.waitTimer = Ext.TaskMgr.start( {
				run : function(c) {
					var d = b.increment || 10;
					this.updateProgress(((((c + d) % d) + 1) * (100 / d))
							* 0.01, null, b.animate)
				},
				interval : b.interval || 1000,
				duration : b.duration,
				onStop : function() {
					if (b.fn) {
						b.fn.apply(b.scope || this)
					}
					this.reset()
				},
				scope : a
			})
		}
		return this
	},
	isWaiting : function() {
		return this.waitTimer != null
	},
	updateText : function(a) {
		this.text = a || "&#160;";
		if (this.rendered) {
			this.textEl.update(this.text)
		}
		return this
	},
	syncProgressBar : function() {
		if (this.value) {
			this.updateProgress(this.value, this.text)
		}
		return this
	},
	setSize : function(a, c) {
		Ext.ProgressBar.superclass.setSize.call(this, a, c);
		if (this.textTopEl) {
			var b = this.el.dom.firstChild;
			this.textEl.setSize(b.offsetWidth, b.offsetHeight)
		}
		this.syncProgressBar();
		return this
	},
	reset : function(a) {
		this.updateProgress(0);
		if (this.textTopEl) {
			this.textTopEl.addClass("x-hidden")
		}
		if (this.waitTimer) {
			this.waitTimer.onStop = null;
			Ext.TaskMgr.stop(this.waitTimer);
			this.waitTimer = null
		}
		if (a === true) {
			this.hide()
		}
		return this
	}
});
Ext.reg("progress", Ext.ProgressBar);
Ext.Slider = Ext
		.extend(
				Ext.BoxComponent,
				{
					vertical : false,
					minValue : 0,
					maxValue : 100,
					keyIncrement : 1,
					increment : 0,
					clickRange : [5, 15],
					clickToChange : true,
					animate : true,
					dragging : false,
					initComponent : function() {
						if (this.value === undefined) {
							this.value = this.minValue
						}
						Ext.Slider.superclass.initComponent.call(this);
						this.keyIncrement = Math.max(this.increment,
								this.keyIncrement);
						this.addEvents("beforechange", "change",
								"changecomplete", "dragstart", "drag",
								"dragend");
						if (this.vertical) {
							Ext.apply(this, Ext.Slider.Vertical)
						}
					},
					onRender : function() {
						this.autoEl = {
							cls : "x-slider "
									+ (this.vertical
											? "x-slider-vert"
											: "x-slider-horz"),
							cn : {
								cls : "x-slider-end",
								cn : {
									cls : "x-slider-inner",
									cn : [ {
										cls : "x-slider-thumb"
									}, {
										tag : "a",
										cls : "x-slider-focus",
										href : "#",
										tabIndex : "-1",
										hidefocus : "on"
									}]
								}
							}
						};
						Ext.Slider.superclass.onRender.apply(this, arguments);
						this.endEl = this.el.first();
						this.innerEl = this.endEl.first();
						this.thumb = this.innerEl.first();
						this.halfThumb = (this.vertical ? this.thumb
								.getHeight() : this.thumb.getWidth())
								/ 2;
						this.focusEl = this.thumb.next();
						this.initEvents()
					},
					initEvents : function() {
						this.thumb.addClassOnOver("x-slider-thumb-over");
						this.mon(this.el, "mousedown", this.onMouseDown, this);
						this.mon(this.el, "keydown", this.onKeyDown, this);
						this.focusEl.swallowEvent("click", true);
						this.tracker = new Ext.dd.DragTracker( {
							onBeforeStart : this.onBeforeDragStart
									.createDelegate(this),
							onStart : this.onDragStart.createDelegate(this),
							onDrag : this.onDrag.createDelegate(this),
							onEnd : this.onDragEnd.createDelegate(this),
							tolerance : 3,
							autoStart : 300
						});
						this.tracker.initEl(this.thumb);
						this.on("beforedestroy", this.tracker.destroy,
								this.tracker)
					},
					onMouseDown : function(b) {
						if (this.disabled) {
							return
						}
						if (this.clickToChange && b.target != this.thumb.dom) {
							var a = this.innerEl.translatePoints(b.getXY());
							this.onClickChange(a)
						}
						this.focus()
					},
					onClickChange : function(a) {
						if (a.top > this.clickRange[0]
								&& a.top < this.clickRange[1]) {
							this.setValue(
									Math.round(this.reverseValue(a.left)),
									undefined, true)
						}
					},
					onKeyDown : function(b) {
						if (this.disabled) {
							b.preventDefault();
							return
						}
						var a = b.getKey();
						switch (a) {
							case b.UP :
							case b.RIGHT :
								b.stopEvent();
								if (b.ctrlKey) {
									this.setValue(this.maxValue, undefined,
											true)
								} else {
									this.setValue(this.value
											+ this.keyIncrement, undefined,
											true)
								}
								break;
							case b.DOWN :
							case b.LEFT :
								b.stopEvent();
								if (b.ctrlKey) {
									this.setValue(this.minValue, undefined,
											true)
								} else {
									this.setValue(this.value
											- this.keyIncrement, undefined,
											true)
								}
								break;
							default :
								b.preventDefault()
						}
					},
					doSnap : function(b) {
						if (!this.increment || this.increment == 1 || !b) {
							return b
						}
						var d = b, c = this.increment;
						var a = b % c;
						if (a > 0) {
							if (a > (c / 2)) {
								d = b + (c - a)
							} else {
								d = b - a
							}
						}
						return d.constrain(this.minValue, this.maxValue)
					},
					afterRender : function() {
						Ext.Slider.superclass.afterRender
								.apply(this, arguments);
						if (this.value !== undefined) {
							var a = this.normalizeValue(this.value);
							if (a !== this.value) {
								delete this.value;
								this.setValue(a, false)
							} else {
								this.moveThumb(this.translateValue(a), false)
							}
						}
					},
					getRatio : function() {
						var a = this.innerEl.getWidth();
						var b = this.maxValue - this.minValue;
						return b == 0 ? a : (a / b)
					},
					normalizeValue : function(a) {
						if (typeof a != "number") {
							a = parseInt(a)
						}
						a = Math.round(a);
						a = this.doSnap(a);
						a = a.constrain(this.minValue, this.maxValue);
						return a
					},
					setValue : function(b, a, c) {
						b = this.normalizeValue(b);
						if (b !== this.value
								&& this.fireEvent("beforechange", this, b,
										this.value) !== false) {
							this.value = b;
							this.moveThumb(this.translateValue(b), a !== false);
							this.fireEvent("change", this, b);
							if (c) {
								this.fireEvent("changecomplete", this, b)
							}
						}
					},
					translateValue : function(a) {
						var b = this.getRatio();
						return (a * b) - (this.minValue * b) - this.halfThumb
					},
					reverseValue : function(b) {
						var a = this.getRatio();
						return (b + this.halfThumb + (this.minValue * a)) / a
					},
					moveThumb : function(b, a) {
						if (!a || this.animate === false) {
							this.thumb.setLeft(b)
						} else {
							this.thumb.shift( {
								left : b,
								stopFx : true,
								duration : 0.35
							})
						}
					},
					focus : function() {
						this.focusEl.focus(10)
					},
					onBeforeDragStart : function(a) {
						return !this.disabled
					},
					onDragStart : function(a) {
						this.thumb.addClass("x-slider-thumb-drag");
						this.dragging = true;
						this.dragStartValue = this.value;
						this.fireEvent("dragstart", this, a)
					},
					onDrag : function(a) {
						var b = this.innerEl.translatePoints(this.tracker
								.getXY());
						this.setValue(Math.round(this.reverseValue(b.left)),
								false);
						this.fireEvent("drag", this, a)
					},
					onDragEnd : function(a) {
						this.thumb.removeClass("x-slider-thumb-drag");
						this.dragging = false;
						this.fireEvent("dragend", this, a);
						if (this.dragStartValue != this.value) {
							this.fireEvent("changecomplete", this, this.value)
						}
					},
					onDisable : function() {
						Ext.Slider.superclass.onDisable.call(this);
						this.thumb.addClass(this.disabledClass);
						if (Ext.isIE) {
							var a = this.thumb.getXY();
							this.thumb.hide();
							this.innerEl.addClass(this.disabledClass).dom.disabled = true;
							if (!this.thumbHolder) {
								this.thumbHolder = this.endEl.createChild( {
									cls : "x-slider-thumb "
											+ this.disabledClass
								})
							}
							this.thumbHolder.show().setXY(a)
						}
					},
					onEnable : function() {
						Ext.Slider.superclass.onEnable.call(this);
						this.thumb.removeClass(this.disabledClass);
						if (Ext.isIE) {
							this.innerEl.removeClass(this.disabledClass).dom.disabled = false;
							if (this.thumbHolder) {
								this.thumbHolder.hide()
							}
							this.thumb.show();
							this.syncThumb()
						}
					},
					onResize : function(a, b) {
						this.innerEl.setWidth(a
								- (this.el.getPadding("l") + this.endEl
										.getPadding("r")));
						this.syncThumb()
					},
					syncThumb : function() {
						if (this.rendered) {
							this.moveThumb(this.translateValue(this.value))
						}
					},
					getValue : function() {
						return this.value
					}
				});
Ext.reg("slider", Ext.Slider);
Ext.Slider.Vertical = {
	onResize : function(a, b) {
		this.innerEl.setHeight(b
				- (this.el.getPadding("t") + this.endEl.getPadding("b")));
		this.syncThumb()
	},
	getRatio : function() {
		var b = this.innerEl.getHeight();
		var a = this.maxValue - this.minValue;
		return b / a
	},
	moveThumb : function(b, a) {
		if (!a || this.animate === false) {
			this.thumb.setBottom(b)
		} else {
			this.thumb.shift( {
				bottom : b,
				stopFx : true,
				duration : 0.35
			})
		}
	},
	onDrag : function(b) {
		var c = this.innerEl.translatePoints(this.tracker.getXY());
		var a = this.innerEl.getHeight() - c.top;
		this.setValue(this.minValue + Math.round(a / this.getRatio()), false);
		this.fireEvent("drag", this, b)
	},
	onClickChange : function(b) {
		if (b.left > this.clickRange[0] && b.left < this.clickRange[1]) {
			var a = this.innerEl.getHeight() - b.top;
			this.setValue(this.minValue + Math.round(a / this.getRatio()),
					undefined, true)
		}
	}
};
Ext.StatusBar = Ext.extend(Ext.Toolbar, {
	cls : "x-statusbar",
	busyIconCls : "x-status-busy",
	busyText : "Loading...",
	autoClear : 5000,
	activeThreadId : 0,
	initComponent : function() {
		if (this.statusAlign == "right") {
			this.cls += " x-status-right"
		}
		Ext.StatusBar.superclass.initComponent.call(this)
	},
	afterRender : function() {
		Ext.StatusBar.superclass.afterRender.call(this);
		var a = this.statusAlign == "right", b = Ext.get(this.nextBlock());
		if (a) {
			this.tr.appendChild(b.dom)
		} else {
			b.insertBefore(this.tr.firstChild)
		}
		this.statusEl = b.createChild( {
			cls : "x-status-text "
					+ (this.iconCls || this.defaultIconCls || ""),
			html : this.text || this.defaultText || ""
		});
		this.statusEl.unselectable();
		this.spacerEl = b.insertSibling( {
			tag : "td",
			style : "width:100%",
			cn : [{
				cls : "ytb-spacer"
			}]
		}, a ? "before" : "after")
	},
	setStatus : function(d) {
		d = d || {};
		if (typeof d == "string") {
			d = {
				text : d
			}
		}
		if (d.text !== undefined) {
			this.setText(d.text)
		}
		if (d.iconCls !== undefined) {
			this.setIcon(d.iconCls)
		}
		if (d.clear) {
			var e = d.clear, b = this.autoClear, a = {
				useDefaults : true,
				anim : true
			};
			if (typeof e == "object") {
				e = Ext.applyIf(e, a);
				if (e.wait) {
					b = e.wait
				}
			} else {
				if (typeof e == "number") {
					b = e;
					e = a
				} else {
					if (typeof e == "boolean") {
						e = a
					}
				}
			}
			e.threadId = this.activeThreadId;
			this.clearStatus.defer(b, this, [e])
		}
		return this
	},
	clearStatus : function(c) {
		c = c || {};
		if (c.threadId && c.threadId !== this.activeThreadId) {
			return this
		}
		var b = c.useDefaults ? this.defaultText : "", a = c.useDefaults
				? (this.defaultIconCls ? this.defaultIconCls : "")
				: "";
		if (c.anim) {
			this.statusEl.fadeOut( {
				remove : false,
				useDisplay : true,
				scope : this,
				callback : function() {
					this.setStatus( {
						text : b,
						iconCls : a
					});
					this.statusEl.show()
				}
			})
		} else {
			this.statusEl.hide();
			this.setStatus( {
				text : b,
				iconCls : a
			});
			this.statusEl.show()
		}
		return this
	},
	setText : function(a) {
		this.activeThreadId++;
		this.text = a || "";
		if (this.rendered) {
			this.statusEl.update(this.text)
		}
		return this
	},
	getText : function() {
		return this.text
	},
	setIcon : function(a) {
		this.activeThreadId++;
		a = a || "";
		if (this.rendered) {
			if (this.currIconCls) {
				this.statusEl.removeClass(this.currIconCls);
				this.currIconCls = null
			}
			if (a.length > 0) {
				this.statusEl.addClass(a);
				this.currIconCls = a
			}
		} else {
			this.currIconCls = a
		}
		return this
	},
	showBusy : function(a) {
		if (typeof a == "string") {
			a = {
				text : a
			}
		}
		a = Ext.applyIf(a || {}, {
			text : this.busyText,
			iconCls : this.busyIconCls
		});
		return this.setStatus(a)
	}
});
Ext.reg("statusbar", Ext.StatusBar);
Ext.History = (function() {
	var e, c;
	var l = false;
	var d;
	function g() {
		var m = top.location.href, n = m.indexOf("#");
		return n >= 0 ? m.substr(n + 1) : null
	}
	function a() {
		c.value = d
	}
	function h(m) {
		d = m;
		Ext.History.fireEvent("change", m)
	}
	function i(n) {
		var m = ['<html><body><div id="state">', n, "</div></body></html>"]
				.join("");
		try {
			var p = e.contentWindow.document;
			p.open();
			p.write(m);
			p.close();
			return true
		} catch (o) {
			return false
		}
	}
	function b() {
		if (!e.contentWindow || !e.contentWindow.document) {
			setTimeout(b, 10);
			return
		}
		var p = e.contentWindow.document;
		var n = p.getElementById("state");
		var m = n ? n.innerText : null;
		var o = g();
		setInterval(function() {
			p = e.contentWindow.document;
			n = p.getElementById("state");
			var r = n ? n.innerText : null;
			var q = g();
			if (r !== m) {
				m = r;
				h(m);
				top.location.hash = m;
				o = m;
				a()
			} else {
				if (q !== o) {
					o = q;
					i(q)
				}
			}
		}, 50);
		l = true;
		Ext.History.fireEvent("ready", Ext.History)
	}
	function k() {
		d = c.value ? c.value : g();
		if (Ext.isIE) {
			b()
		} else {
			var m = g();
			setInterval(function() {
				var n = g();
				if (n !== m) {
					m = n;
					h(m);
					a()
				}
			}, 50);
			l = true;
			Ext.History.fireEvent("ready", Ext.History)
		}
	}
	return {
		fieldId : "x-history-field",
		iframeId : "x-history-frame",
		events : {},
		init : function(n, m) {
			if (l) {
				Ext.callback(n, m, [this]);
				return
			}
			if (!Ext.isReady) {
				Ext.onReady(function() {
					Ext.History.init(n, m)
				});
				return
			}
			c = Ext.getDom(Ext.History.fieldId);
			if (Ext.isIE) {
				e = Ext.getDom(Ext.History.iframeId)
			}
			this.addEvents("ready", "change");
			if (n) {
				this.on("ready", n, m, {
					single : true
				})
			}
			k()
		},
		add : function(m, n) {
			if (n !== false) {
				if (this.getToken() == m) {
					return true
				}
			}
			if (Ext.isIE) {
				return i(m)
			} else {
				top.location.hash = m;
				return true
			}
		},
		back : function() {
			history.go(-1)
		},
		forward : function() {
			history.go(1)
		},
		getToken : function() {
			return l ? d : g()
		}
	}
})();
Ext.apply(Ext.History, new Ext.util.Observable());